function addUserMenu() {
	var locText = document.getElementById("location_text").innerHTML;
	var locs = locText.split("|");
	var pageName = "";
	var locLength = locs.length;
	for(i = 0 ; i < locLength ; i++){
		if(i >= locLength -2) {
			pageName += "/" + locs[i];
		}
	}
	pageName = pageName.substring(1);
	//var pageName = document.getElementById("leaf-page-title").innerText;
	var new_menu = Base64.encode( pageName + "||" + location.href );

	if(pageName) {
		jQuery.ajax({
			type: 'POST'
			, async: true
			, url: '/mypage/updateMyMenus.jsp'
			, data: {"addMenu":new_menu}
			, cache:false
			, beforeSend: function() {

			  }
			, success: function(data) {
					if(data.indexOf("DUP") > -1) {
						alert("이미 등록된 메뉴입니다.");
					} else {
						alert("사용자메뉴가 등록되었습니다.");
					}
			  }
			, error: function(data, status, err) {
					alert("등록 중 오류가 발생하였습니다.");
			  }
			, complete: function() { 

			}
		});
	}
	
}
function showUserMenu() {
	var obj = document.getElementById("usermenu");
	if(obj) {
		if(obj.style.display == "none") {
			/*
				서버 조회로 변경 ( 2012-10-31 )
			*/
			var loadMenu = function(req) {
				var data = null;
				if(typeof(req.responseText) != "undefined") {
					data = eval(req.responseText);
				} else {
					data = eval(req);
				}
				var ums = "";
				try
				{
					for(i = 0 ; i < data.length ; i ++ ){
						ums += "<li><a href='" +  data[i].url + "'>" + data[i].name+ "</a></li>";
					}
				}
				catch (e){	}
				
				if(ums =="" ) {
					ums = "<li>나만의 메뉴는 총 10개까지 등록하실 수 있습니다.</li>" +
								 "<li>각 페이지 상단의 ‘사용자메뉴추가’ 버튼을 이용, 추가되며 메뉴 순서는 등록 한 순서대로 제공됩니다.</li>" +
								 "<li>사용자 메뉴를 사용함으로써 나만의 메뉴로 원하시는 정보에 빠르게 접근할 수 있습니다. </li>";
				}
				var objlist = document.getElementById("usermenu_list");
				objlist.innerHTML = ums;
				obj.style.display = "block";
			};
			//if(typeof(Ajax)  != "undefined") {
			//	new Ajax.Request("http://web.kma.go.kr/mypage/mymenu_json.jsp", { method : "get", onSuccess : loadMenu });
			//} else {
				try {
					jQuery.ajax({
						url: '/mypage/mymenu_json.jsp'
						, cache:false
						, success:function(data) {
							loadMenu(data);
						}
						, error:function(req, textStatus, error) {
							loadMenu(req);
						}
					});
				} catch(e) {alert(e.message); }
			//}

			
		} else {
			obj.style.display = "none";
		}
	}
}
function getCookieBase64( name ) {
	var nc = name + "="; var x = 0;
	while ( x <= document.cookie.length ) {
		var y = (x+nc.length);
		if ( document.cookie.substring( x, y ) == nc ) {
			if ( (eoc=document.cookie.indexOf( ";", y )) == -1 )
				eoc = document.cookie.length;
			return  Base64.decode(document.cookie.substring( y, eoc ));
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) break;
	}
	return "";
}
function setCookieBase64( name, value, eds ){
	var td = new Date();
	td.setTime( td.getTime() + eds*3600*24*1000 );
	document.cookie = name + "=" +  Base64.encode(value)  + "; domain=.kma.go.kr; path=/; expires=" + td.toGMTString() +";";
}

function getCookie( name ) {
	var nc = name + "="; var x = 0;
	while ( x <= document.cookie.length ) {
		var y = (x+nc.length);
		if ( document.cookie.substring( x, y ) == nc ) {
			if ( (eoc=document.cookie.indexOf( ";", y )) == -1 )
				eoc = document.cookie.length;
			return unescape(document.cookie.substring( y, eoc ));
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) break;
	}
	return "";
}

