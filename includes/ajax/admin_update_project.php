<?php
	
	require_once("../db_connect.php");

	$id = array_shift($_POST);
	$name = array_shift($_POST); 
	$link = array_shift($_POST); 
	$link_github = array_shift($_POST); 
	$comments = $_POST; 

	$result=R::findOne('projects', 'name=? AND id<>?',array($name, $id));

	if(!empty($result)){
		echo json_encode("1");exit();
	}
	if(empty($link) || $link=='null'){$link=NULL;}
	else{
		$result=R::findOne('projects', 'link=? AND id<>?', array($link, $id));
		if(!empty($result)){
			echo json_encode("2");exit();
		}
	}

	if(empty($link_github) || $link_github=='null'){$link_github=NULL;}

	$project=R::findOne('projects', 'id=?', array($id));
	$project->name=$name;
	$project->link=$link;
	$project->github=$link_github;
	
	foreach($comments as $key=>$value){
		$project->$key=$value;
	}

	if(R::store($project)) {
		echo json_encode("0");
	}
	else{
		echo json_encode("3");
	}

?>