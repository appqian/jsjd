$(document).ready(function(){

 if (!window.location.origin) {
         window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
   }
  var ctx = window.location.origin;
  var href = parent.document.getElementById("index_page").contentWindow.location.href;
  //var orgId="c21834b4-1cb0-490f-a2a8-deeaf7f7e065";
  var orgId = localStorage.getItem("orgid_baobiao");
  if(orgId=="a61365e2-969d-4352-b3f8-805027ab9f1d"){
        orgId="";
  }
  var year ="";
  if(year==undefined || year==""){
      year=new Date().getFullYear();
  }
  var tabhref;

  getdatas(orgId,year);
  function getdatas(orgId,year){
        var url = ctx + "/jsjd/benchmark/getBenchmarkStationBaseInfo.do?orgId=" + orgId + "&year=" + year;
        //ajax获取数据data
        $.ajax({
            url: url,	
            type:"post",	
            success: function(data){	
                $("#detail").html(load(data["result"]["pagedata"]));
                $(document).on('click','.tj',function(){
            		//限制提交的条件 1.状态为待提交的2.撤回的 3.驳回的
            		var checkedBox = $(this);
            		
            		var status   = checkedBox.attr("data-status");
            		if(status!='A'&&status!='R'&&status!='D'&&status!='F'&&status!='H'&&status!='G'){
            			Ext.MessageBox.alert('提示','只有未提交、撤回、驳回状态才可以提交流程');
            			return ;
            		}
            		var applyCode = checkedBox.parent().siblings().eq(1).html();
            		var applyName = checkedBox.parent().siblings().eq(3).text();
            		var orgId     = checkedBox.attr("data-org");
            		var applyId   = checkedBox.attr("data-app");
            		console.log(applyCode);
            		console.log(applyName);
            		console.log(orgId);
            		console.log(applyId);
            		var json={applyCode:applyCode,applyName:applyName,orgId:orgId,applyId:applyId};
            		console.log(json);
            		startAndSubmitByEntityCode(
            				'DUIBIAOGUANLI',
            				json,
            				function(e) {
            					console.log(e);
            					if(e.flag !=0)
            					{
            						console.log(e);
            						Ext.Msg.alert('提示','流程提交失败!')
            						return ;
            					}
            					var instCode = e.instanceCode;
            					Ext.Ajax.request({
            		                url:window.location.origin+"/jsjd/benchmark/addInstCode.do",
            		                headers: {
            		                    'userHeader': 'userMsg'
            		                },
            		                params: {applyId:applyId,instCode: instCode },
            		                method: 'POST',
            		                success: function (response, options) {
            		                    Ext.MessageBox.alert('成功',"流程提交成功");
            		                    $("#query").click();
            		                },
            		                failure: function (response, options) {
            		                    Ext.MessageBox.alert('失败', '流程编码更新失败');
            		                }
            		            });
            		});
            	});
            	//查看流程
                $(document).on('click','.checkProcess',function(){
            		var checkedBox = $(this);
            		var status   = checkedBox.attr("data-status");
            		if(status=='A'){
            			Ext.MessageBox.alert('提示','流程未提交无法查看流程');
            			return ;
            		}
            		var instCode   = checkedBox.attr("data-instcode");
            		console.log(instCode);
            		showMonitorPage(instCode);
            	});
            	
            	//撤销流程
            	$(document).on('click','.reCallProcess',function(){
            		var checkedBox = $(this);
            		//状态不为A可以撤销提交
            		var instCode   = checkedBox.attr("data-instcode");
            		var status   = checkedBox.attr("data-status");
            		console.log('status='+status);
            		if(status=='A'||status=='R'||status=='F'||status=='D'||status=='G'||status=='H')
            		{
            			Ext.MessageBox.alert('提示','未提交、撤销、驳回的流程不可以撤销');
            			return;
            		}
                	revokeByInstanceCode(instCode,function(e){
                    	//Ext.Msg.alert('提示',e.msg);
                    	console.log(e);
                    	if(e.flag==1)
                    	{
                    		Ext.MessageBox.alert('撤销失败',e.msg);
                    		return ;
                    	}
                    	//修改业务表里的状态
                    	Ext.Ajax.request({
                            url:window.location.origin+"/jsjd/benchmark/revokeProcessByInstCode.do",
                            headers: {
                                'userHeader': 'userMsg'
                            },
                            params: {instCode: instCode },
                            method: 'POST',
                            success: function (response, options) {
                                Ext.MessageBox.alert('成功',"流程撤消成功");
                                $("#query").click();
                            },
                            failure: function (response, options) {
                                Ext.MessageBox.alert('失败', '流程状态电厂更新更新失败');
                                $("#query").click();
                            }
                        });
                  	});
            	}); 	
           
                if(orgId==""){
                    $(".tj").css("display","none");
                    $(".reCallProcess").css("display","none");
                 /*   $(".wu").addClass("wu_main") .removeClass("wu_main1");
                    $(".wu_left").css("display","block");
                    getTree();*/
                    
                }
               

                var new_date = new Date().getMonth()+1;
                if(new_date==1 || new_date==2|| new_date==3){
                     $("#detail tr").find("a").contents().unwrap(); 
                     $("#detail tr .tj").addClass("disabled").removeClass("tj");
                     $("#detail tr .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                }
                if(new_date==4 || new_date==5|| new_date==6){
                     $("#detail tr td").not(".ji1").find("a").contents().unwrap();
                     $("#detail tr td").not(".btn1").find(".tj").addClass("disabled").removeClass("tj");
                     $("#detail tr td").not(".btn1").find(".reCallProcess").addClass("disabled").removeClass("reCallProcess");
                }
                if(new_date==7 || new_date==8|| new_date==9){  
                     $("#detail tr .ji3").find("a").contents().unwrap();     
                     $("#detail tr .ji4").find("a").contents().unwrap(); 
                     $("#detail tr .btn3 .tj").addClass("disabled").removeClass("tj");
                     $("#detail tr .btn3 .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                     $("#detail tr .btn4 .tj").addClass("disabled").removeClass("tj");
                     $("#detail tr .btn4 .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                }
                if(new_date==10 || new_date==11|| new_date==12){
                     $("#detail tr .ji4").find("a").contents().unwrap();   
                     $("#detail tr .btn4 .tj").addClass("disabled").removeClass("tj");
                     $("#detail tr .btn4 .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                }
                
                
                function getTree() {
                   // var org_id = localStorage.getItem("orgid");
                    var url = ctx +"/jsjd/benchmark/getStationTree.do";	
                    var data1="";
                    $.ajax({
                        type: "GET",
                        url: url,		
                        dataType:"JSON",
                        success: function(data){		
                            data1=data;
                        },
                        complete:function(msg){
                            var setting = {
                                    callback: {
                                        onClick: zTreeOnClick
                                    }
                            };
                            $.fn.zTree.init($("#tree"), setting, data1);
                            var org_name = "";
                            //默认展开机组；
                            $("#tree_1_switch").click();
                            user_org_id=localStorage.getItem("orgid_baobiao");
                            //默认显示电厂的相关信息；
                            if(user_org_id =="c21834b4-1cb0-490f-a2a8-deeaf7f7e065"){
                                org_name = "岱海发电"
                            }
                            if(user_org_id =="472212af-1977-462b-a74a-a1f36ed6562d"){
                                            
                                org_name = "宁东发电"
                            }
                            if(user_org_id == "a61365e2-969d-4352-b3f8-805027ab9f1d"){
                                org_name = "京能集团"
                            }			 
                            
                            $("#tree").find(".node_name").each(function(){
                                var $this = $(this)
                                if($this.html() == org_name ){
                                    $this.click();
                                    if(user_org_id!="a61365e2-969d-4352-b3f8-805027ab9f1d"){
                                        $this.parent().siblings().click();
                                    }
                                }
                            })
                        }
                    })
                }
                function zTreeOnClick(ev, treeId, treeNode) {	
                    var event = ev || window.event;
                    var g_id = $(event.target).parent().parent().parent().siblings().parent().parent().siblings().text();
                    var special_id = $(event.target).parent().parent().parent().siblings().text();
                    var name = treeNode.name;
                }}
        }); 
        function load(data) {
            var htmlArray = [];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var j = i + 1;
                var auditStatus = d["auditStatus"];
                if(orgId==""){
                    tabhref="table-look";
                }
                if(auditStatus=="A"||auditStatus=="D"||auditStatus=="G"||auditStatus=="H"||auditStatus=="R"){
                    if(orgId!=""){
                       tabhref="table";
                    }
                }
                if(auditStatus=="B"||auditStatus=="C"||auditStatus=="E"||auditStatus=="F"){
                    tabhref="table-look";
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
                var oTime = getMyDate(d["submitTime"]);
                if(oTime=="1970年01月01日"){
                    oTime="--";
                }
                var submitUser = d["submitUser"];
                if(submitUser=="" ||submitUser==null){
                    submitUser="--"
                }
                auditStatus=explainStatus(auditStatus); 
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
               // htmlArray.push("<tr><td><input name='kaohe' type='radio' class='tdCheck' data-instcode='"+d["instCode"]+"' data-status='"+d["auditStatus"]+"'  data-org='"+d["orgId"]+"'  value='"+d["applyId"]+"'></td><td>" + j + "</td><td>" + d["applyCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;cursor: pointer;'id=" + d["applyId"] + " class='ji"+d["quarter"]+"'><a href='"+tabhref+".html?applyId="+d['applyId']+"' style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + d["orgInfo"]["orgName"] + "</td><td>" +auditStatus + "</td><td>"+oTime+"</td><td>"+ submitUser+"</td></tr>");
                htmlArray.push("<tr><td>" + j + "</td><td>" + d["applyCode"] + "</td><td>" + quarter + "</td><td style='max-width:300px;cursor: pointer;'id=" + d["applyId"] + " class='ji"+d["quarter"]+"'><a href='"+tabhref+".html?applyId="+d['applyId']+"' style='color: #177eda;'>" + d["benchmarkName"] + "</a></td><td>" + d["orgInfo"]["orgName"] + "</td><td>" +auditStatus + "</td><td>"+oTime+"</td><td>"+ submitUser+"</td><td class='btn"+d["quarter"]+"'><button class='form-control col-sm-1 btn btn-default jt tj' type='button' style='margin:5px 5px 0 10px;height:25px;line-height: 18px;padding: 0px;width: 70px;float: inherit;' data-toggle='modal' data-target='#myModal' data-instcode='"+d["instCode"]+"' data-status='"+d["auditStatus"]+"'  data-org='"+d["orgId"]+"'  data-app='"+d["applyId"]+"' >提交流程</button><button class='form-control col-sm-1 btn btn-default reCallProcess' type='button' style='margin: 5px 5px 0;height:25px;line-height: 18px;padding: 0px;width: 70px;float: inherit;'data-instcode='"+d["instCode"]+"' data-status='"+d["auditStatus"]+"'  data-org='"+d["orgId"]+"' data-app='"+d["applyId"]+"'>撤回</button> <button class='form-control col-sm-1 btn btn-default checkProcess' type='button' style='margin: 5px 5px 0;height:25px;line-height: 18px;padding: 0px;width: 70px;float: inherit;' data-instcode='"+d["instCode"]+"' data-status='"+d["auditStatus"]+"'  data-org='"+d["orgId"]+"' data-app='"+d["applyId"]+"'>流程监控</button></td></tr>");
            } 
            return htmlArray.join("");
        }
        
        	
        $("#query").click(function(){
            var startTime = $("#startTime").val();
            var url = ctx + "/jsjd/benchmark/getBenchmarkStationBaseInfo.do?orgId="+orgId+"&year="+startTime;
            $.ajax({
                url: url,	
                type:"post",	
                success: function(data){	
                    $("#detail").html(load(data["result"]["pagedata"]));
                    var new_date = new Date().getMonth()+1;
                    if(new_date==1 || new_date==2|| new_date==3){
                         $("#detail tr").find("a").contents().unwrap(); 
                         $("#detail tr .tj").addClass("disabled").removeClass("tj");
                         $("#detail tr .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                    }
                    if(new_date==4 || new_date==5|| new_date==6){
                         $("#detail tr td").not(".ji1").find("a").contents().unwrap();
                         $("#detail tr td").not(".btn1").find(".tj").addClass("disabled").removeClass("tj");
                         $("#detail tr td").not(".btn1").find(".reCallProcess").addClass("disabled").removeClass("reCallProcess");
                    }
                    if(new_date==7 || new_date==8|| new_date==9){  
                         $("#detail tr .ji3").find("a").contents().unwrap();     
                         $("#detail tr .ji4").find("a").contents().unwrap(); 
                         $("#detail tr .btn3 .tj").addClass("disabled").removeClass("tj");
                         $("#detail tr .btn3 .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                         $("#detail tr .btn4 .tj").addClass("disabled").removeClass("tj");
                         $("#detail tr .btn4 .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                    }
                    if(new_date==10 || new_date==11|| new_date==12){
                         $("#detail tr .ji4").find("a").contents().unwrap();   
                         $("#detail tr .btn4 .tj").addClass("disabled").removeClass("tj");
                         $("#detail tr .btn4 .reCallProcess").addClass("disabled").removeClass("reCallProcess");
                    }
                }
            }); 
        })

        //解析审核流程
        function explainStatus(status)
        {
        	switch(status)
        	{
        	  case "A" :status="未提交"; break; 
        	  case "B" :status="待电厂部门审核";break;
        	  case "C" :status="<font color='green'>部门审核通过</font>";break;
        	  case "E" :status="<font color='green'>厂级审核通过</font>";break;
        	  case "F" :status="<font color='green'>集团审核通过</font>";break;
        	  case "D" :status="<font color='red'>部门初审驳回</font>";break;
        	  case "G" :status="<font color='red'>厂级审核驳回</font>";break;
        	  case "H" :status="<font color='red'>集团审核驳回</font>";break;
        	  case "R" :status="撤回";break;
        	}
        	return status;
        }
    }
})

  






