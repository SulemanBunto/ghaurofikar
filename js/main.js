/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Portfolio filter
        --------------------*/
        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio__gallery').length > 0) {
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

/*------------------
        Custom Changes
    --------------------*/

    //Counter Animation

/*    document.addEventListener("DOMContentLoaded", function () {
        const counterElement = document.getElementById("audienceCounter"); // Make sure this ID exists
        const targetValue = 1000000; // Target number
        const duration = 4000; // Animation duration in milliseconds
        const increment = targetValue / (duration / 16); // Increment per frame (approx. 60fps)
        let currentValue = 0;
    
        // Function to format the number based on thresholds
        function formatNumber(value) {
            if (value >= 1000000) {
                return "1M+";
            } else if (value >= 1000) {
                return (value / 1000) + "K";
            } else {
                return Math.floor(value);
            }
        }
    
        // Function to animate the counter
        function updateCounter() {
            currentValue += increment;
            if (currentValue >= 1000000) {
                currentValue = 1000000; // Ensure the final value doesn't exceed the target
                counterElement.textContent = formatNumber(currentValue);
                return; // Stop the animation once the target is reached
            }
            counterElement.textContent = formatNumber(currentValue);
            requestAnimationFrame(updateCounter);
        }
    
        // Start the counter animation
        updateCounter();
    });

// Function to animate the counter
function animateCounter() {
    const counters = document.querySelectorAll('.counter_num');
    counters.forEach(counter => {
        const target = +counter.innerText;  // Get the target value
        let count = 0;
        const speed = 200;  // Speed of counting (smaller is faster)
        
        const interval = setInterval(() => {
            count += Math.ceil(target / speed);
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            counter.innerText = count;
        }, 1);
    });
}

// Intersection Observer to detect when the counter section is visible
const counterSection = document.querySelector('#counter-section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start the counter animation when the section is visible
            animateCounter();
            observer.unobserve(entry.target);  // Stop observing after the counter starts
        }
    });
}, { threshold: 0.5 }); // The section is considered visible when 50% is in view

observer.observe(counterSection); */

// Flag to check if the counter has already been animated
let counterStarted = false;

// Function to format the number based on thresholds
function formatNumber(value, targetValue) {
    // If the target value for minutes produced is 500, display '500+'
    if (targetValue === 500 && value >= 500) {
        return "500+"; 
    }
    if (value >= 1000000) {
        return "1M+";
    } else if (value >= 1000) {
        return (value / 1000) + "K";
    } else {
        return Math.floor(value); // Ensure it's a number without zero showing
    }
}

// Function to animate a single counter from 0 to target value
function animateCounter(counterElement, targetValue, duration) {
    const increment = targetValue / (duration / 16); // Increment per frame (approx. 60fps)
    let currentValue = 0;

    // Function to update the counter
    function updateCounter() {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue; // Ensure the final value doesn't exceed the target
            counterElement.textContent = formatNumber(currentValue, targetValue);
            return; // Stop the animation once the target is reached
        }
        counterElement.textContent = formatNumber(currentValue, targetValue);
        requestAnimationFrame(updateCounter);
    }

    // Apply fade-in effect when the counter starts
    counterElement.classList.add('visible');

    // Start the counter animation
    updateCounter();
}

// Intersection Observer to detect when the counter section is visible
const counterSection = document.querySelector('#counter-section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
            // Start the counter animation for all counters when the section is visible
            animateCounter(document.getElementById('completedProjects'), 92, 4000);
            animateCounter(document.getElementById('audienceCounter'), 1000000, 4000);
            animateCounter(document.getElementById('brandCollabs'), 8, 4000);
            animateCounter(document.getElementById('minutesProduced'), 500, 4000);
            
            counterStarted = true;  // Set flag to true so animation doesn't start again
            observer.unobserve(entry.target);  // Stop observing after the counter starts
        }
    });
}, { threshold: 0.5 }); // The section is considered visible when 50% is in view

observer.observe(counterSection);


// Videos Archive



document.addEventListener("DOMContentLoaded", function () {
    const playButtons = document.querySelectorAll(".play-btn");
    const videoModal = document.querySelector(".video-modal");
    const videoPlayer = document.querySelector(".video-modal video");
    const closeBtn = document.querySelector(".close-btn");

    playButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const videoSrc = this.getAttribute("data-video");
            videoPlayer.setAttribute("src", videoSrc);
            videoModal.classList.add("active");
            videoPlayer.play();
        });
    });

    closeBtn.addEventListener("click", function () {
        videoModal.classList.remove("active");
        videoPlayer.pause();
        videoPlayer.removeAttribute("src"); // Stop the video
    });

    videoModal.addEventListener("click", function (e) {
        if (e.target === videoModal) {
            videoModal.classList.remove("active");
            videoPlayer.pause();
            videoPlayer.removeAttribute("src"); // Stop the video
        }
    });
});




})(jQuery);