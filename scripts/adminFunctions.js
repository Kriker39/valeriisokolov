jQuery(document).ready(function(){
	btnAdd_admin_panel();
	btnUpdate_admin_panel();
	btnDelete_admin_panel();
});

/******** Добавить проект(start) ********/

function btnAdd_admin_panel(){ 
	jQuery('#add_project').on("click", function(){
		jQuery(".text_pi").html('<div class="container_admin_project">'+
			'<p><button id="submit_add_project">Добавить</button></p>'+
			'<p>Имя проекта*: <br><input type="text" name="name"></p>'+
			'<p>Ссылка на проект: <br><input type="text" name="link"></p>'+
			'<p>Ссылка на github проекта: <br><input type="text" name="link_github"></p>'+
			'<p>Коментарий: <br><textarea name="comment"></textarea></p>'+
			'</div>');

		if (jQuery(".panel_info").css('opacity')==0){
			jQuery(".panel_info").animate({"opacity":"1"},300);
		}
		jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});
	});

	submit_add_project();
}

function submit_add_project(){
	jQuery('.text_pi').on("click", "button#submit_add_project", function(){
		var name=jQuery('.container_admin_project input[name="name"]').val().trim(),
			link=jQuery('.container_admin_project input[name="link"]').val().trim(),
			link_github=jQuery('.container_admin_project input[name="link_github"]').val().trim(),
			comment=jQuery('.container_admin_project textarea[name="comment"]').val().trim();
	
		if(name.length>0){
			jQuery('.container_admin_project input[name="name"]').css({"border-color":"inherit", "background-color":"inherit"});
			jQuery.ajax({
				type: "POST",
				url: "includes/ajax/admin_add_project.php",
				data: "name="+name+"&link="+link+"&link_github="+link_github+"&comment="+comment,
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
				data: "name="+name,
				dataType: 'json',
				cache: false,
				success: function(project){
					if(project!="error"){
						jQuery(".text_pi").html('<div class="container_admin_project">'+
							'<p><button id="submit_update_project">Редактировать</button><span style="font-size: 30px;">&ensp;->&ensp;'+name+'</span></p>'+
							'<p>Имя проекта*: <br><input type="text" name="name" value="'+project['name']+'"></p>'+
							'<p>Ссылка на проект: <br><input type="text" name="link" value="'+project['link']+'"></p>'+
							'<p>Ссылка на github проекта: <br><input type="text" name="link_github" value="'+project['github']+'"></p>'+
							'<p>Коментарий: <br><textarea name="comment">'+project['comment']+'</textarea></p>'+
							'</div>');
						if (jQuery(".panel_info").css('opacity')==0){
							jQuery(".panel_info").animate({"opacity":"1"},300);
						}
						jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});
						submit_update_project(project["id"]);
					}
					else{alert("Проблемы с базой данных. Не удалось получить данные  о проекте.");}
				}
			});
		});
	});
}

function submit_update_project(id){
	jQuery('.text_pi').on("click", "button#submit_update_project", function(){
		var name=jQuery('.container_admin_project input[name="name"]').val().trim(),
			link=jQuery('.container_admin_project input[name="link"]').val().trim(),
			link_github=jQuery('.container_admin_project input[name="link_github"]').val().trim(),
			comment=jQuery('.container_admin_project textarea[name="comment"]').val().trim();
	
		if(name.length>0){
			jQuery('.container_admin_project input[name="name"]').css({"border-color":"inherit", "background-color":"inherit"});
			jQuery.ajax({
				type: "POST",
				url: "includes/ajax/admin_update_project.php",
				data: "id="+id+"&name="+name+"&link="+link+"&link_github="+link_github+"&comment="+comment,
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

