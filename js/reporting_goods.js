let normSearch = d('norm_search');
let normOne;

d('norm_search_btn').onclick = function(){
    if(normSearch.value === ''||normSearch.value === undefined){
        alern('请输入工单编号查询！');
        return false;
    }
    ajax('post',URLS + '/jf/zdbg/reportingwork/workingorder.json','workcode=' + normSearch.value,function(data){
        normOne = data.objs;
        log(normOne);
        log(data);
        normFootTbodyAppend(data.objs);
    },'','json');
};

function normFootTbodyAppend(obj){
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

        c('norm_foot_next')[0].onclick = function(){
            if(d('norm_foot_confirm').value < 1){
                alern('报工数量不能小于1');
                return false;
            }
            let object = JSON.parse(this.dataset.value);
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
            reportingFootNormTotal.innerHTML = '';
            Operator.value = '';

            reportingFootReady.innerHTML = obj[i].preparationTime;
            reportingFootReadyTotal.innerHTML = obj[i].preparationTime;
            reportingFootNorm.innerHTML = obj[i].artificialTime;
            reportingFootNormTotal.innerHTML = Math.round(obj[i].artificialTime * d('norm_foot_confirm').value);

            ajax('post',URLS + '/jf/zdbg/reportingwork/operator.json','',function(msg){
                let operatorListArray = [];
                for(let j in msg.obj){
                    for(let k in msg.obj[j]){
                        let operatorListObject = {};
                        if(normOne[0].workcenterCode !== k.split('-')[1]){
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
            /*ajax('post',URLS + '/jf/zdbg/operator/list.json','',function(msg){
                msg = msg.objs;
                let Operator = d('operator');
                let OperatorArr = [];
                for(let j = 0; j < msg.length; j++){
                    let OperatorObj = {};
                    OperatorObj.name = msg[j].operatorName;
                    OperatorObj.value = msg[j].operatorCode;
                    OperatorArr.push(OperatorObj);
                }
                Operator.dataset.select = JSON.stringify(OperatorArr);
                WmCheckSelect();
            },'','json');*/
        }
    }
}

//选择作业员使用方法
function FixedCheck(that){
    let reportingFootReadyTotal = d('reporting_foot_ready_total').innerHTML,
    reportingFootNormTotal = d('reporting_foot_norm_total').innerHTML,
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
    let onrmArr = JSON.parse(c('norm_foot_tbody')[0].children[0].dataset.value),    //获取报工的基础信息
    onrmArrS = {},    //获取报工的基础信息
    operatorStr = '',   //获取作业员
    normFootConfirmValue = d('norm_foot_confirm').value,    //获取报工数量
    reportingFootReady = d('reporting_foot_ready').innerHTML,    //获取准备工时
    reportingFootReadyTotal = d('reporting_foot_ready_total').innerHTML,  //获取准备工时合计
    reportingFootNorm = d('reporting_foot_norm').innerHTML,   //获取标准工时
    reportingFootNormTotal = d('reporting_foot_norm_total').innerHTML,    //获取标准工时合计
    perCaPita = d('per_caPita').innerHTML;    //获取人均工时
    for(let i = 0; i < c('operator_fixed_body_view_p').length; i++){
        if(i !== 0){
            operatorStr += ',' + c('operator_fixed_body_view_p')[i].dataset.value;
        }else{
            operatorStr += c('operator_fixed_body_view_p')[i].dataset.value;
        }
    }
    if(operatorStr === ''){
        alern('请选择至少一名作业员再提交!');
        return false;
    }
    onrmArrS.workorderCode = onrmArr.workorderCode;
    onrmArrS.materialsCode = onrmArr.materialsCode;
    onrmArrS.workingOrder = onrmArr.workingOrder;
    onrmArrS.processDescription = onrmArr.processDescription;
    onrmArrS.workcenterCode = onrmArr.workcenterCode;
    onrmArrS.receivingWorkcenter = onrmArr.receivingWorkcenter;
    onrmArrS.nextWorkingOrder = onrmArr.nextWorkingOrder;
    onrmArrS.transferNum = normFootConfirmValue;
    onrmArrS.preparationTime = reportingFootReady;
    onrmArrS.preparationTimeTotal = reportingFootReadyTotal;
    onrmArrS.artificialTime = reportingFootNorm;
    onrmArrS.artificialTimeTotal = reportingFootNormTotal;
    onrmArrS.percapitaWorkhours = perCaPita;
    onrmArrS.operatorCode = operatorStr;
    onrmArrS.reportUserCode = JSON.parse(sessionStorage.loginUserName).userCode;
    log(JSON.stringify(onrmArrS));
    ajax('post', URLS + '/jf/zdbg/reportingwork/submit.json', 'obj=' + JSON.stringify(onrmArrS),function(data){
        alern(data.msg);
        window.location.reload();
    },'','json');
};