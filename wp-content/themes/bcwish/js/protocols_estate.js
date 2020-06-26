jQuery(function() {
  var onEndEstate,
      sound,
      
      sound = new Howl({
          urls: ['/sounds/tick.ogg', '/sounds/tick.mp3'],
          autoplay: false,
          loop: false,
          buffer: true
      }),
      reloadSound = new Howl({
          urls: ['/sounds/complete.mp3'],
          autoplay: false,
          loop: false,
          buffer: true
      }),
      alertSound = new Howl({
          urls: ['/sounds/success.mp3'],
          autoplay: false,
          loop: false,
          buffer: true
      }),
      alert_altSound = new Howl({
          urls: ['/sounds/alert_alt.mp3'],
          autoplay: false,
          loop: false,
          buffer: true
      }),
      supportsStorage = function(){
          try {
              return 'localStorage' in window && window['localStorage'] !== null;
          } catch (e) {
              return false;
          }
      };
      // jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)').removeClass('hidden');

  onEndEstate = function(){
    jQuery('.wizard_percent').text('100%');

    // protocolName = localStor
    alertSound.play();
    swal({
      title: "Протокол завершен",
      text: "Что делать дальше?",
      type: "success",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      cancelButtonClass: "btn-success",
      cancelButtonText: "Другой протокол",
      confirmButtonText: "Новый клиент",
      closeOnConfirm: false
    },
    function(isConfirm) {
      if (isConfirm) {
        jQuery(location).attr('href','/');
      } else {
        jQuery('.wizard_main_screen, .wizard_to_protList').addClass('hidden');
        jQuery('.wizard_stop').addClass('hidden');
        jQuery('.wizard_prots, .wizard_operation, .wizard_to_what_way').fadeIn(500).removeClass('hidden');
        jQuery('.wizard_heading').text('Выберите протокол');
      }
    })
  }

  universal_9 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('90%');
    reloadTime = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_v0, .zone_v-').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'rotate(0deg) scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
        zIndex: '1000'
    });
    jQuery('.zone_v-').css({
        background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
    });
    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){
            sound.stop();
            reloadSound.play();
        }
        reloadTime += 1;
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(0deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  universal_8_4 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('84%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').addClass('rot_mo_4');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').removeClass('rot_mo_4');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_9');
            endNow();
          } else {
            universal_9();

          } 
        }
    }, 1000);
  }

  universal_8_3 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('80%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').addClass('rot_mo_3');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').removeClass('rot_mo_3');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_8_4');
            endNow();
          } else {
            universal_8_4();
          } 
        }
    }, 1000);
  } 

  universal_8_2 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('76%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').addClass('rot_mo_2');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').removeClass('rot_mo_2');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_8_3');
            endNow();
          } else {
            universal_8_3();
          } 
        }
    }, 1000);
  } 

  universal_8_1 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('72%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    
    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').addClass('rot_mo_1');

    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').removeClass('rot_mo_1');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_8_2');
            endNow();
          } else {
            universal_8_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_7 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('66%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'rotate(0deg) scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .removeAttr('style')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
      jQuery('.zone_ring')
        .removeClass('hidden')
        .css({
          opacity: 0.8,
          background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
        });
      jQuery('.ring').addClass('rot_ring');
      jQuery('.zone_ring').addClass('rot_zone_ring');
    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 240) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(0deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').removeClass('rot_ring');
        jQuery('.zone_ring').removeClass('rot_zone_ring');
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg) scale(1.5)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_8_1');
          endNow()
        } else {
          universal_8_1();
        } 
      }
    }, 250);
  }

  universal_6_4 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('62%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').addClass('rot_mo_4');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').removeClass('rot_mo_4');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_7');
            endNow();
          } else {
            universal_7();

          } 
        }
    }, 1000);
  }

  universal_6_3 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('58%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').addClass('rot_mo_3');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').removeClass('rot_mo_3');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_6_4');
            endNow();
          } else {
            universal_6_4();
          } 
        }
    }, 1000);
  } 

  universal_6_2 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('54%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').addClass('rot_mo_2');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').removeClass('rot_mo_2');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_6_3');
            endNow();
          } else {
            universal_6_3();
          } 
        }
    }, 1000);
  } 

  universal_6_1 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('50%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').addClass('rot_mo_1');

    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').removeClass('rot_mo_1');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_6_2');
            endNow();
          } else {
            universal_6_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_5 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('44%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'rotate(0deg) scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .removeAttr('style')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
      jQuery('.zone_ring')
        .removeClass('hidden')
        .css({
          opacity: 0.8,
          background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
        });
      jQuery('.ring').addClass('rot_ring');
      jQuery('.zone_ring').addClass('rot_zone_ring');

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 240) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(0deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').removeClass('rot_ring');
        jQuery('.zone_ring').removeClass('rot_zone_ring');
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg) scale(1.5)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_6_1');
          endNow()
        } else {
          universal_6_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  universal_4_4 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('40%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s3, .zone_v4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_s3, .zone_v4').addClass('rot_mo_4');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_s3, .zone_v4').removeClass('rot_mo_4');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_5');
            endNow();
          } else {
            universal_5();

          } 
        }
    }, 1000);
  }

  universal_4_3 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('36%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s3, .zone_v4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_s3, .zone_v4').addClass('rot_mo_3');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_s3, .zone_v4').removeClass('rot_mo_3');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_4_4');
            endNow();
          } else {
            universal_4_4();
          } 
        }
    }, 1000);
  } 

  universal_4_2 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('32%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s3, .zone_v4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_s3, .zone_v4').addClass('rot_mo_2');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_s3, .zone_v4').removeClass('rot_mo_2');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_4_3');
            endNow();
          } else {
            universal_4_3();
          } 
        }
    }, 1000);
  } 

  universal_4_1 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('28%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s3, .zone_v4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    
    jQuery('.zone_s3, .zone_v4').addClass('rot_mo_1');
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_s3, .zone_v4').removeClass('rot_mo_1');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_4_2');
            endNow();
          } else {
            universal_4_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_3 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('22%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_s3, .zone_v4').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'rotate(0deg) scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .removeAttr('style')
      .css({
        opacity: 0.8,
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    jQuery('.ring').addClass('rot_ring');
    jQuery('.zone_ring').addClass('rot_zone_ring');

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s3, .zone_v4').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s3, .zone_v4').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s3, .zone_v4').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 240) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(0deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').removeClass('rot_ring');
        jQuery('.zone_ring').removeClass('rot_zone_ring');
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg) scale(1.5)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_4_1');
          endNow()
        } else {
          universal_4_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  universal_2_4 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('18%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').addClass('rot_mo_4');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').removeClass('rot_mo_4');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_3');
            endNow();
          } else {
            universal_3();

          } 
        }
    }, 1000);
  }

  universal_2_3 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('14%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').addClass('rot_mo_3');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').removeClass('rot_mo_3');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_2_4');
            endNow();
          } else {
            universal_2_4();
          } 
        }
    }, 1000);
  } 

  universal_2_2 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('10%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').addClass('rot_mo_2');
    
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').removeClass('rot_mo_2');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_2_3');
            endNow();
          } else {
            universal_2_3();
          } 
        }
    }, 1000);
  } 

  universal_2_1 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('6%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'rotate(0deg) scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').addClass('rot_mo_1');
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').removeClass('rot_mo_1');
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_2_2');
            endNow();
          } else {
            universal_2_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4, .zone_cl').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'rotate(0deg) scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .removeAttr('style')
      .css({
        opacity: 0.8,
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    jQuery('.zone_cl').addClass('rot_90_one').css({
      background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
    });
    jQuery('.ring').addClass('rot_ring');
    jQuery('.zone_ring').addClass('rot_zone_ring');

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 240) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(0deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.zone_cl').removeClass('rot_90_one');
        jQuery('.ring').removeClass('rot_ring');
        jQuery('.zone_ring').removeClass('rot_zone_ring');
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg) scale(1.5)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_2_1');
          endNow()
        } else {
          universal_2_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }


  jQuery('.estate_start').on('click', function(event) {
    swal({
      title: "Проверьте все ли зоны Вы отметили",
      text: "Отметьте все внутренние углы, двери и сан. узлы.",
      type: "success",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      cancelButtonClass: "btn-success",
      cancelButtonText: "Проверить",
      confirmButtonText: "Старт",
      closeOnConfirm: false
    },
    function(isConfirm) {
      if (isConfirm) {
        estate1();
        jQuery('.status_title').text('Протокол выполняется');
      }
    })






    
  });

});
