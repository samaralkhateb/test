

<div class="search-warp">

            <div class="mt-4 search">
              <div class="search-bar search-section">
                <span  class="search-logo-wrap">
                  <img  class="min-logo" src="<?php echo base_url() . "assets/images/shamra.svg" ?>">
                </span>
              <div class="">
                <!-- <img class="img-responsive min-logo" id="search-logo" src=<?php echo base_url() . "assets/images/shamra.svg" ?> > -->
                <form class="search-box ng-untouched ng-pristine ng-valid" method="GET" novalidate="">
                    <input aria-label="search" autocomplete="off" class="box-input sh-search" name="search" placeholder="أبحث عن ..." type="search">
                    <span class="box-clear"><i _ngcontent-c2="" aria-hidden="true" class="fa fa-times fa-lg"></i></span>
                    <button aria-label="search" class="box-submit" name="search" type="submit">
                        <i aria-hidden="true" class="fa fa-search fa-lg"></i></button>
                </form>
                <ul class="nav nav-pills search-nav search_nav_bar" id="searchList">
                    <li id="web"  role="presentation" class="search-tab">
                        <a class="hvr-underline-reveal hvr_search" href="<?php echo base_url() . "index.php/search" ?>">ويب </a>
                    </li>
                    <li id="news" class="search-tab"  role="presentation">
                        <a class="hvr-underline-reveal hvr_search" href="<?php echo base_url() . "index.php/search/news" ?>">أخبار </a>
                    </li>
                    <li id="trends" class="search-tab"  role="presentation">
                        <a class="hvr-underline-reveal hvr_search"href="<?php echo base_url() . "index.php/search/trends" ?>">تريندز </a>
                    </li>
                    <li id="places" class="search-tab"  role="presentation">
                        <a class="hvr-underline-reveal hvr_search" href="<?php echo base_url() . "index.php/search/places" ?>">أماكن</a>
                    </li>
                    <li id="bazaar" class="search-tab"  role="presentation">
                        <a class="hvr-underline-reveal hvr_search" href="<?php echo base_url() . "index.php/search/bazaar" ?>" >بازار </a>
                    </li>
                    <li id="academia" class="search-tab"   role="presentation">
                        <a class="hvr-underline-reveal hvr_search" href="<?php echo base_url() . "index.php/search/academia" ?>">أكاديميا </a>
                    </li>
                </ul>

</div>

            </div>
        </div>
                </div>
    <!-- </div>

</div> -->
        <router-outlet _ngcontent-c0=""></router-outlet>
        <app-search _nghost-c5="">
            <div _ngcontent-c5="" class="mt-1 container search-container">
                <!---->
                <!---->
                <!---->
                <!---->
                <div _ngcontent-c5="" class="row">
                    <div _ngcontent-c5="" class="col-12 col-md-9 col-lg-8">
                        <div _ngcontent-c5="" class="container--result">
                            <!---->
                        </div>
                        <!---->
                    </div>
                    <div _ngcontent-c5="" class="col-5"></div>
                </div>
                <!---->
                <!---->
            </div>
        </app-search>
