<?php
  header("Content-type: text/html; charset=UTF-8");     
  $Data =$_POST['Data']; 
  $open=fopen("../Data/Data.csv","a" ); 
  fwrite($open,$Data);
  fclose($open);
?> 



