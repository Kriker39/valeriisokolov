jQuery('document').ready(function(){

	jQuery('#projects_btn, #about_me_btn, #contacts_btn').on("click",function(){ 	// Слайдер 
		slider(this.id); 
	});

	jQuery('.projects ul>li>div').on("click", function(){	// Выводит инфо про проект
		var id = this.getAttribute("value");
		show_info(id);
	});

	jQuery('.close_pi').on("click", function(){		// Скрывает инфо про проект
		hide_info();
	});

	jQuery('body').css("visibility","visible");		// Для прогрузки всех скриптов

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

function show_info(id){
	jQuery(".text_pi").text(id);
	jQuery(".panel_info").animate({"opacity":"1"},300);
	jQuery(".panel_info").css("pointer-events","auto");
}
function hide_info(){
	jQuery(".text_pi").text("");
	jQuery(".panel_info").animate({"opacity":"0"},300);
	jQuery(".panel_info").css("pointer-events","none");
}	

	/******** Информация про проект(end) ********/