/* Gallery */
function shuffle(array) {
  var random = array.map(Math.random);
  return array.sort(function(a, b) {
    return random[array.indexOf(a)] - random[array.indexOf(b)];
  });
};

function showHiddenElements() {
  $('.imgcont').each( function(i){
    var middle_of_object = $(this).offset().top + $(this).outerHeight()/2;
    var bottom_of_window = $(window).scrollTop() + $(window).height();
    if( bottom_of_window > middle_of_object ){
      $(this).animate({'opacity':'1'}, 500);
    }
  }); 
};

var image_paths = [
  { url: "3d_ibanez_sr500___fender_rumble_30_by_pierre_allard-d87mkw92.png", name:"Guitare basse Ibanez SR500, avec son ampli Fender Rumble 30" },
  { url: "can_of_soda_3d_by_pierre_allard-d870x4j2.png", name:"Une canette de soda en tilt shift" },
  { url: "citroen_ds3_racing_3d_by_pierre_allard-d57lspg2.png", name:"Citroën DS3 Racing" },
  { url: "citroen_ds3_racing_3d_wire_by_pierre_allard-d58c5qj2.png", name:"Le wire de la Citroën DS3 Racing" },
  { url: "dark_vador_wtf_by_pierre_allard-d68h2t52.png", name:"Dark Vador" },
  { url: "ducati_monster_696_3d_wip__new_environment_test__by_pierre_allard-d6w1q0d2.png", name:"Une Ducati Monster" },
  { url: "fiat_500_abarth_3d_by_pierre_allard-d855hfs2.png", name:"La Fiat 500, finition Abarth" },
  { url: "ford_mustang_shelby_gt_500__2011__by_pierre_allard-d4qhq0p.png", name:"Une Ford Mustang Shelby GT 500" },
  { url: "harley_davidson_softail_heritage_classic_by_pierre_allard-d6gpg3u2.png", name:"Harley Davidson Softail Heritage Classic" },
  { url: "mc_donalds_big_mac_3d_by_pierre_allard-d6ofkyc.png", name:"Les hamburgers, ma passion" },
  { url: "nintendo_joypad_by_pierre_allard-d5yy9z72.png", name:"Le fameux joypad Nintendo" },
  { url: "volkswagen___bug___by_pierre_allard-d47k0ln.jpg", name:"Une coccinnelle" },
  { url: "volkswagen_type_2_kombi_1978_by_pierre_allard-d47nege.png", name:"Un combi Volkswagen, j'ai le même à la maison" },
  { url: "vw_bug_by_pierre_allard-d4stakb2.png", name:"Une coccinnelle" },
  { url: "vw_combi_split_by_pierre_allard-d5krxjx2.png", name:"Un combi première génération" },
  { url: "vw_combi_split_by_pierre_allard-d5lhtx32.png", name:"Le wire du combi première génération" }
];

$(document).ready(function() {
  var shuffled = shuffle(image_paths);
  $.each(shuffled, function(i, img) {
    var image_path = img.url;
    var image_path_split = image_path.split('.');
    var resized_path = 'images/'+image_path_split[0] + 'R.' + image_path_split[1];
    var image = $('<img>').attr('src', resized_path).attr('alt', img.name);
    var hover = $('<div>')
                  .addClass('hover-title')
                  .append(
                    $('<h2>')
                      .append($('<i>')
                        .addClass('fa')
                        .addClass('fa-search')
                      )
                  ).append(img.name);
    hover.hover(function() {
      $(this).css('opacity', 0.9);
    }, function() {
      $(this).css('opacity', 0);
    });
    var container = $('<div>')
                      .addClass('imgcont')
                      .css('opacity', 0)
                      .addClass('col-sm-6')
                      .addClass('col-md-3')
                      .append($('<a>')
                        .attr('href', 'images/'+image_path)
                        .attr('title', img.name)
                        .append(image).append(hover)
                      );
    $('#gallery').append(container);
  });

  $('#gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>by pierAllard</small>';
      }
    }
  });

  $(window).scroll(showHiddenElements);
  $(window).resize(showHiddenElements);
  setTimeout(showHiddenElements, 1000);

  $('.languette .btn').click(function() {
    $("html, body").animate({ scrollTop: $(this).position().top + "px" });
  });

});


$(document).ready(function() {
  $(window).resize(drawBathtub);
  $(window).resize(drawCurtain);
  $(window).scroll(drawCurtain);
  drawBathtub();
  drawCurtain();
});

function getLengthFromWidth(width) {
  return (width > 700) ? 150 : ((width > 600) ? 100 : 0);
}

