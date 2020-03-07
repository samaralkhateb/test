  <!DOCTYPE html>
<html lang="en">


    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>Google Istanbul</title>
       <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
 <link rel="stylesheet" href="<?php echo base_url() . "/assets/css/droidarabickufi.css" ?>" />

      <link rel="stylesheet" href="<?php echo base_url() . "/assets/css/bootstrap/bootstrap.min.css" ?>" />
      <link rel="stylesheet" type="text/css" href="<?php echo base_url() . "assets/css/base-lib-css.min.css" ?>" />

 <link rel="stylesheet" type="text/css" href="<?php echo base_url() . "assets/css/style.css" ?>" />

 <link rel="stylesheet" type="text/css" href="<?php echo base_url() . "assets/css/media-queries.css" ?>" />



<!-- <header>
  <nav class="my_nav navbar navbar-expand-sm bg-light navbar-light fixed-top">

            <a class="nav-link" href="/">
                <img class="img-responsive" src=<?php echo base_url() . "/assets/icons/png-white/shamra.svg" ?> height="35px"  alt="shamra-logo">
            </a>



          <ul class="navbar-nav font">
                             <li class="nav-item"><a class="nav-link" href="#"> <img src=<?php echo base_url() . "/assets/icons/png-white/BAZAAR.png" ?> alt="" width="16px"> بازار</a></li>
                             <li class="nav-item"><a class="nav-link " href="#"> <img src=<?php echo base_url() . "/assets/icons/png-white/JOBS.png" ?> alt="" width="16px"> فرص عمل</a></li>
                             <li class="nav-item"><a class="nav-link" href=""> <i class="fa fa-users"></i> ناس</a></li>
                             <li class="nav-item"><a class="nav-link" href="#"> <i class="fa fa-map-marker"></i> الأماكن</a></li>
                             <li class="nav-item"><a class="nav-link" href="#"> <i class="fa fa-newspaper-o" aria-hidden="true"></i> الأخبار</a></li>
                             <li class="nav-item"><a class="nav-link " href="#"> <i class="fa fa-graduation-cap"></i> أكاديميا</a></li>
                             <li class="nav-item"><a class="nav-link" href="#"> <img src=<?php echo base_url() . "/assets/icons/png-white/translate.png" ?> alt="" width="16px"> الترجمة</a></li>
                             <li class="nav-item dropdown">
                               <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               <i class="fa fa-bars"></i> المزيد <span class="caret"></span></a>
                               <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                       <a class="dropdown-item" href="#"> اختصار الروابط</a>
                                       <a class="dropdown-item" href="#">شمرا أعمال</a>
                                       <a class="dropdown-item" href="#">شمرا عملات</a>
                                       <a class="dropdown-item" href="#">شمرا ميديا</a>
                                       <a class="dropdown-item" href="#">إضافة موقع ويب</a>
                                       <a class="dropdown-item" href="#">شمرا مطورين</a>
                                </div>
                               </li>
                               <li class="nav-item left"><a class="nav-link" href="#"> تسجيل الدخول </a></li>
          </ul>

</nav>
</header> -->


<header>
    <!-- ./TOP HEADER -->
    <nav class="navbar main navbar-fixed-top">
                <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
               <a class="navbar-brand" href="<?php echo base_url() . "index.php/home" ?>">
                    <img class="img-responsive" src="<?php echo base_url() . "/assets/icons/png-white/shamra.svg" ?>" height="40px" alt="shamra-logo">
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navigation">
                    <li><a class="hvr-underline-reveal " href="/bazaar/"> <img src="<?php echo base_url() . "/assets/icons/png-white/BAZAAR.png" ?>" alt="" width="16px"> بازار</a></li>
                    <li><a class="hvr-underline-reveal " href="/jobs/"> <img src="<?php echo base_url() . "/assets/icons/png-white/JOBS.png" ?>" alt="" width="16px"> فرص عمل</a></li>
                    <li><a class="hvr-underline-reveal " href="/naas/"> <i class="fa fa-users"></i> ناس</a></li>
                    <li><a class="hvr-underline-reveal " href="/places/"> <i class="fa fa-map-marker"></i> الأماكن</a></li>
                    <li><a class="hvr-underline-reveal " href="/news/"> <i class="fa fa-newspaper-o"></i>  الأخبار</a></li>
                    <li><a class="hvr-underline-reveal " href="/academia/"> <i class="fa fa-graduation-cap"></i> أكاديميا</a></li>
                                      <li><a class="hvr-underline-reveal " href="/translate/"> <img src="<?php echo base_url() . "/assets/icons/png-white/translate.png" ?>" alt="" width="15px"> الترجمة</a></li>

                      <li class="dropdown">
                        <a href="#" class="hvr-underline-reveal dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars"></i> المزيد <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a class="hvr-underline-reveal " href="/mobile/"> <i class="fa fa-mobile"></i> تطبيق الموبايل</a></li>
                            <li><a class="hvr-underline-reveal " href="/shortener/"> اختصار الروابط</a></li>
                            <li><a class="hvr-underline-reveal " href="/business/">شمرا أعمال</a></li>
                            <li><a class="hvr-underline-reveal " href="/weather/">شمرا طقس</a></li>
                            <li><a class="hvr-underline-reveal " href="/exchange/">شمرا عملات</a></li>
                            <li><a class="hvr-underline-reveal " href="/media/">شمرا ميديا</a></li>
                            <li><a class="hvr-underline-reveal " href="/add_site">إضافة موقع ويب</a></li>
                            <li><a class="hvr-underline-reveal " href="/developer/">شمرا مطورين</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-left navigation">





                        <li><a id="loginMenu" class="hvr-underline-reveal" href="/login" data-remote="false" data-toggle="modal" data-target="#loginModal">تسجيل الدخول</a>
                        </li>

                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>
    </head>
    <body>
