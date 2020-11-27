var time_out=false, // задержка для показа информации о проекте(частота запросов к бд меньше)
	lang=false; // язык который используеться на странице


jQuery(document).ready(function(){
	try{
		lang= jQuery(".language>.active").attr('class').split(' ')[0];
	}
	catch(err){
		lang= "ru";
	}

	slider(); 
	show_info();
	lang_events();
	setTimeout(hide_preloader, 1000);

	$("img").mousedown(function(){
	    return false;
	});
	jQuery(".submit_feedback").on("click", check_feedback_data);
});

	/******** Копировать текст из елемента(start) ********/

function copyfunc(el){
	var $tmp = $("<textarea>"),
		text="";
    $("body").append($tmp);
    $tmp.val($(el).text()).select();
    document.execCommand("copy");
    $tmp.remove();
    switch(el){
    	case "#gmail": 
	    	switch(lang){
				case 'ru': text="Почта скопирована";break;
				case 'en': text="Mail copied";break;
				case 'ua': text="Пошта скопійована";break;
				default: break;
			}break;
    	case "#telega": 
    		switch(lang){
				case 'ru': text="Ссылка скопирована";break;
				case 'en': text="Link copied";break;
				case 'ua': text="Посилання скопійовано";break;
				default: break;
			}break;
    	default: text="Привет ^.^/";break;
    }
    show_msginfo(text);
}

	/******** Копировать текст из елемента(end) ********/

	/******** Ошибка картинки(start) ********/

function catch_error_image(){	// Ловит ошибку img и заменяет путь на картинку ошибки
	jQuery('img').on('error', function(){	
		jQuery(this).attr("src", "/images/main_pictures/error_image.png");
	});
}
	
	/******** Ошибка картинки(end) ********/

	/******** Презагрузка(start) ********/

function hide_preloader(){	// Прячет загрузку спустя неск сек после загрузки сайта полностью
	jQuery('.preloader').animate({"opacity":"0"}, 800);
	setTimeout(function(){jQuery('.preloader').css({"display":"none"});}, 800);
}
	
	/******** Презагрузка(end) ********/

	/******** Прятать маску ********/
var statusMask=1;

function animation_mask(){	// слайдит маску вниз
	statusMask==1 ? statusMask=0 :  statusMask=1; 
	jQuery('.container_header_img').unbind("mouseenter mouseleave");
	if(statusMask==1){
		jQuery('.container_header_img').on("mouseenter", function(){
			jQuery('.header_mask').css({"bottom":"-60px"});
		});
		jQuery('.container_header_img').on("mouseleave", function(){
			jQuery('.header_mask').css({"bottom":"5px"});
		});
	}
	else{
		jQuery('.container_header_img').on("mouseenter", function(){
			jQuery('.header_mask').css({"bottom":"5px"});
		});
		jQuery('.container_header_img').on("mouseleave", function(){
			jQuery('.header_mask').css({"bottom":"-60px"});
		});
	}
}

function check_mobile_for_mask(){
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		jQuery('.container_header_img').attr({"onclick":""}).unbind("mouseenter mouseleave");
	}
	else{
		jQuery('.container_header_img').attr({"onclick":"animation_mask();"});
	}
}
	
	/******** Прятать маску ********/


	/******** Cлайдер (start) ********/

var countNow=1,		// Номер слайда который сейчас видим
nameSlideNow=".projects";	// Селектор слайда который сейчас видим

function slider(){		// основная ф-ия для работы слайдов
	jQuery('#projects_btn, #about_me_btn, #contacts_btn').on("click",function(){
		var count=0, cn, i=0;
	
		switch(this.id) {
			case "projects_btn":count=1;break;
			case "about_me_btn":count=2;break;
			case "contacts_btn":count=3;break;
			default: count=1;
		}
	
		if (countNow!= count){
			if(countNow<count){
				for ( ;countNow<count; countNow++){
					anim_left(nameSlideNow);
					cn= countNow+1;
					check_slide_now(cn);
	
					if (count==countNow+1){
						anim_center(nameSlideNow);
					}
				}
				
			}
			else if(countNow>count){
				for ( ;countNow>count; countNow--){
					anim_right(nameSlideNow);
					cn=countNow-1;
					check_slide_now(cn);
					if (count==countNow-1){
						anim_center(nameSlideNow);
					}
				}
			}
		}
	});
}
function check_slide_now(cn){ 	// меняет значение nameSlideNow
	switch(cn){
		case 1: nameSlideNow=".projects";break;
		case 2: nameSlideNow=".about_me";break;
		case 3: nameSlideNow=".contacts";break;
		default: nameSlideNow=".projects";break;
	}
}
function anim_left(slide){ 		// анимация слайда влево
	jQuery(slide).animate({"left":"-100%", "opacity":"0"}, 300);
}
function anim_right(slide){ 	// анимация слайда вправо
	jQuery(slide).animate({"left":"100%", "opacity":"0"}, 300);
}
function anim_center(slide){ 	// анимация слайда в центр
	jQuery(slide).animate({"left":"0","text-align":"center", "opacity":"1"}, 300);
}

	/******** Cлайдер (end) ********/

	/******** Информация про проект(start) ********/

