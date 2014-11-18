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
                        
                        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

                        <div class="home-content">
                            <?php the_content(); ?>
                        </div>

                        <?php endwhile; ?>

                        <?php endif; ?>
                            
                            
                    <?php } ?>
                
                <?php } else { ?>
                    <a class="btn btn_lg btn_warning btn_login" href="/admin">Войдите на сайт</a>
                    <a class="btn btn_lg btn_success btn_sign" href="/registration">Получить<br> доступ</a>
                    <div class="home-content" style="text-align: center;">
                        <?php the_content(); ?>
                    </div>
                <?php } ?>

                
            </div>

        </div>

    </div>

</div>


<?php get_footer(); ?>
