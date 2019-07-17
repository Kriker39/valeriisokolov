<?php
	require_once("config.php");

	$connection = mysqli_connect($config["db"]["server"], $config["db"]["name_user"], $config["db"]["password"], $config["db"]["name_db"]);

	if ($connection == false)
	{
		echo '<script>alert("Error. Не удалось подключится к базе данных!");</script>';
		exit();
	}
	mysqli_query($connection,'SET NAMES "utf8"');
?>