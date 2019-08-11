jQuery(document).ready(function(){

	jQuery('#add_project').on("click", function(){
		show_panel(this.id);
	});

	jQuery('#update_project').on("click", function(){
		
	});

	jQuery('#delete_project').on("click", function(){
		jQuery(this).css({"border-color":"#6BB26B","background-color":"lightgreen"});
		jQuery('.projects ul>li>div').unbind("click");
		jQuery('.projects ul>li>div').on("click", function(){
			deleteProject(jQuery(this).attr("name"));
		});
	});

	jQuery('.text_pi').on("click", "button#submit_add_project", function(){
		sendProject();
	});
});

function show_panel(id){ 
	if(id=='add_project'){
		jQuery(".text_pi").html('<div class="container_add_project">'+
					'<p><button type="submit" id="submit_add_project">Добавить</button></p>'+
					'<p>Имя проекта*: <br><input type="text" name="name"></p>'+
					'<p>Ссылка на проект: <br><input type="text" name="link"></p>'+
					'<p>Ссылка на github проекта: <br><input type="text" name="link_github"></p>'+
					'<p>Коментарий: <br><textarea name="comment"></textarea></p>'+
				'</div>');
	}

	if (jQuery(".panel_info").css('opacity')==0){
		jQuery(".panel_info").animate({"opacity":"1"},300);
	}
	jQuery(".panel_info").css({"pointer-events":"auto", "display":"inline"});
}

function sendProject(){
	var name=jQuery('.container_add_project input[name="name"]').val().trim(),
		link=jQuery('.container_add_project input[name="link"]').val().trim(),
		link_github=jQuery('.container_add_project input[name="link_github"]').val().trim(),
		comment=jQuery('.container_add_project textarea[name="comment"]').val().trim();

	if(name.length>0){jQuery('.container_add_project input[name="name"]').css({"border-color":"inherit", "background-color":"inherit"});}
	else{jQuery('.container_add_project input[name="name"]').css({"border-color":"red", "background-color":"#FFC7C7"});}

	if(name.length>0){
		jQuery.ajax({
			type: "POST",
			url: "includes/ajax/admin_add_project.php",
			data: "name="+name+"&link="+link+"&link_github="+link_github+"&comment="+comment,
			dataType: 'json',
			cache: false,
			success: function(msg){
				if(msg=="0"){
					location.reload();
				}
				else if(msg=="2"){
					alert("Проект с таким именем уже существует.");
				}
				else{
					alert("Проблемы с базой данных. Добавление не удалось");
				}
			}
		});
	}
}

function hide_info(){ // анимация скрывания информации проекта
	jQuery(".panel_info").animate({"opacity":"0"},300);
	setTimeout(function(){jQuery(".text_pi").text("");}, 300);
	jQuery(".panel_info").css({"pointer-events":"none", "display":"none"});
}	

function deleteProject(name){
	var question= confirm("Вы уверены что хотите удалить проект -> "+name+" ?");
	if(question){
		jQuery.ajax({
			type: "POST",
			url: "includes/ajax/admin_delete_project.php",
			data: "name="+name,
			dataType: 'json',
			cache: false,
			success: function(msg){
				if(msg=="0"){
					location.reload();
				}
				else if(msg=="1"){
					alert("Ошибка удаления. Проект с таким именем не найден.");
				}
				else{
					alert("Проблемы с базой данных. Удаление не удалось.");
				}
			}
		});
	}
	jQuery('.projects ul>li>div').unbind("click");
	jQuery('.projects ul>li>div').on("click", function(){	// Выводит инфо про проект
		if(time_out==false){
			var name = this.getAttribute("name");
			show_info(name);
			setTimeout(workCustomScroll,300 ,'#comment');
			time_out=true;
			setTimeout(function(){time_out=false;},2000);
		}
	});console.log('#'+name);
	jQuery('#delete_project').css({"border-color":"#4444FF","background-color":"#7676D0"});
}