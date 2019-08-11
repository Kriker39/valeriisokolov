<!DOCTYPE html>
<?php
require_once("includes/db_connect.php");
?>
<html>
<head>
	<meta charset="utf-8"/>
	<title> <?php echo $config["title"]; ?> </title>
	<link rel="stylesheet" type="text/css" href="<?php echo $config["link"]["adminStyle.css"]; ?>">
	<link href="<?php echo $config["link"]["font_Exo2"]; ?>" rel="stylesheet">
</head>
<body>
	<div id="error_msg">Ошибка</div>
	<div class="container_signin_admin">
		<p>Логин:<br><input type="text" id="login_admin"></p>
		<p>Пароль:<br><input type="password" id="pass_admin"></p>
		<p>Ключ:<br><input type="password" id="key_admin"></p>
		<p><button id="submit_signin_admin" onclick="signInAdmin()">Войти</button></p>
	</div>

<script>
	function signInAdmin(){
		error_msg.style.opacity=0;
		var login= login_admin.value.trim(),
			pass= pass_admin.value.trim(),
			key= key_admin.value.trim(),
			error=false;

		if(login.length==0){login_admin.style.backgroundColor = "#FFC7C7";error=true;}
		else{login_admin.style.backgroundColor = "inherit";}

		if(pass.length==0){pass_admin.style.backgroundColor = "#FFC7C7";error=true;}
		else{pass_admin.style.backgroundColor = "inherit";}

		if(key.length==0){key_admin.style.backgroundColor = "#FFC7C7";error=true;}
		else{key_admin.style.backgroundColor = "inherit";}

		if(error==false){
			var req = new XMLHttpRequest(); //Ajax без jQuery

			req.onreadystatechange = function(){
				if (req.readyState==4)
				{
					if(req.status == 200) {
						if(req.responseText=="success"){
							location.replace("admin.php");
						}
						else{
							error_msg.innerHTML=req.responseText;
							error_msg.style.opacity=1;
						}
					}
				}
			}

			req.open('POST', 'includes/ajax/check_signin_admin.php');
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.send("login="+login+"&password="+pass+"&key="+key);
		}
	}
</script>
</body>
</html>