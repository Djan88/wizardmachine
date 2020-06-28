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


  endNowEstate = function(){
    reloadTime = 0;
    reloadTime1 = 0;
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
        jQuery('.estate_start').removeClass('hidden');
        jQuery('.estate_pause').addClass('hidden');
      }
    })
  }

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

 

  estate_1_1 = function(){
    jQuery('.wizard_percent').text('0%');
    reloadTime = 0;
    count_animation = 1;
    console.log('start_estate');
    jQuery('zone_wc').css({
        color: 'transparent',
        borderColor: 'transparent',
        opacity: 0.8,
        borderWidth: '1px',
        transform: 'rotate(0deg) scale(1.5)',
        zIndex: '1000'
    });
    jQuery('zone_wc').addClass('rot_estate_super').css({
      background: '#fff url(/wp-content/themes/bcwish/img/lovushka.png) center center/100% no-repeat',
    });

    phaseOne = setInterval(function(){
      if (count_animation <= 720){
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
        jQuery('zone_wc').css({
            background: '#fff',
            color: '#19b55f',
            borderColor: '#19b55f',
            transform: 'rotate(0deg) scale(1)',
            zIndex: '3'
        });
        jQuery('.zone_wc').removeClass('rot_estate_super');
        sound.stop();
        if (pausedStatus == true) {
          localStorage.setItem('paused', 'estate_1_2');
          endNowEstate();
        } else {
          // estate_1_2();
          console.log('continue');
        } 
      }
    }, 250);
  }


  jQuery('.estate_start').on('click', function(event) {
    swal({
      title: "Проверьте все ли зоны Вы отметили",
      text: "Отметьте все внутренние углы, двери и сан.узлы.",
      type: "info",
      showCancelButton: true,
      confirmButtonClass: "btn-success",
      cancelButtonClass: "btn-warning",
      cancelButtonText: "Проверить",
      confirmButtonText: "Старт",
      closeOnConfirm: false
    },
    function(isConfirm) {
      if (isConfirm) {
        swal.close();
        estate_1_1();
        jQuery('.estate_start').addClass('hidden');
        jQuery('.estate_pause').removeClass('hidden');
        jQuery('.zone_estate.zone_default').addClass('hidden');
        jQuery('.wizard_heading').text('Протокол выполняется');
      }
    }) 
  });
});
