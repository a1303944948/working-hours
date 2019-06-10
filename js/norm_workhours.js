d('norm_submit').onclick = function(){
    let formData = new FormData();
    if(d('norm_file').files.length === 0){
        alern('请先选择一个文件后上传！');
        return false;
    }
    for(let i = 0;i < d('norm_file').files.length; i++){
        formData.append("file", d('norm_file').files[i]);
    }
    $.ajax({
        type:"post",
        url: URLS + '/jf/zdbg/standardtime/upload.json',
        contentType: false, //这个一定要写
        processData: false, //这个也一定要写，不然会报错
        data:formData,
        success:function(data){
            log(data);
            alern('上传成功！');
            d('norm_file').value = '';
            normFootTbodyAppend(data.objs,0);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert('上传发生了一个错误！');
            alern('错误代码为：' + errorThrown);
        }
    });
    /*ajax('post',URLS + '/jf/zdbg/standardtime/upload.json',formData,function(data){
        log(data);
    },function(msg){
        log(msg);
    },'','false');*/
};

d('norm_search_btn').onclick = function(){
    WmPageMarkStart(JSON.parse(d('page_mark').dataset.length)[1],Number(d('page_mark').dataset.pagetype));
};

function WmPageMarkStart(num,type){
    loading('加载中');
    //http://10.1.8.36:8080/calculatesalary
    switch(type){
        case 1:
            let normSearch = d('norm_search').value;
            let pageMark = d('page_mark');
            let pageMarkLength = JSON.parse(d('page_mark').dataset.length);
            ajax('post',URLS + '/jf/zdbg/standardtime/list.json','materialsCode=' + normSearch + '&workcenterCode=&pageNumber='+num+'&pageSize='+pageMarkLength[2],function(data){
                console.log(data);
                if(normSearch !== ''&&normSearch !== null&&normSearch !== undefined) {
                    normFootTbodyAppend(data.objs, 1);
                }else{
                    normFootTbodyAppend(data.objs,0);
                }
                pageMarkLength[0] = data.total;
                pageMark.setAttribute('data-length',JSON.stringify(pageMarkLength));
                WmPageMark();
                loadingClear();
            },'','json');
            break;
        case 2:
            ajax('post',URLS + '/jf/zdbg/standardtime/contrast.json','pageNumber='+num+'&pageSize=20',function(data){
                let pageMark = d('page_mark_two');
                let pageMarkLength = JSON.parse(d('page_mark_two').dataset.length);
                pageMarkLength[0] = data.total;
                pageMark.setAttribute('data-length',JSON.stringify(pageMarkLength));
                normFootUnTimeBodyAppend(data.objs);
                WmPageMark();
                loadingClear();
                c('norm_foot_unTime_fixed')[0].style.display = 'block';
            },'','json');
            break;
        default:
            loadingClear();
            break;
    }
}

let objData = [];
ajax('post',URLS + '/jf/zdbg/workcenter/list.json','',function(data){
    log(data.objs);
    for(let i of data.objs){
        let objObj = {};
        objObj.name = i.workcenterName;
        objObj.value = i.workcenterCode;
        objData.push(objObj);
    }
},'','json');

