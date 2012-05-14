$(function() {
  var emailTest = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    navleft();
 });

  $('.navright').click(function() {
    navright();
  });
  
  $(window).resize(detectSlideWidth);

  /* contact form - hide/show */
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

/*
** Pausing the association scroll on hover
*/
 (function() {
    var imgs = $('.scrollation > a > img');
    $('.scrollation').hover(function(){
      imgs.css('-webkit-animation-play-state', 'paused'); 
    }, function(){
      imgs.css('-webkit-animation-play-state', 'running'); 
    });
  })();
  
/*
** Key press to change pages
*/
  
  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      navleft();
    }
    else if(e.keyCode == 39) { // right
      navright();
    }
  });

/*
** Helpers
*/
  var navright = function(){
     var next = $('ul.nav > li.active').next();
    console.log(next);
    if( next.length == 0 )
      next = $('ul.nav > li:first-child');
    if( next.length == 0 )
      return;
    next.click();
  };
  navleft = function(){
    var prev = $('ul.nav > li.active').prev();
    console.log(prev);
    if( prev.length == 0  )
      prev = $('ul.nav > li:last-child');
    if( prev.length == 0 )
      return;
    prev.click();
  };


  /* contact form - submt email */
/////////////////////////////////////////////////////////////////////
/*// Not working right now, but this is the basic stuff for firing off the email
/////////////////////////////////////////////////////////////////////
// Some info on sending emails:
//  * Full Docs:     http://docs.emailyak.com/send-email.html
//  * Example Send:  http://docs.emailyak.com/post-requests.html
  (function() {
    var baseUrl = 'https://api.emailyak.com/v1/6p0lmc8io541lwl/json/';
    function sendEmail() {
      var messageBody = $('.contactbox textarea').val(),
          fromAddress = $('.contactbox input').val();
      if( !emailTest.test(fromAddress) || messageBody === "" ) return;
      $.post(baseUrl + 'send/email', {
        FromAddress: fromAddress,
        ToAddress:   'andrew@zomteq.com,jacob@zomteq.com,zombo@zomteq.com',
        Subject:     '[zomteq.com] Email from contact form',
        TextBody:    messageBody
      }, function(response) {
        console.log(response);
      }, 'json');
      $('.contactbox textarea').val('');
      $('.contactbox input').val('');
    }
    $('.contactbox input').keyup(function(e) {
      if( e.which == 13 ) sendEmail();
    });
    $('.contactbox button').click(sendEmail);
  })(); */
});

