// Typewriter
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }

        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.1rem solid #3E2723; padding-right: 0.4rem; text-shadow: 0.15px 0.07px 1.5px #fff; }";
        document.body.appendChild(css);
    };

    // Smooth Scrolling
    (function (window, undefined) {
        'use strict';
        var height_fixed_header = 0,
            speed = 650,
            moving_frequency = 15,
            links = document.getElementsByTagName('a'),
            href;
    
        for (var i = 0; i < links.length; i++) {
            href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
            if (href !== null && href.length > 1 && href.indexOf('#') !== -1) {
                links[i].onclick = function () {
                    var element,
                        href = this.attributes.href.nodeValue.toString(),
                        url = href.substr(0, href.indexOf('#')),
                        id = href.substr(href.indexOf('#') + 1);
                    if (element = document.getElementById(id)) {
    
                        var hop_count = (speed - (speed % moving_frequency)) / moving_frequency,
                            getScrollTopDocumentAtBegin = getScrollTopDocument(),
                            gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;
    
                        if (window.history && typeof window.history.pushState == 'function')
                            window.history.pushState({}, undefined, url + '#' + id);
    
                        for (var i = 1; i <= hop_count; i++) {
                            (function () {
                                var hop_top_position = gap * i;
                                setTimeout(function () { window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin); }, moving_frequency * i);
                            })();
                        }
    
                        return false;
                    }
                };
            }
        }
    
        var getScrollTopElement = function (e) {
            var top = height_fixed_header * -1;
    
            while (e.offsetParent != undefined && e.offsetParent != null) {
                top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
                e = e.offsetParent;
            }
    
            return top;
        };
    
        var getScrollTopDocument = function () {
            return window.pageYOffset !== undefined ? window.pageYOffset : document.documentElement.scrollTop !== undefined ? document.documentElement.scrollTop : document.body.scrollTop;
        };
    })(window);

const year = document.getElementById('year');
const currentYear = (new Date().getFullYear());
(currentYear === 2017) ? year.textContent = '2017' : year.textContent = `2017-${currentYear}`;
