!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.WebStorageCache=b()}(this,function(){"use strict";function a(a,b){for(var c in b)a[c]=b[c];return a}function b(a){var b=!1;if(a&&a.setItem){b=!0;var c="__"+Math.round(1e7*Math.random());try{a.setItem(c,c),a.removeItem(c)}catch(d){b=!1}}return b}function c(a){var b=typeof a;return"string"===b&&window[a]instanceof Storage?window[a]:a}function d(a){return"[object Date]"===Object.prototype.toString.call(a)&&!isNaN(a.getTime())}function e(a,b){if(b=b||new Date,"number"==typeof a?a=a===1/0?l:new Date(b.getTime()+1e3*a):"string"==typeof a&&(a=new Date(a)),a&&!d(a))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return a}function f(a){var b=!1;if(a)if(a.code)switch(a.code){case 22:b=!0;break;case 1014:"NS_ERROR_DOM_QUOTA_REACHED"===a.name&&(b=!0)}else-2147024882===a.number&&(b=!0);return b}function g(a,b){this.c=(new Date).getTime(),b=b||l;var c=e(b);this.e=c.getTime(),this.v=a}function h(a){return"object"!=typeof a?!1:a&&"c"in a&&"e"in a&&"v"in a?!0:!1}function i(a){var b=(new Date).getTime();return b<a.e}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(d){var e={storage:"localStorage",exp:1/0},f=a(e,d),g=c(f.storage),h=b(g);this.isSupported=function(){return h},h?(this.storage=g,this.quotaExceedHandler=function(a,b,c){if(console.warn("Quota exceeded!"),c&&c.force===!0){var d=this.deleteAllExpires();console.warn("delete all expires CacheItem : ["+d+"] and try execute `set` method again!");try{c.force=!1,this.set(a,b,c)}catch(e){console.warn(e)}}}):a(this,n)}var l=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),m={serialize:function(a){return JSON.stringify(a)},deserialize:function(a){return a&&JSON.parse(a)}},n={set:function(){},get:function(){},"delete":function(){},deleteAllExpires:function(){},clear:function(){},add:function(){},replace:function(){},touch:function(){}},o={set:function(b,c,d){if(b=j(b),d=a({force:!0},d),void 0===c)return this["delete"](b);var e=m.serialize(c),h=new g(e,d.exp);try{this.storage.setItem(b,m.serialize(h))}catch(i){f(i)?this.quotaExceedHandler(b,e,d,i):console.error(i)}return c},get:function(a){a=j(a);var b=null;try{b=m.deserialize(this.storage.getItem(a))}catch(c){return null}if(h(b)){if(i(b)){var d=b.v;return m.deserialize(d)}this["delete"](a)}return null},"delete":function(a){return a=j(a),this.storage.removeItem(a),a},deleteAllExpires:function(){for(var a=this.storage.length,b=[],c=this,d=0;a>d;d++){var e=this.storage.key(d),f=null;try{f=m.deserialize(this.storage.getItem(e))}catch(g){}if(null!==f&&void 0!==f.e){var h=(new Date).getTime();h>=f.e&&b.push(e)}}return b.forEach(function(a){c["delete"](a)}),b},clear:function(){this.storage.clear()},add:function(b,c,d){b=j(b),d=a({force:!0},d);try{var e=m.deserialize(this.storage.getItem(b));if(!h(e)||!i(e))return this.set(b,c,d),!0}catch(f){return this.set(b,c,d),!0}return!1},replace:function(a,b,c){a=j(a);var d=null;try{d=m.deserialize(this.storage.getItem(a))}catch(e){return!1}if(h(d)){if(i(d))return this.set(a,b,c),!0;this["delete"](a)}return!1},touch:function(a,b){a=j(a);var c=null;try{c=m.deserialize(this.storage.getItem(a))}catch(d){return!1}if(h(c)){if(i(c))return this.set(a,this.get(a),{exp:b}),!0;this["delete"](a)}return!1}};return k.prototype=o,k});
function rootpath() {
	var url = $('<input id="url" type="hidden" value="">');
	$("body").prepend(url);
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPath = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	var rootPath = localhostPath + projectName;
	document.getElementById("url").value = rootPath;
}
$(document).scroll(function(){
    
   if($(document).scrollTop()>"200"){
		
        _width = $(".thead_shadow").outerWidth() + 2;
		if($(".thead_shadow").outerWidth()==0){
			_width=$(".blance").outerWidth() + 2;
		}
        thArray = $(".thead_shadow tr td");
        thead_fixed = $(".thead_fixed tr td");
        for(var i = 0 ;i<thead_fixed.length;i++){
            thead_fixed.eq(i).css({width:thArray.eq(i).outerWidth()})
        }
        
        $('.thead_fixed').css({position:"fixed",top:0,width:_width}).show();
        $(".thead_shadow").css({visibility:"hidden"});
    }else{
         $('.thead_fixed').css({position:"relative"}).hide();
         $(".thead_shadow").css({visibility:"visible"})
    }
    
})

