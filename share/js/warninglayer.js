//jQuery = jQuery.noConflict();
var objXY = { x: 0, y: 0 };
var cmXY = { x: 0, y: 0 };
var target = {};
var draggablePop = false;
jQuery(document).ready(function(){
    /*
    jQuery.ajax({
        type: 'POST'
        , async: true
        , url: '/weather/eqklayerpopup.jsp'
        , cache:false
        , dataType: "html"
        , beforeSend: function() {

          }
        , success: function(data) {
            //console.log(data);
            targetId = "";
            if( data.indexOf("<div id=\"ann\"") > -1 ) targetId = "ann";
            else if( data.indexOf("<div id=\"rpt\"") > -1 ) targetId = "rpt"; 
            else if( data.indexOf("<div id=\"inf\"") > -1 ) targetId = "inf";
            else if( data.indexOf("<div id=\"tsn\"") > -1 ) targetId = "tsn";
            else if( data.indexOf("<div id=\"eew\"") > -1 ) targetId = "eew";
            if ( targetId != "") {
                jQuery(document.body).append(data);
            }
            target = document.getElementById(targetId);
            if( target != null ) {
                itarget = document.getElementById("layer_popup_move");
                itarget.onmousedown = layerPopMouseDown;
                document.onmousemove = layerPopMouseMove;

            }
          }
        , error: function(data, status, err) {
                
          }
        , complete: function() { 

        }
    });
    */
});

function fncClose(target){
    var obj = document.getElementById(target);
    jQuery(obj).css("display","none");
}
function layerPopMoveClick(e) {
    itarget = document.getElementById("layer_popup_move");
    itarget.click();
}
function layerPopMouseDown(e) {
    var posX = 0;
    var posY = 0;
    if (typeof(e) == 'undefined') {
        e = event;
    }
    if(typeof(e.clientX) == 'undefined') {
        posX = e.originalEvent.clientX;
        posY = e.originalEvent.clientY;
    } else {
        posX = e.clientX;
        posY = e.clientY;
    }

    var docElem = document.documentElement;
    var docBody = document.body;
    if (docElem) {
        posX += docElem.scrollLeft;
        posY += docElem.scrollTop;
    } else if (docBody) {
        posX += docBody.scrollLeft;
        posY += docBody.scrollTop;
    }
    var xy = {x : posX, y : posY};

    var oTmp = jQuery(target);
    var left = oTmp.css("left");
    var top = oTmp.css("top");
    left = left.substr(0, left.length-2);
    top = top.substr(0, top.length-2);
    objXY.x = parseFloat(left);
    objXY.y = parseFloat(top);
    cmXY.x = xy.x - objXY.x;
    cmXY.y = xy.y - objXY.y;

    if (draggablePop) {
        draggablePop = false;
    } else {
        draggablePop = true;
    }

    //console.log(xy);
}
function layerPopMouseMove(e) {
    var posX = 0;
    var posY = 0;
    if (typeof(e) == 'undefined') {
        e = event;
    }
    if(typeof(e.clientX) == 'undefined') {
        posX = e.originalEvent.clientX;
        posY = e.originalEvent.clientY;
    } else {
        posX = e.clientX;
        posY = e.clientY;
    }
    if(draggablePop) {
        
        var docElem = document.documentElement;
        var docBody = document.body;
        if (docElem) {
            posX += docElem.scrollLeft;
            posY += docElem.scrollTop;
        } else if (docBody) {
            posX += docBody.scrollLeft;
            posY += docBody.scrollTop;
        }
        var xy = {x : posX, y : posY};
        var left = xy.x - cmXY.x ;
        var top = xy.y - cmXY.y ;

        var oTmp = jQuery(target);
        oTmp.css("left",left+"px");
        oTmp.css("top",top+"px");
        //console.log(left + "," + top);
    }
}
function getWarningNotice(dongCd, url) {
	var urlDongCd = '/weather/waringdongjson.jsp';
	if ( dongCd != '4613036000' && dongCd != '5011032000')
	{
		dongCd = dongCd.substring(0,5);
	}
	urlDongCd += '?dongCd='+dongCd;
	jQuery.ajax({
		type: 'GET'
		, async: true
		, url: urlDongCd
		, cache:false
		//, data: {"dongCd":dongCd}
		, dataType: "JSON"
		, beforeSend: function(req) {
			//console.log(req);
		  }
		, success: function(data) {
			//console.log(data);
			if (url == 'index.jsp')
			{
				displayWarningNoticeIndex(data);
			}
			else if (url == 'main.jsp')
			{
				displayWarningNoticeMain(data);
			}
			else if (url == 'timeseries.jsp')
			{
				displayWarningNoticeTimeseries(data);
			}

		  }
		, error: function(data, status, err) {
			console.log(data+","+status+","+err);
		  }
		, complete: function() { 

		  }
	});
}

function displayWarningNoticeIndex(data) {
	targetObj = jQuery("div.s_addr p");
	targetObj2 = jQuery("div.s_addr p a");
	if ( targetObj == undefined || data == undefined || data.length < 1) {
		return false;
	}

	var tmp = "";
	var jsonD = data;

	tmp += "<a href=\"/weather/warning/status.jsp\"><span class=\"point_wrn\" style=\"margin-left:10px;\">[";
	for(i = 0; i< jsonD.length; i++) {
		try	{
			var wrn = jsonD[i].w;
			if ( wrn == undefined || jQuery.trim(wrn) == "" )
			{
				throw "";
			}
			if( i > 0 ) tmp += ",";
			tmp += wrn;
		} catch (e) {
			continue;
		}
	}
	tmp += "]</span></a>"; 
	if(targetObj2  != undefined) {
		targetObj2.remove();
	}
	if ( targetObj != undefined) {
		targetObj.append(tmp);
	}
}
function displayWarningNoticeMain(data) {
	targetObj = jQuery("#warning_notice");
	if ( targetObj.length  == 0) return false;
	if(!data || data.length < 1) {
		targetObj.html("");
		return false;
	}
	var jsonD = data;
	
	var tmp = "<a href=\"/weather/warning/status.jsp\" class=\"warningreg2dong\">관심지역에 <strong>[";
	for(var i = 0; i < jsonD.length; i++) {
		try	{
			if( i > 0 ) tmp += ",";
			tmp += jsonD[i].w;
		} catch (e) {
			continue;
		}
	}
	tmp += "]</strong>가 발표되었습니다.</a>"; 
	targetObj.html(tmp);
}
function displayWarningNoticeTimeseries(data) {
	var targetObj = jQuery("#addressName");
	if ( targetObj.length  == 0) return false;
	if(!data || data.length < 1) {
		return false;
	}
	
	var jsonD = data;
	var tmp = targetObj.html().toLowerCase().replace("<br/>","").replace("<br>","");
	tmp += "<a href=\"/weather/warning/status.jsp\" class=\"warningreg2dong\"><strong>[";
	for(i = 0; i< jsonD.length; i++) {
		try	{
			if( i > 0 ) tmp += ",";
			tmp += jsonD[i].w;
		} catch (e) {
			continue;
		}
	}
	tmp += "]</a>"; 

	targetObj.html(tmp);

}
