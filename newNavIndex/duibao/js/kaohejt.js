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
  var leth;
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
        var oTime;
        function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),   
            oTime = oYear +'年'+ getzf(oMonth) +'月'+ getzf(oDay)+'日';//最后拼接时间  
            $(".fr span").html(oTime);
        };  
        function getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        }  
       getMyDate(dataJson.result.data[0].createTime);
       $(".note").val(dataJson.result.note);
       $("#auditInstruction").val(dataJson.result.auditInstruction);
       $(".fl span").html(dataJson.result.year);
       $(".fl b").html(dataJson.result.quarter);

       if($("#auditInstruction").val()=="  "){
            $(".note1").css("display","block");
       }else{
            $(".note1").css("display","none");  
       }
       leth = dataJson.result.data.length;
       if(leth>0){
            $(".no-records-found").remove();
            for(var i=0;i<leth/2;i++){
                $(".t1-boby").append("<tr class='t-tr'><td rowspan='2' class='td'>"+dataJson.result.data[2*i].orgName+"</td><td class='td th'title='双击填写'>完成情况</td><td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td> <td></td> <td></td><td></td> <td></td><td></td><td></td><td></td><td></td><td ></td><td ></td><td></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr><tr class='t-tr'><td class='td'title='双击填写'>考核金额</td> <td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td> <td ></td><td></td><td></td><td ></td> <td></td> <td ></td> <td></td><td ></td> <td></td><td ></td><td></td><td></td><td></td> <td></td><td></td><td></td><td ></td> <td></td><td></td><td></td><td></td></tr>");
                 $(".t2-boby .notes").before("<tr class='t-tr'><td rowspan='2' class='td'>"+dataJson.result.data[2*i].orgName+"</td><td class='td th' title='双击填写'>完成情况</td><td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td> <td></td> <td></td><td></td> <td></td><td></td><td></td><td></td><td></td><td ></td><td ></td><td></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td></tr><tr class='t-tr'><td class='td'title='双击填写'>考核金额</td> <td ></td><td ></td><td ></td><td ></td><td></td><td ></td><td></td><td></td><td ></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td ></td> <td ></td><td></td><td></td><td ></td> <td></td> <td ></td> <td></td><td ></td> <td></td><td ></td><td></td><td></td><td></td> <td></td><td></td><td></td><td ></td> <td></td><td></td><td></td><td></td></tr>");
            }  
            tabclick(); 
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
        //返还数据更新
        $(".bt").click(function(){
            var url = ctx + "/jsjd/benchmark/addBenchmarkGroupBaseExtend.do";
            var auditInstruction =$("#auditInstruction").val();
            var note = $(".note").val();
            var dataJson2 = {
                "summaryId":summaryId,
                "note" :note,
                "auditInstruction":auditInstruction,
                "data":[]
            }
        //定义一个数组是要传的k值
        var x =["jsjdJSJDGZBDMPP","jsjdJSJDYBHFXBGWAS","jsjdJSJDYZWTWJSCZ","jsjdSJAPDQTJSJDGZWAS","jsjdZXJCZGGZWASWC","jtpmDWFDYXXSL","jtpmDWFDYXXSL","jtpmDWRLJXFY","jtpmJGXMWCL","jtpmJZFHL","jtpmJZZKYMX","jtpmKKX","jtpmNDDWDLCLFY","jtpmNDDWDLQTFY","jtpmQNLYXSS","jtpmSCPB","jtpmZHCYDL","jtpmZHGDMH","jxAXHLXYX","jxAXHRH","jxBCXHLXYX","jxCJXGQ","jxCJXJHND","jxDWRLJXFY","jxJZAXFYCZ","jxJZSJRH","jxXHYGYNGZTJ","kkxDXKYXS","kkxGLMHJQT","kkxGZTJ","kkxJPJZPB","kkxLJFT","kkxLYXSSSFDDDPJSP","kkxSFDWDFHHZZBD","lastUpdateBy","notSupportInvestigate","ranking","scBBCWCSKH","scDJZJSHJQK","scDWKF","scJDLYXSS","scJDPXWCQK","scJGFYCZ","scJGXMWCL","scJZZRYX","scLGXZJLKH","scLYXSSDDDWPM","scNDDWDLCLFY","scNDDWDLQTFY","scQNLYXSS","scZXDXFYCZ","totalAmount","zbCYDL","zbCYDLDBXYPM","zbDWFDYXXSL","zbGDMH","zbGDMHDBXYPM","zbGDMHJZSJZ","zbJNJGCXND","zbJNJPPJDF","zbJNRWWCQK","zbJZFHL","zbJZZKYMX","zbZHCYDL","zbZHCYDLJHFJZ","zbZHGDMH","zbZHGDMHJHFJZ","zbZHGDMHJD","cardinalNumber","factoryCoefficientNumber","singleMachineCoefficientNumber"];
        //固定的数值
        var obj =[];
       
        for(var i=0;i<leth;i++){
             var applyId = dataJson.result.data[i].applyId;
             if(i%2==0){
                obj[i]={"appType":"V","applyId":applyId, "createUserId":"createUserId", "createUserName":"createUserName","dataType":"GROUP","specialWork":{"KKX":"A","SCPB":"B"}};
             }
             if(i%2==1){
                obj[i]={"appType":"A","applyId":applyId, "createUserId":"createUserId", "createUserName":"createUserName","dataType":"GROUP","specialWork":{"KKX":"A","SCPB":"B"}};
             }
           
        }
       for(var i=0;i<x.length;i++){
            var index1 = $(".t2-1").find("."+x[i]).index();
            var index2 = $(".trd").find("."+x[i]).index();
            if(index1!=-1){
                for(var k=0;k<leth/2;k++){
                    obj[2*k][x[i]]=$(".t2-boby tr").eq(2*k).children("td").eq(index1+2).html();
                    obj[2*k+1][x[i]]=$(".t2-boby tr").eq(2*k+1).children("td").eq(index1+1).html();
                }
            }
            if(index2!=-1){
                 for(var k=0;k<leth/2;k++){
                    obj[2*k][x[i]]=$(".t1-boby tr").eq(2*k).children("td").eq(index2+2).html();
                    obj[2*k+1][x[i]]=$(".t1-boby tr").eq(2*k+1).children("td").eq(index2+1).html();
                 }
            }    
        }
        dataJson2.data=obj;
        console.log(dataJson2);
        //ajax获取数据data
            $.ajax({
            url: url,	
            type:"post",	
            data:JSON.stringify(dataJson2),
            dataType:"json",
            contentType:"application/json",
            success: function(data){	
                    console.log(data);
                    window.alert("保存成功！");
                    //history.back();
                }
            });  
        })
    }
  } 

    function tabclick(){
          for(var i=0;i<leth/2;i++){
            var obj={};
            $(".t1-boby tr").eq(2*i).children("td").not( $('.t1-boby .t-tr .td')).bind("click",function() {
                $(".t1-boby .pop-up").remove(); 
                $(".t2-boby .pop-up").remove();
                var html = $(this).html();
                $(this).append("<div class='pop-up'><input type='text'class='text'></div>");
                $(this).children(".pop-up").children(".text").focus(); 
                $(this).children(".pop-up").children(".text").val(html);
                var index = $(this).index();
                var index2 = $(this).parent().index();
                obj.index=index;
                obj.index2=index2;
                $('.text').on("keydown",key);
                $('.text').on("blur",function(){
                      $(this).parent().parent().html($(this).val()); 
                });
            });   

            function key(event){
                  if(event.keyCode==13){
                        $(this).parent().parent().html($(this).val()); 
                        var nexttab = $(".t1-boby tr").eq(obj.index2).children("td").eq(obj.index+1);
                        tab();
                        function tab(){
                             $(".t1-boby .pop-up").remove(); 
                             var html = nexttab.html();
                             nexttab.append("<div class='pop-up'><input type='text'class='text'></div>");
                             nexttab.children(".pop-up").children(".text").focus(); 
                             nexttab.children(".pop-up").children(".text").val(html);
                             var index = nexttab.index();
                             var index2 = nexttab.parent().index();
                             obj.index=index;
                             obj.index2=index2;
                             $('.text').on("keydown",key);
                             $('.text').on("blur",function(){
                                $(this).focus();
                             });
                        };
                    }
            }

            $(".t2-boby .t-tr").eq(2*i).children("td").not( $('.t2-boby .t-tr .td')).on("click",function() {
                $(".t1-boby .pop-up").remove(); 
                $(".t2-boby .pop-up").remove(); 
                var html = $(this).html();
                $(this).append("<div class='pop-up'><input type='text'class='text'></div>");
                $(this).children(".pop-up").children(".text").focus(); 
                $(this).children(".pop-up").children(".text").val(html);
                var index = $(this).index();
                var index2 = $(this).parent().index();
                obj.index=index;
                obj.index2=index2;
                $('.text').on("keydown",key2);
                $('.text').blur(function(){
                        $(this).parent().parent().html($(this).val());
                        $(this).focus();
                });
            });

             function key2(event){
                 if(event.keyCode==13){
                        $(this).parent().parent().html($(this).val()); 
                        var nexttab = $(".t2-boby tr").eq(obj.index2).children("td").eq(obj.index+1);
                        tab();
                        function tab(){
                             $(".t2-boby .pop-up").remove(); 
                             var html = nexttab.html();
                             nexttab.append("<div class='pop-up'><input type='text'class='text'></div>");
                             nexttab.children(".pop-up").children(".text").focus(); 
                             nexttab.children(".pop-up").children(".text").val(html);
                             var index = nexttab.index();
                             var index2 = nexttab.parent().index();
                             obj.index=index;
                             obj.index2=index2;
                             $('.text').on("keydown",key2);
                             $('.text').on("blur",function(){
                                $(this).focus();
                             });
                        };
                    }
            }
        }  
         for(var i=0;i<leth/2;i++){
            var obj2={};
            $(".t1-boby tr").eq(2*i+1).children("td").not( $('.t1-boby .t-tr .td')).bind("click",function() {
                $(".t1-boby .pop-up").remove(); 
                $(".t2-boby .pop-up").remove();
                var html = $(this).html();
                $(this).append("<div class='pop-up'><input type='text'class='text'></div>");
                $(this).children(".pop-up").children(".text").focus(); 
                $(this).children(".pop-up").children(".text").val(html);
                var index = $(this).index();
                var index2 = $(this).parent().index();
                obj2.index=index;
                obj2.index2=index2;
                $('.text').on("keydown",key3);
                $('.text').on("blur",function(){
                    if(!isNaN($(this).val())){
                        $(this).parent().parent().html($(this).val());
                    }else{
                        $(this).val("");
                        $(this).focus();
                        alert("请填写数字！") 
                    }
                });
            });   

            function key3(event){
                  if(event.keyCode==13){
                    if(!isNaN($(this).val())){
                        $(this).parent().parent().html($(this).val()); 
                        var nexttab = $(".t1-boby tr").eq(obj2.index2).children("td").eq(obj2.index+1);
                        tab();
                        function tab(){
                            $(".t1-boby .pop-up").remove(); 
                            var html = nexttab.html();
                            nexttab.append("<div class='pop-up'><input type='text'class='text'></div>");
                            nexttab.children(".pop-up").children(".text").focus(); 
                            nexttab.children(".pop-up").children(".text").val(html);
                            var index = nexttab.index();
                            var index2 = nexttab.parent().index();
                            obj2.index=index;
                            obj2.index2=index2;
                            $('.text').on("keydown",key3);
                            $('.text').on("blur",function(){
                                $(this).focus();
                            });
                        };
                     }else{
                            $(this).val("");
                            $(this).focus();
                            alert("请填写数字！") 
                    }

                 }
            }

            $(".t2-boby .t-tr").eq(2*i+1).children("td").not( $('.t2-boby .t-tr .td')).on("click",function() {
                $(".t1-boby .pop-up").remove(); 
                $(".t2-boby .pop-up").remove(); 
                var html = $(this).html();
                $(this).append("<div class='pop-up'><input type='text'class='text'></div>");
                $(this).children(".pop-up").children(".text").focus(); 
                $(this).children(".pop-up").children(".text").val(html);
                var index = $(this).index();
                var index2 = $(this).parent().index();
                obj2.index=index;
                obj2.index2=index2;
                $('.text').on("keydown",key4);
                $('.text').on("blur",function(){
                    if(!isNaN($(this).val())){
                        $(this).parent().parent().html($(this).val());
                    }else{
                        $(this).val("");
                        $(this).focus();
                        alert("请填写数字！") 
                    }    
                });
            });

             function key4(event){
                 if(event.keyCode==13){
                        if(!isNaN($(this).val())){
                            $(this).parent().parent().html($(this).val()); 
                            var nexttab = $(".t2-boby tr").eq(obj2.index2).children("td").eq(obj2.index+1);
                            tab();
                            function tab(){
                                $(".t2-boby .pop-up").remove(); 
                                var html = nexttab.html();
                                nexttab.append("<div class='pop-up'><input type='text'class='text'></div>");
                                nexttab.children(".pop-up").children(".text").focus(); 
                                nexttab.children(".pop-up").children(".text").val(html);
                                var index = nexttab.index();
                                var index2 = nexttab.parent().index();
                                obj2.index=index;
                                obj2.index2=index2;
                                $('.text').on("keydown",key4);
                                $('.text').on("blur",function(){
                                    $(this).focus();
                                });
                            };
                        }else{
                            $(this).val("");
                            $(this).focus();
                            alert("请填写数字！") 
                        }
                    }
            }
        }
      }
})

 






