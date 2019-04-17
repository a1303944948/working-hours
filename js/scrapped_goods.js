let normSearch = d('norm_search');
let normOne;

d('norm_search').onchange = function(){
    ajax('post',URLS + '/jf/zdbg/reportingwork/workingorder.json','workcode=' + normSearch.value,function(data){
        normOne = data.objs;
        log(normOne);
        ajax('post',URLS + '/jf/zdbg/reportingwork/worksection.json','materialsCode='+ normOne[0].materialsCode +'&workingOrder=' + normOne[0].workingOrder,function(msg){
            log(msg);
            let Section = d('section');
            Section.dataset.value = '';
            Section.value = '';
            let SectionArr = [];
            for(let j = 0; j < msg.objs.length; j++){
                let SectionObj = {};
                SectionObj.name = msg.objs[j].workingSection;
                SectionObj.value = msg.objs[j].workingSectionSequence;
                SectionArr.push(SectionObj);
            }
            Section.dataset.select = JSON.stringify(SectionArr);
            WmStartSelect();
        },'','json');
    },'','json');
};
d('norm_search_btn').onclick = function(){
    normFootTbodyAppend(normOne);
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
        tde.innerHTML = obj[i].workcenterCode;
        tdf.innerHTML = '<input id="norm_foot_confirm" style="width: 70px; text-align: center;" type="number" oninput="this.value > '+obj[i].existingNum+'?this.value = '+obj[i].existingNum+':log(1);this.value <= 0?this.value = 1:log(1);" value="'+obj[i].existingNum+'"/>';
        tdg.innerHTML = '<button data-value=\''+JSON.stringify(obj[i])+'\' class="norm_foot_next">报废</button>';
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg]);
        normFootTbody.appendChild(tr);
    }

    c('norm_foot_next')[0].onclick = function(){
        if(d('section').dataset.value === ""||d('section').dataset.value === undefined){
            alern('请选择工段后进行报废操作！');
        }
        let scrappedObj = {};
        scrappedObj.workorderCode = normOne[0].workorderCode;
        scrappedObj.workcenterCode = normOne[0].workcenterCode;
        scrappedObj.workcenterName = normOne[0].workcenterName;
        scrappedObj.materialsCode = normOne[0].materialsCode;
        scrappedObj.workingOrder = normOne[0].workingOrder;
        scrappedObj.processDescription = normOne[0].processDescription;
        scrappedObj.scrappedQuantity = d('norm_foot_confirm').value;
        scrappedObj.scrappedUserCode = JSON.parse(sessionStorage.loginUserName).userCode;
        scrappedObj.workSection = d('section').value;
        scrappedObj.workingSectionSequence = d('section').dataset.value;
        ajax('post',URLS + '/jf/zdbg/scrapped/add.json','obj=' + JSON.stringify(scrappedObj),function(data){
            alern(data.msg);
        },'','json')
    };
}