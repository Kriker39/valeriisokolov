<!DOCTYPE html>
<?php
require_once("includes/config.php");
?>
<html>
<head>
	<meta charset="utf-8"/>
	<title> <?php echo $config["title"]; ?> </title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="scripts/lib/jquery-3.4.1.min.js"></script>
	<script type="text/javascript" src="scripts/lib/jquery.cookie.js"></script>
	<script type="text/javascript" src="scripts/functions.js"></script>
</head>
<body>
	<header class="header">
		<img class="header_img" src="images/main_pictures/kek.png"/>
		<nav>
			<ul>
				<li> 
					<div class="menu_item">
						<div href=" " id="projects_btn">Projects</div>
					</div>
				</li>
				<li> 
					<div class="menu_item">
						<div href=" " id="about_me_btn">About me</div>
					</div>
				</li>
				<li>
					<div class="menu_item">
						<div href=" " id="contacts_btn">Contacts</div>
					</div>
				</li>
			</ul>
		</nav>
	</header>

	<section>
		<div class="projects">
			<ul>
				<?php
					include("includes/db_connect.php");
					$query="SELECT id,name FROM projects";
					$result= mysqli_query($connection, $query);
					while ($data=mysqli_fetch_assoc($result))
					{
						echo '
						<li>
							<div value="'.$data["id"].'">
								<img src="images/projects/'.$data["name"].'.png"/>
								<div class="img_after"></div>
								<div class="name_link"><div>'.$data["name"].'</div></div>
							</div>
						</li>
						';
					}
				?>
			</ul>
		</div>
	</section>

	<section>
		<div class="about_me">
			<p>
				<?php 
					$text= file_get_contents("data/about_me.txt"); // достает текст из файла в одну строку
					$coding=iconv_get_encoding($text); // получает кодировку полученого текста
					$text=iconv($coding, "UTF-8", $text); // переводит текст из полученой кодировки в UTF-8
					echo $text;
				?>
			</p>
		</div>
	</section>

	<section>
		<div class="contacts">
			<p>
				E-mail: asad@gmail.com
			</p>
		</div>
	</section>
	<div class="panel_info">
		<div class="container_pi">
			<div class="close_pi">Close[x]</div>
			<div class="text_pi">adsadasd</div>
		</div>
	</div>
	<script>catch_error_image();</script>
</body>
</html>