function setCookie( name, value, eds ){
	var td = new Date();
	td.setTime( td.getTime() + eds*3600*24*1000 );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + td.toGMTString() +";";
}
function setCookieDomain( name, value, eds ){
	var td = new Date();
	td.setTime( td.getTime() + eds*3600*24*1000 );
	document.cookie = name + "=" + escape( value ) + "; path=/; domain=.kma.go.kr;expires=" + td.toGMTString() +";";
}
function changeCookie(name){
	var expireday = new Date();
	
	expireday.setDate(expireday.getDate() - 1);
	
	document.cookie = name + "=" + "; expires = "+ expireday.toGMTString() + "; path=/";
}

function delCookie(name){
	var expireday = new Date();
	
	expireday.setDate(expireday.getDate() - 1);
	
	document.cookie = name + "=" + "; expires = "+ expireday.toGMTString() + "; path=/";
}
/* roll over-out image */
function menuOver() {
	if(this.src.substring(this.src.length-7) != "_on.gif")
		this.src = this.src.replace(".gif", "_on.gif");
}
function menuClick() {
	if(this.id.indexOf("menu-image") > -1) {
		var submenu = document.getElementById("menu" + this.id.substring(10));
		var uls = submenu.getElementsByTagName("ul");
		if(uls.length>0){
			if(uls[0].style.display == "none")
				uls[0].style.display = "block";
			else
				uls[0].style.display = "none";
		}
	}
}
function menuOut() {
	this.src = this.src.replace("_on.gif", ".gif");
}

/* Tab over,out */
function initImgEffect(ImgEls,SelImg) {
	
	MenuImg = document.getElementById(ImgEls).getElementsByTagName("img");
	MenuImgLen = MenuImg.length;

	for (i=0; i<MenuImgLen; i++) {
		cacheToggleImage(MenuImg.item(i).src);
		MenuImg.item(i).onmouseover = menuOver;
		MenuImg.item(i).onmouseout = menuOut;
		if (i == SelImg) {
			MenuImg.item(i).onmouseover();
			MenuImg.item(i).onmouseover = null;
			MenuImg.item(i).onmouseout = null;
		}
	}

}
function initImgEffect2(ImgEls,SelImg) {
	var MenuH3 = document.getElementById(ImgEls).getElementsByTagName("h3");
	for(var i = 0 ; i < MenuH3.length ; i++) {
		var MenuImg = MenuH3.item(i).getElementsByTagName("img");
		var MenuImgLen = MenuImg.length;

		for (var k=0; k<MenuImgLen; k++) {
			cacheToggleImage(MenuImg.item(k).src);
			MenuImg.item(k).onmouseover = menuOver;
			MenuImg.item(k).onmouseout = menuOut;
			if (i == SelImg) {
				MenuImg.item(k).onmouseover();
				MenuImg.item(k).onmouseover = null;
				MenuImg.item(k).onmouseout = null;
			}
		}
	}
}
function cacheToggleImage(src) {
	var d = document;
	if(d.images) {
		if(!d.mmCache) document.mmCache = new Array();
		
		if(src.substring(src.length-7) != "_on.gif") {
			img1 = new Image();
			img1.src = src;
			d.mmCache[d.mmCache.length] = img1;
			src = src.replace(".gif", "_on.gif");
			img2 = new Image();
			img2.src = src;
			d.mmCache[d.mmCache.length] = img2;
		} else {
			img1 = new Image();
			img1.src = src;
			d.mmCache[d.mmCache.length] = img1;
			src = src.replace("_on.gif", ".gif");
			img2 = new Image();
			img2.src = src;
			d.mmCache[d.mmCache.length] = img2;
		}
		
	}
}

