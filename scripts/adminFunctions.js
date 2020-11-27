jQuery(document).ready(function(){
	btnAdd_admin_panel();
	btnUpdate_admin_panel();
	btnDelete_admin_panel();
});

var langs=["ru", "en", "ua"];

/******** Добавить проект(start) ********/

function btnAdd_admin_panel(){ 
	jQuery('#add_project').on("click", function(){
		var options="", textareas="";
		langs.forEach(function(val){
			options+="<option value='comment_"+val+"'>"+val+"</option>";
			textareas+="<textarea name='comment_"+val+"'></textarea>";
		});
		jQuery(".text_pi").html('<div class="container_admin_project">'+
			'<p><button id="submit_add_project">Добавить</button></p>'+
			'<p>Имя проекта*: <br><input type="text" name="name"></p>'+
			'<p>Ссылка на проект: <br><input type="text" name="link"></p>'+
			'<p>Ссылка на github проекта: <br><input type="text" name="link_github"></p>'+
			'<p>Коментарий: <select>'+options+'</select><br>'+textareas+
			'</div>');

		if (jQuery(".panel_info").css('opacity')==0){
			jQuery(".panel_info").animate({"opacity":"1"},300);
		}
		change_textarea_coments();
		jQuery(".container_admin_project textarea[name='comment_ru']").css({"z-index":2});
		jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});
	});

	submit_add_project();
}

function submit_add_project(){
	jQuery('.text_pi').on("click", "button#submit_add_project", function(){
		var name=jQuery('.container_admin_project input[name="name"]').val().trim(),
			link=jQuery('.container_admin_project input[name="link"]').val().trim(),
			link_github=jQuery('.container_admin_project input[name="link_github"]').val().trim(),
			dataAjax={"name":name, "link":link, "link_github": link_github};

		langs.forEach(function(name){
			dataAjax["comment_"+name]= jQuery('.container_admin_project textarea[name=comment_'+name+']').val().trim();
		});
	
		if(name.length>0){
			jQuery('.container_admin_project input[name="name"]').css({"border-color":"inherit", "background-color":"inherit"});
			jQuery.ajax({
				type: "POST",
				url: "includes/ajax/admin_add_project.php",
				data: dataAjax,
				dataType: 'json',
				cache: false,
				success: function(msg){
					if(msg=="0"){location.reload();}
					else if(msg=="1"){alert("Проект с таким именем уже существует.");}
					else if(msg=="2"){alert("Проект с такой ссылкой уже существует.");}
					else{alert("Проблемы с базой данных. Добавление не удалось");}
				}
			});
		}
		else{jQuery('.container_add_project input[name="name"]').css({"border-color":"red", "background-color":"#FFC7C7"});}
	});
}

/******** Добавить проект(end) ********/

/******** Редактировать проект(start) ********/

function btnUpdate_admin_panel(){
	jQuery('#update_project').on("click", function(){
		change_click_projects(this);
		jQuery('.projects ul>li>div').on("click", function(){
			var name=jQuery(this).attr("name");
			jQuery.ajax({
				type: "POST",
				url: "includes/ajax/get_info_project.php",
				data: {"name":name, "lang":"all"},
				dataType: 'json',
				cache: false,
				success: function(project){
					if(project!="error"){
						var nameComment=[], options="", textareas="";
						
						for(var index of Object.keys(project)){
							if (/^(comment_){1}[a-z]{2}$/.test(index)){
								if(project[index]==null){
									project[index]="";
								}
								options+="<option value='"+index+"'>"+index.substr(8)+"</option>";
								textareas+="<textarea name='"+index+"'>"+project[index]+'</textarea>';
								nameComment.push(index);
							}
						}

						jQuery(".text_pi").html('<div class="container_admin_project">'+
							'<p><button id="submit_update_project">Редактировать</button><span style="font-size: 30px;">&ensp;->&ensp;'+name+'</span></p>'+
							'<p>Имя проекта*: <br><input type="text" name="name" value="'+project['name']+'"></p>'+
							'<p>Ссылка на проект: <br><input type="text" name="link" value="'+project['link']+'"></p>'+
							'<p>Ссылка на github проекта: <br><input type="text" name="link_github" value="'+project['github']+'"></p>'+
							'<p>Коментарий: <select>'+options+'</select><br>'+textareas+'</p>'+
							'</div>');
						if (jQuery(".panel_info").css('opacity')==0){
							jQuery(".panel_info").animate({"opacity":"1"},300);
						}
						jQuery(".container_admin_project textarea[name='comment_ru']").css({"z-index":2});
						jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});
						change_textarea_coments();
						submit_update_project(project["id"], nameComment);
					}
					else{alert("Проблемы с базой данных. Не удалось получить данные  о проекте.");}
				}
			});
		});
	});
}

function change_textarea_coments(){ // смена текстовых полей под язык через выпадающий список
	jQuery(".container_admin_project select").on("change",function(){
		var val=jQuery(".container_admin_project select").val();
		jQuery(".container_admin_project textarea").css({"z-index":1});
		jQuery(".container_admin_project textarea[name="+val+"]").css({"z-index":2});
	});
}

