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
        error:function(XMLHttpRequest, textStatus, errorThrown, data){
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
    let normSearch = d('norm_search').value;
    ajax('post',URLS + '/jf/zdbg/standardtime/list.json','materialsCode=' + normSearch + '&workcenterCode=',function(data){
        if(normSearch !== ''&&normSearch !== null&&normSearch !== undefined) {
            normFootTbodyAppend(data.objs, 1);
        }else{
            normFootTbodyAppend(data.objs,0);
        }
    },'','json');
};

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
        tdb.innerHTML = obj[i].materialsCode;
        tdc.innerHTML = obj[i].workingOrder;
        tdd.innerHTML = obj[i].processDescription;
        tde.innerHTML = obj[i].workingSectionSequence;
        tdf.innerHTML = obj[i].workingSection;
        tdg.innerHTML = obj[i].preparationTime;
        num === 0 ? tdh.innerHTML = obj[i].standardTime : tdh.innerHTML = '<input style="width: 50px; text-align: center;" type="number" value="'+obj[i].standardTime+'"/>';
        tdi.innerHTML = obj[i].workcenterCode;
        tdj.innerHTML = obj[i].workcenterName;
        setAppend(tr,[tda,tdb,tdc,tdd,tde,tdf,tdg,tdh,tdi,tdj]);
        normFootTbody.appendChild(tr);
    }
}