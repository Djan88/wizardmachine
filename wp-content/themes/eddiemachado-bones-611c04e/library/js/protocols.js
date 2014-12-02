    var count_animation = 1,
        cur_animation_val = 0,
        curPhase,
        v2;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        curPhase = setInterval(function(){
            if (count_animation <= 30){
                cur_animation_val += 6;
                jQuery('#draggableClean').css('transform', 'rotate(-'+cur_animation_val+'deg)');
                jQuery('#draggable2, #draggableS2, #draggableS2_1').css('background', 'red');
                count_animation += 1;
            } else {
                clearInterval(curPhase);
                count_animation = 1;
                jQuery('#draggable2, #draggableS2, #draggableS2_1').css('background', 'transparent');
            }
        }, 1000);
    //фаза 2
        cur_animation_val = 0;
        count_animation = 1;
        jQuery('#draggableClean_2').css('left', jQuery('#draggableS2').css('left')+50+'px');
        jQuery('#draggableClean_3').css('left', jQuery('#draggableS2_1').css('left')+50+'px');
        jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
        curPhase = setInterval(function(){
            if (count_animation <= 60){
                cur_animation_val += 6;
                jQuery('#draggableClean').css('transform', 'rotate(-'+cur_animation_val+'deg)');
                jQuery('#draggableClean_2, #draggableClean_2').css('background', 'red');
                count_animation += 1;
            } else {
                clearInterval(curPhase);
                count_animation = 1;
                jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                jQuery('#draggableClean_2, #draggableClean_2').css('background', 'transparent');
            }
        }, 1000);

    }
