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
    jQuery('.ring').removeClass('in_progress');

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
        jQuery('.wizard_play, .wizard_starter_alt').fadeIn(500).removeClass('hidden');
      }
    })
  }

  onEnd = function(){
    jQuery('.ring').removeClass('in_progress');
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
            top: +knife+15+'px',
            width: knifeDateDiff*2+'px'
        });
        knifeDateOld = knifeDate;
      // }
    }
  });



  v4_codesAlt_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('12%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{scale: 1.5}, {duration: 90, ease: "none", rotation: 360, scale: 1.5});
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v4_codesAlt_4');
          endNow()
        } else {
          v4_codesAlt_4();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v4_codesAlt_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('6%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_s3, .zone_s4, .zone_v4').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_s3, .zone_s4, .zone_v4').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s3, .zone_s4, .zone_v4').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s3, .zone_s4, .zone_v4').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v4_codesAlt_3');
          endNow()
        } else {
          v4_codesAlt_3();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v4_codesAlt = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 4 — V 3"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_cl, .zone_v1, .zone_v4').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    gsap.fromTo(".zone_cl",{scale: 1.5}, {duration: 90, ease: "none", rotation: -360, scale: 1.5});

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        count_animation += 1;
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
          localStorage.setItem('paused', 'v4_codesAlt_2');
          endNow()
        } else {
          v4_codesAlt_2();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  mmt_codesAlt_9 = function(){
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

  mmt_codesAlt_7 = function(){
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
                      localStorage.setItem('paused', 'mmt_codesAlt_8');
                      endNow()
                    } else {
                      mmt_codesAlt_8();
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

  mmt_codesAlt_6 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('75%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_v1, .zone_d3').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})
                  .fromTo('.zone_ring',{rotation: -240}, {duration: 60, ease: "none", rotation: -720})
                  .fromTo('.zone_ring',{rotation: -720}, {duration: 30, ease: "none", rotation: -480})

    var zone_superdisfunction_gsap = gsap.timeline();
    zone_superdisfunction_gsap.fromTo('.zone_v1, .zone_d3',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 0, scale: 1.5})
                  .fromTo('.zone_v1, .zone_d3',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 360, scale: 1.5})
                  .fromTo('.zone_v1, .zone_d3',{rotation: 360, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1.5})

    phaseOne = setInterval(function(){
      if (count_animation <= 720){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_v1, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_v1, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 440) {
          if (count_animation == 240) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          } else if (count_animation == 360) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'});
          }
          jQuery('.zone_v1, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat'});
        }  else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_v1, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 560) {
          jQuery('.zone_v1, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
          if (count_animation == 600) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          }
        }
        count_animation += 1;
        console.log(count_animation);
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
          localStorage.setItem('paused', 'mmt_codesAlt_7');
          endNow()
        } else {
          mmt_codesAlt_7();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  mmt_codesAlt_5 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('60%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_d2, .zone_d3, .zone_d5').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})
                  .fromTo('.zone_ring',{rotation: -240}, {duration: 60, ease: "none", rotation: -720})
                  .fromTo('.zone_ring',{rotation: -720}, {duration: 30, ease: "none", rotation: -480})

    var zone_superdisfunction_gsap = gsap.timeline();
    zone_superdisfunction_gsap.fromTo('.zone_d2, .zone_d3, .zone_d5',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 0, scale: 1.5})
                  .fromTo('.zone_d2, .zone_d3, .zone_d5',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 360, scale: 1.5})
                  .fromTo('.zone_d2, .zone_d3, .zone_d5',{rotation: 360, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1.5})

    phaseOne = setInterval(function(){
      if (count_animation <= 720){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 440) {
          if (count_animation == 240) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          } else if (count_animation == 360) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'});
          }
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat'});
        }  else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 560) {
          jQuery('.zone_d2, .zone_d3, .zone_d5').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
          if (count_animation == 600) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          }
        }
        count_animation += 1;
        console.log(count_animation);
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
          localStorage.setItem('paused', 'mmt_codesAlt_6');
          endNow()
        } else {
          mmt_codesAlt_6();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  mmt_codesAlt_4 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('45%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_d3, .zone_v4, .zone_s4').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})
                  .fromTo('.zone_ring',{rotation: -240}, {duration: 60, ease: "none", rotation: -720})
                  .fromTo('.zone_ring',{rotation: -720}, {duration: 30, ease: "none", rotation: -480})

    var zone_superdisfunction_gsap = gsap.timeline();
    zone_superdisfunction_gsap.fromTo('.zone_d3, .zone_v4, .zone_s4',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 0, scale: 1.5})
                  .fromTo('.zone_d3, .zone_v4, .zone_s4',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 360, scale: 1.5})
                  .fromTo('.zone_d3, .zone_v4, .zone_s4',{rotation: 360, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1.5})

    phaseOne = setInterval(function(){
      if (count_animation <= 720){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 440) {
          if (count_animation == 240) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          } else if (count_animation == 360) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'});
          }
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat'});
        }  else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 560) {
          jQuery('.zone_d3, .zone_v4, .zone_s4').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
          if (count_animation == 600) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          }
        }
        count_animation += 1;
        console.log(count_animation);
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
          localStorage.setItem('paused', 'mmt_codesAlt_5');
          endNow()
        } else {
          mmt_codesAlt_5();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  mmt_codesAlt_3 = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('30%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_s3, .zone_d3').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})
                  .fromTo('.zone_ring',{rotation: -240}, {duration: 60, ease: "none", rotation: -720})
                  .fromTo('.zone_ring',{rotation: -720}, {duration: 30, ease: "none", rotation: -480})

    var zone_superdisfunction_gsap = gsap.timeline();
    zone_superdisfunction_gsap.fromTo('.zone_s3, .zone_d3',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 0, scale: 1.5})
                  .fromTo('.zone_s3, .zone_d3',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 360, scale: 1.5})
                  .fromTo('.zone_s3, .zone_d3',{rotation: 360, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1.5})

    phaseOne = setInterval(function(){
      if (count_animation <= 720){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_s3, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s3, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 440) {
          if (count_animation == 240) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          } else if (count_animation == 360) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'});
          }
          jQuery('.zone_s3, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat'});
        }  else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_s3, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 560) {
          jQuery('.zone_s3, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
          if (count_animation == 600) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          }
        }
        count_animation += 1;
        console.log(count_animation);
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
          localStorage.setItem('paused', 'mmt_codesAlt_4');
          endNow()
        } else {
          mmt_codesAlt_4();
          // console.log('continue');
        } 
      }
    }, 250);
  }

