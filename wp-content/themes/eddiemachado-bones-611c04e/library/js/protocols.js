    var count_animation = 1,
        cur_animation_val = 0,
        phaseOne,
        phaseTwo,
        phaseThree,
        phaseFour,
        phaseSeven_one,
        phaseSeven_two,
        firstTriangleAnimation,
        secondTriangleAnimation,
        thirdTriangleAnimation,
        v2,
        v3;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        jQuery('#draggableClean_2').css({
                left: parseFloat(jQuery('#draggableS1').css('left'))+70+'px',
                top: parseFloat(jQuery('#draggableS1').css('top'))-275+'px'
        });
        jQuery('#draggableClean_3').css({
                left: parseFloat(jQuery('#draggableS2').css('left'))+70+'px',
                top: parseFloat(jQuery('#draggableS2').css('top'))-725+'px'
        });
        jQuery('#draggableClean_4').css({
                left: parseFloat(jQuery('#draggableS2_1').css('left'))+70+'px',
                top: parseFloat(jQuery('#draggableS2_1').css('top'))-725+'px'
        });
        jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').removeClass('inopaciti');
        phaseOne = setInterval(function(){
            if (count_animation <= 120){                                                                         //120
                cur_animation_val += 6;
                jQuery('#draggableClean, #draggableClean_2, #draggableClean_3, #draggableClean_4').css({
                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat',
                    borderWidth: '1px',
                    paddingTop: '4px',
                    zIndex: '1000'
                });
                count_animation += 1;

            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('#draggableClean, #draggableClean_2, #draggableClean_3, #draggableClean_4').css({
                    background: 'transparent',
                    transform: 'scale(0.5)',
                    color: 'red',
                    borderWidth: '2px',
                    paddingTop: '2px',
                    zIndex: '1'
                });
                count_animation = 1;
                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').addClass('inopaciti');
    //фаза 2
                cur_animation_val = 0;
                phaseTwo = setInterval(function(){
                    if (count_animation <= 150){                                                                 //150
                        jQuery('#draggableD2, #draggable2, #draggableS2, #draggableS2_1').css({
                            borderWidth: '1px',
                            paddingTop: '4px',
                            zIndex: '1000',
                            transform: 'scale(1)',
                            color: 'transparent'
                        });
                        jQuery('#draggableD2, #draggable2').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                        jQuery('#draggableS2, #draggableS2_1').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/travma.jpg) 0 0/100% no-repeat');
                        count_animation += 1;
                        if (count_animation >= 60 && count_animation <= 120){                               //60-120
                            jQuery('#draggableS2, #draggableS2_1').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat');
                        } else if (count_animation >= 120 && count_animation <= 151){                               //120-151
                            jQuery('#draggableS2, #draggableS2_1').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
                        }
                    } else {
                        clearInterval(phaseTwo);
                        count_animation = 1;
                        jQuery('#draggableD2, #draggable2, #draggableS2, #draggableS2_1').css({
                            background: 'transparent',
                            transform: 'scale(0.5)',
                            color: 'red',
                            borderWidth: '2px',
                            paddingTop: '2px',
                            zIndex: '1'
                        });
    //фаза 3
                        cur_animation_val = 0;
                        jQuery('#draggableClean_2').css({
                                left: parseFloat(jQuery('#draggableS4').css('left'))+70+'px',
                                top: parseFloat(jQuery('#draggableS4').css('top'))-505+'px'
                        });
                        jQuery('#draggableClean_3').css({
                                left: parseFloat(jQuery('#draggableS5').css('left'))+70+'px',
                                top: parseFloat(jQuery('#draggableS5').css('top'))-505+'px'
                        });
                        jQuery('#draggableClean_4').css({
                                left: parseFloat(jQuery('#draggableS6').css('left'))+70+'px',
                                top: parseFloat(jQuery('#draggableS6').css('top'))-505+'px'
                        });
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').removeClass('inopaciti');
                        phaseThree = setInterval(function(){
                            if (count_animation <= 120){                                                         //120
                                cur_animation_val += 6;
                                jQuery('#draggable4, #draggable5, #draggableD4, #draggableD5, #draggableClean_2, #draggableClean_3, #draggableClean_4').css({
                                    borderWidth: '1px',
                                    paddingTop: '4px',
                                    zIndex: '1000',
                                    color: 'transparent',
                                    transform: 'scale(1)',
                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat'
                                });
                                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').css({
                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                                });
                                count_animation += 1;
                            } else {
                                clearInterval(phaseThree);
                                count_animation = 1;
                                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').addClass('inopaciti');
                                jQuery('#draggable4, #draggable5, #draggableD4, #draggableD5, #draggableClean_2, #draggableClean_3, #draggableClean_4').css({
                                    background: 'transparent',
                                    transform: 'rotate(0deg) scale(0.5)',
                                    color: 'red',
                                    borderWidth: '2px',
                                    paddingTop: '2px',
                                    zIndex: '1'
                                });
    //фаза 4
                                cur_animation_val = 0;
                                phaseFour = setInterval(function(){
                                    if (count_animation <= 150){                                                //150
                                        cur_animation_val += 6;
                                        jQuery('#draggable0, #draggableVD, #draggableS4, #draggableS5, #draggableS6').css({
                                            transform: 'scale(1)',
                                            borderWidth: '1px',
                                            paddingTop: '4px',
                                            color: 'transparent',
                                            zIndex: '1000'
                                        });
                                        jQuery('#draggable0, #draggableVD').css({
                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat',
                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)'
                                        });
                                        jQuery('#draggableS4, #draggableS5, #draggableS6').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/travma.jpg) 0 0/100% no-repeat');
                                        count_animation += 1;
                                        if (count_animation >= 60 && count_animation <= 120) {                               //60-120
                                            jQuery('#draggableS4, #draggableS5, #draggableS6').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat');
                                        } else if (count_animation >= 120 && count_animation <= 151) {                               //120-151
                                            jQuery('#draggableS4, #draggableS5, #draggableS6').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
                                        }
                                    } else {
                                        clearInterval(phaseFour);
                                        count_animation = 1;
                                        jQuery('#draggableS4, #draggableS5, #draggableS6, #draggable0, #draggableVD').css({
                                            background: 'transparent',
                                            transform: 'rotate(0deg) scale(0.5)',
                                            borderWidth: '2px',
                                            paddingTop: '2px',
                                            color: 'red',
                                            zIndex: '1'
                                        });
    //Фаза 5
                                        cur_animation_val = 0;
                                        count_animation = 1;
                                    //анимация против часовой стрелки
                                        jQuery('.triangle').css({
                                            transform: 'scale(0.2) rotateY(180deg)rotateZ(120deg)',
                                            left: '-180px',
                                            top: '-120px'
                                        });
                                        //анимация первого треугольника
                                        jQuery('#draggable1').addClass('transparent');
                                        firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                        //анимация второго треугольника
                                            setTimeout(function(){
                                                jQuery('#draggable2').addClass('transparent');
                                                secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                        //анимация третьего треугольника
                                                    setTimeout(function(){
                                                        jQuery('#draggable3').addClass('transparent');
                                                        thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                        //анимация четвертого треугольника
                                                            setTimeout(function(){
                                                                jQuery('#draggable4').addClass('transparent');
                                                                fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                    jQuery('.itemlist_item').removeClass('transparent');


                                                                //анимация по часовой стрелке
                                                                    jQuery('.triangle').css({
                                                                        transform: 'scale(0.2) rotateY(0deg)rotateZ(120deg)',
                                                                        left: '-170px',
                                                                        top: '-120px'
                                                                    });
                                                                    //анимация первого треугольника
                                                                    jQuery('#draggable1').addClass('transparent');                                                                    
                                                                    firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                    //анимация второго треугольника
                                                                        setTimeout(function(){
                                                                            jQuery('#draggable2').addClass('transparent');
                                                                            secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                    //анимация третьего треугольника
                                                                                setTimeout(function(){
                                                                                    jQuery('#draggable3').addClass('transparent');
                                                                                    thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                    //анимация четвертого треугольника
                                                                                        setTimeout(function(){
                                                                                            jQuery('#draggable4').addClass('transparent');
                                                                                            fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                jQuery('.itemlist_item').removeClass('transparent');
    //Фаза 7
                                                                                    //Этап 7-1
                                                                                                cur_animation_val = 60;
                                                                                                count_animation = 1;
                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                    if (count_animation <= 20){                                                                         //10
                                                                                                        cur_animation_val += 1.5;
                                                                                                        jQuery('#draggable1').css({
                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                            color: 'transparent',
                                                                                                            borderWidth: '1px',
                                                                                                            paddingTop: '4px',
                                                                                                            zIndex: '1000'
                                                                                                        });
                                                                                                        count_animation += 1;
                                                                                                    } else if(count_animation <= 140) {                                                         //130
                                                                                                        count_animation += 1;

                                                                                                        console.log('7-1'+ count_animation+ '/130');
                                                                                                    } else {    
                                                                                                        clearInterval(phaseSeven_one);
                                                                                                        count_animation = 1;
                                                                                                        jQuery('#draggable1').css({
                                                                                                            transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                            background: 'transparent',
                                                                                                            color: 'red',
                                                                                                            borderWidth: '2px',
                                                                                                            paddingTop: '2px',
                                                                                                            zIndex: '1'
                                                                                                        });
                                                                                    //Этап 7-2
                                                                                                        cur_animation_val = 90;
                                                                                                        count_animation = 1;
                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                            if (count_animation <= 30){                                                                         //15
                                                                                                                cur_animation_val -= 3;
                                                                                                                jQuery('#draggable2').css({
                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                    color: 'transparent',
                                                                                                                    borderWidth: '1px',
                                                                                                                    paddingTop: '4px',
                                                                                                                    zIndex: '1000'
                                                                                                                });
                                                                                                                count_animation += 1;

                                                                                                            } else if(count_animation <= 150) {                                                         //135
                                                                                                                count_animation += 1;

                                                                                                                console.log('7-2'+ count_animation+ '/135');
                                                                                                            } else {    
                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                count_animation = 1;
                                                                                                                jQuery('#draggable2').css({
                                                                                                                    transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                    background: 'transparent',
                                                                                                                    color: 'red',
                                                                                                                    borderWidth: '2px',
                                                                                                                    paddingTop: '2px',
                                                                                                                    zIndex: '1'
                                                                                                                });
                                                                                    //Этап 7-3
                                                                                                                cur_animation_val = 90;
                                                                                                                count_animation = 1;
                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                    if (count_animation <= 30){                                                                         //15
                                                                                                                        cur_animation_val -= 3;
                                                                                                                        jQuery('#draggable2').css({
                                                                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                            color: 'transparent',
                                                                                                                            borderWidth: '1px',
                                                                                                                            paddingTop: '4px',
                                                                                                                            zIndex: '1000'
                                                                                                                        });
                                                                                                                        count_animation += 1;

                                                                                                                    } else if(count_animation <= 150) {                                                         //135
                                                                                                                        count_animation += 1;

                                                                                                                        console.log('7-3'+ count_animation+ '/135');
                                                                                                                    } else {    
                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                        count_animation = 1;
                                                                                                                        jQuery('#draggable2').css({
                                                                                                                            transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                            background: 'transparent',
                                                                                                                            color: 'red',
                                                                                                                            borderWidth: '2px',
                                                                                                                            paddingTop: '2px',
                                                                                                                            zIndex: '1'
                                                                                                                        });
                                                                                    //Этап 7-4
                                                                                                                        cur_animation_val = 60;
                                                                                                                        count_animation = 1;
                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                            if (count_animation <= 20){                                                                         //10
                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                    color: 'transparent',
                                                                                                                                    borderWidth: '1px',
                                                                                                                                    paddingTop: '4px',
                                                                                                                                    zIndex: '1000'
                                                                                                                                });
                                                                                                                                count_animation += 1;

                                                                                                                            } else if(count_animation <= 140) {                                                         //130
                                                                                                                                count_animation += 1;

                                                                                                                                console.log('7-4'+ count_animation+ '/130');
                                                                                                                            } else {    
                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                count_animation = 1;
                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                    background: 'transparent',
                                                                                                                                    color: 'red',
                                                                                                                                    borderWidth: '2px',
                                                                                                                                    paddingTop: '2px',
                                                                                                                                    zIndex: '1'
                                                                                                                                });
                                                                                    //Этап 7-5
                                                                                                                                cur_animation_val = 84;
                                                                                                                                count_animation = 1;
                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                    if (count_animation <= 28){                                                                         //14
                                                                                                                                        cur_animation_val -= 3;
                                                                                                                                        jQuery('#draggable5').css({
                                                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                            color: 'transparent',
                                                                                                                                            borderWidth: '1px',
                                                                                                                                            paddingTop: '4px',
                                                                                                                                            zIndex: '1000'
                                                                                                                                        });
                                                                                                                                        count_animation += 1;

                                                                                                                                    } else if(count_animation <= 148) {                                                         //134
                                                                                                                                        count_animation += 1;

                                                                                                                                        console.log('7-5'+ count_animation+ '/134');
                                                                                                                                    } else {    
                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                        count_animation = 1;
                                                                                                                                        jQuery('#draggable5').css({
                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                            background: 'transparent',
                                                                                                                                            color: 'red',
                                                                                                                                            borderWidth: '2px',
                                                                                                                                            paddingTop: '2px',
                                                                                                                                            zIndex: '1'
                                                                                                                                        });
        //Фаза 8
                                                                                                                                        cur_animation_val = 0;
                                                                                                                                        count_animation = 1;
                                                                                                                                    //анимация против часовой стрелки
                                                                                                                                        jQuery('.triangle').css({
                                                                                                                                            transform: 'scale(0.2) rotateY(180deg)rotateZ(120deg)',
                                                                                                                                            left: '-180px',
                                                                                                                                            top: '-120px'
                                                                                                                                        });
                                                                                                                                        //анимация первого треугольника
                                                                                                                                        jQuery('#draggable1').addClass('transparent');
                                                                                                                                        firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                                                                                        //анимация второго треугольника
                                                                                                                                            setTimeout(function(){
                                                                                                                                                jQuery('#draggable2').addClass('transparent');
                                                                                                                                                secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                                                                                        //анимация третьего треугольника
                                                                                                                                                    setTimeout(function(){
                                                                                                                                                        jQuery('#draggable3').addClass('transparent');
                                                                                                                                                        thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                                                                                        //анимация четвертого треугольника
                                                                                                                                                            setTimeout(function(){
                                                                                                                                                                jQuery('#draggable4').addClass('transparent');
                                                                                                                                                                fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                    jQuery('.itemlist_item').removeClass('transparent');


                                                                                                                                                                //анимация по часовой стрелке
                                                                                                                                                                    jQuery('.triangle').css({
                                                                                                                                                                        transform: 'scale(0.2) rotateY(0deg)rotateZ(120deg)',
                                                                                                                                                                        left: '-170px',
                                                                                                                                                                        top: '-120px'
                                                                                                                                                                    });
                                                                                                                                                                    //анимация первого треугольника
                                                                                                                                                                    jQuery('#draggable1').addClass('transparent');                                                                    
                                                                                                                                                                    firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                    //анимация второго треугольника
                                                                                                                                                                        setTimeout(function(){
                                                                                                                                                                            jQuery('#draggable2').addClass('transparent');
                                                                                                                                                                            secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                    //анимация третьего треугольника
                                                                                                                                                                                setTimeout(function(){
                                                                                                                                                                                    jQuery('#draggable3').addClass('transparent');
                                                                                                                                                                                    thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                    //анимация четвертого треугольника
                                                                                                                                                                                        setTimeout(function(){
                                                                                                                                                                                            jQuery('#draggable4').addClass('transparent');
                                                                                                                                                                                            fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                jQuery('.itemlist_item').removeClass('transparent');
                                                                                                    
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
                                                                                                                                }, 1000);
                                                                                                                            }
                                                                                                                        }, 1000);
                                                                                                                    }
                                                                                                                }, 1000);
                                                                                                            }
                                                                                                        }, 1000);
                                                                                                    }
                                                                                                }, 1000);
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
                                }, 1000);
                            }
                        }, 1000);
                    }
                }, 1000);
            }
        }, 1000);
    }
    v3 = function(){
    //фаза 1
        cur_animation_val = 0;
        count_animation = 1;
    //анимация против часовой стрелки
        jQuery('.triangle').css({
            transform: 'scale(0.2) rotateY(180deg) rotateZ(120deg)',
            left: '-170px',
            top: '-120px'
        });
        //анимация первого треугольника
        jQuery('#draggable1').addClass('transparent');
        firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
        //анимация второго треугольника
            setTimeout(function(){
                jQuery('#draggable2').addClass('transparent');
                secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
        //анимация третьего треугольника
                    setTimeout(function(){
                        jQuery('#draggable3').addClass('transparent');
                        thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
        //анимация четвертого треугольника
                            setTimeout(function(){
                                jQuery('#draggable4').addClass('transparent');
                                fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                    jQuery('.itemlist_item').removeClass('transparent');
                                //анимация по часовой стрелке
                                    jQuery('.triangle').css({
                                        transform: 'scale(0.2) rotateY(0deg) rotateZ(120deg)',
                                        left: '-170px',
                                        top: '-120px'
                                    });
                                    //анимация первого треугольника
                                    jQuery('#draggable1').addClass('transparent');                                                                    
                                    firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                    //анимация второго треугольника
                                        setTimeout(function(){
                                            jQuery('#draggable2').addClass('transparent');
                                            secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                    //анимация третьего треугольника
                                                setTimeout(function(){
                                                    jQuery('#draggable3').addClass('transparent');
                                                    thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                    //анимация четвертого треугольника
                                                        setTimeout(function(){
                                                            jQuery('#draggable4').addClass('transparent');
                                                            fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                jQuery('.itemlist_item').removeClass('transparent');
    //фаза 2
                                                                count_animation = 1;
                                                                phaseOne = setInterval(function(){
                                                                    if (count_animation <= 12){                                                                         //120
                                                                        cur_animation_val += 6;
                                                                        jQuery('#draggable1, #draggable4, #draggable5').css({
                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat'
                                                                        });
                                                                        jQuery('#draggableD1, #draggableD2, #draggableD4, #draggableD5').css({
                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/drenag.png) 0 0/100% no-repeat'
                                                                        });
                                                                        jQuery('#draggable3').css({
                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/rogdenia.png) 0 0/100% no-repeat'
                                                                        });
                                                                        jQuery('#draggable1, #draggable3, #draggable4, #draggable5, #draggableD1, #draggableD2, #draggableD4, #draggableD5').css({
                                                                            color: 'transparent',
                                                                            transform: 'scale(1)',
                                                                            borderWidth: '1px',
                                                                            paddingTop: '4px',
                                                                            zIndex: '1000'
                                                                        });
                                                                        count_animation += 1;

                                                                    } else {
                                                                        clearInterval(phaseOne);
                                                                        count_animation = 1;
                                                                        jQuery('#draggable1, #draggable3, #draggable4, #draggable5, #draggableD1, #draggableD2, #draggableD4, #draggableD5').css({
                                                                            background: 'transparent',
                                                                            color: 'red',
                                                                            transform: 'scale(0.5)',
                                                                            borderWidth: '2px',
                                                                            paddingTop: '2px',
                                                                            zIndex: '1'
                                                                        });
    //фаза 3
                                                                        count_animation = 1;
                                                                        jQuery('#draggableClean_2').css({
                                                                                left: parseFloat(jQuery('#draggableS3').css('left'))+70+'px',
                                                                                top: parseFloat(jQuery('#draggableS3').css('top'))-561+'px'
                                                                        });
                                                                        jQuery('#draggableClean_3').css({
                                                                                left: parseFloat(jQuery('#draggableS4').css('left'))+70+'px',
                                                                                top: parseFloat(jQuery('#draggableS4').css('top'))-561+'px'
                                                                        });
                                                                        jQuery('#draggableClean_4').css({
                                                                                left: parseFloat(jQuery('#draggableS5').css('left'))+70+'px',
                                                                                top: parseFloat(jQuery('#draggableS5').css('top'))-561+'px'
                                                                        });
                                                                        jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').removeClass('inopaciti');
                                                                        phaseOne = setInterval(function(){
                                                                            if (count_animation <= 120){                                                                         //120
                                                                                cur_animation_val += 6;
                                                                                jQuery('#draggable3, #draggableD3, #draggableD1, #draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableVD').css({
                                                                                    color: 'transparent',
                                                                                    transform: 'scale(1)',
                                                                                    borderWidth: '1px',
                                                                                    paddingTop: '4px',
                                                                                    zIndex: '1000'
                                                                                });
                                                                                jQuery('#draggableD3, #draggable3').css({
                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat'
                                                                                });
                                                                                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableVD, #draggableD1').css({
                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                                                                                });
                                                                                count_animation += 1;
                                                                            } else {
                                                                                clearInterval(phaseOne);
                                                                                count_animation = 1;
                                                                                jQuery('#draggable3, #draggableD3, #draggableS3, #draggableS4, #draggableS5, #draggableVD, #draggableD1').css({
                                                                                    background: 'transparent',
                                                                                    color: 'red',
                                                                                    transform: 'scale(0.5)',
                                                                                    borderWidth: '2px',
                                                                                    paddingTop: '2px',
                                                                                    zIndex: '1'
                                                                                });
                                                                                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4').addClass('inopaciti');
    //фаза 4
                                                                                count_animation = 1;
                                                                                cur_animation_val = 0;
                                                                                phaseOne = setInterval(function(){
                                                                                    if (count_animation <= 12){                                                                         //120
                                                                                        jQuery('#draggableS3, #draggableS4, #draggableS5, #draggableS6').css({
                                                                                            transform: 'scale(1)',
                                                                                            borderWidth: '1px',
                                                                                            paddingTop: '4px',
                                                                                            zIndex: '1000',
                                                                                            color: 'transparent'
                                                                                        });
                                                                                        jQuery('#draggableS3').css({
                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/travma.jpg) 0 0/100% no-repeat'
                                                                                        });
                                                                                        jQuery('#draggableS4, #draggableS5, #draggableS6').css({
                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat'
                                                                                        });
                                                                                        if (count_animation >= 6 && count_animation <= 12){                               //60
                                                                                            jQuery('#draggableS3, #draggableS4, #draggableS5, #draggableS6').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
                                                                                        }
                                                                                        count_animation += 1;

                                                                                    } else {
                                                                                        clearInterval(phaseOne);
                                                                                        count_animation = 1;
                                                                                        jQuery('#draggableS3, #draggableS4, #draggableS5, #draggableS6').css({
                                                                                            background: 'transparent',
                                                                                            color: 'red',
                                                                                            transform: 'scale(0.5)',
                                                                                            borderWidth: '2px',
                                                                                            paddingTop: '2px',
                                                                                            zIndex: '1'
                                                                                        });
                                                                                        jQuery('#draggableVD').css({
                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                            background: 'transparent',
                                                                                            borderWidth: '2px',
                                                                                            paddingTop: '2px',
                                                                                            transform: 'scale(0.5)',
                                                                                            zIndex: '1',
                                                                                            color: 'red'
                                                                                        });
    //фаза 5
                                                                                        count_animation = 1;
                                                                                        cur_animation_val = 0;
                                                                                        phaseOne = setInterval(function(){
                                                                                            if (count_animation <= 1){                                                                         //120
                                                                                                count_animation += 1;

                                                                                            } else {
                                                                                                clearInterval(phaseOne);
    //Фаза 6
                                                                                                cur_animation_val = 0;
                                                                                                count_animation = 1;
                                                                                            //анимация против часовой стрелки
                                                                                                jQuery('.triangle').css({
                                                                                                    transform: 'scale(0.2) rotateY(180deg) rotateZ(120deg)',
                                                                                                    left: '-180px',
                                                                                                    top: '-120px'
                                                                                                });
                                                                                                //анимация первого треугольника
                                                                                                jQuery('#draggable1').addClass('transparent');
                                                                                                firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                                                //анимация второго треугольника
                                                                                                    setTimeout(function(){
                                                                                                        jQuery('#draggable2').addClass('transparent');
                                                                                                        secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                                                //анимация третьего треугольника
                                                                                                            setTimeout(function(){
                                                                                                                jQuery('#draggable3').addClass('transparent');
                                                                                                                thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                                                //анимация четвертого треугольника
                                                                                                                    setTimeout(function(){
                                                                                                                        jQuery('#draggable4').addClass('transparent');
                                                                                                                        fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                                            jQuery('.itemlist_item').removeClass('transparent');
                                                                                                                        //анимация по часовой стрелке
                                                                                                                            jQuery('.triangle').css({
                                                                                                                                transform: 'scale(0.2) rotateY(0deg) rotateZ(120deg)',
                                                                                                                                left: '-170px',
                                                                                                                                top: '-120px'
                                                                                                                            });
                                                                                                                            //анимация первого треугольника
                                                                                                                            jQuery('#draggable1').addClass('transparent');                                                                    
                                                                                                                            firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                                                                            //анимация второго треугольника
                                                                                                                                setTimeout(function(){
                                                                                                                                    jQuery('#draggable2').addClass('transparent');
                                                                                                                                    secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                                                                            //анимация третьего треугольника
                                                                                                                                        setTimeout(function(){
                                                                                                                                            jQuery('#draggable3').addClass('transparent');
                                                                                                                                            thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                                                                            //анимация четвертого треугольника
                                                                                                                                                setTimeout(function(){
                                                                                                                                                    jQuery('#draggable4').addClass('transparent');
                                                                                                                                                    fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                        jQuery('.itemlist_item').removeClass('transparent');
    //Фаза 7
                                                                                                                                            //Этап 7-1
                                                                                                                                                        cur_animation_val = 30;
                                                                                                                                                        count_animation = 1;
                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                            if (count_animation <= 36){                                                                         //18
                                                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                    paddingTop: '4px',
                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                });
                                                                                                                                                                count_animation += 1;

                                                                                                                                                            } else if(count_animation <= 156) {                                                         //138
                                                                                                                                                                count_animation += 1;

                                                                                                                                                                console.log('7-1'+ count_animation+ '/138');
                                                                                                                                                            } else {    
                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                count_animation = 1;
                                                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                                                    background: 'transparent',
                                                                                                                                                                    color: 'red',
                                                                                                                                                                    borderWidth: '2px',
                                                                                                                                                                    paddingTop: '2px',
                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                });
                                                                                                                                            //Этап 7-2
                                                                                                                                                                cur_animation_val = 90;
                                                                                                                                                                count_animation = 1;
                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                    if (count_animation <= 28){                                                                         //14
                                                                                                                                                                        cur_animation_val -= 3;
                                                                                                                                                                        jQuery('#draggable5').css({
                                                                                                                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                            paddingTop: '4px',
                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                        });
                                                                                                                                                                        count_animation += 1;

                                                                                                                                                                    } else if(count_animation <= 148) {                                                         //134
                                                                                                                                                                        count_animation += 1;

                                                                                                                                                                        console.log('7-2'+ count_animation+ '/134');
                                                                                                                                                                    } else {    
                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                        jQuery('#draggable5').css({
                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                                                            background: 'transparent',
                                                                                                                                                                            color: 'red',
                                                                                                                                                                            borderWidth: '2px',
                                                                                                                                                                            paddingTop: '2px',
                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                        });
                                                                                                                                            //Этап 7-3
                                                                                                                                                                        cur_animation_val = 10;
                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                                            if (count_animation <= 26){                                                                         //13
                                                                                                                                                                                cur_animation_val += 3;
                                                                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                                                                    transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                    paddingTop: '4px',
                                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                                });
                                                                                                                                                                                count_animation += 1;

                                                                                                                                                                            } else if(count_animation <= 146) {                                                         //133
                                                                                                                                                                                count_animation += 1;

                                                                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                                                                    transform: 'rotate('+90+'deg) scale(1)',
                                                                                                                                                                                });
                                                                                                                                                                                console.log('7-3'+ count_animation+ '/133');
                                                                                                                                                                            } else {    
                                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                                                                    background: 'transparent',
                                                                                                                                                                                    color: 'red',
                                                                                                                                                                                    borderWidth: '2px',
                                                                                                                                                                                    paddingTop: '2px',
                                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                                });
                                                                                                                                            //Этап 7-4
                                                                                                                                                                                cur_animation_val = 90;
                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                                    if (count_animation <= 30){                                                                         //15
                                                                                                                                                                                        cur_animation_val -= 3;
                                                                                                                                                                                        jQuery('#draggable3').css({
                                                                                                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                            paddingTop: '4px',
                                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                                        });
                                                                                                                                                                                        count_animation += 1;

                                                                                                                                                                                    } else if(count_animation <= 150) {                                                         //135
                                                                                                                                                                                        count_animation += 1;

                                                                                                                                                                                        console.log('7-4'+ count_animation+ '/135');
                                                                                                                                                                                    } else {    
                                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                        jQuery('#draggable3').css({
                                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                                                                            background: 'transparent',
                                                                                                                                                                                            color: 'red',
                                                                                                                                                                                            borderWidth: '2px',
                                                                                                                                                                                            paddingTop: '2px',
                                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                                        });
                                                                                                                                            //Этап 7-5
                                                                                                                                                                                        cur_animation_val = 30;
                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                                                                                            if (count_animation <= 36){                                                                         //18
                                                                                                                                                                                                cur_animation_val += 1.5;
                                                                                                                                                                                                jQuery('#draggable1').css({
                                                                                                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_right.png) 0 0/100% no-repeat',
                                                                                                                                                                                                    color: 'transparent',
                                                                                                                                                                                                    borderWidth: '1px',
                                                                                                                                                                                                    paddingTop: '4px',
                                                                                                                                                                                                    zIndex: '1000'
                                                                                                                                                                                                });
                                                                                                                                                                                                count_animation += 1;

                                                                                                                                                                                            } else if(count_animation <= 156) {                                                         //122
                                                                                                                                                                                                count_animation += 1;

                                                                                                                                                                                                console.log('7-5'+ count_animation+ '/122');
                                                                                                                                                                                            } else {    
                                                                                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                jQuery('#draggable1').css({
                                                                                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                                                                                    background: 'transparent',
                                                                                                                                                                                                    color: 'red',
                                                                                                                                                                                                    borderWidth: '2px',
                                                                                                                                                                                                    paddingTop: '2px',
                                                                                                                                                                                                    zIndex: '1'
                                                                                                                                                                                                });
                                                                                                                                            //Этап 7-6
                                                                                                                                                                                                cur_animation_val = 10;
                                                                                                                                                                                                count_animation = 1;
                                                                                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                                                                                    if (count_animation <= 26){                                                                         //13
                                                                                                                                                                                                        cur_animation_val += 3;
                                                                                                                                                                                                        jQuery('#draggable1').css({
                                                                                                                                                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(1)',
                                                                                                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                                                                                            color: 'transparent',
                                                                                                                                                                                                            borderWidth: '1px',
                                                                                                                                                                                                            paddingTop: '4px',
                                                                                                                                                                                                            zIndex: '1000'
                                                                                                                                                                                                        });
                                                                                                                                                                                                        count_animation += 1;

                                                                                                                                                                                                    } else if(count_animation <= 156) {                                                         //133
                                                                                                                                                                                                        count_animation += 1
                                                                                                                                                                                                        jQuery('#draggable1').css({
                                                                                                                                                                                                            transform: 'rotate('+90+'deg) scale(1)'
                                                                                                                                                                                                        });
                                                                                                                                                                                                        console.log('7-6'+ count_animation+ '/133');
                                                                                                                                                                                                    } else {    
                                                                                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                        jQuery('#draggable1').css({
                                                                                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(0.5)',
                                                                                                                                                                                                            background: 'transparent',
                                                                                                                                                                                                            color: 'red',
                                                                                                                                                                                                            borderWidth: '2px',
                                                                                                                                                                                                            paddingTop: '2px',
                                                                                                                                                                                                            zIndex: '1'
                                                                                                                                                                                                        });
    //Фаза 8
                                                                                                                                                                                                        cur_animation_val = 0;
                                                                                                                                                                                                        count_animation = 1;
                                                                                                                                                                                                    //анимация против часовой стрелки
                                                                                                                                                                                                        jQuery('.triangle').css({
                                                                                                                                                                                                            transform: 'scale(0.2) rotateY(180deg)rotateZ(120deg)',
                                                                                                                                                                                                            left: '-190px',
                                                                                                                                                                                                            top: '-145px'
                                                                                                                                                                                                        });
                                                                                                                                                                                                        //анимация первого треугольника
                                                                                                                                                                                                        jQuery('#draggable1').addClass('transparent');
                                                                                                                                                                                                        firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                        //анимация второго треугольника
                                                                                                                                                                                                            setTimeout(function(){
                                                                                                                                                                                                                jQuery('#draggable2').addClass('transparent');
                                                                                                                                                                                                                secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                        //анимация третьего треугольника
                                                                                                                                                                                                                    setTimeout(function(){
                                                                                                                                                                                                                        jQuery('#draggable3').addClass('transparent');
                                                                                                                                                                                                                        thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                        //анимация четвертого треугольника
                                                                                                                                                                                                                            setTimeout(function(){
                                                                                                                                                                                                                                jQuery('#draggable4').addClass('transparent');
                                                                                                                                                                                                                                fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                                                    jQuery('.itemlist_item').removeClass('transparent');


                                                                                                                                                                                                                                //анимация по часовой стрелке
                                                                                                                                                                                                                                    jQuery('.triangle').css({
                                                                                                                                                                                                                                        transform: 'scale(0.2) rotateY(0deg)rotateZ(120deg)',
                                                                                                                                                                                                                                        left: '-185px',
                                                                                                                                                                                                                                        top: '-145px'
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                    //анимация первого треугольника
                                                                                                                                                                                                                                    jQuery('#draggable1').addClass('transparent');                                                                    
                                                                                                                                                                                                                                    firstTriangleAnimation = new Vivus('triangle_1', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                                                    //анимация второго треугольника
                                                                                                                                                                                                                                        setTimeout(function(){
                                                                                                                                                                                                                                            jQuery('#draggable2').addClass('transparent');
                                                                                                                                                                                                                                            secondTriangleAnimation = new Vivus('triangle_2', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                                                    //анимация третьего треугольника
                                                                                                                                                                                                                                                setTimeout(function(){
                                                                                                                                                                                                                                                    jQuery('#draggable3').addClass('transparent');
                                                                                                                                                                                                                                                    thirdTriangleAnimation = new Vivus('triangle_3', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                                                    //анимация четвертого треугольника
                                                                                                                                                                                                                                                        setTimeout(function(){
                                                                                                                                                                                                                                                            jQuery('#draggable4').addClass('transparent');
                                                                                                                                                                                                                                                            fourthTriangleAnimation = new Vivus('triangle_4', {type: 'delayed', duration: 150}, function(){
                                                                                                                                                                                                                                                                jQuery('.itemlist_item').removeClass('transparent');
                                                                                                                                                                    
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
                                                                                                                                                                                                }, 1000);
                                                                                                                                                                                            }
                                                                                                                                                                                        }, 1000);
                                                                                                                                                                                    }
                                                                                                                                                                                }, 1000);
                                                                                                                                                                            }
                                                                                                                                                                        }, 1000);
                                                                                                                                                                    }
                                                                                                                                                                }, 1000);
                                                                                                                                                            }
                                                                                                                                                        }, 1000);
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
                                                                                        }, 1000);
                                                                                    }
                                                                                }, 1000);
                                                                            }
                                                                        }, 1000);
                                                                    }
                                                                }, 1000);
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
    v4 = function(){
    //фаза 1

        count_animation = 1;
        jQuery('#draggableClean_2').css({
                left: parseFloat(jQuery('#draggableS4').css('left'))+70+'px',
                top: parseFloat(jQuery('#draggableS4').css('top'))-511+'px'
        });
        jQuery('#draggableClean_3').css({
                left: parseFloat(jQuery('#draggableS5').css('left'))+70+'px',
                top: parseFloat(jQuery('#draggableS5').css('top'))-511+'px'
        });
        jQuery('#draggableClean_4').css({
                left: parseFloat(jQuery('#draggableD1').css('left'))+'px',
                top: parseFloat(jQuery('#draggableD1').css('top'))-955+'px'
        });
        jQuery('#draggableClean_5').css({
                left: parseFloat(jQuery('#draggableD1').css('left'))+'px',
                top: parseFloat(jQuery('#draggableD1').css('top'))-1070+'px'
        });
        jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableClean_5').removeClass('inopaciti');
        phaseOne = setInterval(function(){
            if (count_animation <= 12){                                                                         //120
                cur_animation_val += 6;
                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableClean_5, #draggableD1, #draggableD2, #draggable1').css({
                    transform: 'scale(1)',
                    borderWidth: '1px',
                    color: 'transparent',
                    paddingTop: '4px',
                    zIndex: '1000'
                });
                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableClean_5, #draggableD1').css({
                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                });
                jQuery('#draggableD2').css({
                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/drenag.png) 0 0/100% no-repeat'
                });
                jQuery('#draggable1').css({
                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat'
                });
                count_animation += 1;
            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableClean_5, #draggableD1, #draggableD2, #draggable1').css({
                    background: 'transparent',
                    transform: 'scale(0.5)',
                    color: 'red',
                    borderWidth: '2px',
                    paddingTop: '2px',
                    zIndex: '1'
                });
                count_animation = 1;
                jQuery('#draggableClean_2, #draggableClean_3, #draggableClean_4, #draggableClean_5').addClass('inopaciti');

    //фаза 2
                count_animation = 1;
                cur_animation_val = 0;
        //2-1
                phaseOne = setInterval(function(){
                    if (count_animation <= 9){                                                                         //9
                        jQuery('#draggable1').css({
                            transform: 'scale(1)',
                            borderWidth: '1px',
                            color: 'transparent',
                            paddingTop: '4px',
                            zIndex: '1000'
                        });
                        if (count_animation >= 0 && count_animation <= 1){
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.001.jpg) 0 0/100% no-repeat');
                        } else if (count_animation > 1 && count_animation <= 1) {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.002.jpg) 0 0/100% no-repeat');
                        } else if (count_animation > 2 && count_animation <= 3) {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.004.jpg) 0 0/100% no-repeat');
                        } else if (count_animation > 3 && count_animation <= 4) {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.005.jpg) 0 0/100% no-repeat');
                        } else if (count_animation > 4 && count_animation <= 5) {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.006.jpg) 0 0/100% no-repeat');
                        } else if (count_animation > 5 && count_animation <= 6) {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.007.jpg) 0 0/100% no-repeat');
                        } else if (count_animation > 6 && count_animation <= 7) {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.008.jpg) 0 0/100% no-repeat');
                        } else {
                            jQuery('#draggable1').css( 'background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/simvoly.009.jpg) 0 0/100% no-repeat');
                        };
                        count_animation += 1;
                    } else {
                        clearInterval(phaseOne);
                        count_animation = 1;
                        jQuery('#draggable1').css({
                            background: 'transparent',
                            transform: 'scale(0.5)',
                            color: 'red',
                            borderWidth: '2px',
                            paddingTop: '2px',
                            zIndex: '1'
                        });
                //2-2
                        cur_animation_val = 0;                                                                       //240
                        count_animation = 1;
                        phaseOne = setInterval(function(){
                            if (count_animation <= 24){  
                                cur_animation_val += 6;                                                                       //240
                                jQuery('#draggable4').css({
                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(1)',
                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat',
                                    borderWidth: '1px',
                                    color: 'transparent',
                                    paddingTop: '4px',
                                    zIndex: '1000'
                                });
                                count_animation += 1;
                            } else {
                                clearInterval(phaseOne);
                                count_animation = 1;
                                jQuery('#draggable4').css({
                                    background: 'transparent',
                                    transform: 'scale(0.5)',
                                    color: 'red',
                                    borderWidth: '2px',
                                    paddingTop: '2px',
                                    zIndex: '1'
                                });
                                count_animation = 1;
                            }
                        }, 1000);
                    }
                }, 500);
            }
        }, 1000);
    }

