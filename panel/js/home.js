var url="Ajax/AjaxController.php"
var updatedImg=true;
var updatedNews=true;
var imgs;
var news;
var newsStored;
var cLst; //les catégories
var tst;

$(document).ready(function(){ 
	console.log("document pret") 
	homeBuilder();
	});

//construction de la page d'accueil
function homeBuilder(){
	//si on à poster quelque chose de nouveau on met à jours
	if (updatedImg) 
		imgHGetters();		//récupere les X dernieres immages postées (homepage)
	else if (updatedNews) 
		newsHGetters();	//récupere les X dernieres news postées (homepage)
	else{
								//construction du contenus html
	}
}

function imgHGetters(){
	$.getJSON( url, { func : 'getAllImgs' } ).done(function( data ) {
		updatedImg=false;
		imgs=data;
		homeBuilder();
	});
}

function newsHGetters(){
	$.getJSON( url, { func : 'getAllNews' } ).done(function( data ) {
			news=data;				//met à jour la liste de news
			updatedNews=false;		//plus de mise à jour à déclarer
			});
}

//============= Handler
$("#seeNews").click(function(){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	showAllNews();
});

$("#seeCats").click(function(){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	showAllCats();
});

$("#seeImgs").click(function(){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	pageImgInit();
});

$("#newNews").click(function(){
	//code AJAX qui récupere le formulaire
	$.get( url, { func : 'getFormNewNews' } ).done(function( data ) {
		if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
		$("#dyn").html(data);
		//ajout du handler d'envois de formulaire
		$("#NewsOK").click(function(){NewNewsOK();});
		//initialisation de tinyMCE pour la zone de texte
		initMCE();
	});
});

$("#newCats").click(function(){
	//code AJAX qui récupere le formulaire
	$.get( url, { func : 'getFormCats' } ).done(function( data ) {
		if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
		$("#dyn").html(data);

		//ajout du handler de modification de lien d'image (preview)
		$("#LienCats").on('input', function() {$("#imgPreview").attr("src",$("#LienCats").val());});

		//ajout du handler d'envois de formulaire
		$("#CatsOK").click(function(){newCatsOK();});
		$.get( url, { func : 'getCatsO' } ).done(function( data ) {ordreBuilder(data),1});
	});
});

$("#newImgs").click(function(){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	//code AJAX qui récupere le formulaire
	$.get( url, { func : 'getFormImgs' } ).done(function( data ) {
		$("#dyn").html(data);

		//ajout du handler de modification de lien d'image (preview)
		$("#LienMin").on('input', function() {$("#imgMinPreview").attr("src",$("#LienMin").val());});
		$("#LienBig").on('input', function() {$("#imgBigPreview").attr("src",$("#LienBig").val());});

		//handler de choix de catégorie
		$('#Categorie').on('change', function() {getImgsOrder(this.value)});

		//ajout du handler d'envois de formulaire
		$("#ImgOK").click(function(){newImgOK();});
		buildImgCats();
	});
});

//===============================================================================//


function showAllNews(){
	console.log("aperçut des news en cours");
	if (updatedNews){
		$.getJSON( url, { func : 'getAllNews' } ).done(function( data ) {
			news=data;				//met à jour la liste de news
			newsListBuilder(news);
			updatedNews=false;		//plus de mise à jour à déclarer
			});
		}
	else{
		newsListBuilder(news);
	}
}

