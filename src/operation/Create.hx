package src.operation;

import js.JQuery;

class Create {

  /* =======================================================================
  Make Object HTML
  ========================================================================== */
  public static function makeObjHtml(id:String,top:Float,left:Float,type:String,cat:String,price:Int,src:String):String {

    var html :String = "";
    html += '<p class="object ' + id + ' ' + type + '"';
    html += 'style="top:' + top + 'px;left:' + left + 'px"';
    html += 'data-id="' + id + '" data-cat="' + cat + '" data-price="'+ price +'">';
    html += '<img src="files/img/product/icon/' + src + '">';
    html += '</p>';

    return html;
  }

  /* =======================================================================
  Make List HTML
  ========================================================================== */
  public static function makeListHtml(id:String,type:String,cat:String,icon:String,price:Int,bgImg:String,img:String,name:String,length:String):String {

    var html:String = "";
    html += '<li id="' + id + '" title="' + name + '" ';
    html += 'data-id="' + id + '" ';
    html += 'data-type="' + type + '" ';
    html += 'data-cat="' + cat + '" ';
    html += 'data-icon="' + icon + '" ';
    html += 'data-price="' + price + '">';
    html += '<div class="img-box" style="background: url(files/img/product/bg/' + bgImg + ') no-repeat center center;">';
    html += '<div class="img">';
    html += '<img src="files/img/product/image/' + img + '">';
    html += '</div>';
    html += '</div>';
    html += '<dl>';
    html += '<dt>' + name + '</dt>';
    html += '<dd class="length">' + length + '</dd>';
    html += '<dd class="price"><span>' + price + '</span>円</dd>';
    html += '</dl>';
    html += '</li>';

    return html;
  }

}
