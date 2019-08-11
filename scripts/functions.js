var time_out=false; // задержка для выполнения некоторых команд(уменьшение нагрузки)

jQuery(document).ready(function(){

	jQuery('#projects_btn, #about_me_btn, #contacts_btn').on("click",function(){ 	// Слайдер 
		slider(this.id); 
	});

	jQuery('.projects ul>li>div').on("click", function(){	// Выводит инфо про проект
		if(time_out==false){
			var name = this.getAttribute("name");
			show_info(name);
			setTimeout(workCustomScroll,300 ,'#comment');
			time_out=true;
			setTimeout(function(){time_out=false;},2000);
		}
	});

	jQuery('.text_pi').on("click", "div#link", function(){
		var link = this.getAttribute("src");
		window.open(link, '_blank');
	});

	jQuery('.close_pi').on("click", function(){		// Скрывает инфо про проект
		hide_info();
	});

	jQuery('body').css("visibility","visible");		// Для безпалевной работы catch_error_image()

});


	/******** Ошибка картинки(start) ********/

function catch_error_image(){	// Ловит ошибку img и заменяет путь на картинку ошибки
	jQuery('img').on('error', function(){	
		jQuery(this).attr("src", "images/main_pictures/error_image.png");
	});
}
	
	/******** Ошибка картинки(end) ********/



	/******** Cлайдер (start) ********/

var countNow=1,		// Номер слайда который сейчас видим
nameSlideNow=".projects";	// Селектор слайда который сейчас видим

function slider(nameSlide){		// основная ф-ия для работы слайдов
	var count=0, cn, i=0;

	switch(nameSlide) {
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

function show_info(name){ // анимация показа информации проекта
	getInfoAjax(name);
	if (jQuery(".panel_info").css('opacity')==0){
		jQuery(".panel_info").animate({"opacity":"1"},300);
	}
	jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});
}
function hide_info(){ // анимация скрывания информации проекта
	jQuery(".panel_info").animate({"opacity":"0"},300);
	setTimeout(function(){jQuery(".text_pi").text("");}, 300);
	jQuery(".panel_info").css({"pointer-events":"none", "display":"none"});
}	
function getInfoAjax(name){ // получение инфо через Ajax
	jQuery.ajax({
		type: "POST",
		url: "includes/ajax/get_info_project.php",
		data: "name="+name,
		dataType: 'json',
		cache: false,
		success: function(text){
			var htmlInfoProject = "<div class='error'>Ошибка! Данные не найдены.</div>";

			if (text!="error")
			{
				htmlInfoProject = "<div id='name'>"+name+"</div>"+
				"<div class='container_bl'>";

				if (text["link"]!= null)
				{
					htmlInfoProject = htmlInfoProject + "<div class='container_bl2'><div id='link' src='"+text["link"]+"'><div class='button_link'>ПЕРЕЙТИ</div></div></div>";
				}

				if (text["github"]!= null)
				{
					htmlInfoProject = htmlInfoProject + "<div class='container_bl2'><div id='link' src='"+text["github"]+"'><div class='button_link'>Github</div></div></div>";
				}
				htmlInfoProject = htmlInfoProject + "</div>"+
				"<div class='comment_text'><div id='comment_text_back'></div><div id='comment_text_back2'>Коментарий</div></div><div id='comment'>"+text["comment"]+"</div>";
			}
		
			jQuery(".text_pi").html(htmlInfoProject);
		}
	});
}

	/******** Информация про проект(end) ********/