//construction de la liste d'aperçut des news
function newsListBuilder(data){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	$("#dyn").html("<br/>");
	for(var i=0; i<data.length;i++){
			var Cdiv=document.createElement("div");
			var Rdiv=document.createElement("div");
			var Udiv=document.createElement("div");
			var Id = document.createElement("h2");
			var t = document.createElement("h3");
			var d = document.createElement("span");
			var btnE = document.createElement("BUTTON"); 
			var btnV = document.createElement("BUTTON"); 
			var btnS = document.createElement("BUTTON"); 

			Id.appendChild(document.createTextNode(data[i]['Id']));
			Id.classList.add("col-xs-2");
			Id.classList.add("text-center");
			t.appendChild(document.createTextNode(data[i]['Titre']!="" ? data[i]['Titre'] : "-"));
			t.classList.add("col-xs-10");
			d.appendChild(document.createTextNode(data[i]['Date']));
			d.classList.add("col-xs-10");

			btnE.appendChild(document.createTextNode("Editer")); 
			btnE.classList.add("btn-primary");
			btnE.val=data[i]['Id'];
			btnE.onclick = function() {editNews(this.val)};

			btnV.appendChild(document.createTextNode("Voir")); 
			btnV.classList.add("btn-success");
			btnV.val=data[i]['Id'];
			btnV.onclick = function() {getOneNews(this.val)};

			btnS.appendChild(document.createTextNode("Supprimer")); 
			btnS.classList.add("btn-danger");
			btnS.classList.add("pull-right");
			btnS.val=data[i]['Id'];
			btnS.onclick = function() {suprNews(this.val)};



			Rdiv.appendChild(btnE);
			Rdiv.appendChild(btnV);
			Rdiv.appendChild(btnS);
			Rdiv.classList.add("col-xs-12");

			Udiv.appendChild(Id);
			Udiv.appendChild(t);
			Udiv.appendChild(d);
			
			//Udiv.appendChild(Rdiv);

			Cdiv.appendChild(Udiv);
			Cdiv.appendChild(Rdiv);
			Cdiv.classList.add("row");

			$("#dyn").append("<hr/>");
			$("#dyn").append(Cdiv);
		}
}

//récuperation d'une news unique pour l'affichée
function getOneNews(Id){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	$.getJSON( url, { func : 'getOneNews', newsId : Id } ).done(function( data ) {
			$("#dyn").html("");
			newsStored={'Id':data['Id'],'Titre':data['Titre'],'Date':data['Dat'],'Contenus':data['Contenus']};
			var Cdiv=document.createElement("div");
			var Rdiv=document.createElement("div");
			var Udiv=document.createElement("div");
			var Id = document.createElement("h2");
			var t = document.createElement("h3");
			var d = document.createElement("span");
			var c = document.createElement("div");
			var btnE = document.createElement("BUTTON"); 
			var btnV = document.createElement("BUTTON"); 
			var btnS = document.createElement("BUTTON"); 

			t.appendChild(document.createTextNode(data['Titre']!="" ? data['Titre'] : "-"));
			t.classList.add("row");

			d.appendChild(document.createTextNode(data['Dat']));
			d.classList.add("row");

			c.innerHTML=(data['Contenus']);
			c.classList.add("row");

			btnE.appendChild(document.createTextNode("Editer")); 
			btnE.classList.add("btn-primary");
			btnE.val=data['Id'];
			btnE.onclick = function() {editNews(this.val)};


			btnS.appendChild(document.createTextNode("Supprimer")); 
			btnS.classList.add("btn-danger");
			btnS.classList.add("pull-right");
			btnS.val=data['Id'];
			btnS.onclick = function() {suprNews(this.val)};



			Rdiv.appendChild(btnE);
			Rdiv.appendChild(btnS);
			Rdiv.classList.add("row");

			Udiv.appendChild(t);
			Udiv.appendChild(d);
			Udiv.appendChild(c);
			
			//Udiv.appendChild(Rdiv);

			Cdiv.appendChild(Udiv);
			Cdiv.appendChild(document.createElement("hr"));
			Cdiv.appendChild(Rdiv);
			Cdiv.classList.add("UneVraisNews");

			$("#dyn").append(Cdiv);

			});
}

function editNews(id){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	var dt;
	if (newsStored && id == newsStored['Id']){
		dt=newsStored;
		editNewsForm(dt['Titre'],dt['Contenus'],dt['Id']);
	}
	else{		
		$.getJSON( url, { func : 'getOneNews', newsId : id } ).done(function( data ) { 
			dt = data;
			editNewsForm(dt['Titre'],dt['Contenus'],dt['Id']);
		});
	}
}

