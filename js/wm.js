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

//query选择器
function qll(string){	//传入任意CSS选择器即可
	return document.querySelectorAll(string);
}

//创建元素器
function creat(object){	//传入需要创建的元素
	return document.createElement(object);
}

//添加事件触发器
function Add(dom,even,method,capture){	//dom为要绑定事件的元素 even为事件名称 emthod为传入一个方法function(){} capture传入一个布尔值
	//capture的值中false为冒泡方式，true为捕获方式，默认为false	
	//冒泡指点击事件由当前点击对象由内而外触发到最外层的父元素的所有点击事件
	//捕获指点击事件由当前点击对象由外而内的最外层元素开始触发一直触发到当前点击事件对象的方法
	if(capture){
		capture = false;
	}
	dom.addEventListener(even,function(){
		method()
	},capture);
}

//封装获取URL参数方法
function getUrlVal(name){	//name为要获取的URL参数名
	let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
	r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

//封装log方法
let log = console.log,
	dir = console.dir;

//弹窗
function alern(text,name,btn,btns){	//text为要弹出的提示文字 name为提示窗的标题 btn为确认按钮 btns为取消按钮
	if(text === undefined){
		text = '';
	}
	if(name === undefined||name === ''){
		name = '温馨提醒';
	}
	if(btn === undefined||btn === ''){
		btn = '确定';
	}
	if(btns === ''){
		btns = '取消';
	}
	let body = n('body')[0],
	fixed = creat('div'),
	div = creat('div');
	if(c('fixed').length > 0){
		c('fixed')[0].parentNode.removeChild(c('fixed')[0]);
	}
	fixed.className = 'fixed';
	setStyle(fixed,{width: '100%',height: '100%',position: 'fixed',top: '0px',left: '0px',zIndex: '9999999',backgroundColor: 'rgba(0,0,0,0.7)'});

	div.className = 'fixed_body';
	setStyle(div,{display: 'inline-block',width: 'auto',height: 'auto',minWidth: '300px',maxWidth: '500px',minHeight: '200px',position: 'absolute',top: '50%',left: '50%',backgroundColor: '#ffffff',boxShadow: '0px 0px 3px #a4a4a4'});
	let divHead = creat('p'),
	 	divbody = creat('div'),
	 	divbtn = creat('button'),
	 	divbtns = creat('button');
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
	if(btns === undefined){
		divbtns.style.display = 'none';
	}
	fixed.appendChild(div);
	body.appendChild(fixed);
	div.style.marginTop = -div.clientHeight/2 + 'px';
	div.style.marginLeft = -div.clientWidth/2 + 'px';
	divbtn.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	};
	divbtn.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtn.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtn.onmouseup = function(){
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = function(){};
	};
	divbtns.onmouseover = function(){
		divbtn.style.backgroundColor = '#0E76C6';
	};
	divbtns.onmouseout = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtns.onmousedown = function(){
		divbtn.style.backgroundColor = '#0D6FB8';
	};
	divbtns.onmouseup = function(){
		fixed.parentNode.removeChild(fixed);
		divbtn.style.backgroundColor = '#0E76C6';
		document.onkeydown = function(){};
	};
	document.onkeydown = function(e){
		e = e || window.event;
		key = e.keyCode || e.which || e.charCode;
		if(key === 13){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = function(){};
			if(e && e.preventDefault){
				e.preventDefault();
			}else{//IE阻止默认事件
				window.event.returnValue = false;
				return false;
			}
		}
		if(key === 32){
		fixed.parentNode.removeChild(fixed);
			document.onkeydown = function(){};
			if(e && e.preventDefault){
				e.preventDefault();
			}else{//IE阻止默认事件
				window.event.returnValue = false;
				return false;
			}
		}
	}
}

