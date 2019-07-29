<!DOCTYPE html>
<?php
require_once("includes/db_connect.php");
?>
<html>
<head>
	<meta charset="utf-8"/>
	<title> <?php echo $config["title"]; ?> </title>
	<link rel="stylesheet" type="text/css" href="<?php echo $config["link"]["style.css"]; ?>">
	<link rel="stylesheet" type="text/css" href="<?php echo $config["link"]["custom-scrollbar.css"]; ?>">
	<link href="<?php echo $config["link"]["font_Exo2"]; ?>" rel="stylesheet">
	<script type="text/javascript" src="<?php echo $config["link"]["jquery.min.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["jquery.cookie.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["jquery.custom-scrollbar.js"]; ?>"></script>
	<script type="text/javascript" src="<?php echo $config["link"]["functions.js"]; ?>"></script>
</head>
<body>

<div class="shadow">

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
		<ul>
			<?php
				$query="SELECT name FROM projects";
				$result= mysqli_query($connection, $query);
				while ($data=mysqli_fetch_assoc($result))
				{
					$name = $data["name"];
					echo '
					<li>
						<div name="'.$name.'">
							<img src="'.$config["link"]["link_to_imgs"].$name.'.png"/>
							<div class="img_after"></div>
							<div class="name_link"><div>'.$name.'</div></div>
						</div>
					</li>
					';
				}
			?>
		</ul>
	</section>

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

	<article class="panel_info">
		<div class="container_pi">
			<div class="close_pi">Close[x]</div>
			<div class="text_pi"></div>
		</div>
	</article>

	<script>catch_error_image();</script>

</div>

</body>

</html>
