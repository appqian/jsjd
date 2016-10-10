if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}
var ctx = window.location.origin;
//添加对应的value；
$("#sys option").each(function(i) {
        $(this).val($(this).html());
    })
    //获取数据
var flag = true;

$("#submit").on('click', function() {
    flag = true;
    mainData(1)
});

$("#submit").click();

//分页init
function initPagination(page) {
    $("#Pagination").pagination(page, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 4, //主体页数
        callback: pagecb1,
        items_per_page: 1, //每页显示1项
        prev_text: "前一页",
        next_text: "后一页"
    });
};
//分页callback
function pagecb1(page_index, jq) {
    //init的时候为true；不执行回调，其他时候flag 为false；
    if (!flag) {
        mainData(page_index + 1);
    }

}


function mainData(pageNub) {
    if (!pageNub) {
        var pageNub = 1;
    }
    var url = ctx + "/jsjd/XipExperimentAction.do";
    dataIn = {
        "method": "getTesBaTPWMarketData",
        "orgid": $("#org").val(),
        "g_id": $('#g_id').val(),
        "sysName": $('#sys').val(),
        "ptCode": $('#code').val(),
        "ptDesc": $('#desc').val(),
        "spec":$("#spec").val(),
        "pageSize": 50,
        "pageNumber": pageNub
    }
    ajax(url, 'main', dataIn, pageNub)
}

//添加机组

$("#org").on("change", function() {
    addjz();
})

function ajax(url, type, dataIn, pageNub) {
    $.ajax({
        url: url,
        type: 'post',
        data: dataIn,
        dataType: "json",
        success: function(data) {
            //console.log(data)
            if (type == "main") {
                if (flag) {
                    var page = Math.ceil(data.total / 50)
                    initPagination(page); //分页加载
                }
                flag = false;
            }


            prepareDate(data, type, pageNub)
        }
    })
}

function prepareDate(data, type, pageNub) {

    switch (type) {
        /*case "org":
             $("#org").html("")
             for (var key in data) {
                 $("#org").append("<option value='" + key + "'>" + data[key] + "</option>");
             }
            break;*/
        case "jz":
            jzfixed(data);
            break;
        case "main":


            var htmlx = dataHandle(data.pagedata, pageNub, ['id', 'powerPlant', 'crew', 'major', 'sysName', 'pointCode', 'pointDesc', 'company', 'downRange', 'upRange', 'realData']);
            var picodestr = getPiCode(data.pagedata);
            var picodeArray = picodestr.split(',');
            var url = ctx + '/jsjd/XipExperimentAction.do?method=getRealData&pointName=' + picodestr;

            //picodeArray 放到 input
            //url 同样放到input
            $("#Apicode").val(picodestr);
            $("#url").val(url);


            getRealData()
            $("#test").html(htmlx)
            break;
        case "sys":

            break;
    }
}
var timer;
clearInterval(timer)
timer = window.setInterval(getRealData, 10000);

function getRealData() {

    var picodeArray = $("#Apicode").val().split(',');
    var url = $("#url").val();

    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        success: function(data) {
            var resultArray = [];
            if (data.data.length < 0) {
                return;
            }
            for (var i = 0; i < picodeArray.length; i++) {
                for (var j = 0; j < data.data.length; j++) {

                    if (picodeArray[i] == data.data[j].tag) {
                        resultArray.push(data.data[j])
                    }
                }
            }


            $("#test").find("td:nth-child(11n)").each(function(i) {
                $this = $(this);
                $this.html("<span class='animated bounceIn'>" + statusFix(resultArray[i]) /*resultArray[i].value*/ + "</span>")
                if(statusFix(resultArray[i])=="坏点"){
                    $this.parent().css({color:"red"})
                }
            })
        }
    })
}

function statusFix(target) {
    if (target.status) {
        var status = target.status;
        var value = ""
        switch (status) {
            case "0":
                value = target.value;
                break;
            default:
                value = "坏点"
                break;
        }
        return value;
    }
}