mmt_codesAlt_2 = function(){
  jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
  jQuery('.wizard_percent').text('15%');
  reloadTime = 0;
  cur_animation_val = 0;
  count_animation = 1;
  jQuery('.zone_s2_, .zone_d3').css({
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      transform: 'scale(1.5)',
      zIndex: '1000'
  });
  jQuery('.zone_ring')
    .removeClass('hidden')
    .css({
      opacity: 0.8,
      transform: 'scale(1.5)',
      background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
    });
  var zone_gsap = gsap.timeline();
  zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
           .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
           .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
           .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
           .fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
           .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
           .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
           .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})

  var zone_ring_gsap = gsap.timeline();
  zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})
                .fromTo('.zone_ring',{rotation: -240}, {duration: 60, ease: "none", rotation: -720})
                .fromTo('.zone_ring',{rotation: -720}, {duration: 30, ease: "none", rotation: -480})

  var zone_superdisfunction_gsap = gsap.timeline();
  zone_superdisfunction_gsap.fromTo('.zone_s2_, .zone_d3',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 0, scale: 1.5})
                .fromTo('.zone_s2_, .zone_d3',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 360, scale: 1.5})
                .fromTo('.zone_s2_, .zone_d3',{rotation: 360, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1.5})

  phaseOne = setInterval(function(){
    if (count_animation <= 720){
      if (reloadTime == 0){                                                                       //1
          sound.stop();
          reloadSound.play();
      } else if (reloadTime == 2) {
          sound.play();
      };
      reloadTime += 1;
      if (count_animation > 0 && count_animation <= 120) {
        jQuery('.zone_s2_, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'});
      } else if (count_animation > 120 && count_animation <= 220) {
        jQuery('.zone_s2_, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'});
      } else if (count_animation > 220 && count_animation <= 440) {
        if (count_animation == 240) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        } else if (count_animation == 360) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'});
        }
        jQuery('.zone_s2_, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat'});
      }  else if (count_animation > 440 && count_animation <= 560) {
        jQuery('.zone_s2_, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
      } else if (count_animation > 560) {
        jQuery('.zone_s2_, .zone_d3').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        if (count_animation == 600) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
      }
      count_animation += 1;
      console.log(count_animation);
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
        localStorage.setItem('paused', 'mmt_codesAlt_3');
        endNow()
      } else {
        mmt_codesAlt_3();
        // console.log('continue');
      } 
    }
  }, 250);
}

  mmt_codesAlt = function(){
    jQuery('.wizard_heading').text('Выполняется "Висцеральный протокол"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_d2_, .zone_s2, .zone_cl').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    jQuery('.zone_cl').css({
      background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
    });
    gsap.fromTo(".zone_cl",{scale: 1.5}, {duration: 180, ease: "none", rotation: -720, scale: 1.5});

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})
                  .fromTo('.zone_ring',{rotation: -240}, {duration: 60, ease: "none", rotation: -720})
                  .fromTo('.zone_ring',{rotation: -720}, {duration: 30, ease: "none", rotation: -480})

    var zone_superdisfunction_gsap = gsap.timeline();
    zone_superdisfunction_gsap.fromTo('.zone_d2_, .zone_s2',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 0, scale: 1.5})
                  .fromTo('.zone_d2_, .zone_s2',{rotation: 0, scale: 1.5}, {duration: 55, ease: "none", rotation: 360, scale: 1.5})
                  .fromTo('.zone_d2_, .zone_s2',{rotation: 360, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1.5})

    phaseOne = setInterval(function(){
      if (count_animation <= 720){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        if (count_animation > 0 && count_animation <= 120) {
          jQuery('.zone_d2_, .zone_s2').css({background: '#fff url(/wp-content/themes/bcwish/img/veter.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2_, .zone_s2').css({background: '#fff url(/wp-content/themes/bcwish/img/vaterfall.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 440) {
          if (count_animation == 240) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          } else if (count_animation == 360) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'});
          }
          jQuery('.zone_d2_, .zone_s2').css({background: '#fff url(/wp-content/themes/bcwish/img/superdisfunction.png) center center/100% no-repeat'});
        }  else if (count_animation > 440 && count_animation <= 560) {
          jQuery('.zone_d2_, .zone_s2').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 560) {
          jQuery('.zone_d2_, .zone_s2').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
          if (count_animation == 600) {
            jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
          }
        }
        count_animation += 1;
        console.log(count_animation);
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
          localStorage.setItem('paused', 'mmt_codesAlt_2');
          endNow()
        } else {
          mmt_codesAlt_2();
          // console.log('continue');
        } 
      }
    }, 250);
  }

    solis_codesAlt_9 = function(){
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

    solis_codesAlt_8 = function(){
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
                        localStorage.setItem('paused', 'solis_codesAlt_9');
                        endNow()
                      } else {
                        solis_codesAlt_9();
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

    solis_codesAlt_7 = function(){
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
            localStorage.setItem('paused', 'solis_codesAlt_8');
            endNow()
          } else {
            solis_codesAlt_8();
            // console.log('continue');
          }
        }
      }, 250);
    }

    solis_codesAlt_6 = function(){
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
            localStorage.setItem('paused', 'solis_codesAlt_7');
            endNow()
          } else {
            solis_codesAlt_7();
            // console.log('continue');
          }
        }
      }, 250);
    }

    solis_codesAlt_5 = function(){
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
            localStorage.setItem('paused', 'solis_codesAlt_6');
            endNow()
          } else {
            solis_codesAlt_6();
            // console.log('continue');
          }
        }
      }, 250);
    }

    solis_codesAlt_4 = function(){
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
            localStorage.setItem('paused', 'solis_codesAlt_5');
            endNow()
          } else {
            solis_codesAlt_5();
            // console.log('continue');
          }
        }
      }, 250);
    }

  solis_codesAlt_3 = function(){
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
          localStorage.setItem('paused', 'solis_codesAlt_4');
          endNow()
        } else {
          solis_codesAlt_4();
          // console.log('continue');
        }
      }
    }, 250);
  }

  solis_codesAlt_2_4 = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('26%');
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_codesAlt_3');
            endNow();
          } else {
            solis_codesAlt_3();

          } 
        }
    }, 1000);
  }

  solis_codesAlt_2_3 = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('20%');
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_codesAlt_2_4');
            endNow();
          } else {
            solis_codesAlt_2_4();
          } 
        }
    }, 1000);
  } 

  solis_codesAlt_2_2 = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('16%');
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_codesAlt_2_3');
            endNow();
          } else {
            solis_codesAlt_2_3();
          } 
        }
    }, 1000);
  } 

  solis_codesAlt_2_1 = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('12%');
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'solis_codesAlt_2_2');
            endNow();
          } else {
            solis_codesAlt_2_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  solis_codesAlt = function(){
    jQuery('.wizard_heading').text('Выполняется "Solis"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.wizard_main_screen').addClass('wizard_main_screen_solis');

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

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
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
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'solis_codesAlt_2_1');
          endNow()
        } else {
          solis_codesAlt_2_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  v5_codesAlt_14 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('93%');
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
        transform: 'scale(1.5)',
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
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
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

  v5_codesAlt_13 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('87%');
    reloadTime = 0;
    cur_animation_val = 0;
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
                      localStorage.setItem('paused', 'v5_codesAlt_14');
                      endNow()
                    } else {
                      v5_codesAlt_14();
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

  v5_codesAlt_12_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('84%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_13');
            endNow();
          } else {
            v5_codesAlt_13();

          } 
        }
    }, 1000);
  }

  v5_codesAlt_12_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('81%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_12_4');
            endNow();
          } else {
            v5_codesAlt_12_4();
          } 
        }
    }, 1000);
  } 

  v5_codesAlt_12_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('78%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_12_3');
            endNow();
          } else {
            v5_codesAlt_12_3();
          } 
        }
    }, 1000);
  } 

  v5_codesAlt_12_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('75%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_d2, .zone_s2_, .zone_d5, .zone_d6',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          jQuery('.zone_d2, .zone_s2_, .zone_d5, .zone_d6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_12_2');
            endNow();
          } else {
            v5_codesAlt_12_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  v5_codesAlt_11_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('72%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_12_1');
            endNow();
          } else {
            v5_codesAlt_12_1();

          } 
        }
    }, 1000);
  }

  v5_codesAlt_11_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('69%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_11_4');
            endNow();
          } else {
            v5_codesAlt_11_4();
          } 
        }
    }, 1000);
  } 

  v5_codesAlt_11_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('66%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_11_3');
            endNow();
          } else {
            v5_codesAlt_11_3();
          } 
        }
    }, 1000);
  } 

  v5_codesAlt_11_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('63%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_s2, .zone_v5, .zone_s5, .zone_s6',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_11_2');
            endNow();
          } else {
            v5_codesAlt_11_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  v5_codesAlt_10_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('60%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v1, .zone_v5, .zone_v-').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_11_1');
            endNow();
          } else {
            v5_codesAlt_11_1();

          } 
        }
    }, 1000);
  }

  v5_codesAlt_10_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('57%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v1, .zone_v5, .zone_v-').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_10_4');
            endNow();
          } else {
            v5_codesAlt_10_4();
          } 
        }
    }, 1000);
  } 

  v5_codesAlt_10_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('54%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v1, .zone_v5, .zone_v-').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_left.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_10_3');
            endNow();
          } else {
            v5_codesAlt_10_3();
          } 
        }
    }, 1000);
  } 

  v5_codesAlt_10_1 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('51%');
    reloadTime = 0;
    reloadTime1 = 0;
    d12Val = 0;
    rotateVal = 0;
    jQuery('.ring').addClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    cur_animation_val = 10;
    count_animation = 1;
    jQuery('.zone_v1, .zone_v5, .zone_v-').css({
      background: '#fff url(/wp-content/themes/bcwish/img/mo_right.png) center center/100% no-repeat',
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v1, .zone_v5, .zone_v-',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          jQuery('.zone_v1, .zone_v5, .zone_v-').css({
            background: '#fff',
            color: '#413e66',
            borderColor: '#413e66',
            transform: 'rotate(-'+0+'deg) scale(1)',
            paddingTop: '2px',
            zIndex: '2'
          });
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'v5_codesAlt_10_2');
            endNow();
          } else {
            v5_codesAlt_10_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  v5_codesAlt_9 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('48%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_10_1');
          endNow()
        } else {
          v5_codesAlt_10_1();
        } 
      }
    }, 250);
  }

  v5_codesAlt_8 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('42%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_9');
          endNow()
        } else {
          v5_codesAlt_9();
        } 
      }
    }, 250);
  }

  v5_codesAlt_7 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('36%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_8');
          endNow()
        } else {
          v5_codesAlt_8();
        } 
      }
    }, 250);
  }

  v5_codesAlt_6 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('30%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_d2, .zone_s2_, .zone_v5, .zone_d5, .zone_d6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_7');
          endNow()
        } else {
          v5_codesAlt_7();
        } 
      }
    }, 250);
  }

  v5_codesAlt_5 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('24%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_6');
          endNow()
        } else {
          v5_codesAlt_6();
        } 
      }
    }, 250);
  }

  v5_codesAlt_4 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('18%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_5');
          endNow()
        } else {
          v5_codesAlt_5();
        } 
      }
    }, 250);
  }

  v5_codesAlt_3 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('12%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_4');
          endNow()
        } else {
          v5_codesAlt_4();
        } 
      }
    }, 250);
  }

  v5_codesAlt_2 = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('6%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.ring').removeClass('hidden');
    jQuery('.ring, .zone_ring').css('transform', 'rotate(0deg)');
    jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        paddingTop: '4px',
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/disfunction.png) center center/100% no-repeat'});
        } else if (count_animation > 120 && count_animation <= 220) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/travma.png) center center/100% no-repeat'});
        } else if (count_animation > 220 && count_animation <= 240) {
          jQuery('.zone_s2, .zone_v5, .zone_s5, .zone_s6').css({background: '#fff url(/wp-content/themes/bcwish/img/povregdenie_demona.png) center center/100% no-repeat'});
        } else if (count_animation > 220) {
          jQuery('.zone_ring').css({background: '#fff url(/wp-content/themes/bcwish/img/daemon.png) center center/100% no-repeat'});
        }
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_3');
          endNow()
        } else {
          v5_codesAlt_3();
        } 
      }
    }, 250);
  }


  v5_codesAlt = function(){
    jQuery('.wizard_heading').text('Выполняется протокол "V 5 — V 2"');
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    cur_animation_val = 0;
    count_animation = 1;
    jQuery('.zone_v5, .zone_s5, .zone_s6').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
        paddingTop: '4px',
        transform: 'scale(1.5)',
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
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    gsap.fromTo(".zone_v5, .zone_s5, .zone_s6",{scale: 1.5}, {duration: 90, ease: "none", rotation: -360, scale: 1.5});

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

    phaseOne = setInterval(function(){
      if (count_animation <= 360){
        if (reloadTime == 0){                                                                       //1
            sound.stop();
            reloadSound.play();
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
        count_animation += 1;
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
          localStorage.setItem('paused', 'v5_codesAlt_2');
          endNow()
        } else {
          v5_codesAlt_2();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  universal_codesAlt_9 = function(){
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
        transform: 'scale(1.5)',
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
        } else if (reloadTime == 2) {
            sound.play();
        };
        reloadTime += 1;
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

  universal_codesAlt_8_4 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_9');
            endNow();
          } else {
            universal_codesAlt_9();

          } 
        }
    }, 1000);
  }

  universal_codesAlt_8_3 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_8_4');
            endNow();
          } else {
            universal_codesAlt_8_4();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_8_2 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_8_3');
            endNow();
          } else {
            universal_codesAlt_8_3();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_8_1 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v5, .zone_s6, .zone_s5, .zone_s2, .zone_v1',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_8_2');
            endNow();
          } else {
            universal_codesAlt_8_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_codesAlt_7 = function(){
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
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
        } else if (count_animation > 220) {
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
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_codesAlt_8_1');
          endNow()
        } else {
          universal_codesAlt_8_1();
        } 
      }
    }, 250);
  }

  universal_codesAlt_6_4 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_7');
            endNow();
          } else {
            universal_codesAlt_7();

          } 
        }
    }, 1000);
  }

  universal_codesAlt_6_3 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_6_4');
            endNow();
          } else {
            universal_codesAlt_6_4();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_6_2 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_6_3');
            endNow();
          } else {
            universal_codesAlt_6_3();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_6_1 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v5, .zone_s2_, .zone_d2, .zone_d5, .zone_d6',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_6_2');
            endNow();
          } else {
            universal_codesAlt_6_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_codesAlt_5 = function(){
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
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
        } else if (count_animation > 220) {
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
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_codesAlt_6_1');
          endNow()
        } else {
          universal_codesAlt_6_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  universal_codesAlt_4_4 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s3, .zone_v4',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_5');
            endNow();
          } else {
            universal_codesAlt_5();

          } 
        }
    }, 1000);
  }

  universal_codesAlt_4_3 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s3, .zone_v4',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_4_4');
            endNow();
          } else {
            universal_codesAlt_4_4();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_4_2 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s3, .zone_v4',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_4_3');
            endNow();
          } else {
            universal_codesAlt_4_3();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_4_1 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_s3, .zone_v4',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_s3, .zone_v4',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_4_2');
            endNow();
          } else {
            universal_codesAlt_4_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_codesAlt_3 = function(){
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
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
        } else if (count_animation > 220) {
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
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_codesAlt_4_1');
          endNow()
        } else {
          universal_codesAlt_4_1();
          // console.log('continue');
        } 
      }
    }, 250);
  }

  universal_codesAlt_2_4 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: -320, scale: 1.5}, {duration: 40, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: -380, scale: 1.5}, {duration: 17, ease: "none", rotation: -380, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: -380, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_3');
            endNow();
          } else {
            universal_codesAlt_3();

          } 
        }
    }, 1000);
  }

  universal_codesAlt_2_3 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: 270, scale: 1.5}, {duration: 40, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: 330, scale: 1.5}, {duration: 17, ease: "none", rotation: 330, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: 330, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_2_4');
            endNow();
          } else {
            universal_codesAlt_2_4();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_2_2 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: 20, scale: 1.5}, {duration: 40, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: 80, scale: 1.5}, {duration: 17, ease: "none", rotation: 80, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: 80, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
    
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_2_3');
            endNow();
          } else {
            universal_codesAlt_2_3();
          } 
        }
    }, 1000);
  } 

  universal_codesAlt_2_1 = function(){
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
      transform: 'scale(1.5)',
      color: 'transparent',
      borderColor: 'transparent',
      opacity: 0.8,
      borderWidth: '1px',
      paddingTop: '4px',
      zIndex: '1000'
    });
    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: -10, scale: 1.5}, {duration: 40, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: -70, scale: 1.5}, {duration: 17, ease: "none", rotation: -70, scale: 1.5})
             .fromTo('.zone_v2, .zone_d2_, .zone_d3, .zone_d4',{rotation: -70, scale: 1.5}, {duration: 1, ease: "none", rotation: 0, scale: 1})
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
          if (pausedStatus == true) {
            localStorage.setItem('paused', 'universal_codesAlt_2_2');
            endNow();
          } else {
            universal_codesAlt_2_2();
            // console.log('continue');
          } 
        }
    }, 1000);
  }  

  universal_codesAlt = function(){
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
        transform: 'scale(1.5)',
        zIndex: '1000'
    });
    jQuery('.zone_ring')
      .removeClass('hidden')
      .css({
        opacity: 0.8,
        transform: 'scale(1.5)',
        background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat'
      });
    jQuery('.zone_cl').css({
      background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
    });
    gsap.fromTo(".zone_cl",{scale: 1.5}, {duration: 90, ease: "none", rotation: -360, scale: 1.5});

    var zone_gsap = gsap.timeline();
    zone_gsap.fromTo('.ring',{rotation: 0}, {duration: 30, ease: "none", rotation: 180})
             .fromTo('.ring',{rotation: 180}, {duration: 30, ease: "none", rotation: 0})
             .fromTo('.ring',{rotation: 0}, {duration: 15, ease: "none", rotation: -90})
             .fromTo('.ring',{rotation: -90}, {duration: 15, ease: "none", rotation: 0})
             .to('.zone_cl', {duration: 11, ease: "none", scale: 1})

    var zone_ring_gsap = gsap.timeline();
    zone_ring_gsap.fromTo('.zone_ring',{rotation: 0}, {duration: 60, ease: "none", rotation: -480})
                  .fromTo('.zone_ring',{rotation: -480}, {duration: 30, ease: "none", rotation: -240})

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
        } else if (count_animation > 220) {
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
            transform: 'scale(1)',
            paddingTop: '2px',
            zIndex: '2'
        });
        jQuery('.ring').css('transform', 'rotate(0deg)');
        jQuery('.zone_ring').css('transform', 'rotate(0deg)');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'universal_codesAlt_2_1');
          endNow()
        } else {
          universal_codesAlt_2_1();
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
    jQuery('.wizard_to_protList, .wizard_play, .wizard_starter_alt').fadeIn(500).removeClass('hidden');
    jQuery('.wizard_main_screen').fadeIn(500).removeClass('hidden').css('display', 'flex');
    jQuery('.wizard_heading').text('Перенесите зоны на фото и можно будет продолжить работу.');
  });

  
  checkPoints = function(){
    jQuery('.zone_movable').each(function() {
      if(parseFloat(jQuery(this).css('left')) < 480){
        pointsStatus = false;
        // console.log('status '+' '+jQuery(this).text()+' '+jQuery(this).css('top')+' '+pointsStatus);
      }
      if (parseFloat(jQuery('.ring').css('left')) < 380) {
        pointsStatus = false;
      }
    });
  }

  jQuery('.wizard_play, .wizard_starter_alt').on('click', function(event) {
    checkPoints();
    if(pointsStatus == false){
      swal("Не все зоны перенесены!", "Перед началом процедуры необходимо перенести на фото калибровочное кольцо и все зоны.", "info");
      alert_altSound.play();
      pointsStatus = true;
    } else {
      if (pausedStatus == true) {
        // jQuery('.wizard_returned').attr('src', localStorage.getItem('pausedPhoto'));
        // console.log(localStorage.getItem('pausedPhoto'));
        protocolfromMemory = eval(localStorage.getItem('paused'));
        protocolfromMemory();
      } else {
        jQuery('.wizard_stop').removeClass('wizard_stop_inProgress');
        var protocol = localStorage.getItem('cur_protocol');
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
      pausedStatus = false;
      console.log('ding');
      jQuery('.wizard_play, .wizard_starter_alt').addClass('hidden');
      jQuery('.wizard_stop, .zone_ring').fadeIn(500).removeClass('hidden');
      jQuery('.wizard_to_protList').addClass('prot_in_progress');
      jQuery('.ring').addClass('in_progress');
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
    // console.log('pausedStatus = true');
  });

});
