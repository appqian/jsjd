<%@page import="com.xzsoft.model.TecProjectVo"%>
<%@page import="com.xzsoft.model.MoneyAndTime"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    	SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        TecProjectVo tecProjectVo=(TecProjectVo)request.getAttribute("tecProjectVo");
        MoneyAndTime mat = (MoneyAndTime)request.getAttribute("MAT");
        String begin = simpleDateFormat.format(tecProjectVo.getTp_begintime());
        String end = simpleDateFormat.format(tecProjectVo.getTp_endtime()); 
    %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/evaluate/css/pjfa.css" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="Content-type" content="application/x-www-form-urlencoded">
		<script src="http://echarts.baidu.com/build/dist/echarts-all.js"></script>
		<script src="<%=request.getContextPath() %>/iColorPickerLink/jquery-1.11.3.js"></script>
		<script src="<%=request.getContextPath() %>/tab/sssj_util.js"></script>
		<script src="<%= request.getContextPath() %>/echars/dist/echarts.js"></script>
		<script src="<%= request.getContextPath() %>/echars/asset/js/esl/esl.js"></script>
		<!-- 添加模态框 -->
		<script src="<%= request.getContextPath() %>/evaluate/js/moaModal.minified.js"></script>
		<script src="<%= request.getContextPath() %>/evaluate/js/Sweefty.js"></script>
	</head>

	<body id="dgOut">
		<input type="hidden" id="id" value="${requestScope.tecProjectVo.id}">
		<div id="allContent">
				<!-- <div id="tupian">
				<form id="exp" method="post">
				<input id="imageUrl" name="imageUrl" type="hidden" value="">
				<div id="dayin">
						<img src="<%=request.getContextPath() %>/evaluate/img/dayin.png"/>
					</div>
					<div id="daochu">
						<img src="<%=request.getContextPath() %>/evaluate/img/daochu.png" title="Word导出" />
					</div>
				</form>
				</div> -->
				<div id="title">
					<span>${requestScope.tecProjectVo.tp_name}</span>
				</div>
				<!----------------------项目介绍---------------->
				
				<div class="xm_1">
		
					<div class="biaoti">
						<span>项目介绍</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
					<div class="ta_1">${requestScope.tecProjectVo.tp_info}</div>
				</div>
				<!-----------------收益因素-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>收益因素</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
		
					<div class="ta_1">${requestScope.tecProjectVo.tp_factor}</div>
				</div>
		
				<!-----------------评价周期-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>评价周期</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
		
					<div class="ta_1">${requestScope.tecProjectVo.tp_cycle}</div>
				</div>
		
				<!-------------------------验收模式---------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>验收模型</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
		
				</div>
				<div class="ct_1">
					<div class="ta_2">
						<img width="800px" height="799px" src=""></img>
		
					</div>
				</div>
			<!-----------------收益情况-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>收益情况</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
				</div>
				<div class="ct_1">
					<div class="ta_2">
						<div class="sy_1">
								<table width="100%" heigth="290px" border="0">
									  <tr height=40>
									    <td id ="begin"></td>
									    <td id ="end"></td>
									  </tr>
									  <tr height="40" >
									    <td id="hour" ></td>
									    <td id="zhouqi"></td>
									  </tr>
									  <tr height="40">
									    <td id ="a1"></td>
									    <td id ="a2"></td>
									  </tr>
									  <tr height="40">
									    <td id ="a3"></td>
									    <td id ="a4"></td>
									  </tr>
									   <tr height="40">
									    <td id ="a5"></td>
									    <td id ="a6"></td>
									  </tr>
									  <tr>
									  	<td></td>
									  	<td style="">
									  		<button class="button" style="margin-left: 220px;padding: 10px;background: #E7E7E7;">查看明细</button>
									  	</td>
									  </tr>
									</table>	
						</div>
		
					</div>
				</div>
					<!-----------------收益曲线-------------------->
				<div class="xm_1">
		
					<div class="bt_2">
						<span>收益曲线</span>
					</div>
		
				</div>
		
				<div class="sanjiao">
					<img src="<%=request.getContextPath() %>/evaluate/img/sanjiao.png" />
				</div>
				<div class="ct_1">
					<div class="ta_2">
						<div id="myChart" class="sy_1" style="height:400px">收益曲线折线</div>
					</div>
				</div>
				<div id="guanbi">
					<!-- <img src="<%=request.getContextPath() %>/evaluate/img/guanbi.png" title="退出" onclick="window.close();"/> -->
				</div>
	    </div>






	    
    	<div id="workbookQuery" class="block modal2">

    		
    	</div>
	</body>
