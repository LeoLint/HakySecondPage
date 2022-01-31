const translations = {
    "ru": {
        "partners": "Партнёры",
        "aboutUs": "Про нас"
    },
    "ua": {
        "partners": "Партнери",
        "aboutUs": "Про нас"
    },
    "pl": {
        "partners": "Partners",
        "aboutUs": "Про нас"
    }
};

$(document).ready(function () {
    const availableLang = ['pl', 'ru', 'ua'];

    // get select from DOM
    const select = $('.change_lang');

    // getting current lang from url
    let hash = window.location.hash;
    hash = hash.substring(1);

    // checking if lang is in available list
    if (availableLang.includes(hash)) {
        select.val(hash);
        applyLanguage();
    } else {
        // default language
        select.val('ua');
    }

    // set listener
    select.change(function () {
        cnangeURLLanguage();
    });

    function cnangeURLLanguage() {
        let lang = select.val(); // get select value
        location.href = window.location.pathname + '#' + lang; // set new url with selected language
        location.reload();
    }
    
    function applyLanguage() {
        $('.menu_subtitle').text(translations[hash].partners);
    }
});


