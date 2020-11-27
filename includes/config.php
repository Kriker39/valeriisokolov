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
		"contacts.txt" => "/data/txt/contacts.txt",
		"jquery.min.js" => "/scripts/lib/jquery-3.4.1.min.js",
		"jquery.cookie.js" => "/scripts/lib/jquery.cookie.js",
		"jquery.custom-scrollbar.js" => "/scripts/lib/jquery.custom-scrollbar.js",
		"functions.js" => "/scripts/functions.js",
		"adminFunctions.js" => "/scripts/adminFunctions.js",
		"font_Exo2" => "https://fonts.googleapis.com/css?family=Exo+2&display=swap&subset=cyrillic,latin-ext",
		"style.css" => "/css/style.css",
		"adminStyle.css" => "/css/adminStyle.css",
		"custom-scrollbar.css" => "/css/lib/custom-scrollbar.css",
		"link_to_imgs" => "/data/images/projects/"
	),
	"linkimg" => array(
		"load.gif" => "/images/main_pictures/load.gif",
		"developer_photo.png" => "/images/main_pictures/developer_photo.png",
		"mask.png" => "/images/main_pictures/mask.png",
		"icon_telegram.png" => "/images/main_pictures/icon_telegram.png",
		"icon_gmail.png" => "/images/main_pictures/icon_gmail.png",
		"favicon.png" => "/images/favicon.png",
	),
	"linkspec" => array(
		"key.txt" => "../../data/txt/key.txt",
	)
);

?>