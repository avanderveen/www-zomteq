$(function() {
  var slideWidth = 0;
  function detectSlideWidth() {
    var w = 0, slides = $('ul.slides > li');
    w = $('ul.slides').width() - slides.css('paddingLeft') * 2;
    $(slides).each(function() {
      $(this).width(w);
    });
    var n = $('ul.slides').scrollLeft() / slideWidth;
    $('ul.slides').scrollLeft(10000000);
    slideWidth = $('ul.slides').scrollLeft() / ($('ul.slides > li').length - 1);
    $('ul.slides').scrollLeft(n * slideWidth);
  }

  (function () {
    var maxwidth = 0, w;
    function getmaxwidth() {
      w = $(this).width();
      if( w > maxwidth )
        maxwidth = w;
    }
    function setevenwidth() {
      $(this).width(maxwidth);
    }
    $('ul.slides > li').each(getmaxwidth);
    $('ul.slides > li').each(setevenwidth);

    maxwidth = 0;
    $('li.projects > ul > li').each(getmaxwidth);
    $('li.projects > ul > li').each(setevenwidth);
  })();
  
  detectSlideWidth();  
  $('ul.nav > li').click(function() {
    $(this).addClass('read');
    var wasActive = $(this).hasClass('active'),
        count     = $(this).prevAll().length;
    $('ul.nav > li').removeClass('active');
    if( !wasActive )
      $(this).addClass('active');
    $('ul.slides').animate({scrollLeft: count * slideWidth}, 500);
  });

  $('.navleft').click(function() {
    var prev = $('ul.nav > li.active').prev();
    console.log(prev);
    if( prev.length == 0  )
      prev = $('ul.nav > li:last-child');
    if( prev.length == 0 )
      return;
    prev.click();
  });

  $('.navright').click(function() {
    var next = $('ul.nav > li.active').next();
    console.log(next);
    if( next.length == 0 )
      next = $('ul.nav > li:first-child');
    if( next.length == 0 )
      return;
    next.click();
  });
  
  $(window).resize(detectSlideWidth);

  /* contact form */
  (function() {
    var up = false;
    $('.contactbox').hide().click(function() {
      return false;
    });
    $('.contactlink').click(function() {
      $('.contactbox').fadeToggle();
      up = !up;
      return false;
    });
    $(document).click(function() {
      if( up ) $('.contactbox').fadeOut();
      up = false;
    });
  })();
});

