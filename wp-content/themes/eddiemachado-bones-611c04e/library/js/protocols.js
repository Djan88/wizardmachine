    var count_animation = 1,
        cur_animation_val = 0,
        curPhase,
        v2;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        curPhase = setInterval(function(){
            if (count_animation <= 120){
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

    }
