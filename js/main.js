window.onpopstate = function(event) {
  if (event.state) {
    $('.scene-'+event.state.scene).sceneEnter('fade', function() {
      onSceneChange();
    }, 400);
  }
};

window.onhashchange = function() {
  var modal_name = location.hash.substring(1);
  $('.modal:visible').modal('hide');
  if (modal_name != '') {
    _modal('modal-'+modal_name);
  }
};

$('a[role="modal"]').on('click', function() {
  var target = $(this).data('target') != undefined ? $(this).data('target') : '';
  console.log("HI");
  _modal('modal-'+target);
});

$('a[role="scene"]').on('click', function() {
  var target = $(this).data('target') != undefined ? $(this).data('target') : '';
  console.log("HI");
  _scene('scene-'+target);
});

$("img").click(function(){
  console.log("HI");
});

function _modal(modal_name)
{
  if (!modal_name.startsWith('modal-')) {
    return false;
  }
  var name = modal_name.substring('modal-'.length, modal_name.length);
  var template_name = $('.scene.active').data('template');
  var scene_name = template_name.substring('template-'.length, template_name.length);
  window.history.pushState({scene: scene_name, modal: name}, name, window.location.protocol + '//' + window.location.host + window._config.root + scene_name + '#' + name);
  if (name == 'scan') {
    if (!is_scanner_on && window.scanner != undefined) {
      is_scanner_on = true;
      scanner.start();
    }
  }
  $('#modal-'+name).modal({backdrop: true});
  return true;
}

function _scene(scene_name)
{
  if (DEBUG) {
    if (scene_name == undefined) { // list all scenes
      var scenes = [];
      var i = 0;
      $('.scene').each(function(idx, scene) {
        scenes.push($(scene).attr('id'));
        console.log((i++) + ': \'' + $(scene).attr('id') + '\'');
      });
      return scenes;
    }
  }

  if (!scene_name.startsWith('scene-')) {
    return false;
  }
  var name = scene_name.substring('scene-'.length, scene_name.length);
  window.history.pushState({scene: name}, name, window.location.protocol + '//' + window.location.host + window._config.root + name);
  switch (scene_name) {
    case 'scene-home':
    break;
    case 'scene-form-register':
    break;
    case 'scene-form-register-confirm':
    break;
  }

  $(window).scrollTop(0);

  var $current_scene = $('.scene.active');
  var current_scene_idx = $('.scene').index($current_scene);
  var current_scene_template = $current_scene.data('template');
  var $target_scene = $('.scene.'+scene_name);
  var target_scene_idx = $('.scene').index($target_scene);
  var target_scene_template = $target_scene.data('template');

  if (current_scene_template != target_scene_template) {
    $target_scene.find('.floating').hide();
  }
  $('.scene.'+scene_name).fadeIn();

  $('#header ol.nav')
    .find('li').removeClass('selected')
    .end()
    .find('[data-target="'+scene_name.substring(6)+'"]').closest('li').addClass('selected');

  return true;
}

function is_mobile_view()
{
  return $(window).width() < 768;
}

function onSceneChange() {
  if($('.scene.active').index() == 0){
    $('#main').addClass('index');
  }
  else{
    $('#main').removeClass('index');
  }
}

$(document).ready(function() {

  // prevent dragging
  $('body').on('dragstart', 'img', function(event) { event.preventDefault(); });

  $('.scene-home').fadeIn()

  $(window).trigger('hashchange');
});

