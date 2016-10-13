
$(document).scroll(function(){
    _width = $(".blance").width();
    if($(document).scrollTop()>"245"){
        thArray = $(".fixedHeader_shadow tr td");
        thead_fixed = $(".fixedHeader tr td");
        for(var i = 0 ;i<thArray.length;i++){
            thead_fixed.eq(i).css({width:thArray.eq(i).outerWidth()})
        }
        $('.fixedHeader').css({position:"fixed",top:0,width:_width}).show()
        $(".fixedHeader_shadow").css({visibility:"hidden"})
    }else{
         $('.fixedHeader').css({position:"relative"}).hide();
         $(".fixedHeader_shadow").css({visibility:"visible"})
    }
    
})
/*$(document).ready(function() { 
   $('.fixedHeader').fixedtableheader(); 
});*/


function clickCheck(obj) {
    /*  var $this = obj;
      console.log($(obj).parent().siblings().eq(4));
      var status = $(obj).parent().siblings().eq(7).attr("data-status");
      console.log(status+"-----");
      if(status=='D'||status=="E"||status=="C")
      {
        Ext.Msg.alert('警告','只可申诉未申诉过的记录该条记录不符合申诉状态',function(e){$("#ss_cancel").click();});
        $(obj).prop("checked",false);
      } */
}


var rootPath = $('#url').val();
//window.onload = function() {
if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;

function snyc(orgid) {
     qureyflag = true;
     $("#org_id option").each(function() {
        if (this.value == orgid) {
            this.selected = "selected"
        }
    })
    if (orgid != 'a61365e2-969d-4352-b3f8-805027ab9f1d') {
        $(".dc").show();
        $(".jt").hide();
        kaohe_zonglan(orgid);          
    } else {
        $(".dc").hide();
        $(".jt").show();  
        jtview();        
    } 
    //考核类型为空
    $("#type").val("") 
    query(orgid, 1, '', true);          
   

}
//集团页面
function jtview() {

    var url = ctx + "/jsjd/getKaoheAction.do?method=getJTKaoheTotal"
    $.ajax({
        url: url,
        type: 'get',
        dataType: "json",
        success: function(data) {
            var tdhtml = prearData(data, ["ORG_NAME", "YEARNUM", "YEARAMOUNT", "MONTHNUM", 'MONTHMOUNT', "YEARNUM1", "YEARAMOUNT1", "MONTHNUM1", 'MONTHAMOUNT1', "YEARNUM3", "YEARAMOUNT3", "MONTHNUM3", 'MONTHAMOUNT3', "YEARNUM2", "YEARAMOUNT2", "MONTHNUM2", 'MONTHAMOUNT2', "YEARNUM0", "YEARAMOUNT0", "MONTHNUM0", 'MONTHAMOUNT0', "YEARNUM4", "YEARAMOUNT4", "MONTHNUM4", 'MONTHAMOUNT4'])
            $("#jt_huizong").html(tdhtml)
        }
    })
}

//申诉添加
$("#add_submit").on("click", function() {
    var project = $("#project").val();
    var time = $("#kh_time").val();
    var org_id = $("#kh_org_id").val();
    var profit = $("#profit").val();
    var url = ctx + "/jsjd/getKaoheAction.do?method=addKaohe"
    $.ajax({
        url: url,
        type: "post",
        data: {
            org_id: org_id,
            info: project,
            date: time,
            amount: Number(profit),
            user_id: user_id
        },
        success: function(data) {
            flag = true;
            kaohe_detail(org_id_orgin, 1);
            //alert("成功了")
        }

    })
});

if (localStorage.getItem("orgid_baobiao")) {
    var org_id_orgin = localStorage.getItem("orgid_baobiao");
    snyc(org_id_orgin);
} else {
    alert("请返回到首页")
}


