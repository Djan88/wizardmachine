jQuery(function() {
  var knife,
      knifeDate,
      knifeDateOld,
      knifeDateDiff,
      knife_rate_class,
      knife_rate_class_dotted,
      protocol,
      checkPoints,
      pointsStatus = true,
      reloadTime = 0,
      reloadTime1 = 0,
      d12Val = 0,
      cur_animation_val = 0,
      rotateVal = 0,
      count_animation = 1,
      pausedStatus = false,
      endNow,
      onEnd,
      protocolfromMemory,
      firstTriangleAnimation,
      secondTriangleAnimation,
      thirdTriangleAnimation,
      fourthTriangleAnimation,
      // sound = new buzz.sound( "/sounds/tick", {
      //     formats: [ "ogg", "mp3" ]
      // }),
      // reloadSound = new buzz.sound( "/sounds/reload", {
      //     formats: [ "ogg", "mp3" ]
      // }),
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
      supportsStorage = function(){
          try {
              return 'localStorage' in window && window['localStorage'] !== null;
          } catch (e) {
              return false;
          }
      };
      // jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)').removeClass('hidden');

  //Изменение размера круга
  jQuery('#ring').resizable({
    aspectRatio: 1/1
  });

  endNow = function(){
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    alertSound.play();

    swal({
      title: "Приостановлено пользователем",
      text: "Что делать дальше?",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      cancelButtonClass: "btn-success",
      cancelButtonText: "Продолжить",
      confirmButtonText: "К началу",
      closeOnConfirm: false
    },
    function(isConfirm) {
      if (isConfirm) {
        jQuery(location).attr('href','/');
      } else {
        jQuery('.wizard_stop, .zone_ring').addClass('hidden');
        jQuery('.wizard_play').fadeIn(500).removeClass('hidden');
      }
    })
  }

  onEnd = function(){
    jQuery('.btn-to_endNow').addClass('hidden');
    jQuery('.btn_start').removeAttr('disabled');
    jQuery('.wizard_percent').text('100%');
    rotate_one = 0;
    rotate_two = 0;
    rotate_three = 0;
    rotate_four = 0;
    rotate_lovushka = 0;
    count_animation = 0;
    localStorage.removeItem('paused');
    localStorage.removeItem('pausedPhoto');
    pausedStatus = false;

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

  //Dragging elems
  jQuery('.draggable, .ring').draggable({
    snap: false
  });

  // Dragging knife
  jQuery('.marakata').draggable({
    containment: '.wizard_grafic',
    axis: 'y',
    drag: function() {
      // if(jQuery('.btn_graf').hasClass('active')){
        jQuery('.wizard_clean_graf').fadeIn(500).removeClass('hidden');
        knife = jQuery('.marakata').css('top');
        knife = knife.substr(0, knife.length - 2);
        knifeDate = new Date();
        knifeDateDiff = knifeDate - knifeDateOld;
        knife_rate_class = 'knife_rate-'+knife;
        knife_rate_class_dotted = '.knife_rate-'+knife;
        jQuery('.wizard_grafic').append('<div class='+knife_rate_class+'></div>');
        jQuery(knife_rate_class_dotted).addClass('knife_rate').css({
            top: +knife+45+'px',
            width: knifeDateDiff*2+'px'
        });
        knifeDateOld = knifeDate;
      // }
    }
  });

  universal_9 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('90%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
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
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_8_2');
            endNow();
          } else {
            universal_8_2();
          } 
        }
    }, 1000);
  }  

  universal_7 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('66%');
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_8_1');
          endNow()
        } else {
          universal_8_1();
          // console.log('continue');
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
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_6_2');
            endNow();
          } else {
            universal_6_2();
          } 
        }
    }, 1000);
  }  

  universal_5 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('44%');
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
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
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_4_2');
            endNow();
          } else {
            universal_4_2();
          } 
        }
    }, 1000);
  }  

  universal_3 = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('22%');
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s3, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
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
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_2_2');
            endNow();
          } else {
            universal_2_2();
          } 
        }
    }, 1000);
  }  

  universal = function(){
    jQuery('.wizard_heading').text('Выполняется Универсальный протокол');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v2, .zone_d2_, .zone_d3, .zone_d4, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
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

  drenag_12 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('92%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        onEnd();
      }
    }, 250);
  }

  drenag_11 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('80%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 420){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_12');
          endNow()
        } else {
          drenag_12();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag_10 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('72%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_11');
          endNow()
        } else {
          drenag_11();
          // console.log('continue');
        }
      }
    }, 250);
  }
  drenag_9 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('64%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_10');
          endNow()
        } else {
          drenag_10();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag_8 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('56%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 420){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_9');
          endNow()
        } else {
          drenag_9();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag_7 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('48%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_8');
          endNow()
        } else {
          drenag_8();
          // console.log('continue');
        }
      }
    }, 250);
  }
  drenag_6 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('40%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_7');
          endNow()
        } else {
          drenag_7();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag_5 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('32%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 420){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_6');
          endNow()
        } else {
          drenag_6();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag_4 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('24%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_5');
          endNow()
        } else {
          drenag_5();
          // console.log('continue');
        }
      }
    }, 250);
  }
  drenag_3 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('16%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_s2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_s2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_s3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_s4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_s5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_s6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_s6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_4');
          endNow()
        } else {
          drenag_4();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag_2 = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('8%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 420){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_v2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_v4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_v5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v-').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_v-').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_3');
          endNow()
        } else {
          drenag_3();
          // console.log('continue');
        }
      }
    }, 250);
  }

  drenag = function(){
    jQuery('.wizard_heading').text('Выполняется "Ресурсный протокол"');
    jQuery('.wizard_percent').text('0%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 600){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
            background: '#fff url(/wp-content/themes/bcwish/img/edinenie_s_tvorcom.png) center center/110% no-repeat',
        });
        if (count_animation > 0 && count_animation <= 20) {
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 40) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 40 && count_animation <= 60) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 60 && count_animation <= 80) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 80 && count_animation <= 100) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 100 && count_animation <= 120) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 140) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 140 && count_animation <= 160) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 180) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 180 && count_animation <= 200) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 200 && count_animation <= 220) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 240 && count_animation <= 260) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 260 && count_animation <= 280) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 280 && count_animation <= 300) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 300 && count_animation <= 320) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 340) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 340 && count_animation <= 360) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 360 && count_animation <= 380) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 380 && count_animation <= 400) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 400 && count_animation <= 420) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 420 && count_animation <= 440) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 460) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 460 && count_animation <= 480) {
          jQuery('.zone_d2').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d2_').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 480 && count_animation <= 500) {
          jQuery('.zone_d2_').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d3').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 500 && count_animation <= 520) {
          jQuery('.zone_d3').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d4').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 520 && count_animation <= 540) {
          jQuery('.zone_d4').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d5').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 540 && count_animation <= 560) {
          jQuery('.zone_d5').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_d6').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 560 && count_animation <= 580) {
          jQuery('.zone_d6').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1').css({
              color: 'transparent',
              borderColor: 'transparent',
              opacity: 0.8,
              borderWidth: '1px',
              paddingTop: '4px',
              transform: 'scale(1.5)',
              zIndex: '1000',
              background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/110% no-repeat',
          });
        } else if (count_animation > 580 && count_animation <= 600) {
          jQuery('.zone_v1').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'drenag_2');
          endNow()
        } else {
          drenag_2();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v5_14 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('93%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  v5_13 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('87%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('85%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('87%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('89%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'v5_14');
                      endNow()
                    } else {
                      v5_14();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  v5_12_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('84%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_13');
            endNow();
          } else {
            v5_13();
          } 
        }
    }, 1000);
  }

  v5_12_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('81%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_12_4');
            endNow();
          } else {
            v5_12_4();
          } 
        }
    }, 1000);
  }

  v5_12_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('78%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_12_3');
            endNow();
          } else {
            v5_12_3();
          } 
        }
    }, 1000);
  }

  v5_12_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('75%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_12_2');
            endNow();
          } else {
            v5_12_2();
          } 
        }
    }, 1000);
  }

  v5_11_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('72%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_12_1');
            endNow();
          } else {
            v5_12_1();
          } 
        }
    }, 1000);
  }

  v5_11_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('69%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_11_4');
            endNow();
          } else {
            v5_11_4();
          } 
        }
    }, 1000);
  }

  v5_11_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('66%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_11_3');
            endNow();
          } else {
            v5_11_3();
          } 
        }
    }, 1000);
  }

  v5_11_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('63%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_11_2');
            endNow();
          } else {
            v5_11_2();
          } 
        }
    }, 1000);
  }

  v5_10_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('60%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_11_1');
            endNow();
          } else {
            v5_11_1();
          } 
        }
    }, 1000);
  }

  v5_10_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('57%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_10_4');
            endNow();
          } else {
            v5_10_4();
          } 
        }
    }, 1000);
  }

  v5_10_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('54%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_10_3');
            endNow();
          } else {
            v5_10_3();
          } 
        }
    }, 1000);
  }

  v5_10_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('51%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_10_2');
            endNow();
          } else {
            v5_10_2();
          } 
        }
    }, 1000);
  }

  v5_9 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('48%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_10_1');
          endNow()
        } else {
          v5_10_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }
  v5_8 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('42%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_9');
          endNow()
        } else {
          v5_9();
          // console.log('continue');
        } 
      }
    }, 250);
  }
  v5_7 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('36%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_8');
          endNow()
        } else {
          v5_8();
          // console.log('continue');
        } 
      }
    }, 250);
  }
  v5_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('30%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_7');
          endNow()
        } else {
          v5_7();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v5_5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('24%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_6');
          endNow()
        } else {
          v5_6();
          // console.log('continue');
        } 
      }
    }, 250);
  }
  v5_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('18%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_5');
          endNow()
        } else {
          v5_5();
          // console.log('continue');
        } 
      }
    }, 250);
  }
  v5_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('12%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_4');
          endNow()
        } else {
          v5_4();
          // console.log('continue');
        } 
      }
    }, 250);
  }
  v5_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('6%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_3');
          endNow()
        } else {
          v5_3();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_s5, .zone_s6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-, .zone_v0').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            background: '#fff url(/wp-content/themes/bcwish/img/vig_.png) center center/100% no-repeat',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_s5, .zone_s6, .zone_v-, .zone_v0').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v5_2');
          endNow()
        } else {
          v5_2();
          // console.log('continue');
        }
      }
    }, 250);
  }  

  solis_9 = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('94%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  solis_8 = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('86%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('85%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('87%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('89%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'solis_9');
                      endNow()
                    } else {
                      solis_9();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  solis_7 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('74%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v-, .zone_v3, .zone_v0, .zone_hidden_1, .zone_hidden_2, .zone_hidden_3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/drenag_2.png) center center/100% no-repeat',
        });
        jQuery('.zone_v3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/drenag.png) center center/100% no-repeat',
        });
        jQuery('.zone_v0').css({
            background: 'transparent'
        });

        if (count_animation > 4 && count_animation <= 8) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
        } else if (count_animation > 8 && count_animation <= 12) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_1').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_v0').css('left'))+'px',
            top: parseFloat(jQuery('.zone_v0').css('top'))-40+'px'
          });
        } else if (count_animation > 12 && count_animation <= 16) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_2').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_1').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_1').css('top'))-40+'px'
          });
        } else if (count_animation > 16) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_3').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_2').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_2').css('top'))-40+'px'
          });
        }

        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
        jQuery('.zone_v0').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.zone_v-, .zone_v3, .zone_v0, .zone_hidden_1, .zone_hidden_2, .zone_hidden_3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_8');
          endNow()
        } else {
          solis_8();
          // console.log('continue');
        }
      }
    }, 250);
  }

  solis_6 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('62%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0, .zone_hidden_1, .zone_hidden_2, .zone_hidden_3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/drenag_2.png) center center/100% no-repeat',
        });
        jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: 'transparent'
        });

        if (count_animation > 4 && count_animation <= 8) {
          jQuery('.zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 8 && count_animation <= 12) {
          jQuery('.zone_v5, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 12 && count_animation <= 16) {
          jQuery('.zone_v5, .zone_v4, .zone_v3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 16 && count_animation <= 20) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 24) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 24 && count_animation <= 28) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
        } else if (count_animation > 28 && count_animation <= 32) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_1').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_v0').css('left'))+'px',
            top: parseFloat(jQuery('.zone_v0').css('top'))-40+'px'
          });
        } else if (count_animation > 32 && count_animation <= 36) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_2').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_1').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_1').css('top'))-40+'px'
          });
        } else if (count_animation > 36 && count_animation) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_3').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_2').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_2').css('top'))-40+'px'
          });
        }

        if (count_animation > 24 && count_animation <= 160) {
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 320) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_7');
          endNow()
        } else {
          solis_7();
          // console.log('continue');
        }
      }
    }, 250);
  }

  solis_5 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('50%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0, .zone_hidden_1, .zone_hidden_2, .zone_hidden_3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/drenag_2.png) center center/100% no-repeat',
        });
        jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: 'transparent'
        });

        if (count_animation > 4 && count_animation <= 8) {
          jQuery('.zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 8 && count_animation <= 12) {
          jQuery('.zone_v5, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 12 && count_animation <= 16) {
          jQuery('.zone_v5, .zone_v4, .zone_v3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 16 && count_animation <= 20) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 24) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 24 && count_animation <= 28) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
        } else if (count_animation > 28 && count_animation <= 32) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_1').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_v0').css('left'))+'px',
            top: parseFloat(jQuery('.zone_v0').css('top'))-40+'px'
          });
        } else if (count_animation > 32 && count_animation <= 36) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_2').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_1').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_1').css('top'))-40+'px'
          });
        } else if (count_animation > 36 && count_animation) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_3').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_2').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_2').css('top'))-40+'px'
          });
        }

        if (count_animation > 24 && count_animation <= 160) {
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 320) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_6');
          endNow()
        } else {
          solis_6();
          // console.log('continue');
        }
      }
    }, 250);
  }

  solis_4 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('38%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0, .zone_hidden_1, .zone_hidden_2, .zone_hidden_3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/drenag_2.png) center center/100% no-repeat',
        });
        jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: 'transparent'
        });

        if (count_animation > 4 && count_animation <= 8) {
          jQuery('.zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 8 && count_animation <= 12) {
          jQuery('.zone_v5, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 12 && count_animation <= 16) {
          jQuery('.zone_v5, .zone_v4, .zone_v3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 16 && count_animation <= 20) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 24) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 24 && count_animation <= 28) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
        } else if (count_animation > 28 && count_animation <= 32) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_1').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_v0').css('left'))+'px',
            top: parseFloat(jQuery('.zone_v0').css('top'))-40+'px'
          });
        } else if (count_animation > 32 && count_animation <= 36) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_2').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_1').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_1').css('top'))-40+'px'
          });
        } else if (count_animation > 36 && count_animation) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_3').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_2').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_2').css('top'))-40+'px'
          });
        }

        if (count_animation > 24 && count_animation <= 160) {
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 320) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_5');
          endNow()
        } else {
          solis_5();
          // console.log('continue');
        }
      }
    }, 250);
  }

  solis_3 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('32%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0, .zone_hidden_1, .zone_hidden_2, .zone_hidden_3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000',
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/drenag_2.png) center center/100% no-repeat',
        });
        jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: 'transparent'
        });

        if (count_animation > 4 && count_animation <= 8) {
          jQuery('.zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 8 && count_animation <= 12) {
          jQuery('.zone_v5, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 12 && count_animation <= 16) {
          jQuery('.zone_v5, .zone_v4, .zone_v3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 16 && count_animation <= 20) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 20 && count_animation <= 24) {
          jQuery('.zone_v5, .zone_v4, .zone_v3, .zone_v2, .zone_v1').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 24 && count_animation <= 28) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
        } else if (count_animation > 28 && count_animation <= 32) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_1').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_v0').css('left'))+'px',
            top: parseFloat(jQuery('.zone_v0').css('top'))-40+'px'
          });
        } else if (count_animation > 32 && count_animation <= 36) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_2').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_1').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_1').css('top'))-40+'px'
          });
        } else if (count_animation > 36 && count_animation) {
          jQuery('.zone_v0').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
          });
          jQuery('.zone_hidden_3').removeClass('hidden').css({
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/100% no-repeat',
            left: parseFloat(jQuery('.zone_hidden_2').css('left'))+'px',
            top: parseFloat(jQuery('.zone_hidden_2').css('top'))-40+'px'
          });
        }

        if (count_animation > 24 && count_animation <= 160) {
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 160 && count_animation <= 320) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 320 && count_animation <= 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 480) {
          jQuery('.zone_hidden_1, .zone_hidden_2, .zone_hidden_3').addClass('hidden');
          jQuery('.zone_v0').css({
              background: '#fff',
              color: '#413e66',
              borderColor: '#413e66',
              transform: 'scale(1)',
              paddingTop: '2px',
              zIndex: '2'
          });
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v-, .zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5, .zone_v0').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_4');
          endNow()
        } else {
          solis_4();
          // console.log('continue');
        }
      }
    }, 250);
  }


  solis_2_4 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('26%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_3');
            endNow();
          } else {
            solis_3();
          } 
        }
    }, 1000);
  }

  solis_2_3 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('20%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_2_4');
            endNow();
          } else {
            solis_2_4();
          } 
        }
    }, 1000);
  }

  solis_2_2 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('16%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_2_3');
            endNow();
          } else {
            solis_2_3();
          } 
        }
    }, 1000);
  }

  solis_2_1 = function(){
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('12%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v2, .zone_v3, .zone_v4, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_2_2');
            endNow();
          } else {
            solis_2_2();
          } 
        }
    }, 1000);
  }


  solis = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('0%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v2, .zone_v3, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_v2').css({
            background: 'url(/wp-content/themes/bcwish/img/nerazd.png) center center/100% no-repeat'
        });
        jQuery('.zone_v3').css({
            background: 'url(/wp-content/themes/bcwish/img/nerazd_001.png) center center/100% no-repeat'
        });
        jQuery('.zone_v4').css({
            background: 'url(/wp-content/themes/bcwish/img/nerazd_002.png) center center/100% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v2, .zone_v3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_2_1');
          endNow()
        } else {
          solis_2_1();
        } 
      }
    }, 250);
  }

  mmt_8 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('90%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  mmt_7 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('80%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('85%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('87%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('89%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'mmt_8');
                      endNow()
                    } else {
                      mmt_8();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  mmt_6 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('75%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v1, .zone_d3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v1, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v1, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220 && count_animation <= 440) {
          jQuery('.zone_v1, .zone_d3').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
                        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_v1, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 560) {
          jQuery('.zone_v1, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        console.log(count_animation);
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 344 && count_animation <= 464){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 464 && count_animation <= 586){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 586 && count_animation <= 635){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 635 && count_animation <= 685){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v1, .zone_d3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'mmt_7');
          endNow()
        } else {
          mmt_7();
          // console.log('continue');
        }
      }
    }, 250);
  }

  mmt_5 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('60%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220 && count_animation <= 440) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
                        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 560) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        console.log(count_animation);
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 344 && count_animation <= 464){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 464 && count_animation <= 586){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 586 && count_animation <= 635){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 635 && count_animation <= 685){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_d3, .zone_d5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'mmt_6');
          endNow()
        } else {
          mmt_6();
          // console.log('continue');
        }
      }
    }, 250);
  }

  mmt_4 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('45%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220 && count_animation <= 440) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
                        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 560) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        console.log(count_animation);
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 344 && count_animation <= 464){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 464 && count_animation <= 586){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 586 && count_animation <= 635){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 635 && count_animation <= 685){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d3, .zone_v4, .zone_s4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'mmt_5');
          endNow()
        } else {
          mmt_5();
          // console.log('continue');
        }
      }
    }, 250);
  }

  mmt_3 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('30%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s3, .zone_d3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s3, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s3, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220 && count_animation <= 440) {
          jQuery('.zone_s3, .zone_d3').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
                        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_s3, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 560) {
          jQuery('.zone_s3, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        console.log(count_animation);
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 344 && count_animation <= 464){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 464 && count_animation <= 586){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 586 && count_animation <= 635){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 635 && count_animation <= 685){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s3, .zone_d3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'mmt_4');
          endNow()
        } else {
          mmt_4();
          // console.log('continue');
        }
      }
    }, 250);
  }

  mmt_2 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('15%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s2_, .zone_d3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s2_, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2_, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220 && count_animation <= 440) {
          jQuery('.zone_s2_, .zone_d3').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
                        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_s2_, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 560) {
          jQuery('.zone_s2_, .zone_d3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        console.log(count_animation);
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 344 && count_animation <= 464){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 464 && count_animation <= 586){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 586 && count_animation <= 635){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 635 && count_animation <= 685){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s2_, .zone_d3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'mmt_3');
          endNow()
        } else {
          mmt_3();
          // console.log('continue');
        }
      }
    }, 250);
  }

  mmt = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 685){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2_, .zone_s2, .zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2_, .zone_s2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2_, .zone_s2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220 && count_animation <= 440) {
          jQuery('.zone_d2_, .zone_s2').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
                        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_d2_, .zone_s2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 560) {
          jQuery('.zone_d2_, .zone_s2').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        console.log(count_animation);
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 344 && count_animation <= 464){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 464 && count_animation <= 586){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation > 586 && count_animation <= 635){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation > 635 && count_animation <= 685){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2_, .zone_s2, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'mmt_2');
          endNow()
        } else {
          mmt_2();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v4_13 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('96%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  v4_12 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('90%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('85%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('87%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('89%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'v4_13');
                      endNow()
                    } else {
                      v4_13();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  v4_11_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('84%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_12');
            endNow();
          } else {
            v4_12();
          } 
        }
    }, 1000);
  }

  v4_11_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('81%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_11_4');
            endNow();
          } else {
            v4_11_4();
          } 
        }
    }, 1000);
  }

  v4_11_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('78%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_11_3');
            endNow();
          } else {
            v4_11_3();
          } 
        }
    }, 1000);
  }

  v4_11_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('75%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_11_2');
            endNow();
          } else {
            v4_11_2();
          } 
        }
    }, 1000);
  }

  v4_10_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('72%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_11_1');
            endNow();
          } else {
            v4_11_1();
          } 
        }
    }, 1000);
  }

  v4_10_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('69%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_10_4');
            endNow();
          } else {
            v4_10_4();
          } 
        }
    }, 1000);
  }

  v4_10_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('66%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_10_3');
            endNow();
          } else {
            v4_10_3();
          } 
        }
    }, 1000);
  }

  v4_10_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('63%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_10_2');
            endNow();
          } else {
            v4_10_2();
          } 
        }
    }, 1000);
  }

  v4_9_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('60%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_10_1');
            endNow();
          } else {
            v4_10_1();
          } 
        }
    }, 1000);
  }

  v4_9_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('57%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_9_4');
            endNow();
          } else {
            v4_9_4();
          } 
        }
    }, 1000);
  }

  v4_9_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('54%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_9_3');
            endNow();
          } else {
            v4_9_3();
          } 
        }
    }, 1000);
  }

  v4_9_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('51%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_s4, .zone_s5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_9_2');
            endNow();
          } else {
            v4_9_2();
          } 
        }
    }, 1000);
  }

  v4_8_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('48%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_9_1');
            endNow();
          } else {
            v4_9_1();
          } 
        }
    }, 1000);
  }

  v4_8_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('45%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_8_4');
            endNow();
          } else {
            v4_8_4();
          } 
        }
    }, 1000);
  }

  v4_8_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('42%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_8_3');
            endNow();
          } else {
            v4_8_3();
          } 
        }
    }, 1000);
  }

  v4_8_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('39%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v4_8_2');
            endNow();
          } else {
            v4_8_2();
          } 
        }
    }, 1000);
  }

  v4_7 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('36%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s3, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_8_1');
          endNow()
        } else {
          v4_8_1();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v4_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('30%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2_, .zone_d3, .zone_d4, .zone_v2, .zone_v3').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2_, .zone_d3, .zone_d4, .zone_v2, .zone_v3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_7');
          endNow()
        } else {
          v4_7();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v4_5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('24%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d4, .zone_d2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d4, .zone_d2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_6');
          endNow()
        } else {
          v4_6();
          // console.log('continue');
        }
      }
    }, 250);
  }


  v4_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('18%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_5');
          endNow()
        } else {
          v4_5();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v4_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('12%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d3, .zone_v4, .zone_d4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d3, .zone_v4, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d3, .zone_v4, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d3, .zone_v4, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d3, .zone_v4, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_4');
          endNow()
        } else {
          v4_4();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v4_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('6%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s3, .zone_s4, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s3, .zone_s4, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s3, .zone_s4, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s3, .zone_s4, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s3, .zone_s4, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_3');
          endNow()
        } else {
          v4_3();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_cl, .zone_v1, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_cl, .zone_v1, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v4_2');
          endNow()
        } else {
          v4_2();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v3_9 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('97%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  v3_8 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('92%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('85%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('87%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('89%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'v3_9');
                      endNow()
                    } else {
                      v3_9();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  v3_7_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('84%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_8');
            endNow();
          } else {
            v3_8();
          } 
        }
    }, 1000);
  }

  v3_7_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('79%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_7_4');
            endNow();
          } else {
            v3_7_4();
          } 
        }
    }, 1000);
  }

  v3_7_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('74%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_7_3');
            endNow();
          } else {
            v3_7_3();
          } 
        }
    }, 1000);
  }

  v3_7_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('69%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_d3, .zone_d4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_7_2');
            endNow();
          } else {
            v3_7_2();
          } 
        }
    }, 1000);
  }

  v3_6_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('64%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_7_1');
            endNow();
          } else {
            v3_7_1();
          } 
        }
    }, 1000);
  }

  v3_6_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('59%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_6_4');
            endNow();
          } else {
            v3_6_4();
          } 
        }
    }, 1000);
  }

  v3_6_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('54%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_6_3');
            endNow();
          } else {
            v3_6_3();
          } 
        }
    }, 1000);
  }

  v3_6_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('49%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s3, .zone_s4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_6_2');
            endNow();
          } else {
            v3_6_2();
          } 
        }
    }, 1000);
  }

  v3_5_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('44%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 320;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_6_1');
            endNow();
          } else {
            v3_6_1();
          } 
        }
    }, 1000);
  }

  v3_5_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('39%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_5_4');
            endNow();
          } else {
            v3_5_4();
          } 
        }
    }, 1000);
  }

  v3_5_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('34%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 20;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_5_3');
            endNow();
          } else {
            v3_5_3();
          } 
        }
    }, 1000);
  }

  v3_5_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('29%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v3_5_2');
            endNow();
          } else {
            v3_5_2();
          } 
        }
    }, 1000);
  }

  v3_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('24%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v1, .zone_v3, .zone_v4, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v3_5_1');
          endNow()
        } else {
          v3_5_1();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v3_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('16%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_v1, .zone_v3, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v1, .zone_v3, .zone_v4, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v3_4');
          endNow()
        } else {
          v3_4();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v3_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('8%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2_, .zone_d3, .zone_d4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d2_, .zone_d3, .zone_d4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2_, .zone_d3, .zone_d4, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v3_3');
          endNow()
        } else {
          v3_3();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 3 — V 4"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_s2_, .zone_s3, .zone_s4').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s2_, .zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat',
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2_, .zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_s2_, .zone_s3, .zone_s4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_s2_, .zone_s3, .zone_s4, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v3_2');
          endNow()
        } else {
          v3_2();
          // console.log('continue');
        }
      }
    }, 250);
  }

  v2_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('93%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  v2_5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('83%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('85%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('87%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('89%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'v2_6');
                      endNow()
                    } else {
                      v2_6();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  v2_4_9 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('78%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 300;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                        //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_5');
            endNow();
          } else {
            v2_5();
          } 
        }
    }, 1000);
  }

  v2_4_8 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('73%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){  
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                       //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_9');
            endNow();
          } else {
            v2_4_9();
          } 
        }
    }, 1000);
  }

  v2_4_7 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('68%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){  
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                       //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_8');
            endNow();
          } else {
            v2_4_8();
          } 
        }
    }, 1000);
  }

  v2_4_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('63%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 55;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){  
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                       //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2, .zone_d2, .zone_d2_').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2, .zone_d2, .zone_d2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_7');
            endNow();
          } else {
            v2_4_7();
          } 
        }
    }, 1000);
  }

  v2_4_5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('58%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
  //Этап 5-2-4
    cur_animation_val = 300;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){  
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                       //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_6');
            endNow();
          } else {
            v2_4_6();
          } 
        }
    }, 1000);
  }

  v2_4_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('53%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){  
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                       //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_5');
            endNow();
          } else {
            v2_4_5();
          } 
        }
    }, 1000);
  }

  v2_4_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('48%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){   
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                      //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_4');
            endNow();
          } else {
            v2_4_4();
          } 
        }
    }, 1000);
  }

  v2_4_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('43%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 0;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                        //40
          cur_animation_val += 1.5;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_s2_, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_4_3');
            endNow();
          } else {
            v2_4_3();
          } 
        }
    }, 1000);
  }

  v2_4_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('36%');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)').removeClass('hidden');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d5, .zone_v5, .zone_s5, .zone_s6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d5, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d5, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d5, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d5, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v2_4_2');
          endNow()
        } else {
          v2_4_2();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v2_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('28%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('30%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('32%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('34%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'v2_4_1');
                      endNow()
                    } else {
                      v2_4_1();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  v2_2_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('23%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 300;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                        //40
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_3');
            endNow();
          } else {
            v2_3();
          } 
        }
    }, 1000);
  }

  v2_2_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('18%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){         
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_2_4');
            endNow();
          } else {
            v2_2_4();
          } 
        }
    }, 1000);
  }

  v2_2_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('13%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_2_3');
            endNow();
          } else {
            v2_2_3();
          } 
        }
    }, 1000);
  }

  v2_2_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('8%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 0;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                        //40
          cur_animation_val += 1.5;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v2, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v2_2_2');
            endNow();
          } else {
            v2_2_2();
          } 
        }
    }, 1000);
  }

  v2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 2 — V 5"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_d2, .zone_d2_, .zone_v2, .zone_s2, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_d2_, .zone_v2, .zone_s2, .zone_s2_').css({
            background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'
          });
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_d2_, .zone_v2, .zone_s2, .zone_s2_').css({
            background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'
          });
        } else if (count_animation > 220) {
          jQuery('.zone_d2, .zone_d2_, .zone_v2, .zone_s2, .zone_s2_').css({
            background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'
          });
        }
        jQuery('.zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_d2, .zone_d2_, .zone_v2, .zone_s2, .zone_s2_, .zone_cl').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v2_2_1');
          endNow()
        } else {
          v2_2_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v1_7 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('91%');
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/plod.png) center center/110% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/x.png) center center/120% no-repeat'
        });
        
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        onEnd();
      }
    }, 250);
  }

  v1_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('78%');
    jQuery('.ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_ring').css('transform', 'rotate(0deg)');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
