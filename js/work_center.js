function workStart(){
	var homeLeft = c('home_left')[0];
	homeLeft.innerHTML = '';
	var workCenterNumber = d('work_center_number');
	var workCenterName = d('work_center_name');
	ajax('post',URLS + '/jf/zdbg/workcenter/list.json','',function(data){
		data = data.objs;
		log(data);
		var ul = creat('ul');
		for(var i = 0; i < data.length; i++){
			var li = creat('li');
			li.innerHTML = '<img src="image/nav/nav_002.png"/><a class="home_left_ul_li_a">' + data[i].workcenterName + '</a>';
			li.children[1].setAttribute('data-value',data[i].workcenterCode);
			li.children[1].onmousedown = function(){
				count = 1;
				workCenterNumber.value = this.dataset.value;
				workCenterName.value = this.innerHTML;
				for(var j = 0; j < c('home_left_ul_li_a').length; j++){
					if(c('home_left_ul_li_a')[j].dataset.value != workCenterNumber.value){
						c('home_left_ul_li_a')[j].style.backgroundColor = 'rgba(0,0,0,0)';
					}
				}
			}
			li.children[1].onmouseover = function(){this.style.backgroundColor = '#d4d4d4';}
			li.children[1].onmouseout = function(){
				if(this.dataset.value != workCenterNumber.value){
					this.style.backgroundColor = 'rgba(0,0,0,0)';
				}
			}
			ul.appendChild(li);
		}
		homeLeft.appendChild(ul);
	},'','json');
}

var count = 0;
d('creat').onclick = function(){
	count = 0;
	d('work_center_number').value = "";
	d('work_center_name').value = "";
}
d('submit').onclick = function(){
	var workCenterNumber = d('work_center_number').value;
	var workCenterName = d('work_center_name').value;

	if(workCenterNumber == ""){
		alern('工作中心编号不能为空');
		return false;
	}
	if(workCenterName == ""){
		alern('工作中心名称不能为空');
		return false;
	}
	var workObject = new Object();
	workObject.workcenterCode = workCenterNumber;
	workObject.workcenterName = workCenterName;
	if(count == 0){
		ajax('post',URLS + '/jf/zdbg/workcenter/add.json','obj=' + JSON.stringify(workObject),function(data){
			alern(data.text);
			workStart();
		},'','json')
	}else{
		ajax('post',URLS + '/jf/zdbg/workcenter/update.json','obj=' + JSON.stringify(workObject),function(data){
			alern(data.text);
			workStart();
		},'','json')
	}
}
workStart();