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
        v2;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        phaseOne = setInterval(function(){
            if (count_animation <= 10){                                                                         //120
                cur_animation_val += 6;
                jQuery('#draggableClean').css({
                    transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat',
                    borderWidth: '1px',
                    paddingTop: '4px'
                });
                jQuery('#draggable2').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                jQuery('#draggableS2, #draggableS2_1').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/travma.jpg) 0 0/100% no-repeat');
                jQuery('#draggable2, #draggableS2, #draggableS2_1').css({
                    color: 'transparent',
                    transform: 'scale(2)',
                    borderWidth: '1px',
                    paddingTop: '4px'
                });
                count_animation += 1;
            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('#draggable2, #draggableS2, #draggableS2_1, #draggableClean').css({
                    background: 'transparent',
                    transform: 'scale(1)',
                    color: 'red',
                    borderWidth: '2px',
                    paddingTop: '2px'
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
                jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat');
                jQuery('#draggableS1').css('color', 'transparent');
                jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
                phaseTwo = setInterval(function(){
                    if (count_animation <= 10){                                                                 //120
                        cur_animation_val += 6;
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css({
                            transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                            borderWidth: '1px',
                            paddingTop: '4px'
                        });
                        count_animation += 1;
                    } else {
                        clearInterval(phaseTwo);
                        count_animation = 1;
                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css({
                            background: 'transparent',
                            transform: 'rotate(0deg) scale(1)',
                            color: 'red',
                            borderWidth: '2px',
                            paddingTop: '2px'
                        });
    //фаза 3
                        cur_animation_val = 0;
                        jQuery('#draggableClean_2').css({
                            left: parseFloat(jQuery('#draggableS4').css('left'))+70+'px',
                            top: parseFloat(jQuery('#draggableS4').css('top'))-250+'px',
                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                        });
                        jQuery('#draggableClean_2').removeClass('inopaciti');
                        phaseThree = setInterval(function(){
                            if (count_animation <= 10){                                                         //120
                                cur_animation_val += 6;
                                jQuery('#draggableClean_2').css({
                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                                    borderWidth: '1px',
                                    paddingTop: '4px'
                                });
                                jQuery('#draggableS4').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat');
                                jQuery('#draggable4').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                                jQuery('#draggable4, #draggableS4').css({
                                    color: 'transparent',
                                    transform: 'scale(2)',
                                    borderWidth: '1px',
                                    paddingTop: '4px'
                                });
                                if (count_animation >= 5 && count_animation <= 10){                               //60
                                    jQuery('#draggableS4').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
                                }
                                count_animation += 1;
                            } else {
                                clearInterval(phaseThree);
                                count_animation = 1;
                                jQuery('#draggableClean_2').addClass('inopaciti');
                                jQuery('#draggable4, #draggableS4').css('color', 'red');
                                jQuery('#draggableClean_2, #draggable4, #draggableS4').css({
                                    background: 'transparent',
                                    transform: 'rotate(0deg) scale(1)',
                                    color: 'red',
                                    borderWidth: '2px',
                                    paddingTop: '2px'
                                });
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
                                jQuery('#draggableClean_2, #draggableClean_3').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat');
                                jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
                                jQuery('#draggableClean_2, #draggableClean_3, #draggable5, #draggableD5, #draggableS5, #draggableS6').css({
                                    transform: 'scale(2)',
                                    color: 'transparent',
                                    borderWidth: '1px',
                                    paddingTop: '4px'
                                });
                                phaseFour = setInterval(function(){
                                    if (count_animation <= 10){                                                //120
                                        cur_animation_val += 6;
                                        jQuery('#draggableClean_2, #draggableClean_3').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                                        jQuery('#draggable5, #draggableD5').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                                        jQuery('#draggableS5, #draggableS6').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat');
                                        jQuery('#draggable5, #draggableD5, #draggableS5, #draggableS6').css('color', 'transparent');
                                        if (count_animation >= 5 && count_animation <= 10){                      //60
                                            jQuery('#draggableS5, #draggableS6').css('background', '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
                                        }
                                        count_animation += 1;
                                    } else {
                                        clearInterval(phaseFour);
                                        count_animation = 1;
                                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                                        jQuery('#draggableClean_2, #draggableClean_3').css({
                                            background: 'transparent',
                                            transform: 'rotate(0deg) scale(1)',
                                            borderWidth: '2px',
                                            paddingTop: '2px'
                                        });
                                        jQuery('#draggable5, #draggableD5, #draggableS5, #draggableS6').css({
                                            background: 'transparent',
                                            transform: 'scale(1)',
                                            color: 'red',
                                            borderWidth: '2px',
                                            paddingTop: '2px'
                                        });
    //Фаза 5
                                        cur_animation_val = 0;
                                        count_animation = 1;
                                    //анимация против часовой стрелки
                                        jQuery('.triangle').css({
                                            transform: 'scale(0.1) rotateY(180deg)',
                                            left: '-190px'
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
                                                                        transform: 'scale(0.1) rotateY(0deg)',
                                                                        left: '-185px'
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
                                                                                                    if (count_animation <= 10){                                                                         //10
                                                                                                        cur_animation_val += 3;
                                                                                                        jQuery('#draggable1').css({
                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                            color: 'transparent',
                                                                                                            borderWidth: '1px',
                                                                                                            paddingTop: '4px'
                                                                                                        });
                                                                                                        count_animation += 1;
                                                                                                    } else if(count_animation <= 20) {                                                         //120
                                                                                                        count_animation += 1;
                                                                                                    } else {    
                                                                                                        clearInterval(phaseSeven_one);
                                                                                                        count_animation = 1;
                                                                                                        jQuery('#draggable1').css({
                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                            background: 'transparent',
                                                                                                            color: 'red',
                                                                                                            borderWidth: '2px',
                                                                                                            paddingTop: '2px'
                                                                                                        });
                                                                                    //Этап 7-2
                                                                                                        cur_animation_val = 90;
                                                                                                        count_animation = 1;
                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                            if (count_animation <= 15){                                                                         //15
                                                                                                                cur_animation_val -= 6;
                                                                                                                jQuery('#draggable2').css({
                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                    color: 'transparent',
                                                                                                                    borderWidth: '1px',
                                                                                                                    paddingTop: '4px'
                                                                                                                });
                                                                                                                count_animation += 1;
                                                                                                            } else if(count_animation <= 20) {                                                         //120
                                                                                                                count_animation += 1;
                                                                                                            } else {    
                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                count_animation = 1;
                                                                                                                jQuery('#draggable2').css({
                                                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                    background: 'transparent',
                                                                                                                    color: 'red',
                                                                                                                    borderWidth: '2px',
                                                                                                                    paddingTop: '2px'
                                                                                                                });
                                                                                    //Этап 7-3
                                                                                                                cur_animation_val = 90;
                                                                                                                count_animation = 1;
                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                    if (count_animation <= 15){                                                                         //15
                                                                                                                        cur_animation_val -= 6;
                                                                                                                        jQuery('#draggable2').css({
                                                                                                                            transform: 'rotate('+cur_animation_val+'deg) scale(2)',
                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                            color: 'transparent',
                                                                                                                            borderWidth: '1px',
                                                                                                                            paddingTop: '4px'
                                                                                                                        });
                                                                                                                        count_animation += 1;
                                                                                                                    } else if(count_animation <= 20) {                                                         //120
                                                                                                                        count_animation += 1;
                                                                                                                    } else {    
                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                        count_animation = 1;
                                                                                                                        jQuery('#draggable2').css({
                                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                            background: 'transparent',
                                                                                                                            color: 'red',
                                                                                                                            borderWidth: '2px',
                                                                                                                            paddingTop: '2px'
                                                                                                                        });
                                                                                    //Этап 7-4
                                                                                                                        cur_animation_val = 60;
                                                                                                                        count_animation = 1;
                                                                                                                        phaseSeven_one = setInterval(function(){
                                                                                                                            if (count_animation <= 10){                                                                         //10
                                                                                                                                cur_animation_val += 3;
                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                    transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                                                                                                                                    background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                    color: 'transparent',
                                                                                                                                    borderWidth: '1px',
                                                                                                                                    paddingTop: '4px'
                                                                                                                                });
                                                                                                                                count_animation += 1;
                                                                                                                            } else if(count_animation <= 20) {                                                         //120
                                                                                                                                count_animation += 1;
                                                                                                                            } else {    
                                                                                                                                clearInterval(phaseSeven_one);
                                                                                                                                count_animation = 1;
                                                                                                                                jQuery('#draggable5').css({
                                                                                                                                    transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                    background: 'transparent',
                                                                                                                                    color: 'red',
                                                                                                                                    borderWidth: '2px',
                                                                                                                                    paddingTop: '2px'
                                                                                                                                });
                                                                                    //Этап 7-5
                                                                                                                                cur_animation_val = 84;
                                                                                                                                count_animation = 1;
                                                                                                                                phaseSeven_one = setInterval(function(){
                                                                                                                                    if (count_animation <= 14){                                                                         //14
                                                                                                                                        cur_animation_val -= 6;
                                                                                                                                        jQuery('#draggable5').css({
                                                                                                                                            transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                                                                                                                                            background: '#fff url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/mo_left.png) 0 0/100% no-repeat',
                                                                                                                                            color: 'transparent',
                                                                                                                                            borderWidth: '1px',
                                                                                                                                            paddingTop: '4px'
                                                                                                                                        });
                                                                                                                                        count_animation += 1;
                                                                                                                                    } else if(count_animation <= 20) {                                                         //120
                                                                                                                                        count_animation += 1;
                                                                                                                                    } else {    
                                                                                                                                        clearInterval(phaseSeven_one);
                                                                                                                                        count_animation = 1;
                                                                                                                                        jQuery('#draggable5').css({
                                                                                                                                            transform: 'rotate(-'+0+'deg) scale(1)',
                                                                                                                                            background: 'transparent',
                                                                                                                                            color: 'red',
                                                                                                                                            borderWidth: '2px',
                                                                                                                                            paddingTop: '2px'
                                                                                                                                        });
        //Фаза 8
                                                                                                                                        cur_animation_val = 0;
                                                                                                                                        count_animation = 1;
                                                                                                                                    //анимация против часовой стрелки
                                                                                                                                        jQuery('.triangle').css({
                                                                                                                                            transform: 'scale(0.1) rotateY(180deg)',
                                                                                                                                            left: '-190px'
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
                                                                                                                                                                        transform: 'scale(0.1) rotateY(0deg)',
                                                                                                                                                                        left: '-185px'
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