rootpath();
var rootPath = $('#url').val();

var user={};
$.ajax({
	url:rootPath+"/portal/getUserOrgId.do",
	type:"POST",
	success:function(data){
		
		if(data && data!="null" ){
			user.org_id=data;
			if(user.org_id != "a61365e2-969d-4352-b3f8-805027ab9f1d"){
				
				jzqt_zonglan(user.org_id);
				
			}
			viewById(user.org_id);			
		}
		
	}
})
function viewById(orgID){
	if(orgID == "jt" || orgID == "a61365e2-969d-4352-b3f8-805027ab9f1d"){
 	  jt_flag= true;
 	  jt_query(1,jt_flag); 
 	  $("#dc_view").hide();
 	  $("#jt_view").show();
   }else{
 	  jzqt_zonglan(orgID)
 	  $("#dc_view").show();
 	  $("#jt_view").hide();
   }
}

var initPage = function(page) {
   	var num_entries = page;
  	// 创建分页
  	$("#Pagination").pagination(num_entries, {
	    num_edge_entries: 1, //边缘页数
	    num_display_entries: 4, //主体页数
	    callback: callback,
	    items_per_page: 1, //每页显示1项
	    prev_text: "前一页",
	    next_text: "后一页"
  	});
};
function callback(page_index, jq){
	//从第一次执行函数中获取参数 重新传入
	jt_query(page_index + 1);
  	return false;
}
var jt_flag= true;
$("#submit").click(function(){
	 jt_flag= true;
	  jt_query(1,jt_flag);
})
function jt_query(pagenum){
   var url = rootPath +"/portal.do?method=getJtJzqtinfo"
   $.ajax({
	   url:url,
	   type: "POST",
	   data:{
		   orgid:$("#org_id").val(),
   		    g_id: $("#g_id").val(),
   			type:$("#type").val(),
   			qt_desc:$("#qt_desc").val(),
   			starttime:$("#startTime").val(),
   			endtime:$("#endTime").val(),
   			pagenum:pagenum,
   			pagesize:20
	   },
	   dataType:"json",
	   success:function(data){
		   //console.log(data);
		   if(data.exper.length==0){
			   $("#jt_huizong").html("");
			   $("#Pagination").hide();
       			return;
       		}
	       	var page = Math.ceil(data.total/20);
	       	if(jt_flag){
	       		$("#Pagination").show();
				initPage(page);//分页加载
				jt_flag=false;
			}
	   
		  $("#jt_huizong").html(preparedata(data.exper,["NAME","FIRETIME","RUSHTIME","PARATIME","ENDTIME","QT_DESC"],"jt_huizong"));
		  $("#jt_huizong tr").find('td:nth-child(6n+1)').css({textAlign:"left",paddingLeft:"10px"})
	   }   
   })
}


$("#type").change(function(){
	$this = $(this);
	var type = $this.val();
	if(type =="TJ"){
		$("#qt_desc").html('<option></option><option value="A级检修">A级检修</option><option value="B级检修">B级检修</option><option value="C级检修">C级检修</option><option value="D级检修">D级检修</option><option value="电网调停">电网调停</option><option value="故障停机">故障停机</option>')
	}else{
		$("#qt_desc").html('<option></option><option value="A级检修后启动">A级检修后启动</option><option value="B级检修后启动">B级检修后启动</option><option value="C级检修后启动">C级检修后启动</option><option value="D级检修后启动">D级检修后启动</option><option value="电网调停后启动">电网调停后启动</option><option value="故障停机后启动">故障停机后启动</option>')
	}
})

