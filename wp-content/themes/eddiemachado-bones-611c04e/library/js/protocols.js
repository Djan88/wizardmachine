    var count_animation = 1,
        cur_animation_val = 0,
        phaseOne,
        phaseTwo,
        phaseThree,
        phaseFour,
        triangleSvg='<svg id="example" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" width="360.26767" height="318.20004" id="svg2816" xml:space="preserve" inkscape:version="0.48.4 r9939" sodipodi:docname="AJAX.svg"><metadata id="metadata81"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type metadata><sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1920" inkscape:window-height="1057" id="namedview79" showgrid="false" fit-margin-top="0.1" fit-margin-left="0.1" fit-margin-right="0.1" fit-margin-bottom="0.1" inkscape:zoom="1.4142137" inkscape:cx="81.708362" inkscape:cy="105.66257" inkscape:window-x="-8" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="svg2816" showguides="true" inkscape:guide-bbox="true" /><defs id="defs2820"><clipPath id="clipPath2832"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path2834" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath2840"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path2842" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath2858"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path2860" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath2864"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path2866" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3306"><path d="m 199.238,472.977 0,-29.74 29.744,0 0,29.74" id="path3308" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3322"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path3324" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3330"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path3332" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3344"><path d="m 88.233,387.221 0,-28.335 32.08,0 0,28.335" id="path3346" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3462"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path3464" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3470"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path3472" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3490"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path3492" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3496"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path3498" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3520"><path d="m 254.788,326.215 0,-28.309 28.326,0 0,28.309" id="path3522" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3544"><path d="m 145.049,326.142 0,-28.333 28.342,0 0,28.333" id="path3546" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3682"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path3684" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3690"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path3692" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3980"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path3982" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath3988"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path3990" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4010"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path4012" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4016"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path4018" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4062"><path d="m 200.163,177.773 0,-28.284 28.283,0 0,28.284" id="path4064" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4090"><path d="m 34.886,177.515 0,-51.632 30.367,0 0,51.632" id="path4092" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4106"><path d="m 34.886,177.515 0,-51.632 30.367,0 0,51.632" id="path4108" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4272"><path d="m 34.886,177.515 0,-51.632 30.367,0 0,51.632" id="path4274" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4304"><path d="m 254.653,176.442 0,-48.167 28.317,0 0,48.167" id="path4306" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4310"><path d="m 253.565,177.983 31.181,0 0,-49.183 -31.181,0 0,49.183 z" id="path4312" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4316"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path4318" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4322"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path4324" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4456"><path d="m -0.24,595.138 317.48,0 0,-595.276 -317.48,0 0,595.276 z" id="path4458" inkscape:connector-curvature="0" /></clipPath><clipPath id="clipPath4464"><path d="m 0.03,595.32 317.46,0 0,-595.32 -317.46,0 0,595.32 z" id="path4466" inkscape:connector-curvature="0" /></clipPath></defs><path inkscape:connector-curvature="0" sodipodi:nodetypes="scccscscccss" /><path inkscape:connector-curvature="0" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none" id="path3121" d="m 322.51281,286.28317 -284.757805,0 L 180.13391,39.806513 z" sodipodi:nodetypes="cccc" /></svg>',
        v2;

    v2 = function(){
    //фаза 1
        count_animation = 1;
        phaseOne = setInterval(function(){
            if (count_animation <= 10){                                                                         //120
                cur_animation_val += 6;
                jQuery('#draggableClean').css({
                    transform: 'rotate(-'+cur_animation_val+'deg) scale(2)',
                    background: 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat'
                });
                jQuery('#draggable2').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                jQuery('#draggableS2, #draggableS2_1').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/travma.jpg) 0 0/100% no-repeat');
                jQuery('#draggable2, #draggableS2, #draggableS2_1').css({
                    color: 'transparent',
                    transform: 'scale(2)'
                });
                count_animation += 1;
            } else {
                clearInterval(phaseOne);
                count_animation = 1;
                jQuery('#draggable2, #draggableS2, #draggableS2_1, #draggableClean').css({
                    background: 'transparent',
                    transform: 'scale(1)',
                    color: 'red'
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
                    if (count_animation <= 10){                                                                 //120
                        cur_animation_val += 6;
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                        count_animation += 1;
                    } else {
                        clearInterval(phaseTwo);
                        count_animation = 1;
                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                        jQuery('#draggableClean_2, #draggableClean_3, #draggableS1').css({
                            background: 'transparent',
                            transform: 'rotate(0deg) scale(1)',
                            color: 'red'
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
                            if (count_animation <= 10){                                                         //120
                                cur_animation_val += 6;
                                jQuery('#draggableClean_2').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                                jQuery('#draggableS4').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat');
                                jQuery('#draggable4').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                                jQuery('#draggable4, #draggableS4').css({
                                    color: 'transparent',
                                    transform: 'scale(2)'
                                });
                                if (count_animation >= 5 && count_animation <= 10){                               //60
                                    jQuery('#draggableS4').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
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
                                    color: 'red'
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
                                jQuery('#draggableClean_2, #draggableClean_3').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/lovushka.jpg) 0 0/100% no-repeat');
                                jQuery('#draggableClean_2, #draggableClean_3').removeClass('inopaciti');
                                jQuery('#draggableClean_2, #draggableClean_3, #draggable5, #draggableD5, #draggableS5, #draggableS6').css({
                                    transform: 'scale(2)',
                                    color: 'transparent'
                                });
                                phaseFour = setInterval(function(){
                                    if (count_animation <= 10){                                                //120
                                        cur_animation_val += 6;
                                        jQuery('#draggableClean_2, #draggableClean_3').css('transform', 'rotate(-'+cur_animation_val+'deg) scale(2)');
                                        jQuery('#draggable5, #draggableD5').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/disfunction.jpg) 0 0/100% no-repeat');
                                        jQuery('#draggableS5, #draggableS6').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/povregdenie_demona.jpg) 0 0/100% no-repeat');
                                        jQuery('#draggable5, #draggableD5, #draggableS5, #draggableS6').css('color', 'transparent');
                                        if (count_animation >= 5 && count_animation <= 10){                      //60
                                            jQuery('#draggableS5, #draggableS6').css('background', 'url(/wp-content/themes/eddiemachado-bones-611c04e/library/images/filtr.jpg) 0 0/100% no-repeat');
                                        }
                                        count_animation += 1;
                                    } else {
                                        clearInterval(phaseFour);
                                        count_animation = 1;
                                        jQuery('#draggableClean_2, #draggableClean_3').addClass('inopaciti');
                                        jQuery('#draggableClean_2, #draggableClean_3').css({
                                            background: 'transparent',
                                            transform: 'rotate(0deg) scale(1)'
                                        });
                                        jQuery('#draggable5, #draggableD5, #draggableS5, #draggableS6').css({
                                            background: 'transparent',
                                            transform: 'scale(1)',
                                            color: 'red'
                                        });
    //Фаза 5
                                        cur_animation_val = 0;
                                        count_animation = 1;
                                        jQuery('#draggable1').append(triangleSvg).find('#example').addClass('example_1');
                                        var a = new Vivus('example_1', {type: 'delayed', duration: 100});
                                        a.play();
                                    }
                                }, 1000);
                            }
                        }, 1000);
                    }
                }, 1000);
            }
        }, 1000);
    }
