
document.writeln("<header>");
document.writeln("	<div class=\'header_left\'></div>");
document.writeln("	<div class=\'header_title\'>鸿丰集团工时系统</div>");
document.writeln("	<div class=\'header_center\'>");
document.writeln("	</div>");
document.writeln("	<div class=\'header_right\'>");
document.writeln("		<div class=\'header_right_index\'>1111</div>");
document.writeln("		<div class=\'header_right_black\'>");
document.writeln("			<div class=\'header_right_black_list header_right_black_edit\' data-value=\'4\'>修改密码</div>");
document.writeln("		</div>");
document.writeln("	</div>");
document.writeln("</header>");
document.writeln("<div class=\'header\'></div>");

c('header_right')[0].onmouseover = function(){
	c('header_right_black')[0].style.bottom = -c('header_right_black')[0].clientHeight + 'px';
}
c('header_right')[0].onmouseout = function(){
	c('header_right_black')[0].style.bottom = '0px';
}
/*c('header_left')[0].onclick = function(){
	sessionStorage.menu = 1;
	window.location.href = 'index.html';
}
c('header_right_black_total')[0].onclick = function(){
	sessionStorage.menu = 1;
	window.location.href = 'index.html';
}
c('header_right_black_record')[0].onclick = function(){
	sessionStorage.menu = 2;
	window.location.href = 'index.html';
}
c('header_right_black_noWork')[0].onclick = function(){
	sessionStorage.menu = 3;
	window.location.href = 'index.html';
}*/
c('header_right_black_edit')[0].onclick = function(){
	alern('暂未实现');
}

var URLS = 'http://10.1.8.36:8080/calculatesalary';

function headStart(){
	var headerCenter = c('header_center')[0];
	ajax('post',URLS + '/jf/zdbg/menu/list.json','',function(data){
		for(var i = 0; i < data.length; i++){
			var div = creat('div');
			setStyle(div,{width: '100px',height: '50px',lineHeight: '50px',textAlign: 'center',float: 'left',paddingLeft: '10px',paddingRight: '10px',color: '#f0f0f0',cursor: 'pointer',position: 'relative',userSelect: 'none'});
			div.innerHTML = '<img width="20px" height="20px" style="position: relative; top: 5px; margin-right: 10px;" src="image/nav/nav_001.png"/>' + data[i][0].text;
			div.setAttribute('data-menuid',data[i][0].menuid);
			div.setAttribute('data-src',data[i][0].src);
			if(data[i][1].length != 0){
				var count = 0;
				var b = creat('b');
				setStyle(b,{width: '0px',height: '0px',borderTop: '5px #f0f0f0 solid',borderLeft: '5px rgba(0,0,0,0) solid',borderRight: '5px rgba(0,0,0,0) solid',borderBottom: '5px rgba(0,0,0,0) solid',position: 'absolute',top: '25px',right: '5px',transform: 'rotate(-45deg)'});
				div.appendChild(b);
				var ul = creat('ul');
				setStyle(ul,{display: 'none',width: 'auto',minWidth: '100%',height: 'auto',position: 'absolute',left: '0px',top: '60px',opacity: '0',userSelect: 'none'})
				ul.className = '';
				ul.setAttribute('data-menuid',data[i][0].menuid);
				for(var j = 0; j < data[i][1].length; j++){
					var li = creat('li');
					li.innerHTML = '<img width="20px" height="20px" style="position: relative; top: 5px; margin-right: 10px;" src="image/nav/nav_001.png"/>' + data[i][1][j].text;
					li.setAttribute('data-menuid',data[i][1][j].menuid);
					li.setAttribute('data-perent',data[i][1][j].perent);
					li.setAttribute('data-src',data[i][1][j].src);
					setStyle(li,{width: '100%',height: '50px',backgroundColor: '#1F2229',textAlign: 'left',paddingLeft: '10px'})
					if(getUrlVal('menuid') != data[i][1][j].menuid){
						li.onmouseover = function(){this.style.backgroundColor = '#363C48'};
						li.onmouseout = function(){this.style.backgroundColor = '#1F2229'};
						li.onmousedown = function(){
							if(this.dataset.src == 'javascript:void(0)'){
								window.location.href=this.dataset.src;
							}else{
								window.location.href=this.dataset.src + '?menuid=' + this.dataset.menuid
							}
						};
					}else{
						count = 1;
						div.style.backgroundColor = '#363C48';
						li.style.backgroundColor = '#363C48';
					}
					ul.appendChild(li);
				}
				div.appendChild(ul);
				headerCenter.appendChild(div);
				if(getUrlVal('menuid') != div.dataset.menuid){
					if(count == 0){
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
				if(getUrlVal('menuid') != div.dataset.menuid){
					div.onmouseover = function(){this.style.backgroundColor = '#363C48';};
					div.onmouseout = function(){this.style.backgroundColor = '#1F2229';};
					div.onmousedown = function(){
						if(this.dataset.src == 'javascript:void(0)'){
							window.location.href=this.dataset.src;
						}else{
							window.location.href=this.dataset.src + '?menuid=' + this.dataset.menuid;
						}
					};
				}else{
					div.style.backgroundColor = '#363C48';
				}
			};
		}
		var divClear = creat('div');
		divClear.className = 'clear';
		headerCenter.appendChild(divClear);
	},function(){},'json');
}
headStart();