function selectTab(num,more) {
	var tab = document.getElementById("notice"); if(tab == null) return;
	var uls = tab.getElementsByTagName("ul"); if(uls == null) return;
	
	for(var i = 0 , k  = 0 ; i < uls.length ; i++){
		if(uls[i].id == "list") {
			if(k == num) uls[i].style.display = "block";
			else uls[i].style.display = "none";
			k++;
		}
	}
	
	var m = document.getElementById("notice_more"); if(m == null) return;
	m.href=more;
	MenuImg = document.getElementById("notice_tab").getElementsByTagName("img");
	MenuImgLen = MenuImg.length;
	for (i=0; i<MenuImgLen; i++) {
		cacheToggleImage(MenuImg.item(i).src);
		MenuImg.item(i).onmouseover = menuOver;
		MenuImg.item(i).onmouseout = menuOut;
		if (i == num) {
			MenuImg.item(i).onmouseover();
			MenuImg.item(i).onmouseover = null;
			MenuImg.item(i).onmouseout = null;
		}
		else {
			MenuImg.item(i).onmouseout();
		}
	}
}

/* leftmenu over,out */
function initSubmenuByMenuId(depth1, depth2, depth3,depth4, menuId) {
	selectDepth1 = "menu" + depth1 + "-" + depth2;
	selectDepth2 = "menu" + depth1 + "-" + depth2 + "-" + depth3;
	selectDepth3 = "menu" + depth1 + "-" + depth2 + "-" + depth3 + "-" + depth4;

	menuId = "menu" + depth1;

	initTopmenuByMenuId(depth1,depth2,depth3,depth4,menuId);

	nav = document.getElementById(menuId);
	if(!nav) return;
	menuEl = nav.getElementsByTagName("li");	

	for(i = 0; i < menuEl.length; i++) {
		if (menuEl.item(i).id == selectDepth1 || menuEl.item(i).id == selectDepth2  || menuEl.item(i).id == selectDepth3  ) {
			var im = menuEl.item(i).getElementsByTagName("img");
			if(im && im.length > 0 ) {
				cacheToggleImage(im.item(0).src);
				im.item(0).src = im.item(0).src.replace(".gif", "_on.gif");
			}
			else {
				var anchor = menuEl.item(i).getElementsByTagName("a");
				anchor(0).style.fontWeight = "bold";
				anchor(0).style.textDecoration = "underline";
			}
		} else {
			var im = menuEl.item(i).getElementsByTagName("img");
			if( im == null || im.length == 0)  continue;
			cacheToggleImage(im.item(0).src);
			im.item(0).onmouseover = menuOver;
			im.item(0).onmouseout = menuOut;
			im.item(0).onfocus = menuOver;
			im.item(0).onblur = menuOut;
			im.item(0).onclick = menuClick;
			if (menuEl.item(i).getElementsByTagName("ul").item(0)) {
				menuEl.item(i).getElementsByTagName("ul").item(0).style.display = "none";
			}
		}
	}	
}
function initTopMenu(el,depth1) {
	topMenuOut(el.getElementsByTagName("img").item(0));
	if(el.id == "top-menu" + depth1) {
		topMenuOver(el.getElementsByTagName("img").item(0));
	}
}
function topMenuOver(img) {
	img.src = img.src.replace(".gif", "_on.gif");
}
function topMenuOut(img) {
	img.src = img.src.replace("_on.gif", ".gif");
}
function selectTopmenuByMenuId() {
	var depth1 = this.id.substring("top-menu-head".length,this.id.length);
	var menuId = "sub-menu" + depth1;		
	var selectDepth1 = "top-" + depth1 + "-1";
	var topnav = document.getElementById("lnb");
	if(!topnav) return;
	var topEl = topnav.getElementsByTagName("ul");
	for(i = 0 ; i < topEl.length ; i++){
		if(topEl[i].id.substring(0,12) == "top-sub-menu") {
			topEl[i].style.display = "none";
		}
	}
	var topEl2 = topnav.getElementsByTagName("li");
	for(i = 0 , seq = 1; i < topEl2.length ; i++){
		if(topEl2[i].id.substring(0,8) == "top-menu") {
			initTopMenu(topEl2[i],depth1);
		}
	}
	
	var nav = document.getElementById("top-" + menuId);
	if(!nav) return;
	nav.style.display = "block";
	menuEl = nav.getElementsByTagName("li");
	for(i = 0; i < menuEl.length; i++) {
		var imgEl = menuEl.item(i).getElementsByTagName("img")
		if(imgEl != null && imgEl.length>0) {
			cacheToggleImage(imgEl.item(0).src);
			if(imgEl.item(0).src.substring(imgEl.item(0).src.length-7) == "_on.gif") {
				imgEl.item(0).onmouseover = menuOver;
				imgEl.item(0).onmouseout = null;
				imgEl.item(0).onfocus = menuOver;
				imgEl.item(0).onblur = null;
			}
			else {
				imgEl.item(0).onmouseover = menuOver;
				imgEl.item(0).onmouseout = menuOut;
				imgEl.item(0).onfocus = menuOver;
				imgEl.item(0).onblur = menuOut;
			}
		}
	}
}