function jzfixed(data) {
    $("#g_id").html("<option value =''></option>")
    var arr = [];
    for (var i in data) {
        arr.push(data[i]);
    }
    arr.sort()
    for (var i = 0; i < arr.length; i++) {
        var j = i + 1;
        if (Number(arr[i])) {
            arr[i] = "#" + arr[i];
            $("#g_id").append("<option value='" + j + "'>" + arr[i] + "</option>");
        }
    }
}

function getPiCode(data) {
    var picodeArray = [];
    for (var i = 0; i < data.length; i++) {
        var element = data[i].pointCode;
        picodeArray.push(element)

    }
    return picodeArray.join(',');
}

function dataHandle(data, pageNub, col) {
    var htmlArray = [];
    for (var i = 0; i < data.length; i++) {
        htmlArray.push('<tr>')
        var d = data[i];
        for (var j = 0; j < col.length; j++) {
            var colValue = getValue(col[j], d[col[j]])
            if (j == 0) {
                k = (i + 1) + (pageNub - 1) * 50;
                htmlArray.push("<td >" + k + "</td>");
            } else {

                if (col[j] == "pointCode") {
                    var Bar = "onclick=show('" + colValue + "') href='javascript:void(0)'";
                    htmlArray.push("<td  title=" + colValue + " " + Bar + " style='text-align:left;color:blue;cursor:pointer'><a>" + colValue + "</a></td>");

                } else if(col[j]== "pointDesc") {
                    htmlArray.push("<td title=" + colValue + " style='text-align:left;'>" + colValue + "</td>");
                }else{
                    htmlArray.push("<td title=" + colValue + ">" + colValue + "</td>");
                }
            }

        }
        htmlArray.push('</tr>')

    }
    return htmlArray.join('');
}

function getValue(column, colValue) {
    switch (column) {
        case "crew":
            if (Number(colValue)) {
                colValue = '#' + colValue
            }
            break;

        default:
            break;
    }
    return colValue;
}

function addjz() {
    var org_id = $("#org").val();
    //集团同样显示4个机组
    if (org_id == '') {
        org_id = 'c21834b4-1cb0-490f-a2a8-deeaf7f7e065'
    }
    var url = ctx + "/jsjd/portal/getSyJzInfo.do?orgId=" + org_id;
    ajax(url, "jz")
}
var points = "";
var pointArray = [];
function show(point) { 
    //
    var subwin = window.open("", "历史曲线", "width=" + 900 + ",height=" + 640 + ",directories=no,location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=no");
    if(!points){
         pointArray.push(point);
    }else if(pointArray.length>=1&&pointArray.indexOf(point)== -1){
        pointArray.push(point);
    }else{
         alert("请选择不同的点！")
         subwin.focus();
         return;
    }
    
    points = pointArray.join("|");
    var queryString = "../open.html";
  
    localStorage.setItem("psTag", points);
    if (subwin.location.href.indexOf("open") == -1) {
        subwin.location = queryString;

    } else {
        subwin.child_open();
    }
    var flag = true;
    function IfWindowClosed() {        
        if (subwin.closed == true && flag) {
            points = "";
            pointArray=[];          
            window.clearInterval(timer)
            flag=false;                 
        }
    }

    timer = window.setInterval(IfWindowClosed, 500);
    subwin.focus();

}
$(document).scroll(function(){
    
    if($(document).scrollTop()>"37"){
        _width = $("#test").outerWidth() + 2;
        thArray = $(".thead_shadow tr th");
        thead_fixed = $(".thead_fixed tr th");
        for(var i = 0 ;i<thArray.length;i++){
            thead_fixed.eq(i).css({width:thArray.eq(i).outerWidth()})
        }
        //$('th').css({width:td_width-18});
        $('.thead_fixed').css({position:"fixed",top:0,width:_width}).show();
        $(".thead_shadow").css({visibility:"hidden"});
    }else{
         $('.thead_fixed').css({position:"relative"}).hide();
         $(".thead_shadow").css({visibility:"visible"})
    }
    
})