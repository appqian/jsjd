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
rootpath();
var rootPath = $('#url').val();
var data1={};
$(".level1").show();
$(".level4").hide();
$(".wu_top").hide();
$("#table1_huizong").hide();
$("#Pagination").hide();
$(".wu_main").css({"marginTop":23});
$('#lh_name').html("岱海电厂");
function getTree() {
    var org_id = localStorage.getItem("orgid");
    var url=(org_id == "a61365e2-969d-4352-b3f8-805027ab9f1d") ? rootPath + "/portal/getJTSYTreeMenu.do" : rootPath　 + 　"/portal/getSYTreeMenu.do?orgid=" + org_id;
    getTreeData(url);
}
function getTreeData(url){
    $.ajax({
        type: "GET",
        url: url,
        dataType:"JSON",
        success: function(data){
            var setting = {callback: {onClick: zTreeOnClick}};
            $.fn.zTree.init($("#tree"), setting, data);
            $("#tree_1_switch").click();//默认展开机组
            $("#tree_1_span").click();//默认显示电厂的相关信息
        }

    })
}

getTree();


function ajax(url, tableId, columns) {
    $.ajax({
        url : url,
        type:"post",
        dataType : "json",
        success : function(data) {
            var tableHtml = '';
            if(data&&data.length>0){
                
                tableHtml = prearData(data, columns);
                
            }
            $("#" + tableId).html(tableHtml);
           
        }
    });
}
function prearData(data, columns) {
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        htmlArray.push("<tr>");
        for (var j = 0;j < columns.length; j++) {
        	if(j==0){
        		k=i+1;
        		htmlArray.push("<td >"+k+"</td>");
        	}else{
        		 var columnValue = getColumnValue(columns[j], d[columns[j]]);
                 htmlArray.push("<td title=" + columnValue + ">" + columnValue + "</td>");
        	}
           
        }
    }
    htmlArray.push("</tr>");
    return htmlArray.join('');
}

function getColumnValue(column, columnValue) {
   
    if(column =='W_DATE'){
        columnValue = columnValue.replace(/\s/g,"&#13;")
    }
    if(column == "gId"){
    	if(Number(columnValue)){
    		columnValue = "#"+columnValue;
    	}
    	
    }
    	
    
    return columnValue;
}
var query_flag=true;
//查询事件

$("#submit").on("click",function(){
	var g_id=sessionStorage.getItem("g_id");
	query_flag=true;
	query_sy(event,1,g_id);
	$("#Pagination_query").show();
});
$("#submit").click();
//level1        查询=====================================================
function query_sy(event,pageNum,gid){
	var orgId = sessionStorage.getItem("orgid");
	var g_id    = $("#g_id").val();
	var spec_id = $("#spec_id").val();
	var name    = $("#name").val();
	var startTime = $("#startTime").val();
    var endTime   = $("#endTime").val();
    var conditionType = $("#add_type").val();
    if(!name){
    	name = ""; 
    }
    if(!$("#g_id").val()){
		g_id=gid;
	}
    if(!g_id){
    	g_id="";
    } 
    data1 = {
  		  "pageSize"    :7,  //页大小
  		  "pageNum"     :pageNum,   //当前页
  		  "orgId"       :orgId, //组织
  		  "gId"         :g_id,//机组
  		  "specialId"   :spec_id,//专业
  		  "name"		:name,//轮换名称
  		  "beginStart"  :startTime, 
  		  "endStart"    :endTime,
  		 "conditionType":conditionType
  		};
    var url = rootPath+"/portal/getsydetailinfo.do"
    $.ajax({
        url:url,
		type:"POST",
		contentType:"application/json",
		data:JSON.stringify(data1),
        success: function(data) {
        	var page = Math.ceil(data.total/7);
        	//分页 
        	if(!page){
        		$("#Pagination_query").hide();
        	}else{
        		$("#Pagination_query").show();
			}
			if(query_flag){
				initPagination1(page);//分页加载
			}
        	query_flag=false;
        	$("#level1_query").html("");
        	$("#level1_query").html(querypre(data.pagedata));
          
        } 
      })
    
}
var initPagination1 = function(page) {
   	var num_entries = page;
  	// 创建分页
  	$("#Pagination_query").pagination(num_entries, {
	    num_edge_entries: 1, //边缘页数
	    num_display_entries: 4, //主体页数
	    callback: pageselectCallback_query,
	    items_per_page: 1, //每页显示1项
	    prev_text: "前一页",
	    next_text: "后一页"
  	});
};


