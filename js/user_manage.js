function userStart(){
	let homeLeft = c('home_left')[0];
	homeLeft.innerHTML = '';
	let userManageWork = d('user_manage_work');
	let userManageCode = d('user_manage_code');
	let userManageName = d('user_manage_name');
	let userManageLevel = d('user_manage_level');
	let userManageDetele = d('user_manage_detele');
	let resetPassword = d('reset_password');
	//渲染工作中心下拉框
	ajax('post',URLS + '/jf/zdbg/userinfo/list.json','',function(data){
		data = data.objs;
		let ul = creat('ul');
		for(let i = 0; i < data.length; i++){
			let li = creat('li');
			li.innerHTML = '<img src="image/nav/nav_002.png"/><a class="home_left_ul_li_a">' + data[i].userName + '</a>';
			li.children[1].setAttribute('data-value',JSON.stringify(data[i]));
			li.children[1].onmousedown = function(){
				count = 1;
				d('user_manage_code').readOnly = true;
				let userObject = JSON.parse(this.dataset.value);
				userManageWork.value = userObject.workcenterName;
				userManageWork.setAttribute('data-value',userObject.workcenterCode);
				userManageCode.value = userObject.userCode;
				userManageName.value = userObject.userName;
				for(let j = 0; j <　c(userManageLevel.className).length; j++){
					if(c(userManageLevel.className)[j].id === 'user_manage_level'){
						for(let k = 0; k < c('wm_select_item')[j].children.length; k++){
							if(Number(c('wm_select_item')[j].children[k].dataset.value) === userObject.userLevel){
								userManageLevel.value = c('wm_select_item')[j].children[k].innerText;
								userManageLevel.setAttribute('data-value',c('wm_select_item')[j].children[k].dataset.value);
							}
						}
					}
				}
				if(userObject.deleted === 1){
					userManageDetele.checked = true;
				}else{
					userManageDetele.checked = false;
				}
				for(let j = 0; j < c('reset_password').length; j++){
					c('reset_password')[j].style.display = 'inline';
				}
				for(let j = 0; j < c('home_left_ul_li_a').length; j++){
					if(JSON.parse(c('home_left_ul_li_a')[j].dataset.value).userCode !== userManageCode.value){
						c('home_left_ul_li_a')[j].style.backgroundColor = 'rgba(0,0,0,0)';
					}
				}
			};
			li.children[1].onmouseover = function(){this.style.backgroundColor = '#d4d4d4';};
			li.children[1].onmouseout = function(){
				if(JSON.parse(this.dataset.value).userCode !== userManageCode.value){
					this.style.backgroundColor = 'rgba(0,0,0,0)';
				}
			};
			ul.appendChild(li);
		}
		homeLeft.appendChild(ul);
		for(let j = 0; j < c('home_left_ul_li_a').length; j++){
			if(JSON.parse(c('home_left_ul_li_a')[j].dataset.value).userCode !== userManageCode.value){
				c('home_left_ul_li_a')[j].style.backgroundColor = 'rgba(0,0,0,0)';
			}
		}
	},function(){},'json');

	//重置密码
	resetPassword.onclick = function(){
		if(confirm('是否重置密码？')){
			ajax('post',URLS + '/jf/zdbg/userinfo/initpass.json','userId=' + userManageCode.value,function(data){
				alern(data.text);
			},function(){},'json');
		}
	}
}
function userSelect(){
	let userManageWork = d('user_manage_work');
	//渲染工作中心下拉框
	ajax('post',URLS + '/jf/zdbg/workcenter/list.json','',function(data){
		let userManageWorkArr = [];
		for(let i = 0; i < data.objs.length; i++){
			let userManageWorkObj = {};
			userManageWorkObj.name = data.objs[i].workcenterName;
			userManageWorkObj.value = data.objs[i].workcenterCode;
			userManageWorkArr.push(userManageWorkObj);
		}
		userManageWork.setAttribute('data-select',JSON.stringify(userManageWorkArr));
		WmStartSelect();
	},function(){},'json');
}

let count = 0;
d('creat').onclick = function(){
	count = 0;
	d('user_manage_code').readOnly = false;
	d('user_manage_work').value = "";
	d('user_manage_work').setAttribute('data-value','');
	d('user_manage_code').value = "";
	d('user_manage_name').value = "";
	d('user_manage_level').value = "";
	d('user_manage_level').setAttribute('data-value','');
	d('user_manage_detele').checked = false;
	for(let j = 0; j < c('reset_password').length; j++){
		c('reset_password')[j].style.display = 'none';
	}
};
d('submit').onclick = function(){
	let userManageWork = d('user_manage_work').dataset.value;
	let userManageWorkName = d('user_manage_work').value;
	let userManageCode = d('user_manage_code').value;
	let userManageName = d('user_manage_name').value;
	let userManageLevel = d('user_manage_level').dataset.value;
	let userManageDetele = d('user_manage_detele');
	if(userManageWork === ""||userManageWork===undefined){
		alern('工作中心不能为空');
		return false;
	}
	if(userManageCode === ""){
		alern('用户账号不能为空');
		return false;
	}
	if(userManageName === ""){
		alern('用户名称不能为空');
		return false;
	}
	if(userManageLevel === ""||userManageLevel===undefined){
		alern('用户等级不能为空');
		return false;
	}
	let userObject = {};
	userObject.workcenterCode = userManageWork;
	userObject.workcenterName = userManageWorkName;
	userObject.userCode = userManageCode;
	userObject.userName = userManageName;
	userObject.userLevel = userManageLevel;
	if(userManageDetele.checked){
		userObject.deleted = 1;
	}else{
		userObject.deleted = 0;
	}
	if(count === 0){
		ajax('post',URLS + '/jf/zdbg/userinfo/add.json','obj=' + JSON.stringify(userObject),function(data){
			alern(data.text);
			userStart();
		},function(){},'json')
	}else{
		ajax('post',URLS + '/jf/zdbg/userinfo/update.json','obj=' + JSON.stringify(userObject),function(data){
			log(JSON.stringify(userObject),data);
			alern(data.text);
			userStart();
		},function(){},'json')
	}
};
userStart();
userSelect();