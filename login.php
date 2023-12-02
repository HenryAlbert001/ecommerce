<?php
include "db.php";

session_start();

#Login script is begin here
#If user given credential matches successfully with the data available in database then we will echo string login_success
#login_success string will go back to called Anonymous funtion $("#login").click() 
#Kịch bản đăng nhập bắt đầu tại đây
#Nếu thông tin xác thực do người dùng cung cấp khớp thành công với dữ liệu có sẵn trong cơ sở dữ liệu thì chúng tôi sẽ lặp lại chuỗi login_success
#Chuỗi #login_success sẽ quay trở lại hàm được gọi là Hàm ẩn danh $("#login").click()

if(isset($_POST["email"]) && isset($_POST["password"])){
	$email = mysqli_real_escape_string($con,$_POST["email"]);
	$password = $_POST["password"];
	$sql = "SELECT * FROM user_info WHERE email = '$email' AND password = '$password'";
	$run_query = mysqli_query($con,$sql);
	$count = mysqli_num_rows($run_query);
    $row = mysqli_fetch_array($run_query);
		$_SESSION["uid"] = $row["user_id"];
		$_SESSION["name"] = $row["first_name"];
		$ip_add = getenv("REMOTE_ADDR");
		//we have created a cookie in login_form.php page so if that cookie is available means user is not login
		// chúng tôi đã tạo một cookie trong trang login_form.php vì vậy nếu cookie đó khả dụng nghĩa là người dùng chưa đăng nhập
        
	//if user record is available in database then $count will be equal to 1
	// nếu bản ghi người dùng có sẵn trong cơ sở dữ liệu thì $count sẽ bằng 1
	if($count == 1){
		   	
			if (isset($_COOKIE["product_list"])) {
				$p_list = stripcslashes($_COOKIE["product_list"]);
				//here we are decoding stored json product list cookie to normal array
				// ở đây chúng tôi đang giải mã cookie danh sách sản phẩm json được lưu trữ thành mảng bình thường
				$product_list = json_decode($p_list,true);
				for ($i=0; $i < count($product_list); $i++) { 
					//After getting user id from database here we are checking user cart item if there is already product is listed or not
					// Sau khi lấy id người dùng từ cơ sở dữ liệu ở đây, chúng tôi sẽ kiểm tra mục giỏ hàng của người dùng xem đã có sản phẩm nào được liệt kê hay chưa
					$verify_cart = "SELECT id FROM cart WHERE user_id = $_SESSION[uid] AND p_id = ".$product_list[$i];
					$result  = mysqli_query($con,$verify_cart);
					if(mysqli_num_rows($result) < 1){
						//if user is adding first time product into cart we will update user_id into database table with valid id
						// nếu người dùng thêm sản phẩm lần đầu vào giỏ hàng, chúng tôi sẽ cập nhật user_id vào bảng cơ sở dữ liệu với id hợp lệ
						$update_cart = "UPDATE cart SET user_id = '$_SESSION[uid]' WHERE ip_add = '$ip_add' AND user_id = -1";
						mysqli_query($con,$update_cart);
					}else{
						//if already that product is available into database table we will delete that record
						// nếu sản phẩm đó đã có sẵn trong bảng cơ sở dữ liệu, chúng tôi sẽ xóa bản ghi đó
						$delete_existing_product = "DELETE FROM cart WHERE user_id = -1 AND ip_add = '$ip_add' AND p_id = ".$product_list[$i];
						mysqli_query($con,$delete_existing_product);
					}
				}
				//here we are destroying user cookie
				// ở đây chúng tôi đang hủy cookie của người dùng
				setcookie("product_list","",strtotime("-1 day"),"/");
				//if user is logging from after cart page we will send cart_login
				// nếu người dùng đăng nhập từ sau trang giỏ hàng, chúng tôi sẽ gửi cart_login
				echo "cart_login";
				
				
				exit();
				
			}
			//if user is login from page we will send login_success
			// nếu người dùng đăng nhập từ trang, chúng tôi sẽ gửi login_success
			echo "login_success";
			$BackToMyPage = $_SERVER['HTTP_REFERER'];
				if(!isset($BackToMyPage)) {
					header('Location: '.$BackToMyPage);
					echo"<script type='text/javascript'>
					
					</script>";
				} else {
					echo "<script> location.href='index.php'; </script>" ;// default page-- trang chủ
				} 
				
			
            exit;

		}else{
                $email = mysqli_real_escape_string($con,$_POST["email"]);
                $password =md5($_POST["password"]) ;
                $sql = "SELECT * FROM admin_info WHERE admin_email = '$email' AND admin_password = '$password'";
                $run_query = mysqli_query($con,$sql);
                $count = mysqli_num_rows($run_query);

            //if user record is available in database then $count will be equal to 1
			// nếu bản ghi người dùng có sẵn trong cơ sở dữ liệu thì $count sẽ bằng 1
            if($count == 1){
                $row = mysqli_fetch_array($run_query);
                $_SESSION["uid"] = $row["admin_id"];
                $_SESSION["name"] = $row["admin_name"];
                $ip_add = getenv("REMOTE_ADDR");
                //we have created a cookie in login_form.php page so if that cookie is available means user is not login
				// chúng tôi đã tạo một cookie trong trang login_form.php vì vậy nếu cookie đó khả dụng nghĩa là người dùng chưa đăng nhập


                    //if user is login from page we will send login_success
					// nếu người dùng đăng nhập từ trang, chúng tôi sẽ gửi login_success
                    echo "login_success";

                    echo "<script> location.href='admin/add_products.php'; </script>";
                    exit;

                }else{
                    echo "<span style='color:red;'>Please register before login..!</span>";
                    exit();
                }
    
	
}
    
	
}

?>