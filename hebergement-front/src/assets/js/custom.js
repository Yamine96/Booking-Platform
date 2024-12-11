//(function ($) {
  
  //"use strict";

  // Ensure that jQuery is available
  //if (typeof $ === 'undefined') {
    //console.error('jQuery is not loaded.');
    //return;
  //}

  // Check if Backstretch is available
  //if (typeof $.fn.backstretch === 'undefined') {
    //console.error('Backstretch is not loaded.');
    //return;
  //}

  // HERO SLIDE
  //try {
    //console.log("Initializing Backstretch...");
    //console.log("Checking image paths:");
    //console.log("Path 1: assets/images/slideshow/image1.jpg");
    //console.log("Path 2: assets/images/slideshow/image2.jpg");
    //console.log("Path 3: assets/images/slideshow/image3.jpg");

    //$.backstretch([
      //"assets/images/slideshow/image1.jpg", 
      //"assets/images/slideshow/image2.jpg",
      //"assets/images/slideshow/image3.jpg"
    //], {
      //duration: 2000,
      //fade: 750
    //});

    //console.log("Backstretch initialized successfully.");
  //} catch (error) {
    //console.error('Error initializing Backstretch:', error);
  //}
  
  // Check if Owl Carousel is available
  if (typeof $.fn.owlCarousel === 'undefined') {
    console.error('Owl Carousel is not loaded.');
    return;
  }

  // REVIEWS CAROUSEL
  try {
    $('.reviews-carousel').owlCarousel({
      items: 3,
      loop: true,
      dots: false,
      nav: true,
      autoplay: true,
      margin: 30,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    });
  } catch (error) {
    console.error('Error initializing Owl Carousel:', error);
  }

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;
  });

  function scrollToDiv(element, navheight) {
    if (element.length === 0) {
      console.error('Element not found for smooth scroll.');
      return;
    }
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop - navheight;

    $('body,html').animate({
      scrollTop: totalScroll
    }, 300);
  }

//})(window.jQuery);