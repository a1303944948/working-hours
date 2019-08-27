let normSearch = d('norm_search');
let normSign = d('norm_sign');
let normOne;
d('norm_search_btn').onclick = function(){
    if(normSearch.value === ''||normSearch.value === undefined){
        alern('请输入工单编号查询！');
        return false;
    }
    if(normSign.dataset.value === ''||normSign.dataset.value === undefined){
        normSign.dataset.value = 0;
    }
    log(normSign.dataset.value);
    ajax('post',URLS + '/jf/zdbg/reportingwork/reportdata.json','workcode=' + normSearch.value + '&sign=' + normSign.dataset.value,function(data){
        normOne = data.objs;
        let normFootTbody = c('norm_foot_tbody')[0];
        normFootTbody.innerHTML = '';
        if(normOne === undefined||normOne.length <= 0){
            alern('没有数据!');
            return false;
        }
        log(normOne);
        normFootTbodyAppend(normOne,normSign.dataset.value);
    },'','json');
};
function reaSh(){
    ajax('post',URLS + '/jf/zdbg/reportingwork/reportdata.json','workcode=' + normSearch.value + '&sign=' + normSign.dataset.value,function(data){
        normOne = data.objs;
        let normFootTbody = c('norm_foot_tbody')[0];
        normFootTbody.innerHTML = '';
        if(normOne === undefined||normOne.length <= 0){
            return false;
        }
        normFootTbodyAppend(normOne,normSign.dataset.value);
    },'','json');
}

function normFootTbodyAppend(obj,num){
    let normFootTbody = c('norm_foot_tbody')[0];
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
        if(num === '1'){
            tdm.innerHTML = '<button onclick="reviewTwo(this)">删除</button>';
        }else{
            tdm.innerHTML = '<button style="margin-right: 5px;" onclick="reviewOne(this)">审核</button><button onclick="reviewTwo(this)">删除</button>';
        }
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdh,tdi,tdj,tdk,tdl,tdm]);
        normFootTbody.appendChild(tr);
    }
}

function reviewOne(that){
    let reviewArr = JSON.parse(that.parentNode.parentNode.dataset.value);
    reviewArr.auditUserCode = JSON.parse(sessionStorage.loginUserName).userCode;
    ajax('post',URLS + '/jf/zdbg/reportingwork/audit.json','obj=' + JSON.stringify(reviewArr),function(data){
        alern(data.msg);
        reaSh();
    },'','json');
}
function reviewTwo(that){
    ajax('post',URLS + '/jf/zdbg/reportingwork/delauditeddata.json','obj=' + that.parentNode.parentNode.dataset.value,function(data){
        alern(data.msg);
        reaSh();
    },'','json');
}
WmStartSelect();