function kaohe_zonglan(org_id) {
    if (!org_id) {
        var org_id = $("#org_id").val();
    }
    var url = ctx + "/jsjd/getKaoheAction.do?method=getTongJi&org_id=" + org_id;
    $.ajax({
        url: url,
        dataType: "json",
        success: function(data) {
            var d = data;
            var arr = [d.yearnum, d.yearAmount, d.monthnum, d.monthAmount];
            $("#zonglan td").each(function(i) {
                $(this).html(arr[i]);
            })
        }
    })
};





var qureyflag=true;
$("#query").click(function() {
        qureyflag = true;
        query(org_id_orgin, 1, '', true);
        kaohe_zonglan("")
    })
//$("#query").click();


function query(orgid, pageNum, type_outer, flag) {
    
    var org_id = $("#org_id").val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var type = $("#type").val();
    var status = $("#status").val();
    var dis = $("#des").val();
    
    if (!org_id) {//获取当前id为空
        org_id = orgid;
    }
    if (!type) {//获取当前类型为空
        type = type_outer;
    }
    //如果传入type
    if(type_outer){
        sync_type(type_outer);
    }

    sessionStorage.setItem("type_outer", type_outer)
    
    var url = ctx + "/jsjd/getKaoheAction.do?method=getKaoheShow&org_id=" + org_id;
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: {
            pageSize: 20,
            pageNum: pageNum,
            startTime: startTime,
            endTime: endTime,
            type: type,
            key: status,
            dis: dis
        },
        success: function(data) {
            var page = Math.ceil(data.total / 20)
            $('.badge').eq(0).html(data.total)
            $('.badge').eq(1).html(data.totalAmount)

            $("#detail").html(prepare(data.pagedata));
            if (qureyflag||flag) {
                initPagination(page); //分页加载
            }
            qureyflag = false;
            flag=false;
        }
    })

}
var initPagination = function(page) {
    var num_entries = page;
    // 创建分页
    $("#Pagination").pagination(num_entries, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 4, //主体页数
        callback: pageselectCallback1,
        items_per_page: 1, //每页显示1项
        prev_text: "前一页",
        next_text: "后一页"
    });
};

function pageselectCallback1(page_index, jq) {

    var org_id = $("#org_id").val();
    var type = sessionStorage.getItem("type_outer");
    query(org_id, page_index + 1, type);
    return false;
}


//new
$('.form_datetime').datepicker({
    language: 'zh-CN',
    weekStart: 1,
    //todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    minViewMode: 0,
    forceParse: 0,
    //todayHighlight:1,
    clearBtn: 1,
    format: "yyyy-mm-dd"
});


$('.input_datetime').datetimepicker({
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 4,
    minView: 2,
    forceParse: 0,
    //format: "yyyy-mm"
    format: "yyyy-mm-dd"
});

$('.button').modal({
    target: '#modal',
    speed: 500,
    easing: 'easeInOutBounce',
    animation: 'top',
    position: '200px auto',
    overlayClose: true,
    on: 'click'
});






/*考核type sync*/
function sync_type(type){
    $("#type option").each(function(){
         if (this.value == type) {
            this.selected = "selected"
        }
    })
}

function ds_fixed(data) {
    switch (data) {
        case "N":
            data = "否";
            break;
        case "Y":
            data = "是";
            break;
        case '1':
            data = "未申诉";
            break;
        case 'C':
            data = "审核中";
            break;
        case 'E':
            data = "<font color='green'>审核通过</font>";
            break;
        case 'D':
            data = "<font color='red'>驳回</font>";
            break;
    }
    return data;
}