function normFootTbodyAppend(obj,num){
    let normFootTbody = c('norm_foot_tbody')[0];
    normFootTbody.innerHTML = '';
    if(obj.length <= 0){
        alern('没有数据!');
        return false;
    }
    for(let i = 0; i < obj.length; i++){
        let tr = creat('tr');
        tr.setAttribute('data-value',JSON.stringify(obj[i]));
        let tda = creat('td');
        let tdb = creat('td');
        let tdc = creat('td');
        let tdd = creat('td');
        let tde = creat('td');
        let tdf = creat('td');
        let tdg = creat('td');
        let tdh = creat('td');
        let tdi = creat('td');
        let tdj = creat('td');
        tda.innerHTML = i + 1;
        if(num === 1){
            tdb.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,2)" type="text" value="'+obj[i].materialsCode+'"/>';
            tdc.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,3)" type="text" value="'+obj[i].workingOrder+'"/>';
            tdd.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,4)" type="text" value="'+obj[i].processDescription+'"/>';
            tde.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,5)" type="text" value="'+obj[i].workingSectionSequence+'"/>';
            tdf.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,6)" type="text" value="'+obj[i].workingSection+'"/>';
            tdg.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,7)" type="number" value="'+obj[i].preparationTime+'"/>';
            tdh.innerHTML = '<input style="width: 70%; text-align: center;" onchange="normEditValue(this,8)" type="number" value="'+obj[i].standardTime+'"/>';
            tdi.style.position = 'relative';
            tdi.innerHTML = '<input style="width: 70%; text-align: center;" type="text" class="wm_select" data-select="'+JSON.stringify(objData).replace(/"/g,"'")+'" readonly="readonly" onblur="normEditValue(this,9)" data-value="'+obj[i].workcenterCode+'" value="'+obj[i].workcenterName+'"/>';
            //tdj.innerHTML = `<input style="width: 70%; text-align: center;" type="text" value="${obj[i].workcenterName}"/>`;
            tdj.innerHTML = '<button style="width: 50px;height: 25px;border: none;background-color: #1B9F6F;color: #ffffff;border-radius: 4px; margin-right: 5px;" onmouseover="this.style.backgroundColor = \'#20BC83\';" onmouseout="this.style.backgroundColor = \'#1B9F6F\'" onclick="normEdit(this)">修改</button><button style="width: 50px;height: 25px;border: none;background-color: #ff2222;color: #ffffff;border-radius: 4px;" onmouseover="this.style.backgroundColor = \'#FF5656\';" onmouseout="this.style.backgroundColor = \'#ff2222\'" onclick="normDelete(this)">删除</button>';
            setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi,tdj]);
        }else{
            tdb.innerHTML = obj[i].materialsCode;
            tdc.innerHTML = obj[i].workingOrder;
            tdd.innerHTML = obj[i].processDescription;
            tde.innerHTML = obj[i].workingSectionSequence;
            tdf.innerHTML = obj[i].workingSection;
            tdg.innerHTML = obj[i].preparationTime;
            tdh.innerHTML = obj[i].standardTime;
            tdi.innerHTML = obj[i].workcenterName;
            tdi.setAttribute('data-value',obj[i].workcenterCode);
            tdj.innerHTML = '<button style="width: 50px;height: 25px;border: none;background-color: #ff2222;color: #ffffff;border-radius: 4px;" onmouseover="this.style.backgroundColor = \'#FF5656\';" onmouseout="this.style.backgroundColor = \'#ff2222\'" onclick="normDelete(this)">删除</button>';
            setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi,tdj]);
        }
        normFootTbody.appendChild(tr);
    }
    WmStartSelect();
}

//未录工时显示数据
function normFootUnTimeBodyAppend(obj){ 
    let normFootUnTimeBodyHeadTbody = c('norm_foot_unTime_body_head_tbody')[0];
    normFootUnTimeBodyHeadTbody.innerHTML = '';
    if(obj.length <= 0){
        alern('没有数据!');
        return false;
    }
    for(let i = 0; i < obj.length; i++){
        let tr = creat('tr');
        tr.setAttribute('data-value',JSON.stringify(obj[i]));
        let tda = creat('td');
        let tdb = creat('td');
        let tdc = creat('td');
        let tdd = creat('td');
        let tde = creat('td');
        let tdf = creat('td');
        tda.innerHTML = obj[i].workorderCode;
        tdb.innerHTML = obj[i].materialsCode;
        tdc.innerHTML = obj[i].materialsName;
        tdd.innerHTML = obj[i].processDescription;
        tde.innerHTML = obj[i].workingOrder;
        tdf.innerHTML = obj[i].workcenterCode;
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf]);
        normFootUnTimeBodyHeadTbody.appendChild(tr);
    }
}

function normEditValue(that,num){
    let thisValue = JSON.parse(that.parentNode.parentNode.dataset.value);
    switch(num){
        case 2:
            thisValue.materialsCode = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 3:
            thisValue.workingOrder = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 4:
            thisValue.processDescription = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 5:
            thisValue.workingSectionSequence = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 6:
            thisValue.workingSection = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 7:
            thisValue.preparationTime = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 8:
            thisValue.standardTime = that.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        case 9:
            thisValue.workcenterName = that.value;
            thisValue.workcenterCode = that.dataset.value;
            that.parentNode.parentNode.setAttribute('data-value',JSON.stringify(thisValue));
            break;
        default:
            break;
    }
}
function normEdit(that){
    ajax('post',URLS + '/jf/zdbg/standardtime/update.json','obj='+that.parentNode.parentNode.dataset.value,function(data){
        alern(data.text);
        d('norm_search_btn').click();
    },'','json')
}
function normDelete(that){
    if(confirm('确定要删除该条记录吗？')){
        ajax('post',URLS + '/jf/zdbg/standardtime/delete.json','obj='+that.parentNode.parentNode.dataset.value,function(data){
            alern(data.text);
            d('norm_search_btn').click();
        },'','json')
    }
}

