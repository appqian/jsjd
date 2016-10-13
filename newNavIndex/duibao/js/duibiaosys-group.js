$(document).ready(function(){

 if (!window.location.origin) {
         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
   }
  var ctx = window.location.origin;
  var year ="";
  if(year==undefined || year==""){
      year=new Date().getFullYear();
  }
  var tabhref;
  var isjt=true;
  isJTUser();
  function isJTUser(){
    var url = ctx + "/jsjd/benchmark/isJTUser.do";
    $.ajax({
        url: url,	
        type:"get",	
        success: function(data){
            if(data==false){
                isjt =false;
                $(".tj").css("display","none");
                $(".qx").css("display","none");
                $(".selt").css("display","none");
                
            }
        }
    })
  }
  getdatas(year);
  function getdatas(year){
  // 获取http地址信息
        var url = ctx + "/jsjd/benchmark/getBenchmarkGroupBaseInfo.do?year="+year;
        //ajax获取数据data
        $.ajax({
            url: url,	
            type:"get",	
            success: function(data){	
                $("#detail").html(load(data["result"]["pagedata"]));
                $(document).on('click','.tj',function(){
                    //限制提交的条件 1.状态为待提交的2.撤回的 3.驳回的
                    var checkedBox = $(this);
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
                                        var new_date = new Date().getMonth()+1;
                                        if(new_date==1 || new_date==2|| new_date==3){
                                             $("#detail tr").find("a").contents().unwrap();
                                             $("#detail tr").find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").find(".qx").addClass("disabled").removeClass("qx");
                                        }
                                        if(new_date==4 || new_date==5|| new_date==6){
                                             $("#detail tr").eq(0).nextAll().find("a").contents().unwrap(); 
                                             $("#detail tr").eq(0).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").eq(0).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                                        }
                                        if(new_date==7 || new_date==8|| new_date==9){
                                             $("#detail tr").eq(1).nextAll().find("a").contents().unwrap();
                                             $("#detail tr").eq(1).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").eq(1).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                                        }
                                        if(new_date==10 || new_date==11|| new_date==12){
                                             $("#detail tr").eq(3).find("a").contents().unwrap(); 
                                             $("#detail tr").eq(3).find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").eq(3).find(".qx").addClass("disabled").removeClass("qx"); 
                                        }
                                    }
                                }); 
                            }
                        })
                     }else{
                            alert("已发布过");
                     }
        	    });	
                $(document).on('click','.qx',function(){
                    //限制提交的条件 1.状态为待提交的2.撤回的 3.驳回的
                    var checkedBox = $(this);
                    var summaryIds =checkedBox.attr("data-instcode");
                    var publishStatus = checkedBox.attr("data-status");
                    if(publishStatus=="Y"){
                         $.ajax({ 
                            url:ctx+"/jsjd/benchmark/canclePublisBenchmarkStatus.do",
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
                                        $("#detail").html(load(data["result"]["pagedata"]));
                                        var new_date = new Date().getMonth()+1;
                                        if(new_date==1 || new_date==2|| new_date==3){
                                             $("#detail tr").find("a").contents().unwrap();
                                             $("#detail tr").find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").find(".qx").addClass("disabled").removeClass("qx");
                                        }
                                        if(new_date==4 || new_date==5|| new_date==6){
                                             $("#detail tr").eq(0).nextAll().find("a").contents().unwrap(); 
                                             $("#detail tr").eq(0).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").eq(0).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                                        }
                                        if(new_date==7 || new_date==8|| new_date==9){
                                             $("#detail tr").eq(1).nextAll().find("a").contents().unwrap();
                                             $("#detail tr").eq(1).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").eq(1).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                                        }
                                        if(new_date==10 || new_date==11|| new_date==12){
                                             $("#detail tr").eq(3).find("a").contents().unwrap(); 
                                             $("#detail tr").eq(3).find(".tj").addClass("disabled").removeClass("tj");
                                             $("#detail tr").eq(3).find(".qx").addClass("disabled").removeClass("qx"); 
                                        }
                                    }
                                }); 
                            }
                        })
                     }else{
                            alert("还未发布");
                     }
        	    });
                var new_date = new Date().getMonth()+1;
                if(new_date==1 || new_date==2|| new_date==3){
                     $("#detail tr").find("a").contents().unwrap();
                     $("#detail tr").find(".tj").addClass("disabled").removeClass("tj");
                     $("#detail tr").find(".qx").addClass("disabled").removeClass("qx");
                }
                if(new_date==4 || new_date==5|| new_date==6){
                     $("#detail tr").eq(0).nextAll().find("a").contents().unwrap(); 
                     $("#detail tr").eq(0).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                     $("#detail tr").eq(0).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                }
                if(new_date==7 || new_date==8|| new_date==9){
                     $("#detail tr").eq(1).nextAll().find("a").contents().unwrap();
                     $("#detail tr").eq(1).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                     $("#detail tr").eq(1).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                }
                if(new_date==10 || new_date==11|| new_date==12){
                     $("#detail tr").eq(3).find("a").contents().unwrap(); 
                     $("#detail tr").eq(3).find(".tj").addClass("disabled").removeClass("tj");
                     $("#detail tr").eq(3).find(".qx").addClass("disabled").removeClass("qx"); 
                }
            }
        }); 
        function load(data) {
            var htmlArray = [];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var j = i + 1;
              
                var publishStatus = d["publishStatus"];
                
                if(publishStatus=="Y"){
                    tabhref="table-group-look";
                }
                if(publishStatus=="N"&& isjt==true){
                    tabhref="table-group";
                }
                if(publishStatus=="N"&& isjt==false){
                    tabhref="table-group-look";
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
                var oTime = getMyDate(d["publishTime"]);
                if(oTime=="1970年01月01日"){
                    oTime="--";
                }
                var publishUser = d["publishUser"];
                if(publishUser=="" ||publishUser==null){
                    publishUser="--"
                }
                 if(isjt==false){
                	 htmlArray.push("<tr><td>" + j + "</td><td>" + d["summaryCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;cursor: pointer;' id=" + d["summaryId"] + " ><a href='"+tabhref+".html?summaryId="+d['summaryId']+"' style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + publishStatus + "</td><td>" + oTime+ "</td><td>" +publishUser + "</td></tr>"); 
                 }else{
                	 //htmlArray.push("<tr><td><input name='kaohe' type='radio' class='tdCheck' data-instcode='"+d["summaryId"]+"' data-status='"+d["publishStatus"]+"'  data-org='"+d["orgId"]+"'  value='"+d["summaryId"]+"'></td><td>" + j + "</td><td>" + d["summaryCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;cursor: pointer;' id=" + d["summaryId"] + " ><a href='"+tabhref+".html?summaryId="+d['summaryId']+"' style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + publishStatus + "</td><td>" + oTime+ "</td><td>" +publishUser + "</td></tr>"); 
                	 htmlArray.push("<tr><td>" + j + "</td><td>" + d["summaryCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;cursor: pointer;' id=" + d["summaryId"] + " ><a href='"+tabhref+".html?summaryId="+d['summaryId']+"' style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + publishStatus + "</td><td>" + oTime+ "</td><td>" +publishUser + "</td><td><button class='form-control col-sm-1 btn btn-default jt tj' type='button' style='margin:0px 5px;height:26px;padding: 0px;width: 75px;float: inherit;' data-toggle='modal' data-target='#myModal' data-instcode='"+d["summaryId"]+"' data-status='"+d["publishStatus"]+"'  data-org='"+d["orgId"]+"'  data-sum='"+d["summaryId"]+"'>发布</button><button class='form-control col-sm-1 btn btn-default jt qx' type='button' style='margin:0px 5px;height:26px;padding: 0px;width: 75px;float: inherit;' data-toggle='modal' data-target='#myModal' data-instcode='"+d["summaryId"]+"' data-status='"+d["publishStatus"]+"'  data-org='"+d["orgId"]+"'  data-sum='"+d["summaryId"]+"'>取消发布</button></td></tr>"); 
                 }
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
                    $("#detail").html(load(data["result"]["pagedata"]));
                    var new_date = new Date().getMonth()+1;
                    if(new_date==1 || new_date==2|| new_date==3){
                         $("#detail tr").find("a").contents().unwrap();
                         $("#detail tr").find(".tj").addClass("disabled").removeClass("tj");
                         $("#detail tr").find(".qx").addClass("disabled").removeClass("qx");
                    }
                    if(new_date==4 || new_date==5|| new_date==6){
                         $("#detail tr").eq(0).nextAll().find("a").contents().unwrap(); 
                         $("#detail tr").eq(0).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                         $("#detail tr").eq(0).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                    }
                    if(new_date==7 || new_date==8|| new_date==9){
                         $("#detail tr").eq(1).nextAll().find("a").contents().unwrap();
                         $("#detail tr").eq(1).nextAll().find(".tj").addClass("disabled").removeClass("tj");
                         $("#detail tr").eq(1).nextAll().find(".qx").addClass("disabled").removeClass("qx");
                    }
                    if(new_date==10 || new_date==11|| new_date==12){
                         $("#detail tr").eq(3).find("a").contents().unwrap(); 
                         $("#detail tr").eq(3).find(".tj").addClass("disabled").removeClass("tj");
                         $("#detail tr").eq(3).find(".qx").addClass("disabled").removeClass("qx"); 
                    }
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
    }
})

 






