// Typewriter
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement('style');
    css.innerHTML =
        '.typewrite > .wrap { border-right: 0.1rem solid #fff; padding-right: 0.4rem; text-shadow: 1px 2px 1.5px #000; }';
    document.body.appendChild(css);
};

// Slider
$('.skills-slider').slick({
    speed: 750,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    easing: 'ease-out',
});

// Smooth Scrolling
const anchorLinks = ['header', 'about', 'work', 'contact', 'footer'];
const anchors = document.querySelectorAll('.navigate');

anchors.forEach((anchor, i) => {
    anchor.addEventListener('click', function scrollToDiv(e) {
        e.preventDefault();

        const ref = document.getElementById(anchorLinks[i]);

        window.scroll({
            top: anchorLinks[i] === 'footer' ? 0 : ref.offsetTop,
            left: 0,
            behavior: 'smooth'
        });
    });
});

// Navbar styling on scroll
const navbar = document.getElementById('navbar');
const navbarLinks = document.querySelectorAll('nav ul li a');
const header = document.getElementById('header');

window.addEventListener('scroll', e => {
    navbar.classList.add('fixed');
    if (window.scrollY === 0) {
        navbarLinks.forEach(a => {
            a.classList.remove('a_scroll');
        });
        navbar.classList.remove('navbar-bg');
    }
    if (window.scrollY >= header.clientHeight - 20) {
        navbarLinks.forEach(a => {
            a.classList.add('a_scroll');
        });
        navbar.classList.add('navbar-bg');
    }
});

const year = document.getElementById('year');
const currentYear = new Date().getFullYear();
currentYear === 2017
    ? (year.textContent = '2017')
    : (year.textContent = `2017-${currentYear}`);