function show_info(){ // анимация показа информации проекта
	jQuery('.projects ul>li>div').on("click", function(){	// Выводит инфо про проект
		if(time_out==false){ // timeout чтобы часто не отправлять запрос серверу
			getInfoAjax(this.getAttribute("name"));

			if (jQuery(".panel_info").css('opacity')==0){
				jQuery(".panel_info").animate({"opacity":"1"},300);
			}
			jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});

			setTimeout(workCustomScroll,300 ,'#comment'); // добавление кастомного скролла

			time_out=true;
			setTimeout(function(){time_out=false;},2000);
		}
	});

	jQuery('.text_pi').on("click", "div#link", function(){ // переход на страницу по кнопке
		var link = this.getAttribute("src");
		window.open(link, '_blank');
	});

	jQuery('.close_pi').on("click", function(){	// Скрывает инфо про проект
		hide_info();
	});
}
function getInfoAjax(name){ // получение инфо через Ajax
	jQuery.ajax({
		type: "POST",
		url: "/includes/ajax/get_info_project.php",
		data: {"name":name, "lang":lang},
		dataType: 'json',
		cache: false,
		success: function(text){
			var htmlInfoProject = "<div class='error'>Ошибка! Данные не найдены.</div>";

			if (text!="error"){
				htmlInfoProject = "<div id='name'>"+name+"</div>"+
				"<div class='container_bl'>";
				var langText="";

				if (text["link"]!= null){
					switch(lang){
						case 'ru': langText="ПЕРЕЙТИ";break;
						case 'en': langText="FOLLOW";break;
						case 'ua': langText="ПЕРЕЙТИ";break;
						default: break;
					}
					htmlInfoProject = htmlInfoProject + "<div class='container_bl2'><div id='link' src='"+text["link"]+"'><div class='button_link'>"+langText+"</div></div></div>";
				}

				if (text["github"]!= null){
					htmlInfoProject = htmlInfoProject + "<div class='container_bl2'><div id='link' src='"+text["github"]+"'><div class='button_link'>Github</div></div></div>";
				}
				if(text["comment_"+lang]==null){
					text["comment_"+lang]="";
				}
				switch(lang){
					case 'ru': langText="Комментарий";break;
					case 'en': langText="Comment";break;
					case 'ua': langText="Коментар";break;
					default: break;
				}
				htmlInfoProject = htmlInfoProject + "</div>"+
				"<div class='comment_text'><div id='comment_text_back'></div><div id='comment_text_back2'>"+langText+"</div></div><div id='comment'>"+text["comment_"+lang]+"</div>";
			}
			jQuery(".text_pi").html(htmlInfoProject);
		}
	});
}
function hide_info(){ // анимация скрывания информации проекта
	jQuery(".panel_info").animate({"opacity":"0"},300);
	setTimeout(function(){jQuery(".text_pi").text("");}, 300);
	jQuery(".panel_info").css({"pointer-events":"none", "display":"none"});
}	
	/******** Информация про проект(end) ********/

	/******** Язык(start) ********/

function lang_events(){
	
	if(lang!='en'){
		jQuery('.en').on("click", function(){
			window.location.replace("/lang/en/index.php")
		});
	}
	if(lang!='ua'){
		jQuery('.ua').on("click", function(){
			window.location.replace("/lang/ua/index.php")
		});
	}
	if(lang!='ru'){
		jQuery('.ru').on("click", function(){
			window.location.replace("/index.php")
		});
	}
}

	/******** Язык(end) ********/

	/******** Информационная панель сверху(start) ********/

var MessagesMsgboard=[],
	statusWorkMsgboard=false,
	secanim=400,
	sec=1200;

function show_msginfo(message){
	MessagesMsgboard.push(message);
	
	if(statusWorkMsgboard==false){
		statusWorkMsgboard=true;
		turn_msginfo();
	}
}
function turn_msginfo(){
	// comebackThisFunc= setTimeout(()=>{statusWorkMsgboard=false;},sec+secanim+secanim);
	if(MessagesMsgboard.length!=0){
		var msgboard= jQuery(".msgboard");

		msgboard.html(MessagesMsgboard.shift());
		msgboard.css({"display":"block"});
		msgboard.animate({"opacity":"1", "top":"-10px"},secanim);
		setTimeout(function(){
			msgboard.animate({"opacity":"0","top":"-70px"},secanim);
			setTimeout(()=>{msgboard.css({"display":"none"});}, secanim);
		}, sec);

		setTimeout(turn_msginfo, sec+secanim+100);
		// clearTimeout(comebackThisFunc);
	}
	else{
		statusWorkMsgboard=false;
	}
	
}

	/******** Информационная панель сверху(end) ********/

	/******** Форма обратной связи(start) ********/