//}
//申述点击
$("#ssbtn").click(function() {
    var control = $("#myModal1").find(".form-control");
    control.eq(4).val(""); //申述内容清空。
    var project = null;
    var time = null;
    var profit = null;
    var org = null;
    var id = null;
    var checked = $(".tdCheck:checked");
    // console.log("checked="+checked.length);
    if (checked.length == 0) {
        Ext.Msg.alert('警告', '请选择一条记录', function(e) {
            $("#ss_cancel").click();
        });
        return;
    }
    if (checked.length > 1) {
        Ext.Msg.alert('警告', '请只选择一条记录', function(e) {
            $("#ss_cancel").click();
        });
        return;
    }
    $(".tdCheck").each(function() {
        if (this.checked) {
            $("#ssbtn").removeClass("disabled");
            id = this.id; //获取申诉本条的id
            //获取本条数据的信息
            project = $(this).parent().siblings().eq(1).html();
            time = $(this).parent().siblings().eq(2).html();
            profit = $(this).parent().siblings().eq(3).html();
            org = $(this).parent().siblings().eq(4).html();
            //添加本条信息到弹出modal
            control.eq(0).html(project).attr("readonly", "readonly");
            control.eq(1).html(time).attr("readonly", "readonly");
            control.eq(2).html(org).attr("readonly", "readonly");
            control.eq(3).html(profit).attr("readonly", "readonly");
        }
    });
    /*
    ASS_INF_CON_NAME:考核内容名称
    ASS_INF_ID：考核通知单号
    ASS_INF_INFORMATION:通知内容
    ASS_INF_ORGS_NAME:考核电厂名称
    */

    var json = {
        ASS_INF_INFORMATION: project,
        ASS_INF_ID: id,
        ASS_INF_ORGS_NAME: org
    };
    // console.log(json);
    $("#ss_submit").click(function() {
        var app_case = $("#myModal1").find("textarea").val(); //获取申诉内容
        if (app_case.length == 0) {
            Ext.Msg.alert('警告', '申诉说明必须填写');
            return;
        }
        startAndSubmitByEntityCode('KHSS', json, function(e) {
            if (e.flag == 1) {
                //console.log(e);
                alert(e.msg);
            } else {
                console.log("app_case=" + app_case);
                Ext.Ajax.request({
                    url: ctx + '/jsjd/main?xwl=240G5CGHTRGW',
                    params: {
                        inst_code: inst_code,
                        app_case: app_case,
                        id: id
                    },
                    // params: {id:ids,INST_CODE_JZQT:inst_code,qt_desc:qt_desc},
                    success: function(response) {
                        console.log({
                            inst_code: inst_code,
                            app_case: app_case,
                            id: id
                        });
                        console.log(Ext.Msg.alert('提示', '流程提交成功!'));
                        $("#ss_cancel").click();
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
                    failure: function(response) {
                        alert(response);
                    }
                });
            }
        });

    });
});
function prearData(data, columns, tableId) {
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        htmlArray.push('<tr>');
        for (var j = 0; j < columns.length; j++) {
            var columnValue = getColumnValue(columns[j], d[columns[j]]);
            htmlArray.push("<td title=" + columnValue + ">" + columnValue + "</td>");
        }
    }
    htmlArray.push("</tr>");
    return htmlArray.join('');
}

function getColumnValue(column, colValue) {
    switch (column) {
        case "W_DATE":
            colValue = colValue.replace(/\s/g, "&#13;")
            break;
        case "startTime":
            colValue = timefixed(colValue)
            break;
        case "G_ID":
        case "gId":
            if (Number(colValue)) {
                colValue = "#" + colValue;
            }
            break;
    }

    return colValue;
}
function prepare(data) {
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        var d = data[i];
        var j = i + 1;
        htmlArray.push("<tr><td><input name='kaohe' type='checkbox' onClick='clickCheck(this)'  class='tdCheck' id=" + d.id + "></td><td>" + j + "</td><td style='text-align:left;max-width:239px;' class='link' title='" + d.infomation + "'><a class='link' href='../khDetail/khDetail.html?code="+d.code+"&infomation="+d.infomation+"&proName="+d.pro+"&type="+d.type+"&id="+d.id+"'>" + d.infomation + "</td><td>" + d.date + "</td><td style='text-align:left;max-width:300px;' title='" + d.assCase + "'>" + d.assCase + "</td><td>" + d.amount + "</td><td>" + d.orgName + "<td>" + d.type + "</td><td>" + ds_fixed(d.tag) + "</td><td data-status=" + d.status + ">" + ds_fixed(d.status) + "</td><td>" + d.key + "</td></tr>");
    }
    return htmlArray.join("");

}