function pageselectCallback_query(page_index, jq){
	/*if(page_index==0){
		return;
	}*/
	var g_id=sessionStorage.getItem("g_id");
	query_sy(event,page_index + 1,g_id);
  	return false;
}

//时间对象处理函数 
/*@para time 毫秒
* return 2016-6-13
*/	
function timefixed(time){
	var date= new Date(time);
	return date.toLocaleDateString();
}
function querypre(data){
	var htmlArray =[];
	if(data.length<=0){
		return;
	}
	
	for(var i = 0;i<data.length;i++){
		d = data[i];
		var j=i+1;
		if(Number(d.gId)){
			d.gId = "#"+d.gId;
		}
		
		var fun ="onclick='chuantou("+JSON.stringify(d)+")'";
		htmlArray.push("<tr "+fun+"><td >"+j+"</td><td>"+d.gId+
				"</td><td style='text-align:left'>" + d.name+ "</td><td>" + timefixed(d.startTime)+ "</td><td>" + d.ysCount+ "</td><td>" + d.yCount+ "</td><td>" + d.msCount+ "</td><td>" + d.mCount+ "</td><td>" + d.fCount+ "</td></tr>");
	}
	
	return htmlArray.join(''); 
}	
function chuantou(d){
    var flag=true;
    
    $("#Pagination_query").hide();
    $(".select").hide();
    $("table.level1").hide();
    $(".wu_top").show();
    $("table.level4").show();
    $(".wu_top1").show();
    $("#table1_huizong").show();
    $("#Pagination").show();


    $(".wu_main").css({"marginTop":112});
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
        expr(page_index + 1);
        return false;
    }
    var name=name = encodeURIComponent(trim(d.name));
    var url = rootPath + "/portal.do?name="+name;
    expr(1);
    function expr(pagenum){
        $.ajax({
            url: url,
            type: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: "json",
            data: {
                method: "getSYTime",
                org_id: sessionStorage.getItem("orgid"),
                year:'',
                month:'',
                g_id:  d.gId.slice(1),
                special_id: d.professionName,
               // name:d.name,
                ispage:true,
                pagenum:pagenum,
                pagesize:5
            },
            success: function(data) {
                $("#sblhcounter").html("");
                var page = Math.ceil(data.total/5)
                if(flag){
                    initPagination(page);//分页加载
                }
                flag=false;
                $('#sblhcounter').html(prepearData(data.exper));
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
                var d_flag= true;
                //弹窗淡入淡出
                $(".zhexian").on("click",

                    function(event) {
                        var i = $(this).parent().index() -1 ;
                        //console.log($(this).parent().index());

                        var dataT = $(this).find('.drsMoveHandle').get(0).id;
                        var arr = dataT.split(";");
                        var code = arr[0];
                        var name = arr[1];
                        var starttime = arr[2];
                        var endtime = arr[3];
                        //console.log(name);

                        if(d_flag){
                            sbjiaohu("zx"+i,code,name,starttime,endtime);
                            d_flag = false;
                        }
                        $(this).children(".lineDiv").fadeIn();
                        var index = $(this).index();
                    }
                );
                //弹出层关闭按钮
                $(".drsMoveHandle span").bind("click",
                    function(event) {
                        $(this).parent().parent(".lineDiv").fadeOut();
                        event.stopPropagation();
                    }
                )
            }
        });

    }
    $.ajax({
        url: url,
        type: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        data: {
            method: "getSYCount",
            org_id: sessionStorage.getItem("orgid"),
            g_id: d.gId.slice(1),
            special_id: d.professionName
        },
        success: function(data) {
            var data_level4 = data.lhlist[0];
            //console.log(data_level4 );
            //console.log(data_level4.length);
            var table1_huizong_td = $("#table1_huizong").find("td");
            var header_h3 = $('.wu_top1').find("h3");
            var lh_name = $('#lh_name');

            if (data.lhlist.length == 0) {
                table1_huizong_td.each(function(i) {
                    if (i > 4) {
                        $(this).html("暂时无数据");
                    }

                });
                lh_name.html("");
                header_h3.each(function() {
                    $(this).html("");
                });
                lh_name.html("本条记录无数据");
            }

            if (data.lhlist.length !== 0) {
                /*轮换说明*/
                header_h3.eq(0).html(data_level4.validbasic);
                header_h3.eq(1).html(data_level4.lhmethod);
                header_h3.eq(2).html(data_level4.systemlogic);
                header_h3.eq(3).html(data_level4.startbasic);
                header_h3.eq(4).html(data_level4.endbasic);

                /*轮换的名称*/
                lh_name.html(d.name);

                /*轮换的具体数据*/
                table1_huizong_td.eq(5).html(data_level4.yscount);
                table1_huizong_td.eq(6).html(data_level4.ycount);
                table1_huizong_td.eq(7).html(data_level4.mscount);
                table1_huizong_td.eq(8).html(data_level4.mcount);
                table1_huizong_td.eq(9).html(data_level4.noexper);

            }

        }

    })
}





