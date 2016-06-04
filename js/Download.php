<?php 

if($_GET["action"]=="Download")
{

/**
* 下载文件
* header函数
*
*/
//$filepath = "../Data/Data.txt"

$filepath = "Display.js"

$filename = "../Data/Data.txt".$_GET['file'].".txt";    //要下载的文件名

header("Content-Type:application/force-download");
header("Content-Disposition:attachment;filename=".basename($filename));
readfile($filename);

}
?> 
