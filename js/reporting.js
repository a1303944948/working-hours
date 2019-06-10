//搜索事件
d('order_search_btn').onclick = function(){
    WmPageMarkStart(JSON.parse(d('page_mark').dataset.length)[1]);
    /*ajax('post',URLS + '/jf/zdbg/workorder/list.json','workorderCode=' + orderWork + '&materialsCode=' + orderNumber + '&workcenterCode=' + orderCenter + '&scheduleDate=' + orderDate + '&urgentNum=' + orderUrgent + '&deleted=' + orderDelete,function(data){
        normFootTbodyAppend(data.objs, orderDelete);
    },'','json');*/
};
function WmPageMarkStart(num){
    let orderWork = d('order_work').value;
    let orderCenter = d('order_center').dataset.value;
    let orderOperator = d('order_operator').value;
    let orderStartDate = d('order_start_date').value;
    let orderEndDate = d('order_end_date').value;
    let orderStatus = d('order_status').dataset.value;
    log(orderWork,orderCenter,orderOperator,orderStartDate,orderEndDate,orderStatus);
    loading('加载中');
    let pageMark = d('page_mark');
    let pageMarkLength = JSON.parse(d('page_mark').dataset.length);
    //http://10.1.8.36:8080/calculatesalary
    ajax('post',URLS + '/jf/zdbg/report/search.json','pageNumber=' + num + '&pageSize=' + pageMarkLength[2] + '&startTime=' + orderStartDate + '&endTime=' + orderEndDate + '&processStatus=' + orderStatus + '&workCenterCode=' + orderCenter + '&workOrderCode=' + orderWork + '&operatorCode=' + orderOperator,function(data){
        log(data);
        pageMarkLength[0] = data.total;
        pageMark.setAttribute('data-length',JSON.stringify(pageMarkLength));
        WmPageMark();
        normFootTbodyAppend(data.objs);
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

function normFootTbodyAppend(obj){
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
            // let tdq = creat('td');
            // let tdr = creat('td');
            // let tds = creat('td');
            // let tdt = creat('td');
            tda.innerHTML = obj[i].workorderCode;
            tdb.innerHTML = obj[i].materialsCode;
            //tdc.innerHTML = obj[i].materialsName;
            tdd.innerHTML = obj[i].workingOrder;
            tde.innerHTML = obj[i].processDescription;
            tdf.innerHTML = obj[i].transferNum;
            tdg.innerHTML = obj[i].workingSectionSequence;
            tdh.innerHTML = obj[i].workSection;
            tdi.innerHTML = obj[i].percapitaWorkhours;
            //tdj.innerHTML = obj[i].basicStartDate;
           // tdk.innerHTML = obj[i].basicEndDate;
            tdl.innerHTML = '<div>' + obj[i].operatorCode + '</div>';
            tdm.innerHTML = obj[i].reportTime;
            if(obj[i].auditTime !== undefined){
                tdn.innerHTML = obj[i].auditTime
            }else{
                tdn.innerHTML = ''
            }
            if(obj[i].signingTime !== undefined){
                tdo.innerHTML = obj[i].signingTime
            }else{
                tdo.innerHTML = ''
            }
            tdp.innerHTML = obj[i].status;
            // tdq.innerHTML = obj[i].urgentNum === 1?'<input class="order_foot_tbody_checkbox" type="checkbox" checked="checked"/>':'<input class="order_foot_tbody_checkbox" type="checkbox"/>';
            // tdr.innerHTML = obj[i].updatetime;
            // tds.innerHTML = obj[i].workOrderStatus;
            // if(num === '1'){
            //     tdt.innerHTML = '<button onclick="edit(this,'+i+',0)">恢复</button>';
            // }else{
            //     tdt.innerHTML = '<button onclick="edit(this,'+i+',0)">修改</button> <button onclick="edit(this,'+i+',1)">删除</button>';
            // }
            setAppend(tr,[tda,tdb,/*tdc,*/tdd,tde,tdf,tdg,tdh,tdi,/*tdj,tdk,*/tdl,tdm,tdn,tdo,tdp,/*tdq,tdr,tds,tdt*/]);
            orderFootTbody.appendChild(tr);
        }
    }else{
        alern('没有数据!');
    }
}
userSelect();

/*function edit(that,index,num){
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
    ajax('post',URLS + '/jf/zdbg/workorder/updatesigle.json','obj=' + objectify,function(data){
        log(data);
        ajax('post',URLS + '/jf/zdbg/workorder/list.json','workorderCode=&materialsCode=&workcenterCode=&scheduleDate=&urgentNum=&deleted=',function(data){
            normFootTbodyAppend(data.objs);
        },'','json');
        alern(data.text);
    },'','json')
}*/