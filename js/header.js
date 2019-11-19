sessionStorage.loginUserName === undefined?(function(){alert('请登录!');location.href = 'land.html';})() : log(sessionStorage.loginUserName);
document.writeln("<header>");
document.writeln("	<div class=\'header_left\'></div>");
document.writeln("	<div class=\'header_title\'>鸿丰集团工时系统</div>");
document.writeln("	<div class=\'header_center\'>");
document.writeln("	</div>");
document.writeln("	<div class=\'header_right\'>");
document.writeln("		<div class=\'header_right_index\'>"+ JSON.parse(sessionStorage.loginUserName).userName +"</div>");
document.writeln("		<div class=\'header_right_black\'>");
document.writeln("			<div class=\'header_right_black_list header_right_black_edit\' data-value=\'4\'>修改密码</div>");
document.writeln("			<div class=\'header_right_black_list header_right_black_exit\' data-value=\'4\'>安全退出</div>");
document.writeln("		</div>");
document.writeln("	</div>");
document.writeln("</header>");
document.writeln("<div class=\'header\'></div>");

c('header_right')[0].onmouseover = function(){
	c('header_right_black')[0].style.bottom = -c('header_right_black')[0].clientHeight + 'px';
};
c('header_right')[0].onmouseout = function(){
	c('header_right_black')[0].style.bottom = '0px';
};
c('header_right_black_edit')[0].onclick = function(){
	alern('请输入新密码：<input id="userPassWord" style="margin-bottom: 15px;" type="password" placeholder="请输入新密码！"/><br/>请确认新密码：<input id="userPassWords" type="password" placeholder="请确认新密码！"/>','修改密码','确定','取消');
	c('fixed')[0].children[0].children[3].onmousedown = function(){
		let that = this;
		let passWord = d('userPassWord').value;
		let passWords = d('userPassWords').value;
		if(passWord === "" || passWord === null || passWord === undefined){
			alert('新密码不能为空！');
			return false;
		}
		if(passWords === "" || passWords === null || passWords === undefined){
			alert('确认密码不能为空！');
			return false;
		}
		if(passWord !== passWords){
			alert('新密码与确认密码不一致！');
			return false;
		}
		ajax('post',URLS + '/jf/zdbg/userinfo/updatepass.json','userId=' + JSON.parse(sessionStorage.loginUserName).userCode + '&password=' + passWord,function(data){
			alert(data.text);
			that.parentNode.parentNode.parentNode.removeChild(that.parentNode.parentNode);
		},'','json')
	};
};
c('header_right_black_exit')[0].onclick = function(){
	sessionStorage.loginUserName = undefined;
	window.location.href = "land.html";
};

let URLS = 'http://10.1.8.36:8080/calculatesalary';
//let URLS = 'http://10.1.8.162:8080/calculatesalary';

