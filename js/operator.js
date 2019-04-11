function userStart(){
	let homeLeft = c('home_left')[0];
	homeLeft.innerHTML = '';
	let operatorWork = d('operator_work');
	let operatorCode = d('operator_code');
	let operatorName = d('operator_name');
	let operatorLevel = d('operator_level');
	let operatorDetele = d('operator_detele');
	//渲染作业员
	ajax('post',URLS + '/jf/zdbg/operator/list.json','',function(data){
		data = data.objs;
		log(data);
		let ul = creat('ul');
		for(var i = 0; i < data.length; i++){
			var li = creat('li');
			li.innerHTML = '<img src="image/nav/nav_002.png"/><a class="home_left_ul_li_a">' + data[i].operatorName + '</a>';
			li.children[1].setAttribute('data-value',JSON.stringify(data[i]));
			li.children[1].onmousedown = function(){
				count = 1;
				operatorCode.readOnly = true;
				let userObject = JSON.parse(this.dataset.value);
				operatorWork.value = userObject.workcenterName;
				operatorWork.setAttribute('data-value',userObject.workcenterCode);
				operatorCode.value = userObject.operatorCode;
				operatorName.value = userObject.operatorName;
				for(let j = 0; j <　c(operatorLevel.className).length; j++){
					if(c(operatorLevel.className)[j].id === 'operator_level'){
						for(let k = 0; k < c('wm_select_item')[j].children.length; k++){
							if(Number(c('wm_select_item')[j].children[k].dataset.value) === userObject.jobsPost){
								operatorLevel.value = c('wm_select_item')[j].children[k].innerHTML;
								operatorLevel.setAttribute('data-value',c('wm_select_item')[j].children[k].dataset.value);
							}
						}
					}
				}
				if(userObject.deleted === 1){
					operatorDetele.checked = true;
				}else{
					operatorDetele.checked = false;
				}
				for(let j = 0; j < c('home_left_ul_li_a').length; j++){
					if(JSON.parse(c('home_left_ul_li_a')[j].dataset.value).operatorCode != operatorCode.value){
						c('home_left_ul_li_a')[j].style.backgroundColor = 'rgba(0,0,0,0)';
					}
				}
			};
			li.children[1].onmouseover = function(){this.style.backgroundColor = '#d4d4d4';};
			li.children[1].onmouseout = function(){
				if(JSON.parse(this.dataset.value).operatorCode != operatorCode.value){
					this.style.backgroundColor = 'rgba(0,0,0,0)';
				}
			};
			ul.appendChild(li);
		}
		homeLeft.appendChild(ul);
		for(let j = 0; j < c('home_left_ul_li_a').length; j++){
			if(JSON.parse(c('home_left_ul_li_a')[j].dataset.value).operatorCode != operatorCode.value){
				c('home_left_ul_li_a')[j].style.backgroundColor = 'rgba(0,0,0,0)';
			}
		}
	},'','json');
}
function userSelect(){
	let operatorWork = d('operator_work');
	let operatorLevel = d('operator_level');
	//渲染工作中心下拉框
	ajax('post',URLS + '/jf/zdbg/workcenter/list.json','',function(data){
		let operatorWorkArr = new Array();
		for(let i = 0; i < data.objs.length; i++){
			let operatorWorkObj = new Object();
			operatorWorkObj.name = data.objs[i].workcenterName;
			operatorWorkObj.value = data.objs[i].workcenterCode;
			operatorWorkArr.push(operatorWorkObj);
		}
		operatorWork.setAttribute('data-select',JSON.stringify(operatorWorkArr));
		WmStartSelect();
	},'','json');
	//岗位默认选中工作员
	let operatorLevelSelect = eval(operatorLevel.dataset.select);
	operatorLevel.value = operatorLevelSelect[0].name;
	operatorLevel.setAttribute('data-value',operatorLevelSelect[0].value);
}

let count = 0;
d('creat').onclick = function(){
	count = 0;
	d('operator_code').readOnly = false;
	d('operator_work').value = "";
	d('operator_work').setAttribute('data-value','');
	d('operator_code').value = "";
	d('operator_name').value = "";
	d('operator_level').value = "";
	d('operator_level').setAttribute('data-value','');
	d('operator_detele').checked = false;
	userSelect();
};
d('submit').onclick = function(){
	let operatorWork = d('operator_work').dataset.value;
	let operatorWorkName = d('operator_work').value;
	let operatorCode = d('operator_code').value;
	let operatorName = d('operator_name').value;
	let operatorLevel = d('operator_level');
	let operatorDetele = d('operator_detele');
	if(operatorWork === ""||operatorWork===undefined){
		alern('工作中心不能为空');
		return false;
	}
	if(operatorCode === ""||operatorCode===undefined){
		alern('作业员工号不能为空');
		return false;
	}
	if(operatorName === ""||operatorName===undefined){
		alern('作业员名称不能为空');
		return false;
	}
	if(operatorLevel.dataset.value === ""||operatorLevel.dataset.value===undefined){
		alern('作业员等级不能为空');
		return false;
	}
	let operatorObject = {};
	operatorObject.workcenterCode = operatorWork;
	operatorObject.workcenterName = operatorWorkName;
	operatorObject.operatorCode = operatorCode;
	operatorObject.operatorName = operatorName;
	operatorObject.jobsPost = operatorLevel.dataset.value;
	operatorObject.jobsPostName = operatorLevel.value;
	if(operatorDetele.checked){
		operatorObject.deleted = 1;
	}else{
		operatorObject.deleted = 0;
	}
	log(operatorObject);
	if(count === 0){
		ajax('post',URLS + '/jf/zdbg/operator/add.json','obj=' + JSON.stringify(operatorObject),function(data){
			alern(data.text);
			userStart();
		},'','json')
	}else{
		ajax('post',URLS + '/jf/zdbg/operator/update.json','obj=' + JSON.stringify(operatorObject),function(data){
			alern(data.text);
			userStart();
		},'','json')
	}
}
userStart();
userSelect();