<?php $this->load->view('header'); ?>

<div class="container-fluid">
   <div id="aside-left">
      <div class="well min-widget hidden-xs hidden-sm ">
         <div class="exchange-md">
            <div class="fs-md">
               <i class="fa fa-usd"></i> الدولار الأمريكي
            </div>
            <a href="/exchange/" data-placement="top" data-toggle="tooltip" title="" target="_blank" data-original-title="عرض جميع العملات">
            <span class="">438.34</span>
            <span>
            <i class="fa fa-minus" style="color: orange"></i>
            </span>
            <span>434</span>
            <span> (ل.س)</span>
            </a>
         </div>
         <div class="exchange-md">
            <div class="fs-md">
               <i class="fa fa-eur"></i> اليورو
            </div>
            <a href="/exchange/" data-placement="top" data-toggle="tooltip" title="" target="_blank" data-original-title="عرض جميع العملات">
            <span class="">487.77</span>
            <span>
            <i class="fa fa-minus" style="color: orange"></i>
            </span>
            <span>483.09</span>
            <span> (ل.س)</span>
            </a>
         </div>
      </div>
   </div>
   <div class="main-content">
      <div class="text-center">
         <img class="img-responsive" id="main-logo" src=<?php echo base_url() . "assets/images/shamra.svg" ?> >
         <ul class="nav nav-pills search-nav" id="searchList">
            <li id="web" data-url="/search" role="presentation" class="search-tab active">
               <a class="hvr-underline-reveal" data-toggle="pill">الويب </a>
            </li>
            <li id="news" class="search-tab" data-url="/search/news" role="presentation">
               <a class="hvr-underline-reveal" data-toggle="pill">الأخبار </a>
            </li>
            <li id="facebook" class="search-tab" data-url="/search/facebook" role="presentation">
               <a class="hvr-underline-reveal" data-toggle="pill">تريندز </a>
            </li>
            <li id="places" class="search-tab" data-url="/search/places" role="presentation">
               <a class="hvr-underline-reveal" data-toggle="pill">الأماكن</a>
            </li>
            <li id="bazaar" class="search-tab" data-url="/search/bazaar" role="presentation">
               <a class="hvr-underline-reveal" data-toggle="pill">بازار </a>
            </li>
            <li id="academic" class="search-tab" data-url="/search/academia" role="presentation">
               <a class="hvr-underline-reveal" data-toggle="pill">أكاديميا </a>
            </li>
         </ul>
         <form id="home_form" action="/search" method="get">
            <div class="form-group">
               <input type="text" name="q" id="query" class="query form-control-" placeholder="إبحث في شمرا ويب">
            </div>
            <div class="form-group text-center">
               <button id="shamra-search" class="btn btn-default  shamra-btn">البحث <i class="fa fa-search"></i></button>
            </div>
         </form>
         <div class="ad" style="border:none">
            <a href="#" target="_blank">
            <img src="" alt=" الإعلانات" class="img-responsive">
            </a>
         </div>
      </div>
      <section class="sec-with-mar">
         <h3 class="text-center">
            <a href="/news/">
            <i class="fa fa-newspaper-o"></i> الأخبار من شمرا
            </a>
         </h3>
         <div class="content-wrap">
            <div class="sec sec1">
               <div class="img-wrap">
                  <a target="_blank" href="/news/article/3754ef14ba82d3484eea74329db09336?et=0">
                  <img src="" alt="news 1">
                  </a>
               </div>
               <div class="sec-title">
                  <a target="_blank" href="/news/article/3754ef14ba82d3484eea74329db09336?et=0"> news 1  </a>
               </div>
               <div class="sec-hits">
                  <span class=""><i class="fa fa-eye"></i> 79</span>
               </div>
            </div>
            <div class="sec sec2">
               <div class="img-wrap">
                  <a target="_blank" href="/news/article/12ea09d07f81dd1bf6b9c0d5ef6ed80f?et=0">
                  <img src="" alt="news 2">
                  </a>
               </div>
               <div class="sec-title">
                  <a target="_blank" href="/news/article/12ea09d07f81dd1bf6b9c0d5ef6ed80f?et=0"> news 2  </a>
               </div>
               <div class="sec-hits">
                  <span class=""><i class="fa fa-eye"></i> 31</span>
               </div>
            </div>
            <div class="sec sec3">
               <div class="img-wrap">
                  <a target="_blank" href="/news/article/f481fd8aa7841f5e6ca09cf27c3df162?et=1">
                  <img src="" alt="news 3">
                  </a>
               </div>
               <div class="sec-title">
                  <a target="_blank" href="/news/article/f481fd8aa7841f5e6ca09cf27c3df162?et=1">news 3 </a>
               </div>
               <div class="sec-hits">
                  <span class=""><i class="fa fa-eye"></i> 64</span>
               </div>
            </div>
            <div class="sec sec4">
               <div class="img-wrap">
                  <a target="_blank" href="/news/article/b3a3e39ca09803773f9ea10add107ad2?et=1">
                  <img src="" alt="news 4">
                  </a>
               </div>
               <div class="sec-title">
                  <a target="_blank" href="/news/article/b3a3e39ca09803773f9ea10add107ad2?et=1">
                  news 4                 </a>
               </div>
               <div class="sec-hits">
                  <span class=""><i class="fa fa-eye"></i> 21</span>
               </div>
            </div>
         </div>
         <div class="seperator"></div>
      </section>
   </div>


   <div id="aside-right">
                                            <div class="well min-weather hidden-xs hidden-sm">
                    <a href="/weather/" class="weather" data-placement="top" data-toggle="tooltip" title="" target="_blank" data-original-title="عرض الطقس في باقي المدن">
                        <span class="">22<sup>°</sup></span>
                        <span class=""> <img id="main-weather-img" class="" src="<?php echo base_url() . "/assets/icons/png-white/cloud.png" ?>" width="30px"></span>
                        <span>دمشق</span>
                    </a>
                </div>

            <div id="translate-widget" class="hidden-xs hidden-sm">
                <div id="transWidgetHeader" class="text-center">
                    <img src="<?php echo base_url() . "/assets/icons/png-white/translogo-3.png" ?>" alt="">
                    <span>الترجمة من شمرا</span>
                </div>

                <form action="/translate/">
                    <input id="translateSrc" type="text" name="src" value="en" hidden="true">
                    <input id="translateTgt" type="text" name="tgt" value="ar" hidden="true">

                    <div class="btn-group btn-group-justified">
                        <div class="btn-group">
                            <button id="toArabic" type="button" class="btn btn-default active" disabled="true">عربي
                            </button>
                        </div>
                        <div class="btn-group">
                            <button id="toEnglish" type="button" class="btn btn-default">English</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea id="translateText" type="text" name="text" class="form-control" rows="5" placeholder="أدخل النص بالإنكليزية..."></textarea>
                    </div>
                    <div class="form-group">
                        <input class="btn btn-default shamra-btn btn-block" id="translation-form-button" type="submit" disabled="disabled" value="اختبر الترجمة!">
                    </div>
                </form>
            </div>

        </div>
</div>
<?php $this->load->view('footer'); ?>
  	  </body>
</html>
