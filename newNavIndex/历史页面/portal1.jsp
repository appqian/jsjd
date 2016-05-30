<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.DriverManager"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.sql.Statement"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.ResourceBundle"%>
<!doctype html>
<html lang="zh-CN">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>实时技术监督系统（测试环境）</title>
<c:set var="ctx" value="${pageContext.request.contextPath}"
	scope="request" />
<style>
	html{font-size: 16px;}
			
			@media only screen and (min-width: 900px) and (max-width: 1366px) {
				html{font-size: 62.5%;}
			}
			@media only screen and (min-width: 1366px) and (max-width: 1650px) {
				html{font-size: 75.2%;}
			}
			@media only screen and (min-width: 1650px) and (max-width: 1920px) {
				html{font-size: 86.3%;}
			}

</style>
<link rel="stylesheet" href="${ctx}/newNavIndex/css/style1-14.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/yz.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/style1-18wl.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/wj_0118.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/du1-24.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/jtIndex.css" />
<style type="">
	#aqts div{float: left;}
	#dczb div {
    	width: 25%;
    	float: left;
    	height: 37px;
	}
	/* #dczb .td1:nth-child(1) {
	   		background: #f2f2f2;
	}
	#dczb .td1:nth-child(2) {
	   		background: #f2f2f2;
	}
	#dczb .td1:nth-child(3) {
	   		background: #f2f2f2;
	}
	#dczb .td1:nth-child(4) {
	   		background: #f2f2f2;
	}
	
	#dczb .td1:nth-child(5) {
	   		background: #fff;
	}
	#dczb .td1:nth-child(6) {
	   		background: #fff;
	}
	#dczb .td1:nth-child(7) {
	   		background: #fff;
	}
	#dczb .td1:nth-child(8) {
	   		background: #fff;
	}
	
	#dczb .td1:nth-child(9) {
	   		background: #f2f2f2;
	}
	#dczb .td1:nth-child(10) {
	   		background: #f2f2f2;
	}
	#dczb .td1:nth-child(11) {
	   		background: #f2f2f2;
	}
	#dczb .td1:nth-child(12) {
	   		background: #f2f2f2;
	}
	
	#dczb .td1:nth-child(13) {
	   		background: #fff;
	}
	#dczb .td1:nth-child(14) {
	   		background: #fff;
	}
	#dczb .td1:nth-child(15) {
	   		background: #fff;
	}
	#dczb .td1:nth-child(16) {
	   		background: #fff;
	}
	
	 */

	


</style>

<script type="text/javascript">
		var ctx = "${ctx}";
</script>
<%
	HashMap map = (HashMap) session.getAttribute("XzSessionVars");
	String _userId = (String) map.get("userId");
	String _userName = (String) map.get("userName");
	String path = request.getContextPath();
