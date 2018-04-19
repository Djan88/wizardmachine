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
                          <h1 class="vitrin_heading">Интерактивный веб-проект "WizardMachine"</h1>
                          <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                              <div class="vitrin vitrin-content">
                                <p>Добрый день!</p>
                                <p>
                                  <b>"WizardMachine"</b> — это интерактивный веб-проект для коррекции индивидуальных личностных проблем. Работа осуществляется по цифровой фотографии пациента. Для эффективной работы в программе оператору необходимо обладать базовыми навыками биологического центрирования и прочесть книгу Чикурова Юрия Валентиновича "Биологическое Центрирование. Практическое руководство".
                                </p>
                                <p>
                                  <img src="<?php bloginfo('template_url'); ?>/library/images/items.png" alt="wizard-machine_items" class="wizard-machine_items">
                                </p>
                                <p>
                                  Программа существует уже более 4 лет. За это время программа значительно расширилась. Пользователю доступен ряд основных протоколов разработанных для коррекции актуальности той или иной зоны, а так-же несколько специальных.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 vitrin">
                          <h2>Из чего состоит функционал программы.</h2>
                          <div class="row">
                            <div class="col-sm-12">
                              <div class="vitrin">
                                <p class="vitrin_content">
                                    Приобретая программу Вы получите на свою электронную почту подробное руководство в формате PDF с наглядными изображениями и описанием каждой из возможностей программы.
                                    Каждый шаг в программе хорошо докумментирован и не позволит Вам сделать "что-то не то...".<br>
                                    Программа работает по встроенным протоколам. Проведя все приготовления оператору останется только нажать кнопку "Выполнить", всю дальнейшую работу "WizardMachine" выполнит самостоятельно, в автоматическом режиме.
                                </p>
                                <p>
                                    <h3>"WizardMachine". Учебный фильм</h3>
                                    <iframe style="display: block;margin: auto;" width="560" height="315" src="https://www.youtube.com/embed/9XI9Z7kHmmY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 vitrin">
                          <h2>Стоимость приобретения "WizardMachine".</h2>
                          <div class="row">
                            <div class="col-sm-12">
                              <div class="vitrin vitrin-content">
                                <p>
                                    Стоимость подключения к программе на 1 год составляет 35 000 руб.
                                </p>
                                <p>
                                    Через год и далее Вы сможете продлить Вашу учетную запись за 25 000 руб.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 vitrin">
                          <h2>Как приобрести доступ к программе?</h2>
                          <div class="row">
                            <div class="col-md-10 col-md-offset-1">
                              <div class="vitrin vitrin-content">
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
