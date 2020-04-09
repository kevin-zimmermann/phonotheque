function closeMenu($this){
    $parent = $this.closest('body');
    setTimeout(function(){
        $('.CanvasMenu').removeClass('active')
    },740);
    $parent.find('.menu-nav-left').animate({opacity:0}).delay(400).queue(function (next) {
        $(this).css('display', 'none');
        next();
    });
    $parent.find('.menu-nav-right').animate({left: -$parent.find('.menu-nav-left').width()}, 700).queue(function (next) {
        $(this).css('display', 'none');
        next();
    });
}
function existMenu($parent){
    $parent.find('.menu-deroulant').animate({
        opacity: 0,
    }, 100).queue(function (next) {
        $(this).removeClass('menu-active');
        next();
    });
}
$(document).ready(function() {
    $(window).scroll(function() {
        $header = $('header');
        if($(window).scrollTop() <= 5 && $header.hasClass('is-scroll'))
        {
            $header.removeClass('is-scroll');
        }
        else if (!$header.hasClass('is-scroll') && $(window).scrollTop() > 5)
        {
            $header.addClass('is-scroll');
        }
    });
    $('.category').click(function() {
        if($(this).find('.menu-deroulant').hasClass('menu-active'))
        {
            existMenu($(this));
        }
        else
        {
            $(this).find('.menu-deroulant').addClass('menu-active').animate({
                opacity: 1,
            }, 100);
        }
    });
    $('main').click(function() {
        $parent = $(this).closest('body');
        if($parent.find('.menu-deroulant').hasClass('menu-active'))
        {
            existMenu($parent);
        }
    });
    $('.hamburger-menu').click(function () {
        $parent = $(this).closest('body');
        $parent.find('.CanvasMenu').addClass('active');
        $parent.find('.menu-nav-left').css('display', 'block').animate({opacity:1});
        $parent.find('.menu-nav-right').css('display', 'block').animate({left: '0'}, 600);
    });
    $('.menu-nav-left').click(function () {
        closeMenu($(this));
    });
    $('.CanvasMenu-close').click(function () {
        closeMenu($(this));
    });
    $('.CanvasMenu-open').click(function(){
        $parent = $(this).closest('.CanvasMenu-cat');
        if($parent.hasClass('active')){
            $parent.removeClass('active');
            $parent.find('.CanvasMenu-all-item').stop(true,true).slideUp();
        }else{
            $parent.addClass('active');
            $parent.find('.CanvasMenu-all-item').stop(true,true).slideDown();
        }
    });
});