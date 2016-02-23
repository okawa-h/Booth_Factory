package src.utils;

class Html {

    /* =======================================================================
    Object HTML
    ========================================================================== */
    public static function getObj(id:String,top:Float,left:Float,type:String,cat:String,price:Int,length:String,src:String,color:String):String {

        var html : String = "";
        html += '<p class="object ' + id + ' ' + type + '"';
        html += 'style="top:' + top + 'px;left:' + left + 'px"';
        html += 'data-id="' + id + '" data-cat="' + cat + '" data-price="'+ price +'" data-length="'+ length +'">';
        html += '<img src="files/img/product/icon/' + color + '/' + src + '">';
        html += '</p>';

        return html;
    }

    /* =======================================================================
    List HTML
    ========================================================================== */
    public static function getList(id:String,type:String,cat:String,icon:String,price:String,bgImg:String,img:String,name:String,length:String,abs:String):String {

        var html : String = "";
        html += '<li id="' + id + '" title="' + name + '" ';
        html += 'data-id="' + id + '" ';
        html += 'data-type="' + type + '" ';
        html += 'data-abs="' + abs + '" ';
        html += 'data-cat="' + cat + '" ';
        html += 'data-icon="' + icon + '" ';
        html += 'data-price="' + price + '">';
        html += '<div class="revertObj"></div>';
        //html += '<div class="removeObj">済</div>';
        html += '<div class="img-box" style="background: url(files/img/product/bg/' + bgImg + ') no-repeat center center;background-size:contain;">';
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
