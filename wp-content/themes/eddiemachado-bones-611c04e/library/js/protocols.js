    var count_animation = 1,
        cur_animation_val = 0,
        v2;

    v2 = function(){
        //фаза 1
        count_animation = 1;
        changing = setInterval(function(){
            // console.log(event.target);
            if (count_animation >= 120){
                clearInterval(changing);
            }
            cur_animation_val += 6;
            jQuery('#draggableClean').css('transform', 'rotate(-'+cur_animation_val+'deg)');
            // jQuery(this).css('top', cur_animation_val+'px');
            count_animation += 1;
        }, 1000);

    }
