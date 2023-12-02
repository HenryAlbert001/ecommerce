<?php

$servername = "localhost";
$username = "root";
$password = "";
$db = "onlineshop";

// Create connection
// Tạo kết nối
$con = mysqli_connect($servername, $username, $password,$db);

// Check connection
// Kiểm tra kết nối
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}


?>