function headStart(){
	let headerCenter = c('header_center')[0];
	ajax('post',URLS + '/jf/zdbg/menu/list.json','',function(data){
		for(let i = 0; i < data.length; i++){
			let div = creat('div');
			setStyle(div,{width: '100px',height: '50px',lineHeight: '50px',textAlign: 'center',float: 'left',paddingLeft: '10px',paddingRight: '10px',color: '#f0f0f0',cursor: 'pointer',position: 'relative',userSelect: 'none'});
			div.innerHTML = '<img width="20px" height="20px" style="position: relative; top: 5px; margin-right: 10px;" src="'+data[i][0].icon+'"/>' + data[i][0].text;
			div.setAttribute('data-menuid',data[i][0].menuid);
			div.setAttribute('data-src',data[i][0].src);
			if(data[i][1].length !== 0){
				let count = 0;
				let b = creat('b');
				setStyle(b,{width: '0px',height: '0px',borderTop: '5px #f0f0f0 solid',borderLeft: '5px rgba(0,0,0,0) solid',borderRight: '5px rgba(0,0,0,0) solid',borderBottom: '5px rgba(0,0,0,0) solid',position: 'absolute',top: '25px',right: '5px',transform: 'rotate(-45deg)'});
				div.appendChild(b);
				let ul = creat('ul');
				setStyle(ul,{display: 'none',width: 'auto',minWidth: '100%',height: 'auto',position: 'absolute',left: '0px',top: '60px',opacity: '0',userSelect: 'none'})
				ul.className = '';
				ul.setAttribute('data-menuid',data[i][0].menuid);
				for(let j = 0; j < data[i][1].length; j++){
					let li = creat('li');
					li.innerHTML = '<img width="20px" height="20px" style="position: relative; top: 5px; margin-right: 10px;" src="'+data[i][1][j].icon+'"/>' + data[i][1][j].text;
					li.setAttribute('data-menuid',data[i][1][j].menuid);
					li.setAttribute('data-perent',data[i][1][j].perent);
					li.setAttribute('data-src',data[i][1][j].src);
					setStyle(li,{width: 'auto',minWidth: '100%',boxSizing: 'border-box',whiteSpace: 'nowrap',height: '50px',backgroundColor: '#1F2229',textAlign: 'left',paddingLeft: '10px',paddingRight: '10px',})
					if(getUrlVal('menuid') !== data[i][1][j].menuid){
						li.onmouseover = function(){this.style.backgroundColor = '#363C48'};
						li.onmouseout = function(){this.style.backgroundColor = '#1F2229'};
						li.onmousedown = function(){
							if(this.dataset.src === 'javascript:void(0)'){
								window.location.href=this.dataset.src;
							}else{
								window.location.href=this.dataset.src + '?menuid=' + this.dataset.menuid
							}
						};
					}else{
						count = 1;
						div.style.backgroundColor = '#363C48';
						li.style.backgroundColor = '#363C48';
						n('title')[0].innerHTML = '鸿丰集团工时系统 - ' + data[i][1][j].text;
					}
					ul.appendChild(li);
				}
				div.appendChild(ul);
				headerCenter.appendChild(div);
				if(getUrlVal('menuid') !== div.dataset.menuid){
					if(count === 0){
						div.onmouseover = function(){
							this.style.backgroundColor = '#363C48';
							setStyle(this.children[2],{top: '50px',display: 'block',transition: 'top 0.5s ease',opacity: '1'});
						};
						div.onmouseout = function(){
							this.style.backgroundColor = '#1F2229';
							setStyle(this.children[2],{top: '60px',transition: 'top 0s ease',opacity: '0',display: 'none'});
						};
					}else{
						div.style.backgroundColor = '#363C48';
						div.onmouseover = function(){
							setStyle(this.children[2],{top: '50px',display: 'block',transition: 'top 0.5s ease',opacity: '1'});
						};
						div.onmouseout = function(){
							setStyle(this.children[2],{top: '60px',transition: 'top 0s ease',opacity: '0',display: 'none'});
						};
					}
				}else{
					div.style.backgroundColor = '#363C48';
				}
			}else{
				headerCenter.appendChild(div);
				if(getUrlVal('menuid') !== div.dataset.menuid){
					div.onmouseover = function(){this.style.backgroundColor = '#363C48';};
					div.onmouseout = function(){this.style.backgroundColor = '#1F2229';};
					div.onmousedown = function(){
						if(this.dataset.src === 'javascript:void(0)'){
							window.location.href=this.dataset.src;
						}else{
							window.location.href=this.dataset.src + '?menuid=' + this.dataset.menuid;
						}
					};
				}else{
					n('title')[0].innerHTML = '鸿丰集团工时系统 - ' + data[i][0].text;
					div.style.backgroundColor = '#363C48';
				}
			};
		}
		let divClear = creat('div');
		divClear.className = 'clear';
		headerCenter.appendChild(divClear);
	},function(){},'json');
}
headStart();