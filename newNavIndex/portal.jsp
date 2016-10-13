<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
<title>实时技术监督系统</title>
<c:set var="ctx" value="${pageContext.request.contextPath}"
	scope="request" />
<style>
	
</style>
<link rel="stylesheet" href="${ctx}/newNavIndex/css/style1-14.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/yz.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/style1-18wl.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/wj_0118.css" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/du1-24.css?v1" />
<link rel="stylesheet" href="${ctx}/newNavIndex/css/jtIndex.css" />
<style type="">
	#aqts div{float: left;}
	#dczb div {
    	width: 33.333333%;
    	float: left;
    	height: 37px;
	}
	
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
				<span id="time" style="color:#666;width:"></span>
				<div id="FontScroll" style="float: left; height: 28px;line-height: 31px;overflow: hidden;font-size: 16px; font-weight: 100; color: red;">
				    <ul>
				        <li></li>
				        <li></li>
				    </ul>
				</div>
				<ul>
					
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
					
					
						<div class="class_main1_main fl">
						
						<a class='fl' style='height: 26px;line-height:30px;width:100%;margin-left:12px;' id="aqts" href="${ctx}/newNavIndex/jz-opration/html/jz_operation.html" >
							<span class="fl">机组连续运行</span>
							<!-- <div  style='text-indent:-5px; height: 30px;line-height: 30px;color: red;' id = "aqts">0天</div> -->
							<div style="text-align:left;padding-left:5px;"></div>
							<div style="text-align:left;padding-left:5px"></div>
							<div style="text-align:left;padding-left:5px" ></div>
							<div style="text-align:left;padding-left:5px"></div>
						</a>
						<div class="clearfix"></div>

						<a class="fl" style="height: 20px;line-height: 20px;margin-left: 12px;position:absolute;left:50%;top:256px;width:50%;" href="${ctx}/newNavIndex/yichangqingkuang/qchuizong.html" >
							<span class="fl">当年故障停机</span>
	                       <div class="fl" style=' height: 20px;line-height: 20px;color: red;margin-left:12px;position: relative;z-index: 2;' id ='gztj'>0次</div>
	            		</a>

	            		<div class="fl" style="position:absolute;top:258px;height:20px;text-align:left;margin-left:12px;" id="hole">
	            			
	            		</div>
						<div class="circle" style="margin-top:32px;">
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
								<span id="fhl" title="运行机组负荷率">负荷率</span><br /> <span id="zfh"
									title="实时负荷">总负荷</span>
							</div>
						</div>
						<div class="class_main1_right" style="position: absolute;left: 89px; top: 256px;width: 246px;height: 16px; display:none;">
							<div>
								<div
									style="height: 16px; width: 16px; background: red; border-radius: 50%;position:relative;top:3px;"></div>
								&nbsp;&nbsp;&nbsp;运&nbsp;&nbsp;行&nbsp;&nbsp;
							</div>
							<div>
								<div
									style="height: 16px; width: 16px; background: green; border-radius: 50%;margin-right: 2px;position:relative;top:3px;"></div>
								&nbsp;&nbsp;&nbsp;停&nbsp;&nbsp;机&nbsp;&nbsp;
							</div>
							<div>
								<div
									style="height: 16px; width: 16px; background: yellow; border-radius: 50%;position:relative;top:3px;"></div>
								&nbsp;&nbsp;&nbsp;通讯中断
							</div>
						</div>
					</div>
					<!--table2-->
					<div class="table_v2 fr" style="">
						<div id="dczb" class="wj_cen">

						</div>
					</div>

					
				</div>
				
			
				<!--table3 -->
				<div class="class_main1 class_main5 fl  wj_ma h293">
					
					<h3 class="pointer wj_bod">
						<b class="title_active1" onclick="zhibiao_show()">指标排名</b>
						<!--<b onclick="kaohexinxi_show()">考核信息</b>-->
					</h3>
					<!--<div id="wj_ckdb" class="du_more" style="text-decoration:underline">
						<a id='duibiaodizhi' href="">查看对标奖励兑现表</a>
					</div>-->
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
						        <div>发电厂用电率<br/>（%）</div>
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
					
					
					<h3 >
						<b  onclick="baojing(1);">测点报警</b>
					
					</h3>
					<div class="du_more"><a href="${ctx}/main?xwl=23WPD5TO7GWR">更多&gt;</a></div>
					<div class="clearfix"></div>
					
					<div id="rongqi2" style="display: block;">
						<table id="baojingxinxi" class="wj_cen">
							<thead>
								<tr>
									<td style="width: 30%; overflow: hidden;">报警名称</td>
									
									<td style="width: 24%; ovflow: hidden">编码</td>
								
									<td style="width: 24%; overflow: hidden">报警时间</td>
									<td style="width:12%; overflow: hidden">报警类别</td>

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
						<b class="title_active1" >考核信息</b> 
							
					</h3>
					<div class="du_more">
						<a href="${ctx}/newNavIndex/kaohe/kaohe.html">更多></a>
					</div>
					<div class="clearfix"></div>
					<table class="jiandubaobiao_view wj_cen">
						<thead>
							<tr>
								<td style="width: 60%; overflow: hidden;">考核项目</td>
								<td style="width: 20%; overflow: hidden;">考核时间</td>
								<td style="width: 20%; overflow: hidden;">考核金额</td>
							</tr>
						</thead>
						<tbody id ="dc_kaohe">
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
						<b id="wj_jz" class="title_active1">机组启停</b>
						<b id="wj_sb"  >设备轮换</b>
						<b id="wj_dq" >定期试验</b>
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
				<!--table8-->
				<div class="class_main1 fl h213">
					<!-- 技改项目  -->
					<h3>技改项目</h3>
					<div class="du_more" style="position:absolute;z-index:9999">
						<a href="${ctx}/main?xwl=23Z3QFWUNBT8" id="jigaiInf" >更多></a>
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
			</div>

			<!--集团view-->
			<div id="d_jtyh" style="display:none">
					<!-- 集团用户table1+table2 -->
				<div  class="class_main1 fl  h293 " style="width:65.1%" >
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
						
						<div class="jt-left-canvas fl" style="positon:relative;padding-top:20px;position:relative; top:-10px;">
							<div id="hightchart" style="width:470px;height:240px;position:absolute"></div>							
						</div>
						
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
						<div class="jt-right-canvas" style="clear:both;position:relative; top:-10px;">
							<div id="totalFHL" class="baifenbi" title="运行机组负荷率"></div>
							<div id="nd" class="baifenbi" title="当年时间进度"></div>
							<div id="nd1" class="baifenbi"  title='当年发电量完成率'></div>

							<div id="yd" class="baifenbi" title="当月时间进度"></div>
							<div id="yd1" class="baifenbi" title="当月发电量完成率"></div>
						
							<div id="huanxing1" style="height:173px;float:left;position:relative;top:6px;width:33.3%"></div>
							<div id="huanxing2" style="height:173px;float:left;position:relative;top:6px;width:33%"></div>
							<div id="huanxing3" style="height:173px;float:left;position:relative;top:6px;"></div>
							<div class="clearfix"></div>
							
						</div>					
						 <div class="jt-right-bottom">
							  <div class="fl" style="width:33.3%;">运行机组负荷率</div>
	                          <div class="fl" style="width:33.3%;">年发电量完成率</div>
							  <div class="fl" style="width:33.3%;">月发电量完成率</div>
						
						 </div>
						 <div class="jt-right-bottom" style="top: -34px;">
							 <div class="fl" style="width:33.3%;text-align:right;position:relative">
								<div style="width: 45px;height: 5px;background: #008B00;position:absolute;margin: 6px 0;left: 21%;"></div>
									运行机组负荷率
	                         </div>
	                         <div class="fl" style="text-indent: 13%;width:33.3%;position:relative;">
									<div style="width:45px;height: 5px;background: #1a76cb;position:absolute;margin: 6px 0;left: 21%;"></div>
									时间进度
							</div>
							<div class="fl" style="text-indent: 6%;width:33.3%;position:relative;">
								<div style="width: 45px;height: 5px;background: #4da9fe;position:absolute;margin: 6px 0;left: 7%;"></div>
								发电量完成率
							</div>
						 </div>
					</div>
				</div>	
				<!--table3 -->
				<div class="class_main1 class_main5 fl  wj_ma h293">
					
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
				
				<div class="du_more"><a href="/jsjd/newNavIndex/kaohe/kaohe.html">更多</a></div>
				<div class="clearfix"></div>

				<table class="JTkhhz wj_cen">
					<thead>
						<tr>
							<td style="width:10%">电厂</td>
							<td style="width:22%">本年考核次数</td>
							<td style="width:22%">本年考核金额</td>							
							<td style="width:23%">本月考核次数</td>
							<td style="width:23%">本月考核金额</td>							
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
						<a href="/jsjd/baobiao/html/diy.html">更多></a>
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
						<b id="wj_jt_qt" class="title_active1" onclick="JTjzqt_show()">机组启停</b>
						<b id="wj_jt_dq"  onclick="JTdqsy_show()">定期试验</b>
						<b id="wj_jt_sb" onclick="JTsblh_show()">设备轮换</b>
						
					</h3>
					<div class="du_more">
					<a id="wj_jt_more" href="${ctx}/jzqt/index.html">更多></a>
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
						<b id="wj_jt_yc" class="title_active1" onclick="JTycqk_show()">机组事件</b>
						<b id="wj_jt_yj" onclick="JTyjtzd_show()">预警通知单</b>
					
					</h3>
					<div class="du_more">
					<a id="wj_yc_more" href="${ctx}/newNavIndex/yichangqingkuang/qchuizong.html">更多></a>
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
				</div>
				<!--table9 -->
				<div class="class_main1 class_main5 fl h213">
					<h3 class="pointer">
						<b class="title_active1" onclick="">通知公告</b>
						
					</h3>
					<div class="du_more"><a href="/jsjd/main?xwl=23WPD5TO7KQ1"> 更多></a>
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
		
	</div>
	
	
	
	
	
	<script src="${ctx}/common/js/jquery.min.js"></script>
	
	<script type="text/javascript"  src="${ctx}/util/echarts-all.js"></script>
	<script type="text/javascript" type="text/javascript" src="<%=path%>/final/js/line.js"></script>
	<script type="text/javascript"  src="<%=request.getContextPath()%>/echars/dist/echarts.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/echars/asset/js/esl/esl.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/tab/sssj_util.js"></script>
	
	<script type="text/javascript" src="${ctx}/newNavIndex/js/highcharts.js"></script>
	<script type="text/javascript" src="${ctx}/newNavIndex/js/portal_v2.js?v2"></script>
	<script type="text/javascript" src="${ctx}/newNavIndex/js/jt-index.js?v3"></script>
	
	<script type="text/javascript"  src="${ctx}/newNavIndex/js/charts.js?v1"></script>

	
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
			
				document.getElementById('org').style.background = 'none';
			} else {

				
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