function zTreeOnClick(ev, treeId, treeNode) {
	
	var event = ev || window.event;
	var g_id = $(event.target).parent().parent().parent().siblings().parent().parent().siblings().text();
	var special_id = $(event.target).parent().parent().parent().siblings().text();
	var name = treeNode.name;
	switch (treeNode.level) {
		//电厂级别
		case 0:
			g_id = "";
			special_id = "";
			if(name == "岱海发电"){
				sessionStorage.setItem("orgid", "c21834b4-1cb0-490f-a2a8-deeaf7f7e065");	
			}else if(name == "宁东发电"){	
				sessionStorage.setItem("orgid", "472212af-1977-462b-a74a-a1f36ed6562d");
			}			
			name = "";
			//console.log(1);
			level1();
			break;
			//机组级别
		case 1:
			g_id = name.substring(1, 2);
			special_id = "";
			sessionStorage.setItem("g_id", g_id);
			name = "";
			level2();
			break;
			//专业级别
		case 2:
			g_id = special_id.substring(1, 2);
			sessionStorage.setItem("g_id", g_id);
			special_id = name;
			name = "";
			
			break;
			//试验名称级别
		case 3:
			g_id = g_id.substring(1, 2);
			//console.log('4')
			level4();
			break;
		default:
			g_id = "";
			special_id = "";
			name = "";
			break;
	}
	
//level1 && level2 are some interface;
	//leve2 new=====================================================
	function level2(){
		
		$("#Pagination_query").show();
		$(".select").show();
		
		$("table.level1").show();
		$("table.level4").hide();
		$(".wu_top").hide();
		$(".wu_top1").hide();
		$("#table1_huizong").hide();
		$("#Pagination").hide();
		$(".wu_main").css({"marginTop":23});
		$('#lh_name').html(treeNode.name);
		$("#wu_top1").hide();
		
		var orgId = sessionStorage.getItem("orgid")
		var url = rootPath + "/portal/getSYSummaryInfo.do?orgId="+orgId+"&gId="+g_id;
		ajax(url,"level1",["x","gId","ysCount","yCount","msCount","mCount","fCount"]);
		$("#g_id").html("").fadeOut().siblings().fadeOut();
		//console.log(g_id);
		addzy(g_id);//加载专业
		query_flag=true;
		query_sy(event,1,g_id);//执行查询
	}
	//level1=====================================================
	function level1(){
		sessionStorage.setItem("g_id", "");
		$("table.level1").show();
		$("table.level4").hide();
		$(".wu_top").hide();
		$(".wu_top1").hide();
		$("#table1_huizong").hide();
		$("#Pagination").hide();
		$(".wu_main").css({"marginTop":23});
		$('#lh_name').html(treeNode.name);
		$("#wu_top1").hide();
		var orgId = sessionStorage.getItem("orgid");
		var url = rootPath + "/portal/getSYSummaryInfo.do?orgId="+orgId;
		ajax(url,"level1",["x","gId","ysCount","yCount","msCount","mCount","fCount"]);
		$("#g_id").html("").fadeIn().siblings().fadeIn();
		addjz();
		addzy();
		query_flag=true;
		$("#submit").click();
	}
	//根据电厂 添加机组========================================================
	
	function addjz(){
		$("#g_id").html("<option value=''></option>");
		var orgId = sessionStorage.getItem("orgid")
		var url = rootPath +"/portal/getSyJzInfo.do?orgId="+orgId;
		$.ajax({
			url:url,
			type:"POST",
			success:function(data){
				var arr = [];
				for(var i in data){
					arr.push(data[i]);
				}
				arr.sort()//机组排序
				//机组信息插入到页面当中
				for(var i = 0;i<arr.length;i++){ 
					var j = i+1;
					$("#g_id").append("<option value='"+j+"'>#"+arr[i]+"</option>");
				}
			}
		})
	}
	//机组改变的时候加载对应的专业！==================================================
	$("#g_id").on("change",function(){
		addzy(g_id);
		$("#spec_id").html("")
		query_flag = true;//重新加载分页
	})
	
	$("#spec_id").on("change",function(){
		//addzy(g_id);
		query_flag = true;//重新加载分页
	})
	//根据=电厂=机组=添加专业============================================================
	function addzy(gid){
		$("#spec_id").html("<option value=''></option>");
		var orgId = sessionStorage.getItem("orgid");
		var g_id = $("#g_id").val();
		if(!$("#g_id").val()){
			g_id=gid
		}
		if(!g_id){
			g_id=1;
		}
		var url = rootPath +"/portal/getSyZyInfo.do?orgId="+orgId+"&gId="+g_id;
		$.ajax({
			url:url,
			type:"POST",
			success:function(data){
				for(var key in data){
					$("#spec_id").append("<option value='"+key+"'>"+ifFix(data[key])+"</option>");
				}		
			}
		})
	}
	
	function ifFix(x){
		return x.replace(/专业/,"")
	}
				
	
	
	
	function level4(){
		var flag=true;
		
		//$(".select_box").show();
		$("#Pagination_query").hide();
		$(".select").hide();
		
		$("table.level1").hide();
		$(".wu_top").show();
		
		$("table.level4").show();
		$(".wu_top1").show();
		$("#table1_huizong").show();
		$("#Pagination").show();

		$(".wu_main").css({"marginTop":112});
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
			expr(page_index + 1);
		  	return false;
		}

		name = encodeURIComponent(trim(name));
		var url = rootPath + "/portal.do?name=" + name;
		expr(1);
		//level4 轮换详情；
		function expr(pagenum){
			$.ajax({
				url: url,
				type: "POST",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: "json",
				data: {
					method: "getSYTime",
					org_id: sessionStorage.getItem("orgid"),
					g_id: g_id,
					special_id: special_id,
					year:'',
             		month:'',
					ispage:true,
					pagenum:pagenum,
					pagesize:5			
				},
				success: function(data) {
					$("#sblhcounter").html("");
					var page = Math.ceil(data.total/5)
					if(flag){
						initPagination(page);//分页加载
					}
					flag=false;
					
					$('#sblhcounter').html(prepearData(data.exper));//处理ajax返回的数据添加到html中
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
					var d_flag= true;
					//弹窗淡入淡出
					$(".zhexian").on("click",

						function(event) {

							var i = $(this).parent().index() -1 ;
							//console.log($(this).parent().index());

							var dataT = $(this).find('.drsMoveHandle').get(0).id;
							var arr = dataT.split(";");
							var code = arr[0];
							var name = arr[1];
							var starttime = arr[2];
							var endtime = arr[3];
							
							if(d_flag){
								sbjiaohu("zx"+i,code,name,starttime,endtime);
								d_flag = false;
								
							}

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
				} 
			});
			
		}

		//level4 轮换信息；
		$.ajax({
			url: url,
			type: "POST",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			data: {
				method: "getSYCount",
				org_id: sessionStorage.getItem("orgid"),
				
				g_id: g_id,
				special_id: special_id
			},
			success: function(data) {

				var data_level4 = data.lhlist[0];
				//console.log(data_level4);
				//console.log(data_level4.length);
				var table1_huizong_td = $("#table1_huizong").find("td");
				var header_h3 = $('.wu_top1').find("h3");
				var lh_name = $('#lh_name');

				if (data.lhlist.length == 0) {
					table1_huizong_td.each(function(i) {
						if (i > 4) {
							$(this).html("暂时无数据");
						}

					});
					lh_name.html("");
					header_h3.each(function() {
						$(this).html("");
					});
					lh_name.html("本条记录无数据");
				}

				if (data.lhlist.length !== 0) {
					/*轮换说明*/
					header_h3.eq(0).html(data_level4.VALID_BASIC)
					header_h3.eq(1).html(data_level4.LH_METHOD);
					header_h3.eq(2).html(data_level4.SYSTEM_LOGIC);
					header_h3.eq(3).html(data_level4.START_BASIC);
					header_h3.eq(4).html(data_level4.END_BASIC)

					/*轮换的名称*/
					lh_name.html(treeNode.name);

					/*轮换的具体数据*/
					table1_huizong_td.eq(5).html(data_level4.YSCOUNT);
					table1_huizong_td.eq(6).html(data_level4.YCOUNT);
					table1_huizong_td.eq(7).html(data_level4.MSCOUNT);
					table1_huizong_td.eq(8).html(data_level4.MCOUNT);
					table1_huizong_td.eq(9).html(fixex(data_level4.NOEXPER));
					function fixex(data){
							if(data==0){
								data = "是"
							}else if(data == 1){
								data = "否"
							}
							return data;
					}

				}

			}

		})
        return false;		
	}
	return false;

}
function prepearData(data){
	
	var htmlArray =[];
	htmlArray.push("<tr>");
	
	for(var i = 0;i<data.length;i++){

		var j=i+1;
		var d = data[i];
		//htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].starttime + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%; top: 150px; width:700px; height:365px;'><div class='drsMoveHandle'><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>" + data[i].name + "</td><td>是</td><td><a href='"+rootPath+"/getMainAction.do?method=getLhModel&lh_id="+data[i].id+"'>导出</a></td></tr>")
		htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].STARTTIME + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%;top:150px;width:700px; height:365px;'><div class='drsMoveHandle' id='"+data[i].KKS_CODE+";"+data[i].KKS_NAME+";"+data[i].STARTTIME+";"+data[i].ENDTIEM+"' ><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>说明</td><td>是</td>")
		htmlArray.push('<td onclick=daocu("'+d.ID+'","'+d.EXCEL_ID+'") class="link">导出</td></tr>')

	}
	if(data.length!==5){
		for(var k =data.length;k<5;k++){

			htmlArray.push("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
		}
	}
		
	
	htmlArray.push("</tr>");


	return htmlArray.join('');

}
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;
function daocu(id,type){
	var url = ctx+"/jsjd/SYExportAction.do?method=getSYExport&sy_id="+id;
	var url2  = ""
	
	if(type == "ZK"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f32977bc74015529c597fc0d68&user=admin&password=manager&refresh=true'
	}else if(type == "ZJFM"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f3285e1cc2015528bcd02a0964&user=admin&password=manager&refresh=true' 
	}else if(type == "ZJJZL"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f377a7776001557ad86df40469&user=admin&password=manager&refresh=true' 
	}else if(type == "LQ"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f323a64585015524621c280efa&user=admin&password=manager&refresh=true'
	}else if(type == "SQ"){
		url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f31af9c762015523579e932ab6&user=admin&password=manager&refresh=true'
		
	}
	
	switch(type){
		case "zk":
			url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f32977bc74015529c597fc0d68&user=admin&password=manager&refresh=true'
			break;
		case "ZJFM":
			url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f3285e1cc2015528bcd02a0964&user=admin&password=manager&refresh=true'
			break;
		case "ZJJZL":
			url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f32977bc74015529c597fc0d68&user=admin&password=manager&refresh=true'
			break;
		case "LQ":
			url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f32977bc74015529c597fc0d68&user=admin&password=manager&refresh=true'
			break;
		case "SQ":
			url2 =  ctx+'/spreadsheet/vision/openresource.jsp?paramsInfo=[{"name":"shebeishiqi_id","value":"'+id+'"}]&resid=I4028e4f32977bc74015529c597fc0d68&user=admin&password=manager&refresh=true'
			break;
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


function prepearDatalevel1(data){
	var htmlArray =[];
	htmlArray.push("<tr>");
	for(var i = 0;i<data.length;i++){
		d = data[i];
		var j=i+1;
		htmlArray.push("<tr><td owspan='4'>"+j+"</td><td owspan='4' style='text-align:left'>" + d.name+ "</td>");
		
		for(var k = 0;k < d.result.length ; k++){
			if(k === 0){
				htmlArray.push("<td>#"+d.result[k].G_ID+"</td><td>"+d.result[k].YSCOUNT+"</td><td>"+d.result[k].YCOUNT+"</td><td>"+d.result[k].MSCOUNT+"</td><td>"+d.result[k].MCOUNT+"</td><td>"+d.result[k].FLAG+"</td></tr>")
			}
			else{

			}
		}
		
	}		
	htmlArray.push("</tr>");
	return htmlArray.join('');
}
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//click弹出层
$(".wu_top1 h2").each(function(i) {
	$(this).hover(
		function() {
			$(".wu_top1 h3").hide();
			$(this).parent().find("h3").slideDown();
		},
		function() {
			$(document).click(
				function() {
					$(".wu_top1 h3").slideUp();
				});
			$(".wu_top1 h2,.wu_top1 h3").click(
				function(event) {
					event.stopPropagation();
				}
			);
		}
	);

});

//折线图

var dragresize = new DragResize('dragresize', {
	minWidth: 400,
	minHeight: 250
});

dragresize.isElement = function(elm) {
	if (elm.className && elm.className.indexOf('lineDiv') > -1) return true;
};
dragresize.isHandle = function(elm) {
	if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
};



$(document).ready(
	function() {
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
	}
);



//设备轮换echart

function sbjiaohu(id,pi_codes,names,startime,endtime) {
	
	var code = pi_codes.split(",");
	var name = names.split(",");	
	var sbchulidata =[];
	var sbname=[];
	for(var t=0;t< code.length;t++){
		var url = rootPath + '/XipHistoryAction.do?method=getTecPro&pi_code='+code[t]+'&startTime=' + startime + '&endTime=' + endtime;
		$.ajax({
			url: url,
			async:false,
			success: function(data) {
				//console.log(data);
				var sbchuli = chulihanshu(data,name[t]);
				sbchulidata.push(sbchuli.value);
				sbname.push(name[t]);
				
				//var zhexiantest = document.getElementById('zhexiantest')
				if(t == code.length-1){
			    	var sblhx = chulishijian(startime,endtime);
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
		async : false, //同步执行
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
	return time;		
}
function chulihanshu(data,code_name) {
	var arr = [];
	for (var i = 0; i < data.length; i++) {
		arr.push(data[i]);	
	}
	var arriteam = {
			name: code_name,
			type: 'line',
			//stack: '总量',
			data: arr
		}
	return {
		value: arriteam
	}
}
function sblunhuan(name,time, data,id) {
	times = time;
	var myChart = echarts.init(document.getElementById(id));
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:name
		},
		
		toolbox: {
			show: false,
	        feature: {
	        	dataZoom: {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: (function(times) {
				var arr = [];
				for (var i = 0; i < times.length; i++) {
					//var a = new Date(times[i]);
					//arr.push(a.format("yyyy-MM-dd hh:mm:ss"));
					arr.push((new Date(times[i])).toLocaleString())
				}
				return arr;
			})(times)
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value}'
			}
		},
		series: data
	};
	myChart.setOption(option);

}
Date.prototype.format = function(format) {
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

		}
	}
	return format;
}





$(document).ready(
	function() {
		// js模拟select
		(function($) {
			var selects = $('.choose'); //获取select
			for (var i = 0; i < selects.length; i++) {
				createSelect(selects[i], i);
			}

			function createSelect(select_container, index) {
				//创建select容器，class为select_box，插入到select标签前
				var tag_select = $('<div></div>'); //div相当于select标签
				tag_select.attr('class', 'select_box');
				tag_select.insertBefore(select_container);
				//显示框class为select_showbox,插入到创建的tag_select中
				var select_showbox = $('<div></div>'); //显示框
				select_showbox.css('cursor', 'pointer').attr('class', 'select_showbox').appendTo(tag_select);
				//创建option容器，class为select_option，插入到创建的tag_select中
				var ul_option = $('<ul></ul>'); //创建option列表
				ul_option.attr('class', 'select_option');
				ul_option.appendTo(tag_select);
				createOptions(index, ul_option); //创建option
				//点击显示框
				tag_select.toggle(function() {
					ul_option.slideDown();
				}, function() {
					ul_option.slideUp();
				});
				var li_option = ul_option.find('li');
				li_option.on('click', function() {
					$(this).addClass('selected').siblings().removeClass('selected');
					var value = $(this).text();
					select_showbox.text(value);
					ul_option.slideUp();
				});
				li_option.hover(function() {
					$(this).addClass('hover').siblings().removeClass('hover');
				}, function() {
					li_option.removeClass('hover');
				});
			}

			function createOptions(index, ul_list) {
				//获取被选中的元素并将其值赋值到显示框中
				var options = selects.eq(index).find('option'),
					selected_option = options.filter(':selected'),
					selected_index = selected_option.index(),
					showbox = ul_list.prev();
				showbox.text(selected_option.text());
				//为每个option建立个li并赋值
				for (var n = 0; n < options.length; n++) {
					var tag_option = $('<li></li>'), //li相当于option
						txt_option = options.eq(n).text();
					tag_option.text(txt_option).css('cursor', 'pointer').appendTo(ul_list);
					//为被选中的元素添加class为selected
					if (n == selected_index) {
						tag_option.attr('class', 'selected');
					}
				}
			}
		})(jQuery)
	})



































//弹出窗口拖拽	
//获取并定义树形菜单的高度
var st_height = document.documentElement.clientHeight - 60
document.getElementById("tree").style.height = st_height + "px";
//获取并定义wu_main的margin
var main_mar = $(".wu_top").outerHeight(true)
$(".wu_main").css({
	"margin-top": main_mar + "px"
});

if (typeof addEvent != 'function') {
	var addEvent = function(o, t, f, l) {
		var d = 'addEventListener',
			n = 'on' + t,
			rO = o,
			rT = t,
			rF = f,
			rL = l;
		if (o[d] && !l)
			return o[d](t, f, false);
		if (!o._evts) o._evts = {};
		if (!o._evts[t]) {
			o._evts[t] = o[n] ? {
				b: o[n]
			} : {};
			o[n] = new Function('e',
				'var r=true,o=this,a=o._evts["' + t + '"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');
			if (t != 'unload') addEvent(window, 'unload', function() {
				removeEvent(rO, rT, rF, rL)
			})
		}
		if (!f._i) f._i = addEvent._i++;
		o._evts[t][f._i] = f
	};
	addEvent._i = 1;
	var removeEvent = function(o, t, f, l) {
		var d = 'removeEventListener';
		if (o[d] && !l) return o[d](t, f, false);
		if (o._evts && o._evts[t] && f._i) delete o._evts[t][f._i]
	}
}

function cancelEvent(e, c) {
	e.returnValue = false;
	if (e.preventDefault) e.preventDefault();
	if (c) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation()
	}
};

function DragResize(myName, config) {
	var props = {
		myName: myName,
		enabled: true,
		handles: ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'],
		isElement: null,
		isHandle: null,
		element: null,
		handle: null,
		minWidth: 10,
		minHeight: 10,
		minLeft: -9999,
		maxLeft: 9999,
		minTop: -9999,
		maxTop: 9999,
		zIndex: 4000,
		mouseX: 0,
		mouseY: 0,
		lastMouseX: 0,
		lastMouseY: 0,
		mOffX: 0,
		mOffY: 0,
		elmX: 0,
		elmY: 0,
		elmW: 0,
		elmH: 0,
		allowBlur: true,
		ondragfocus: null,
		ondragstart: null,
		ondragmove: null,
		ondragend: null,
		ondragblur: null
	};
	for (var p in props) this[p] = (typeof config[p] == 'undefined') ? props[p] : config[p]
};
DragResize.prototype.apply = function(node) {
	var obj = this;
	addEvent(node, 'mousedown', function(e) {
		obj.mouseDown(e)
	});
	addEvent(node, 'mousemove', function(e) {
		obj.mouseMove(e)
	});
	addEvent(node, 'mouseup', function(e) {
		obj.mouseUp(e)
	})
};
DragResize.prototype.select = function(newElement) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		if (newElement && (newElement != element) && enabled) {
			element = newElement;
			element.style.zIndex = ++zIndex;
			if (this.resizeHandleSet) this.resizeHandleSet(element, true);
			elmX = parseInt(element.style.left);
			elmY = parseInt(element.style.top);
			elmW = element.offsetWidth;
			elmH = element.offsetHeight;
			if (ondragfocus) this.ondragfocus()
		}
	}
};
DragResize.prototype.deselect = function(delHandles) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		if (delHandles) {
			if (ondragblur) this.ondragblur();
			if (this.resizeHandleSet) this.resizeHandleSet(element, false);
			element = null
		}
		handle = null;
		mOffX = 0;
		mOffY = 0
	}
};
DragResize.prototype.mouseDown = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return true;
		var elm = e.target || e.srcElement,
			newElement = null,
			newHandle = null,
			hRE = new RegExp(myName + '-([trmbl]{2})', '');
		while (elm) {
			if (elm.className) {
				if (!newHandle && (hRE.test(elm.className) || isHandle(elm))) newHandle = elm;
				if (isElement(elm)) {
					newElement = elm;
					break
				}
			}
			elm = elm.parentNode
		}
		if (element && (element != newElement) && allowBlur) deselect(true);
		if (newElement && (!element || (newElement == element))) {
			if (newHandle) cancelEvent(e);
			select(newElement, newHandle);
			handle = newHandle;
			if (handle && ondragstart) this.ondragstart(hRE.test(handle.className))
		}
	}
};
DragResize.prototype.mouseMove = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return true;
		mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
		mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;
		var diffX = mouseX - lastMouseX + mOffX;
		var diffY = mouseY - lastMouseY + mOffY;
		mOffX = mOffY = 0;
		lastMouseX = mouseX;
		lastMouseY = mouseY;
		if (!handle) return true;
		var isResize = false;
		if (this.resizeHandleDrag && this.resizeHandleDrag(diffX, diffY)) {
			isResize = true
		} else {
			var dX = diffX,
				dY = diffY;
			if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
			else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
			if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
			else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
			elmX += diffX;
			elmY += diffY
		}
		with(element.style) {
			left = elmX + 'px';
			width = elmW + 'px';
			top = elmY + 'px';
			height = elmH + 'px'
		}
		if (window.opera && document.documentElement) {
			var oDF = document.getElementById('op-drag-fix');
			if (!oDF) {
				var oDF = document.createElement('input');
				oDF.id = 'op-drag-fix';
				oDF.style.display = 'none';
				document.body.appendChild(oDF)
			}
			oDF.focus()
		}
		if (ondragmove) this.ondragmove(isResize);
		cancelEvent(e)
	}
};
DragResize.prototype.mouseUp = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		var hRE = new RegExp(myName + '-([trmbl]{2})', '');
		if (handle && ondragend) this.ondragend(hRE.test(handle.className));
		deselect(false)
	}
};
DragResize.prototype.resizeHandleSet = function(elm, show) {
	with(this) {
		if (!elm._handle_tr) {
			for (var h = 0; h < handles.length; h++) {
				var hDiv = document.createElement('div');
				hDiv.className = myName + ' ' + myName + '-' + handles[h];
				elm['_handle_' + handles[h]] = elm.appendChild(hDiv)
			}
		}
		for (var h = 0; h < handles.length; h++) {
			elm['_handle_' + handles[h]].style.visibility = show ? 'inherit' : 'hidden'
		}
	}
};
DragResize.prototype.resizeHandleDrag = function(diffX, diffY) {
	with(this) {
		var hClass = handle && handle.className && handle.className.match(new RegExp(myName + '-([tmblr]{2})')) ? RegExp.$1 : '';
		var dY = diffY,
			dX = diffX,
			processed = false;
		if (hClass.indexOf('t') >= 0) {
			rs = 1;
			if (elmH - dY < minHeight) mOffY = (dY - (diffY = elmH - minHeight));
			else if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
			elmY += diffY;
			elmH -= diffY;
			processed = true
		}
		if (hClass.indexOf('b') >= 0) {
			rs = 1;
			if (elmH + dY < minHeight) mOffY = (dY - (diffY = minHeight - elmH));
			else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
			elmH += diffY;
			processed = true
		}
		if (hClass.indexOf('l') >= 0) {
			rs = 1;
			if (elmW - dX < minWidth) mOffX = (dX - (diffX = elmW - minWidth));
			else if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
			elmX += diffX;
			elmW -= diffX;
			processed = true
		}
		if (hClass.indexOf('r') >= 0) {
			rs = 1;
			if (elmW + dX < minWidth) mOffX = (dX - (diffX = minWidth - elmW));
			else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
			elmW += diffX;
			processed = true
		}
		return processed
	}
};

dragresize.ondragfocus = function() {};
dragresize.ondragstart = function(isResize) {};
dragresize.ondragmove = function(isResize) {};
dragresize.ondragend = function(isResize) {};
dragresize.ondragblur = function() {};
dragresize.apply(document);