function check_feedback_data(){
	var email= jQuery(".contacts input[name=email]").val().trim(),
		msg= jQuery(".contacts textarea[name=message]").val(),
		errors=[],
		dtxt="";

	if(email==""){
		switch(lang){
			case 'ru': dtxt="Вы не ввели свою почту.";break;
			case 'en': dtxt="You have not entered your mail.";break;
			case 'ua': dtxt="Ви не ввели свою пошту.";break;
			default: break;
		}
		errors.push(["email", dtxt]);
	}
	else if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)){
		switch(lang){
			case 'ru': dtxt="Адрес электронной почты должен быть формата: example@example.com";break;
			case 'en': dtxt="The email address must be in the format: example@example.com";break;
			case 'ua': dtxt="Адреса електронної пошти повинна бути формату: example@example.com";break;
			default: break;
		}
		errors.push(["email", dtxt]);
	}
	else if(email=="sokolovalerii@gmail.com"){
		switch(lang){
			case 'ru': dtxt="Вы ввели мою почту, нужна ваша.";break;
			case 'en': dtxt="You entered my mail, I need yours.";break;
			case 'ua': dtxt="Ви ввели мою пошту, потрібна ваша.";break;
			default: break;
		}
		errors.push(["email", dtxt]);
	}

	if(msg==""){
		switch(lang){
			case 'ru': dtxt="Вы не ввели сообщение.";break;
			case 'en': dtxt="You have not entered a message.";break;
			case 'ua': dtxt="Ви не ввели повідомлення.";break;
			default: break;
		}
		errors.push(["message", dtxt]);
	}
	else if(!/^[0-9a-zA-Zа-яА-ЯёЁъЪіІїЇэЭєЄ.,:;/&\-_?!+=@"#№%'()[\]\s]+$/.test(msg)){
		switch(lang){
			case 'ru': dtxt="В сообщении присутствуют запрещенные символы. <br>Разрешена латиница и криллица. <br>Символы";break;
			case 'en': dtxt="The message contains prohibited characters. <br> Latin and Cyrillic are allowed. <br> Symbols";break;
			case 'ua': dtxt="У повідомленні присутні заборонені символи. <br> Дозволена латиниця і кирилиця. <br> Символи";break;
			default: break;
		}
		dtxt+=' . , ; : ? ! / _ + = - @ " '+"'"+' № # % ( ) [ ]';
		errors.push(["message", dtxt]);
	}

	if(show_error_feedback(errors)){

		var msgboard= (resultPostMail)=>{
			if (resultPostMail){
				switch(lang){
					case 'ru': dtxt="Сообщение отправлено";break;
					case 'en': dtxt="Message sent";break;
					case 'ua': dtxt="Повідомлення відправлено";break;
					default: break;
				}
			}
			else{
				switch(lang){
					// case 'ru': dtxt="Ошибка отправки";break;
					// case 'en': dtxt="Sending error";break;
					// case 'ua': dtxt="Помилка відправки";break;
					case 'ru': dtxt="Временно не работает";break;
					case 'en': dtxt="Temporarily not working";break;
					case 'ua': dtxt="Тимчасово не працює";break;
					default: break;
				}
			}
			show_msginfo(dtxt);
		};

		post_mail(email, msg, msgboard);
	}
}

function post_mail(email, msg, msgboard){
	jQuery(".submit_feedback").unbind("click");
	jQuery(".submit_feedback span").css({"display":"none"});
	jQuery(".submit_feedback").append('<img src="/images/main_pictures/load.gif">');
	var result = (status)=>{
		jQuery(".submit_feedback img").remove();
		jQuery(".submit_feedback span").css({"display":"inline-block"});
		msgboard(status);
		jQuery(".submit_feedback").on("click", check_feedback_data);
	};
	jQuery.ajax({
		type: "POST",
		url: "/includes/ajax/send_mail.php",
		data: {"email":email, "msg":msg, "lang":lang},
		dataType: 'json',
		cache: false,
		success: function(answer){
			result(answer);
		},
		error: function(error){
			result(false);
		}
	})
}

function show_error_feedback(errors){
	var elem=jQuery(".feedback_error");
	elem.css({"display":"none"});
	jQuery(".contacts .error_input").removeClass("error_input");

	if(errors.length!=0){
		errors.forEach(function(error){
			jQuery(".contacts [name="+error[0]+"]").addClass("error_input");
		});
		elem.css({"display":"block"});
		elem.html(errors[0][1]);

		return false;
	}
	return true;
}

// var resultPostMail=false;

// function post_mail(email, msg){
// 	resultPostMail=false;
// 	jQuery.ajax({
// 		type: "POST",
// 		url: "/includes/ajax/send_mail.php",
// 		data: {"email":email, "msg":msg, "lang":lang},
// 		dataType: 'json',
// 		cache: false,
// 		success: function(answer){
// 			if(answer){resultPostMail=true;};
// 		}
// 	})
// }

	/******** Форма обратной связи(end) ********/
