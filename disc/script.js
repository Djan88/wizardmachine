jQuery(document).ready(function() {
  var valueNow,
      valueNow_,
      highlighter,
      tickSound = new buzz.sound( "seif", {
          formats: [ "ogg", "mp3" ]
      });
  $("#handle1").roundSlider({
    min: 0,
    max: 120000,
    step: 1000,
    value: 0,
    radius: 200,
    sliderType: "min-range",
    editableTooltip: false,
    handleSize: 0,
    tooltipFormat: "changeTooltip"
  });
  highlighter = function(){
    tickSound.play();
    console.log(valueNow_);
    jQuery('.elem_pos').each(function(index, el) {
      jQuery(this).removeClass('elem_pos_active')
    });
    if (valueNow == 'z-index: 8; transform: rotate(0deg);' || valueNow == 'z-index: 8; transform: rotate(120deg);' || valueNow == 'z-index: 8; transform: rotate(240deg);' || valueNow == 'z-index: 8; transform: rotate(360deg);') {
      jQuery('.elem_pos_d').each(function(index, el) {
        jQuery(this).addClass('elem_pos_active');
      });
    } else if (valueNow == 'z-index: 8; transform: rotate(30deg);' || valueNow == 'z-index: 8; transform: rotate(150deg);' || valueNow == 'z-index: 8; transform: rotate(270deg);') {
      jQuery('.elem_pos_t').each(function(index, el) {
        jQuery(this).addClass('elem_pos_active');
      });
    }  else if (valueNow == 'z-index: 8; transform: rotate(60deg);' || valueNow == 'z-index: 8; transform: rotate(180deg);' || valueNow == 'z-index: 8; transform: rotate(300deg);') {
      jQuery('.elem_pos_r').each(function(index, el) {
        jQuery(this).addClass('elem_pos_active');
      });
    }   else if (valueNow == 'z-index: 8; transform: rotate(90deg);' || valueNow == 'z-index: 8; transform: rotate(210deg);' || valueNow == 'z-index: 8; transform: rotate(330deg);') {
      jQuery('.elem_pos_s').each(function(index, el) {
        jQuery(this).addClass('elem_pos_active');
      });
    } 
  }
  $("#handle1").on("drag", function (e) {
      valueNow = jQuery('.rs-bar').attr('style');
      highlighter();
  })
});