//点击未录工时触发事件
c('norm_foot_unTime')[0].onclick = function(){
    log(d('page_mark_two').dataset.pagetype);
    WmPageMarkStart(JSON.parse(d('page_mark_two').dataset.length)[1],Number(d('page_mark_two').dataset.pagetype));
}

c('norm_foot_plug')[0].onclick = function(){
    let normFootTbody = c('norm_foot_tbody')[0];
    let tr = creat('tr');
    tr.className = 'norm_foot_tbody_tr';
    let tda = creat('td');
    let tdb = creat('td');
    let tdc = creat('td');
    let tdd = creat('td');
    let tde = creat('td');
    let tdf = creat('td');
    let tdg = creat('td');
    let tdh = creat('td');
    let tdi = creat('td');
    let tdj = creat('td');
    tdb.innerHTML = '<input style="width: 70%; text-align: center;" type="text"/>';
    tdc.innerHTML = '<input style="width: 70%; text-align: center;" type="text"/>';
    tdd.innerHTML = '<input style="width: 70%; text-align: center;" type="text"/>';
    tde.innerHTML = '<input style="width: 70%; text-align: center;" type="text"/>';
    tdf.innerHTML = '<input style="width: 70%; text-align: center;" type="text"/>';
    tdg.innerHTML = '<input style="width: 70%; text-align: center;" type="number"/>';
    tdh.innerHTML = '<input style="width: 70%; text-align: center;" type="number"/>';
    tdi.style.position = 'relative';
    tdi.innerHTML = '<input style="width: 70%; text-align: center;" type="text" class="wm_select" data-select="'+JSON.stringify(objData).replace(/"/g,"'")+'" readonly="readonly"/>';
    tdj.innerHTML = '<button style="width: 50px;height: 25px;border: none;background-color: #ff2222;color: #ffffff;border-radius: 4px;" onmouseover="this.style.backgroundColor = \'#FF5656\';" onmouseout="this.style.backgroundColor = \'#ff2222\'" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)">删除</button>';
    setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi,tdj]);
    normFootTbody.appendChild(tr);
    WmStartSelect();
};
c('norm_foot_add')[0].onclick = function(){
    let normFootTbodyTr = c('norm_foot_tbody_tr');
    let normFootTbodyTrArray = [];
    let normFootTbodyError = "";
    if(normFootTbodyTr.length <= 0){
        alern('没有检测到要添加的目标，请插入至少要一条记录后点击此按钮！');
        return false;
    }
    for(let i = 0; i < normFootTbodyTr.length; i++){
        let normFootTbodyTrObject = {};
        if(normFootTbodyTr[i].children[1].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的物料编号不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[2].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的工作顺序不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[3].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的工序描述不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[4].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的工段序号不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[5].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的工段不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[6].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的准备工时不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[7].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的标准工时不能为空<br/>';
        }
        if(normFootTbodyTr[i].children[8].children[0].value === ""){
            normFootTbodyError += '第'+(i+1)+'行的工作中心不能为空<br/>';
        }
        normFootTbodyTrObject.materialsCode = normFootTbodyTr[i].children[1].children[0].value;
        normFootTbodyTrObject.workingOrder = normFootTbodyTr[i].children[2].children[0].value;
        normFootTbodyTrObject.processDescription = normFootTbodyTr[i].children[3].children[0].value;
        normFootTbodyTrObject.workingSectionSequence = normFootTbodyTr[i].children[4].children[0].value;
        normFootTbodyTrObject.workingSection = normFootTbodyTr[i].children[5].children[0].value;
        normFootTbodyTrObject.preparationTime = normFootTbodyTr[i].children[6].children[0].value;
        normFootTbodyTrObject.standardTime = normFootTbodyTr[i].children[7].children[0].value;
        normFootTbodyTrObject.workcenterCode = normFootTbodyTr[i].children[8].children[0].dataset.value;
        normFootTbodyTrObject.workcenterName = normFootTbodyTr[i].children[8].children[0].value;
        normFootTbodyTrArray.push(normFootTbodyTrObject);
    }
    if(normFootTbodyError !== ''){
        alern(normFootTbodyError);
        return;
    }
    ajax('post',URLS + '/jf/zdbg/standardtime/add.json','obj='+JSON.stringify(normFootTbodyTrArray),function(data){
        alern(data.text);
        d('norm_search_btn').click();
    },'','json');
};