$(document).ready(function(){	
   if (!window.location.origin) {
         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
   }
   var ctx = window.location.origin;
   var href = window.location.href;
	function GetRequest(href) {
			var href = href.split('?')[1]; //获取url中"?"符后的字串
			var theRequest ={};
			strs = href.split("&");
			 for(var i = 0; i < strs.length; i ++){
			   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
			}
		return theRequest;
	}
  var applyId =GetRequest(href).applyId;
  var url;
  if(applyId==""||applyId==undefined){
      var instanceCode =GetRequest(href).instanceCode;
      url =  ctx + "/jsjd/benchmark/getExtendByInstCode.do?instanceCode="+instanceCode;
  }else{
      url =  ctx + "/jsjd/benchmark/getExtendByApplyId.do?applyId="+applyId;
  }
  getdatas(url);
  function getdatas(url){
     $.ajax({
        url: url,	
        type:"get",	
        success: function(data){	
                chuli(data);
        }
     });  
    //处理数据 
    function chuli(dataJson){
        //两个状态类型的数组
        var appTypeVps =[];
        var appTypeAps =[];
        var appTypeVG =[];
        var appTypeAG =[];
        var datar =dataJson.result.data;
        for(var j=0;j<datar.length;j++){
                if(datar[j]["appType"]=="A" && datar[j]["dataType"]=="PS"){
                   appTypeAps.push(datar[j]); 
                   for(var i=0;i<35;i++){
                        $(".t1-boby tr").eq(2).children("td").eq(i+1).html(appTypeAps[0][$(".trd tr").eq(1).children("th").eq(i).attr("class")]);
                        $(".t2-boby tr").eq(2).children("td").eq(i+1).html(appTypeAps[0][$(".t2-1 tr").eq(1).children("th").eq(i).attr("class")]);
                   }
                };
                if(datar[j]["appType"]=="A" && datar[j]["dataType"]=="GROUP"){
                   appTypeAG.push(datar[j]);  
                   for(var i=0;i<35;i++){
                        $(".t1-boby tr").eq(3).children("td").eq(i+1).html(appTypeAG[0][$(".trd tr").eq(1).children("th").eq(i).attr("class")]);
                        $(".t2-boby tr").eq(3).children("td").eq(i+1).html(appTypeAG[0][$(".t2-1 tr").eq(1).children("th").eq(i).attr("class")]);
                   }
                };
                if(datar[j].appType=="V" && datar[j]["dataType"]=="PS"){
                   appTypeVps.push(datar[j]);  
                   for(var i=0;i<35;i++){
                        $(".t1-boby tr").eq(0).children("td").eq(i+1).html(appTypeVps[0][$(".trd tr").eq(1).children("th").eq(i).attr("class")]);
                        $(".t2-boby tr").eq(0).children("td").eq(i+1).html(appTypeVps[0][$(".t2-1 tr").eq(1).children("th").eq(i).attr("class")]);
                   }
                };
                if(datar[j].appType=="V" && datar[j]["dataType"]=="GROUP"){
                   appTypeVG.push(datar[j]);  
                   for(var i=0;i<35;i++){
                        $(".t1-boby tr").eq(1).children("td").eq(i+1).html(appTypeVG[0][$(".trd tr").eq(1).children("th").eq(i).attr("class")]);
                        $(".t2-boby tr").eq(1).children("td").eq(i+1).html(appTypeVG[0][$(".t2-1 tr").eq(1).children("th").eq(i).attr("class")]);
                   }
                };
            }
            var date = new Date(datar[0].createTime);
            var time = date.toLocaleDateString();
            $(".fr span").html(time);
            $(".fl span").html(datar[0].orgName);
            $(".textarea").val(dataJson.result.applyInstruction);
        }
  }
    //返还数据更新
    $(".bt").click(function(){
    	// 获取http地址信息
        if (!window.location.origin) {
             window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
        var ctx = window.location.origin;
        var url = ctx + "/jsjd/benchmark/addBenchmarkStationBaseExtend.do";
	    var dataJson2 = {
	        "applyId":applyId,
	        "applyInstruction":$(".textarea").val(),
	        "ratifyUser":$(".wrap .fl").eq(1).children("input").val(),
	        "checkUser":$(".wrap .fl").eq(2).children("input").val(),
	        "examUser":$(".wrap .fl").eq(3).children("input").val(),
	        "createUser":$(".wrap .fl").eq(4).children("input").val(),
	        "data":[]
	};

    //定义一个数组是要传的k值
    var x =["jsjdJSJDGZBDMPP","jsjdJSJDYBHFXBGWAS","jsjdJSJDYZWTWJSCZ","jsjdSJAPDQTJSJDGZWAS","jsjdZXJCZGGZWASWC","jtpmDWFDYXXSL","jtpmDWRLJXFY","jtpmJGXMWCL","jtpmJZFHL","jtpmJZZKYMX","jtpmKKX","jtpmNDDWDLCLFY","jtpmNDDWDLQTFY","jtpmQNLYXSS","jtpmSCPB","jtpmZHCYDL","jtpmZHGDMH","jxAXHLXYX","jxAXHRH","jxBCXHLXYX","jxCJXGQ","jxCJXJHND","jxDWRLJXFY","jxJZAXFYCZ","jxJZSJRH","jxXHYGYNGZTJ","kkxDXKYXS","kkxGLMHJQT","kkxGZTJ","kkxJPJZPB","kkxLJFT","kkxLYXSSSFDDDPJSP","kkxSFDWDFHHZZBD","lastUpdateBy","notSupportInvestigate","ranking","scBBCWCSKH","scDJZJSHJQK","scDWKF","scJDLYXSS","scJDPXWCQK","scJGFYCZ","scJGXMWCL","scJZZRYX","scLGXZJLKH","scLYXSSDDDWPM","scNDDWDLCLFY","scNDDWDLQTFY","scQNLYXSS","scZXDXFYCZ","totalAmount","zbCYDL","zbCYDLDBXYPM","zbDWFDYXXSL","zbGDMH","zbGDMHDBXYPM","zbGDMHJZSJZ","zbJNJGCXND","zbJNJPPJDF","zbJNRWWCQK","zbJZFHL","zbJZZKYMX","zbZHCYDL","zbZHCYDLJHFJZ","zbZHGDMH","zbZHGDMHJHFJZ","specialWork"];
    //固定的数值
    var obj =[];
    obj[0]={"applyId":applyId, "createUserId":"createUserId", "createUserName":"createUserName","dataType":"PS"};
    obj[1]={"applyId":applyId, "createUserId":"createUserId", "createUserName":"createUserName","dataType":"PS"};
    obj[0]["appType"] ="V"; obj[1]["appType"] ="A"; 
    //向数组obj[]里面导入数据
    for(var i=0;i<x.length;i++){
        var index1 = $(".t2-1").find("."+x[i]).index();
        var index2 = $(".trd").find("."+x[i]).index();
        if(index1!=-1){
            for(var k=0;k<2;k++){
                obj[k][x[i]]=$(".t2-boby tr").eq(2*k).children("td").eq(index1+1).html();
            }
        }
        if(index2!=-1){
            for(var k=0;k<2;k++){
                obj[k][x[i]]=$(".t1-boby tr").eq(2*k).children("td").eq(index2+1).html();
            }
        }    
    }

    obj[0]["specialWork"]={"KKX":"A","SCPB":"B"};  obj[1]["specialWork"]={"KKX":"A","SCPB":"B"}; 
    //向dataJson2里放入导出来的数据
    dataJson2.data=obj;
    console.log(dataJson2);
        //ajax获取数据data
        $.ajax({
           url: url,	
           type:"POST",	
           data:JSON.stringify(dataJson2),
           dataType:"json",
           contentType:"application/json",
           success: function(data){	
                window.alert("保存成功！");
               // history.back();
           }
       });  
    })
})

 






