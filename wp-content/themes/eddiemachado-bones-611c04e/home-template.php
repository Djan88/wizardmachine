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
                                $ratioten = $ratio + 864000;
                            ?>
                            <?php if ($ratioten > 0) { ?>
                                <div class="alert alert-warning fade in">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <h4>Срок действия вашей лицензии истекает менее чем через 10 дней</h4>
                                    <p>Вы можете продлить лицензию со скидкой написав нам на <a href="mailto:wizardmachine@yandex.ru">wizardmachine@yandex.ru</a></p>
                                </div>
                            <?php } ?>
                        </div>
                        <div class="home-content">
                            <?php the_content(); ?>
                        </div>
                        <a href="/wizard" class="button button-primary button-large">Выбор протокола</a>
                        <a href="/knife_diagnostic" class="button button-primary button-large">Диагностика ножом</a>
                        <?php if(is_user_logged_in()){ ?>
                            <a class="button button-primary button-large" href="<?php echo home_url(); ?>/wp-login.php?action=logout&amp;_wpnonce=a6cad512ba">Выйти</a>
                        <?php }?>
                        <div style="padding-top: 25px;">
                            <a href="http://help.yandex.ru/common/support/screenshot.xml" target="_blank" class="button button-primary button-large button__main">Как сделать "скриншот" экрана</a>
                            <a href="/wp-content/uploads/2015/02/Manual_dlya_Wizardmachine.pdf" target="_blank" class="button button-primary button-large button__main">Руководство пользователя</a> 
                        </div>
                        <!-- <div><a href="/pay/" target="_blank" class="btn btn_lg btn_trans" style="margin-top: 10px; margin-left: 15px;">Оплата доступа</a></div> -->
                        <!-- <div><a href="/consultation/" target="_blank" class="btn btn_lg btn_trans" style="margin-top: 10px; margin-left: 15px;">Оплата консультации</a></div> -->

                        <?php endwhile; ?>

                        <?php endif; ?>
                            
                            
                    <?php } ?>
                
                <?php } else { ?>
                    <div class="home-content" style="text-align: center;">
                        <?php the_content(); ?>
                        <div class="btn btn_lg btn_trans show_form">Вход для сертифицированных пользователей</div><br>
                        <a href="/wp-content/uploads/2015/02/Kniga_po_Vizard-terapii.compressed.pdf" target="_blank" class="button button-primary button-large button__main">Книга "Визард терапия"</a>
                        <a href="/wp-content/uploads/2015/02/Osnovy_biologicheskogo_tsentrirovania.compressed.pdf" target="_blank" class="button button-primary button-large button__main">Книга "Биологическое центрирование"</a>
                        <a href="https://www.youtube.com/watch?v=ZZPjJGX-BM4" target="_blank" class="button button-primary button-large button__main">Видео</a>
                        <a href="http://wizardduos.ru/" target="_blank" class="button button-primary button-large button__main">"Wizard Duos"</a></br>
                        <!-- <a href="https://www.facebook.com/yuchikurov" target="_blank" class="button button-primary button-large button__main button_social button_social_fb">f</a> -->
                        <a href="https://vk.com/id139677998" target="_blank" class="button button-primary button-large button__main button_social button_social_vk">vk</a>
                        <!-- <a href="http://help.yandex.ru/common/support/screenshot.xml" target="_blank" class="button button-primary button-large button__main">Как сделать "скриншот" экрана</a> -->
                        <!-- <div><a href="/pay/" target="_blank" class="btn btn_lg btn_trans" style="margin-top: 10px; margin-left: 15px;">Оплата доступа</a></div> -->
                        <!-- <div><a href="/consultation/" target="_blank" class="btn btn_lg btn_trans" style="margin-top: 10px; margin-left: 15px;">Оплата консультации</a></div> -->
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
                            <p class="forgetmenot"><label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever" <?php checked( $rememberme ); ?> /> <?php esc_attr_e('Remember Me'); ?></label></p>
                            <p class="note_small">Для получения сертификата пользователя необходимо пройти очное либо дистантное обучение. <a class="bablosadres" href="mailto:info@bablosstudio.ru" style="color: #fff;">info@bablosstudio.ru</a></p>
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