// I
    phaseOne = setInterval(function(){
      if (count_animation <= 88){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(70deg) scale(1.5)',
            background: 'url(/wp-content/themes/bcwish/img/triangle_air.png) center center/88% no-repeat',
            zIndex: '1000'
        });
        count_animation += 1;
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d2, .zone_d5, .zone_d6, .zone_s2_').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
// II
        jQuery('.wizard_percent').text('81%');
        phaseOne = setInterval(function(){
          if (count_animation <= 88){
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                color: 'transparent',
                borderColor: 'transparent',
                opacity: 0.8,
                borderWidth: '1px',
                paddingTop: '4px',
                transform: 'rotate(20deg) scale(1.5)',
                background: 'url(/wp-content/themes/bcwish/img/triangle_fire.png) center center/88% no-repeat',
                zIndex: '1000'
            });
            count_animation += 1;
          } else {
            clearInterval(phaseOne);
            count_animation = 1;
            jQuery('.zone_v1, .zone_s2, .zone_s4, .zone_v5, .zone_s5, .zone_s6').css({
                background: '#fff',
                color: '#413e66',
                borderColor: '#413e66',
                transform: 'scale(1)',
                paddingTop: '2px',
                zIndex: '2'
            });
// III
            jQuery('.wizard_percent').text('84%');
            phaseOne = setInterval(function(){
              if (count_animation <= 88){
                jQuery('.zone_s3, .zone_v4').css({
                    color: 'transparent',
                    borderColor: 'transparent',
                    opacity: 0.8,
                    borderWidth: '1px',
                    paddingTop: '4px',
                    transform: 'rotate(50deg) scale(1.5)',
                    background: 'url(/wp-content/themes/bcwish/img/triangle_water.png) center center/88% no-repeat',
                    zIndex: '1000'
                });
                count_animation += 1;
              } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('.zone_s3, .zone_v4').css({
                    background: '#fff',
                    color: '#413e66',
                    borderColor: '#413e66',
                    transform: 'scale(1)',
                    paddingTop: '2px',
                    zIndex: '2'
                });
// IV
                jQuery('.wizard_percent').text('87%');
                phaseOne = setInterval(function(){
                  if (count_animation <= 88){
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        color: 'transparent',
                        borderColor: 'transparent',
                        opacity: 0.8,
                        borderWidth: '1px',
                        paddingTop: '4px',
                        transform: 'rotate(100deg) scale(1.5)',
                        background: 'url(/wp-content/themes/bcwish/img/triangle_earth.png) center center/88% no-repeat',
                        zIndex: '1000'
                    });
                    count_animation += 1;
                  } else {
                    clearInterval(phaseOne);
                    count_animation = 1;
                    jQuery('.zone_d4, .zone_d3, .zone_d2_, .zone_v2, .zone_v3').css({
                        background: '#fff',
                        color: '#413e66',
                        borderColor: '#413e66',
                        transform: 'scale(1)',
                        paddingTop: '2px',
                        zIndex: '2'
                    });
                    if (pausedStatus == true) {
                      localStorage.setItem('paused', 'v1_7');
                      endNow()
                    } else {
                      v1_7();
                    } 
                  }
                }, 250);
              }
            }, 250);
          }
        }, 250);
      }
    }, 250);
  }

  v1_5_7 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('72%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-4
    cur_animation_val = 300;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                         //40
          cur_animation_val += 1.5;
          jQuery('.zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_6');
            endNow();
          } else {
            v1_6();
          } 
        }
    }, 1000);
  }

  v1_5_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('66%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-3
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 60){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                        //60
          cur_animation_val += 1.5;
          jQuery('.zone_v3, .zone_s3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 77) {                                                         //77
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v3, .zone_s3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_5_7');
            endNow();
          } else {
            v1_5_7();
          } 
        }
    }, 1000);
  }

  v1_5_5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('60%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-2-1
    cur_animation_val = 10;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 22){ 
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                        //22
          cur_animation_val += 1.5;
          jQuery('.zone_v4, .zone_v3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 39) {                                                         //39
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v4, .zone_v3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_5_6');
            endNow();
          } else {
            v1_5_6();
          } 
        }
    }, 1000);
  }

  v1_5_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('54%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-1-4
    cur_animation_val = 300;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 40){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                         //40
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v4, .zone_v5').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 57) {                                                         //57
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v4, .zone_v5').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_5_5');
            endNow();
          } else {
            v1_5_5();
          } 
        }
    }, 1000);
  }

  v1_5_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('48%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-1-3
    cur_animation_val = 270;
    count_animation = 1;
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 60){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                         //60
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_s3').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 77) {                                                         //77
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v5, .zone_s3').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_5_4');
            endNow();
          } else {
            v1_5_4();
          } 
        }
    }, 1000);
  }

  v1_5_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('42%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 10;
    count_animation = 1;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 53){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                         //53
          cur_animation_val += 1.5;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
            transform: 'rotate('+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 70) {                                                         //70
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v1, .zone_v4').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_5_3');
            endNow();
          } else {
            v1_5_3();
          } 
        }
    }, 1000);
  }

  v1_5_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('36%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
//Этап 5-1-1
    phaseSeven_one = setInterval(function(){
        if (count_animation <= 22){
          if (reloadTime == 0){                                                                       //1
              sound.stop();
              reloadSound.play();
          };
          reloadTime += 1;                                                                         //22
          cur_animation_val += 1.5;
          jQuery('.zone_v0, .zone_v-').css({
            background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
            transform: 'rotate(-'+cur_animation_val+'deg) scale(1.5)',
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            zIndex: '1000'
          });
          count_animation += 1;
        } else if(count_animation <= 39) {                                                         //39
            count_animation += 1;
        } else {
          clearInterval(phaseSeven_one);
          count_animation = 1;
          jQuery('.zone_v0, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v1_5_2');
            endNow();
          } else {
            v1_5_2();
          } 
        }
    }, 1000);
  }

  v1_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('27%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation == 1) {
          cur_animation_val = 0;
          count_animation = 1;
  //анимация против часовой стрелки
          jQuery('.triangle').css({
              transform: 'scale(0.1) rotateY(180deg)rotateZ(120deg)',
              left: '-190px',
              top: '-142px'
          });
  //анимация первого треугольника
          jQuery('.zone_v1').addClass('transparent');
          firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 600}, function(){
  //анимация второго треугольника
            setTimeout(function(){
              jQuery('.zone_v2').addClass('transparent');
              secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 600}, function(){
  //анимация третьего треугольника
                setTimeout(function(){
                  jQuery('.zone_v3').addClass('transparent');
                  thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 600}, function(){
  //анимация четвертого треугольника
                    setTimeout(function(){
                      jQuery('.zone_v4').addClass('transparent');
                      fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 600}, function(){
                        jQuery('.zone').removeClass('transparent');
  //анимация по часовой стрелке
                        jQuery('.triangle').css({
                            transform: 'scale(0.1) rotateY(0deg)rotateZ(120deg)',
                            left: '-184px',
                            top: '-142px'
                        });
  //анимация первого треугольника
                        jQuery('.zone_v1').addClass('transparent');                                                                    
                        firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 600}, function(){
  //анимация второго треугольника
                          setTimeout(function(){
                            jQuery('.zone_v2').addClass('transparent');
                            secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 600}, function(){
  //анимация третьего треугольника
                              setTimeout(function(){
                                jQuery('.zone_v3').addClass('transparent');
                                thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 600}, function(){
  //анимация четвертого треугольника
                                  setTimeout(function(){
                                    jQuery('.zone_v4').addClass('transparent');
                                    fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 600}, function(){
                                    });
                                    fourthTriangleAnimation.play();
                                  }, 250)
                                });
                                thirdTriangleAnimation.play();
                              }, 250)
                            });
                            secondTriangleAnimation.play();
                          }, 250)
                        });
                        firstTriangleAnimation.play();
                      });
                      fourthTriangleAnimation.play();
                    }, 250)
                  });
                  thirdTriangleAnimation.play();
                }, 250)
              });
              secondTriangleAnimation.play();
            }, 250)
          });
          firstTriangleAnimation.play();
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone').removeClass('transparent');
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v1_5_1');
          endNow()
        } else {
          v1_5_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v1_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('18%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation == 1) {
          cur_animation_val = 0;
          count_animation = 1;
  //анимация против часовой стрелки
          jQuery('.triangle').css({
              transform: 'scale(0.1) rotateY(180deg)rotateZ(120deg)',
              left: '-190px',
              top: '-142px'
          });
  //анимация первого треугольника
          jQuery('.zone_v1').addClass('transparent');
          firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 600}, function(){
  //анимация второго треугольника
            setTimeout(function(){
              jQuery('.zone_v2').addClass('transparent');
              secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 600}, function(){
  //анимация третьего треугольника
                setTimeout(function(){
                  jQuery('.zone_v3').addClass('transparent');
                  thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 600}, function(){
  //анимация четвертого треугольника
                    setTimeout(function(){
                      jQuery('.zone_v4').addClass('transparent');
                      fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 600}, function(){
                        jQuery('.zone').removeClass('transparent');
  //анимация по часовой стрелке
                        jQuery('.triangle').css({
                            transform: 'scale(0.1) rotateY(0deg)rotateZ(120deg)',
                            left: '-184px',
                            top: '-142px'
                        });
  //анимация первого треугольника
                        jQuery('.zone_v1').addClass('transparent');                                                                    
                        firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 600}, function(){
  //анимация второго треугольника
                          setTimeout(function(){
                            jQuery('.zone_v2').addClass('transparent');
                            secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 600}, function(){
  //анимация третьего треугольника
                              setTimeout(function(){
                                jQuery('.zone_v3').addClass('transparent');
                                thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 600}, function(){
  //анимация четвертого треугольника
                                  setTimeout(function(){
                                    jQuery('.zone_v4').addClass('transparent');
                                    fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 600}, function(){
                                    });
                                    fourthTriangleAnimation.play();
                                  }, 250)
                                });
                                thirdTriangleAnimation.play();
                              }, 250)
                            });
                            secondTriangleAnimation.play();
                          }, 250)
                        });
                        firstTriangleAnimation.play();
                      });
                      fourthTriangleAnimation.play();
                    }, 250)
                  });
                  thirdTriangleAnimation.play();
                }, 250)
              });
              secondTriangleAnimation.play();
            }, 250)
          });
          firstTriangleAnimation.play();
        }
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone').removeClass('transparent');
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v1_4');
          endNow()
        } else {
          v1_4();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v1_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('9%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v0, .zone_v2, .zone_d2, .zone_cl').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate(-'+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v0, .zone_v2, .zone_d2, .zone_cl, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v1_3');
          endNow()
        } else {
          v1_3();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 1"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    cur_animation_val = 0;
    rotateVal = 0;
    count_animation = 1;
    phaseOne = setInterval(function(){
      if (count_animation <= 344){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        jQuery('.zone_v5, .zone_d5, .zone_d6').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            transform: 'rotate('+rotateVal+'deg) scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
            zIndex: '1000'
        });
        jQuery('.zone_v-').css({
            color: 'transparent',
            borderColor: 'transparent',
            opacity: 0.8,
            borderWidth: '1px',
            paddingTop: '4px',
            background: '#fff url(/wp-content/themes/bcwish/img/vig_.png) center center/100% no-repeat',
            transform: 'scale(1.5)',
            zIndex: '1000'
        });
        jQuery('.zone_ring')
          .removeClass('hidden')
          .css({
            opacity: 0.8,
            transform: 'scale(1.5)',
            background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
            transform: 'rotate(-'+d12Val+'deg) scale(1.5)'
          });
        count_animation += 1;
        rotateVal += 1.5;
        if(count_animation <= 120){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 120 && count_animation <= 228){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.zone_ring').css('transform', 'rotate(-'+d12Val+'deg) scale(1.5)');
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
        } else if (count_animation >= 228 && count_animation <= 292){
            cur_animation_val -= 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else if (count_animation >= 292 && count_animation <= 344){
            cur_animation_val += 1.5;
            d12Val+= 3;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        } else {
            d12Val+= 3;
            cur_animation_val += 1.5;
            jQuery('.ring').css('transform', 'rotate('+cur_animation_val+'deg)');
            jQuery('.zone_ring').css('transform', 'rotate('+d12Val+'deg) scale(1.5)');
            jQuery('.zone_ring').css('background', '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat');
        }
      } else {
        clearInterval(phaseOne);
        count_animation = 1;
        jQuery('.zone_v5, .zone_d5, .zone_d6, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'v1_2');
          endNow()
        } else {
          v1_2();
          // console.log('continue');
        }
      }
    }, 250);
  }

