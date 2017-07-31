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
                    <!-- Если зашел подписчик -->
                    <?php if(current_user_can('subscriber')){ ?>
                
                          <div class="home-content">
                              <h2 class="home_heading">WIZARDMACHINE</h2>
                              <?php the_content(); ?>
                          </div>
                    <!-- Если зашел участник или администратор -->
                    <?php } elseif(current_user_can('contributor') || current_user_can('administrator')) { ?>
                        
                        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                        <div class="reg_block">
                          <?php 
                            $user = get_current_user_id();
                            $cur_user_data = get_userdata($user);
                            $user_reg = $cur_user_data->get('user_registered');
                            $user_login = $cur_user_data->get('user_login');
                            $user_mail = $cur_user_data->get('user_email');
                            $year_val = 31536000;
                            $regtime = strtotime($user_reg);
                            $cur_data = time();
                            $ratio =($cur_data - $regtime) - $year_val;
                            $ratioten = ($cur_data - $regtime) - $year_val + 864000;
                          ?>
                          <?php if ($ratioten > 0) { ?>
                            <div class="ratioten" data-ratio="<?php echo $ratioten;?>"></div>
                          <?php } ?>
                        </div>
                        <?php endwhile; ?>

                        <?php endif; ?>
                            
                            
                    <?php } ?>
                
                <?php } else { ?>
                    <div class="home-content" style="text-align: right">
<!--                        <h2 class="home_heading" data-toggle="modal" data-target="#myModal_login">WIZARDMACHINE</h2>-->

                    </div>

                <?php } ?>

                
            </div>

        </div>

    </div>

</div>


<?php get_footer(); ?>
