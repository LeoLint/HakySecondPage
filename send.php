<?php
	$to = "rekrutacja@haky.pl";
	$subject = "Сообщение с контакт формы.";
	$name = $_REQUEST['name'];
	$email = $_REQUEST['email'] ;
	$phone = $_REQUEST['phone'] ;
	$msg = $_REQUEST['msg'] ;
	
	$headers = "MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n"."From:" . '=?UTF-8?B?' . base64_encode($name) . '?=' ;

	if($_POST['name'] != ''){
		$name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
		$messageBody .= '<p><strong>Имя:</strong> ' . $name . '</p>' . "\r\n";
	}
	if($_POST['phone'] != ''){
		$phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 100);
		$messageBody .= '<p><strong>Телефон:</strong> ' . $phone . '</p>' . "\r\n";
	}
	if($_POST['email'] != ''){
		$email = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
		$messageBody .= '<p><strong>Емейл:</strong> ' . $email . '</p>' . "\r\n";
	}
	if($_POST['msg'] != ''){
		$msg = substr(htmlspecialchars(trim($_POST['msg'])), 0, 2000);
		$messageBody .= '<p><strong>Сообщение:</strong> ' . $msg . '</p>' . "\r\n";
	}

	try{
		if(!mail($to,$subject,$messageBody,$headers)){
			throw new Exception('mail failed');
		} else {
			echo 'mail sent';
		}
	}catch(Exception $e){
		echo $e->getMessage() ."\n";
	}
?>