$("#org_id").change(function(){
	var org_id = $(this).val();
	var $zj = $(".form-group").eq(1);
	
	if(org_id != "a61365e2-969d-4352-b3f8-805027ab9f1d"){
		addjz(org_id);
		$zj.show();
	}else{
		$zj.hide();
	}
	
})
$("#org_id").change()
function addjz(orgId){
	$("#g_id").html("<option value=''></option>");
	//console.log(orgId)
	if(!orgId){
		
		orgId="c21834b4-1cb0-490f-a2a8-deeaf7f7e065"
	}
	var url = rootPath +"/portal/getLhJzInfo.do?orgId="+orgId;
	$.ajax({
		url:url,
		type:"POST",
		success:function(data){
			var arr = [];
			for(var i in data){
				arr.push(data[i]);
			}
			arr.sort()//机组排序
			//console.log(arr);
			//机组信息插入到页面当中
			for(var i = 0;i<arr.length;i++){ 
				var j = i+1;
				
				if(Number(arr[i])){
					arr[i] = "#"+arr[i];

				}else{
					j=arr[i];
					continue;
				}
				
				$("#g_id").append("<option value='"+j+"'>"+arr[i]+"</option>");
			}
		}
	})
}


	
function jzqt_zonglan(orgID){
    var url = rootPath + "/portal.do";
    $.ajax({
        url: url,
        type: "POST",
        data: {
            method: "getJzqtNumByOrgid",
            orgid: orgID
        },
        dataType:"json",
        success: function(data){
           
            var getTD = preparedata(data.pagedata,["G_ID","QDNUM","TJNUM","QDTIME","TJTIME","DAYS"],'zonglan');
            $("#lh_name").html(data.pagedata[0].ORGNAME)


           $("#table1_huizong").html(getTD);
           //机组起停划过的样式；
           $('.tdhover').hover(function(){
           		$(this).find('a').css({color:"#fff"})
           },function(){
           		$(this).find('a').css({color:"#000"})
           })
           //版本1 传  1转换电厂默认加载 #1启机;//版本2  传空字符串的时候，默认显示电厂所有启动条目
           
           detail(orgID,'','',1,true);
        }
    })
}
function preparedata(data,columns,table){
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        htmlArray.push("<tr>");
        for (var j = 0;j < columns.length; j++) {
            var columnValue = getColumnValue(table, columns[j], d[columns[j]],d);
            if(table == "zonglan"&&j == 1){
            	htmlArray.push("<td "+columnValue+"  id='first' style='cursor:pointer'><a href='#' style='color:blue' title='"+d.QDNUM+"'>"+d.QDNUM+"</a></td>")
            }else if (table =="zonglan" && j == 2){
            	htmlArray.push("<td style='cursor:pointer'  "+columnValue+"><a href='#' style='color:blue'>"+d.TJNUM+"</a></td>")
            }else{
            	htmlArray.push("<td class='overflow' title='" + columnValue + "'>" + columnValue + "</td>");
            }
        }
    }
    htmlArray.push("</tr>");
    return htmlArray.join('');

    
}
function getColumnValue(table,column,columnValue,d){
	if(column == "G_ID"){
		return "#" + columnValue;
	} 
	if(column == "QDNUM"){
		return "onclick=detail('"+d.ORGID+"','"+d.G_ID+"','QD',1,'true')";
	}   
	if(column == "TJNUM"){
		return "onclick=detail('"+d.ORGID+"','"+d.G_ID+"','TJ','1','true')";
	}
	if(!columnValue){
		columnValue="";
	}
	return columnValue;
}
//detail("c21834b4-1cb0-490f-a2a8-deeaf7f7e065",'1','QD');
var initPagination = function(page) {
   	var num_entries = page;
  	// 创建分页
  	$("#Pagination").pagination(num_entries, {
	    num_edge_entries: 1, //边缘页数
	    num_display_entries: 4, //主体页数
	    callback: pageselectCallback,
	    items_per_page: 1, //每页显示1项
	    prev_text: "前一页",
	    next_text: "后一页"
  	});
};
function pageselectCallback(page_index, jq){
	//从第一次执行函数中获取参数 重新传入
	var org_id = sessionStorage.getItem("org_id");
	var g_id   = sessionStorage.getItem("g_id")
	var type   = sessionStorage.getItem("type")
	detail(org_id,g_id,type,page_index + 1);
	
  	return false;
}



