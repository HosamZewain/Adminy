/*
    Theme Name: Adminty
    Theme URI: http://www.roqay.com
    Author: Hosam Zewain
    Author URI: http://www.hosamzewain.com
    Description:  Free Admin Panal
    Version: 1.0
*/

(function(factory) {
    if (typeof define === 'function' && define.amd) {
// AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
// CommonJS
        factory(require('jquery'));
    } else {
// Browser globals
        factory(jQuery);
    }
}(function($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
// This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
// Replace server-side written pluses with spaces.
// If we can't decode the cookie, ignore it, it's unusable.
// If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) {
        }
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function(key, value, options) {
// Write
        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }
// Read
        var result = key ? undefined : {};
// To prevent the for loop in the first place assign an empty array
// in case there are no cookies at all. Also prevents odd result when
// calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
// If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
// Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
// Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, {expires: -1}));
        return !$.cookie(key);
    };
}));
$(document).ready(function() {

    $(".last-foot").append("<p class='english'>Released as Open Source under the <a href='http://www.opensource.com/licenses'>Creative Commons Attribution 4.0 license </a>    -   By : <a href='http://www.roqay.com'>Roqay </a> -  Ver. 1.0.0</p> ");

    if ($.cookie("href") == undefined) {
        x = "css/light_style.css";
        $("#css").attr("href", x);
    } else {
        x = $.cookie("href");
        $("#css").attr("href", x);

    }
    $(".dark").click(function() {
        x = "css/dark_style.css";
        $("#css").attr("href", x);
        $.cookie("href", x);
    });
    $(".light").click(function() {
        x = "css/light_style.css";
        $("#css").attr("href", x);
        $.cookie("href", x);
    });
});
