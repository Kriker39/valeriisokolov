<?php
	require_once("config.php");
	require 'lib/rb.php';

	R::setup("mysql:host=".$config['db']['server'].";dbname=".$config['db']['name_db'],$config["db"]["name_user"],$config["db"]["password"]);
?>