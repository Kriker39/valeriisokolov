<?php
	
	require_once("../db_connect.php");

	$name = $_POST["name"]; // получаемое имя

	$query="SELECT `link`, `github`, `comment` FROM `projects` WHERE `name`='$name'"; // поиск по имени
	$result= mysqli_query($connection, $query); // запрос в бд
	
	if(mysqli_num_rows($result)==0) // проверка количества найденых данных
	{
		echo json_encode("error");
	}
	else
	{
		$info = mysqli_fetch_assoc($result); // полученный запрос в массив
	
		$json_info=json_encode($info); // json 
		echo $json_info; // получаемое js
	}
?>