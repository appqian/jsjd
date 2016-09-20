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

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>京能集团实时技术监督系统</title>
	<!-- <meta http-equiv="X-UA-Compatible" content="chrome=1"> -->
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="renderer" content="webkit">
  <link rel="stylesheet" type="text/css" href="css/style1-14.css"/>
  <link rel="stylesheet" type="text/css" href="../webbuilder/controls/ext/resources/css/ext-all.css"/> 
  <link rel="stylesheet" type="text/css" href="css/tishi.css"/>
	<link rel="stylesheet" type="text/css" href="css/wj0201.css"/>
</head>

<body style="overflow-y:hidden;">
<%
  HashMap map = (HashMap) session.getAttribute("XzSessionVars");
  String _userId = (String) map.get("userId");
  String _userName = (String) map.get("userName");
  String _empName = (String) map.get("empName");
  String path = request.getContextPath();
%>
<input id="dd" type="hidden" value=<%=_userId%>>
<input id="url" type="hidden" value="">
<input id="userName" type="hidden" value=<%=_userName%>>
<input id="empName" type="hidden" value=<%=_empName%>>
<div id="main" class="fl">
     <section class="logo">
        <div id="logo">
        </div>
        <div class="fl logo2" >
            	京能集团实时技术监督系统
        </div>
        <div class="fr" style='height:50px;'>
          <div class="fl" style="margin-right:50px">
            <div id="usermingzi"></div>
          </div>
          <div class="fl" style="width: 158px;color: #666666;line-height: 23px;cursor:pointer" id="fangke">
            <div id="total">当前在线：1&nbsp;人</div>
            <div id="userCount">累计访问：10&nbsp;次</div>            
          </div>  
        
          <div class="fl" style="position:relative;">
             <div class="border_radius" style="position:absolute;right:4px"></div>
              <div class="daibanNum">0</div>
            <a class="daiban" title="我的待办" target="page" href="javascript:void(0);" secmenuid="9cb71b52-d75a-4408-a892-740ce38188eb" onclick="loadMenuTreeNext_Sec(event,&quot;9cb71b52-d75a-4408-a892-740ce38188eb&quot;, &quot;F&quot;, &quot;/main?xwl=23VKVPUL841Y&quot;, &quot;我的待办&quot;,this);">
              <img src="img/tu1-1.png" width="25px" height="20px">
            </a>
          </div>
		      <div class="fl" style="position:relative">
          <div class="border_radius"></div>
         <div id="shumu" style="position:absolute;color:#fff;top:5px;right: 4px;width: 28px;height: 20px;text-align: center;">0</div>
        		<a class="tongzhi"  href="javascript:void(0)" title='通知公告'>
           
              	<div class="wj_tongzhi" style="left:25%; top: 150px; width:700px;min-height:390px;" title="通知公告">
                	<div class="drsMoveHandle"><span></span><h1>通知（公告）内容</h1><b id="tongzi" <%--  onclick="parent.click_a('<%=path%>/main?xwl=23WPD5TO7KQ1')" --%>>更多</b></div>
                  <div class="linecontent">
  			  
    			        <table class="wu_tab1">
                    <thead>
                      <tr>
                        <td>通知（公告）内容</td>
                        <td>发布单位</td>
                        <td>发布时间</td>
                      </tr>
                    </thead>
                    <tbody id="JTtz">
                    </tbody>
                  </table>
  			        </div>
              </div>
            </a>

        	</div>

        	<div class="fl" title ='修改密码'  >
        		<a class="changePW" onclick="changePWD()" href="javascript:void(0)"></a>
        	</div>
        	<div class="fl" style="height:70px;width:82px;" title='注销'>
        		<a class="logOut" onclick="logout(event)" href="javascript:void(0)"></a>
        	</div>
        
        
        </div>

    </section>
    <div class="clearfix"></div>
    <div class="du_top">

      <dl class="navFirst" id="navFirst">
  			
		  </dl>
		
     
        <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
	
	
   
   
 <iframe id="index_page" class="iframeCon"  name="page" frameborder="0" style="width:100%;overflow:auto;"></iframe>


</div>
<div class="clearfix"></div>
<!-- 注销提示框Begin -->
	<div id="logoutcheck" class="cd-popup" role="alert">
		<div class="cd-popup-container">
			<p>您确定要注销系统返回登录吗?</p>
			<ul class="cd-buttons">
				<li><a href="javascript:void(0);" onclick="logoutYes()">Yes</a></li>
				<li><a href="javascript:void(0);" onclick="logoutNo(event)">No</a></li>
			</ul>
			<a href="#0" id="logoutcheck-container" class="cd-popup-close img-replace">Close</a>
		</div>
	</div> 
	<div class="clearfix"></div>
	<!-- 注销提示框End -->

<script src="../webbuilder/controls/ext/ext-all.js" type="text/javascript"></script>
 <!--  <script type="text/javascript" src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
  <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.6.4/jquery.min.js"></script>
 -->
 <script src="../common/js/jquery.min.js"></script>
 
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/wj0201.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="../platform/util/platformUtil.js"></script>
<script type="text/javascript" src="js/monitor.js"></script>
<!--<script src="../newNav/newmain/newmain.js" type="text/javascript" charset="utf-8"></script>-->
<script type="text/javascript">
//var winHeight = $(window).height()-20;
 // $("#index_page").css({height:winHeight});
</script>

</body>
</html>