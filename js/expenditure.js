let normSearch = d('norm_search');
let normOne;

/*function normFootTbodyAppend(obj){
    let normFootTbody = c('norm_foot_tbody')[0];
    normFootTbody.innerHTML = '';
    if(obj === undefined||obj.length <= 0){
        alern('没有数据!');
        return false;
    }
    c('norm_foot_one')[0].style.display = 'block';
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
        tda.setAttribute('id','norm_foot_tbody_workCode');
        tda.innerHTML = obj[i].workorderCode;
        tdb.innerHTML = obj[i].materialsCode;
        tdc.innerHTML = obj[i].workingOrder;
        tdd.innerHTML = obj[i].processDescription;
        tde.innerHTML = obj[i].receivingWorkcenter;
        tdf.innerHTML = '<input id="norm_foot_confirm" style="width: 70px; text-align: center;" type="number" oninput="this.value > '+obj[i].existingNum+'?this.value = '+obj[i].existingNum+':log(1);'+obj[i].existingNum+'<=0?alern(\'当前没有可以报工的数量！\'):log(1);" onchange="c(\'norm_foot_two\')[0].style.display = \'none\';d(\'per_caPita\').innerHTML=\'\';" value="'+(obj[i].existingNum - obj[i].workOrderNotSigned) +'"/>';
        tdg.innerHTML = '<button data-value=\''+JSON.stringify(obj[i])+'\' class="norm_foot_next">下一步</button>';
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg]);
        normFootTbody.appendChild(tr);
    }
}*/

let loginUserNameJson = JSON.parse(sessionStorage.loginUserName);
d('norm_foot_work').innerHTML = loginUserNameJson.workcenterCode;

c('norm_foot_next')[0].onclick = function(){
    if(norm_foot_marke.value == ""){
        alern('请输入工序描述！')
        return false;
    }
    c('norm_foot_two')[0].style.display = 'block';
    //清空第二步的内容
    let reportingFootReady = d('reporting_foot_ready');
    let reportingFootReadyTotal = d('reporting_foot_ready_total');
    let reportingFootNorm = d('reporting_foot_norm');
    let reportingFootNormTotal = d('reporting_foot_norm_total');
    let Operator = d('operator');

    reportingFootReady.innerHTML = '';
    reportingFootReadyTotal.innerHTML = '';
    reportingFootNorm.innerHTML = '';
    reportingFootNormTotal.value = '';
    Operator.value = '';

    reportingFootReady.innerHTML = 0;
    reportingFootReadyTotal.innerHTML = 0;
    reportingFootNorm.innerHTML = 0;

    ajax('post',URLS + '/jf/zdbg/reportingwork/operator.json','',function(msg){
        log(msg);
        let operatorListArray = [];
        for(let j in msg.obj){
            for(let k in msg.obj[j]){
                let operatorListObject = {};
                if(loginUserNameJson.workcenterCode !== k.split('-')[1]){
                    operatorListObject[k] = msg.obj[j][k];
                    log(operatorListObject,11);
                    operatorListArray.push(operatorListObject);
                }else{
                    operatorListObject[k] = msg.obj[j][k];
                    log(operatorListObject,22);
                    operatorListArray.unshift(operatorListObject);
                }
            }
        }
        let Operator = d('operator');
        Operator.dataset.select = JSON.stringify(operatorListArray);
        let operatorFixed = c('operator_fixed')[0];
        let operatorFixedBody = c('operator_fixed_body')[0];
        let operatorFixedBodyView = c('operator_fixed_body_view')[0];
        operatorFixedBody.onmousedown = function(e){
            BlockDefault(e);
        };
        operatorFixedBodyView.onmousedown = function(e){
            BlockDefault(e);
        };
        operatorFixedBody.innerHTML = '<h4>请选择作业员：</h4>';
        operatorFixedBodyView.innerHTML = '<h4>已选择作业员：</h4>';
        let operatorListViewArray = JSON.parse(Operator.dataset.select);
        for(let j in operatorListViewArray){
            if(!operatorListViewArray.hasOwnProperty(j)) continue;
            for(let k in operatorListViewArray[j]){
                if(!operatorListViewArray[j].hasOwnProperty(k)) continue;
                let p = creat('p');
                p.innerHTML = k;
                operatorFixedBody.appendChild(p);
                for(let o in operatorListViewArray[j][k]){
                    if(!operatorListViewArray[j][k].hasOwnProperty(o)) continue;
                    let h5 = creat('h5');
                    h5.innerHTML = '<input type="checkbox" data-value="'+ operatorListViewArray[j][k][o].operatorCode +'" data-name="'+ operatorListViewArray[j][k][o].operatorName +'" onclick="FixedCheck(this)"  />' + operatorListViewArray[j][k][o].operatorName;
                    operatorFixedBody.appendChild(h5);
                }
            }
        }
        Operator.onfocus = function(){
            operatorFixed.style.display = 'block';
        };
        Operator.onblur = function(){
            operatorFixed.style.display = 'none';
        };
    },'','json');
}

d('reporting_foot_norm_total').oninput = function(){
    let Operator = d('operator').value;
    let perCaPita = d('per_caPita');
    let OperatorNum = Operator != ""?Operator.split(',').length:[];
    OperatorNum != 0?perCaPita.innerHTML = (Number(this.value) / OperatorNum).toFixed(2):perCaPita.innerHTML = 0;
}