function editNewsForm(titre,cont,nid){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	//code AJAX qui récupere le formulaire
	console.log("récupere le formulaire");
	$.get( url, { func : 'getFormNewNews' } ).done(function( data ) {
	$("#dyn").html(data);
	//ajout du handler d'envois de formulaire
	$("#NewsOK").click(function(){EditNewsOK();});
	$("#TitreNews").val(titre)
	$("#NewsOK").val(nid);
	$("#ContenusNews").html(cont);
	//initialisation de tinyMCE pour la zone de texte
	initMCE();
	});
}

function suprNews(nid){
	var r = confirm("VOUS ETES SUR LE POINT DE SUPPRIMER UNE NEWS!");
	if (r == true) {
	    suprNewsOK(nid);
	}
}


function suprNewsOK(nid){
	console.log("envois d'une requete de suppression (news)");
	$.post( url, { func : 'suprNews', nid : nid })
	  .done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    updatedNews=true;
	    showAllNews();
	  });
}


function NewNewsOK(){
	console.log("envois formulaire remplis (news)");
	$.post( url, { func : 'creeNews', Titre: $("#TitreNews").val(), Contenus: tinyMCE.activeEditor.getContent() })
	  .done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    updatedNews=true;
	    showAllNews();
	  });
}
function EditNewsOK(){
	console.log("envois formulaire remplis (news)");
	$.post( url, { func : 'editNews',nid: $("#NewsOK").val() , Titre: $("#TitreNews").val(), Contenus: tinyMCE.activeEditor.getContent() })
	  .done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    updatedNews=true;
	    showAllNews();
	  });
}

function initMCE(){
	tinymce.init({
    selector: "textarea",
    height: 600,
    theme: "modern",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern imagetools"
    ],
    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2: "print preview media | forecolor backcolor emoticons",
    image_advtab: true
	});

}

//=================		fin news 	 ============================

//=================    Catégories 	 ============================


function showAllCats(){
	if(tinymce){tinymce.remove();}//on suprime l'ancienne instance si elle existe
	console.log("aperçut des catégories en cours");
	$.getJSON( url, { func : 'getAllCats' } ).done(function( data ) {
		catsListBuilder(data);
		});
}

//construction de la liste des Catégorie
function catsListBuilder(data){
	$("#dyn").html("<br/>");
	console.log(data);
	for(var i=0; i<data.length;i++){
			var Cdiv=document.createElement("div");
			//var Topdiv=document.createElement("div");
			var Bandiv=document.createElement("div");
			var Btndiv=document.createElement("div");
			var Id = document.createElement("div");
			var t = document.createElement("h3");
			
			var btnE = document.createElement("BUTTON"); 
			var btnS = document.createElement("BUTTON"); 

			var bani = document.createElement("IMG"); 

			Id.appendChild(document.createTextNode("Id : "+data[i]['Id']+" | ordre : "+data[i]['Ordre']));
			t.classList.add("row");
			Id.classList.add("text-center");

			t.appendChild(document.createTextNode(data[i]['Nom'] != "" ? data[i]['Nom'] : "-"));
			t.classList.add("row");
			t.classList.add("text-center");

			bani.src=data[i]['LienB']
			bani.classList.add("img-responsive");	
			bani.classList.add("center-block");	

			btnE.appendChild(document.createTextNode("Editer")); 
			btnE.classList.add("btn-primary");
			btnE.val=data[i]['Id'];
			btnE.onclick = function() {editCats(this.val)};

			btnS.appendChild(document.createTextNode("Supprimer")); 
			btnS.classList.add("btn-danger");
			btnS.classList.add("pull-right");
			btnS.val=data[i]['Id'];
			btnS.onclick = function() {suprCats(this.val)};


			Bandiv.appendChild(bani);
			Bandiv.classList.add("row");

			Btndiv.appendChild(btnE);
			Btndiv.appendChild(btnS);
			Btndiv.classList.add("row");
			

			Cdiv.appendChild(Id);
			Cdiv.appendChild(t);
			Cdiv.appendChild(Bandiv);
			Cdiv.appendChild(Btndiv);
			Cdiv.classList.add("row");
			Cdiv.classList.add("UneVraisNews");
			$("#dyn").append("<br/><hr/><br/>");
			$("#dyn").append(Cdiv);
		}
}