<script type="text/javascript">

$(function(){ 
	getHour();
	//根据id请求数据
	//var id = $("#id").val();
	//alert(id);
	var jsonData =new Object();
	$.ajax({
			url : "<%=request.getContextPath()%>/XipTecProject.do",
			data : {
				method:"getLineData",
				id:'${requestScope.tecProjectVo.id}'
				},
			type : "post",
			async : false, //同步执行
			dateType : "json",
			success : function(data) {
				jsonData = data;
			},
			error:function(){
				alert("获取折线图数据失败");
 		}
	})
	
	var myChart ;
	var option ;
	/*require.config({
		paths : {
			echarts : '<%=request.getContextPath() %>/echars/www/js'
		}
	});
	require([ 'echarts', 
		          'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
		          'echarts/chart/bar'
		],function(ec){*/
			myChart = echarts.init(document.getElementById("myChart"));
			createOption();
			myChart.setOption(option);
	/*	}
	);*/
	function createOption(){ 
		option={
				tooltip:{
					 show : true,
					 trigger: 'axis',
			     },
			     legend : {
						show:true,
						data : ['${requestScope.tecProjectVo.tp_name}']
				},
				toolbox: {
			        show : true,
			        feature : {
			            restore : {
			            	show: true
			            },
			            saveAsImage : {
			            	show: true
			            }
			        }
			    },
			    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data:function(){
						            var res = [];
						           	for(var i=0;i<jsonData.length;i++){
						   			res[i]=new Date(jsonData[i].profit_date).format('yyyy-MM-dd hh:mm:ss');	
						           	}
						            return res;
						        }()
					        }
					    ],
				
			    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value}'
					            }
					        }
					    ],
			    series : [
					{
						name:'${requestScope.tecProjectVo.tp_name}',
			            type:'line',
			            data:function(){
				            var res =[];
			            	for(var i=0;i<jsonData.length;i++){
								res[i]=jsonData[i].comperhensive;
						     }
				            return res;
				        }()

					}

				]
		}
	
	}
	
		
		$("#daochu").click(function(){
			var imageUrl = myChart.getDataURL("png");
			$("#imageUrl").val(imageUrl);
			var url = "<%=request.getContextPath()%>/XipTecProject.do?method=ExpWord&id=${requestScope.tecProjectVo.id}";
		//	alert(url);
			$("#exp").attr("action",url).submit();
		})
	})
	function getHour(){
		var ids = '${requestScope.tecProjectVo.id}';
		var hours= new Object();
		 $.ajax({
				url : "<%=request.getContextPath()%>/XipTecProject.do",
				data : {
					method:"getLineData",
					id:ids
					},
				type : "post",
				async : false,
				dateType : "json",
				success : function(data) {
					hours = data;
					aaa=data[0].profit_date;
					bbb=data[data.length-1].profit_date
				}
		})
		var time = ${requestScope.tecProjectVo.moneyAndTime.runTime	};
		
		var  a = ${requestScope.tecProjectVo.profitVo.allCoal };
		var a1 = a.toFixed(2);
		$("#a2").html("累计节煤收益："+a1+"（元）");
		var b = ${requestScope.tecProjectVo.profitVo.allElectric };
		var a2 =b.toFixed(2);
		$("#a4").html("累计节电收益："+a2+"（元）");
		var c = ${requestScope.tecProjectVo.profitVo.allMaintain };
		var a3 =c.toFixed(2);
		$("#a5").html("累计维护收益："+a3+"（元）");
		var d = ${requestScope.tecProjectVo.moneyAndTime.allMoney };
		var a4 =d.toFixed(2);
		$("#a6").html("累计综合收益："+a4+"（元）");
		//var ends = Date.parse(new Date(hour[hour.length-1].profit_date));
		var e = ${requestScope.tecProjectVo.profitVo.coal_size };
		var a5 =e.toFixed(2);
		$("#a1").html("累计节煤量："+a5+"（t）");
		var f = ${requestScope.tecProjectVo.profitVo.electrice_size };
		var a6 =f.toFixed(2);
		$("#a3").html("累计节电量："+a6+"（kWh）");
		$("#zhouqi").html("计算周期：2（小时）");
		var dat = time.toFixed(2);
		$("#hour").html("累计运行:"+dat+"(小时)");
		$("#begin").html("投运时间："+new Date(aaa).format('yyyy-MM-dd hh:mm:ss'));
		$("#end").html("上次计算时间:"+new Date(bbb).format('yyyy-MM-dd hh:mm:ss'));
						
	}
	function morder(id){
		var img=$('.ta_2 img')
		if(id=='4c425127-fadb-43bd-ba46-4aa601a6b2d7'){
			img.attr('src','<%=request.getContextPath() %>/evaluate/img/momeiji.png')
		}
		if(id=='ad2aeb79-31a3-4c26-98f3-9b341496cbe5'){
			img.attr('src','<%=request.getContextPath() %>/evaluate/img/jqgzmx.png')
		}
		if(id=='482F49D6AC8843BA8CF885F263518B72'){
			img.attr('src','<%=request.getContextPath() %>/evaluate/img/momeiji.png')
		}
		if(id=='C35DF90D235740E3A49C2D6E7D9A057D'){
			img.attr('src','<%=request.getContextPath() %>/evaluate/img/momeiji.png')
		}
		
		if(id=='48be668a-d973-4957-819d-da80287e57ed'){
			img.attr('src','<%=request.getContextPath() %>/evaluate/img/yanwen.png')
		}
		/* 凝结水  */
		if(id =="482F49D6AC8843BA8CF885F263518B72" || id=="482F49D6AC8843BA8CF885F263518072"||id== "482F49D6AC8843BA8CF885F263518073"||id=="482F49D6AC8843BA8CF885F263518074"|| id =="482F49D6AC8843BA8CF885F263518075" || id =="482F49D6AC8843BA8CF885F263518076"){
			img.attr("src",'<%=request.getContextPath() %>/evaluate/img/njs.png')
		}
		/*宁东制粉*/
		if(id =="5779d131-fded-44fc-93d4-980bfea19ebf"){
			img.attr("src",'<%=request.getContextPath() %>/evaluate/img/ndzf.png');
		}
		/* 主蒸汽优化 */
		if(id =="C35DF90D235740E3A49C2D6E7D9A0570"||id =="C35DF90D235740E3A49C2D6E7D9A0571"||id =="C35DF90D235740E3A49C2D6E7D9A0572"||id =="C35DF90D235740E3A49C2D6E7D9A0573"||id =="C35DF90D235740E3A49C2D6E7D9A0574"||id =="C35DF90D235740E3A49C2D6E7D9A0575"){
			img.attr("src",'<%=request.getContextPath() %>/evaluate/img/zzqyh.png');
		}
		
		
		
		
		
	}
	morder('${requestScope.tecProjectVo.id}')
	
