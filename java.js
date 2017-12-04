
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
        $(this).html('<span class="square">&#8213;</span>' + $(this).html())
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
        if(timer >= scrollIntervall){
            if(e.originalEvent.wheelDelta / 120 > 0) {
                console.log('scrolling up !')
                scroll('up')
            }else{
                console.log('scrolling down !');
                scroll('down')
            }
        }
    
    });
    
    $(window).keydown(function(e){
        if (e.keyCode == 38 || e.keyCode == 40) e.preventDefault()
        if(timer >= scrollIntervall){
            if (e.keyCode == 38) {
                scroll('up')
                return true
            }
            if(e.keyCode == 40){
                scroll('down')
                return true
            }
        }
    })
    
    function scroll(direction){
        timer = 0;
        clearInterval(interval)
    	if(direction == 'up') {
            section--;
            if(section < 0) section = 0;
        }else if(direction == 'down'){
            section++;
            if(section > $('.wrapper').length - 1) section = $('.wrapper').length - 1;
        }
        console.log("Section to Scroll: " + section)
        
        scrollTo($("#" + section).offset().top, scrollIntervall / 1.5)
            
        interval = setInterval(function () { 
            timer += 50; }, 50);
    }
    
    function scrollTo(offset, duration){
        checkNavigationBounds()
        $('html,body').animate({scrollTop: offset}, duration, function(){
                    checkBackToTopBounds()
                    if($('#' + section).hasClass('faded')){
                        var fader = $('#' + section)
                        fader.find('.fadeOut').fadeOut(500, function(){
                        fader.find('.fadeIn').animate({opacity: 1},1000)
                        })
                    }
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
        section = 0
        scrollTo(0, 750)
        $('#BackToTop').fadeOut(300)
    })
    
    
/* ######################## NAVIGATION ######################## */

    function checkNavigationBounds(){
        if(section == 0){
            $('.navItem').animate({color: '#ffffff'}, 500)
        }else{
            $('.navItem').animate({color: '#61cca2'}, 500)
            if(section == $('.wrapper').last().attr('id')){
                $('.navItem:nth-last-child(2)').animate({color: '#ffffff'}, 500)
                $('.navItem').last().animate({color: '#ffffff'}, 500)
            }
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
        section = $('#' + $(this).find('.itemTitle').text()).find('.wrapper').first().attr('id')
        scrollTo($('#' + $(this).find('.itemTitle').text()).find('.wrapper').first().offset().top, 750)
    })
    