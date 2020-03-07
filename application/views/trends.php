
<?php $this->load->view('header'); ?>

<?php $this->load->view('search_bar'); ?>
<link rel="stylesheet" type="text/css" href="<?php  echo base_url() . "assets/css/trends_style.css" ?>" />

<app-subscribe _nghost-c14="">
    <div  class="mt-4 trend_container">
        <div  class="row">
            <div  class="col col-md-9 col-lg-8">
                <div  class="card cloudy-knoxville-gradient p-2">
                    <div  class="media mt-4">
                        <div  class="d-flex align-self-start mx-3"><i  aria-hidden="true" class="fa fa-exclamation-circle fa-5x fa-warn"></i></div>
                        <div  class="media-body mb-3">
                            <h2  class="header-title">خدمة مدفوعة تتطلب اشتراك</h2>
                            <div  class="warn-body">

                                <p  class="post-txt"><span >يرجى </span><a class ="log" href="/login"> تسجيل الدخول</a> للمتابعة </p>
                                <p  class="post-txt"> اذا لم تكن مشتركا في الخدمة يرجى الاشتراك ضمن <a  href="/credit"> رصيد شمرا</a></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</app-subscribe>

<?php $this->load->view('search_footer'); ?>
<script type="text/javascript" src="<?php echo base_url() ."assets/js/trends.js"?>"></script>

  	  </body>
</html>
