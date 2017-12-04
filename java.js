
$(document).ready(function(){
    
    scrollTo(0, 750)
    var h1 = $('#Logo').find('h1').first()
    var p = $('#Logo').find('p').first()
    h1.css({opacity: 0, display: 'block'})
    p.css({opacity: 0, display: 'block'})
    
    $('footer').find('.wrapper').css('min-height', '50vh')
    
    $('.centeredContainer').each(function(){
        
        $(this).height($(this).closest('.wrapper').height())  
        console.log($(this).height())
        
    })
    var val = 0
    $('.wrapper').each(function(){
        $(this).attr('id', val++)
    })
    
    $('.navItem').each(function(){
        $(this).css({opacity: 0})
        $(this).html('<span class="square">&#9632;</span>' + $(this).html())
        $(this).trigger('mouseenter')
        $(this).trigger('mouseleave')
    })
    
    $('.navItem').first().trigger('mouseenter').trigger('mouseleave')
    
    var logo = $('#Logo').find('img').first()
    logo.css({marginTop: $('#Logo').height() / 2 - logo.height() / 2})
    logo.animate({opacity: 1}, 2000, function(){
        console.log("Heights")
        console.log(logo.css('marginTop'))
        console.log(h1.height())
        console.log(p.height())
        logo.animate({marginTop: $('#Logo').height() / 2 - logo.height() / 2 - h1.height() / 2 - p.height() / 2}, 500, function(){
            h1.animate({opacity: 1}, 500)
            p.animate({opacity: 1}, 500, function(){
                $('.navItem').each(function(){
                    $(this).animate({opacity: 1}, 1000)
                })
            })
        })
    })
    
})

/* ######################## SCROLLING ######################## */
    
    var scrollIntervall = 1500;
    var timer = scrollIntervall;
    var interval
    var section = 0
    $(window).on('mousewheel', function(e){
        e.preventDefault()
        console.log(timer)
        
        
        if(timer >= scrollIntervall){
            timer = 0;
            clearInterval(interval)
        	if(e.originalEvent.wheelDelta /120 > 0) {
                console.log('scrolling up !');
                section--;
                if(section < 0) section = 0;
            }
            else{
                console.log('scrolling down !');
                section++;
                if(section > $('.wrapper').length - 1) section = $('.wrapper').length - 1;
            }
            console.log("Section to Scroll: " + section)
            
            scrollTo($("#" + section).offset().top, scrollIntervall / 1.5)
                
            interval = setInterval(function () { 
                timer += 50; }, 50);
            }
    
    });
    
    function scrollTo(offset, duration){
        $('html,body').animate({scrollTop: offset}, duration, function(){
                    checkNavigationBounds()
                    checkBackToTopBounds()
                })
    }
    
    
    
/* ######################## BACK TO TOP BTN ######################## */
    
    function checkBackToTopBounds(){
        if($('html, body').scrollTop() >= $("#" + 2).offset().top){
                $('#BackToTop').fadeIn(300)
            }else{
                $('#BackToTop').fadeOut(300)
            }
    }
    
    $('#BackToTop').click(function(){
        scrollTo(0, 750)
        section = 0
    })
    
    
/* ######################## NAVIGATION ######################## */

    function checkNavigationBounds(){
        if($('html, body').scrollTop() > 0){
                $('.navItem').css({'color': '#61cca2'})
            }else{
                $('.navItem').css({'color': '#ffffff'})
            }
    }

    $('.navItem').mouseenter(function(){
        $(this).find('.square').fadeOut(100)
        $(this).finish().animate({marginLeft: 0}, 300)
        console.log('Hover in')
    })
    $('.navItem').mouseleave(function(){
        $(this).find('.square').fadeIn(100)
        $(this).finish().animate({marginLeft: $(this).width() - $(this).find('.square').width()}, 300)
        console.log('Hover out')
    })
    $('.navItem').click(function(){
        scrollTo($('#' + $(this).find('.itemTitle').text()).find('.wrapper').first().offset().top, 750)
        section = $('#' + $(this).find('.itemTitle').text()).find('.wrapper').first().attr('id')
    })
    
/* ######################## IMAGES FADING IN ######################## */

function checkForImgBounds(id){
    $('#' + id).find('img').first().animate({marginLeft: -50})
}