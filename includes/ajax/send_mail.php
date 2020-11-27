<?php 

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	
	$send=false;
	
} else {
	$send=false;
}
// $from="from: 'vi.ua' <".$_POST['email'].">";

// $email = "sokolovaleriifeedback@gmail.com"; 
// $header = "Обратная связь с valeriisokolov.ua"; 
// $message = "Выбраный язык: ".$_POST["lang"]."\nОтправитель: ".$_POST["email"]."\nСообщение: \n".$_POST['msg']; 
// $message = wordwrap($message, 70, "\r\n");

// $send = mail($email, $header, $message); 



sleep(3);
echo json_encode($send);

?>