function submit_update_project(id, comNames){
	jQuery('.text_pi').on("click", "button#submit_update_project", function(){
		var name=jQuery('.container_admin_project input[name="name"]').val().trim(),
			link=jQuery('.container_admin_project input[name="link"]').val().trim(),
			link_github=jQuery('.container_admin_project input[name="link_github"]').val().trim(),
			dataAjax={"id":id, "name":name, "link":link, "link_github": link_github};

		comNames.forEach(function(name){
			dataAjax[name]= jQuery('.container_admin_project textarea[name='+name+']').val().trim();
		});

		if(name.length>0){
			jQuery('.container_admin_project input[name="name"]').css({"border-color":"inherit", "background-color":"inherit"});
			jQuery.ajax({
				type: "POST",
				url: "includes/ajax/admin_update_project.php",
				data: dataAjax,
				dataType: 'json',
				cache: false,
				success: function(msg){
					if(msg=="0"){location.reload();}
					else if(msg=="1"){alert("Проект с таким именем уже существует.");}
					else if(msg=="2"){alert("Проект с такой ссылкой уже существует.");}
					else{alert("Проблемы с базой данных. Редактирование не удалось");}
				}
			});
		}
		else{jQuery('.container_update_project input[name="name"]').css({"border-color":"red", "background-color":"#FFC7C7"});}
	});
}
	
/******** Редактировать проект(end) ********/

/******** Удалить проект(start) ********/

function btnDelete_admin_panel(){
	jQuery('#delete_project').on("click", function(){
		change_click_projects(this);
		jQuery('.projects ul>li>div').on("click", function(){
			var name=jQuery(this).attr("name"),
				question= confirm("Вы уверены что хотите удалить проект -> "+name+" ?");
			if(question){
				jQuery.ajax({
					type: "POST",
					url: "includes/ajax/admin_delete_project.php",
					data: "name="+name,
					dataType: 'json',
					cache: false,
					success: function(msg){
						if(msg=="0"){location.reload();}
						else if(msg=="1"){alert("Ошибка удаления. Проект с таким именем не найден.");}
						else{alert("Проблемы с базой данных. Удаление не удалось.");}
					}
				});
			}
		});
	});

	
}

/******** Удалить проект(end) ********/

/******** Смена фокуса кнопок upd и del(start) ********/

var active_btn_admin_panel=0;

function change_click_projects(elem){
	if(elem.id=="update_project"){
		if(active_btn_admin_panel=="delete"){
			jQuery("#delete_project").unbind("click");
			btnDelete_admin_panel();
			jQuery("#delete_project").css({"border-color":"#4444FF","background-color":"#7676D0"});
		}
		active_btn_admin_panel="update";
	}
	else if(elem.id=="delete_project"){
		if(active_btn_admin_panel=="update"){
			jQuery("#update_project").unbind("click");
			btnUpdate_admin_panel();
			jQuery("#update_project").css({"border-color":"#4444FF","background-color":"#7676D0"});
		}
		active_btn_admin_panel="delete";
	}

	jQuery('.projects ul>li>div').unbind("click");
	jQuery(elem).css({"border-color":"#6BB26B","background-color":"lightgreen"});
	jQuery(elem).unbind("click");
	jQuery(elem).on("click", function(){
		jQuery(elem).unbind("click");
		if(active_btn_admin_panel=="update"){btnUpdate_admin_panel();}
		else if(active_btn_admin_panel=="delete"){btnDelete_admin_panel();}
		jQuery(elem).css({"border-color":"#4444FF","background-color":"#7676D0"});
		active_btn_admin_panel=0;
		jQuery('.projects ul>li>div').unbind("click");
		show_info();
	});
}

/******** Смена фокуса кнопок upd и del(end) ********/

/******** Информация проекта для админа(start) ********/

function getInfoAjax(name){ // получение инфо через Ajax для админа
	jQuery.ajax({
		type: "POST",
		url: "/includes/ajax/get_info_project.php",
		data: {"name":name, "lang":"all"},
		dataType: 'json',
		cache: false,
		success: function(text){
			var htmlInfoProject = "<div class='error'>Ошибка! Данные не найдены.</div>";

			if (text!="error"){
				var options="", comments="";
				htmlInfoProject = "<div id='name'>"+name+"</div>"+
				"<div class='container_bl'>";

				for(var index of Object.keys(text)){
					if (/^(comment_){1}[a-z]{2}$/.test(index)){
						if(text[index]==null){
							text[index]="";
						}
						options+="<option value='"+index+"'>"+index.substr(8)+"</option>";
						comments+="<div id='"+index+"'>"+text[index]+'</div>';
						// nameComment.push(index);
					}
				}

				if (text["link"]!= null){
					htmlInfoProject = htmlInfoProject + "<div class='container_bl2'><div id='link' src='"+text["link"]+"'><div class='button_link'>ПЕРЕЙТИ</div></div></div>";
				}

				if (text["github"]!= null){
					htmlInfoProject = htmlInfoProject + "<div class='container_bl2'><div id='link' src='"+text["github"]+"'><div class='button_link'>Github</div></div></div>";
				}
				if(text["comment_"+lang]==null){
					text["comment_"+lang]="";
				}
				htmlInfoProject = htmlInfoProject + "</div>"+
				"<div class='comment_text'><div id='comment_text_back'></div><div id='comment_text_back2'>Коментарий | <select>"+options+"</select></div></div><div id='comment'>"+comments+"</div>";
				
				
				setTimeout(function(){
					jQuery("#comment>div[id='comment_ru']").css({"opacity":"1"});
					change_info_coments();
				}, 10);
			}
			jQuery(".text_pi").html(htmlInfoProject);
		}
	});
}

function change_info_coments(){ // смена блоков с коментарием под язык через выпадающий список
	jQuery(".comment_text select").on("change",function(){
		var val=jQuery(".comment_text select").val();
		jQuery("#comment>div").css({"opacity":"0"});
		jQuery("#comment>div[id="+val+"]").css({"opacity":"1"});
	});
}

/******** Информация проекта для админа(end) ********/