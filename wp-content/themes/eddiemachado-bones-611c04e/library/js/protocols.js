    var count_animation = 1,
        cur_animation_val = 0,
        phaseOne,
        phaseTwo,
        v2;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        phaseOne = setInterval(function(){
            if (count_animation <= 30){ //120
                cur_animation_val += 6;
                jQuery('#draggableClean').css({
                    transform: 'rotate(-'+cur_animation_val+'deg)',
                    background: 'url(../images/lovec.png) 0 0/100% no-repeat'
                });
                jQuery('#draggable2, #draggableS2, #draggableS2_1').css('background', 'red');
                count_animation += 1;
            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('#draggable2, #draggableS2, #draggableS2_1, #draggableClean').css('background', 'transparent');
    //фаза 2
                cur_animation_val = 0;
                jQuery('#draggableClean_2').css({
                        left: parseFloat(jQuery('#draggableS2').css('left'))+70+'px',
                        top: parseFloat(jQuery('#draggableS2').css('top'))-335+'px'
                });
                jQuery('#draggableClean_3').css({
                        left: parseFloat(jQuery('#draggableS2_1').css('left'))+70+'px',
                        top: parseFloat(jQuery('#draggableS2_1').css('top'))-335+'px'
                });
                jQuery('#draggableClean_2, #draggableClean_3').css('background', 'url(../images/lovec.png) 0 0/100% no-repeat');
                jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
                phaseTwo = setInterval(function(){
                    if (count_animation <= 30){ //120
                        cur_animation_val += 6;
                        jQuery('#draggableClean_2, #draggableClean_3').css('transform', 'rotate(-'+cur_animation_val+'deg)');
                        count_animation += 1;
                    } else {
                        clearInterval(phaseTwo);
                        count_animation = 1;
                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                        jQuery('#draggableClean_2, #draggableClean_3').css('background', 'transparent');
                    }
                }, 1000);
            }
        }, 1000);
    }
