



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




//获取用户orgid;

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
getTree();
function getTree() {
	var org_id = localStorage.getItem("orgid");
	var url = rootPath +"/portal/getTreeMenu.do";	
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


//集团视图========================================================
var jt_query=true;
function jtview(){	
	$('.dc').hide();
	$('.jt').show();
	$(".wu_main").css({"marginTop":22});
	//集团级返回到首页 --return 
	$('#fanhui_test').unbind('click').click(function (){
		 window.location.replace(rootPath+"/newNavIndex/portal.jsp")  
	})
	//默认加载 集团 全部
	$('#org_id option').each(function(){
		if(this.value == ""){							
			this.selected = "selected";										
		}
	})
	$('#g_id_jt option').each(function(){
		if(this.value == ""){							
			this.selected = "selected";										
		}
	})
	//年份清空
	$("#annual").val("")
	//集团name 清空
	$("#jt_name").val("");
	//集团汇总	
	$("#lh_name").html("京能集团")
	jt_summary()
	//集团detail
	jt_detail(1);
	jt_query=true;
}
//集团查询
$("#jt_submit").click(function(){
	jt_detail(1);
	jt_query=true; 
});
$('#org_id').change(function(){
	var org_id = $(this).val();
	addjz(org_id);
})
//返回按钮处理 -- 处理在所在电厂级和集团级
//-- todo 如果在机组和名称层级处理
/*$("#fanhui_test").click(function(){
	var now_org_name = $('.curSelectedNode').attr('title')
	switch (now_org_name) {
		case "京能集团":
			jtview();
			break;
		case "岱海发电":
			level1(now_org_name);
			break;
		case "宁东发电":
			level1(now_org_name);
			break;
		default:
			break;
	}
})*/


//处理函数 --start
function ajax(url, tableId, columns,sentData,type) {
	if(!sentData){
		sentData ={};
	}
    $.ajax({
        url : url,
        type:"post",		
        data:sentData,
        dataType : "json",
        success : function(data) {
            var tableHtml = '';
			//header 集团汇总|| 电厂汇总
            if(data&&data.length>0){               
                tableHtml = prearData(data, columns,tableId);                
            }
			//电厂level1
			if(tableId=='level1_query'){
            	var page = Math.ceil(data.total/7)
				if(!page){
					$("#Pagination_query").hide();
				}else{
					$("#Pagination_query").show();
				}
				if(query_flag){
					dc_lh_pagenation(page);//分页加载
				}
				query_flag=false;
				if(data.exper.length =="0"){
					tableHtml ="<div>暂时没有数据.....<div>"
				}else{
					jt_query = false; 
            	    tableHtml = prearData(data.exper, columns);
				}	            	
            }
			//集团汇总	
			
			//集团detail
			if( tableId == 'jt_detail'){				 	
            	if(jt_query){
					var page = Math.ceil(data.total/10)
    				jt_lh_pagenation(1);//分页加载
    			}
            	jt_query = false; 
            	tableHtml = prearData(data.exper, columns);
            }
            $("#" + tableId).html(tableHtml);         
        }
    });
}
function prearData(data, columns,tableId) {
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];

		var fun ="onclick='chuantou("+JSON.stringify(d)+")'";
		/*if(tableId == "jthz"||tableId =='level1'){
			htmlArray.push("<tr>"); 
		}else{
			 htmlArray.push("<tr "+fun+">"); 
		}*/
		htmlArray.push('<tr>');
            
        for (var j = 0;j < columns.length; j++) {
        	//todo
        	if(columns[0]=="x" && j==0){
        		k=i+1;
        		htmlArray.push("<td >"+k+"</td>");
        		
        	}else{
        		 var columnValue = getColumnValue(columns[j], d[columns[j]]);
        		 if(columns[j]=="NAME" || columns[j]=="name"){
        			 htmlArray.push("<td  title=" + columnValue + " "+fun+" style='text-align:left'><a>" + columnValue + "</a></td>");
        			 
        		 }else{
        			 htmlArray.push("<td title=" + columnValue + ">" + columnValue + "</td>");
        		 }
        	}
        }
    }
    htmlArray.push("</tr>");
    return htmlArray.join('');
}

