<?php
// конфиг файл для php. Есть:
// конфиг подключения к бд

$config = array(
	"title" => "Valerii Sokolov",
	"db" => array(
		"server" => "localhost",
		"name_user" => "root",
		"password" => "",
		"name_db" => "valeriisokolov_db"
	),
	"link" => array(
		"contacts.txt" => "data/txt/contacts.txt",
		"about_me.txt" => "data/txt/about_me.txt",
		"jquery.min.js" => "scripts/lib/jquery-3.4.1.min.js",
		"jquery.cookie.js" => "scripts/lib/jquery.cookie.js",
		"jquery.custom-scrollbar.js" => "scripts/lib/jquery.custom-scrollbar.js",
		"functions.js" => "scripts/functions.js",
		"font_Exo2" => "https://fonts.googleapis.com/css?family=Exo+2&display=swap&subset=cyrillic,latin-ext",
		"style.css" => "css/style.css",
		"custom-scrollbar.css" => "css/lib/custom-scrollbar.css",
		"developer_photo.png" => "images/main_pictures/developer_photo.png",
		"link_to_imgs" => "data/images/projects/"
	)
);

?>