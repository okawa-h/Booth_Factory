package src.data;

import js.JQuery;
import src.Manager;

class Set {

  public static function init(_callback):Void {

    loop(Manager._Data,_callback);

  }

  public static function loop(data:Dynamic,_callback):Void {

  	var length         :Int    = data.object.length;
  	var paper_array    :String = "";
  	var accessory_array:String = "";
  	var banar_array    :String = "";

    for (i in 0 ... length) {

    	var obj = makeHtml(data.object[i]);

    	if (obj[1] == "paper") {

    		paper_array += obj[0];

    	} else if (obj[1] == "accessory") {

    		accessory_array += obj[0];

    	} else if (obj[1] == "banar") {

    		banar_array += obj[0];
        
    	}
    	
    }

    Manager._jMenu.find('#sale-paper').find('.slider').find('ul').append(paper_array);
    Manager._jMenu.find('#sale-accessory').find('.slider').find('ul').append(accessory_array);
    Manager._jMenu.find('#sale-banar').find('.slider').find('ul').append(banar_array);

    _callback();

  }

  private static function makeHtml(target:Dynamic):Array<String> {

  	var html:String = "";
		html += '<li title="' + target.id + '" ';
		html += 'data-type="' + target.type + '" ';
		html += 'data-price="' + target.price + '">';
		html +=	'<div class="img-box" style="background: url(files/img/product/bg/' + target.bgImg + ') no-repeat center center;">';
		html += '<div class="img">';
		html += '<img src="files/img/product/image/' + target.img + '">';
		html +=	'</div>';
		html +=	'</div>';
		html +=	'<dl>';
		html +=	'<dt>' + target.name + '</dt>';
		html +=	'<dd class="length">' + target.length + '</dd>';
		html +=	'<dd class="price"><span>' + target.price + '</span>円</dd>';
		html +=	'</dl>';
		html +=	'</li>';

		untyped return [html,target.type];

  }

}