function getColumnValue(column, colValue) {
	switch (column) {
		case "W_DATE":
			colValue = colValue.replace(/\s/g,"&#13;")
			break;
		case "startTime":
			colValue = timefixed(colValue)
			break;	
		case "G_ID":
		case "gId":
			if(Number(colValue)){
				colValue = "#"+colValue;	
			} 
			break;	
	}
		    
    return colValue;
}
//处理函数 --end
//集团分页
var jt_lh_pagenation = function(page) {
   	var num_entries = page;
  	// 创建分页
  	$("#Pagination_query").pagination(num_entries, {
	    num_edge_entries: 1, //边缘页数
	    num_display_entries: 4, //主体页数
	    callback: jt_query_pagenation,
	    items_per_page: 1, //每页显示1项
	    prev_text: "前一页",
	    next_text: "后一页"
  	});
};
//集团分页 --callback
function jt_query_pagenation(page_index, jq){
	jt_detail(page_index+1)
}
//集团总览 --view-header
function jt_summary(){
	var url = rootPath + "/portal/getJTLHTotal.do";
	ajax(url,"jthz",["YSCOUNT","YCOUNT","YEARRATE","MSCOUNT","MCOUNT","MONTHRATE"]);
}

//集团详情 --view-main
function jt_detail(jt_page_index){	
	var orgid = $("#org_id").val();	
	var g_id  = $("#g_id_jt").val();
	var year  = $("#annual").val();
	var name  = $("#jt_name").val();	
	var url = rootPath +"/portal.do";
	var sentData = {
			"method":"getJTLHinfos",
			"orgid":orgid,
			"g_id":g_id,
			"name":name,
			"year":year,
			'pagenum':jt_page_index,
			'pagesize':10			
	};
	
	ajax(url,'jt_detail',["x","ORG_NAME","G_ID",'NAME','YSCOUNT','YCOUNT','MCOUNT1','MCOUNT2','MCOUNT3','MCOUNT4','MCOUNT5','MCOUNT6','MCOUNT7','MCOUNT8','MCOUNT9','MCOUNT10','MCOUNT11','MCOUNT12'],sentData)
}

// 电厂查询事件 

$("#submit").on("click",function(){
	var g_id=sessionStorage.getItem("g_id");
	query_flag=true;
	query_lh(event,1,g_id);
	$("#Pagination_query").show();
});
//$("#submit").click();
//level1        查询=====================================================
function query_lh(event,pageNum,gid){
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
		g_id=gid
	};
   
    if(!g_id){
    	g_id="";
    } 
    data1 = {
  		  "pageSize":7,  //页大小
  		  "pageNum":pageNum,   //当前页
  		  "orgId":orgId, //组织
  		  "gId":g_id,//机组
  		  "specialId":spec_id,//专业
  		  "name":name,//轮换名称
  		  "beginStart":startTime, 
  		  "endStart"  :endTime,
  		  "conditionType":conditionType
  		};
    var url = rootPath+"/portal/getlhdetailinfo.do"
	ajax(url,'level1_query',['x','gId','name','startTime','ysCount','yCount','msCount','mCount','fCount'],data1) 
}
var dc_lh_pagenation = function(page) {
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
	
	var g_id=sessionStorage.getItem("g_id");
	query_lh(event,page_index + 1,g_id);
  	return false;
}
var query_flag=true;
//时间处理--for hanrongjie
//时间对象处理函数 
/*@para time 毫秒
* return 2016-6-13
*/	
function timefixed(time){
	if(time){
		var date= new Date(time);
		var x = date.toLocaleDateString()
	}else{
		x = ""
	}	
	return x;
}

