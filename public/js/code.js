$(document).ready(function() {
    $('.category-icon').mouseenter(function(e) {
        $(this).children('a').children('img').animate({ height: '200', left: '0', top: '0', width: '220'}, 100);

        
    }).mouseleave(function(e) {
        $(this).children('a').children('img').animate({ height: '250', left: '-20', top: '-20', width: '260'}, 100);
        
    });
});