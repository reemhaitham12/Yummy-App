// ! navbar open and close //

$(document).ready(function() {
    $('.open-close-icon').on('click', function() {
        if ($('.navbar').hasClass('open')) {
            CloseNavbar();
        } else {
            OpenNavbar();
        }
    });
});

function OpenNavbar() {
    $('.navbar').animate({
        left: '0'
    }, 500);
    $('.navout').animate({
        left: '250px'
    }, 500);
    $('.navbar').addClass('open');
    $('.open-close-icon').removeClass('fa-align-justify').addClass('fa-x');
    animateNavbarItems(true); 
}
function CloseNavbar() {
    $('.navbar').animate({
        left: '-250px'
    }, 500);
    $('.navout').animate({
        left: '0'
    }, 500);
    $('.navbar').removeClass('open');
    $('.open-close-icon').removeClass('fa-x').addClass('fa-align-justify');
    animateNavbarItems(false); 
}
function animateNavbarItems(open) {
    if (open) {
        for (let i = 0; i < 5; i++) {
            $('.links ul li').eq(i).animate({
                top: 0
            }, (i + 5) * 100);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            $('.links ul li').eq(i).animate({
                top: '100px'
            }, (i + 5) * 100);
        }
    }
}
// ! end  navbar open and close //









