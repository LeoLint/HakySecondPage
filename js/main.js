$(document).ready(() => {
    $('.about_wrapper-button').click(() => {
        $('.about_toggle-paragraph').toggle('open');
    })
    $('#workButton').click(() => {
        $('.work_wrapper-text--list').toggle('open');
    })
    $('#aboutUs').click(function() {
        $('html, body').animate({
            scrollTop: $('.about').offset().top
        }, 700);
    });
    $('.mobile_button').click(() => {
        $('.menu').toggle('.slide');
    })
    $('#work').click(function() {
        $('html, body').animate({
            scrollTop: $('.work').offset().top
        }, 700);
    });
    $('#partners').click(function() {
        $('html, body').animate({
            scrollTop: $('.partners').offset().top
        }, 1000);
    });
    $('#feedback').click(function() {
        $('html, body').animate({
            scrollTop: $('.feedback').offset().top
        }, 1000);
    });
});

