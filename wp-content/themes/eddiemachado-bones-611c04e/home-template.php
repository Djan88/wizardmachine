<?php
/*
 Template Name: Home Template
*/
?>

<?php get_header(); ?>

<div id="content">

    <div id="inner-content" class="wrap cf">

        <div id="main" class="m-all t-2of3 cf" role="main">

            <div class="home-page-content">
                
                <?php if(is_user_logged_in()){ ?>
                    
                    <?php if(current_user_can('subscriber')){ ?>
                
                          <p>Пожалуйста оплатите данную услугу. Или свяжитесь с администратором если уже оплатили!</p>  
                
                    <?php } elseif(current_user_can('contributor') || current_user_can('administrator')) { ?>
                
                            
                            
                    <?php } ?>
                
                <?php } else { ?>
                
                <p>Пожалуйста <a href="/registration">Зарегестрируйтесь</a> сайте или <a href="/admin">Авторизуйтесь</a></p>
                    
                <?php } ?>
                
            </div>

        </div>

    </div>

</div>


<?php get_footer(); ?>
