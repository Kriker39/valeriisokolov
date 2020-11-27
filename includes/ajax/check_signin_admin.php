<?php
require_once("../db_connect.php");
session_start();

$login=$_POST['login'];
$pass=$_POST['password'];
$key=$_POST['key'];
$error=true;

/*
$admin=R::dispense('admin');
$admin->login=$login;
$admin->password=password_hash($pass, PASSWORD_DEFAULT);
R::store($admin);
*/
	$admin= R::findOne('admin', 'login=?', array($login));
	if($admin){
		if(password_verify($pass, $admin->password)){
			if(check_key($key, $config["linkspec"]["key.txt"])){
				$error= false;
			}
		}
	}


	if($error==false){
		$_SESSION['admin']=true;
		echo "success";
	}
	else{
		echo "Ошибка! Неверно введены данные.";
	}

function check_key($key, $link){
	$file= fopen($link, "rt"); // открывает файл для чтения 
	$keys=array();
	$return=false;

	if ($file) {
	    while (!feof($file)){ // Команда feof определяет, произведено ли чтение до конца файла
		   $line = trim(fgets($file)); // достает строку текста из файла 

		   $coding=iconv_get_encoding($line); // получает кодировку полученого текста
		   $line=iconv($coding, "UTF-8", $line); // переводит текст из полученой кодировки в UTF-8
		  
		   $keys[]=$line;
		}
		if(!empty($keys)){
			foreach($keys as $k){
				if($k==$key){
					$return=true;
				}
			}
		}
	}

	return $return;
}