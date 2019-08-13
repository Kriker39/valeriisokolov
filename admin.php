<!DOCTYPE html>
<?php
require_once("includes/db_connect.php");
session_start();
if((isset($_SESSION['admin']) && $_SESSION['admin']!=true) || !isset($_SESSION['admin'])){
	header("Location: signin.php"); 
}
?>
<html>
<head>
	<meta charset="utf-8"/>
	<title> Admin </title>
	<link rel="stylesheet" type="text/css" href="<?php echo $config["link"]["style.css"]; ?>">
	<link rel="stylesheet" type="text/css" href="<?php echo $config["link"]["adminStyle.css"]; ?>">
	<link rel="stylesheet" type="text/css" href="<?php echo $config["link"]["custom-scrollbar.css"]; ?>">
	<link href="<?php echo $config["link"]["font_Exo2"]; ?>" rel="stylesheet">
	<script type="text/javascript" src="<?php echo $config["link"]["jquery.min.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["jquery.cookie.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["jquery.custom-scrollbar.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["functions.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["adminFunctions.js"]; ?>"></script>
</head>
<body>

<div class="shadow">
	<form method="POST" class="btn_exit_admin">
		<button name="exit">Выйти</button>
	</form>
	<?php if (isset($_POST['exit'])){
		$_SESSION['admin']=false;
		header("Location: index.php");
	} ?>

	<header class="header"><!--
		<div class="container_ln">
			<div class="language">
				<div id="en">EN</div> | 
				<div id="ru">RU</div> | 
				<div id="ua">UA</div>
			</div> 
		</div>  -->

		<img class="header_img" src="<?php echo $config["link"]["developer_photo.png"]; ?>"/>
		<nav>
			<ul>
				<li> 
					<div class="menu_item">
						<div href=" " id="projects_btn">Проекты</div>
					</div>
				</li>
				<li> 
					<div class="menu_item">
						<div href=" " id="about_me_btn">Обо мне</div>
					</div>
				</li>
				<li>
					<div class="menu_item">
						<div href=" " id="contacts_btn">Контакты</div>
					</div>
				</li>
			</ul>
		</nav>
	</header>

	<section class="projects">
		<div class="admin_panel_projects">
			<button id="add_project">Добавить</button>
			<button id="update_project">Редактировать</button>
			<button id="delete_project">Удалить</button>
		</div>
		<ul>
			<?php
				$result=  R::getCol( 'SELECT name FROM projects ORDER BY id DESC' ); 
				foreach ($result as $name) {
					echo '<li>
						<div name="'.$name.'">
							<img src="'.$config["link"]["link_to_imgs"].$name.'.png"/>
							<div class="img_after"></div>
							<div class="name_link"><div>'.$name.'</div></div>
						</div>
					</li>';
				}
			?>
		</ul>
	</section>

	<article class="panel_info">
		<div class="container_pi">
			<div class="close_pi">Close[<span id="cross">&times;</span>]</div>
			<div class="text_pi"></div>
		</div>
	</article>

	<section class="about_me">
		<div id="about_me">
			<?php 
				$file= fopen($config["link"]["about_me.txt"], "rt"); // открывает файл для чтения 
				
				if ($file) 
				{
				    while (!feof($file)) // Команда feof определяет, произведено ли чтение до конца файла
				    { 
					   $line = fgets($file); // достает строку текста из файла 

					   $coding=iconv_get_encoding($line); // получает кодировку полученого текста
					   $line=iconv($coding, "UTF-8", $line); // переводит текст из полученой кодировки в UTF-8
					  
					   echo $line."<br>";
					}
				}
			?>
		</div>
	</section>

	<section  class="contacts">
		<div>
			<?php 
				$file= fopen($config["link"]["contacts.txt"], "rt"); // открывает файл для чтения 
				
				if ($file) 
				{
				    while (!feof($file)) // Команда feof определяет, произведено ли чтение до конца файла
				    { 
					   $line = fgets($file); // достает строку текста из файла 

					   $coding=iconv_get_encoding($line); // получает кодировку полученого текста
					   $line=iconv($coding, "UTF-8", $line); // переводит текст из полученой кодировки в UTF-8
					  
					   echo $line."<br>";
					}
				}
			?>
		</div>
	</section>

	<script>catch_error_image();</script>

</div>

</body>

</html>
