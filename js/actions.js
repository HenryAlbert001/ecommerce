$(document).ready(function(){
	cat();//cat() là hàm tìm nạp bản ghi danh mục từ cơ sở dữ liệu bất cứ khi nào trang được tải
    cathome();
	brand();//brand() là hàm tìm nạp bản ghi thương hiệu từ cơ sở dữ liệu mỗi khi trang được tải
	product();//product() là hàm tìm nạp bản ghi sản phẩm từ cơ sở dữ liệu bất cứ khi nào trang được tải
    
    producthome();
    
    
	//cat() is a funtion fetching category record from database whenever page is load
	
	function cat(){
		$.ajax({
			url	:	"action.php",
			method:	"POST",
			data	:	{category:1},
			success	:	function(data){
				$("#get_category").html(data);
				
			}
		})
	}
    function cathome(){
		$.ajax({
			url	:	"homeaction.php",
			method:	"POST",
			data	:	{categoryhome:1},
			success	:	function(data){
				$("#get_category_home").html(data);
				
			}
		})
	}
	//brand() is a funtion fetching brand record from database whenever page is load
	//brand() là hàm tìm nạp bản ghi thương hiệu từ cơ sở dữ liệu mỗi khi trang được tải
	function brand(){
		$.ajax({
			url	:	"action.php",
			method:	"POST",
			data	:	{brand:1},
			success	:	function(data){
				$("#get_brand").html(data);
			}
		})
	}
	//product() is a funtion fetching product record from database whenever page is load
	//product() là hàm tìm nạp bản ghi sản phẩm từ cơ sở dữ liệu bất cứ khi nào trang được tải
		function product(){
		$.ajax({
			url	:	"action.php",
			method:	"POST",
			data	:	{getProduct:1},
			success	:	function(data){
				$("#get_product").html(data);
			}
		})
	}
    gethomeproduts();
    function gethomeproduts(){
		$.ajax({
			url	:	"homeaction.php",
			method:	"POST",
			data	:	{gethomeProduct:1},
			success	:	function(data){
				$("#get_home_product").html(data);
			}
		})
	}
    function producthome(){
		$.ajax({
			url	:	"homeaction.php",
			method:	"POST",
			data	:	{getProducthome:1},
			success	:	function(data){
				$("#get_product_home").html(data);
			}
		})
	}
   
    
	/*	when page is load successfully then there is a list of categories when user click on category we will get category id and 
		according to id we will show products
		khi trang được tải thành công thì sẽ có danh sách các danh mục khi người dùng nhấp vào danh mục, chúng tôi sẽ nhận được id danh mục và
		theo id chúng tôi sẽ hiển thị sản phẩm
	*/
	$("body").delegate(".category","click",function(event){
		$("#get_product").html("<h3>Loading...</h3>");
		event.preventDefault();
		var cid = $(this).attr('cid');
		
			$.ajax({
			url		:	"action.php",
			method	:	"POST",
			data	:	{get_seleted_Category:1,cat_id:cid},
			success	:	function(data){
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}
			}
		})
	
	})
    $("body").delegate(".categoryhome","click",function(event){
		$("#get_product").html("<h3>Loading...</h3>");
		event.preventDefault();
		var cid = $(this).attr('cid');
		
			$.ajax({
			url		:	"homeaction.php",
			method	:	"POST",
			data	:	{get_seleted_Category:1,cat_id:cid},
			success	:	function(data){
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}
			}
		})
	
	})

	/*	when page is load successfully then there is a list of brands when user click on brand we will get brand id and 
		according to brand id we will show products
		Khi trang được tải thành công thì sẽ có danh sách các thương hiệu khi người dùng nhấp vào thương hiệu, chúng tôi sẽ nhận được id thương hiệu và
		theo id thương hiệu chúng tôi sẽ hiển thị sản phẩm
	*/
	$("body").delegate(".selectBrand","click",function(event){
		event.preventDefault();
		$("#get_product").html("<h3>Loading...</h3>");
		var bid = $(this).attr('bid');
		
			$.ajax({
			url		:	"action.php",
			method	:	"POST",
			data	:	{selectBrand:1,brand_id:bid},
			success	:	function(data){
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}
			}
		})
	
	})
	/*
		At the top of page there is a search box with search button when user put name of product then we will take the user 
		given string and with the help of sql query we will match user given string to our database keywords column then matched product 
		we will show 
		Ở đầu trang có hộp tìm kiếm với nút tìm kiếm khi người dùng nhập tên sản phẩm thì chúng tôi sẽ đưa người dùng
		chuỗi đã cho và với sự trợ giúp của truy vấn sql, chúng tôi sẽ khớp chuỗi do người dùng cung cấp với cột từ khóa cơ sở dữ liệu của chúng tôi sau đó khớp với sản phẩm
		chúng tôi sẽ hiển thị
	*/
	$("#search_btn").click(function(){
		$("#get_product").html("<h3>Loading...</h3>");
		var keyword = $("#search").val();
		if(keyword != ""){
			$.ajax({
			url		:	"action.php",
			method	:	"POST",
			data	:	{search:1,keyword:keyword},
			success	:	function(data){ 
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}
			}
		})
		}
	})
	//end


	/*
		Here #login is login form id and this form is available in index.php page
		from here input data is sent to login.php page
		if you get login_success string from login.php page means user is logged in successfully and window.location is 
		used to redirect user from home page to profile.php page
		Ở đây #login là id biểu mẫu đăng nhập và biểu mẫu này có sẵn trên trang index.php
		từ đây dữ liệu đầu vào được gửi đến trang login.php
		nếu bạn nhận được chuỗi login_success từ trang login.php có nghĩa là người dùng đã đăng nhập thành công và window.location là
		được sử dụng để chuyển hướng người dùng từ trang chủ đến trang profile.php
	*/
	$("#login").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url	:	"login.php",
			method:	"POST",
			data	:$("#login").serialize(),
			success	:function(data){
				if(data == "login_success"){
					window.location.href = "index.php";
				}else if(data == "cart_login"){
					window.location.href = "cart.php";
				}else{
					$("#e_msg").html(data);
					$(".overlay").hide();
				}
			}
		})
	})
	//end
	//kết thúc

	// Lấy thông tin người dùng trước khi thanh toán
	//Get User Information before checkout
	$("#signup_form").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url : "register.php",
			method : "POST",
			data : $("#signup_form").serialize(),
			success : function(data){
				$(".overlay").hide();
				if (data == "register_success") {
					window.location.href = "cart.php";
				}else{
					$("#signup_msg").html(data);
				}
				
			}
		})
	})
	
	
    $("#offer_form").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url : "offersmail.php",
			method : "POST",
			data : $("#offer_form").serialize(),
			success : function(data){
				$(".overlay").hide();
				$("#offer_msg").html(data);
				
			}
		})
	})
    
    
    
	//Get User Information before checkout end here
	//Nhận thông tin người dùng trước khi thanh toán kết thúc tại đây

	// Thêm sản phẩm vào giỏ hàng
	//Add Product into Cart
	$("body").delegate("#product","click",function(event){
		var pid = $(this).attr("pid");
		
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {addToCart:1,proId:pid,},
			success : function(data){
				count_item();
				getCartItem();
				$('#product_msg').html(data);
				$('.overlay').hide();
			}
		})
	})
	//Add Product into Cart End Here
	// Thêm sản phẩm vào giỏ hàng Kết thúc tại đây
	
	//Count user cart items funtion
	// Chức năng đếm các mặt hàng trong giỏ hàng của người dùng
	
	count_item();
	function count_item(){
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {count_item:1},
			success : function(data){
				$(".badge").html(data);
			}
		})
	}
	//Count user cart items funtion end
	//Đếm các mục trong giỏ hàng của người dùng kết thúc chức năng

	// Tìm nạp mục Giỏ hàng từ Cơ sở dữ liệu vào menu thả xuống
	//Fetch Cart item from Database to dropdown menu
	getCartItem();
	function getCartItem(){
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {Common:1,getCartItem:1},
			success : function(data){
				$("#cart_product").html(data);
                net_total();
                
			}
		})
	}

	//Fetch Cart item from Database to dropdown menu
		// Tìm nạp mục Giỏ hàng từ Cơ sở dữ liệu vào menu thả xuống

		/*
		Bất cứ khi nào người dùng thay đổi số lượng, chúng tôi sẽ cập nhật ngay tổng số tiền của họ bằng cách sử dụng chức năng keyup
		nhưng bất cứ khi nào người dùng đặt thứ gì đó (chẳng hạn như ?''"",.()''etc) ngoài số thì chúng tôi sẽ tạo qty=1
		nếu người dùng đặt qty 0 hoặc nhỏ hơn 0 thì chúng tôi sẽ lại đặt số đó là 1 qty=1
		('.total').each() đây là hàm lặp lặp lại cho lớp .total và trong mỗi lần lặp lại, chúng ta sẽ thực hiện phép tính tổng của giá trị lớp .total
		và sau đó hiển thị kết quả vào lớp .net_total
		*/
	/*
		Whenever user change qty we will immediate update their total amount by using keyup funtion
		but whenever user put something(such as ?''"",.()''etc) other than number then we will make qty=1
		if user put qty 0 or less than 0 then we will again make it 1 qty=1
		('.total').each() this is loop funtion repeat for class .total and in every repetation we will perform sum operation of class .total value 
		and then show the result into class .net_total
	*/
	$("body").delegate(".qty","keyup",function(event){
		event.preventDefault();
		var row = $(this).parent().parent();
		var price = row.find('.price').val();
		var qty = row.find('.qty').val();
		if (isNaN(qty)) {
			qty = 1;
		};
		if (qty < 1) {
			qty = 1;
		};
		var total = price * qty;
		row.find('.total').val(total);
		var net_total=0;
		$('.total').each(function(){
			net_total += ($(this).val()-0);
		})
		$('.net_total').html("Total : $ " +net_total);

	})
	//Change Quantity end here 
		// Thay đổi số lượng kết thúc tại đây

		/*
		bất cứ khi nào người dùng nhấp vào lớp .remove, chúng tôi sẽ lấy id sản phẩm của hàng đó
		và gửi nó đến action.php để thực hiện thao tác xóa sản phẩm
		*/
	/*
		whenever user click on .remove class we will take product id of that row 
		and send it to action.php to perform product removal operation
	*/
    
	   
    $("body").delegate(".remove","click",function(event){
        var remove = $(this).parent().parent().parent();
        var remove_id = remove.find(".remove").attr("remove_id");
        $.ajax({
            url	:	"action.php",
            method	:	"POST",
            data	:	{removeItemFromCart:1,rid:remove_id},
            success	:	function(data){
                $("#cart_msg").html(data);
                checkOutDetails();
                }
            })
    })
    
    
	/*
		whenever user click on .update class we will take product id of that row 
		and send it to action.php to perform product qty updation operation
		bất cứ khi nào người dùng nhấp vào lớp .update, chúng tôi sẽ lấy id sản phẩm của hàng đó
		và gửi nó đến action.php để thực hiện thao tác cập nhật qty sản phẩm
	*/
	$("body").delegate(".update","click",function(event){
		var update = $(this).parent().parent().parent();
		var update_id = update.find(".update").attr("update_id");
		var qty = update.find(".qty").val();
		$.ajax({
			url	:	"action.php",
			method	:	"POST",
			data	:	{updateCartItem:1,update_id:update_id,qty:qty},
			success	:	function(data){
				$("#cart_msg").html(data);
				checkOutDetails();
			}
		})


	})
	checkOutDetails();
	net_total();
	/*
		checkOutDetails() function work for two purposes
		First it will enable php isset($_POST["Common"]) in action.php page and inside that
		there is two isset funtion which is isset($_POST["getCartItem"]) and another one is isset($_POST["checkOutDetials"])
		getCartItem is used to show the cart item into dropdown menu 
		checkOutDetails is used to show cart item into Cart.php page

		Hàm checkOutDetails() hoạt động cho hai mục đích
		Đầu tiên, nó sẽ kích hoạt php isset($_POST["Common"]) trong trang action.php và bên trong đó
		có hai hàm isset là isset($_POST["getCartItem"]) và một hàm khác là isset($_POST["checkOutDetials"])
		getCartItem được sử dụng để hiển thị mục giỏ hàng vào menu thả xuống
		checkOutDetails được sử dụng để hiển thị mục giỏ hàng vào trang Cart.php
	*/
	function checkOutDetails(){
	 $('.overlay').show();
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {Common:1,checkOutDetails:1},
			success : function(data){
				$('.overlay').hide();
				$("#cart_checkout").html(data);
					net_total();
			}
		})
	}
	/*
		net_total function is used to calcuate total amount of cart item
		Hàm net_total được sử dụng để tính tổng số lượng mặt hàng trong giỏ hàng
	*/
	function net_total(){
		var net_total = 0;
		$('.qty').each(function(){
			var row = $(this).parent().parent();
			var price  = row.find('.price').val();
			var total = price * $(this).val()-0;
			row.find('.total').val(total);
		})
		$('.total').each(function(){
			net_total += ($(this).val()-0);
		})
		$('.net_total').html("Total : $ " +net_total);
	}

	//remove product from cart
	//xóa sản phẩm khỏi giỏ hàng

	page();
	function page(){
		$.ajax({
			url	:	"action.php",
			method	:	"POST",
			data	:	{page:1},
			success	:	function(data){
				$("#pageno").html(data);
			}
		})
	}
	$("body").delegate("#page","click",function(){
		var pn = $(this).attr("page");
		$.ajax({
			url	:	"action.php",
			method	:	"POST",
			data	:	{getProduct:1,setPage:1,pageNumber:pn},
			success	:	function(data){
				$("#get_product").html(data);
			}
		})
	})
})






