(function scene_form_receipt() {

  (function datepicker() {
    $('input[name="trans_date"]').datepicker({
      format: "DD/MM/YYYY",
      startDate: new Date('04/17/2020'),
      endDate: new Date('05/21/2020')
    });
  })();

  // (function timepicker() {
  //   $('input[name="trans_time"]').timepicker({
  //     timeFormat: 'HH:mm',
  //     dropdown: false
  //   });
  // })();

  (function receipt_info_button() {
    if($('.info-btn').length > 0)
    {
      var cur_index = 0;
      var receipt_lists, receipt_width, cur_receipt;
      $('.info-btn').click(function(e)
      {
        _modal('modal-receipt');
        receipt_lists = $('.modal-receipt .receipt-list');
        receipt_width = $('.modal-receipt .receipt-list:eq(0)').width();
        cur_receipt = $('.modal-receipt .receipt-list').eq(cur_index);

        receipt_lists.css('left', receipt_width+'px');
        cur_receipt.css('left',0);
        receipt_lists.not(cur_receipt).hide(0);
        cur_receipt.show(0);
      });

      $('.arrow-l').on('click', function(event)
      {
        cur_receipt = $('.modal-receipt .receipt-list').eq(cur_index);
        $('.receipt-list').scrollTop(0);
        var tmp = cur_receipt;
        var prev_receipt = (cur_receipt.is(':first-child')) ? receipt_lists.last() : cur_receipt.prev();
        prev_receipt.css('left','-'+receipt_width+'px');
        prev_receipt.show(0);
        cur_receipt.animate({'left':receipt_width},300);
        prev_receipt.animate({'left':0},300,'',function(){tmp.hide(0)});
        cur_receipt = prev_receipt;

        cur_index = (cur_index-1 >= 0) ? cur_index-1: receipt_lists.length;
      });

      $('.arrow-r').on('click', function(event) {
        cur_receipt = $('.modal-receipt .receipt-list').eq(cur_index);
        $('.receipt-list').scrollTop(0);
        var tmp = cur_receipt;
        var next_receipt = (cur_receipt.is(':last-child')) ? receipt_lists.first() : cur_receipt.next();
        next_receipt.css('left',receipt_width+'px');
        next_receipt.show(0);
        cur_receipt.animate({'left':'-'+receipt_width},300);
        next_receipt.animate({'left':0},300,'',function(){tmp.hide(0)});

        cur_index = (cur_index+1 <= receipt_lists.length) ? cur_index+1: 0;
        cur_receipt = next_receipt;
      });
    }
  })();

  (function() {

    // Join
    $('#modal-join .next-btn').on('click', function(e) {
      $("#modal-join .close").click();
      _scene('scene-form-register');
    });

    $('.scene-draw .home-btn,.scene-draw .reg-btn').on('click', function(e) {
      reset(false);
    });

    // Reset button in register page
    $('.reset-btn').on('click', function(e) {
      if(confirm("清除所有輸入資料")){
        reset(true);
      }
    });
  })();

  (function js_validate() {
    // $('input[name="trans_date"]').on('focusout', function(event) {
    //   var $input = $(event.target);
    //   if ($input.val() < $input.attr('min') || $input.val() > $input.attr('max')) {
    //     $input.parent()
    //     .find('.error-msg.trans_date_invalid_range').show();
    //   } else {
    //     $input.parent()
    //     .find('.error-msg').hide();
    //   }
    // });
    // TODO: trans_amount ...

  })();

})();


function reset(hardreset) {
  hardreset = hardreset !== undefined ? hardreset == true : false;
  $('form').each(function(i, form) {
    var $form = $(form);
    if (!hardreset) {
      // preserve value from reset Form
      var preserve_fields = [
      'player_name',
      'player_email',
      'player_phone'
      ], preserved_values = {};
      for (var i = 0; i < preserve_fields.length; i++) {
        preserved_values[preserve_fields[i]] = $form.find('input[name="'+preserve_fields[i]+'"]').val();
      }
      $form.trigger('reset');
      for (var field in preserved_values) {
        $form.find('input[name="'+field+'"]').val(preserved_values[field]);
      }
    } else {
      // hard reset
      $form.trigger('reset');
    }
    $('#scene-form-register').find('[name="trans_image"]').attr("src", "assets/img/upload-placeholder.jpg");
    drawImage(base_image, ctx);
    $(form).scrollTop(0);
  });
}

function onFormSubmitInit($form) {
  if ($form.length <= 0) return;
  $form
  .find('label').removeClass('error')
  .end()
  .find('.error-msg-box-wrapper').css({'display':'none'})
  .end()
  .find('.error-msg-box > .error-msg').css({'display':'none'})
  .end()
  .find('button[type="submit"]').attr('disabled', 'disabled');
}

function onFormSubmitCallback($form) {
  if ($form.length <= 0) return;
  $form.find('button[type="submit"]').removeAttr('disabled');
}

function showErrorMessage(errors) { // errors: array from api response
  $('#scene-form-register').find('.error-msg').hide();
  if (DEBUG && errors.length > 0) console.log("showErrorMessage:");
  if (!is_null(errors) && errors.length > 0) {
    $('#scene-form-register').find('.error-msg-box-wrapper').show();
  }
  for (var i=1; i < errors.length; i++) {
    if (DEBUG) console.log(errors[i]);
    $('#scene-form-register').find('li.'+errors[i]).show();
  }
  $("html, body").animate({scrollTop:$('.sorry-msg-box').offset().top - 120},500);
  $('.next-btn[type="submit"]').attr('disabled','disabled');
  $('#scene-form-register input, #scene-form-register select').on('change keyup',function(){
    $('.next-btn[type="submit"]').removeAttr('disabled');
    $('#scene-form-register input:not([type="file"]), #scene-form-register select').off('change');
  });
 /* $(window).animate({scrollTop:$('.sorry-msg-box').offset().top - 120},500);*/
}

