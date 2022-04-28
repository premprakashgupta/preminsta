 $(document).ready(function(){
        
//     slide --------------------
             $('#right').click(function(event) {
        event.preventDefault();
  $('#status').animate({
    scrollLeft: "+=200px"
  }, "slow");
    });
    $('#left').click(function(event) {
        event.preventDefault();
  $('#status').animate({
    scrollLeft: "-=200px"
  }, "slow");
    });
     
//     more function----------------------------
     $('.more').click(function(){
         $(this).prev().addClass('whitespace');
         $(this).hide();
     });
     
     
//     profile section display ------------------
     $('#profile').click(function(){
         
         $('.profile_section').fadeToggle("500");
         $('.profile_section').css('transition','2s');
         console.log("click");
         
     });
     
//     for like function-------------------
     
     $('.fa-heart').click(function(){
         var v=$(this).css('color');
         console.log(v);
         if(v!='rgb(33, 37, 41)')
             {
                 console.log('syam');
                 $(this).removeClass('fa');
                 $(this).addClass('far');
                $(this).css('color','rgb(33, 37, 41)');
             }
         else{
             $(this).removeClass('far');
        $(this).addClass('fa');
         $(this).css('color','hotpink');
         }
//         $(this).css('background','red');
     });
     
     
//     heart add---------------------------------
     
    
     $('.post_content').dblclick(function(){
         $(this).append('<span class="glowheart"><i class="fa fa-heart"></i></span>');
        setTimeout(function(){
  $('.glowheart').remove();
}, 800);
         var v=$(this).next().children().find('.fa-heart');
        v.removeClass('far');
       v.addClass('fa');
        v.css('color','hotpink');
         
  });
     
//    comment emoji -------------------------- 
     
     $('.comment_input input').focusin(function(){
         $(this).prev().removeClass('fa-smile-beam');
         $(this).prev().addClass('fa-laugh-beam');
         console.log("radha");
     })
     $('.comment_input input').focusout(function(){
         $(this).prev().removeClass('fa-laugh-beam');
         $(this).prev().addClass('fa-smile-beam');
         console.log("radha");
     })
     
     
     
     
    });