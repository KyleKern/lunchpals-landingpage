var widthToAnimate
var timerToShowScrollDown = 7500
var scrollDownIntervall
var scrollEnabled = false;
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

    var margin = $('.navItem').first().height()
    var curr = 0
    var currMargin = [-2, -1, 0, 1]
    $('.navItem').each(function(){
        $(this).html('<span class="square">&#8213;</span>' + $(this).html())
        $(this).css({marginTop: margin * currMargin[curr++]})
        $(this).trigger('mouseenter')
        $(this).trigger('mouseleave')
    })
    
    $('.navItem').first().trigger('mouseenter').trigger('mouseleave')

    $('#SignUp').css({marginRight: -$(this).width() / 2})
    
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
    
    $('.left').css({marginLeft: -100, opacity: 0})
    $('.right').css({marginRight: -100, opacity: 0})
    widthToAnimate = $('.centered').find('.product').width()
    $('.centered').find('.product').css({width: 50, opacity: 0})
    
    scrollDownIntervall = setInterval(function(){
        timerToShowScrollDown -= 100
        if(timerToShowScrollDown <= 0){
            clearInterval(scrollDownIntervall)
            $('#ScrollDown').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(400)
        }
    }, 100)

    setTimeout(function(){
        scrollEnabled = true;
        console.log('scroll activated')
    }, 3500)
    
})

/* ######################## SCROLLING ######################## */
    
    var scrollEnableAfter = 1500
    var scrollIntervall = 1000
    var timer = scrollEnableAfter
    var interval
    var section = 0

    $(window).on('mousewheel', function(e){
        e.preventDefault()
        if(scrollEnabled) {
            if (timer >= scrollEnableAfter) {
                if (e.originalEvent.wheelDelta / 120 > 0) {
                    console.log('scrolling up !')
                    if (section > 0) scroll('up')
                } else {
                    console.log('scrolling down !')
                    if (section < $('.wrapper').length - 1) scroll('down')
                }
            }
        }
    
    });
    
    $(window).keydown(function(e){
        if (e.keyCode == 38 || e.keyCode == 40) e.preventDefault()
        if(scrollEnabled){
            if(timer >= scrollIntervall){
                if (e.keyCode == 38) {
                    if(section > 0) scroll('up')
                    return true
                }
                if(e.keyCode == 40){
                    if(section < $('.wrapper').length - 1) scroll('down')
                    return true
                }
            }
        }
    })
    
    function scroll(direction){
        timer = 0;
        clearInterval(interval)
        
        fadeOutCurrentSection()
        
    	if(direction == 'up') {
            section--;
            if(section < 0){
                section = 0
            }
        }else if(direction == 'down'){
            section++;
            if(section > $('.wrapper').length - 1){
                section = $('.wrapper').length - 1
            }
        }
        console.log("Section to Scroll: " + section)
        
        scrollTo($("#" + section).offset().top, scrollIntervall)
            
        interval = setInterval(function () { 
            timer += 50 }, 50)
    }
    
    function scrollTo(offset, duration){
        clearInterval(scrollDownIntervall)
        $('#ScrollDown').fadeOut(300)
        checkNavigationBounds()
        $("#" + section).find('.left').animate({marginLeft: 0, opacity: 1}, scrollIntervall)
        $("#" + section).find('.right').animate({marginRight: 0, opacity: 1}, scrollIntervall)
        $("#" + section).find('.centered').find('.product').animate({width: widthToAnimate, opacity: 1}, scrollIntervall)
        $('html,body').animate({scrollTop: offset}, duration, function(){
                    checkBackToTopBounds()
                })
    }
    
    function fadeOutCurrentSection(){
        var currentSection = $("#" + section)
        currentSection.find('.left').animate({opacity: 0}, 500, function(){
            currentSection.find('.left').css({marginLeft: -100})
        })
        currentSection.find('.right').animate({opacity: 0}, 500, function(){
            currentSection.find('.right').css({marginRight: -100, opacity: 0})
        })
        currentSection.find('.centered').find('.product').animate({opacity: 0}, 500, function() {
            currentSection.find('.centered').find('.product').css({width: 100})
        })
    }
    
    
    
/* ######################## BACK TO TOP BTN ######################## */
    
    function checkBackToTopBounds(){
        if($('html, body').scrollTop() >= $("#" + 2).offset().top){
                $('#BackToTop').fadeIn(300)
            }else{
                $('#BackToTop').fadeOut(300)
            }
        if($('html, body').scrollTop() >= $("#" + 1).offset().top && $('html, body').scrollTop() < $('html, body').height() - $(window).height()){
            $('#SignUp').fadeIn(300)
            $('#SignUp').animate({marginRight: 0}, 500)
        }
    }
    
    $('#BackToTop').click(function(){
        section = 0
        scrollTo(0, 750)
        $('#BackToTop').fadeOut(300)
    })
    
    
/* ######################## NAVIGATION ######################## */

    $('#SignUp').hover(function() {
        $(this).attr('src', 'img/SignUpBtnHv.png')
    }, function () {
        $(this).attr('src', 'img/SignUpBtn.png')
    });

    function checkNavigationBounds(){

        if(section == 0){
            $('.navItem').animate({color: '#ffffff'}, 500)
            $('#SignUp').animate({marginRight: -$(this).width() / 2}, 500)
            $('#SignUp').fadeOut(300)
        }else{
            $('.navItem').animate({color: '#61cca2'}, 500)
            if(section == $('.wrapper').last().attr('id')){
                $('.navItem').last().animate({color: '#ffffff'}, 500).prev().animate({color: '#ffffff'}, 500)
                $('#SignUp').animate({marginRight: -$(this).width() / 2}, 500)
                $('#SignUp').fadeOut(300)
            }
        }
    }

    $('.navItem').mouseenter(function(){
        $(this).find('.square').finish().animate({opacity: 0}, 300)
        $(this).finish().animate({marginRight: 0}, 300)
        console.log('Hover in')
    })
    $('.navItem').mouseleave(function(){
        $(this).finish().animate({marginRight: - $(this).width() + $(this).find('.square').width()}, 300)
        $(this).find('.square').finish().animate({opacity: 1}, 300)
        console.log('Hover out')
    })
    $('.navItem').click(function(){
        fadeOutCurrentSection()
        section = $('#' + $(this).find('.itemTitle').text()).find('.wrapper').first().attr('id')
        scrollTo($('#' + $(this).find('.itemTitle').text()).find('.wrapper').first().offset().top, 750)
    })
    
    $('#ScrollDown').click(function() {
        var e = $.Event('keydown', {keyCode: 40})
        $(window).trigger(e)
    })
    
    $('#SignUp').click(function() {
        fadeOutCurrentSection()
        section = $('footer').find('.wrapper').first().attr('id')
        scrollTo($('footer').find('.wrapper').first().offset().top, 750)
    })

    $('#SignUpBtn').click(function(e) {
        e.preventDefault()
        resetForm($('#SignUpForm'));
    })
    
    function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox')
         .removeAttr('checked').removeAttr('selected');
    }

    