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
       var date = new Date(dataJson.result.createTime);
       var time = date.toLocaleDateString();
       $(".note").html(dataJson.result.note);
       $("#auditInstruction").html(dataJson.result.auditInstruction);
       $(".fl span").html(dataJson.result.year);
       $(".fl b").html(dataJson.result.quarter);
       $(".fr span").html(time);

      var leth = dataJson.result.data.length;
      if(leth>0){
            $(".no-records-found").remove();
            for(var i=0;i<leth/2;i++){
                $(".t1-boby").append("<tr class='t-tr'><td rowspan='2' class='td'>"+dataJson.result.data[2*i].orgName+"</td><td class='td th'title='双击填写'>完成情况</td><td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td> <td></td> <td></td><td></td> <td></td><td></td><td></td><td></td><td></td><td ></td><td ></td><td></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr><tr class='t-tr'><td class='td'title='双击填写'>申请金额</td> <td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td> <td ></td><td></td><td></td><td ></td> <td></td> <td ></td> <td></td><td ></td> <td></td><td ></td><td></td><td></td><td></td> <td></td><td></td><td></td><td ></td> <td></td><td></td><td></td><td></td></tr>");
                 $(".t2-boby .notes").before("<tr class='t-tr'><td rowspan='2' class='td'>"+dataJson.result.data[2*i].orgName+"</td><td class='td th' title='双击填写'>完成情况</td><td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td> <td></td> <td></td><td></td> <td></td><td></td><td></td><td></td><td></td><td ></td><td ></td><td></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr><tr class='t-tr'><td class='td'title='双击填写'>申请金额</td> <td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td> <td ></td><td></td><td></td><td ></td> <td></td> <td ></td> <td></td><td ></td> <td></td><td ></td><td></td><td></td><td></td> <td></td><td></td><td></td><td ></td> <td></td><td></td><td></td><td></td></tr>");
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
        for(var i=0;i<leth/2;i++){
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp7+2).addClass("bg-green");           
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp6+2).addClass("bg-green");     
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp5+2).addClass("bg-green");     
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp4+2).addClass("bg-green"); 
            $(".t2-boby .t-tr").eq(2*i).children("td").eq(indexp3+2).addClass("bg-green"); 
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp2+2).addClass("bg-green"); 
            $(".t1-boby .t-tr").eq(2*i).children("td").eq(indexp1+2).addClass("bg-green");
        }
    }
  } 
})

 






