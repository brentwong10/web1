if (window._config == undefined) console.error('Undefined Config');

// For Internet Explorer
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
if (!Number.isInteger) {
  Number.isInteger = function(x) {
    return (x ^ 0) === +x;
  };
}

a_tag=function(longtext){
  return longtext.replace(/((http|https|ftp)\:\/\/[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|gov|info|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cat|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)([\/\.][^\s\,\<\>]*)?)/gi, '<a href="$1" target="_blank" >$1<\/a>');
};
is_image=function(filepath) {
  return $.inArray(filepath.split('.')[filepath.split('.').length-1],['jpg','jpeg','gif','bmp','png'])!==-1;
};
open_select=function(elem) {
  if(document.createEvent){
    var e = document.createEvent("MouseEvents");
    e.initMouseEvent("mousedown",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
    elem[0].dispatchEvent(e);
  }else if(element.fireEvent){
    elem[0].fireEvent("onmousedown");
  }
};
Array.prototype.diff=function(a) {
  return this.filter(function(i){return a.indexOf(i)<0;});
};
is_null=function(object) {
  return object==null;
};
is_array=function(array) {
  return $.isArray(array);
};
is_object=function(object) {
  return object!=undefined&&Object.prototype.toString.call(object)=='[object Object]';
};
is_string=function(string) {
  return string!=undefined&&typeof(string)=='string';
};
is_integer=function(integer) {
  return Number.isInteger(integer);
};
is_float=function(float_number) {
  return float_number!=undefined&&typeof(float_number)=='number'&&parseFloat(float_number)!='NaN';
};
is_double=function(double_number) {
  return is_float(double_number);
};
empty=function(string) {
  return string==undefined||is_null(string)||(is_string(string)&&string=='');
};
is_ie=function() {
  var ua=window.navigator.userAgent,msie=ua.indexOf("MSIE ");
  if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    return 11;
  } else {
    return msie > 0 ? parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) : false;
  }
};


(function ( $ ) {
  /**
   * Example:
   * <code>
   *  api('testing',
   *[   {                          ]
   *[     'field_1' : value_1,     ] (optional)
   *[     'field_2' : value_2      ]
   *[   },                         ]
   *
   *[   function done(data) {      ]
   *[     console.log(data);       ] (optional)
   *[     # code...                ]
   *[   },                         ]
   *
   *[   function fail(data) {      ]
   *[     # code...                ] (optional)
   *[   },                         ]
   *
   *[   function always(data) {    ]
   *[     # code...                ] (optional)
   *[   }                          ]
   *  );
   * </code>
   */
  api=function(action, data, done, fail, always){
    var url=window._config.api_portal||'/api';
    $.ajax({
      url:url+'?action='+action,
      type:'POST',
      data:data,
      processData:!(data instanceof FormData),
      contentType:(data instanceof FormData ? false : 'application/x-www-form-urlencoded; charset=UTF-8'),
      cache:false
    }).done(function(data,textStatus,jqXHR){
      try{
        data=$.parseJSON(data);
        if (data.header==undefined) throw('Incorrect Format');
      }catch(e){
        console.error('[API:'+action+'][done] Incorrect format of response data.');
        console.log(data);
      }
      if(data.header=='true'){
        data=data.data;
        try{if(typeof done=='function')done.call(this,data);}catch(e){
          console.error('[API:'+action+'][done-true] Exception:');
          console.error(e);
        }
      }else{
        try{if(typeof fail=='function')fail.call(this,data);}catch(e){
          console.error('[API:'+action+'][done-false] Exception:');
          console.error(e);
        }
      }
    }).fail(function(jqXHR,textStatus,errorThrown){
      var data={header:'false',data:[],err:['AJAX Failed',textStatus,errorThrown]};
      try{if(typeof fail=='function')fail.call(this,data);}catch(e){
        console.error('[API:'+action+'][fail] Exception:');
        console.error(e);
      }
    }).always(function(data_jqXHR,textStatus){
      var data;
      if(!is_string(data_jqXHR)){
        data={header:'false',data:[],err:['AJAX Failed',textStatus]};
      } else {
        try{
          data=$.parseJSON(data_jqXHR);
          if (data.header==undefined) throw('Incorrect Format');
        }catch(e){
          data={header:'false',data:[],err:['Incorrect Format',data_jqXHR.toString()]};
        }
      }
      try{if(typeof always=='function')always.call(this,data);}catch(e){
        console.error('[API:'+action+'][always] Exception:');
        console.error(e);
      }
    });
  }

  $._GET=(function(a){
    if(a=='')return{};var b={};for(var i=0;i<a.length;++i){var p=a[i].split('=');if(p.length!=2)continue;b[p[0]]=decodeURIComponent(p[1].replace(/\+/g, ' '));}return b;
  })(window.location.search.substr(1).split('&'));

  $.fn.page_load = function(setting){
    var self=this,setting=$.extend({
      delay:500,
      load_fadeout:800,
      page_fadein:800,
      loader:'Loading...',
      callback:function(){}
    },setting),mask;
    self.hide();
    self.after(
      mask=$('<div class="loading_mask" />').css({'width':'100%','height':'100%','text-align':'center','white-space':'nowrap'})
        .append(
          $('<div class="loading_content" />').html(setting.loader).css({'display':'inline-block','white-space':'normal','vertical-align':'middle'})
        )
        .append(
          $('<div />').css({'position':'relative','display':'inline-block','width':'0px','height':'100%','vertical-align':'middle'})
        )
    ).on('page_loaded',function(){
      setTimeout(function(){
        mask.fadeOut(setting.load_fadeout).promise().done(function(){
          $(this).remove();
          self.fadeIn(setting.page_fadein);
          if(typeof setting.callback=='function')setting.callback.call(self);
        });
      },setting.delay);
    });
    return self;
  };
}( jQuery ));