function ordreBuilder(data,o){
	var d = parseInt(data);

	var e0 = document.createElement("option");
	e0.text = "0";
	var sel = document.getElementById("Ordre");
	sel.add(e0);
	

	if (d > 0){
		for (var i = 1; i<d; i++){
			var option = document.createElement("option");
   			option.text = ""+i;
   			sel.add(option);
		}
	}
	sel.selectedIndex=o;
}



function newCatsOK(){
	console.log("envois formulaire remplis (Catégorie)");
	$.post( url, { func : 'creeCatsOK', Nom: $("#TitreCats").val(), Lien: $("#LienCats").val(), Ordre : $("#Ordre").val() })
	  .done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    showAllCats();
	  });
}


function editCats(id){
	var dt;	
	$.getJSON( url, { func : 'getOneCats', catsId : id } ).done(function( data ) { 
		dt = data;
		
		editCatsForm(dt['Nom'],dt['LienB'],dt['Id'],dt['Ordre']);

	});
}


function editCatsForm(titre,lien,nid,ordre){
	$.get( url, { func : 'getFormCats' } ).done(function( data ) {
	$("#dyn").html(data);
	//ajout du handler d'envois de formulaire
	$("#CatsOK").val(nid);
	$("#CatsOK").click(function(){EditCatsOK();});
	$("#TitreCats").val(titre);
	$("#LienCats").on('input', function() {$("#imgPreview").attr("src",$("#LienCats").val());});
	$("#LienCats").val(lien);
	$("#imgPreview").attr("src",lien);
	$.get( url, { func : 'getCatsO' } ).done(function( data ) {ordreBuilder(data,ordre)});

	});
}

function EditCatsOK(){
	console.log("envois formulaire remplis (edition categorie)");
	$.post( url, { func : 'editCats', cid : $("#CatsOK").val() , Titre: $("#TitreCats").val(), Lien : $("#LienCats").val(), Ordre : parseInt($("#Ordre").val()) })
	  .done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    showAllCats();
	  });
}


function suprCats(cid){
	var r = confirm("VOUS ETES SUR LE POINT DE SUPPRIMER UNE CATEGORIE AINSI QUE TOUTES LES REFERENCES DES IMMAGES ASSOCIEE DANS LA BASE DE DONNEE!");
	if (r == true) {
		console.log("envois d'une requete de suppression (Catégorie)");
		$.post( url, { func : 'suprCats', cid : cid })
		  .done(function( data ) {
		    console.log( "résultat de l'opération : " + data );
		    showAllCats();
		  });
	}
}



//================================= 	fin Catégories 		==================================//

//================================= 		images 			==================================//
var tcat = [];

function getCats(){
	$.getJSON( url, { func : 'getAllCats' } ).done(function( data ) {
		return data;
		});
}


//selection des catégories d'immages à afficher
function imgOcat(id,bt){
	var ind = tcat.indexOf(id);
	if( ind == -1){
		tcat.push(id);
		$(bt).toggleClass("btn-danger");
		$(bt).toggleClass("btn-success");
	}
	else{
		tcat.splice(ind,1);
		$(bt).toggleClass("btn-success");
		$(bt).toggleClass("btn-danger");
	}
	$("#imgCont").html("");
	for (var i=0; i<imgs.length; i++){
		
		if(tcat.indexOf(imgs[i]['IdCateg'])>-1){
			console.log(imgs[i]['ProjName']);
			buildImgs(imgs[i]);
		}
	}
}