function chuantou(d){
	//穿透后 点击返回本页
	//$('#fanhui').attr("href","qchuizong.html")
	jt_query=true;
	$('.jt').hide();
	
	if(!d.gId){
		d.gId = d.G_ID
	}
	if(d.name){
		d.NAME = d.name
	}
	$("#fanhui_test").unbind('click').click(function () {
		var now_org_name = $('.curSelectedNode').attr('title')
		//cosnole.log(now_org_name)
		switch (now_org_name) {
			case "京能集团":
				jtview();
				break;
			case "岱海发电":
			case "宁东发电":
				level1(now_org_name);
				break;
			default:
				//-- todo 如果在机组和名称层级处理 逻辑-点击电厂级的时候会把当前的orgid存入到sessionStorage
				var cur_org_id = sessionStorage.getItem('orgid');
				now_org_name = idToName(cur_org_id);
				level1(now_org_name);
				break;
		}
	})
    var flag=true;
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
        $("#Pagination_query").pagination(num_entries, {
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
    };
	
	name = encodeURIComponent(d.NAME);
	
    var url = rootPath + "/portal.do?name="+name;
    expr(1);
	// level4 detail
    function expr(pagenum){
        $.ajax({
            url: url,
            type: "POST",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: "json",
            data: {
                method: "getLHTime",
                org_id: d.ORG_ID,
                year:'',
                month:'',
                g_id:  d.gId,
                special_id: d.professionName,
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
	
	$("#lh_name").html(d.NAME);
	var l4sentdata ={ 
		method: "getLHCount",
		org_id: d.ORG_ID,
		g_id: d.gId,
		special_id: d.professionName
	}
	level4_header(url,l4sentdata)
}


//根据电厂 添加机组========================================================
function addjz(orgid_outer){
	var orgId = ""
	if(!orgid_outer){
		$("#g_id").html("<option value=''></option>")
	   orgId = sessionStorage.getItem("orgid")
	}else{
		orgId=orgid_outer;
		$("#g_id_jt").html("");
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
			//机组信息插入到页面当中
			for(var i = 0;i<arr.length;i++){ 
				var j = i+1;
				
				if(Number(arr[i])){
					arr[i] = "#"+arr[i];
				}else{
					j=arr[i];
				}	
				if (!orgid_outer) {
					$("#g_id").append("<option value='" + j + "'>" + arr[i] + "</option>");
				} else {
					$("#g_id_jt").append("<option value='" + j + "'>" + arr[i] + "</option>");
				}
			}						
		}
	})
}
//根据=电厂=机组=添加专业============================================================
function addzy(gid){
	$("#spec_id").html("<option value=''></option>");
	var orgId = sessionStorage.getItem("orgid");
	var g_id = $("#g_id").val();
	var url = "";
	
	if(!$("#g_id").val()){
		url = rootPath +"/portal/getLhZyInfo.do?orgId="+orgId
	}
	else{		
		url = rootPath +"/portal/getLhZyInfo.do?orgId="+orgId+"&gId="+g_id;
	}
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
//机组改变的时候加载对应的专业！==================================================
$("#g_id").on("change",function(){
	$("#spec_id").html("");
	
	var g_id = $(this).val();
	addzy(g_id);
	query_flag = true;
})
$("#spec_id").on("change",function(){
	//addzy(g_id);
	query_flag = true;//重新加载分页
});


//level 1 new======================================================
function level1(now_org_name){
	//
	sessionStorage.setItem("g_id", "");
	$("#Pagination_query").show();
	$(".select").show();
	$(".jt_select").hide();
	$("table.level1").show();
	$("table.level4").hide();
	$(".wu_top").hide();
	$(".wu_top1").hide();
	$("#table1_huizong").hide();
	$("#Pagination").hide();
	$(".wu_main").css({"marginTop":23});
	$('#lh_name').html(now_org_name);
	$("#wu_top1").hide();
	//电厂级 返回到首页 --return
	$('#fanhui_test').unbind('click').click(function (){
		window.location.replace(rootPath+"/newNavIndex/portal.jsp")  
	})
	//返回电厂时候清空搜索条件
	$('#name').val("")
	$('#startTime').val("");
	$('#endTime').val("");
	
	var orgId = sessionStorage.getItem("orgid")
	var url = rootPath + "/portal/getLHSummaryInfo.do?orgId="+orgId;
	//summary
	ajax(url,"level1",["x","gId","ysCount","yCount","msCount","mCount","fCount"]);
	addjz("");//加载机组
	addzy();//默认加载#1机组的专业
	$("#g_id").show().siblings().show();
	query_flag=true;
	//detail
	$("#submit").click();
}
//leve2 new=====================================================
function level2(name){
	$("#fanhui_test").unbind('click').click(function () {
		var now_org_name = $('.curSelectedNode').attr('title')
		//cosnole.log(now_org_name)
		switch (now_org_name) {
			case "京能集团":
				jtview();
				break;
			case "岱海发电":
			case "宁东发电":
				level1(now_org_name);
				break;
			default:
				//-- todo 如果在机组和名称层级处理 逻辑-点击电厂级的时候会把当前的orgid存入到sessionStorage
				var cur_org_id = sessionStorage.getItem('orgid');
				now_org_name = idToName(cur_org_id);
				level1(now_org_name);
				break;
		}
	})
	
	$("#Pagination_query").show();
	$(".select.dc").show();	
	$("table.level1").show();
	$("table.level4").hide();
	$(".wu_top").hide();
	$(".wu_top1").hide();
	$("#table1_huizong").hide();
	$("#Pagination").hide();
	$(".wu_main").css({"marginTop":22});
	$('#lh_name').html(name);
	$("#wu_top1").hide();
	
	var orgId = sessionStorage.getItem("orgid");
	var g_id =  sessionStorage.getItem("g_id");
	var url = rootPath + "/portal/getLHSummaryInfo.do?orgId="+orgId+"&gId="+g_id;
	ajax(url,"level1",["x","gId","ysCount","yCount","msCount","mCount","fCount"]);
	$("#g_id").html("").fadeOut().siblings().fadeOut();
	addzy(g_id);
	query_flag=true;
	query_lh(event,1,g_id);
	
}
function zTreeOnClick(ev, treeId, treeNode) {	
	var event = ev || window.event;
	var g_id = $(event.target).parent().parent().parent().siblings().parent().parent().siblings().text();
	var special_id = $(event.target).parent().parent().parent().siblings().text();
	var name = treeNode.name;
	switch (treeNode.level) {
		case 0:			
			jtview();					
			break;			
		//电厂级别
		case 1:
			$('.jt').hide();
			g_id = "";
			special_id = "";
			if(name == "岱海发电"){
				sessionStorage.setItem("orgid", "c21834b4-1cb0-490f-a2a8-deeaf7f7e065");	
			}else if(name == "宁东发电"){	
				sessionStorage.setItem("orgid", "472212af-1977-462b-a74a-a1f36ed6562d");
			}
			level1(name);
			name = "";	
			break;
			//机组级别
		case 2:
			$('.jt').hide();
			if(Number(name.substring(1, 2))){
				g_id = name.substring(1, 2);
			}else{
				g_id=name;
			}
			sessionStorage.setItem("g_id", g_id);
			special_id = "";
			name = "";
			level2(treeNode.name);
			break;
			//专业级别
		case 3:
			g_id = special_id.substring(1, 2);
			sessionStorage.setItem("g_id", g_id);
			special_id = name;
			name = "";
			break;
			//试验名称级别
		case 4:
			g_id = g_id.substring(1, 2);
			$('.jt').hide();
			level4(treeNode.name);
			//$fanhui.attr("href","qchuizong.html")
			break;
		default:
			g_id = "";
			special_id = "";
			name = "";
			break;
	}
	
	
	function level4(name){
		var flag=true;
		$("#fanhui_test").unbind('click').click(function(){
			var now_org_name = $('.curSelectedNode').attr('title')
			//cosnole.log(now_org_name)
			switch (now_org_name) {
				case "京能集团":
					jtview();
					break;
				case "岱海发电":			
				case "宁东发电":
					level1(now_org_name);
					break;
				default:
					//-- todo 如果在机组和名称层级处理 逻辑-点击电厂级的时候会把当前的orgid存入到sessionStorage
					var cur_org_id = sessionStorage.getItem('orgid');
					now_org_name = idToName(cur_org_id); 
					level1(now_org_name);
					break;
			}
		})
		$("#Pagination_query").hide();
		$(".select").hide();
		$("table.level1").hide();
		$(".wu_top").show();
		$("table.level4").show();
		$(".wu_top1").show();
		$("#table1_huizong").show();
		$("#Pagination").show();
		
		$("lh_name").html(name)
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
					method: "getLHTime",
					org_id: sessionStorage.getItem("orgid"),
					year:'',
             		month:'',
					g_id: g_id,
					special_id: special_id,
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
					//console.log(data);
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
							//console.log(name);
							
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
		
		var l4sentdata={method: "getLHCount",org_id: sessionStorage.getItem("orgid"),g_id: g_id,special_id: special_id}
		level4_header(url,l4sentdata)
		
        return false;		
	}
	return false;

}

function level4_header(url,dataIN){
	$.ajax({
			url: url,
			type: "POST",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			data: dataIN,
			success: function(data) {
				var d = data.lhlist[0];
				
				var table1_huizong_td = $("#table1_huizong").find("td");
				var header_h3 = $('.wu_top1').find("h3");
				
				if (data.lhlist.length == 0) {
					table1_huizong_td.each(function(i) {
						if (i > 4) {
							$(this).html("暂时无数据");
						}
					});					
					header_h3.each(function() {
						$(this).html("");
					});
				}
				var tit_arr =[d.validbasic,d.lhmethod,d.systemlogic,d.startbasic,d.endbasic];
				var hz_arr = [d.yscount,d.ycount,d.mscount,d.mcount,d.noexper]
				if (data.lhlist.length !== 0) {
					/*轮换说明*/
					header_h3.each(function(i){						
						$(this).html(tit_arr[i]);						
					});
					table1_huizong_td.each(function(i){
						if(i>4){
							$(this).html(hz_arr[i-5]);
						}
					})						
				}

			}

		})
}


function prepearData(data){
	
	var htmlArray =[];
	htmlArray.push("<tr>");	
	for(var i = 0;i<data.length;i++){
		var j=i+1;		
		htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].starttime + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%;top:150px;width:700px; height:365px;'><div class='drsMoveHandle' id='"+data[i].KKS_CODE+";"+data[i].KKS_NAME+";"+data[i].starttime+";"+data[i].endtime+"' ><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>" + data[i].name + "</td><td>"+zunsi(data[i].NOEXPER)+"</td><td><a href='"+rootPath+"/getMainAction.do?method=getLhModel&lh_id="+data[i].id+"'>导出</a></td></tr>")

	}
	if(data.length!==5){
		for(var k =data.length;k<5;k++){

			htmlArray.push("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
		}
	}		
	htmlArray.push("</tr>");
	return htmlArray.join('');
}
function zunsi(x){
	if(x==0){
		return "是"
	}else{
		return "否"
	}
}

function trim(str) {
	
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//click弹出层
$(".wu_top1 h2").each(function(i) {
	$(this).hover(
		function() {
			$(this).parent().find("h3").stop(true);
			$(".wu_top1 h3").hide();
			$(".wu_top1 h3").animate({
				"opacity":"0"
			},200);
			$(this).parent().find("h3").show();
			$(this).parent().find("h3").animate({
				"opacity":"1"
			},200);
		},
		function() {
			$(document).click(
				function() {
					$(".wu_top1 h3").hide();
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
dragresize.ondragfocus = function() {};
dragresize.ondragstart = function(isResize) {};
dragresize.ondragmove = function(isResize) {};
dragresize.ondragend = function(isResize) {};
dragresize.ondragblur = function() {};
dragresize.apply(document);


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
				//sbjiaohu();
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
	//console.log(id);
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
					var a = new Date(times[i]);
					arr.push(a.format("yyyy-MM-dd hh:mm:ss"));
					//arr.push((new Date(times[i])).toLocaleString())
				}
				//console.log(arr);
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
				var tag_select = $('<div style="display:block"></div>'); //div相当于select标签
				tag_select.attr('class', 'select_box');

				tag_select.insertBefore(select_container);
				//显示框class为select_showbox,插入到创建的tag_select中
				var select_showbox = $('<div></div>'); //显示框
				if(index == 0){
					//用title来模拟获取value；
					select_showbox.css('cursor', 'pointer').attr({'class': 'select_showbox',"title":"2016"}).appendTo(tag_select);
					
				}else{
					select_showbox.css('cursor', 'pointer').attr({'class': 'select_showbox',"title":"1"}).appendTo(tag_select);
				}
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

					//add
					//动态添加到当前的showbox
					select_showbox.attr("title",this.value);
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
				//$(showbox).val("1111");
				//showbox.attr(value,selected_option.val());
				//showbox.val(selected_option.val())
				//为每个option建立个li并赋值
				for (var n = 0; n < options.length; n++) {
					var tag_option = $('<li></li>'), //li相当于option
						txt_option = options.eq(n).text();
						//add
						//添加val属性，便于后台传参数;
						tag_option.val(options.eq(n).val());
					tag_option.text(txt_option).css('cursor', 'pointer').appendTo(ul_list);
					//为被选中的元素添加class为selected
					if (n == selected_index) {
						tag_option.attr('class', 'selected');
					}
				}
			}
		})(jQuery)
	}
)





 
function getNum(text){
	var value = text.replace(/[^0-9]/ig,""); 
 	return value;
}
function idToName(id){
	var _name ="";
	switch (id) {
		case "a61365e2-969d-4352-b3f8-805027ab9f1d":
			_name = "京能集团"
			break;
		case "c21834b4-1cb0-490f-a2a8-deeaf7f7e065":
			_name = "宁东发电"
			break;
		case "472212af-1977-462b-a74a-a1f36ed6562d":
			_name = "岱海发电"
			break;
	
		default:
			break;
	}
	return _name;

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