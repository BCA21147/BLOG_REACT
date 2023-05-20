$(document).ready(function(){

    $('.owl-carousel').owlCarousel({
        loop:true,
        center:true,
        margin:0,
        nav:true,
        autoplay:true,
        autoplayTimeout:4000,
        URLhashListener:true,
        navText:['<i class="fa-solid fa-angle-left"></i>','<i class="fa-solid fa-angle-right"></i>'],
        animateIn:'animate__fadeInRight',
        animateOut:'animate__fadeOutLeft',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

});