var query_flag=true;

//todo 

/*
 * @param orgid 电厂id
 * @param g_id  机组
 * @param type  TJ/QJ
 * @param nub   page——number default ->1
 * @param flag  分页 init 开关;  需要传 true
 */

function detail(orgid,g_id,type,nub,flag){
	sessionStorage.setItem("org_id",orgid)
	sessionStorage.setItem("g_id",g_id);
	sessionStorage.setItem("type",type);
	if(!nub){
		nub="1";
	}
	var url = rootPath + "/portal.do";
    $.ajax({
        url: url,
        type: "POST",
        data:{
            method:"getJzqtExp",
            orgid:orgid,
            g_id:g_id,
            type:type,
            pagenum:nub,
			pagesize:20 
        },
        dataType:"json",
        success: function(data){
        	if(data.expr.length==0){
        		$("#Pagination").hide()
        		$("#detail").html('<td colspan="9" >暂时没有数据</td>');
        		return;
        	}
        	var page = Math.ceil(data.total/20)
        	if(query_flag||flag){
        		$("#Pagination").show()
				initPagination(page);//分页加载
			}
        	
        	if(page==0){
        		$("#Pagination").hide()
        	}      	
        	query_flag=false;
        	//本人所属电厂orgId   data.orgId
        	var tempOrgId="";
        	
        	
        	tempOrgId =data.expr[0].ORG_ID;
        	  var getTD = preparedataDetail(data,type,data.orgId);  
        	 $("#detail").html(getTD);
            if(type && type=='TJ' && data.orgId==tempOrgId){
            	//console.log(1);
                $('.button').modal({
    	            target: '#modal',
    	            speed: 500,
    	            easing: 'easeInOutBounce',
    	            animation: 'right',
    	            position: '200px auto',
    	            overlayClose: true,
    	            on: 'click'
            	});
            } 

           $(".zhexian").on("click",function(event) {        	   	
           		sessionStorage.setItem('code', this.id);          			
           		window.open("stock0.html",'',"height=672, width=900, top=100, left=200,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no");  
           	})  
           
        }
    })

}



