let normSearch = d('norm_search');
let normNo = d('norm_no');
let normOne;
normSearch.onchange = function(){
    ajax('post',URLS + '/jf/zdbg/reportingwork/workingorder.json','workcode=' + normSearch.value + '&workingOrder=',function(data){
        data = data.objs;
        let normNoArr = [];
        c('norm_foot_one')[0].style.display = 'none';
        c('norm_foot_two')[0].style.display = 'none';
        if(data === undefined){
            return false;
        }
        for(let i = 0; i < data.length; i++){
            let normNoObj = {};
            normNoObj.name = data[i].processDescription;
            normNoObj.value = data[i].workingOrder;
            normNoArr.push(normNoObj);
        }
        normNo.dataset.select = JSON.stringify(normNoArr);
        WmStartSelect();
    },function(msg){
        log(msg);
    },'json');
};

d('norm_search_btn').onclick = function(){
    if(normNo.dataset.value === undefined||normNo.dataset.value === ''){
        alern('请选择工作顺序进行查询！');
        return false;
    }
    ajax('post',URLS + '/jf/zdbg/reportingwork/workingorder.json','workcode=' + normSearch.value + '&workingOrder=' + normNo.dataset.value,function(data){
        normOne = data.objs;
        normFootTbodyAppend(data.objs);
        c('norm_foot_one')[0].style.display = 'block';
    },'','json');
};

function normFootTbodyAppend(obj){
    let normFootTbody = c('norm_foot_tbody')[0];
    normFootTbody.innerHTML = '';
    if(obj === undefined||obj.length <= 0){
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
        tda.innerHTML = obj[i].workorderCode;
        tdb.innerHTML = obj[i].materialsCode;
        tdc.innerHTML = obj[i].workingOrder;
        tdd.innerHTML = obj[i].processDescription;
        tde.innerHTML = obj[i].receivingWorkcenter;
        log(JSON.stringify(obj[i]));
        tdf.innerHTML = '<input id="norm_foot_confirm" style="width: 70px; text-align: center;" type="number" oninput="this.value > '+obj[i].existingNum+'?this.value = '+obj[i].existingNum+':log(1);this.value <= 0?this.value = 1:log(1);" onchange="c(\'norm_foot_two\')[0].style.display = \'none\';" value="'+obj[i].existingNum+'"/>';
        tdg.innerHTML = '<button data-value=\''+JSON.stringify(obj[i])+'\' class="norm_foot_next">下一步</button>';
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg]);
        normFootTbody.appendChild(tr);

        c('norm_foot_next')[0].onclick = function(){
            let object = JSON.parse(this.dataset.value);
            c('norm_foot_two')[0].style.display = 'block';
            ajax('post',URLS + '/jf/zdbg/reportingwork/worksection.json','materialsCode='+ object.materialsCode +'&workingOrder=' + object.workingOrder,function(data){
                data = data.objs;
                //清空第二步的内容
                let reportingFootReady = d('reporting_foot_ready');
                let reportingFootReadyTotal = d('reporting_foot_ready_total');
                let reportingFootNorm = d('reporting_foot_norm');
                let reportingFootNormTotal = d('reporting_foot_norm_total');
                let Section = d('section');

                reportingFootReady.innerHTML = '';
                reportingFootReadyTotal.innerHTML = '';
                reportingFootNorm.innerHTML = '';
                reportingFootNormTotal.innerHTML = '';
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
                    ajax('post',URLS +'/jf/zdbg/reportingwork/calworktime.json','materialsCode=' + normOne[0].materialsCode + '&workingOrder=' + normOne[0].workingOrder + '&workingSectionSequence=' + Section.dataset.value + '&quantity=' + d('norm_foot_confirm').value,function(data){
                        reportingFootReady.innerHTML = data.obj.preparationTime;
                        reportingFootReadyTotal.innerHTML = data.obj.preparationTimeTotal;
                        reportingFootNorm.innerHTML = data.obj.standardWorkhours;
                        reportingFootNormTotal.innerHTML = data.obj.standardWorkhoursTotal;
                    },'','json')
                });
                ajax('post',URLS + '/jf/zdbg/operator/list.json','',function(msg){
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
                },'','json');
            },'','json');
        }
    }
}