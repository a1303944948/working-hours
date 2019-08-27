//导入事件
c('order_fileBtn')[0].onclick = function(){
    let formData = new FormData();
    let orderBodyFile = d('order_file');
    if(orderBodyFile.files.length === 0){
        alern('请先选择一个文件后上传！');
        return false;
    }
    for(let i = 0;i < orderBodyFile.files.length; i++){
        formData.append("file", orderBodyFile.files[i]);
    }
    $.ajax({
        type:"post",
        url: URLS + '/jf/zdbg/workordertime/import.json',
        contentType: false, //这个一定要写
        processData: false, //这个也一定要写，不然会报错
        data:formData,
        success:function(data){
            log(data);
            alert('上传成功！');
            let repeat = '';
            for(let i = 0;i < data.existOrder.length; i++){
                repeat += '工单编号：'+data.existOrder[i].workorderCode + '  工序：' + data.existOrder[i].workingOrder + '<br/>';
            }
            if(repeat !== ''){
                alern(repeat,'冲突的工单！');
            }
            orderBodyFile.value = '';
            normFootTbodyAppend(data.objs,0);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown, data){
            log(errorThrown);
        }
    });
};

//更新事件
c('order_upBtn')[0].onclick = function(){
    let formData = new FormData();
    let orderBodyFile = d('order_file');
    if(orderBodyFile.files.length === 0){
        alern('请先选择一个文件后上传！');
        return false;
    }
    for(let i = 0;i < orderBodyFile.files.length; i++){
        formData.append("file", orderBodyFile.files[i]);
    }
    $.ajax({
        type:"post",
        url: URLS + '/jf/zdbg/workordertime/update.json',
        contentType: false, //这个一定要写
        processData: false, //这个也一定要写，不然会报错
        data:formData,
        success:function(data){
            log(data);
            alert('更新成功！');
            let repeat = '';
            for(let i = 0;i < data.haveNtOrder.length; i++){
                repeat += '工单编号：'+data.haveNtOrder[i].workorderCode + '  工序：' + data.haveNtOrder[i].workingOrder + '<br/>';
            }
            if(repeat !== ''){
                alern(repeat,'不存在的工单！');
            }
            orderBodyFile.value = '';
            normFootTbodyAppend(data.objs,0);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown, data){
            log(errorThrown);
        }
    });
};

//导出事件
c('order_exportBtn')[0].onclick = function(){
    location.href = URLS + '/jf/zdbg/workordertime/export.json';
};

//搜索事件
d('order_search_btn').onclick = function(){
    WmPageMarkStart(JSON.parse(d('page_mark').dataset.length)[1]);
    /*ajax('post',URLS + '/jf/zdbg/workorder/list.json','workorderCode=' + orderWork + '&materialsCode=' + orderNumber + '&workcenterCode=' + orderCenter + '&scheduleDate=' + orderDate + '&urgentNum=' + orderUrgent + '&deleted=' + orderDelete,function(data){
        normFootTbodyAppend(data.objs, orderDelete);
    },'','json');*/
};
function WmPageMarkStart(num){
    let orderWork = d('order_work').value;
    let orderNumber = d('order_number').value;
    let orderCenter = d('order_center').value;
    let orderDate = d('order_date').value;
    let orderUrgent = d('order_urgent').dataset.value;
    if(orderUrgent === undefined){
        orderUrgent = "";
    }
    let orderDelete = d('order_delete').dataset.value;
    orderDelete !== ''&&orderDelete !== undefined?orderDelete = d('order_delete').dataset.value: orderDelete = '0';
    loading('加载中');
    let pageMark = d('page_mark');
    let pageMarkLength = JSON.parse(d('page_mark').dataset.length);
    //http://10.1.8.36:8080/calculatesalary
    ajax('post',URLS + '/jf/zdbg/workordertime/list.json','workorderCode=' + orderWork + '&materialsCode=' + orderNumber + '&workcenterCode=' + orderCenter + '&scheduleDate=' + orderDate + '&urgentNum=' + orderUrgent + '&deleted=' + orderDelete + '&pageNumber=' + num + '&pageSize=' + pageMarkLength[2],function(data){
        log(data);
        pageMarkLength[0] = data.total;
        pageMark.setAttribute('data-length',JSON.stringify(pageMarkLength));
        WmPageMark();
        normFootTbodyAppend(data.objs, orderDelete);
        loadingClear();
    },'','json')
}

function userSelect(){
    let orderCenter = d('order_center');
    //渲染工作中心下拉框
    ajax('post',URLS + '/jf/zdbg/workcenter/list.json','',function(data){
        let orderCenterArr = [];
        for(let i = 0; i < data.objs.length; i++){
            let orderCenterObj = {};
            orderCenterObj.name = data.objs[i].workcenterName;
            orderCenterObj.value = data.objs[i].workcenterCode;
            orderCenterArr.push(orderCenterObj);
        }
        orderCenter.setAttribute('data-select',JSON.stringify(orderCenterArr));
        WmStartSelect();
    },function(){},'json');
}

