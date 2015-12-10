var url="Ajax/AjaxController.php";


$(document).ready(function(){ 
	console.log("document pret");
	//si on à un lien avec un parametre
	if(location.search){
		getOneNews(parseInt(location.search.substring(3, location.search.length)));
	}
	//sinon on affiche la derniere news posté
	else{
		$.getJSON( url, { func : 'getLastNews' } ).done(function( data ) {
			makeNews(data);
		});
	}

	//on charge l'historique des news "light" sans son contenus
	$.getJSON( url, { func : 'getAllNews' } ).done(function( data ) {
		AllNews(data);
	});

//	//on regle la taille du corp pour pas que le footer se colle en cas de peut de news
//	$("#corp").css("min-height", function(){ 
//    	return $(window).height();
//	});
});

//$(window).resize(function(){
//	$("#corp").css("min-height", function(){ 
//    return $(window).height();});
//    });


//initialisation d'une news via son identifiant 
function makeNews(data){
	window.history.replaceState({}, "", "index.html?a="+data['Id']);
	$("#Titre").text(data['Titre']);
	$("#Date").html(turnDate(data['Dat']));
	$("#Contenus").html(data['Contenus']);
}

//récupération de l'historique
function AllNews(data){
	$("#archives").html("");
	$("#archives").append("<hr />");
	for (var i=0;i<data.length;i++){
		var elt= document.createElement("div");
		var titre =  document.createElement("h4");
		var dt = document.createElement("span");
		var dat = document.createElement("div");

		$(elt).val(data[i]['Id']);
		$(elt).click(function() {getOneNews($(this).val())});
		titre.appendChild(document.createTextNode(data[i]['Titre']));
		$(dat).html(turnDate(data[i]['Date']));

		elt.appendChild(titre);
		elt.appendChild(dat);
		elt.classList.add("archivesOver");
		elt.classList.add("row");
		$("#archives").append(elt);
		$("#archives").append("<hr />");
	}
}

// mise en forme de la date au format FR
function turnDate(dt){
	//yyyy-mm-dd hh-mm-ss
	var y;
	var m;
	var d;
	var h;

	y=dt.substring(0,4);
	m=dt.substring(5,7);
	d=dt.substring(8,10);

	h=dt.substring(11,19);

	return "<span>posté le : "+d+"/"+m+"/"+y+" à : "+h+"</span>";	

}

//chargement d'un article via so identifiant
function getOneNews(id){
		$.getJSON( url, { func : 'getOneNews' ,Id : id} ).done(function( data ) {
			makeNews(data);
			console.log(data);
	});
}



//location.search
function paramsOK(id){
	getOneNews(id);
}





