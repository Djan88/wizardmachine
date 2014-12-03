    var count_animation = 1,
        cur_animation_val = 0,
        phaseOne,
        phaseTwo,
        phaseThree,
        v2;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        phaseOne = setInterval(function(){
            if (count_animation <= 10){ //120
                cur_animation_val += 6;
                jQuery('#draggableClean').css({
                    transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                    background: 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                });
                jQuery('#draggable2, #draggableS2, #draggableS2_1').css('background', 'red');
                count_animation += 1;
            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('#draggable2, #draggableS2, #draggableS2_1, #draggableClean').css({
                    background: 'transparent',
                    transform: 'scale(1)'
                });
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
                jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat');
                jQuery('#draggableS1').css('color', 'transparent');
                jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
                phaseTwo = setInterval(function(){
                    if (count_animation <= 10){ //120
                        cur_animation_val += 6;
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                        count_animation += 1;
                    } else {
                        clearInterval(phaseTwo);
                        count_animation = 1;
                        jQuery('#draggableS1').css('color', 'red');
                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css({
                            background: 'transparent',
                            transform: 'rotate(0deg) scale(1)'
                        });
    //фаза 3
                        cur_animation_val = 0;
                        jQuery('#draggableClean_2').css({
                            left: parseFloat(jQuery('#draggableS4').css('left'))+70+'px',
                            top: parseFloat(jQuery('#draggableS4').css('top'))-250+'px',
                            background: 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                        });
                        jQuery('#draggableClean_2').removeClass('inopaciti');
                        phaseThree = setInterval(function(){
                            if (count_animation <= 10){ //120
                                cur_animation_val += 6;
                                jQuery('#draggableClean_2').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                                jQuery('#draggableS4, #draggable4').css('background', 'red');
                                if (count_animation >= 5 && count_animation <= 10){ //60
                                    jQuery('#draggableS4, #draggable4').css('background', 'red');
                                }
                                count_animation += 1;
                            } else {
                                clearInterval(phaseThree);
                                count_animation = 1;
                                jQuery('#draggableClean_2').addClass('inopaciti');
                                jQuery('#draggableClean_2').css({
                                    background: 'transparent',
                                    transform: 'rotate(0deg) scale(1)'
                                });
                                jQuery('#draggableS4, #draggable4').css('background', 'transparent');
    //фаза 4
                                cur_animation_val = 0;
                                jQuery('#draggableClean_2').css({
                                    left: parseFloat(jQuery('#draggableS5').css('left'))+70+'px',
                                    top: parseFloat(jQuery('#draggableS5').css('top'))-225+'px'
                                });
                                jQuery('#draggableClean_3').css({
                                    left: parseFloat(jQuery('#draggableS6').css('left'))+70+'px',
                                    top: parseFloat(jQuery('#draggableS6').css('top'))-225+'px'
                                });
                                jQuery('#draggableClean_2, #draggableClean_3').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat');
                                jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
                                phaseThree = setInterval(function(){
                                    if (count_animation <= 10){ //120
                                        cur_animation_val += 6;
                                        jQuery('#draggableClean_2, #draggableClean_3').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                                        jQuery('#draggable5, #draggableD5').css('background', 'red');
                                        if (count_animation >= 5 && count_animation <= 10){ //60
                                            jQuery('#draggableS5, #draggableS6').css('background', 'red');
                                        }
                                        count_animation += 1;
                                    } else {
                                        clearInterval(phaseThree);
                                        count_animation = 1;
                                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                                        jQuery('#draggableClean_2, #draggableClean_3').css({
                                            background: 'transparent',
                                            transform: 'rotate(0deg) scale(1)'
                                        });
                                        jQuery('#draggable5, #draggableD5, #draggableS5, #draggableS6').css('background', 'transparent');
                                    }
                                }, 1000);
                            }
                        }, 1000);
                    }
                }, 1000);
            }
        }, 1000);
    }
