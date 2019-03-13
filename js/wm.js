//ID选择器
function d(id){
	return document.getElementById(id);
}

//class选择器
function c(cls){
	return document.getElementsByClassName(cls);
}

//元素选择器
function n(name){
	return document.getElementsByTagName(name);
}

//创建元素器
function creat(object){
	return document.createElement(object);
}

//封装获取URL参数方法
function getUrlVal(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

//封装log方法
var log = console.log;
var dir = console.dir;

//弹窗
function alern(text,name,btn,btns){
	if(text == undefined){
		text = '';
	}
	if(name == undefined||name == ''){
		name = '温馨提醒';
	}
	if(btn == undefined||btn == ''){
		btn = '确定';
	}
	if(btns == ''){
		btns = '取消';
	}
	var body = n('body')[0];
	var fixed = creat('div');
	if(c('fixed').length > 0){
		c('fixed')[0].parentNode.removeChild(c('fixed')[0]);
	}
	var div = creat('div');
	fixed.className = 'fixed';
	setStyle(fixed,{width: '100%',height: '100%',position: 'fixed',top: '0px',left: '0px',zIndex: '9999999',backgroundColor: 'rgba(0,0,0,0.7)'});

	div.className = 'fixed_body';
	setStyle(div,{display: 'inline-block',width: 'auto',height: 'auto',minWidth: '300px',maxWidth: '500px',minHeight: '200px',position: 'absolute',top: '50%',left: '50%',backgroundColor: '#ffffff',boxShadow: '0px 0px 3px #a4a4a4'});
	var divHead = creat('p');
	var divbody = creat('div');
	var divbtn = creat('button');
	var divbtns = creat('button');
	divHead.innerHTML = name;
	setStyle(divHead,{width: '97%',height: '39px',lineHeight: '39px',paddingLeft: '3%',borderBottom: '1px #e5e5e5 solid'});

	divbody.innerHTML = text;
	setStyle(divbody,{width: '90%',height: 'auto',minHeight: '60px',maxHeight: window.innerHeight - 400 + 'px',overflowY: 'auto',marginLeft: '5%',marginTop: '20px',marginBottom: '20px',fontSize: '15px'});

	divbtn.innerHTML = btn;
	setStyle(divbtn,{width: '100px',height: '40px',textAlign: 'center',lineHeight: '40px',backgroundColor: '#0D6FB8',color: '#ffffff',border: 'none',outline: 'none',cursor: 'pointer',float: 'right',marginBottom: '20px',marginRight: '20px',borderRadius: '5px'});

	divbtns.innerHTML = btns;
	setStyle(divbtns,{width: '100px',height: '40px',textAlign: 'center',lineHeight: '40px',backgroundColor: '#0D6FB8',color: '#ffffff',border: 'none',outline: 'none',cursor: 'pointer',float: 'right',marginBottom: '20px',marginRight: '20px',borderRadius: '5px'});
	div.appendChild(divHead);
	div.appendChild(divbody);
	div.appendChild(divbtns);
	div.appendChild(divbtn);
	if(btns == undefined){
		divbtns.style.display = 'none';
	}
	fixed.appendChild(div);
	body.appendChild(fixed);
	div.style.marginTop = -div.clientHeight/2 + 'px';
	div.style.marginLeft = -div.clientWidth/2 + 'px';
	divbtn.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	}
	divbtn.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtn.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtn.onmouseup = function(){
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = false;
	}
	divbtns.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	}
	divbtns.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtns.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	}
	divbtns.onmouseup = function(){
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = false;
	}
	document.onkeydown = function(e){
		if(e.keyCode == 13){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = false;
		}
		if(e.keyCode == 32){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = false;
			return false;
		}
	}
}

//加载动画
var loadingTimore;
function loading(text){
	if(text == undefined){
		text = "加载中";
	}
	var body = n('body')[0];
	var load = creat('div');
	load.className = "body_load";
	setStyle(load,{width: '100%',height: '100%',position: 'fixed',left: '0px',top: '0px',backgroundColor: 'rgba(0,0,0,0.7)',zIndex: '9999999'});
	var loadDiv = creat('div');
	setStyle(loadDiv,{width: '160px',height: '160px',position: 'absolute',top: '50%',left: '50%',marginTop: '-80px',marginLeft: '-80px'})
	var loadDivItem = creat('div');
	setStyle(loadDivItem,{width: '160px',height: '160px',position: 'absolute',top: '0px',left: '0px',textAlign: 'center',fontSize: '12px',lineHeight: '160px',color: '#ffffff'});
	loadDiv.appendChild(loadDivItem);
	loadDivItem.innerHTML = text;
	var loadCount = 0;
	loadingTimore = setInterval(function(){
		loadCount++;
		if(loadCount == 1){
			loadDivItem.innerHTML = text + '●';
		}
		if(loadCount == 2){
			loadDivItem.innerHTML = text + '●●';
		}
		if(loadCount == 3){
			loadDivItem.innerHTML = text + '●●●';
			loadCount = 0;
		}
	},300);
	var loadDivImg = new Image();
	loadDivImg.src = 'image/loading.png';
	loadDivImg.className = 'body_load_div_image';
	setStyle(loadDivImg,{width: '100%',height: '100%',position: 'absolute',top: '0px',left: '0px'});
	loadDiv.appendChild(loadDivImg);
	load.appendChild(loadDiv);
	log(body);
	if(body != undefined){
		body.appendChild(load);
	}
}
//关闭加载动画
function loadingClear(){
	clearInterval(loadingTimore);
	var body = n('body')[0];
	var load = c('body_load')[0];
	body.removeChild(load);
}

