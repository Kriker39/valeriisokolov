
var hide; // обьявление переменной для задержки анимации спрятывания

jQuery(document).ready(function(){
	setTimeout(workCustomScroll,0 ,'.container_projects');
	setTimeout(workCustomScroll,10 ,'.about_me div');
});

function workCustomScroll(name_elem){
	var valueAnim= 0, // значение отступа сверху для .customScroll
		stepScroll= 100, // шаг скроллинга
		valuePositionMouse; // динамическое значение положения мышки 

	addCustomScroll(jQuery(name_elem)); // добавляет блоки для реализации скролла

	jQuery(name_elem).on("scroll",function(){ // фиксация скролла в блоке
		jQuery(name_elem+" .container_scroll").css("top",jQuery(name_elem).scrollTop()); 
	});

	onMovePage(stepScroll, name_elem);

	onMoveScroll(stepScroll, name_elem);

}

function addCustomScroll(element) { // добавляет блоки для реализации скролла
    if((element[0].scrollHeight > element[0].clientHeight)) // проверка нужен ли вертикальный скролл
    {
    	element.css("overflow","hidden");
    	element.append("<div class='container_scroll'><div class='container2_scroll'>"+
    		"<div class='customScroll'></div>"+
    		"</div></div>");
    }

    if((element[0].scrollWidth > element[0].clientWidth)) // проверка нужен ли горизонтальный скролл
    {

    }
}

function onMovePage(stepScroll, name_elem){ // работа скролла при скроллинге мышкой
	jQuery(name_elem).bind("mousewheel", function(e){ // отслеживание работы скролла
		clearTimeout(hide); // отменяет задержку спрятывания
		hide= setTimeout(function(){ // задержка спрятывания
			jQuery(name_elem+" .container_scroll").animate({"opacity":"0"},300);
		}, 1500);

		if(jQuery(name_elem+" .container_scroll").css("opacity")==0) // проверка видимости скролла(если невидим -> выполнить код)
		{
			jQuery(name_elem+" .container_scroll").animate({"opacity":"1"}, 100); // анимация показывания скролла
		}

		var heightConteinerScroll2= jQuery(name_elem+" .container_scroll .container2_scroll").height(), // высота 2-го контейнера скролла
			heightBtnScroll= jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").height(), // высота кнопки скролла
			heightElemData= jQuery(name_elem)[0].scrollHeight, // высота контента в блоке куда вставляется скролла
			heightElem= jQuery(name_elem).height(), // высота блока в который вставляется скролл
			heightElemDataWithoutElem= Math.round(heightElemData-heightElem), // у высоты контента отнимается высота блока в который вставляется скролл

			valueElemDataScroll= jQuery(name_elem).scrollTop(), // отступ для скроллинга контента

			sumScrolls= Math.round(heightElemDataWithoutElem/stepScroll), // максимально количество шагов скролла

			stepAnim= (heightConteinerScroll2-heightBtnScroll)/sumScrolls, // шаг в px для анимации скролла
			stepNow= Math.ceil(valueElemDataScroll/stepScroll); // шаг на котором сейчас находятся блоки
	
		if((stepNow==0 && e.originalEvent.wheelDelta > 0) || (stepNow==sumScrolls && e.originalEvent.wheelDelta < 0)) {} // блокирует если выходит за границы
		else
		{
			if(e.originalEvent.wheelDelta < 0){	// определяет куда крутится колесико мыши
				valueElemDataScroll+= stepScroll;
				stepNow++;
			}
			else if(e.originalEvent.wheelDelta > 0){ 
				valueElemDataScroll-= stepScroll;
				stepNow--;
			}

			valueAnim=stepAnim*stepNow; 

			if (stepNow==sumScrolls){ // фикс бага снизу скролла
				valueAnim=heightConteinerScroll2-heightBtnScroll;
			}

			jQuery(name_elem).scrollTop(valueElemDataScroll); // устанавливает значение скролла
			
			jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").animate({"top":valueAnim},15); // анимация скролла
		}
	});
}

