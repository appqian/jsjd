$(document).ready(function(){

 if (!window.location.origin) {
         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
   }
  var ctx = window.location.origin;
  var year ="";
  if(year==undefined || year==""){
      year=new Date().getFullYear();
  }
  getdatas(year);
  function getdatas(year){
  // 获取http地址信息
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        var ctx = window.location.origin;
        var url = ctx + "/jsjd/benchmark/getBenchmarkGroupBaseInfo.do?year="+year;
        //ajax获取数据data
        $.ajax({
            url: url,	
            type:"get",	
            success: function(data){	
                console.log(data);
                $("#detail").html(load(data["result"]["pagedata"]));
            }
        }); 
        function load(data) {
            var htmlArray = [];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var j = i + 1;
                var mmsecond = d["createTime"];
                var result = [60,60,24];
                var flag;
                var result_re = "";
                mmsecond = Math.floor(mmsecond/1000);
                //变成秒单位,但是不操作
                //下面这个for计算时分秒
                for(var k=0;k<3;k++){
                    flag = Math.floor(mmsecond%result[k]);
                    mmsecond = Math.floor(mmsecond/result[k]);
                    if(flag < 10){
                        result_re = "0"+flag +":"+ result_re;
                    }else{
                        result_re = flag +":"+ result_re;
                    }
                }
                //去掉最后的一个冒号
                result_re = result_re.substring(0,result_re.length-1);
                //下面计算年月日
                var year,month,day;
                var everyMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
                //计算年
                flag = Math.floor(mmsecond/365);
                year = 1970 - 0 + flag;
                mmsecond = Math.floor(mmsecond%365);
                //计算月和日
                for(h=0;h<12;h++){
                //判断闰月
                    if(((year%4 == 0)&&(year%100 != 0)) || (year%400 == 0)){
                        if(mmsecond == 59){
                            month = "02";
                            day = "29";
                            break;
                        }
                    }
                    if(mmsecond > everyMonth[h]){
                        mmsecond -= everyMonth[h];
                    }else{
                        month = k+1;
                        day = mmsecond;
                        month = month >10?month:"0"+month;
                        day = day>10?day:"0"+day;
                    }
                }
                //拼起来
                result_re = year + "-" + month +"-"+day + " " + result_re;
                var publishStatus = d["publishStatus"];
                var tabhref;
                if(publishStatus=="Y"){
                    tabhref="table-group-look";
                }
                if(publishStatus=="N"){
                    tabhref="table-group";
                }
                publishStatus=explainStatus(publishStatus); 
                var quarter = d["quarter"];
                if(quarter==1){
                    quarter="第一季度";
                }else if(quarter==2){
                    quarter="第二季度";
                }else if(quarter==3){
                    quarter="第三季度";
                }else if(quarter==4){
                    quarter="第四季度";
                }
                htmlArray.push("<tr><td><input name='kaohe' type='radio' class='tdCheck' data-instcode='"+d["summaryId"]+"' data-status='"+d["publishStatus"]+"'  data-org='"+d["orgId"]+"'  value='"+d["summaryId"]+"'></td><td>" + j + "</td><td>" + d["summaryCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;color:#177eda;cursor: pointer;'id=" + d["summaryId"] + " ><a href='"+tabhref+".html?summaryId="+d['summaryId']+"'style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + publishStatus + "</td><td style='display:none;'>" + result_re + "</td></tr>");
            }
               
            return htmlArray.join("");
        }
        $("#query").click(function(){
            var startTime = $("#startTime").val();
            var url = ctx + "/jsjd/benchmark/getBenchmarkGroupBaseInfo.do?year="+startTime;
            $.ajax({
                url: url,	
                type:"get",	
                success: function(data){	
                    console.log(data);

                    $("#detail").html(load(data["result"]["pagedata"]));
                }
            }); 
        })

        //解析审核流程
        function explainStatus(status) {
        	switch(status)
        	{
        	  case "N" :status="未发布"; break; 
        	  case "Y" :status="已发布";break;
        	}
        	return status;
        }
        $("#tj").click(function() {
            //限制提交的条件 1.状态为待提交的2.撤回的 3.驳回的
            var checkedBox = $("input[type='radio']:checked");
            var length = checkedBox.length;
            if(length!=1)
            {
                alert('请选择一行');
                return ;
            }
            var summaryIds =checkedBox.attr("data-instcode");
            var publishStatus = checkedBox.attr("data-status");
            if(publishStatus=="N"){
                 $.ajax({ 
                    url:ctx+"/jsjd/benchmark/publisBenchmarkStatus.do",
                    type:"post",
                    data:{summaryId:summaryIds},	
                    success: function(data){
                        console.log(data);
                        alert(data.responsMsg);
                        var url = ctx + "/jsjd/benchmark/getBenchmarkGroupBaseInfo.do?year="+year;
                        //ajax获取数据data
                        $.ajax({
                            url: url,	
                            type:"get",	
                            success: function(data){	
                                console.log(data);
                                $("#detail").html(load(data["result"]["pagedata"]));
                            }
                        }); 
                    }
                })
             }else{
                    alert("已发布过");
             }
           
	    });	
    }
})

 






