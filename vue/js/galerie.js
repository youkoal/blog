var url="Ajax/AjaxController.php";
var cats;
var imgs;
var tst;
var page=0;
var allpage=[];
var cpage=0;
var pact;
var id=23;


$(window).resize(function(){
	$('.modal-dialog').width($(window).width());
	$("#corp").css("min-height", function(){ 
    return ($(window).height()-200+"px");});
    });

$(document).ready(function(){ 
	console.log("document pret");
	general(); 
	
});




//calcule du nombre de pages et affichage de la barre de navigation
function buildGallery(){
	$.getJSON( url, { func : 'getImg' , cat : id} ).done(function( data ) {
		imgs=data;
	
		page = Math.floor(imgs.length/9);
		if(imgs.length%9 >0)	page+=1;

		//ajout du précédent
		var elt=document.createElement("li");
		elt.onclick = function() {prev();};
		elt.innerHTML=('<span>&laquo;</span>');

		$(".pagination").append(elt);

		for (var i=1; i<page+1;i++){
			
			var elt=document.createElement("li");
			elt.classList.add("page"+i);
			$(elt).html('<span>'+i+'</span>');
			$(elt).val(i);
			$(elt).click(function() {buildPage($(this).val())});
			allpage.push($(this));
			
			$(".pagination").append(elt);
			console.log($(elt).val());

		}

		//ajout du suivant
		var elt=document.createElement("li");
		elt.innerHTML=('<span>&raquo;</span>');
		elt.onclick = function() {next();};
		$(".pagination").append(elt);


	 	buildPage(1);
	 });
	
}

function buildPage(elt){
	if (elt>0 && elt<=page && elt!=cpage){
		$(".page"+cpage).toggleClass("active")
		cpage=elt;
		console.log(elt);
		$(".page"+elt).toggleClass("active")

		$("#galerie").html("");

		for(var i=1;i<10;i++){
			if(imgs[((cpage-1)*9)+i-1]){
				//<div class="col-md-4 portfolio-item center-block">
				// 	<a href="#" title="Image 1">
				// 		<img  src="https://dl.dropboxusercontent.com/u/92572609/aurel/thumb.jpg" class="thumbnail img-responsive">
				// 	</a>
				//</div>

				var dv = document.createElement("div");
				var a  = document.createElement("a");
				var img= document.createElement("img");

				dv.classList.add("col-md-4");
				dv.classList.add("portfolio-item");
				dv.classList.add("center-block");

				dv.val=imgs[((cpage-1)*9)+i-1];
				dv.onclick = function() {doModal(this.val)};

				a.href="#";

				img.src=imgs[((cpage-1)*9)+i-1]['LienMin'];
				img.classList.add("center-block");
				img.classList.add("thumbnail");
				img.classList.add("img-responsive");

				$(a).append(img);
				$(dv).append(a);

				$("#galerie").append(dv);
				





			}
		}

	$("#corp").css("min-height", function(){
    return ($(window).height()-200+"px");

});

	}
	
}

function next(){buildPage(cpage+1);}
function prev(){buildPage(cpage-1);}


function doModal(img){

	$('.modal-body').html('<img class="img-responsive center-block" src="'+img['LienBig']+'" />');
	$("#modalTitre").text(img['ProjName']);
	$("#modalDescr").text(img['Descr']);

	$('#myModal').modal({show:true});
	$('.modal-dialog').width($(window).width());

}



function general(){
		$.getJSON( url, { func : 'getCats'} ).done(function( data ) {
		cats=data;
		console.log(data);
		buildCats();
	});
}

function buildCats(){
	$("#galerie").html("");
	$(".pagination").html("");
	for (var i=0;i<cats.length;i++){
		var dv=document.createElement("div");
		var img= document.createElement("img");

		dv.classList.add("col-md-6");
		img.classList.add("thumbnail");
		img.classList.add("center-block");
		img.classList.add("img-responsive");
		img.classList.add("Bgalerie");

		img.src=cats[i]['LienB'];

		$(dv).append(img);
		dv.val=[cats[i]['Id'],cats[i]['Nom']];
		dv.onclick = function() {
			id=this.val[0];
			buildGallery();
			$("#NomGalerie").text(this.val[1]);
		};

		$("#galerie").append(dv);
	}

	$("#corp").css("min-height", function(){ 
    return ($(window).height()-200+"px");

});

}