//加载动画
let loadingTiMore;
function loading(text){	//text为加载提示文字
	if(text === undefined){
		text = "加载中";
	}
	let body = n('body')[0],
		load = creat('div');
	load.className = "body_load";
	setStyle(load,{width: '100%',height: '100%',position: 'fixed',left: '0px',top: '0px',backgroundColor: 'rgba(0,0,0,0.7)',zIndex: '9999999'});
	let loadDiv = creat('div');
	setStyle(loadDiv,{width: '160px',height: '160px',position: 'absolute',top: '50%',left: '50%',marginTop: '-80px',marginLeft: '-80px'});
	let loadDivItem = creat('div');
	setStyle(loadDivItem,{width: '160px',height: '160px',position: 'absolute',top: '0px',left: '0px',textAlign: 'center',fontSize: '12px',lineHeight: '160px',color: '#ffffff'});
	loadDiv.appendChild(loadDivItem);
	loadDivItem.innerHTML = text;
	let loadCount = 0;
	loadingTiMore = setInterval(function(){
		loadCount++;
		if(loadCount === 1){
			loadDivItem.innerHTML = text + '●';
		}
		if(loadCount === 2){
			loadDivItem.innerHTML = text + '●●';
		}
		if(loadCount === 3){
			loadDivItem.innerHTML = text + '●●●';
			loadCount = 0;
		}
	},300);
	let loadDivImg = new Image();
	loadDivImg.src = 'image/loading.png';
	loadDivImg.className = 'body_load_div_image';
	setStyle(loadDivImg,{width: '100%',height: '100%',position: 'absolute',top: '0px',left: '0px'});
	loadDiv.appendChild(loadDivImg);
	load.appendChild(loadDiv);
	log(body);
	if(body !== undefined){
		body.appendChild(load);
	}
}
//关闭加载动画
function loadingClear(){
	clearInterval(loadingTiMore);
	let body = n('body')[0],
		load = c('body_load')[0];
	body.removeChild(load);
}

//阻止浏览器默认事件
function BlockDefault(e){
	if(e && e.preventDefault){
		e.preventDefault();
	}else{//IE阻止默认事件
		window.event.returnValue = false;
		return false;
	}
}