/*
최영진 수정(2009-10-19)
탑메뉴 뎁스 찍기 수정
*/
function initTopmenuByMenuId(depth1, depth2, depth3, depth4, menuId) {
	var selectDepth1 = "top-" + depth1 + "-" + depth2;
	var selectDepth2 = "top-" + depth1 + "-" + depth2 + "-" + depth3;
	var selectDepth3 = "top-" + depth1 + "-" + depth2 + "-" + depth3 + "-" + depth4;
	var topnav = document.getElementById("lnb");
	if(!topnav) return;
	var topEl = topnav.getElementsByTagName("ul");	
	for(var i = 0 ; i < topEl.length ; i++){
		if(topEl[i].id.substring(0,12) == "top-sub-menu") {
			topEl[i].style.display = "none";
		}
	}
	
	var topEl2 = topnav.getElementsByTagName("a");
	for(i = 0 ; i < topEl2.length ; i++){
		if(topEl2[i].id.substring(0,13) == "top-menu-head" ) {
			var imgEl = topEl2[i].getElementsByTagName("img");
			if(imgEl) {
				cacheToggleImage(imgEl.item(0).src);	
			}
			topEl2[i].onmouseover =  selectTopmenuByMenuId;
			topEl2[i].onfocus = selectTopmenuByMenuId;
			
			if ( topEl2[i].id.substring(13) == depth1 ) {
				topEl2[i].onmouseover();
				topEl2[i].onfocus();
			}
		}
	}
	
	var nav = document.getElementById("top-" + menuId);
	if(!nav) return;
	nav.style.display = "block";
	menuEl = nav.getElementsByTagName("li");
	for(i = 0; i < menuEl.length; i++) {
		var menuElItm = menuEl.item(i);
		var imgEl = menuElItm.getElementsByTagName("img");
		if(imgEl == null || imgEl.length == 0) continue;
		var itm = imgEl.item(0);
		cacheToggleImage(itm.src);
		if (menuElItm.id == selectDepth1 || menuElItm.id == selectDepth2  || menuElItm.id == selectDepth3  ) {			
			itm.src = itm.src.replace(".gif", "_on.gif");
			itm.onmouseover = null;
			itm.onmouseout = null;
			itm.onfocus = null;
			itm.onblur = null;
		}
		else {
			itm.onmouseover = menuOver;
			itm.onmouseout = menuOut;
			itm.onfocus = menuOver;
			itm.onblur = menuOut;
		}
	}
}

