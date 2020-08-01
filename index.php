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
		<div class="container_projects">
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
		</div>
	</section>

	<article class="panel_info">
		<div class="container_pi">
			<div class="close_pi">Close[<span id="cross">&times;</span>]</div>
			<div class="text_pi"></div>
		</div>
	</article>

	<section class="about_me">
		<div id="about_me">
			<ul>
				<?php 
					$path='data/txt/about_me';
					$dir = opendir($path);
					$count = 0;
					while($file = readdir($dir)){
					    if(!preg_match("/(\.txt)$/", $file) || preg_match("/(\.txt){2,}/", $file)){
					        continue;
					    }
					    $openFile= fopen($path."/".$file, "rt"); // открывает файл для чтения 
					    if ($openFile) 
						{
							echo "<li class='block_about_me' onclick='randomBackgroundColor(this);'>";
							    while (!feof($openFile)) // Команда feof определяет, произведено ли чтение до конца файла
							    { 
								   $line = fgets($openFile); // достает строку текста из файла 

								   $coding=iconv_get_encoding($line); // получает кодировку полученого текста
								   // $line=iconv($coding, "UTF-8", $line); // переводит текст из полученой кодировки в UTF-8
								  
								   echo $line."<br>";
								}
							echo "</li>";
						}
					}
				?>
			</ul>
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
	<script type="text/javascript">
		lastColor=0;
		function randomBackgroundColor(elem){
			rand=0;
			rand= Math.floor(Math.random() * 5)+1;

			elemColor=getComputedStyle(elem).backgroundColor;
			switch (elemColor){ // цвет в цифры
				case "rgb(208, 203, 252)": elemColor=1;break;
				case "rgb(203, 240, 252)": elemColor=2;break;
				case "rgb(245, 255, 205)": elemColor=3;break;
				case "rgb(244, 196, 228)": elemColor=4;break;
				case "rgb(255, 207, 205)": elemColor=5;break;
				default: elemColor=0;break;
			}

			while(true){ // проверяет не повторяется ли цвет, проверяет чтобы ццвет не повторялся подряд 1 раз
				if(lastColor==rand || elemColor==rand){
					rand= Math.floor(Math.random() * 5)+1;
				}
				else {
					lastColor=rand;
					break;
				}
			}

			switch (rand){ // число в HEX цвет 
				case 1: color="#D0CBFC";break;
				case 2: color="#CBF0FC";break;
				case 3: color="#F5FFCD";break;
				case 4: color="#F4C4E4";break;
				case 5: color="#FFCFCD";break;
				default: color="#FFFFFF";break;
			}
			elem.style.backgroundColor=color;
		}
	</script>

</div>

</body>

</html>