function drawCurtain() {
  var e = $('#curtain');
  var width = $(e).parent().width();
  $(e).css('width', width + 'px').attr('width', width);
  var canvas = e[0];
  if (canvas == null) return;
  var context = canvas.getContext('2d');

  var left = getLengthFromWidth(width);
  var right = width - left - 30;
  var arc = 30;
  context.beginPath();
  context.moveTo(left + 50, 350);
  context.lineTo(left + 50, 200);
  context.moveTo(left + 50, 200);
  context.arc(left + 50 + arc, 200, arc, Math.PI, Math.PI*1.75, false);
  context.strokeStyle = "#AAA";
  context.lineWidth = 10;
  context.stroke();

  context.beginPath();
  context.moveTo(left + 50 + arc + arc * Math.cos(Math.PI*1.75), 200 + arc * Math.sin(Math.PI*1.75));
  context.lineTo(left + 50 + arc + arc * Math.cos(Math.PI*1.75) + 20, 200 + arc * Math.sin(Math.PI*1.75));
  context.lineTo(left + 50 + arc + arc * Math.cos(Math.PI*1.75), 200 + arc * Math.sin(Math.PI*1.75) + 20);
  context.closePath();
  context.fillStyle = '#AAA';
  context.stroke();
  context.fill();
}

/* Bathtub Canvas */
function drawBathtub() {
  var e = $('#bathtub');
  var width = $(e).parent().width();
  $(e).css('width', width + 'px').attr('width', width);
  var canvas = e[0];
  console.log('prout');
  if (canvas == null) return;
  var context = canvas.getContext('2d');

  var left = getLengthFromWidth(width);
  var right = width - left - 30;
  var top = 0;
  var border = 15;
  var gap = 30;
  var round = 50;
  var height = 140;
  var shadow = 20;
  var footheight = 40;

  context.beginPath();
  context.moveTo(left + border, top + border);
  context.arc(left + border, top + border, border, Math.PI, Math.PI*1.5, false);
  context.moveTo(right - border, top + border);
  context.arc(right - border, top + border, border, Math.PI*1.5, 0, false); 
  context.rect(left + border, top, right - left - 2*border, border);
  context.fillStyle = '#FAFAFA';
  context.fill();

  context.beginPath();
  context.moveTo(left + border, top + border);
  context.arc(left + border, top + border, border, Math.PI*0.5, Math.PI, false);
  context.moveTo(right - border, top + border);
  context.arc(right - border, top + border, border, 0, Math.PI * 0.5, false); 
  context.rect(left + border, top + border, right - left - 2*border, border);
  context.fillStyle = '#CCCCCC';
  context.fill();

  context.beginPath();
  context.moveTo(left + gap + round, top + 2*border + height - round);
  context.arc(left + gap + round, top + 2*border + height - round, round, Math.PI*0.5, Math.PI, false);
  context.moveTo(right - gap - round, top + 2*border + height - round);
  context.arc(right - gap - round, top + 2*border + height - round, round, 0, Math.PI*0.5, false);
  context.rect(left + gap, top + 2*border, right - left - 2*gap, height - round);
  context.rect(left + gap + round, top + 2*border + height - round, right - left - 2*gap - 2*round, round);
  context.fill();

  context.beginPath();
  context.moveTo(left + gap + round, top + 2*border + height - round - shadow);
  context.arc(left + gap + round, top + 2*border + height - round - shadow, round, Math.PI*0.5, Math.PI, false);
  context.moveTo(right - gap - round, top + 2*border + height - round - shadow);
  context.arc(right - gap - round, top + 2*border + height - round - shadow, round, 0, Math.PI*0.5, false);
  context.rect(left + gap, top + 2*border, right - left - 2*gap, height - round - shadow);
  context.rect(left + gap + round, top + 2*border + height - round - shadow, right - left - 2*gap - 2*round, round);
  context.fillStyle = '#FAFAFA';
  context.fill();

  context.beginPath();
  var foottop = top + 2*border + height
  var footleft = left + gap + round;
  var footright = right - gap - round
  context.moveTo(footleft, foottop);
  context.bezierCurveTo(footleft - 20, foottop + footheight, footleft, foottop + footheight, footleft + 30, foottop);
  context.moveTo(footright, foottop);
  context.bezierCurveTo(footright + 20, foottop + footheight, footright, foottop + footheight, footright - 30, foottop);
  context.fillStyle = '#CCCCCC';
  context.fill();
};

/* Carousel Canvas */
$(document).ready(resizeAndDrawComputers);
$(window).resize(resizeAndDrawComputers);

