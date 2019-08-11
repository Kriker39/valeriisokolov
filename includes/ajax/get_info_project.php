<?php
	
	require_once("../db_connect.php");

	$name = $_POST["name"]; // получаемое имя
	$result=R::findOne('projects', "name=?", array($name));

	if(empty($result)){ // если не найдена строка
		echo json_encode("error");
	}
	else{
		$json_info=json_encode($result); // json 
		echo $json_info; // получаемое js
	}
?>