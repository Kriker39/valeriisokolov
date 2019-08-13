<?php
	
	require_once("../db_connect.php");

	$id = $_POST["id"];
	$name = $_POST["name"]; 
	$link = $_POST["link"]; 
	$link_github = $_POST["link_github"]; 
	$comment = $_POST["comment"]; 

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
	$project->comment=$comment;

	if(R::store($project)) {
		echo json_encode("0");
	}
	else{
		echo json_encode("3");
	}

?>