/*  메인 화면 게시판 마우스 이벤트 처리 */
function initTabMenu(tabContainerID, initTab) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;

	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		cacheToggleImage(thismenu.getElementsByTagName("img").item(0).src);
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);		
		thismenu.onclick = tabMenuClick;
		if(initTab && thismenu.targetEl.id == initTab) {
			thismenu.container.first = thismenu;
		} else {
			if (!thismenu.container.first)
				thismenu.container.first = thismenu;
		}
	}
	if (tabContainer.first)
			tabContainer.first.onclick();
}
function tabMenuClick() {
	currentmenu = this.container.current;
	if (currentmenu != this) {
		if (currentmenu) {
			currentmenu.targetEl.style.display = "none";
			if (currentmenu.imgEl) {
				cacheToggleImage(currentmenu.imgEl.src);
				currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
			} else {
				currentmenu.className = currentmenu.className.replace(" on", "");
			}
		}

		this.targetEl.style.display = "block";
		if (this.imgEl) {
			cacheToggleImage(this.imgEl.src);
			this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
		} else {
			this.className += " on";
		}
		this.container.current = this;
	}
	return false;
}


/***************************************************************************************************/
// 플로터 - 범위제한
//ex) initMoving("idname",884,500);
//2008.5.13 수정
function initMoving(id,xleft,ytop) {
	target = document.getElementById(id);
	if (!target) return false;
	var obj = target;
	obj.initLeft = xleft;//절대좌표x
	obj.initTop = ytop;//절대좌표y
	obj.bottomLimit = document.documentElement.scrollHeight - 540;//obj높이370+foot높이240-70
	obj.topLimit = ytop;
	obj.style.position = "absolute";
	obj.top = obj.initTop;
	obj.left = obj.initLeft;
	obj.style.top = obj.top + "px";
	obj.style.left = obj.left + "px";

	obj.getTop = function() {
		if (document.documentElement.scrollTop) {
			return document.documentElement.scrollTop;
		} else if (window.pageYOffset) {
			return window.pageYOffset;
		} else {
			return 0;
		}
	}
	obj.getHeight = function() {
		if (self.innerHeight) {
			return self.innerHeight;
		} else if(document.documentElement.clientHeight) {
			return document.documentElement.clientHeight;
		} else {
			return 550;//스크롤없을때윈도우표시영역높이-수정필요없음
		}
	}
	obj.move = setInterval(function() {
		pos = obj.getTop() + obj.getHeight()/2 - obj.clientHeight;

		if (pos > obj.bottomLimit)
			pos = obj.bottomLimit
		if (pos < obj.topLimit)
			pos = obj.topLimit

		interval = obj.top - pos;
		obj.top = obj.top - interval / 3;
		obj.style.top = obj.top + "px";
	}, 40)
}

/***************************************************************************************************/

//IE Flicker Bug (function(){ /*Use Object Detection to detect IE6*/ var m = document.uniqueID /*IE*/ && document.compatMode /*>=IE6*/ && !window.XMLHttpRequest /*<=IE6*/ && document.execCommand ; try{ if(!!m){ m("BackgroundImageCache", false, true) /* = IE6 only */ } }catch(oh){}; })(); //png function setPng24(obj) { obj.width=obj.height=1; obj.className=obj.className.replace(/\bpng24\b/i,''); obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');" obj.src=''; return ''; }
function setPng24(obj) {
 obj.width=obj.height=1;
 obj.className=obj.className.replace(/\bpng24\b/i,"/images/common/blank.gif"); 
 obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+ obj.src +"\",sizingMethod=\"image\");"
 obj.src="/images/common/blank.gif";
 return "";
}

// 프린트스크립트
function contentPrint() { 
	var windowLeft = (screen.width-665)/2;
//	var windowTop = (screen.height-480)/2;
	var windowTop = 20;
	var printURL = "/include/printpage.html";
	 window.open(printURL,"content",'width=665, height=620, menubar=yes, scrollbars=yes,status=no,resizable=yes,top=' + windowTop + ',left=' + windowLeft + '');
}


