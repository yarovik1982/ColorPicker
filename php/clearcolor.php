<? include "bd.php";
$clear_status = $_POST['clear_status'];
$res = mysqli_query($con,"UPDATE colors SET clear_status = '$clear_status' WHERE clear_status='0'");
header("location:../index.html");
