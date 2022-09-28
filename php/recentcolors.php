
<?
include "bd.php";

$res = mysqli_query($con,"SELECT color_code FROM `colors` WHERE `clear_status`='0' ORDER BY `datetime` DESC LIMIT 1");
while($row = mysqli_fetch_assoc($res)){?>
	<div id="result" style="background-color:<?=$row['color_code'];?>"></div>	
<? }?>