function normFootTbodyAppend(obj,num){
    let orderFootTbody = c('order_foot_tbody')[0];
    orderFootTbody.innerHTML = '';

    if(obj !== undefined&&obj.length > 0){
        for(let i = 0; i < obj.length; i++){
            let tr = creat('tr');
            tr.setAttribute('data-value',JSON.stringify(obj[i]));
            let tda = creat('td');
            let tdb = creat('td');
            //let tdc = creat('td');
            let tdd = creat('td');
            let tde = creat('td');
            let tdf = creat('td');
            let tdg = creat('td');
            let tdh = creat('td');
            let tdi = creat('td');
            // let tdj = creat('td');
            // let tdk = creat('td');
            let tdl = creat('td');
            let tdm = creat('td');
            let tdn = creat('td');
            let tdo = creat('td');
            let tdp = creat('td');
            let tdq = creat('td');
            let tdr = creat('td');
            let tds = creat('td');
            let tdt = creat('td');
            let tdu = creat('td');
            let tdv = creat('td');
            let tdw = creat('td');
            tda.innerHTML = obj[i].workorderCode;
            tdb.innerHTML = obj[i].materialsCode;
            //tdc.innerHTML = obj[i].materialsName;
            tdd.innerHTML = obj[i].workingOrder;
            tde.innerHTML = obj[i].processDescription;
            tdf.innerHTML = obj[i].processNum;
            tdg.innerHTML = obj[i].confirmedNum;
            tdh.innerHTML = obj[i].scrapsNum;
            tdi.innerHTML = obj[i].existingNum;
            //tdj.innerHTML = obj[i].basicStartDate;
           // tdk.innerHTML = obj[i].basicEndDate;
            tdl.innerHTML = obj[i].releaseDate;
            tdm.innerHTML = obj[i].workcenterCode;
            tdn.innerHTML = obj[i].receivingWorkcenter;
            tdo.innerHTML = obj[i].preparationTime;
            tdp.innerHTML = obj[i].artificialTime;
            tdq.innerHTML = obj[i].machineTime;
            tdr.innerHTML = '<input class="order_foot_tbody_date" type="date" value="'+obj[i].scheduleDate+'"/>';
            tds.innerHTML = '<input class="order_foot_tbody_number" type="number" value="'+obj[i].targetNum+'"/>';
            tdt.innerHTML = obj[i].urgentNum === 1?'<input class="order_foot_tbody_checkbox" type="checkbox" checked="checked"/>':'<input class="order_foot_tbody_checkbox" type="checkbox"/>';
            tdu.innerHTML = obj[i].updatetime;
            tdv.innerHTML = obj[i].workOrderStatus;
            if(num === '1'){
                tdw.innerHTML = '<button onclick="edit(this,'+i+',0)">恢复</button>';
            }else{
                tdw.innerHTML = '<button onclick="edit(this,'+i+',0)">修改</button> <button onclick="edit(this,'+i+',1)">删除</button>';
            }
            setAppend(tr,[tda,tdb,/*tdc,*/tdd,tde,tdf,tdg,tdh,tdi,/*tdj,tdk,*/tdl,tdm,tdn,tdo,tdp,tdq,tdr,tds,tdt,tdu,tdv,tdw]);
            orderFootTbody.appendChild(tr);
        }
    }else{
        alern('没有数据!');
    }
}

function edit(that,index,num){
    let obj = JSON.parse(that.parentNode.parentNode.dataset.value);
    let orderFootTbodyDate = c('order_foot_tbody_date')[index].value;
    let orderFootTbodyNumber = Number(c('order_foot_tbody_number')[index].value);
    let orderFootTbodyCheckbox = c('order_foot_tbody_checkbox')[index].checked;
    orderFootTbodyCheckbox?orderFootTbodyCheckbox = 1:orderFootTbodyCheckbox = 0;
    if(num === 0){
        obj.scheduleDate = orderFootTbodyDate;
        obj.targetNum = orderFootTbodyNumber;
        obj.urgentNum = orderFootTbodyCheckbox;
        obj.deleted = num;
    }else{
        obj.deleted = num;
    }
    let objectify = encodeURIComponent(JSON.stringify(obj));
    let orderDelete = d('order_delete').dataset.value;
    log(objectify);
    ajax('post',URLS + '/jf/zdbg/workordertime/updatesigle.json','obj=' + objectify,function(data){
        log(data);
        ajax('post',URLS + '/jf/zdbg/workordertime/list.json','workorderCode=&materialsCode=&workcenterCode=&scheduleDate=&urgentNum=&deleted=',function(data){
            normFootTbodyAppend(data.objs, orderDelete);
        },'','json');
        alern(data.text);
    },'','json')
}
userSelect();