//바로가기
function goUri(uri,target) { 
	if(uri!="") { window.open(uri,target); }
}
//목록상자바로가기
function goSelect(form,target) {
	var myindex=form.uri.selectedIndex
	myUri = form.uri.options[myindex].value;
	if(myUri!="") window.open(myUri,target);
}
//목록상자바로가기2
function goSelectAction(form,target) {
	var myUri = form.uri.value;
	if(myUri!="") { 
		form.action=myUri;
		form.target=target;
		form.submit();
	}
}


function getvodWMV7(murl,mw,mh) //WMPlayer ver7 이상
{
	(mw)? mw = mw : mw = 280;
	(mh)? mh = mh : mh = 280;
	document.writeln('<object classid="clsid:6bf52a52-394a-11d3-b153-00c04f79faa6" type="application/x-oleobject" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#version=6,4,7,1112"');//IE 전용 ActiveX
	document.writeln(' id="player" width="'+ mw +'" height="'+ mh +'">');//IE : 크기를 %로 하면 마우스 오버해야 보임.
	document.writeln('<param name="url" value="'+ murl +'" /> ');
	document.writeln('<param name="autoStart" value="false" />');
	document.writeln('<param name="uiMode" value="full" />');
	document.writeln('<param name="stretchToFit" value="false" />');
	document.writeln('<param name="fullScreen" value="false" />');
	document.writeln('<!--[if !IE]>-->');//IE 조건주석문 - 없으면 IE6에서 2번 보임.
	document.writeln('<object type="video/x-ms-wmv" data="'+ murl +'" width="'+ mw +'" height="'+ mh +'">');//FF,Op,Sf 사용.. parameter 부분지원
	document.writeln('<param name="controller" value="true" />');
	document.writeln('<param name="autostart" value="false" />'); //Vista FF, Op WMP11 지원
	document.writeln('<div>동영상파일 : <a tabindex="0" href="'+ murl +'">'+ murl +'</a></div>');//대체콘텐츠
	document.writeln('</object>');
	document.writeln('<!--<![endif]-->');
	document.writeln('');//여기에 대체콘텐츠를 두면 안됨
	document.writeln('</object>');
}

// 팝업 스크립트
function attachFile(winURL){
 window.open(winURL,"newWin","width=442px, height=396px");}

//통합
function sFocus(i) {
	(i).style.border='1px solid #0958a5';
	(i).style.background='#fff none';
	(i).style.letterSpacing='normal';

}
function sBlur(i) {
	(i).style.border='1px solid #bbb';
}

function mainBoardChange(idx) {
	var obj;
	var obj2;
	for (var z=1; z<=3; z++) {
		obj = document.getElementById('mainBoard' + z);
		obj2 = document.getElementById('mainBoardMore' + z);
		obj3 = document.getElementById('bImg' + z);
		if ( obj && obj2 && obj3 ) {
			ln1 = obj3.src.substring(0,obj3.src.lastIndexOf(".") -1) + "2.gif";
			ln2 = obj3.src.substring(0,obj3.src.lastIndexOf(".") -1) + "1.gif";
			if (z == idx){
				obj.className="";
				obj2.className="more";
				obj3.src = ln1;
			} else {
				obj.className="hid";
				obj2.className="more_hid";
				obj3.src = ln2;
			}

		}
	}
}