function preparedataDetail(data,type,orgId){
	var htmlArray = [];
	//console.log(type)
	if(type=="TJ"){
		$("#d_head td").eq(1).html("灭火时间")
		$("#d_head td").eq(2).html("打闸时间")
		$("#d_head td").eq(3).html("解列时间")
		$("#d_head td").eq(4).html("盘车投入时间")
	}
	if(type == "QD"){
		$("#d_head td").eq(1).html("点火时间")
		$("#d_head td").eq(2).html("冲车时间")
		$("#d_head td").eq(3).html("并网时间")
		$("#d_head td").eq(4).html("至50%负荷时间")
	}
	if(type == ""){
		$("#d_head td").eq(1).html("点火/灭火时间")
		$("#d_head td").eq(2).html("冲车/打闸时间")
		$("#d_head td").eq(3).html("并网/解列时间")
		$("#d_head td").eq(4).html("至50%负荷/盘车投入时间")
	}
	
	
	for(var i = 0; i < data.expr.length; i++){
		var d = data.expr[i];
		htmlArray.push("<tr>");
		//判断从数据里读取
		
		if(d.NAME.indexOf("启动")>-1){
			type = "QD"
		}
		if(d.NAME.indexOf("停机")>-1){
			type = "TJ" 
		}


		if(type=='TJ'){
			var msg='';
			if(d.ADUIT_STATUS=='A'  && orgId==d.ORG_ID){
				msg='填写';
			}
			if(d.ADUIT_STATUS=='C' && orgId==d.ORG_ID){
				msg='已提交';
			}
			if(d.ADUIT_STATUS=='D' && orgId==d.ORG_ID){
				msg='已驳回';
			}
			
			if(d.QT_DESC && d.QT_DESC.length>0 && d.ADUIT_STATUS=='E'){
				msg=d.QT_DESC;
			}
			//console.log(d);
			
			htmlArray.push("<td style='text-align:left'>"+d.NAME+"</td><td>"+d.FIRETIME+"</td><td>"+d.RUSHTIME+"</td><td>"+d.PARATIME+"</td><td>"+d.ENDTIME+"</td><td class='button link' id="+d.ID+" onclick=getvalue('"+d.ID+"','"+d.NAME+"',this)>"+msg+"</td>")
			//htmlArray.push("<td class='zhexian' id='"+JSON.stringify(data.KKS_CODE)+";"+JSON.stringify(data.KKS_NAME)+";"+d.STARTTIME+";"+d.ENDTIME+";"+JSON.stringify(data.POINT_MEAS)+"'><p><img src='img/qx.png' /></p></td>");
			htmlArray.push('<td onclick=daocu("'+d.ID+'","'+type+'") class="link">查看</td>')
			
			
		}else{
			
			 msg='';
			if(d.QT_DESC && d.QT_DESC.length>0){
				msg=d.QT_DESC;
			}
			//console.log(d);
		    htmlArray.push("<td style='text-align:left'>"+d.NAME+"</td><td>"+d.FIRETIME+"</td><td>"+d.RUSHTIME+"</td><td>"+d.PARATIME+"</td><td>"+d.ENDTIME+"</td><td  class='button link'>"+msg+"</td>")
			//htmlArray.push("<td class='zhexian' id='"+JSON.stringify(data.KKS_CODE)+";"+JSON.stringify(data.KKS_NAME)+";"+d.STARTTIME+";"+d.ENDTIME+";"+JSON.stringify(data.POINT_MEAS)+"'><p><img src='img/qx.png' /></p></td>");
			htmlArray.push('<td onclick=daocu("'+d.ID+'","'+type+'") class="link">查看</td>')
		}
		
		htmlArray.push("</tr>")
	}
	return htmlArray.join('');
}


$(document).ready(function() {
		//初始化弹窗的相对定位
		var line_width = ($(window).width() - 700) / 2 + "px";
		//var line_height=($(window).height()-365)/2+"px";
		var line_height = 100;
		$(".lineDiv").css({
			"left": line_width,
			"top": line_height
		});
		//改变窗口浏览器大小重置相对定位
		$(window).resize(function() {
			var line_width = ($(window).width() - 700) / 2 + "px";
			var line_height = ($(window).height() - 365) / 2 + "px";
			$(".lineDiv").css({
				"left": line_width,
				"top": line_height
			});
		});
		//弹窗淡入淡出
		$(".zhexian").on("click",

			function(event) {
				sbjiaohu();
				$(this).children(".lineDiv").fadeIn();
				var index = $(this).index();
				//zhexian($(this).find('.linecontent div').attr('id'))
			}
		)
		//弹出层关闭按钮
		$(".drsMoveHandle span").bind("click",
			function(event) {
				$(this).parent().parent(".lineDiv").fadeOut();
				event.stopPropagation();
			}
		)

		function tiaozhuan() {
			var s = document.getElementById('fadeIn');
		}
		
		
		 $("#tijiao").click(function(){
			 var ids = $("#result").val();
			 var name = $("#flowname").val();
				var qt_desc = $("#tj").val();
				//保存数据
				$("#"+ids).html('已提交');
							
				$("#modal").hide();
				$("#style").val($("#SW_hidden_element").next().attr("style"));
				$("#SW_hidden_element").next().removeAttr("style");
				
                //移除onclick事件
				$("#"+ids).removeAttr("onclick"); 
				$("#"+ids).removeAttr("class"); 
				//$("#"+ids).modal('hide');
				$("#"+ids).unbind("click");
				
				if(!ids || ids.length<1){
					alert('id号不能为空');
					return;
				}if(!qt_desc || qt_desc.length<1){
					alert('选择检修类型');
					return ;
				}
				//var contextPath = 'http://127.0.0.1:8080/jsjd';
				// var workflowUtil = new workflowUtil(contextPath);

				 var json={e_business_id:ids,qt_desc:qt_desc,name:name};
				 startAndSubmitByEntityCode('JIZUTINGJI',json,function(e){  
				   if(e.flag==1)
				   {
				     alert(e.msg);
				   }else{ var inst_code = e.instanceCode;
				        Ext.Ajax.request({
				          url: rootPath + '/main?xwl=2406L4N5MW6V',
				         params: {id:ids,inst_code:inst_code,qt_desc:qt_desc,name:name},
				         // params: {id:ids,INST_CODE_JZQT:inst_code,qt_desc:qt_desc},
				          success: function(response){
				            Ext.Msg.alert('提示','流程提交成功!');
                            //提交后就变成审批中的状态
				           /**$.ajax({
				        		url : "../portal/upateAduitStatus.do",
				        		async: false,
				        		type : "POST", 
				        		data: {id:ids},
				        		success : function(data) {
				        			
				        		}
				        	})**/
				            
				          },
				          failure:function(response){
				        	  alert(response);
				          }
				        });
				       }
				 });
				
		});  
		 
					
	}
);