//construction de la liste des Catégorie
function pageImgInit(){
	tcat = [];
	$("#dyn").html(" ");
	$("#dyn").append('<hr/>');
	console.log("récupération catégories en cours");
	$.getJSON( url, { func : 'getAllCats' } ).done(function( data ) {
		cLst = data;
		var i=0;
		while (i<cLst.length){
			var Row=document.createElement("div");
			Row.classList.add("row");
			Row.classList.add("categ");
			for (var j=0;j<4;j++){
				if(cLst[i]){
					var cdiv = document.createElement("BUTTON");
					cdiv.classList.add("col-xs-3");
					cdiv.classList.add("btn");
					cdiv.classList.add("btn-danger");
					cdiv.classList.add("text-center");
					cdiv.appendChild(document.createTextNode(cLst[i]['Nom']));
					cdiv.val=cLst[i]['Id'];

					cdiv.onclick = function() {imgOcat(this.val,this)};
					Row.appendChild(cdiv);
					i++;
				}else break;
			}
			$("#dyn").append(Row);
			$("#dyn").append('<hr /><br />');
		}
		
		$("#dyn").append('<div class="row Liste" id="imgCont"></div>');
		});
	
	
}



function buildImgs(i){
	var categ = " - ";
	for (var t=0;t<cLst.length;t++){
		if (i['IdCateg']==cLst[t]['Id']){
			categ=cLst[t]['Nom'];
		}
	}

	$("#imgCont").append("<br/>");
	var Cdiv=document.createElement("div");

			var Btndiv=document.createElement("div");
			var Bandiv=document.createElement("div");
			var cont=document.createElement("div");
			var Id = document.createElement("div");
			var t = document.createElement("h3");
			
			var btnE = document.createElement("BUTTON"); 
			var btnV = document.createElement("BUTTON"); 
			var btnS = document.createElement("BUTTON"); 

			var bani = document.createElement("IMG"); 

			
			
			Id.appendChild(document.createTextNode("Id : "+i['Id']+" | ordre : "+i['Ordre']+" | catégorie : "+categ));
			t.classList.add("row");
			Id.classList.add("text-center");

			t.appendChild(document.createTextNode(i['ProjName'] != "" ? i['ProjName'] : "-"));
			t.classList.add("row");
			t.classList.add("text-center");

			bani.src=i['LienMin']
			bani.classList.add("img-responsive");	
			bani.classList.add("col-xs-3");	
			cont.appendChild(document.createTextNode(i['Descr'] != "" ? i['Descr'] : "-")); 
			cont.classList.add("col-xs-9");	

			btnE.appendChild(document.createTextNode("Editer")); 
			btnE.classList.add("btn");
			btnE.classList.add("btn-primary");
			btnE.val=i['Id'];
			btnE.onclick = function() {editImg(i)};

			btnV.appendChild(document.createTextNode("Voir")); 
			btnV.classList.add("btn");
			btnV.classList.add("btn-success");
			btnV.val=i['Id'];
			btnV.onclick = function() {seeImg(i)};

			btnS.appendChild(document.createTextNode("Supprimer")); 
			btnS.classList.add("btn");
			btnS.classList.add("btn-danger");
			btnS.classList.add("pull-right");
			btnS.val=i['Id'];
			btnS.onclick = function() {suprImg(this.val)};


			Bandiv.appendChild(bani);
			Bandiv.appendChild(cont);
			Bandiv.classList.add("row");

			Btndiv.appendChild(btnE);
			Btndiv.appendChild(btnV);
			Btndiv.appendChild(btnS);
			Btndiv.classList.add("row");
			Btndiv.classList.add("btnImg");
			

			Cdiv.appendChild(Id);
			Cdiv.appendChild(t);
			Cdiv.appendChild(Bandiv);
			Cdiv.appendChild(Btndiv);
			Cdiv.classList.add("row");
			$("#imgCont").append(Cdiv);
			$("#imgCont").append("<br/>");
			$("#imgCont").append("<hr/>");

}




