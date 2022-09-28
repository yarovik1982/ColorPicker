<? include "bd.php";
$page = $_POST['page'];
$color_code = $_POST['color_code'];
$res = mysqli_query($con,"INSERT INTO colors (page, color_code) VALUES('$page', '$color_code')");
header("location:../index.html");