%>
</head>
<body>
	<div id="main" class="fl">
		<div id="du_main">
			<div class="wj_top">
				<span id="time" style="color:#666;"></span>
				<ul>
					<select id="spec" name="language" class="pull_down">
						<!--<c:forEach items="${specList}" var="spec">
							<option id="#wj_spec"  value="${spec.ID}">${spec.NAME}</option> 
						
						</c:forEach> -->

						<c:forEach items="${specList}" var="spec">
							<option id="wj_spec" value="${spec.ID}">${spec.NAME}</option>
						</c:forEach>
						<option value="2c89e177-26e1-48dd-a844-b4661bb6e00f">绝缘</option>
						<option value="7ebef882-8cbf-4729-8c25-1b2558ed9a60">金属</option>
						<option value="93188b01-4b8b-461a-8e28-65cd03fade65">化学</option>
						<option value="af3f2df3-4030-47ce-828b-4f02f6f39243">电测</option>
						<option value="4cfbad50-6b92-4b78-a6dd-fcadf6e5fdac">电能</option>
						<option value="2dcd1a02-3b3d-4dd3-a554-c6b33f254de0">热工</option>
						<option value="f2df9251-e408-4073-90a2-967f4c85cab6">环保</option>
						<option value="5daeaa7d-5141-46b1-b857-ebd74be42118">节能</option>
						<option value="e4fd5a5f-f21b-4608-9104-49d82b4a45f7">继保</option>
						<option value="7491dd42-c94c-46fa-b82d-65e7c320593b">压力容器</option>
						<option value="cca16d73-e72a-4643-9b95-a8e7328e9b94">计量</option>
						<option value="12b4521c-090b-427d-800b-c23d2a6af8f5">励磁系统</option>
						<option value="a9b32dc4-e5ee-44cf-b98e-9009d30b3a54">振动</option>
						<option value="c8a1b764-b850-4f25-8dca-7ca1d9f6bfbc">特种设备</option>
					</select>
					<select id="org" class="pull_down">
						<option value="a61365e2-969d-4352-b3f8-805027ab9f1d">京能集团</option>
						<option value="c21834b4-1cb0-490f-a2a8-deeaf7f7e065">岱海发电</option>
						<option value="472212af-1977-462b-a74a-a1f36ed6562d">宁东发电</option>
						
					</select>
				</ul>
			</div>
			
			<div class="clearfix"></div>
			<div id="d_dcyh" style='display:none'>
				<!--table1-->
				<div class="class_main1 fl wj_ma h293" style="width: 65.1%;">
					<div class="du_more"></div>
					
					
						<div class="class_main1_main fl" style="width:28%;">
						
						<div class='fl' style='height: 19px;width:100%;font-weight: bold;margin-left:12px;' id="aqts" >
							<span class="fl">机组连续运行</span>
							<!-- <div  style='text-indent:-5px; height: 30px;line-height: 30px;color: red;' id = "aqts">0天</div> -->
							<div style="text-align:left;padding-left:5px;"></div>
							<div style="text-align:left;padding-left:5px"></div>
							<div style="text-align:left;padding-left:5px" ></div>
							<div style="text-align:left;padding-left:5px"></div>
						</div>
						<div class="clearfix"></div>
						<div class="fl" style="height: 20px;line-height: 20px;margin-left: 12px;font-weight: bold;">
							<span class="fl">当年故障停机</span>
	                       <div class="fl" style=' height: 20px;line-height: 20px;color: red;margin-left:12px' id ='gztj'>0次</div>
	            		</div>
						<div class="circle" style="margin-top:32px; left: 69px;">
							<div class="fl circle1"
								style="line-height: 60px;display:none;background-image: url('${ctx}/newNavIndex/img/pause.png');">#1机组</div>
							<div class="fl circle1 circle2"
								style ="text-align: right; display:none;line-height: 60px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#2机组</div>
							<div class="fl circle1 circle3"
								style="line-height: 150px;display:none;background-image: url('${ctx}/newNavIndex/img/pause.png')">#3机组</div>
							<div class="fl circle1 circle4"
								style="text-align: right;display:none; line-height: 150px;background-image: url('${ctx}/newNavIndex/img/pause.png')">#4机组</div>
							<div class="circle_data circle_data1" style="">0.00%</div>
							<div class="circle_data circle_data2" style="">0.00%</div>
							<div class="circle_data circle_data3" style="">0.00%</div>
							<div class="circle_data circle_data4" style="">0.00%</div>
							<!--双机组-->
							<div class="fl circle5" style="display: none;">#1机组</div>
							<div class="fl circle6" style="display: none;"><div style='position:absolute;'></div></div>
							<div class='fix_2' style='position:absolute;right:0;top:24px; display:none;'>#2机组</div>
							<!--单机组-->
							<div class="fl circle7" style="display: none;"></div>
							<div class="circle_data5 " style="display: none;">98%</div>
							<div class="circle_data6 " style="display: none;">98%</div>
							<!--单机组-->
							<div class="circle_data7" style="display: none;">77%</div>

							<!-- 全厂状况  -->
							<div id="circle_data21">
								<span id="fhl" title="全厂负荷率">负荷率</span><br /> <span id="zfh"
									title="总负荷">总负荷</span>
							</div>
						</div>
						<div class="class_main1_right" style="position: absolute;left: 50px; top: 256px;width: 246px;height: 24px;">
							<div>
								<div
									style="height: 20px; width: 20px; background: red; border-radius: 7px;"></div>
								&nbsp;&nbsp;&nbsp;运&nbsp;&nbsp;行&nbsp;&nbsp;
							</div>
							<div>
								<div
									style="height: 20px; width: 20px; background: green; border-radius: 7px;margin-right: 9px;"></div>
								&nbsp;&nbsp;&nbsp;停&nbsp;&nbsp;机&nbsp;&nbsp;
							</div>
							<div>
								<div
									style="height: 20px; width: 20px; background: yellow; border-radius: 7px;"></div>
								&nbsp;&nbsp;&nbsp;通讯中断
							</div>
						</div>
					</div>
					
					<div class="table_v2 fl" style="width: 70.8%;;height:100%;">
						<div id="dczb" class="wj_cen">

						</div>
					</div>

					<!-- <table style="width: 100%; margin-top: 20px;">
						<tr class="du_href">
							<td style="background: #ffffff;"><a class="tiaozhuan"
								style="float: left; width: 120px; height: 30px; margin: 0 0 0 60px; background: #f2f2f2; text-align: center; line-height: 30px; color: #177EDA">机组状态参数</a></td>
							<td style="background: #ffffff;"><a
								href="http://172.168.100.101/Coresight"
								style="float: right; width: 120px; height: 30px; background: #f2f2f2; text-align: center; line-height: 30px; color: #177EDA;margin-right:60px;">全厂系统总览</a></td>
						</tr>
					</table> -->
				</div>
				<!--table2-->

				<div class="class_main1 class_main5  fl  wj_ma h293" style="display:none">
					<h3 class="pointer wj_bod">
						<b class="title_active1" onclick="zyzb_show()">重要指标一览</b>
						<b class="" onclick="hbzb_show()" id="hb_title">环保指标一览</b>
					</h3>

					<!--<div class="du_more">更多></div>-->
					<div class="clearfix"></div>

					<div id="dczb" class="wj_cen">

					</div>
					<div id="hbzb" class="wj_cen" style="display:none">
						

						
					</div>


				</div>
			
				<!--table3 -->
				<div class="class_main1 class_main5 fl  wj_ma h293">
					
					<h3 class="pointer wj_bod">
						<b class="title_active1" onclick="zhibiao_show()">指标排名</b>
						<!--<b onclick="kaohexinxi_show()">考核信息</b>-->
					</h3>
					<div id="wj_ckdb" class="du_more" style="text-decoration:underline">
						<a id='duibiaodizhi' href="">查看对标奖励兑现表</a>
					</div>
					<div class="clearfix"></div>
					<div class="wj_cen" >
						<div id="kaohe" style="display:none">
							<table class="khtit tc" style="width:100%"  id="kaohexinxi">
								<thead>
							        <tr>
							            <td style="width:20%">序号</td>
							            <td style="width:80%">描述</td>
							           
							        </tr>
							    </thead>
						        <tbody>
						        	
						        
						        </tbody>
			    			</table>
			    			
			    			
						</div>
						<div id="duibiao" style="display:block">
							<table class="khtitle tc">
						        <tr>
						            <td>技术指标</td>
						            <td >当月平均值</td>
						            <td >当月实时排名</td>
						            <td >上季度平均值</td>
						            <td >上季度排名</td>
						        </tr>
			    			</table>
			    			
						    <div class="khleft1 tl fl">
						        <div > 综合供电煤耗(g/kW.h)</div>
						        <div>厂用电率<br/>（%）</div>
						        <div>综合厂用电率<br/>（%）</div>
						        <div>机组负荷率<br/>（%）</div>
						        <div>补水率<br/>（%）</div>
						       
						    </div>
						    <div class="khright fl">
						        <table class=" fl" style="width:100%;" id="zhibiaopaimingtable" >
						           
						             
						        </table>
					    	</div>
						    
						</div>
						
					   
					 </div>   
				</div>
				<!--table4 -->
				<div class="class_main1 class_main5 fl  wj_ma h213  " style="height: 436px!important;">
					
					<!-- <h3 class="pointer wj_bod">
						<b class="title_active1" onclick="baojing(1);">测点报警</b>
						<b onclick="baojing(0)">停机机组报警</b>
						<b onclick="yjtz_show()">预警通知单</b>
					</h3> -->
					<h3 >
						<b  onclick="baojing(1);">测点报警</b>
						<!-- <b onclick="baojing(0)">停机机组报警</b> -->
						<!-- <b onclick="yjtz_show()">预警通知单</b> -->
					</h3>
					<div class="du_more"><a href="http://172.168.100.110:7001/jsjd/main?xwl=23WPD5TO7GWR">更多&gt;</a></div>
					<div class="clearfix"></div>
					
					<div id="rongqi2" style="display: block;">
						<table id="baojingxinxi" class="wj_cen">
							<thead>
								<tr>
									<td style="width: 30%; overflow: hidden;">报警名称</td>
									
									<td style="width: 20%; ovflow: hidden">编码</td>
								
									<td style="width: 20%; overflow: hidden">报警时间</td>
									<td style="width: 20%; overflow: hidden">报警类别</td>

								</tr>
							</thead>
							<tbody id="baojingTable">
							</tbody>

							
						</table>
					</div>
					<div id="rongqi" style="display: none">
						
					</div>
				</div>

				<!--table5-->

				<div class="class_main1 class_main5 fl h213 ">
					<h3 class="pointer">
						<b class="title_active1" >考核信息</b> <b
							
					</h3>
					<div class="du_more">
						<!-- <a href="${ctx}/smartBI.html">更多></a> -->
					</div>
					<div class="clearfix"></div>
					<table class="jiandubaobiao_view wj_cen">
						<thead>
							<tr>
								<td style="width: 30%; overflow: hidden;">考核项目</td>
								<td style="width: 40%; overflow: hidden;">考核时间</td>
								<td style="width: 30%; overflow: hidden;">考核金额</td>
							</tr>
						</thead>
						<tbody id="">
						</tbody>
					</table>
					
				</div>

				
				
				<!-- table6 -->
					
				<div class="class_main1 class_main5 fl h213 ">
					<h3 class="pointer">
						<b id="wj_yc" class="title_active1" onclick="ycqk_show()">机组事件</b>
						<b id="wj_yj" onclick="bjtzd_show()">预警通知单</b>
					
					</h3>
					<div class="du_more">
						 <a id="yc_more" href="${ctx}/newNavIndex/yichangqingkuang/qchuizong.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="ycqk wj_cen" id="ycqk" >
						<thead>
							<tr>
								<td style="width: 10%; overflow: hidden;">机组</td>
								<td style="width: 30%; overflow: hidden;">异常名称</td>
								<td style="width: 30%; overflow: hidden">发生时间</td>
								<td style="width: 30%; overflow: hidden">异常说明</td>														
							</tr>
						</thead>
						<tbody id="ycqktable">
							
						</tbody>
					</table>
					<table class="yjtzd wj_cen" id="yujingtongzhidan" style="display:none;">
						<thead>
							<tr>
								
								<td style="width:35%;">预警项目</td>
				                <td style="width:15%;">预警级别</td>
				              	<td style="width:25%;">预警时间</td>
				              	<td style="width:25%;">预警说明</td>
							</tr>
						</thead>
						<tbody id="yujingTable">
						
						
						</tbody>
					
					</table>
				</div>
				<div class="class_main1 class_main5 fl h213" id="wj_table5">
					<h3 class="pointer">
						<b id="wj_sb"  class="title_active1">设备轮换</b>
						<b id="wj_dq" onclick="">定期试验</b>
						
						<b id="wj_jz" onclick="">机组启停</b>

					</h3>
					<div class="du_more"><a id="dq_more" href="${ctx}/newNavIndex/shebeilunhuan/qchuizong.html"> 更多</a>
						<%-- <a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a> --%>
					</div>
					<div class="clearfix"></div>
	
          			<table class="jdzx wj_cen" id="wj_qiehuan">
						<thead>
							<tr>
								<td width="10%">机组</td>
								<td width="44%">轮换项目</td>
								<td width="44%">轮换时间</td>
                                
							</tr>
						</thead>
						<tbody id="table_5_1" style="display:none"></tbody>
						<tbody id='table_5' >
						<tbody id="table_5_2" style="display:none"></tbody>
						</tbody>

					</table>

				</div>
				
				<!--table7  -->
				<!--<div class="class_main1 class_main5 fl h213">

					<h3 class="pointer">
						<b  class="title_active1" onclick="zongjie(0)">监督计划</b>
						<b onclick="zongjie(1)">监督总结</b>
					</h3>
					<div class="du_more">
						<a href="${ctx}/smartBIjh.html">更多></a>
					</div>
					<div class="clearfix"></div>					
					<div class="jdzj" style="width: 100%;">
						<table class="wj_cen" id="jdjhzj">
							<thead style="width: 100%;">
								<tr style="width: 100%;">
									<td style="width: 30%;">计划编号</td>
									<td style="width: 40%;">计划名称</td>
									<td style="width: 30%;">上报时间</td>
								</tr>
							</thead>
							<tbody id="zongjieTable">
							</tbody>
						</table>
					</div>
				</div>-->

				<!--table8-->
				<div class="class_main1 fl h213">
					<!-- 技改项目  -->
					<h3>技改项目</h3>
					<div class="du_more" style="position:absolute;z-index:9999">
						<a href="${ctx}/main?xwl=23Z3QFWUNBT8">更多></a>
					</div>
					<div class="clearfix"></div>
					<div style="margin: 10px 0 0 0; z-index: 999; display: block;position:relative">
						<div  class="projectId1 fl title_active"
							style="margin: 0 2%; cursor: pointer"></div>
						<div class="projectId2 fl" style="cursor: pointer"></div>
						<!-- <a href="javascript:void(0)" id="jigaiInf" style="color: #6DB1E0">查看详情</a> -->
						<div class="clearfix"></div>
					</div>
					<div class="profit">

						

					</div>
					<div id='jg_yuan' style="position:absolute;left:20px;top:81px;z-index:999;display:none">(元)</div>
					<!-- <div id="my_echart" style="width: 420px; height: 220px;margin:0 auto; display:none;position:absolute;top:31px;">
					</div> -->
					<div id="myChart_"  style="height:220px;margin:0 auto;position:relative;top:-49px;"></div>
				</div>

				<!--9table-->
				<!-- <div class="class_main1 class_main5 fl h213 ">
					<h3 class="pointer">
						<b class="title_active1" onclick="jiandubaobiao_show()">监督报表</b> <b
							onclick="shengchanbaobiao_show()">生产报表</b>
					</h3>
					<div class="du_more">
						<a href="${ctx}/smartBI.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="jiandubaobiao_view wj_cen">
						<thead>
							<tr>
								<td style="width: 30%; overflow: hidden;">报表编号</td>
								<td style="width: 40%; overflow: hidden;">报表名称</td>
								<td style="width: 30%; overflow: hidden;">上报时间</td>
							</tr>
						</thead>
						<tbody id="jianduTable">
						</tbody>
					</table>
					<table style="display: none;" class="shengchanbaobiao_view wj_cen" id="yzs">
						<thead>
							<tr>
								<td style="width: 30%; overflow: hidden;">报表编号</td>
								<td style="width: 40%; overflow: hidden;">报表名称</td>
								<td style="width: 30%; overflow: hidden;">上报时间</td>
							</tr>
						</thead>
						<tbody id='scTable'>
				
						</tbody>
					</table>
				</div> -->
			</div>






			<div id="d_jtyh" style="display:block">
					<!-- 集团用户table1+table2 -->
				<div  class="class_main1 fl wj_ma h293 " style="width:65.1%" >
					<div style="" class="jt-left fl">
						
						<div class="jt-left-1 fl">
							<div class="jt-left-1-1" style="margin-bottom:60px;">
								<div>昨日发电量</div>
								<div id="zuori"></div>
							</div>
							<div class="">
								<div>今日发电量</div>
								<div id="jinri"></div>
							</div>	
						</div>
						<!-- 集团   canvas1 -->
						
						<div class="jt-left-canvas fl" style="positon:relative;padding-top:20px;position:relative;">
							<div id="hightchart" style="width:470px;height:240px;position:absolute"></div>							
						</div>
						<div class="jt-cs"><a href="/jsjd/main?xwl=23Z6S7B7RZLA">查询各厂测点指标</a></div>
						<div class="jt-cs jt-cs1"><a href="/jsjd/main?xwl=23YA0QJSVS7L">各厂机组主要参数</a></div>
					
					</div>
					<!-- 集团 canvas2 -->
					<div class="jt-right fl" >
						<div class="jt-right-h">
							<div class="fl">总装机容量<br/>
								<div class='zong'></div>MW
							</div>		
							<div class="fl">年计划发电量<br/>
								<div class='zong'></div>亿kWh
							</div>
							<div class="fl">月计划发电量<br/>
								<div class='zong'></div>亿kWh							
							</div>	
							<div class="clearfix"></div>			
						</div>
						<div class="jt-right-canvas" style="clear:both">
						
							<div id="huanxing1" style="height:173px;float:left"></div>
							<div id="huanxing2" style="height:173px;float:left"></div>
							<div id="huanxing3" style="height:173px;float:right"></div>
							<div class="clearfix"></div>
							
						</div>					
						 <div class="jt-right-bottom">
							 <div class="fl" style="width:33%;">运行机组负荷率</div>
							<div class="fl" style="width:34%;">年发电量完成率</div>
							<div class="fl" style="width:30%;">月发电量完成率</div>
						
						</div> 
					</div>
				</div>	
				<!--table3 -->
				<div class="class_main1 class_main5 fl  wj_ma h293">
					<!-- <h3 class="pointer wj_bod">
						<b id="wj_yxjz" class="title_active1" onclick="JTbaojing(1)">运行机组报警</b>
						<b id="wj_tjjz" onclick="JTbaojing(0)">停机机组报警</b>
						<b onclick="yjtz_show()">预警通知单</b>
					</h3> -->
					<h3>
						<b>测点报警</b>
					</h3>
					<div class="du_more"><a href="/jsjd/main?xwl=23WPD5TO7GWR">更多&gt;</a></div>
					<div class="clearfix"></div>
					
					<div id="rongqi2" style="display: block;">
						<table id="baojingxinxi" class="wj_cen">
							<thead>
								<tr>
									<td style="width: 40%; ">报警名称</td>
									<td style="width: 30%; ">编码</td>
									<!-- <td style="width: 20%; ">报警级别</td>
									<td style="width: 22%; ">报警值</td> -->
									<td style="width: 30%; ">报警时间</td>
								</tr>
							</thead>
							<tbody id='JTbaojing' style="">
								
							</tbody>
							
						</table>
					</div>									
				</div>

				<!--table4 -->
				
		<div class="class_main1 class_main5 fl h213">
				<h3 class="pointer wj_bod">
					<b id="wj_kh" class="title_active1" onclick="JTkhhz_show()">考核汇总</b>
					<b id="wj_db" onclick="JTdbgl_show()">对标管理</b>					
				</h3>
				
				<div class="du_more">
				 <a id="wj_db_more"></a>
				</div>
				<div class="clearfix"></div>

				<table class="JTkhhz wj_cen">
					<thead>
						<tr>
							<td style="width: 33%; overflow: hidden;">序号</td>
							<td style="width: 34%; overflow: hidden;">描述</td>
							<td style="width: 33%; overflow: hidden;">考核时间</td>
							
						</tr>
					</thead>
					<tbody id="kaohehuizong">					
					</tbody>					
				</table>

				<table class="JTdbgl wj_cen" style="display:none;">
					<thead>
						<tr>
							<td style="width: 25%; overflow: hidden;">序号</td>
							<td style="width: 25%; overflow: hidden;">描述</td>
							<td style="width: 25%; overflow: hidden;">对标时间</td>						
						</tr>
					</thead>
					<tbody id="">				
					</tbody>					
				</table>
			</div>
				<!--5table-->
				
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="shengchanbaobiao_show()">生产报表</b> 
						<b onclick="jiandubaobiao_show()">监督报表</b>
					</h3>
					<div class="du_more">
						<a href="${ctx}/smartBI.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table  class="shengchanbaobiao_view wj_cen">
						<thead>
							<tr>
								<td style="width: 20%;">报表编号</td>
								<td style="width: 30%;">报表名称</td>
								<td style="width:20%;">上报单位</td>
								<td style="width: 30%;">上报时间</td>
							</tr>
						</thead>
						<tbody id="shengchanbaobiao">
						
						</tbody>
						
					</table>
					<table class="jiandubaobiao_view wj_cen" style="display: none;">
						<thead>
							<tr>
								<td style="width: 20%; overflow: hidden;">编号</td>
								<td style="width: 20%; overflow: hidden;">报表名称</td>
								<td style="width: 20%; overflow: hidden;">专业</td>
								<td style="width: 20%; overflow: hidden;">上报单位</td>
								<td style="width: 20%; overflow: hidden;">上报日期</td>
							</tr>
						</thead>
						<tbody id="JTjianduTable">
					
						</tbody>
					</table>
				</div>
				<!--table6-->
				
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b id="wj_jt_dq" class="title_active1" onclick="JTdqsy_show()">定期试验</b>
						<b id="wj_jt_sb" onclick="JTsblh_show()">设备轮换</b>
						<b id="wj_jt_qt" onclick="JTjzqt_show()">机组起停</b>
					</h3>
					<div class="du_more">
					<a id="wj_jt_more" href="${ctx}/newNavIndex/jtdingqishiyan/jthuizong.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="jdzx wj_cen comb" >
						<thead>
							<tr>
								<td style="width: 20%; overflow: hidden;">电厂</td>
								<td style="width: 20%; overflow: hidden;">本年应进行</td>
								<td style="width: 20%; overflow: hidden;">本年已完成</td>
								<td style="width: 20%; overflow: hidden;">本月应进行</td>
								<td style="width: 20%; overflow: hidden;">本月已完成</td>
							</tr>
						</thead>
						<tbody id="JTdqsy">
						
						</tbody>
						<tbody id="JTsblh" style="display: none;">
						
						</tbody>
					</table>
					<table class="jt_jzqt wj_cen" style="display:none">
						<thead>
							<tr>
								
								<td style="width:20%;overflow:hidden">电厂</td>
								<td style="width:15%;overflow:hidden">机组</td>
								<td style="width:35%;overflow:hidden">启停描述</td>
								<td style="width:30%;overflow:hidden">并网/解列时间</td>


							</tr>
						</thead>
						<tbody id="JTjzqt" class=""></tbody>
						
					</table>
				</div>

				<!-- table7 -->				
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b id="wj_jt_yc" class="title_active1" onclick="JTycqk_show()">异常情况</b>
						<b id="wj_jt_yj" onclick="JTyjtzd_show()">预警通知单</b>
					
					</h3>
					<div class="du_more">
					<a id="wj_yc_more" href="${ctx}/newNavIndex/jtyichangqingkuang/jthuizong.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="JTycqk wj_cen">
						<thead>
							<tr>
								<td style="width: 15%; overflow: hidden;">电厂</td>
								<td style="width: 10%; overflow: hidden;">机组</td>
								<td style="width: 30%; overflow: hidden">异常名称</td>
								<td style="width: 25%; overflow: hidden">发生时间</td>
								<td style="width: 20%; overflow: hidden">异常说明</td>	
							</tr>
						</thead>
						<tbody id="JTycqk">
						
						</tbody>
					</table>

					<table class="JTyjtzd wj_cen" id="" style="display:none;">
						<thead>
							<tr>
							<td style="width: 20%; overflow: hidden">电厂</td>
							<td style="width: 20%; overflow: hidden">预警项目</td>
							<td style="width: 20%; overflow: hidden">预警级别</td>														
							<td style="width: 20%; overflow: hidden;">预警时间</td>						
							<td style="width: 20%; overflow: hidden">预警说明</td>	
									
							</tr>
						</thead>
						<tbody id="yjtzd">
											
						</tbody>
						
					</table>
				</div>
				
				
				<!--table8  -->
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="">技改项目</b>
						
					</h3>
					<div class='du_more'>
					
						<a href="${ctx}/main?xwl=23Z3QFWUNBT8">更多></a>
						<!--<%-- <a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a> --%>-->
					</div>
					<div class="clearfix"></div>

					<div style="margin: 10px 0 0 0; z-index: 999; display: block;position:relative">
						<div class="projectId1 fl title_active"
							style="margin: 0 2%; cursor: pointer"></div>
						<div class="projectId2 fl" style="cursor: pointer"></div>
						<!-- <a href="javascript:void(0)" id="jigaiInf" style="color: #6DB1E0">查看详情</a> -->
						<div class="clearfix"></div>
					</div>
					<div class="profit">
					</div>
					<div id='yuan' style="position:absolute;left:20px;top:81px;z-index:999;">(元)</div>
					<div id="my_echart" style="width: 420px; height: 220px;margin:0 auto; display:none;position:absolute;top:31px;">
					</div>
					<div id="jt_myChart_"  style="height:220px;margin:0 auto;position:relative;top:-49px;"></div>


					<!-- <table class="ycqk wj_cen">
	 						<thead>
	 							<tr>
	 								<td style="width: 33%; overflow: hidden;">电厂</td>
	 								<td style="width: 34%; overflow: hidden">技改名称</td>
	 								<td style="width: 34%; overflow: hidden">专业</td>
	 								<td style="width: 33%; overflow: hidden">投运时间</td>
	 								
	 							</tr>
	 						</thead>
	 						<tbody id="ycqktable"> 
	 						
	 						</tbody>
	 					</table> -->
					
				</div>
				<!--table9 -->
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="">通知公告</b>
						
					</h3>
					<div class="du_more"><a href="/jsjd/main?xwl=23WPD5TO7KQ1"> 更多></a>
						<!--<%-- <a href="${ctx}/newNavIndex/jianduzhixing.jsp">更多></a> --%>-->
					</div>
					<div class="clearfix"></div>
					<table class="ycqk wj_cen">
						<thead>
							<tr>
								<td style="width: 50%; overflow: hidden;">通知(公告)内容</td>
								<td style="width: 25%; overflow: hidden">发布单位</td>
								<td style="width: 25%; overflow: hidden">发布时间</td>
								
							</tr>
						</thead>
						<tbody id="JTtz">
						
							
						</tbody>
					</table>
					
				</div>
      </div>
			<div class="clearfix"></div>
		</div>

	</div>

	<div class="lineDiv" id="lineDiv" style="overflow: auto">
		<!-- 关闭div -->
		<div style="border: 0px black solid; height: 20px; text-align: right;">
			<a id="closeDiv" onclick="closeDiv()" href='javascript:void(0)'
				style="font-size: 1.1em; line-height: 25px; font-family: '微软雅黑'">关闭&nbsp;</a>
		</div>
		<input hidden="true" value="" id="selectPicode"> <input
			hidden="true" value="" id="selectPiname"> <input
			hidden="true" value="" id="method"> <input hidden="true"
			value="" id="points">
		<!-- 折线图显示的div -->
		<div id="myChart" style="height: 300px; width: 660px"></div>
		<!-- 测点数据的信息 -->
		<div id="pointsInfo" style="_height:40px;min-height:40px; font-size: 17px"></div>
		<!-- <div id="methods" style="height: 20px"></div> -->
	</div>
	
	
	
	
	<!--<script type="text/javascript"  src="${ctx}/newNavIndex/js/echarts2.js"></script>-->
	<script src="//cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
	<script type="text/javascript"  src="http://echarts.baidu.com/build/dist/echarts-all.js"></script>


	<script type="text/javascript" type="text/javascript" src="<%=path%>/final/js/line.js"></script>
	<script type="text/javascript"  src="<%=request.getContextPath()%>/echars/dist/echarts.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/echars/asset/js/esl/esl.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/tab/sssj_util.js"></script>
	
	<script type="text/javascript" src="${ctx}/newNavIndex/js/highcharts.js"></script>
	<script type="text/javascript" src="${ctx}/newNavIndex/js/portal_v2.js?v2"></script>
	<script type="text/javascript" src="${ctx}/newNavIndex/js/jt-index.js?v3"></script>
	
	<script type="text/javascript"  src="${ctx}/newNavIndex/js/charts.js"></script>

	
	<script type="text/javascript">
					//加载echarts组件
		var myChart;
		var option;
		require.config({
			paths : {
				echarts : '<%=request.getContextPath()%>/echars/www/js/'
			}
		});
		require([ 'echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		], function(ec) {
			initEcharts(ec);
		});
	</script>
	<!--下拉框兼容ie-->
	<script type="text/javascript">
		window.onload = function() {
			function isIE() { //ie?  
				if (!!window.ActiveXObject || "ActiveXObject" in window)
					return true;
				else
					return false;
			}
			if (isIE()) {
				document.getElementById
				document.getElementById('spec').style.background = 'none';
				document.getElementById('org').style.background = 'none';
			} else {

				document.getElementById('spec').style.background = 'url(' + ctx
						+ '/newNavIndex/img/icon.png) no-repeat right center';
				document.getElementById('org').style.background = 'url(' + ctx
						+ '/newNavIndex/img/icon.png) no-repeat right center';
			}
		}
	</script>
	<script type="text/javascript"> 
	  function showLocale(objD){
		  var myDate = new Date();
		  	var month=myDate.getMonth()+1;
		  	if(month<10){
		  		month="0"+month;
		  	}
		  	var Day = myDate.getDate();
		  	if(Day<10){
		  		Day="0"+Day;
		  	}
		  	var hours=myDate.getHours();
		  	if(hours<10){
		  		hours="0"+hours;
		  	}
		  	var min=myDate.getMinutes();
		  	var ss=myDate.getSeconds();
		  	if(min<10){
		  		min="0"+min;
		  	}
		  	if(ss<10){
		  		ss="0"+ss;
		  	}
		  	var str=myDate.getFullYear()+"年"+month+"月"+Day+"日     "+hours+":"+ min+":"+ ss+"";

		  return(str);
	  }
	  function tick () {
	  	var today;
	  	today = new Date();
	  	document.getElementById("time").innerHTML = showLocale(today);
	  	window.setTimeout("tick()", 1000);
	  }
	  tick();
	</script>
</body>
</html>