// Если есть незавершенный протокол
  if (localStorage.getItem('paused')) {
    jQuery('.wizard_continue').removeClass('hidden');
    returned_img = localStorage.getItem('pausedPhoto');
    pausedStatus = true;
    jQuery('.main_arrow').addClass('main_arrow_combine');
    jQuery('.main_arrow_title').addClass('main_arrow_title_combine');
  }

  jQuery('.wizard_continue.btn-warning').on('click', function(event) {
    jQuery('.machine_screen, #intro').addClass('hidden');
    jQuery('.wizard_returned').attr('src', returned_img);
    jQuery('.wm_start').removeClass('unopacity');
    jQuery('.wm_start').removeAttr('style');
    jQuery('.wizard_to_protList, .wizard_play').fadeIn(500).removeClass('hidden');
    jQuery('.wizard_main_screen').fadeIn(500).removeClass('hidden').css('display', 'flex');
    jQuery('.wizard_heading').text('Перенесите зоны на фото и можно будет продолжить работу.');
  });

  
  checkPoints = function(){
    jQuery('.zone_movable').each(function() {
      if(parseFloat(jQuery(this).css('left')) < 480){
        pointsStatus = false;
        console.log('status '+' '+jQuery(this).text()+' '+jQuery(this).css('top')+' '+pointsStatus);
      }
    });
  }

  jQuery('.wizard_play').on('click', function(event) {
    checkPoints();
    if(pointsStatus == false){
      swal("Не все зоны перенесены!", "Перед началом процедуры необходимо перенести на фото все зоны.", "info");
      alertSound.play();
      pointsStatus = true;
    } else {
      if (pausedStatus == true) {
        // jQuery('.wizard_returned').attr('src', localStorage.getItem('pausedPhoto'));
        // console.log(localStorage.getItem('pausedPhoto'));
        protocolfromMemory = eval(localStorage.getItem('paused'));
        console.log(protocolfromMemory);
        protocolfromMemory();
        pausedStatus = false;
        jQuery(this).addClass('hidden');
        jQuery('.wizard_stop, .zone_ring').fadeIn(500).removeClass('hidden');
      } else {
        pausedStatus = false;
        jQuery(this).addClass('hidden');
        jQuery('.wizard_stop, .zone_ring').fadeIn(500).removeClass('hidden');
        jQuery('.wizard_stop').removeClass('wizard_stop_inProgress');
        var protocol = localStorage.getItem('cur_protocol');
        console.log(protocol);
        if (protocol == 'v1') {
          v1();
          jQuery('.status_title').text('Протокол V1');
        } else if (protocol == 'v2') {
          v2();
          jQuery('.status_title').text('Протокол V2-5');
        } else if (protocol == 'v3') {
          v3();
          jQuery('.status_title').text('Протокол V3-4');
        } else if (protocol == 'v4') {
          v4();
          jQuery('.status_title').text('Протокол V4-3');
        } else if (protocol == 'v5') {
          v5();
          jQuery('.status_title').text('Протокол V5-2');
        } else if (protocol == 'solis') {
          solis();
          jQuery('.status_title').text('Протокол Solis');
        } else if (protocol == 'drenag') {
          drenag();
          jQuery('.status_title').text('Дренажный протокол');
        } else if (protocol == 'universal') {
          universal();
          jQuery('.status_title').text('Универсальный протокол');
        } else if (protocol == 'visceral') {
          mmt();
          jQuery('.status_title').text('Висцеральный протокол');
        }
      }
      jQuery('.wizard_to_protList').addClass('prot_in_progress');
      localStorage.removeItem('paused');
      localStorage.removeItem('pausedPhoto');
      jQuery('.wizard_stop').removeClass('wizard_stop_inProgress');
    }
  });


  // STOP
  function hideNote() {
    jQuery('.wizard_stop').popover('hide');
  }

  jQuery('.wizard_stop') .on('click', function(event) {
    jQuery(this).addClass('wizard_stop_inProgress');
    jQuery('.header-title').text('Программа останавливается');
    // endStatus = true;
    jQuery('.wizard_stop').popover('show');
    setTimeout(hideNote, 5000);
    localStorage.setItem('pausedPhoto', jQuery('.wizard_returned').attr('src'));
    pausedStatus = true;
    console.log('pausedStatus = true');
  });

});
