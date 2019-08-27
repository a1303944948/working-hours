let normSearch = d('norm_search');
let normOne;

d('norm_search_btn').onclick = function(){
    if(normSearch.value === ''||normSearch.value === undefined){
        alern('请输入工单编号查询！');
        return false;
    }
    ajax('post',URLS + '/jf/zdbg/reportingwork/signingreportdata.json','workcode=' + normSearch.value + '&workcenterCode=' + JSON.parse(sessionStorage.loginUserName).workcenterCode,function(data){
        normOne = data.objs;
        log(normOne);
        if(normOne === undefined||normOne.length <= 0){
            alern('没有数据!');
            return false;
        }
        normFootTbodyAppend(normOne);
    },'','json');
};
function reaSh(){
    ajax('post',URLS + '/jf/zdbg/reportingwork/signingreportdata.json','workcode=' + normSearch.value + '&workcenterCode=' + JSON.parse(sessionStorage.loginUserName).workcenterCode,function(data){
        normOne = data.objs;
        if(normOne === undefined||normOne.length <= 0){
            normFootTbodyAppend(normOne);
        }
    },'','json');
}

function normFootTbodyAppend(obj){
    let normFootTbody = c('norm_foot_tbody')[0];
    normFootTbody.innerHTML = '';
    c('norm_foot_one')[0].style.display = 'block';
    if(normOne === undefined||normOne.length <= 0){
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
        let tdh = creat('td');
        let tdi = creat('td');
        let tdj = creat('td');
        let tdk = creat('td');
        let tdl = creat('td');
        let tdm = creat('td');
        tda.innerHTML = obj[i].workorderCode;
        tdb.innerHTML = obj[i].materialsCode;
        tdc.innerHTML = obj[i].workingOrder;
        tdd.innerHTML = obj[i].processDescription;
        tde.innerHTML = obj[i].receivingWorkcenter;
        tdf.innerHTML = obj[i].transferNum;
        tdh.innerHTML = obj[i].preparationTime;
        tdi.innerHTML = obj[i].artificialTime;
        tdj.innerHTML = obj[i].preparationTimeTotal;
        tdk.innerHTML = obj[i].artificialTimeTotal;
        tdl.innerHTML = '<textarea readonly="readonly">'+obj[i].operatorCode+'</textarea>';
        tdm.innerHTML = '<button onclick="reviewOne(this)">签收</button>';
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdh,tdi,tdj,tdk,tdl,tdm]);
        normFootTbody.appendChild(tr);
    }
}

function reviewOne(that){
    let reviewArr = JSON.parse(that.parentNode.parentNode.dataset.value);
    reviewArr.signingUserCode = JSON.parse(sessionStorage.loginUserName).userCode;
    ajax('post',URLS + '/jf/zdbg/reportingwork/signing.json','obj=' + JSON.stringify(reviewArr),function(data){
        alert(JSON.stringify(data));
        alern(data.msg);
        reaSh();
    },'','json');
}