<?php
/*
 Template Name: Upload Template
*/
?>

<?php get_header(); ?>

<div id="content">

    <div id="inner-content" class="wrap cf">

        <div id="main" class="m-all t-2of3 cf home-page-content" role="main">
        <?php if(is_user_logged_in()){ ?>

            <div id="accordion" class="select_program">
              <h3>ЛЮДИ И ОТНОШЕНИЯ</h3>
              <div>"Забыть ее/его не могу; простить ее/его не могу; только все мысли о нем/ней; хочу ее/его;"</div>
              <h3>РАЗДРАЖЕНИЕ И НЕПРИЯТИЕ</h3>
              <div>"Не могу с этим смириться/ это все не правильно/ раздражение от чьих-то действий, чаще бытовых,внешнего вида или слов/ грусть-тоска зеленая/ усталость от жизни;"</div>
              <h3>БЕСПОКОЙСТВО О РАЗВИТИИ СОБЫТИЙ И МНЕНИЙ ОКРУЖАЮЩИХ</h3>
              <div>"... а кто скажет что-нибудь про меня или подумает про меня что-нибудь... а как я буду выглядеть в глазах окружающих... как бы не опозоритьяс... я стараюсь все лучшим образом делать...;" и в этом роде далее...</div>
            </div>

            <div class="bbody">

                <!-- upload form -->

                <form id="upload_form" action="" enctype="multipart/form-data" method="post"><!-- hidden crop params -->
                <input id="x1" name="x1" type="hidden" />
                <input id="y1" name="y1" type="hidden" />
                <input id="x2" name="x2" type="hidden" />
                <input id="y2" name="y2" type="hidden" />
                <h2>Step1: Please select image file</h2>
                <div><input id="image_file" name="image_file" type="file" /></div>
                <div class="error"></div>
                <div class="step2">
                <h2>Step2: Please select a crop region</h2>
                <img id="preview" alt="" />
                <div class="info"><label>File size</label> <input id="filesize" name="filesize" type="text" />
                <label>Type</label> <input id="filetype" name="filetype" type="text" />
                <label>Image dimension</label> <input id="filedim" name="filedim" type="text" />
                <label>W</label> <input id="w" name="w" type="text" />
                <label>H</label> <input id="h" name="h" type="text" /></div>
                <input type="submit" value="Upload" name="magic" />

                </div>
                </form>
            
            </div>



            <div id="snaptarget" class="wrapper">
            <ul class="itemlist itemlist-one">
                <li id="draggable0" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 30px;">V0</li>
                <li id="draggable1" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 40px;">V1</li>
                <li id="draggable2" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 64px;">V2</li>
                <li id="draggable3" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 96px;">V3</li>
                <li id="draggable4" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 112px;">V4</li>
                <li id="draggable5" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 126px;">V5</li>
                <li id="draggableD1" class="itemlist_item item_list__mid draggable" style="left: 135px; top: -90px;">D+</li>
                <li id="draggableClean" class="itemlist_item item_list__mid itemlist_item__clear draggable" style="left: 35px; top: 80px;"></li>
                <li id="draggableS2" class="itemlist_item item_list__mid draggable" style="left: 230px; top: -100px;">S2</li>
                <li id="draggableS2_1" class="itemlist_item item_list__mid draggable" style="left: 227px; top: -75px;">S2</li>
                <li id="draggableS3" class="itemlist_item item_list__mid draggable" style="left: 217px; top: -70px;">S3</li>
                <li id="draggableS4" class="itemlist_item item_list__mid draggable" style="left: 215px; top: -50px;">S4</li>
                <li id="draggableS5" class="itemlist_item item_list__mid draggable" style="left: 232px; top: -24px;">S5</li>
                <li id="draggableS6" class="itemlist_item item_list__mid draggable" style="left: 253px; top: 78px;">S6</li>
                <li id="draggableV-" class="itemlist_item item_list__mid draggable" style="left: 182px; top: 135px;">V-</li>
                <li id="draggableS+" class="itemlist_item item_list__mid draggable" style="left: 229px; top: -342px;">S+</li>
                <li id="draggableD2" class="itemlist_item item_list__mid draggable" style="left: 129px; top: -324px;">D2</li>
                <li id="draggableD3" class="itemlist_item item_list__mid draggable" style="left: 145px; top: -265px;">D3</li>
                <li id="draggableD5" class="itemlist_item item_list__mid draggable" style="left: 130px; top: -192px;">D5</li>
                <li id="draggableD4" class="itemlist_item item_list__mid draggable" style="left: 148px; top: -274px;">D4</li>
            </ul>
            <ul class="itemlist itemlist-two"><!--
                <li class="itemlist_item">1</li>
                <li class="itemlist_item">2</li>
                <li class="itemlist_item">3</li>
                <li class="itemlist_item">4</li>
                <li class="itemlist_item">5</li>
            --></ul>
            </div>
        <?php } else { ?>
            <div class="login-area">
               <p>Пожалуйста <a href="/registration">Зарегестрируйтесь</a> сайте</br> или <a href="/admin">Авторизуйтесь</a></p> 
            </div>
        <?php } ?>

        </div>

    </div>

</div>


<?php get_footer(); ?>