function onMoveScroll(stepScroll, name_elem){ // работа скролла при скроллинге через сам скролл

	jQuery(name_elem+" .container_scroll").bind("mouseenter", function(){
		clearTimeout(hide);
		jQuery(name_elem+" .container_scroll").unbind("mouseleave");
		if(jQuery(this).css("opacity")==0){
			jQuery(this).animate({"opacity":"1"},300);
		}

		jQuery(name_elem+" .container_scroll").bind("mouseleave",function(){
			hide=setTimeout(function(){
				jQuery(name_elem+" .container_scroll").animate({"opacity":"0"},300);
			},1500);
		});
	});
	

	jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").on('mousedown', function(e){ // отслеживание нажатия на кнопку скролла
		if (e.which==1) // выполняется если нажата ЛКМ
		{
			jQuery(name_elem+" .container_scroll").unbind("mouseleave");
			jQuery(name_elem+" .container_scroll").unbind("mouseenter");
			clearTimeout(hide);

			var heightConteinerScroll= jQuery(name_elem+" .container_scroll").height(), // высота 1-го контейнера скролла
				heightConteinerScroll2= jQuery(name_elem+" .container_scroll .container2_scroll").height(), // высота 2-го контейнера скролла
				heightBtnScroll= jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").height(), // высота кнопки скроллинга
				heightElemData= jQuery(name_elem)[0].scrollHeight, // высота контента в блоке куда вставляется скролла
				heightElem= jQuery(name_elem).height(), // высота блока в который вставляется скролл
				heightScrollWithoutBtn= heightConteinerScroll2-heightBtnScroll, // у высоты 2-го контейнера скролла отнимается высота кнопки скролла
				heightElemDataWithoutElem= Math.round(heightElemData-heightElem), // у высоты контента отнимается высота блока в который вставляется скролл 
				heightBody=jQuery(window).height(), // высота окна
				topConteinerScroll2= parseInt(jQuery(name_elem+" .container_scroll .container2_scroll").css("top")), // отступа сверху 2-го контейнера скролла 
				heightIndentScroll= jQuery(name_elem+" .container_scroll .container2_scroll").offset(), // расположение 2-го контейнера скролла относительно страницы(return top, left)
				
				stepElemScroll= heightElemDataWithoutElem/heightScrollWithoutBtn, // значение в сколько раз высота скролла меньше высоты контента в блоке
				valueToMove, // отступ для кнопки скролла
				valueElemScroll=0, // scrollTop для контента
				saveLastValueTopScroll=0; // сохраняет предыдущее значение отступа скролла для определения направления курсора

			jQuery('body').css("user-select","none");

			jQuery('body').bind('mouseup', function(e){ // прирывание при отпускании ЛКМ
					if (e.which==1){
						stopWorkMoveScroll(name_elem);
					}
			});

			jQuery('body').bind("mouseleave",function(){ // прирывание при выходе курсора за предели body
				stopWorkMoveScroll(name_elem);
			});
		
			jQuery('body').bind("mousemove", function(e){ // отслеживание движения курсора
				var valueTopScroll= parseInt(jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").css("top")); // динамическое значение отступа кнопки скролла

				valuePositionMouse=e.clientY; // определяет значение курсора по верткила
				valueToMove= valuePositionMouse-heightIndentScroll.top-(heightBtnScroll/2); // динамическое значение которое устанавливает отступ кнопки скролла + курсор выравнивается по центру кнопки

				valueElemScroll=stepElemScroll*valueTopScroll;

				if(valueToMove>=0 && valueToMove<=heightScrollWithoutBtn){ // выполнение скроллинга
					jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").css("top",valueToMove);
					jQuery(name_elem).scrollTop(valueElemScroll);
				}
				if(valueToMove<0){
					jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").css("top",0);
					jQuery(name_elem).scrollTop(valueElemScroll);
				}
				if(valueToMove>heightScrollWithoutBtn)
				{
					jQuery(name_elem+" .container_scroll .container2_scroll .customScroll").css("top",heightConteinerScroll2-heightBtnScroll);
					jQuery(name_elem).scrollTop(valueElemScroll);
				}
				saveLastValueTopScroll=valueTopScroll;
			});
		}
	});
}

function stopWorkMoveScroll(name_elem){ // при отпускании кнопки скрола устанавливает таймер для видимости и делает перебинд движения по скроллу

	jQuery('body').unbind("mousemove");
	jQuery('body').unbind('mouseup');
	jQuery('body').unbind('mouseleave');
	jQuery('body').css("user-select","auto");

	hide=setTimeout(function(){
		jQuery(name_elem+" .container_scroll").animate({"opacity":"0"},300);
	},1500);

	jQuery(name_elem+" .container_scroll").bind("mouseenter", function(){
		clearTimeout(hide);
		jQuery(name_elem+" .container_scroll").unbind("mouseleave");
		if(jQuery(this).css("opacity")==0){
			jQuery(this).animate({"opacity":"1"},300);
		}

		jQuery(name_elem+" .container_scroll").bind("mouseleave",function(){
			hide=setTimeout(function(){
				jQuery(name_elem+" .container_scroll").animate({"opacity":"0"},300);
			},1500);
		});
	});
}

