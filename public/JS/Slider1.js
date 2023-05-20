$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        nav:true,
        // center: true,
        stagePadding: 0,
        // mouseDrag:true,
        // touchDrag:true,
        // pullDrag:true,
        // freeDrag:true,
        // stagePadding:0,
        // merge:true,
        // autoWidth:true,
        // startPosition:3,
        // URLhashListener:true,
        // nav:false,
        // rewind:true,
        navText:['Prev','Next'],
        // dots:false,
        // dotsEach:true,
        // dotsData:true,
        autoplay:true,
        autoplayTimeout:2000,
        // autoplayHoverPause:true,
        // responsiveRefreshRate:200,
        animateIn:'animate__flipInX',
        animateOut:'animate__slideOutDown',
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:1,
            }
        }
    });
});







// $(document).ready(function(){

        // CODE

// });