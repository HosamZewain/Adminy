/**
 * Created by hosamzewain on 8/11/15.
 */
/*global $, alert, window, document*/
(function () {
    "use strict";
    $(".open_close_menu").click(function () {
        $(".main_sidebar").toggleClass("right_sidebar");
        $(".main_container").toggleClass("main_menu_open");
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    $(".user_info").click(function () {
        if ($(".main_container").hasClass("user_side_open")) {
            $(".main_container").removeClass("user_side_open");
            $(".user_details").addClass("close_user_details");
        } else {
            $(".main_container").addClass("user_side_open");
            $(".user_details").removeClass("close_user_details");
        }
    });

    function hideSideBar() {
        if ($(window).width() < 768) {
            $(".main_sidebar").addClass("right_sidebar");
        } else {
            $(".main_sidebar").removeClass("right_sidebar");
        }
    }

    $(window).resize(function () {
        hideSideBar();
    });
    hideSideBar();

    $(".change_lang").click(function () {
        if ($(".lang_css").hasClass("arabic")) {
            $(".lang_css").removeClass("arabic").attr("href", "css/en.css");
        } else {
            $(".lang_css").addClass("arabic").attr("href", "css/ar.css");
        }
    });

    $(".main_sidebar_wrapper li a").click(function (e) {
        if ($(this).next("ul").hasClass("drop_main_menu")) {
            e.preventDefault();
            if ($(this).next("ul").hasClass("opened")) {
                $(this).next("ul").slideUp().removeClass("opened");
            } else {
                $(this).next("ul").slideDown().addClass("opened");
            }
        }
    });

    function toggleFullScreen() {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    $(".full_screen").click(function () {
        toggleFullScreen();
    });


}());