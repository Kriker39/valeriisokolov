<?php
	
	require_once("../db_connect.php");

	$name = $_POST["name"]; 

	$result=R::findOne('projects', 'name=?', array($name));

	if(empty($result)){
		echo json_encode("1");exit();
	}
	R::trash($result);

	$result=R::findOne('projects', 'name=?', array($name));
	if(empty($result)) {
		echo json_encode("0");
	}
	else{
		echo json_encode("2");
	}

?>