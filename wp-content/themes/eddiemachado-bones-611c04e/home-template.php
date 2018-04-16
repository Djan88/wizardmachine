<?php
/*
 Template Name: Home Template
*/
?>

<?php get_header(); ?>

<div id="content">
    <div id="inner-content" class="wrap cf">
        <div id="main" class="m-all t-2of3 cf <?php if(current_user_can('subscriber')){ ?>subscriber_wrap<?php } ?>" role="main">
            <div class="home-page-content <?php if(current_user_can('subscriber')){ ?>subscriber<?php } ?>">    
                <?php if(is_user_logged_in()){ ?>
                    <!-- Если зашел подписчик -->
                    <?php if(current_user_can('subscriber')){ ?>
                        <div class="col-md-12">
                          <h1 class="vitrin_heading">Антистресс Визард Ловушка</h1>
                          <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                              <div class="vitrin">
                                <p><h3>Добрый день!</h3></p>
                                <p>
                                  Для того чтоб избавиться от злости, раздражения и прочих надоедливых мыслей нам часто приходится искать "свободные уши" и изливать в них свои беспокойства. Мы решили сделать программу которая справлялась бы с этой задачей и была под рукой 24 часа в сутки.
                                </p>
                                <p>
                                  20 декабря 2017г. программа <b>"Антистресс Визард Ловушка"</b> стала доступна пользователям. Мы продумали максимально удобный и простой интерфейс. Им одинаково удобно пользоваться на компьютере, ноутбуке, планшете и даже на смартфоне. Так, в любой момент Вы можете воспользоваться ловушкой прямо с экрана своего смартфона, для этого Вам необходим только интернет и доступ к <b>"Антистресс Визард Ловушка"</b>.
                                </p>
                                <p>
                                  <img src="<?php bloginfo('template_url'); ?>/img/items.png" alt="lovushka_items" class="items">
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <h2>Мы предлагаем 2 варианта использования программы</h2>
                          <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-5">
                              <div class="vitrin">
                                <h3>Базовый вариант</h3>
                                <p class="vitrin_content">В базовом режиме программы <b>"Антистресс Визард Ловушка"</b> пользователю доступны быстрые протоколы ("Боюсь", "Злюсь", "Обижаюсь", "Сомневаюсь"). Эти протоколы позволяют в один "клик", за 4 минуты, избавиться от переживаний. В этом режиме, возможно ручное управление скоростью вращения ловушки. Время работы ловушки при ручном управлении осуществляется на усмотрение пользователя.</p>
                                <h4>Стоимость базовой версии</h4>
                                <div class="price">5500 руб./год.</div>
                              </div>
                            </div>
                            <div class="col-sm-5">
                              <div class="vitrin">
                                <h3>Расширенный вариант</h3>
                                <p class="vitrin_content">Раширенный режим программы <b>"Антистресс Визард Ловушка"</b> включает в себя все возможности базового режима, а так же механизм для "Пересмотра личной истории". В этом режиме, можно выбрать до 2-х актуальных проблем из списка и следую подсказкам программы провести глубокую проработку личной истории. В этом режиме скоростью вращения лоушки управляет программа. На разных этапах она может меняться</p>
                                <h4>Стоимость расширенной версии</h4>
                                <div class="price">10000 руб./год.</div>
                              </div>
                            </div>
                            <div class="col-sm-1"></div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <h2>Как приобрести доступ к программе?</h2>
                          <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                              <div class="vitrin">
                                Для того чтоб приобрести доступ к программе напишите на <a href="mailto:info@chikurov.com">info@chikurov.com</a> указав в письме какой вариант работы Вы выбираете.
                                <h3></h3>
                                <h4>Юридическая информация:</h4>
                                <p><a href="mailto:info@chikurov.com">info@chikurov.com</a> / +7 (495) 135-25-48</p>
                                <p>ОГРНИП: 314910224600336</p>
                                <p>ИНН: 7706092528</p>
                              </div>
                            </div>
                          </div>
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