function setPng24(obj) {
 obj.width=obj.height=1;
 obj.className=obj.className.replace(/\bpng24\b/i,"/eng/images/common/blank.gif"); 
 obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+ obj.src +"\",sizingMethod=\"image\");"
 obj.src="/eng/images/common/blank.gif";
 return "";
}
function myareaSearchToggle(divName){
	var el=document.getElementById(divName);
	if(el) {
		if(el.style.display == "none") {
			el.style.display = "block";
		} else {
			el.style.display = "none";
		}
	}
}
function toggle(divName){
	var el=document.getElementById(divName);
	if(el) {
		if(el.style.display == "none") {
			el.style.display = "block";
		} else {
			el.style.display = "none";
		}
	}
}
function showLayer(divName) {
	var el=document.getElementById(divName);
	if(el && el.style.display != "block") el.style.display = "block";
}
function hideLayer(divName) {
	var el=document.getElementById(divName);
	if(el && el.style.display != "none") el.style.display = "none";
}
function tabMenuOut(divName) {
	var el = document.getElementById(divName);
	if(!el) return;
	var el_child = el.getElementsByTagName("img");
	for(i = 0 ; i < el_child.length ; i++){
		el_child[i].src = el_child[i].src.replace("_on.gif", ".gif");
	}
}
function openTopMenuDiv(divName){
	var allmenuDiv=document.getElementById("allmenu");
	var englisSiteDiv=document.getElementById("englisSite");
	if(divName==''){
		allmenuDiv.style.display="none";
		englisSiteDiv.style.display="none";
	}else if(divName=='allmenu'){
		allmenuDiv.style.display="block";
		englisSiteDiv.style.display="none";
	}else{
		allmenuDiv.style.display="none";
		englisSiteDiv.style.display="block";
	}
	
}

// 탭메뉴
function ctabmenuView(a) {
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("ctabmenu")) return false;
	
	var a;
	var el = document.getElementById("ctab4m"+a);
	if(el && el.nodeName == "LI"){
		el.className = "on";
		el.getElementsByTagName("a")[0].className = "on";
	}
}

function cssOn(){
	css = this.className;
	if(css==""){
		this.className = "css_on";
	}else{
		css = css.replace("css_off","");
		css = css.replace("css_off","");
		css = css.replace("  "," ");
		
		if(this.className != "css_on"){
			this.className = "css_on "+css;
		}
	}
}

function cssOff(){
	css = this.className;
	if(css==""){
		this.className = "css_off";
	}else{
		css = css.replace("css_on","");
		css = css.replace("css_off","");
		css = css.replace("  "," ");
		
		if(this.className != "css_off"){
			this.className = "css_off "+css;
		}
	}
}

function tabmenu(id,no){
	var tab = document.getElementById(id).getElementsByTagName("li");
	
	for (i=0; i<tab.length; i++){
		tab.item(i).onmouseover = cssOn;
		tab.item(i).onfocus = cssOn;
		tab.item(i).onmouseout = cssOff;
		tab.item(i).onblur = cssOff;
	
		if (i == no) {
			tab.item(i).onmouseover();
			tab.item(i).onmouseover = null;
			tab.item(i).onmouseout = null;
		}
	}

}

/* 도움말 left 메뉴 */
function initSubmenuByMenuId2(depth1, depth2, depth3,depth4, menuId) {
	selectDepth1 = "menu" + depth1 + "-" + depth2;
	selectDepth2 = "menu" + depth1 + "-" + depth2 + "-" + depth3;
	selectDepth3 = "menu" + depth1 + "-" + depth2 + "-" + depth3 + "-" + depth4;
	
	nav = document.getElementById(menuId);
	if(!nav) return;
	menuEl = nav.getElementsByTagName("li");	
		
	
	for(i = 0; i < menuEl.length; i++) {
		if (menuEl.item(i).id == selectDepth1 || menuEl.item(i).id == selectDepth2  || menuEl.item(i).id == selectDepth3  ) {
			var im = menuEl.item(i).getElementsByTagName("img");
			if(im && im.length > 0 ) {
				cacheToggleImage(im.item(0).src);
				im.item(0).src = im.item(0).src.replace(".gif", "_on.gif");
			}
			else {
				var anchor = menuEl.item(i).getElementsByTagName("a");
				anchor(0).style.color = "#499a01";
				anchor(0).style.textDecoration = "underline";
			}
		} else {
			var im = menuEl.item(i).getElementsByTagName("img");
			if( im == null || im.length == 0)  continue;
			cacheToggleImage(im.item(0).src);
			im.item(0).onmouseover = menuOver;
			im.item(0).onmouseout = menuOut;
			im.item(0).onfocus = menuOver;
			im.item(0).onblur = menuOut;
			im.item(0).onclick = menuClick;
			if (menuEl.item(i).getElementsByTagName("ul").item(0)) {
				menuEl.item(i).getElementsByTagName("ul").item(0).style.display = "none";
			}
		}
	}	
	menuId = "menu" + depth1;
	initTopmenuByMenuId(depth1,depth2,depth3,depth4,menuId);
}