function resizeAndDrawComputers() {
  var max_width = 0;
  $('.carousel canvas').each(function(i, e) {
    max_width = (max_width < $(e).parent().width()) ? $(e).parent().width() : max_width;
  });
  $('.carousel canvas').each(function(i, e) {
    resizeComputer(e, max_width);
    drawComputer(e);
  });  
}

function resizeComputer(e, width) {
  var height = 0.851203501 * width;
  $(e).css({ width: width + 'px', height: height + 'px' })
      .attr('width', width).attr('height', height);
}

function drawComputer(e) {
  var width = $(e).width();
  var height = $(e).height();
  var left = width/10;
  var top_ = 55;
  var border = width/30;
  var right = width - left;
  var bottom = 55 + height/1.45;
  var borderbottom = 10;
  var kbwidth = border*2;
  var bottomover = 10;
  var kbheight = border/1.5;
  var padwidth = 50;

  var canvas  = e;
  var context = canvas.getContext("2d");

  // img
  var imageObj = new Image();
  imageObj.onload = function() {
    context.drawImage(imageObj, left + border, top_ + border, right - left - 2*border, bottom - top_ - 2*border);
  };
  imageObj.src = $(e).attr('data-img');

  // borders arcs
  context.beginPath();
  context.moveTo(left + border, top_ + border);
  context.arc(left + border, top_ + border, border, Math.PI, Math.PI*1.5, false);
  context.moveTo(left + border, bottom - border);
  context.arc(left + border, bottom - border, border, Math.PI*0.5, Math.PI, false);
  context.moveTo(right - border, bottom - border);
  context.arc(right - border, bottom - border, border, 0, Math.PI*0.5, false);
  context.moveTo(right - border, top_ + border);
  context.arc(right - border, top_ + border, border, Math.PI*1.5, 0, false);

  // border rects
  context.rect(left, top_ + border, border, bottom - top_ - 2*border);
  context.rect(right - border, top_ + border, border, bottom - top_ - 2*border);
  context.rect(left + border, top_, right - left - 2*border, border);
  context.rect(left + border, bottom - border - borderbottom, right - left - 2*border, border + borderbottom);
  context.lineWidth = 0;
  context.strokeStyle = '#CCC';
  context.fillStyle = 'black';
  context.lineWidth = 3;
  context.stroke();
  context.fill();

  // kb top
  context.beginPath();
  context.rect(left - kbwidth, bottom - bottomover, kbwidth/2, kbheight);
  context.fillStyle = '#999';
  context.fill();

  context.beginPath();
  context.rect(left - kbwidth/2, bottom - bottomover, right - left + kbwidth, kbheight);
  context.fillStyle = '#BBB';
  context.fill();

  context.beginPath();
  context.rect(right + kbwidth/2, bottom - bottomover, kbwidth/2, kbheight);
  context.fillStyle = '#DDD';
  context.fill();

  // pads
  context.beginPath();
  context.rect(left + (right - left)/2 - padwidth, bottom - bottomover, padwidth, kbheight/2);
  context.fillStyle = '#999';
  context.fill();
  context.beginPath();
  context.rect(left + (right - left)/2, bottom - bottomover, padwidth, kbheight/2);
  context.fillStyle = '#AAA';
  context.fill();


  // kb bottom
  context.beginPath();
  context.moveTo(left - kbwidth,bottom - bottomover + kbheight);
  context.lineTo(left, bottom - bottomover + kbheight);
  context.lineTo(left, bottom - bottomover + kbheight * 2);
  context.fillStyle = '#999';
  context.closePath();

  context.moveTo(right + kbwidth, bottom - bottomover + kbheight);
  context.lineTo(right, bottom - bottomover + kbheight);
  context.lineTo(right, bottom - bottomover + kbheight * 2);
  context.fillStyle = '#999';
  context.closePath();

  context.rect(left, bottom - bottomover + kbheight, right - left, kbheight);

  context.fill();

  // light
  context.beginPath();
  context.moveTo((right - left)/2 + left, top_ + border/2);
  context.arc((right - left)/2 + left, top_ + border/2, 1.5, 0, Math.PI * 2, 0);
  context.fillStyle = '#00FF00';
  context.fill();
}

function getSize() {
  return Math.random() * 70 + 30;
}

function moveAndInsertMissing(){
  insertMissing();
  move();
}

