<?php
session_start();
if(isset($_SESSION['admin'])){
    if($_SESSION['admin']="Admin"){
        ?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>panel</title>
		    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/panel.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/simplePagination.css"/>
    <script src="js/tinymce/tinymce.min.js"></script>
    


	</head>
<body>
    <div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper" class="col-xs-2 col-sm-2 col-md-2">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Panel d'administration
                    </a>
                </li>
                <li>
                    <a href="#" id="newNews">nouvelle News</a>
                </li>
                <li>
                    <a href="#" id="seeNews">lister les news</a>
                </li>
                <li>
                    <a href="#" id="newCats">nouvelle catégorie</a>
                </li>
                <li>
                    <a href="#" id="seeCats">lister les catégories</a>
                </li>
                <li>
                    <a href="#" id="seeImgs">les images</a>
                </li>
                <li>
                    <a href="#" id="newImgs">ajouter une image</a>
                </li>
                <li>
                    <a href="#" id="galery">tests</a>
                </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div id="dyn" class="col-lg-12">
                        <div id="page"></div>
                    </div>
                </div>
            </div>
        </div>




        






        <!-- /#page-content-wrapper -->

    </div>
    <!-- jQuery -->
    <script src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.simplePagination.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/home.js"></script>


</body>
</html>

<?php
}}else header('Location: loginPanel.php');
        ?>