function sbjiaohu(id,pi_codes,names,startime,endtime) {
	var code = pi_codes.split(",");
	var name = names.split(",");	
	var sbchulidata =[];
	var sbname=[];
	var sblhx = 0;
	sblhx = chulishijian(startime,endtime);
	for(var t=0;t< code.length;t++){
		//console.log(startime);
		//console.log(endtime);
		var url = rootPath + '/XipHistoryAction.do?method=getTecPro&pi_code='+code[t]+'&startTime=' + startime + '&endTime=' + endtime;
		$.ajax({
			url: url,
			async : false,
			success:function(data) {
					var sbchuli = chulihanshu(data,name[t]);
					sbchulidata.push(sbchuli.value);
					sbname.push(name[t]);
				if(t == code.length-1&& sblhx){
				    sblunhuan(sbname,sblhx,sbchulidata,id);  
				}
			} 
		})
	}
}
function chulishijian(startime,endtime){
	var time = [];
	$.ajax({
		url : rootPath +"/XipHistoryAction.do",
		type : "post",
		//async : false, //同步执行
		dateType : "json",
		data : {
			    method: "getSblhX",
			    StartTime: startime,
			    StopTime:endtime     				
			   },
		success : function(data) {
			for(var i =0;i<data.length;i++){
				time.push(data[i]);
			}
		}
	})
	//console.log(time);
		return time;				
}




if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;


function daocu(id,type){
	var url = ctx+"/jsjd/XipExperimentAction.do?method=getjzQt&qt_id="+id;
	var url2  = ""
	
	if(type == "QD"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"jizuqiting_id","value":"'+id+'"}]&resid=I4028e4f337ef9efa0154bc69402a2a3f&user=admin&password=manager&refresh=true'
	}else{
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"jizuqiting_id","value":"'+id+'"}]&resid=I4028e4f341b675de0154c1c0aaf700f0&user=admin&password=manager&refresh=true' 
	}
	//window.open(url2);
	
	$.ajax({
		url:url,
		type:"POST",
		success:function(){
			
			window.open(url2);
		}

	})
}

function getvalue(id,flowname,is){
	//alert($("#SW_hidden_element").next().attr("style"));
	if(($("#"+id).html()=='填写' ||  $("#"+id).html()=='已驳回' )&& $("#style").val().length>0 ){
		$("#SW_hidden_element").next().attr("style",$("#style").val()  );
	}
	
	if($("#"+id).html()!='填写' &&  $("#"+id).html()!='已驳回'){
		$("#modal").hide();
		if(!$("#style").val()){
			$("#style").val($("#SW_hidden_element").next().attr("style"));
		}
		
		$("#SW_hidden_element").next().removeAttr("style");
		
        //移除onclick事件
		$("#"+id).removeAttr("onclick"); 
		$("#"+id).removeAttr("class"); 
		//$("#"+ids).modal('hide');
		$("#"+id).unbind("click");
		return ;
	}
	$("#result").val(id);
	$("#flowname").val(flowname);
	
	
}