function move() {
  var max_right = $('#features-container').width();
  var max_top = 50;
  var max_opacity = 100;
  $('#features-container .bubble').each(function(i, e) {
    var size = parseFloat($(e).css('width'));
    var left = parseFloat($(e).css('left')) + Math.random() * 2 - 1;
    var top = parseFloat($(e).css('top')) - (size/50 + 1);
    var opacity = (top > (top + opacity)) ? 1.0 : (top - max_top) / max_opacity;
    var max_left = getLengthFromWidth($('#bathtub').width()) + 30;
    var max_right = $('#bathtub').width() - getLengthFromWidth($('#bathtub').width()) - 30 - 30;
    if (top < max_top) {
      top = 300;
      size = getSize();
      left = max_left + Math.random() * (max_right - max_left - size);
    }
    if (left < max_left) left = max_left;
    if (left > (max_right - size)) left = max_right - size;
    $(e).css({
      'top': top + 'px',
      'left': left + 'px',
      'opacity': opacity,
      'width': size + 'px',
      'height': size + 'px',
      'z-index': size
    });
  });
}

var elements = [
  { name: "PHP", img: 'logo_php.png', stars: 3 },
  { name: "AngularJS", img: 'logo_angular.png', stars: 1 },
  { name: "Ruby on Rails", img: 'logo_rails.png', stars: 5 },
  { name: "HTML5", img: "logo_html.png", stars: 5 },
  { name: "CSS3", img: 'logo_css.png', stars: 5 },
  { name: "Debian", img: 'logo_debian.png', stars: 3 },
  { name: "Ubuntu", img: 'logo_ubuntu.png', stars: 3 },
  { name: "Windows", img: 'logo_windows.png', stars: 4 },
  { name: "Photoshop", img: 'logo_photoshop.jpg', stars: 4 },
  { name: "Gimp", img: 'logo_gimp.png', stars: 3 },
  { name: "Blender", img: 'logo_blender.png', stars: 5 },
  { name: "Elasticsearch", img: 'logo_elastic.png', stars: 3 },
  { name: "MySQL", img: 'logo_mysql.png', stars: 4 },
  { name: "PostGreSQL", img: 'logo_postgre.png', stars: 3 },
  { name: "SQlite", img: 'logo_sqlite.png', stars: 2 },
  { name: "JAVA", img: 'logo_java.png', stars: 3 },
  { name: "SASS", img: 'logo_sass.png', stars: 4 },
  { name: "jQuery", img: 'logo_jquery.png', stars: 4 },
  { name: "javascript", img: 'logo_js.png', stars: 4 },
  { name: "git", img: 'logo_git.png', stars: 4 },
  { name: "svn", img: 'logo_svn.png', stars: 3 }
];

function getStars(stars) {
  result = $('<div>');
  for(i=0;i<parseInt(stars);i++) {
    result.append($('<i>').addClass('fa fa-star'));
  }
  for (i=parseInt(stars);i<5;i++) {
    result.append($('<i>').addClass('fa fa-star-o'));
  }
  return result;
}

var missing_proba = 1.0;
function insertMissing() {
  if (elements.length <= 0) return;

  var container = $('#features-container');

  if ((Math.random() * missing_proba) < 1/32) {
    missing_proba = 1.0;
    var i = Math.floor(Math.random() * elements.length);
    var element = elements.splice(i,1)[0];
    var size = getSize();
    var possible_width = container.width() - 2*getLengthFromWidth(container.width()) - 30 - size - 30*2;
    var left = getLengthFromWidth(container.width()) + 30 + Math.random() * possible_width;
    container.append(
      $('<div>').addClass('bubble').attr('data-name', element.name).attr('data-stars', element.stars).html(
        $('<img>').attr('src','logos/' + element.img)).css({width: size + 'px', height: size + 'px', top: '300px', left: left + 'px'}
      ).click(function() {
        var size = parseFloat($(this).css('width'));
        var newsize = size * 1.5;
        var newleft = parseFloat($(this).css('left')) - (newsize - size)/2;
        var newtop = parseFloat($(this).css('top')) - (newsize - size)/2;
        $(this).animate({width: newsize, height: newsize, opacity: 0, left: newleft, top: newtop}, 50, 'swing', function() {
          $(this).remove();
          var image = $('<img>').attr('src', $(this).find('img').attr('src'));
          var txt = $('<div>').html($(this).attr('data-name'));
          var stars = getStars($(this).attr('data-stars'));
          $('#features-list').append($('<li>').prepend(image, txt, stars));
          $('#empty-features-list').hide();
          if ((elements.length <= 0) && (container.find('.bubble').length <= 0)) {
            var left = container.width() - getLengthFromWidth(container.width()) - 30 - 30 - 125 - 30;
            var img = $('<img>').attr('src', 'images/moimanga.png').addClass('moimanga').css({ top: '295px', left: left + 'px'});
            container.append(img);
            img.animate({ top: 149 }, 1000);
          }
        });
      })
    );
  }
  else {
    missing_proba -= 1/32;
  }
}

$(document).ready(function() {

});

(function(){
  window.setInterval(moveAndInsertMissing, 1000 / 24);
})();