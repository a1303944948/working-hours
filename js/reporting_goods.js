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
        tdf.innerHTML = '<input id="norm_foot_confirm" style="width: 70px; text-align: center;" type="number" oninput="this.value > '+obj[i].existingNum+'?this.value = '+obj[i].existingNum+':log(1);this.value <= 0?this.value = 1:log(1);" onchange="c(\'norm_foot_two\')[0].style.display = \'none\';" value="'+obj[i].existingNum+'"/>';
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
            ajax('post',URLS + '/jf/zdbg/reportingwork/worksection.json','materialsCode='+ object.materialsCode +'&workingOrder=' + object.workingOrder,function(data){
                data = data.objs;
                //清空第二步的内容
                let reportingFootReady = d('reporting_foot_ready');
                let reportingFootReadyTotal = d('reporting_foot_ready_total');
                let reportingFootNorm = d('reporting_foot_norm');
                let reportingFootNormTotal = d('reporting_foot_norm_total');
                let Operator = d('operator');
                let Section = d('section');

                reportingFootReady.innerHTML = '';
                reportingFootReadyTotal.innerHTML = '';
                reportingFootNorm.innerHTML = '';
                reportingFootNormTotal.innerHTML = '';
                Operator.value = '';
                Section.dataset.value = '';
                Section.value = '';

                let SectionArr = [];
                for(let j = 0; j < data.length; j++){
                    let SectionObj = {};
                    SectionObj.name = data[j].workingSection;
                    SectionObj.value = data[j].workingSectionSequence;
                    SectionArr.push(SectionObj);
                }
                Section.dataset.select = JSON.stringify(SectionArr);
                WmStartSelect();
                Add(Section,'blur',function(){
                    if(Section.dataset.value === undefined||Section.dataset.value === ''){
                        return false;
                    }
                    log(Section.dataset.value);
                    log(d('norm_foot_tbody_workCode').innerHTML);
                    ajax('post',URLS +'/jf/zdbg/reportingwork/calworktime.json','materialsCode=' + normOne[0].materialsCode + '&workingOrder=' + normOne[0].workingOrder + '&workingSectionSequence=' + Section.dataset.value + '&quantity=' + d('norm_foot_confirm').value + '&workcode=' + d('norm_foot_tbody_workCode').innerHTML,function(data){
                        reportingFootReady.innerHTML = data.obj.preparationTime;
                        reportingFootReadyTotal.innerHTML = data.obj.preparationTimeTotal;
                        reportingFootNorm.innerHTML = data.obj.standardWorkhours;
                        reportingFootNormTotal.innerHTML = data.obj.standardWorkhoursTotal;
                    },'','json')
                });
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
                        for(let k in operatorListViewArray[j]){
                            let p = creat('p');
                            p.innerHTML = k;
                            operatorFixedBody.appendChild(p);
                            for(let o in operatorListViewArray[j][k]){
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
            },'','json');
        }
    }
}

//选择作业员使用方法
function FixedCheck(that){
    let reportingFootReadyTotal = d('reporting_foot_ready_total').innerHTML;
    let reportingFootNormTotal = d('reporting_foot_norm_total').innerHTML;
    let perCaPita = d('per_caPita');

    let operatorFixedBodyView = c('operator_fixed_body_view')[0];
    let Operator = d('operator');
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
    let onrmArr = JSON.parse(c('norm_foot_tbody')[0].children[0].dataset.value);    //获取报工的基础信息
    let onrmArrS = {};    //获取报工的基础信息
    let operatorStr = '';   //获取作业员
    let sectionDataValue = d('section').dataset.value;  //获取工段序号
    let sectionValue = d('section').value;  //获取工段名称
    let normFootConfirmValue = d('norm_foot_confirm').value;    //获取报工数量
    let reportingFootReady = d('reporting_foot_ready').innerHTML;    //获取准备工时
    let reportingFootReadyTotal = d('reporting_foot_ready_total').innerHTML;  //获取准备工时合计
    let reportingFootNorm = d('reporting_foot_norm').innerHTML;   //获取标准工时
    let reportingFootNormTotal = d('reporting_foot_norm_total').innerHTML;    //获取标准工时合计
    let perCaPita = d('per_caPita').innerHTML;    //获取人均工时
    for(let i = 0; i < c('operator_fixed_body_view_p').length; i++){
        if(i !== 0){
            operatorStr += ',' + c('operator_fixed_body_view_p')[i].dataset.value;
        }else{
            operatorStr += c('operator_fixed_body_view_p')[i].dataset.value;
        }
    }
    if(d('section').value === ''||d('section').value === undefined){
        alern('请选择一个工段！');
        return false;
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
    onrmArrS.workSection = sectionValue;
    onrmArrS.workingSectionSequence = sectionDataValue;
    onrmArrS.transferNum = normFootConfirmValue;
    onrmArrS.preparationTime = reportingFootReady;
    onrmArrS.preparationTimeTotal = reportingFootReadyTotal;
    onrmArrS.standardWorkhours = reportingFootNorm;
    onrmArrS.standardWorkhoursTotal = reportingFootNormTotal;
    onrmArrS.percapitaWorkhours = perCaPita;
    onrmArrS.operatorCode = operatorStr;
    onrmArrS.reportUserCode = JSON.parse(sessionStorage.loginUserName).userCode;
    log(onrmArrS);
    ajax('post', URLS + '/jf/zdbg/reportingwork/submit.json', 'obj=' + JSON.stringify(onrmArrS),function(data){
        alern(data.msg);
    },'','json');
};