</script>




<script type="text/javascript">

	$(document).ready(function() {
            $('.button').modal({
                target: '#workbookQuery',
                speed: 500,
                easing: 'easeInOutBounce',
                animation: 'right',
                position: '200px auto',
                overlayClose: true,
                on: 'click'
            });

        });
		_url = "<%=request.getContextPath() %>/XipTecProject.do?method=showXiangxi&id=${requestScope.tecProjectVo.id}" 
		$.ajax({
			url:_url,
			dateType : "json",
			success : function(data) {
				if(data && data.length !== 0){
					data = eval(data); 
					var tdhtml = prepearData(data);
				}
				$("#workbookQuery").html(tdhtml);
				 
			}


		})
function prepearData(data){
	var htmlArray =[];
	htmlArray.push("<table style='border-spacing: 0;border-collapse: collapse'><thead><tr style='background:#f1f1f1'><td>序号</td><td>日期</td><td>当日节煤量(t)</td><td>当日节煤收益(元)</td><td>当日节电量(（kWh)</td><td>当日节电收益(元)</td><td>当日维护收益(元)</td></tr><thead>")
	for(var i = 0;i<data.length;i++){
		console.log(data[i]);
		var j = i+1; 
		
		htmlArray.push("<tr height='40'><td>"+j+"</td><td>"+data[i].PROFIT_DATE+"</td><td>"+data[i].COAL_SIZE+"</td><td>"+data[i].COAL_PROFIT+"</td><td>"+data[i].ELECTRIC_SIZE+"</td><td>"+data[i].ELECTRIC_PROFIT+"</td><td>"+data[i].MAINTAIN_PROFIT+"</td></tr>")
		
	}
	htmlArray.push("</table>")
	return htmlArray.join('');
}


</script>
</html>