//选择作业员使用方法
function FixedCheck(that){
    let reportingFootReadyTotal = d('reporting_foot_ready_total').innerHTML,
    reportingFootNormTotal = d('reporting_foot_norm_total').value,
    perCaPita = d('per_caPita'),
    operatorFixedBodyView = c('operator_fixed_body_view')[0],
    Operator = d('operator');

    if(that.checked){
        let p = creat('p');
        p.innerHTML = that.dataset.name;
        p.className = 'operator_fixed_body_view_p';
        p.setAttribute('data-value',that.dataset.name + ':' + that.dataset.value);
        operatorFixedBodyView.appendChild(p);
        if(Operator.value !== ""){
            Operator.value += ',' + that.dataset.name + ':' + that.dataset.value;
        }else{
            Operator.value += that.dataset.name + ':' + that.dataset.value;
        }
        if(c('operator_fixed_body_view_p').length !== 0){
            perCaPita.innerHTML = parseFloat(Number(reportingFootReadyTotal) * 60 + Number(reportingFootNormTotal) / c('operator_fixed_body_view_p').length).toFixed(2);
        }else{
            perCaPita.innerHTML = 0;
        }
    }else{
        for(let i = 0; i < c('operator_fixed_body_view_p').length; i++){
            if(c('operator_fixed_body_view_p')[i].dataset.value === that.dataset.name + ':' + that.dataset.value){
                c('operator_fixed_body_view_p')[i].parentNode.removeChild(c('operator_fixed_body_view_p')[i]);
            }
        }
        let OperatorArray = Operator.value.split(',');
        for(let i = 0; i < OperatorArray.length; i++){
            if(OperatorArray[i] === that.dataset.name + ':' + that.dataset.value){
                OperatorArray.splice(i,1);
            }
        }
        Operator.value = '';
        for(let i in OperatorArray){
            log(OperatorArray[i]);
            if(Operator.value !== ""){
                Operator.value += ',' + OperatorArray[i];
            }else{
                Operator.value += OperatorArray[i];
            }
        }
        if(c('operator_fixed_body_view_p').length !== 0){
            perCaPita.innerHTML = parseFloat(Number(reportingFootReadyTotal) * 60 + Number(reportingFootNormTotal) / c('operator_fixed_body_view_p').length).toFixed(2);
        }else{
            perCaPita.innerHTML = 0;
        }
    }
}

//提交
d('norm_foot_btn').onclick = function(){
    let onrmArrS = {},    //获取报工的基础信息
    operatorStr = '',   //获取作业员
    normFootOrder = d('norm_foot_order').innerHTML,             //获取工单编号
    normFootMaterials = d('norm_foot_materials').innerHTML,     //获取物料编号
    normFootWorkOrder = d('norm_foot_workOrder').innerHTML,     //获取工作顺序
    normFootMarke = d('norm_foot_marke').value,                 //获取工序描述
    normFootWork = d('norm_foot_work').innerHTML,               //获取工作中心
    normFootConfirmValue = d('norm_foot_number').innerHTML,     //获取报工数量
    reportingFootReady = d('reporting_foot_ready').innerHTML,   //获取准备工时
    reportingFootReadyTotal = d('reporting_foot_ready_total').innerHTML,//获取准备工时合计
    reportingFootNorm = d('reporting_foot_norm').innerHTML,             //获取标准工时
    reportingFootNormTotal = d('reporting_foot_norm_total').value,      //获取标准工时合计
    perCaPita = d('per_caPita').innerHTML,    //获取人均工时
    normError = "";
    for(let i = 0; i < c('operator_fixed_body_view_p').length; i++){
        if(i !== 0){
            operatorStr += ',' + c('operator_fixed_body_view_p')[i].dataset.value;
        }else{
            operatorStr += c('operator_fixed_body_view_p')[i].dataset.value;
        }
    }
    if(normFootMarke === ''){
        normError += '请输入工序描述!<br/>';
    }
    if(reportingFootNormTotal === ''){
        normError += '请输入人工工时合计!<br/>';
    }
    if(operatorStr === ''){
        normError += '请选择至少一名作业员!';
    }
    if(normError){
        alern(normError);
        return false;
    }
    onrmArrS.workorderCode = normFootOrder;
    onrmArrS.materialsCode = normFootMaterials;
    onrmArrS.workingOrder = normFootWorkOrder;
    onrmArrS.processDescription = normFootMarke;
    onrmArrS.workcenterCode = normFootWork;
    onrmArrS.receivingWorkcenter = normFootWork;
    onrmArrS.nextWorkingOrder = normFootWork;
    onrmArrS.transferNum = normFootConfirmValue;
    onrmArrS.preparationTime = reportingFootReady;
    onrmArrS.preparationTimeTotal = reportingFootReadyTotal;
    onrmArrS.artificialTime = reportingFootNorm;
    onrmArrS.artificialTimeTotal = reportingFootNormTotal;
    onrmArrS.percapitaWorkhours = perCaPita;
    onrmArrS.operatorCode = operatorStr;
    onrmArrS.reportUserCode = JSON.parse(sessionStorage.loginUserName).userCode;
    ajax('post', URLS + '/jf/zdbg/reportingwork/submit.json', 'obj=' + JSON.stringify(onrmArrS),function(data){
        alert(data.msg);
        location.reload();
    },'','json');
};