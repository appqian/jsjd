$(document).ready(function(){
    //要显示的数据顺序
   if (!window.location.origin) {
         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
   }
   var ctx = window.location.origin;
   var href = window.location.href;
	function GetRequest(href) {
			var href = href.split('?')[1]; //获取url中"?"符后的字串
			var theRequest ={};
			strs = href.split("&");
			 for(var i = 0; i < strs.length; i ++) {
			   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
			}
		return theRequest;
	}
  var summaryId=GetRequest(href).summaryId;
  var url =  ctx + "/jsjd/benchmark/getBenchmarkExtendBySummaryId.do?summaryId="+summaryId;
  getdatas(url);
  function getdatas(url){   
   //ajax获取数据data
   $.ajax({
       url: url,	
       type:"get",	
       success: function(data){	
           console.log(data);
       	    chuli(data);
       }
   });  
   //处理数据 
   function chuli(dataJson){
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
       var oTime=getMyDate(dataJson.result.data[0].publishTime);
       $(".note").html(dataJson.result.note);
       $("#auditInstruction").html(dataJson.result.auditInstruction);
       if(dataJson.result.auditInstruction=="  "||dataJson.result.auditInstruction==null){
           $(".texth3").css("display","none");
       }
       $(".fl span").html(dataJson.result.year);
       $(".fl b").html(dataJson.result.quarter);
       if(dataJson.result.data[0].publishTime!=null){
           $(".fl em").html("日期"+oTime);
       }
       
      var leth = dataJson.result.data.length;
      if(leth>0){
            $(".no-records-found").remove();
            for(var i=0;i<leth/2;i++){
                $(".t1-boby").append("<tr class='t-tr'><td rowspan='2' class='td'>"+dataJson.result.data[2*i].orgName+"</td><td class='td th'>完成情况</td><td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td> <td></td> <td></td><td></td> <td></td><td></td><td></td><td></td><td></td><td ></td><td ></td><td></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr><tr class='t-tr'><td class='td'>申请金额</td> <td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td> <td ></td><td></td><td></td><td ></td> <td></td> <td ></td> <td></td><td ></td> <td></td><td ></td><td></td><td></td><td></td> <td></td><td></td><td></td><td ></td> <td></td><td></td><td></td><td></td></tr>");
                 $(".t2-boby .notes").before("<tr class='t-tr'><td rowspan='2' class='td'>"+dataJson.result.data[2*i].orgName+"</td><td class='td th' >完成情况</td><td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td> <td></td> <td></td><td></td> <td></td><td></td><td></td><td></td><td></td><td ></td><td ></td><td></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr><tr class='t-tr'><td class='td'>申请金额</td> <td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td> <td ></td><td></td><td></td><td ></td> <td></td> <td ></td> <td></td><td ></td> <td></td><td ></td><td></td><td></td><td></td> <td></td><td></td><td></td><td ></td> <td></td><td></td><td></td><td></td></tr>");
            }  
      }
      //数据显示   
        for(var k=0;k<leth/2;k++){
                for(var i=0;i<39;i++){
                    $(".t1-boby tr").eq(2*k).children("td").eq(i+2).html(dataJson.result.data[2*k][$(".trd tr").eq(1).children("th").eq(i).attr("class")]);
                    $(".t1-boby tr").eq(2*k+1).children("td").eq(i+1).html(dataJson.result.data[2*k+1][$(".trd tr").eq(1).children("th").eq(i).attr("class")]);
                }
                for(var i=0;i<39;i++){
                    $(".t2-boby tr").eq(2*k).children("td").eq(i+2).html(dataJson.result.data[2*k][$(".t2-1 tr").eq(1).children("th").eq(i).attr("class")]);
                    $(".t2-boby tr").eq(2*k+1).children("td").eq(i+1).html(dataJson.result.data[2*k+1][$(".t2-1 tr").eq(1).children("th").eq(i).attr("class")]);
                }
        }
       var indexp1 = $(".trd .scQNLYXSS").index(); 
        var indexp2 = $(".trd .scJDLYXSS").index(); 
        var indexp3 = $(".t2-1 .zbZHCYDL").index(); 
        var indexp4 = $(".t2-1 .zbCYDL").index(); 
        var indexp5 = $(".t2-1 .zbZHGDMH").index(); 
        var indexp6 = $(".t2-1 .zbJZFHL").index(); 
        var indexp7 = $(".t2-1 .zbDWFDYXXSL").index(); 
        var indexp8 = $(".trd .kkxLJFT").index(); 
        var indexp9 = $(".trd .kkxGZTJ").index(); 
        var indexp10 = $(".trd  .jxAXHLXYX").index(); 
        var indexp11 = $(".trd  .jxBCXHLXYX").index(); 
        var indexp12 = $(".trd  .jxXHYGYNGZTJ").index();
        var indexp13 = $(".trd  .jxCJXGQ").index();
        var indexp14 = $(".trd  .jxCJXJHND").index();
        var indexp15 = $(".t2-1  .zbGDMHJZSJZ").index();
        var indexp16 = $(".t2-1  .zbZHGDMHJHFJZ").index();
        var indexp17 = $(".t2-1  .zbZHCYDLJHFJZ").index();
        var indexp18 = $(".t2-1  .zbGDMH").index();
        for(var i=0;i<leth/2;i++){
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp18+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp17+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp16+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp15+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp7+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp6+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp5+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp4+2).addClass("bg-green");
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp3+2).addClass("bg-green");
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp2+2).addClass("bg-green");       
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp1+2).addClass("bg-green"); 
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp8+2).addClass("bg-green");  
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp9+2).addClass("bg-green");  
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp10+2).addClass("bg-green");  
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp11+2).addClass("bg-green"); 
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp12+2).addClass("bg-green");
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp13+2).addClass("bg-green");
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp14+2).addClass("bg-green");   
        }
    }
  } 
})

 






