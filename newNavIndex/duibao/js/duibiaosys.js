$(document).ready(function(){

 if (!window.location.origin) {
         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
   }
  var ctx = window.location.origin;
  var href = parent.document.getElementById("index_page").contentWindow.location.href;
  var orgId = localStorage.getItem("orgid_baobiao");
  if(orgId=="a61365e2-969d-4352-b3f8-805027ab9f1d"){
        orgId="";
  }
  var year ="";
  if(year==undefined || year==""){
      year=new Date().getFullYear();
  }
  var tabhref;
  //var orgId="c21834b4-1cb0-490f-a2a8-deeaf7f7e065";
  getdatas(orgId,year);
  function getdatas(orgId,year){
  // 获取http地址信息
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        var ctx = window.location.origin;
        var url = ctx + "/jsjd/benchmark/getBenchmarkStationBaseInfo.do?orgId=" + orgId + "&year=" + year;
        //ajax获取数据data
        $.ajax({
            url: url,	
            type:"post",	
            success: function(data){	
                console.log(data);
             
                $("#detail").html(load(data["result"]["pagedata"]));
                var new_date = new Date().getMonth()+1;
                if(new_date==1 || new_date==2|| new_date==3){
                     $("#detail tr").find("a").contents().unwrap();     
                }
                if(new_date==4 || new_date==5|| new_date==6){
                     $("#detail tr").not(".ji1").find("a").contents().unwrap();     
                }
                if(new_date==7 || new_date==8|| new_date==9){
                     $("#detail tr .ji3").find("a").contents().unwrap();     
                     $("#detail tr .ji4").find("a").contents().unwrap(); 
                }
                if(new_date==10 || new_date==11|| new_date==12){
                     $("#detail tr .ji4").find("a").contents().unwrap();     
                }
                
            }
        }); 
        function load(data) {
            var htmlArray = [];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var j = i + 1;
                var auditStatus = d["auditStatus"];
                if(orgId==""){
                    tabhref="table-look";
                }
                if(auditStatus=="A"||auditStatus=="D"||auditStatus=="G"||auditStatus=="H"||auditStatus=="R"){
                    if(orgId!=""){
                       tabhref="table";
                    }
                }
                if(auditStatus=="B"||auditStatus=="C"||auditStatus=="E"||auditStatus=="F"){
                    tabhref="table-look";
                }
                
                function getMyDate(str){  
                    var oDate = new Date(str),  
                    oYear = oDate.getFullYear(),  
                    oMonth = oDate.getMonth()+1,  
                    oDay = oDate.getDate(),   
                    oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay)+'日';//最后拼接时间  
                    return oTime;
                };  
                function getzf(num){  
                    if(parseInt(num) < 10){  
                        num = '0'+num;  
                    }  
                    return num;  
                }  
                var oTime = getMyDate(d["submitTime"]);
                auditStatus=explainStatus(auditStatus); 
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
                htmlArray.push("<tr><td><input name='kaohe' type='radio' class='tdCheck' data-instcode='"+d["instCode"]+"' data-status='"+d["auditStatus"]+"'  data-org='"+d["orgId"]+"'  value='"+d["applyId"]+"'></td><td>" + j + "</td><td>" + d["applyCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;color:#177eda;cursor: pointer;'id=" + d["applyId"] + " class='ji"+d["quarter"]+"'><a href='"+tabhref+".html?applyId="+d['applyId']+"' style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + d["orgInfo"]["orgName"] + "</td><td>" +auditStatus + "</td><td>"+oTime+"</td><td>"+d["submitUser"]+"</td></tr>");
            }
               
            return htmlArray.join("");
        }
        $("#query").click(function(){
            var startTime = $("#startTime").val();
            var url = ctx + "/jsjd/benchmark/getBenchmarkStationBaseInfo.do?orgId="+orgId+"&year="+startTime;
            $.ajax({
                url: url,	
                type:"post",	
                success: function(data){	
                    console.log(data);
                    $("#detail").html(load(data["result"]["pagedata"]));
                }
            }); 
        })

        //解析审核流程
        function explainStatus(status)
        {
        	switch(status)
        	{
        	  case "A" :status="未提交"; break; 
        	  case "B" :status="待电厂部门审核";break;
        	  case "C" :status="<font color='green'>部门审核通过</font>";break;
        	  case "E" :status="<font color='green'>厂级审核通过</font>";break;
        	  case "F" :status="<font color='green'>集团审核通过</font>";break;
        	  case "D" :status="<font color='red'>部门初审驳回</font>";break;
        	  case "G" :status="<font color='red'>厂级审核驳回</font>";break;
        	  case "H" :status="<font color='red'>集团审核驳回</font>";break;
        	  case "R" :status="撤回";break;
        	}
        	return status;
        }
    }
})

 






