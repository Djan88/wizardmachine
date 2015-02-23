<?php
/*
 Template Name: payments form
*/
?>

<?php get_header(); ?>

<div id="content">

    <div id="inner-content" class="wrap cf">

        <div id="main" class="m-all t-2of3 cf home-page-content" role="main">
        <?php if(is_user_logged_in()): ?>
        <?php

            $curr_user = wp_get_current_user();
        ?>
            <h1 class="page-title" itemprop="headline" style="text-align: center"><?php the_title(); ?></h1>

            <form action="http://sprypay.ru/sppi/" method="POST">
                <input type="text" name="spPurpose" value="" placeholder="Назначение платежа">
                <input type="text" name="spAmount" value="3.00">
                <input type="hidden" name="spShopId" value="221915">
                <!--<input type="hidden" name="spShopPaymentId" value="ваш номер платежа">-->
                <input type="hidden" name="spCurrency" value="rur">
                <input type="hidden" name="spUserDataUserId" value="<?=$curr_user->ID?>">
                <!--<input type="hidden" name="spIpnUrl" value="http://some.site.ru/ipn.script.php">-->
                <!--<input type="hidden" name="spIpnMethod" value="1">-->
                <input type="hidden" name="spSuccessUrl" value="<?=site_url('pay/?result=success')?>">
                <input type="hidden" name="spSuccessMethod" value="1">
                <input type="hidden" name="spFailUrl" value="<?=site_url('pay/?result=error')?>">
                <input type="hidden" name="spFailMethod" value="1">
                <input type="hidden" name="lang" value="ru">
                <input type="submit" value="оплатить">
              </form>

        <?php else: ?>
            <div class="login__form">
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
        <?php endif; ?>

        </div>

    </div>

</div>


<?php get_footer(); ?>