function buildImgCats(){
	$.getJSON( url, { func : 'getAllCats' } ).done(function( data ) {
		console.log(data);
		for (var i=0;i<data.length;i++){
			var sel=document.createElement('option');
			sel.text = data[i]['Nom'];
			sel.value = data[i]['Id'];
			document.getElementById("Categorie").add(sel);
		}
		getImgsOrder();
	});
}

function getImgsOrder(){
$('#Ordre')
    .find('option')
    .remove()
    .end()
;

		$.get( url, { func : 'getImgsNb', cat : $("#Categorie").val() } ).done(function( data ) {
		console.log(data+' images dans cette catégorie');
		for (var i=0;i<(parseInt(data)+1);i++){
			var sel=document.createElement('option');
			sel.text = i;
			sel.value = i;
			document.getElementById("Ordre").add(sel);
		}
	});
}

function newImgOK(){
	console.log("envois formulaire remplis (Image)");
	$.post( url, { 
		func 		: 'creeImgOK',
		Categorie 	: $("#Categorie").val(),
			Nom 	: $("#TitreImg").val(),
		 	Descr 	: $("#descr").val(),
		   	Ordre 	: $("#Ordre").val(),
		   	LienMin	: $("#LienMin").val(),
		   	LienBig	: $("#LienBig").val()
		}).done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    imgHGetters();
	    pageImgInit();
	  });
}



function buildImgCatsE(){
	$.getJSON( url, { func : 'getAllCats' } ).done(function( data ) {
		for (var i=0;i<data.length;i++){
			var sel=document.createElement('option');
			sel.text = data[i]['Nom'];
			sel.value = data[i]['Id'];
			document.getElementById("Categorie").add(sel);
		}
		getImgsOrderE();
	});
}

function getImgsOrderE(){
$('#Ordre')
    .find('option')
    .remove()
    .end()
;

		$.get( url, { func : 'getImgsNb', cat : $("#Categorie").val() } ).done(function( data ) {
		console.log(data+' images dans cette catégorie');
		for (var i=0;i<(parseInt(data));i++){
			var sel=document.createElement('option');
			sel.text = i;
			sel.value = i;
			document.getElementById("Ordre").add(sel);
		}
	});
}

function editImg(img){
	console.log(img);
		//code AJAX qui récupere le formulaire
	$.get( url, { func : 'getFormImgs' } ).done(function( data ) {
		$("#dyn").html(data);

		$("#TitreImg").val(img['ProjName']);
		$("#descr").val(img['Descr']);

		//ajout du handler de modification de lien d'image (preview)
		$("#LienMin").on('input', function() {$("#imgMinPreview").attr("src",$("#LienMin").val());});
		$("#LienMin").val(img['LienMin']);
		$("#imgMinPreview").attr("src",img['LienMin']);
		
		$("#LienBig").on('input', function() {$("#imgBigPreview").attr("src",$("#LienBig").val());});
		$("#LienBig").val(img['LienBig']);
		$("#imgBigPreview").attr("src",img['LienBig']);

		//handler de choix de catégorie
		$('#Categorie').on('change', function() {getImgsOrderE(this.value)});
		$("#ImgOK").val(img['Id']);
		$("#ImgOK").click(function(){editImgOK();});
		buildImgCatsE();

		//pas élégant du tout mais... sa marche
		setTimeout(function(){ $("#Categorie option[value="+img['IdCateg']+"]").prop('selected', true).change(); }, 600);
		setTimeout(function(){ $("#Ordre option[value="+img['Ordre']+"]").prop('selected', true).change(); }, 1000);

	});
}

function editImgOK(){
	console.log("envois formulaire remplis (Image)");
	$.post( url, { 
		func 		: 'editImgOK',
		Id 			: parseInt($("#ImgOK").val()),
		Categorie 	: $("#Categorie").val(),
			Nom 	: $("#TitreImg").val(),
		 	Descr 	: $("#descr").val(),
		   	Ordre 	: $("#Ordre").val(),
		   	LienMin	: $("#LienMin").val(),
		   	LienBig	: $("#LienBig").val()
		}).done(function( data ) {
	    console.log( "résultat de l'opération : " + data );
	    imgHGetters();
	    pageImgInit();
	  });
}


