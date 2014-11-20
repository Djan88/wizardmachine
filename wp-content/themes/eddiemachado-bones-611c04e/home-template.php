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
                    <!-- <a class="btn btn_lg btn_warning btn_login" href="/admin">Войдите на сайт</a>
                    <a class="btn btn_lg btn_success btn_sign" href="/registration">Получить доступ</a> -->
                    <div class="home-content" style="text-align: center;">
                        <?php the_content(); ?>
                        <div class="btn btn_lg btn_trans show_form">Вход для сертифицированных пользователей</div>
                    </div>
                    <div class="login__form hidden">
                        <form name="loginform" id="loginform" action="<?php echo esc_url( site_url( 'wp-login.php', 'login_post' ) ); ?>" method="post">
                            <p>
                                <label for="user_login"><?php _e('Username') ?><br />
                                <input type="text" name="log" id="user_login" class="input" value="<?php echo esc_attr($user_login); ?>" size="20" /></label>
                            </p>
                            <p>
                                <label for="user_pass"><?php _e('Password') ?><br />
                                <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" /></label>
                            </p>
                            <?php
                            /**
                             * Fires following the 'Password' field in the login form.
                             *
                             * @since 2.1.0
                             */
                            do_action( 'login_form' );
                            ?>
                            <!-- <p class="note_small">Что бы получить доступ </p> -->
                            <p class="forgetmenot"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever" <?php checked( $rememberme ); ?> /> <?php esc_attr_e('Remember Me'); ?></label></p>
                            <p class="submit">
                                <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary button-large" value="<?php esc_attr_e('Log In'); ?>" />
                        <?php   if ( $interim_login ) { ?>
                                <input type="hidden" name="interim-login" value="1" />
                        <?php   } else { ?>
                                <input type="hidden" name="redirect_to" value="<?php echo esc_attr($redirect_to); ?>" />
                        <?php   } ?>
                        <?php   if ( $customize_login ) : ?>
                                <input type="hidden" name="customize-login" value="1" />
                        <?php   endif; ?>
                                <input type="hidden" name="testcookie" value="1" />
                            </p>
                        </form>
                    </div>
                <?php } ?>

                
            </div>

        </div>

    </div>

</div>


<?php get_footer(); ?>
