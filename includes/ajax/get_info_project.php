<?php
	
	require_once("../db_connect.php");

	$name = $_POST["name"]; // получаемое имя
	$lang = $_POST["lang"]; // получаемое имя

	if ($lang!="all"){
		$result=R::getRow('SELECT name, link, github, comment_'.$lang.' FROM projects WHERE name=?', array($name));
	}
	else{
		$result=R::findOne('projects', 'name=?', array($name));
	}

	if(empty($result)){ // если не найдена строка
		echo json_encode("error");
	}
	else{
		$json_info=json_encode($result); // json 
		echo $json_info; // получаемое js
	}
?>