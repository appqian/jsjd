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
 var code=GetRequest(href).code;
 var infomation=decodeURI(GetRequest(href).infomation);
 var proName=decodeURI(GetRequest(href).proName);
 var ass_type=decodeURI(GetRequest(href).type);
 var id=decodeURI(GetRequest(href).id);

//基础信息
function baseInf() {
	var json={"code":code,"infomation":infomation,"proName":proName,"type":ass_type,"id":id}
    var url = ctx + "/jsjd/getKaoheAction.do?method=getCSCXInform";
    ajax(url, "baseInf",json)
    if(ass_type=="定期工作"){
    	$("#baseInf").find(".control-label").eq(0).hide().next().hide();
    	$("#baseInf").find(".col-sm-1").removeClass("col-sm-1").addClass("col-sm-2");
    }
}
var flag = true;
baseInf();


$(document).keyup(function(){
    if(event.keyCode == 13){
        statistic();
    }
});
//查询按钮
$("#query").on("click", function() {
        statistic();
    })
    $("#query").click();
    //重置按钮
$("#reset").on("click", function() {
        $("#statistic").find(".form-control").val("")
    })


//统计信息
function statistic() {
    //var code = "NMDH:PE:10HTA50CQ001-cal_KH";
    var st = $("#st").val();
    var et = $("#et").val();
    var json={"st":st,"et":et,"id":id,"type":ass_type,"code":code}
    var url = ctx + "/jsjd/getKaoheAction.do?method=getCSCXtotal";
    ajax(url, "statistic",json)
    detail(1);
    if(ass_type=="定期工作"){
    	$("#statistic").find(".form-group").eq(2).hide();
    	$("#statistic").find(".form-group").eq(1).find(".control-label").eq(0).hide();
    	$("#deltaTime").hide();
    	$("#deltaTime").parent().removeClass("col-sm-2").addClass("col-sm-1");
    }
}

//详细信息
function detail(pagenum) {
    if(ass_type=="定期工作"){
    	$("#qushi").parent().hide();
    	$(".detail").find(".cscx-table").hide();
    }else{
    	$(".detail").find(".dqgz-table").hide();
    }
    //var code = "NMDH:PE:10HTA50CQ001-cal_KH";
    var st = $("#st").val();
    var et = $("#et").val();
    var json={"st":st,"et":et,"id":id,"type":ass_type,"code":code,"pageNum":pagenum,"pageSize":7}
    var url = ctx + "/jsjd/getKaoheAction.do?method=getCSCXdetails";
    ajax(url, "detail",json)

}

/*===============处理函数===============*/
function ajax(url, id,dataIn) {

    $.ajax({
        url: url,
        type: 'post',
        data:dataIn,
        dataType: "json",
        success: function(data) {
            if (id == "detail") {
                if (flag) {
                    var page = Math.ceil(data.total / 7)
                    pagenation(page); //分页加载
                }
                flag = false;
            }
            prepareDate(data.pagedata, id)
        }
    })
}

function prepareDate(data, type) {
    switch (type) {
        case "baseInf":
        	if(data.length==0)
        		return;
            var baseInfArr = [data[0].code, data[0].cDesc, data[0].cRule];
            $("#baseInf").find(".form-control").each(function(i) {
                $(this).val(baseInfArr[i]).attr("readonly","readonly")
            })
            break;
        case "statistic":
            var d = data[0]
            var statisticArr = [d.deltaTime, d.count, d.money, d.maxVal, d.minVal]
            $("#statistic").find(".form-control:not(.form_datetime)").each(function(i) {
                $(this).val(statisticArr[i]).attr("readonly","readonly")
            })
            break;
        case "detail":
        	if(ass_type=="定期工作"){
        		$("#detail_dqgz").html(preDetaildqgz(data));
        	}else{
        		$("#details").html(preDetail(data)).find("td").eq(1).click();
        	}
            break;
        default:
            break;
    }
}
function preDetail(data){
    var htmlArray = [];
   
    if(data.length==0){
        return;
    }else{
        for (var i = 0; i < data.length;i++) {
            var j = i+1;
            var d = data[i]
            //var et = (new Date(d.et).getTime())/1000;
           // var st = (new Date(d.st).getTime())/1000;
           var et = Date.parse(d.et.replace(/-/g,"/"))/1000;
            var st = Date.parse(d.st.replace(/-/g,"/"))/1000;
            
            var da = JSON.stringify({"et":et,"st":st})
            htmlArray.push("<tr><td>"+j+"</td><td class='link' onclick = qushi("+da+")>"+d.val+"</td><td>"+d.kht+"</td><td>"+d.deltaTime+"</td><td>"+d.money+"</td>")
            //htmlArray.push("<td>"+statusfixed(d.status)+"</td><td>"+statusfixed(d.flag)+"</td></tr>")
        }
        if(data.length<7){
            for(var z=data.length;z<7;z++){
                htmlArray.push("<tr><td></td><td></td><td></td><td></td><td></td>/tr>")
                //htmlArray.push("<td></td><td></td></tr>")
            }
        }
    }
    return htmlArray.join("");
}
function preDetaildqgz(data) {
	var htmlArray = [];

	if (data.length == 0) {
		return;
	} else {
		for (var i = 0; i < data.length; i++) {
			var j = i + 1;
			var d = data[i]	
			htmlArray.push("<tr><td>" + j + "</td><td style='text-align:left'>" + d.inform
					+ "</td><td>" + d.kht + "</td><td>" + d.money + "</td><td>"
					+ statusfixed(d.status) + "</td><td>" + statusfixed(d.flag) + "</td>");
		}
		if (data.length < 7) {
			for (var z = data.length; z < 7; z++) {
				htmlArray.push("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
			}
		}
	}
	return htmlArray.join("");
}
function statusfixed(status){
    if(status == "N"){
        status = "否"
    }else if(status  == "Y"){
        status = "是"
    } 
    return status;
}
/*==============处理函数结束===================*/
/*时间控件*/
$('.form_datetime').datepicker({
    language: 'zh-CN',
    weekStart: 1,
    autoclose: 1,
    todayHighlight: 1,
    minViewMode: 0,
    forceParse: 0,
    clearBtn: 1,
    format: "yyyy-mm-dd"
});
/*分页函数*/
//创建分页
function pagenation(page) {
    $("#Pagination").pagination(page, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 4, //主体页数
        callback: pCallback,
        items_per_page: 1, //每页显示1项
        prev_text: "前一页",
        next_text: "后一页"
    });
};
//回调函数
function pCallback(page_index, jq) {
    if(!flag){
        detail(page_index+1);
    }
    return false;
}
function qushi(d){
   // var code = "NMDH:PE:10HTA50CQ001-cal_KH";
    var st = d.st;
    var et = d.et;
    var url = "http://172.168.100.101:8080/HistoryTrend.aspx?Tag="+code+"&StartTime="+st+"&EndTime="+et ;
    $("#qushi").attr({src:url})
}