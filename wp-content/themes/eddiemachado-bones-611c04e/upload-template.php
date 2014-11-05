<?php
/*
 Template Name: Upload Template
*/
?>

<?php get_header(); ?>

<div id="content">

    <div id="inner-content" class="wrap cf">

        <div id="main" class="m-all t-2of3 cf" role="main">

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
	<li id="draggable1" class="itemlist_item draggable" style="left: 41px; top: 50px;">1</li>
	<li id="draggable2" class="itemlist_item draggable" style="left: 247px; top: 23px;">2</li>
	<li id="draggable3" class="itemlist_item draggable" style="left: 145px; top: 41px;">3</li>
	<li id="draggable4" class="itemlist_item draggable" style="left: 92px; top: 168px;">4</li>
	<li id="draggable5" class="itemlist_item draggable" style="left: 207px; top: 139px;">5</li>
</ul>
<ul class="itemlist itemlist-two"><!--
	<li class="itemlist_item">1</li>
	<li class="itemlist_item">2</li>
	<li class="itemlist_item">3</li>
	<li class="itemlist_item">4</li>
	<li class="itemlist_item">5</li>
--></ul>
</div>

        </div>

    </div>

</div>


<?php get_footer(); ?>