//ajax请求
function ajax(type,url,data,succ,error,json,header,async){	//type为设置请求方法 url为请求的地址 data为传递的参数 succ为成功时执行的操作 error为失败时执行的操作 json只能传入一个json字符串，代表将接收到的数据转换为json对象 header为设置请求头部信息 async为是否异步传入默认异步
	let xhr = new XMLHttpRequest ();
	if(async !== true&&async !== false){
		async = true;
	}
	xhr.open(type,url,async);
	if(header === true||header === false||header === ""||header === undefined){
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}else{
		xhr.setRequestHeader("Content-Type", header);
	}
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				if(json === 'json'){
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
function setHTML(domArr,objArr){	//domArr为dom数组集合 objArr为被添加的字符串组成的数组
	for(let i = 0; i < domArr.length; i++){
		domArr[i].innerHTML = objArr[i];
	}
}
//js中批量修改样式的方法封装
function setStyle(dom,json){	//dom为元素 json为要更改的样式键值对
	for(let i in json){
		if(!json.hasOwnProperty(i)) continue;
		dom.style[i] = json[i];
	}
}
//js中批量设置className方法封装
function setClass(domArr,objArr){
	for(let i = 0; i < domArr.length; i++){
		domArr[i].className = objArr[i];
	}
}
//js中批量修改样式的方法封装(主要用于页面准备样式添加)
function setStyleX(text){
	let wmHead = n('head')[0];
	if(c('wmStyle')[0] === undefined){
		let wmStyle = creat('style');
		wmStyle.type = 'text/css';
		wmStyle.className = 'wmStyle';
		wmHead.appendChild(wmStyle);
	}
	c('wmStyle')[0].innerHTML = c('wmStyle')[0].innerHTML + text;
}

//添加页面需要的样式
setStyleX('/*加载动画Class*/.body_load_div_image{animation: loadDiv 0.8s linear 0s infinite;}@keyframes loadDiv{0%{transform: rotate(0deg)}100%{transform: rotate(360deg)}}/*下拉框样式渲染*/.wm_select_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.wm_select_item{height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;display: none;z-index: 999;overflow-y: auto;}.wm_select_item_list{width: 100%;height: auto;padding: 8px 5px;box-sizing: border-box;font-size: 14px;cursor: pointer;user-select: none;}/*复选下拉框样式渲染*/.wm_check_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.wm_check_item{height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;display: none;z-index: 999;overflow-y: auto;}.wm_check_item_list{width: 100%;height: auto;padding: 8px 5px;box-sizing: border-box;font-size: 14px;cursor: pointer;user-select: none;}/*日期（时间）选择器样式渲染*/.ui_datapicker{width: auto;height: auto;position: absolute;border: 1px #e5e5e5 solid;background-color: #ffffff;border-radius: 4px;padding: 3px;}.wm_datapicker_mark{width: 0px;height: 0px;border: 5px rgba(0,0,0,0) solid;border-top: 5px #666666 solid;pointer-events: none;position: absolute;}.ui_datapicker_table{width: 210px;height: 40px;border-collapse:collapse;font-family: "Microsoft YaHei","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif;background-color: "#e5e5e5";}.ui_datapicker_table tr>th,.ui_datapicker_table tr>td{height: 30px;border-radius: 4px;padding: 5px; box-sizing: border-box;border: none;cursor: pointer;color: #333333;font-size: 14px;user-select: none;}.ui_datapicker_table tr>th:hover,.ui_datapicker_table tr>td:hover{background-color: #e5e5e5;}/*分页样式渲染*/.wm_pagemark{border: 1px #e5e5e5 solid;border-radius: 5px;background-color: #ffffff;margin-left: auto;margin-right: auto; position: relative;opacity: 0;}.wm_pagemark_body{width: 100%;height: 100%;text-align: center;}.wm_pagemark_body>button{height: 30px; line-height:30px; background-color: #3498Db;color: #ffffff;border: none; border-radius: 5px; padding-left: 10px; padding-right: 10px; margin-right: 15px;}.wm_pagemark_body>button:hover{background-color: #258BCF;}.wm_pagemark_body>button:active{background-color: #3498DB;}.wm_pagemark_body>button:last-child{margin-right: 0;}.wm_pagemark_body>span>input{width: 34px; height: 30px; text-align: center; margin-left:5px; margin-right: 5px;}.wm_pagemark_body>span{font-size: 12px;display: inline-block;vertical-align: bottom;text-align: center;padding-right: 15px;color: #a4a4a4;}');

//批量append目标
function setAppend(dom,arr){
	for(let i = 0; i < arr.length; i++){
		dom.appendChild(arr[i]);
	}
}

//基础下拉框
function WmStartSelect(){
	let wmSelect = c('wm_select');
	if(c('wm_select_item').length > 0){
		for(let i = c('wm_select_item').length-1; i >= 0; i--){
			c('wm_select_item')[i].parentNode.removeChild(c('wm_select_item')[i]);
		}
	}
	if(c('wm_select_mark').length > 0){
		for(let i = c('wm_select_mark').length-1; i >= 0; i--){
			c('wm_select_mark')[i].parentNode.removeChild(c('wm_select_mark')[i]);
		}
	}
	for(let i = 0; i < wmSelect.length; i++){
		wmSelect[i].style.cursor = 'pointer';
		wmSelect[i].style.userSelect = 'none';
		wmSelect[i].readOnly = false;
		//添加下拉倒三角标记
		let mark = creat('div');
		mark.className = 'wm_select_mark';
		mark.style.top = wmSelect[i].offsetTop + wmSelect[i].clientHeight/2 - 1 + 'px';
		mark.style.left = wmSelect[i].offsetLeft + wmSelect[i].clientWidth - 15 + 'px';
		wmSelect[i].parentNode.appendChild(mark);

		wmSelect[i].readOnly = true;
		let wmSelectArr;
		if(wmSelect[i].dataset.select !== undefined){
			wmSelectArr = wmSelect[i].dataset.select;
		}else{
			wmSelectArr = [];
		}
		wmSelectArr = eval(wmSelectArr);
		let wmSelectArray = [],
			wmSelectObj = {};
		if(wmSelect[i].dataset.type !== 'no_default'){
			wmSelectObj.index = i;
			wmSelectObj.name = '请选择...';
			wmSelectObj.value = '';
			wmSelectArray.push(wmSelectObj);
		}
		for(let j = 0; j < wmSelectArr.length; j++){
			let wmSelectObj = {};
			wmSelectObj.index = i;
			wmSelectObj.name = wmSelectArr[j].name;
			wmSelectObj.value = wmSelectArr[j].value;
			wmSelectArray.push(wmSelectObj);
		}
		//默认选中第一个
		wmSelectArray[0].value === ''?wmSelect[i].value = '' : wmSelect[i].value = wmSelectArray[0].name;
		wmSelect[i].dataset.value = wmSelectArray[0].value;

		let div = creat('div');
		div.className = 'wm_select_item';
		div.style.minWidth = wmSelect[i].clientWidth + 'px';
		div.style.maxHeight =window.innerHeight - wmSelect[i].offsetTop - wmSelect[i].offsetHeight - 100 + 'px';
		div.style.top = wmSelect[i].offsetTop + wmSelect[i].clientHeight + 2 + 'px';
		div.style.left = wmSelect[i].offsetLeft + 'px';
		for(let j = 0; j < wmSelectArray.length; j++){
			let list = creat('div');
			list.className = 'wm_select_item_list';
			list.innerHTML = wmSelectArray[j].name;
			if(wmSelectArray[j].name === '请选择...'){
				list.style.color = '#666666';
			}
			list.setAttribute('data-index',wmSelectArray[j].index);
			list.setAttribute('data-value',wmSelectArray[j].value);
			list.onmouseover = function(){
				this.style.backgroundColor = '#e5e5e5';
			};
			list.onmouseout = function(){
				this.style.backgroundColor = '#ffffff';
			};
			list.onmousedown = function(){
				if(this.dataset.value === ''){
					wmSelect[this.dataset.index].value = "";
					wmSelect[this.dataset.index].setAttribute('data-value',this.dataset.value);
				}else{
					wmSelect[this.dataset.index].value = this.innerText;
					wmSelect[this.dataset.index].setAttribute('data-value',this.dataset.value);
				}
			};
			div.appendChild(list);
		}
		wmSelect[i].parentNode.appendChild(div);
		(function(q){
			Add(wmSelect[q],'focus',function(){
				c('wm_select_item')[q].style.display = 'block';
			});
			Add(wmSelect[q],'blur',function(){
				c('wm_select_item')[q].style.display = 'none';
			});
			/*wmSelect[q].onfocus = function(){
				c('wm_select_item')[q].style.display = 'block';
			};
			wmSelect[q].onblur = function(){
				c('wm_select_item')[q].style.display = 'none';
			};*/
		})(i);
	}
}

//复选下拉框
function WmCheckSelect(){
	let wmCheck = c('wm_check');
	if(c('wm_check_item').length > 0){
		for(let i = c('wm_check_item').length-1; i >= 0; i--){
			c('wm_check_item')[i].parentNode.removeChild(c('wm_check_item')[i]);
		}
	}
	if(c('wm_check_mark').length > 0){
		for(let i = c('wm_check_mark').length-1; i >= 0; i--){
			c('wm_check_mark')[i].parentNode.removeChild(c('wm_check_mark')[i]);
		}
	}
	for(let i = 0; i < wmCheck.length; i++){
		wmCheck[i].style.cursor = 'pointer';
		wmCheck[i].style.userSelect = 'none';
		wmCheck[i].readOnly = false;
		//添加下拉倒三角标记
		let mark = creat('div');
		mark.className = 'wm_check_mark';
		mark.style.top = wmCheck[i].offsetTop + wmCheck[i].clientHeight/2 - 1 + 'px';
		mark.style.left = wmCheck[i].offsetLeft + wmCheck[i].clientWidth - 15 + 'px';
		wmCheck[i].parentNode.appendChild(mark);

		wmCheck[i].readOnly = true;
		let wmCheckArr;
		if(wmCheck[i].dataset.select !== undefined){
			wmCheckArr = wmCheck[i].dataset.select;
		}else{
			wmCheckArr = [];
		}
		wmCheckArr = eval(wmCheckArr);
		let wmCheckArray = [];
		for(let j = 0; j < wmCheckArr.length; j++){
			let wmCheckObj = {};
			wmCheckObj.index = i;
			wmCheckObj.name = wmCheckArr[j].name;
			wmCheckObj.value = wmCheckArr[j].value;
			wmCheckArray.push(wmCheckObj);
		}
		let div = creat('div');
		div.className = 'wm_check_item';
		div.style.width = wmCheck[i].clientWidth + 'px';
		div.style.maxHeight =window.innerHeight - wmCheck[i].offsetTop - wmCheck[i].offsetHeight - 100 + 'px';
		div.style.top = wmCheck[i].offsetTop + wmCheck[i].clientHeight + 2 + 'px';
		div.style.left = wmCheck[i].offsetLeft + 'px';
		for(let j = 0; j < wmCheckArray.length; j++){
			let list = creat('div');
			list.className = 'wm_check_item_list';
			list.innerHTML = '<input class="wm_check_item_list_check" type="checkbox" data-index="'+wmCheckArray[j].index+'" data-value="'+wmCheckArray[j].value+'" data-name="'+wmCheckArray[j].name+'"/>' + wmCheckArray[j].name;
			list.onmousedown = function(e){
				BlockDefault(e);
			};
			div.appendChild(list);
		}
		wmCheck[i].parentNode.appendChild(div);
		(function(q){
			wmCheck[q].onfocus = function(){
				c('wm_check_item')[q].style.display = 'block';
			};
			wmCheck[q].onblur = function(){
				c('wm_check_item')[q].style.display = 'none';
			};
		})(i);
	}
	let wmCheckItemListCheck = c('wm_check_item_list_check');
	if(wmCheckItemListCheck.length > 0){
		for(let i = 0; i < wmCheckItemListCheck.length; i++){
			(function(q){
				c('wm_check_item_list_check')[q].onchange = function(e){
					let that = this,
						wmCheckSumArr = [],
						wmCheckView;
					if(c('wm_check')[that.dataset.index].dataset.value !== undefined&&c('wm_check')[that.dataset.index].dataset.value !== ''){
						wmCheckView = JSON.parse(c('wm_check')[that.dataset.index].dataset.value);
						for(let j in wmCheckView){
							wmCheckSumArr.push(wmCheckView[j]);
						}
					}
					if(that.checked){
						let wmCheckSumObj = {};
						wmCheckSumObj.name = that.dataset.name;
						wmCheckSumObj.value = that.dataset.value;
						wmCheckSumArr.push(wmCheckSumObj);
						let wmCheckSumArrView = [];
						for(let j in wmCheckSumArr){
							wmCheckSumArrView.push(wmCheckSumArr[j].name);
						}
						c('wm_check')[that.dataset.index].value = wmCheckSumArrView.join(',');
						c('wm_check')[that.dataset.index].setAttribute('data-value',JSON.stringify(wmCheckSumArr));
					}else{
						for(let j in wmCheckSumArr){
							if(that.dataset.value === wmCheckSumArr[j].value){
								wmCheckSumArr.splice(j,1);
							}
						}
						let wmCheckSumArrView = [];
						for(let j in wmCheckSumArr){
							wmCheckSumArrView.push(wmCheckSumArr[j].name);
						}
						c('wm_check')[that.dataset.index].value = wmCheckSumArrView.join(',');
						c('wm_check')[that.dataset.index].setAttribute('data-value',JSON.stringify(wmCheckSumArr));
					}
					BlockDefault(e);
				}
			})(i)
		}
	}
}

//日期(时间)选择器封装
function WmStartDatapicker(){
	let wmPack = c('wm_pack')[0],
		wmDataPicker = c('wm_datapicker'),
		wmDate = new Date();
	if(wmDataPicker.length > 0&& wmPack !== undefined){
		for(let i = 0; i < wmDataPicker.length; i++){
			wmDataPicker[i].style.cursor = 'pointer';
			wmDataPicker[i].style.userSelect = 'none';
			wmDataPicker[i].readOnly = true;

			//加入input框下拉标识
			let mark = creat('div');
			mark.className = 'wm_datapicker_mark';
			mark.style.top = wmDataPicker[i].offsetTop + wmDataPicker[i].clientHeight/2 - 1 + 'px';
			mark.style.left = wmDataPicker[i].offsetLeft + wmDataPicker[i].clientWidth - 15 + 'px';
			wmPack.appendChild(mark);

			let div = creat('div');
			div.className = 'ui_datapicker';
			div.style.top = wmDataPicker[i].offsetTop + wmDataPicker[i].clientHeight + 2 + 'px';
			div.style.left = wmDataPicker[i].offsetLeft + 'px';
			let table = creat('table');
			table.className = 'ui_datapicker_table';
			let thead = creat('thead');
			function wmTheadA(){
				let tra = creat('tr'),
					thaA = creat('th'),
					thaB = creat('th'),
					thaC = creat('th'),
					thaD = creat('th');
				thaA.innerHTML = '«';
				thaB.colSpan = '3';
				thaB.innerHTML = wmDate.getFullYear();
				thaC.colSpan = '2';
				thaC.innerHTML =  wmDate.getMonth() + 1;
				thaD.innerHTML = '»';
				setAppend(tra,[thaA,thaB,thaC,thaD]);
				thead.appendChild(tra);
				let trb = creat('tr'),
				 	thbA = creat('th'),
				 	thbB = creat('th'),
				 	thbC = creat('th'),
				 	thbD = creat('th'),
				 	thbE = creat('th'),
				 	thbF = creat('th'),
				 	thbG = creat('th');
				setHTML([thbA,thbB,thbC,thbD,thbE,thbF,thbG],['一','二','三','四','五','六','七']);
				setAppend(trb,[thbA,thbB,thbC,thbD,thbE,thbF,thbG]);
				thead.appendChild(trb);
			}
			wmTheadA();
			let tbody = creat('tbody');
			function wmTbody(){
				for(let i = 0; i < 6; i++){
					let tr = creat('tr');
					for(let j = 0; j < 7; j++){
						let td = creat('td');
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
				wmDataPicker[q].onfocus = function(){
					c('ui_datapicker')[q].style.display = 'block';
				};
				wmDataPicker[q].onblur = function(){
					c('ui_datapicker')[q].style.display = 'none';
				};
			})(i);
		}
	}
}
/*for(let j = 0; j < wmDatapicker[i].classList.length; j++){
	log(wmDatapicker[i].classList[j] == 'wm_datapicker_time');
}*/

//分页实现
function WmPageMark(){
	let wmPageMark = c('wm_pagemark');
	if(c('wm_pagemark_body').length > 0){
		for(let i = c('wm_pagemark_body').length;i > 0; i--){
			c('wm_pagemark_body')[i-1].parentNode.removeChild(c('wm_pagemark_body')[i-1]);
		}
	}
	for(let i = 0; i < wmPageMark.length; i++){
		let datasetLength = JSON.parse(wmPageMark[i].dataset.length);
		let datasetType = Number(wmPageMark[i].dataset.pagetype);
		let Width,Height;
		!wmPageMark[i].dataset.width?Width = '480px':Width = wmPageMark[i].dataset.width;
		!wmPageMark[i].dataset.height?Height = '40px':Height = wmPageMark[i].dataset.height;
		wmPageMark[i].style.height = Height;
		wmPageMark[i].style.width = Width;
		wmPageMark[i].style.opacity = 1;
		let wmPageMarkBody = creat('div');
		setClass([wmPageMarkBody],['wm_pagemark_body']);
		setHTML([wmPageMarkBody],['<button onclick="WmPageMarkItem(this,1,'+datasetType+')" style="margin-top:'+(parseInt(Height)-30)/2+'px;">首页</button><button onclick="WmPageMarkItem(this,2,'+datasetType+')" style="margin-top:'+(parseInt(Height)-30)/2+'px;">上一页</button><span>共'+Math.ceil(datasetLength[0]/datasetLength[2])+'页，到第<input type="number" style="margin-top:'+(parseInt(Height)-30)/2+'px;" value="'+datasetLength[1]+'"/>页</span><button onclick="WmPageMarkItem(this,3,'+datasetType+')" style="margin-top:'+(parseInt(Height)-30)/2+'px;">Go</button><button onclick="WmPageMarkItem(this,4,'+datasetType+')" style="margin-top:'+(parseInt(Height)-30)/2+'px;">下一页</button><button onclick="WmPageMarkItem(this,5,'+datasetType+')" style="margin-top:'+(parseInt(Height)-30)/2+'px;">尾页</button>']);
		setAppend(wmPageMark[i],[wmPageMarkBody]);
		log(wmPageMark[i]);
	}
}
//分页的按钮触发事件
function WmPageMarkItem(that,num,type){
	let datasetLength = JSON.parse(that.parentNode.parentNode.dataset.length);
	switch(num){
		case 1:
			if(Number(that.parentNode.children[2].children[0].value) !== 1){
				that.parentNode.children[2].children[0].value = 1;
				WmPageMarkItemGo();
			}
			break;
		case 2:
			that.parentNode.children[2].children[0].value = Number(that.parentNode.children[2].children[0].value)-1;
			WmPageMarkItemGo();
			break;
		case 3:
			WmPageMarkItemGo();
			break;
		case 4:
			that.parentNode.children[2].children[0].value = Number(that.parentNode.children[2].children[0].value)+1;
			WmPageMarkItemGo();
			break;
		case 5:
			if(Number(that.parentNode.children[2].children[0].value) !== Math.ceil(datasetLength[0]/datasetLength[2])){
				that.parentNode.children[2].children[0].value = Math.ceil(datasetLength[0]/datasetLength[2]);
				WmPageMarkItemGo();
			}
			break;
		default:
			break;
	}
	function WmPageMarkItemGo(){
		if(Number(that.parentNode.children[2].children[0].value) <= Math.ceil(datasetLength[0]/datasetLength[2])&&Number(that.parentNode.children[2].children[0].value)>0){
			datasetLength[1] = Number(that.parentNode.children[2].children[0].value);
			that.parentNode.parentNode.setAttribute('data-length',JSON.stringify(datasetLength));
			WmPageMarkStart(JSON.parse(that.parentNode.parentNode.dataset.length)[1],type);
		}else{
			if(Number(that.parentNode.children[2].children[0].value)>0){
				that.parentNode.children[2].children[0].value = Math.ceil(datasetLength[0]/datasetLength[2]);
			}else{
				that.parentNode.children[2].children[0].value = 1;
			}
		}
	}
}