//ajax请求
function ajax(type,url,data,succ,error,json,async,header){
	var xhr = new XMLHttpRequest ();
	if(async != true&&async != false){
		async = true;
	}
	xhr.open(type,url,async);
	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				if(json == 'json'){
					succ(JSON.parse(xhr.responseText));
				}else{
					succ(xhr.responseText);
				}
			}else{
				error(xhr.status);
			}
		}
	}
}

//js中批量给元素添加innerHTML方法封装
function setHTML(domArr,objArr){
	for(var i = 0; i < domArr.length; i++){
		domArr[i].innerHTML = objArr[i];
	}
}
//js中批量修改样式的方法封装
function setStyle(dom,json){
	for(var i in json){
		dom.style[i] = json[i];
	}
}
//js中批量修改样式的方法封装(主要用于页面准备样式添加)
function setStyleX(text){
	var wmHead = n('head')[0];
	if(c('wmStyle')[0] == undefined){
		var wmStyle = creat('style');
		wmStyle.type = 'text/css';
		wmStyle.className = 'wmStyle';
		wmHead.appendChild(wmStyle);
	};
	c('wmStyle')[0].innerHTML = c('wmStyle')[0].innerHTML + text;
}

//添加页面需要的样式
setStyleX('/*加载动画Class*/.body_load_div_image{animation: loadDiv 0.8s linear 0s infinite;}@keyframes loadDiv{0%{transform: rotate(0deg)}100%{transform: rotate(360deg)}}/*下拉框样式渲染*/.wm_select_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.wm_select_item{height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;display: none;}.wm_select_item_list{width: 100%;height: auto;padding: 8px 5px;box-sizing: border-box;font-size: 14px;cursor: pointer;user-select: none;}/*日期（时间）选择器样式渲染*/.ui_datapicker{width: auto;height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-radius: 4px;padding: 3px;}.wm_datapicker_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.ui_datapicker_table{width: 210px;height: 40px;border-collapse:collapse;font-family: "Microsoft YaHei","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif;background-color: "#e5e5e5";}.ui_datapicker_table tr>th,.ui_datapicker_table tr>td{height: 30px;border-radius: 4px;padding: 5px; box-sizing: border-box;border: none;cursor: pointer;color: #333333;font-size: 14px;user-select: none;}.ui_datapicker_table tr>th:hover,.ui_datapicker_table tr>td:hover{background-color: #e5e5e5;}');

//批量append目标
function setAppend(dom,arr){
	for(var i = 0; i < arr.length; i++){
		dom.appendChild(arr[i]);
	}
}