//글로벌 외국어
//보이기감추기 여러개
function displayOn() {//보이기
	var i,j,a=displayOn.arguments;
	for(var i=0;i<a.length;i++){
		var obj = document.getElementById(a[i]);
		if(obj){ obj.style.display = "block"; }
	}
}
function displayOff() {//감추기
	var i,j,a=displayOff.arguments;
	for(var i=0;i<a.length;i++){
		var obj = document.getElementById(a[i]);
		if(obj){ obj.style.display = "none"; }
		if(a[i] == "menuopen") {
			var btn = document.getElementById('menuopen_btn');
			if(btn) btn.focus();
		}
	}
}
function openRss(link) { 
	window.clipboardData.setData('Text', link.href);
	alert("주소를 클립보드에 복사하였습니다.");
	window.open(link.href);
}
function originalImageSize(id) {
	var img = document.getElementById(id);
	if(img) img.style.width = "";
}

function set_cookie(name, value, expirehours, domain) {
	var today = new Date();
	today.setTime(today.getTime() + (60*60*1000*expirehours));
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
	if (domain) {
		document.cookie += "domain=" + domain + ";";
	}
}


function get_cookie(name) {
	var find_sw = false;
	var start, end;
	var i = 0;

	for (i=0; i<= document.cookie.length; i++) {
		start = i;
		end = start + name.length;

		if(document.cookie.substring(start, end) == name) {
			find_sw = true
			break
		}
	}

	if (find_sw == true) {
		start = end + 1;
		end = document.cookie.indexOf(";", start);

		if(end < start)
			end = document.cookie.length;

		return document.cookie.substring(start, end);
	}
	return "";
}

// 쿠키 지움
function delete_cookie(name) {
	var today = new Date();

	today.setTime(today.getTime() - 1);
	var value = get_cookie(name);
	if(value != "")
		document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}


function getFontSize() {
    var fontSize = parseInt(get_cookie("ck_fontsize")); // 폰트크기 조절
    if (isNaN(fontSize)) { fontSize = 12; }
    return fontSize;
}

function scaleFont(val) {
    var fontSize = getFontSize();
    var fontSizeSave = fontSize;
    if (val > 0) {
        if (fontSize <= 18) {
            fontSize = fontSize + val; 
        }
    } else if(val == 0){
		fontSize = 12;
	} else {
        if (fontSize > 12) {
            fontSize = fontSize + val; 
        }
    }
    if (fontSize != fontSizeSave) {
        drawFont(fontSize);
    }
    set_cookie("ck_fontsize", fontSize, 30); 
}

function drawFont(fontSize) {
    if (!fontSize) {
        fontSize = getFontSize();
    }
	document.body.style.fontSize = fontSize + "px";
}
//2011.07.20 추가 : 오른쪽버튼 클릭 방지
document.oncontextmenu = function(e){
	//alert("오른쪽버튼을 이용할 수 없습니다.");
	//return false;
}
//드래그 금지
document.ondragstart = function(e){
	//alert("드래그 금지된 페이지입니다.");
	//return false;
}
//선택복사 금지
document.onselectstart = function(e){
	//alert("선택복사 금지된 페이지입니다.");
	//return false;
}
//ctrl,shift 키 금지
function click(e){
    if (typeof(e) == 'undefined') {
        e = event;
    }
	if((e.ctrlKey) || (e.shiftKey)){
		//alert('ctrl, shift 키가 금지된 페이지입니다.');
	}
}
document.onmousedown = click;
document.onkeydown = click;


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}