function suprImg(iid){
	var r = confirm("VOUS ETES SUR LE POINT DE SUPPRIMER UNE IMAGE DE LA BASE DE DONNEE!");
	if (r == true) {
		console.log("envois d'une requete de suppression (Image)");
		$.post( url, { func : 'suprImg', iid : iid })
		  .done(function( data ) {
		    console.log( "résultat de l'opération : " + data );
		    imgHGetters();
	    	pageImgInit();
		  });
	}
}

function seeImg(i){
	var categ = " - ";
	for (var t=0;t<cLst.length;t++){
		if (i['IdCateg']==cLst[t]['Id']){
			categ=cLst[t]['Nom'];
		}
	}
	$("#dyn").html('<div class="row Liste" id="imgCont"></div>');
	$("#imgCont").html("<br/>");
	var Cdiv=document.createElement("div");

			var Btndiv=document.createElement("div");
			var Bandiv=document.createElement("div");
			var Bigdiv=document.createElement("div");
			var cont=document.createElement("div");
			var Id = document.createElement("div");
			var t = document.createElement("h3");
			
			var btnE = document.createElement("BUTTON"); 
			var btnS = document.createElement("BUTTON"); 

			var bani = document.createElement("IMG"); 
			var big  = document.createElement("IMG"); 

			
			
			Id.appendChild(document.createTextNode("Id : "+i['Id']+" | ordre : "+i['Ordre']+" | catégorie : "+categ));
			t.classList.add("row");
			Id.classList.add("text-center");

			t.appendChild(document.createTextNode(i['ProjName'] != "" ? i['ProjName'] : "-"));
			t.classList.add("row");
			t.classList.add("text-center");

			bani.src=i['LienMin']
			bani.classList.add("img-responsive");	
			bani.classList.add("col-xs-3");	
			cont.appendChild(document.createTextNode(i['Descr'] != "" ? i['Descr'] : "-")); 
			cont.classList.add("col-xs-9");	

			big.src=i['LienBig']
			big.classList.add("img-responsive");		
			big.classList.add("center-block");	


			btnE.appendChild(document.createTextNode("Editer")); 
			btnE.classList.add("btn");
			btnE.classList.add("btn-primary");
			btnE.val=i['Id'];
			btnE.onclick = function() {editImg(i)};


			btnS.appendChild(document.createTextNode("Supprimer")); 
			btnS.classList.add("btn");
			btnS.classList.add("btn-danger");
			btnS.classList.add("pull-right");
			btnS.val=i['Id'];
			btnS.onclick = function() {suprImg(this.val)};


			Bandiv.appendChild(bani);
			Bandiv.appendChild(cont);
			Bandiv.classList.add("row");

			Bigdiv.appendChild(big);
			Bigdiv.classList.add("row");


			Btndiv.appendChild(btnE);
			Btndiv.appendChild(btnS);
			Btndiv.classList.add("row");
			Btndiv.classList.add("btnImg");
			

			Cdiv.appendChild(Id);
			Cdiv.appendChild(t);
			Cdiv.appendChild(Bandiv);
			Cdiv.appendChild(Btndiv);
			Cdiv.appendChild(Bigdiv);
			Cdiv.classList.add("row");
			$("#imgCont").append(Cdiv);
			$("#imgCont").append("<br/>");
			$("#imgCont").append("<hr/>");

	
}


//=======================================================================================//
//=======================================================================================//
//===============/-----------------------------------------\=============================//
//===============|.#######.#######..######.#######..######.|=============================//
//===============|....##...##......##....#....##...##....##|=============================//
//===============|....##...##......##.........##...##......|=============================//
//===============|....##...######...######....##....######.|=============================//
//===============|....##...##............#....##.........##|=============================//
//===============|....##...##......##....#....##...##....##|=============================//
//===============|....##...#######..######....##....######.|=============================//
//===============\-----------------------------------------/=============================//
//=======================================================================================//
//=======================================================================================//