window.onload = function(){
	//自定义下拉框封装
	function WmStartSelect(){
		var wmPack = c('wm_pack')[0];
		var wmSelect = c('wm_select');
		if(wmSelect.length > 0&& wmPack != undefined){
			wmPack.style.position = 'relative';
			for(var i = 0; i < wmSelect.length; i++){
				wmSelect[i].style.cursor = 'pointer';
				wmSelect[i].style.userSelect = 'none';
				//添加下拉倒三角标记
				var mark = creat('div');
				mark.className = 'wm_select_mark';
				mark.style.top = wmSelect[i].offsetTop + wmSelect[i].clientHeight/2 - 1 + 'px';
				mark.style.left = wmSelect[i].offsetLeft + wmSelect[i].clientWidth - 15 + 'px';
				wmPack.appendChild(mark);

				wmSelect[i].readOnly = true;
				if(wmSelect[i].dataset.select != undefined){
					var wmSelectArr = wmSelect[i].dataset.select.split(",");
				}else{
					var wmSelectArr = new Array();
				}
				var wmSelectArray = new Array();
				var wmSelectObj = new Object();
				wmSelectObj.index = i;
				wmSelectObj.value = '请选择...';
				wmSelectArray.push(wmSelectObj);
				for(var j = 0; j < wmSelectArr.length; j++){
					var wmSelectObj = new Object();
					wmSelectObj.index = i;
					wmSelectObj.value = wmSelectArr[j];
					wmSelectArray.push(wmSelectObj);
				}
				var div = creat('div');
				div.className = 'wm_select_item';
				div.style.width = wmSelect[i].clientWidth + 'px';
				div.style.top = wmSelect[i].offsetTop + wmSelect[i].clientHeight + 2 + 'px';
				div.style.left = wmSelect[i].offsetLeft + 'px';
				for(var j = 0; j < wmSelectArray.length; j++){
					var list = creat('div');
					list.className = 'wm_select_item_list';
					list.innerHTML = wmSelectArray[j].value;
					if(wmSelectArray[j].value == '请选择...'){
						list.style.color = '#666666';
					}
					list.setAttribute('data-index',wmSelectArray[j].index);
					list.onmouseover = function(){
						this.style.backgroundColor = '#e5e5e5';
					}
					list.onmouseout = function(){
						this.style.backgroundColor = '#ffffff';
					}
					list.onmousedown = function(){
						if(this.innerHTML == '请选择...'){
							wmSelect[this.dataset.index].value = "";
						}else{
							wmSelect[this.dataset.index].value = this.innerHTML;
						}
					}
					div.appendChild(list);
				}
				wmPack.appendChild(div);
				(function(q){
					wmSelect[q].onfocus = function(){
						c('wm_select_item')[q].style.display = 'block';
					}
					wmSelect[q].onblur = function(){
						c('wm_select_item')[q].style.display = 'none';
					}
				})(i);
			}
		};
		
	}
	WmStartSelect();
	//日期(时间)选择器封装
	function WmStartDatapicker(){
		var wmPack = c('wm_pack')[0];
		var wmDatapicker = c('wm_datapicker');

		var wmDate = new Date();
		if(wmDatapicker.length > 0&& wmPack != undefined){
			for(var i = 0; i < wmDatapicker.length; i++){
				wmDatapicker[i].style.cursor = 'pointer';
				wmDatapicker[i].style.userSelect = 'none';
				wmDatapicker[i].readOnly = true;

				//加入input框下拉标识
				var mark = creat('div');
				mark.className = 'wm_datapicker_mark';
				mark.style.top = wmDatapicker[i].offsetTop + wmDatapicker[i].clientHeight/2 - 1 + 'px';
				mark.style.left = wmDatapicker[i].offsetLeft + wmDatapicker[i].clientWidth - 15 + 'px';
				wmPack.appendChild(mark);

				var div = creat('div');
				div.className = 'ui_datapicker';
				div.style.top = wmDatapicker[i].offsetTop + wmDatapicker[i].clientHeight + 2 + 'px';
				div.style.left = wmDatapicker[i].offsetLeft + 'px';
				var table = creat('table');
				table.className = 'ui_datapicker_table';
				var thead = creat('thead');
				function wmTheada(){
					var tra = creat('tr');
					var thaa = creat('th');
					var thab = creat('th');
					var thac = creat('th');
					var thad = creat('th');
					thaa.innerHTML = '«';
					thab.colSpan = '3';
					thab.innerHTML = wmDate.getFullYear();
					thac.colSpan = '2';
					thac.innerHTML =  wmDate.getMonth() + 1;
					thad.innerHTML = '»';
					setAppend(tra,[thaa,thab,thac,thad]);
					thead.appendChild(tra);
					var trb = creat('tr');
					var thba = creat('th');
					var thbb = creat('th');
					var thbc = creat('th');
					var thbd = creat('th');
					var thbe = creat('th');
					var thbf = creat('th');
					var thbg = creat('th');
					setHTML([thba,thbb,thbc,thbd,thbe,thbf,thbg],['一','二','三','四','五','六','七']);
					setAppend(trb,[thba,thbb,thbc,thbd,thbe,thbf,thbg]);
					thead.appendChild(trb);
				}
				wmTheada();
				var tbody = creat('tbody');
				function wmTbody(){
					for(var i = 0; i < 6; i++){
						var tr = creat('tr');
						for(var j = 0; j < 7; j++){
							var td = creat('td');
							tr.appendChild(td);
						}
						tbody.appendChild(tr);
					}
				}
				wmTbody();
				table.appendChild(thead);
				table.appendChild(tbody);
				div.appendChild(table);
				wmPack.appendChild(div);
				(function(q){
					wmDatapicker[q].onfocus = function(){
						c('ui_datapicker')[q].style.display = 'block';
					}
					wmDatapicker[q].onblur = function(){
						c('ui_datapicker')[q].style.display = 'none';
					}
				})(i);
			}
		}
		
	}
	WmStartDatapicker();
}
/*for(var j = 0; j < wmDatapicker[i].classList.length; j++){
	log(wmDatapicker[i].classList[j] == 'wm_datapicker_time');
}*/