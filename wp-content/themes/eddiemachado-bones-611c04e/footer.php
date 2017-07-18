            <?php if(!is_front_page()){ ?>
                <footer class="footer" role="contentinfo">

                    <div id="inner-footer" class="wrap cf">

                        <nav role="navigation">
                            <?php wp_nav_menu(array(
                            'container' => '',                              // remove nav container
                            'container_class' => 'footer-links cf',         // class of container (should you choose to use it)
                            'menu' => __( 'Footer Links', 'bonestheme' ),   // nav name
                            'menu_class' => 'nav footer-nav cf',            // adding custom nav class
                            'theme_location' => 'footer-links',             // where it's located in the theme
                            'before' => '',                                 // before the menu
                        'after' => '',                                  // after the menu
                        'link_before' => '',                            // before each link
                        'link_after' => '',                             // after each link
                        'depth' => 0,                                   // limit the depth of the nav
                            'fallback_cb' => 'bones_footer_links_fallback'  // fallback function
                            )); ?>
                        </nav>

                        <p class="source-org copyright">&copy; <?php echo date('Y'); ?> <a href="/" class="homelink"><?php bloginfo( 'name' ); ?></a>. Версия 4.0 <span class="supportlink">Поддержка пользователей: <a href="mailto:wizardmachine@yandex.ru">wizardmachine@yandex.ru</a></span></p>

                    </div>

                </footer>
            <?php } ?>

        </div>
            <!-- Modal -->
            <div class="modal fade" id="myModal_login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">Название модали</h4>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary">Сохранить изменения</button>
                        </div>
                    </div>
                </div>
            </div>
        <?php // all js scripts are loaded in library/bones.php ?>
        <?php wp_footer(); ?>
        <script src="<?php bloginfo('template_url'); ?>/library/js/jquery-ui.min.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/jquery.ui.touch-punch.min.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/jquery.Jcrop.min.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/exif.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/vivus.min.js"></script>
        <script src='<?php bloginfo('template_url'); ?>/library/js/sweet-alert.min.js'></script>
        <script src='<?php bloginfo('template_url'); ?>/library/js/buzz.min.js'></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/howler.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/canvas.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/easypie.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/bootstrap.js"></script>
        <script src="<?php bloginfo('template_url'); ?>/library/js/pieChartPlugin.js"></script>
        <script src='<?php bloginfo('template_url'); ?>/library/js/protocols.js'></script>
        <script src='<?php bloginfo('template_url'); ?>/library/js/script-magic.js'></script>
        <?php if(is_front_page()) { ?>
            <script>
                var window_height = jQuery(window).height();
                jQuery('#main').css('height', window_height+'px');
                var count_animation = 0,
                    rotateVal = 0;
                phaseTen = setInterval(function(){
                    if (count_animation <= 134400){                                                                         //90
                        // tickSound.play();
                        jQuery('.wings_home').css({
                            transform: 'rotate(-'+rotateVal+'deg) scale(1)'
                        });
                        count_animation += 1;
                        rotateVal += 1.5;
                    } else {
                        clearInterval(phaseOne);
                        count_animation = 0
                    }
                }, 250);
            </script>
        <?php } ?>

    </body>

</html> <!-- end of site. what a ride! -->
