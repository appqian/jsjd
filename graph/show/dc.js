common.prototype.page.dc.load = function(){
	
	//加载电厂数据
	common.prototype.page.dc.getGroupGraph();
	
//	$('.struct_cell_text_1_1 li').poshytip({allowTipHover: true});
//	$('.data d').poshytip({allowTipHover: true});
}
/**
 * 载入其他电厂图形数据
 */
common.prototype.page.dc.getBelowGraph=function(org_id){
	//alert(org_id);
	$.post("/jsjd/graph.do?method=getBelowGraph",{org_id:org_id}, function(data) {
		window.location.href="/jsjd"+data+".jsp";
	});
}

/**
 * 装载数据
 */
common.prototype.page.dc.getGroupGraph=function(){
	
	$.post("/jsjd/graph.do?method=getGroupGraph",{}, function(data) {
		var obj = eval(data);
		var data_3 = ["<a href='javascript:void(0);' onclick='common.prototype.page.dc.getBelowGraph(\"c21834b4-1cb0-490f-a2a8-deeaf7f7e065\");'>岱海发电</a>","<a href='javascript:void(0);' onclick='common.prototype.page.dc.getBelowGraph(\"472212af-1977-462b-a74a-a1f36ed6562d\");'>宁东发电</a>","京桥热电","京阳热电","京泰发电","京西热电","高安屯热电","京丰燃气","京隆发电","漳山发电","京玉发电","康巴什发电","华宁热电","未来热电"];
		$(".struct_cell_text_1").html("<strong><font size=4>京能集团技术监督网络领导小组</font></strong>");   //一行数据
		for(var i = 0; i < obj.length; i++){
			var dataWrite="";
			var da=obj[i];
			var top="<strong><font size=2.7>"+da.spec_name+"</font></strong>";
			dataWrite+=top;
			
			var emps=da.emp_name;
			var phones=da.phone_no;
			var creds=da.cred_name_values_all;
			//var dataWrite_info="----------------------------\n";
			var dataWrite_info="";
			if(emps.length>1){
				var arr= new Array(); 
				var ph= new Array();
				var cred= new Array();
				arr=emps.split(",");
				ph=phones.split(",");
				cred=creds.split(";");
				for(t=0;t<arr.length ;t++){
					dataWrite+="<br>"+arr[t];
					//dataWrite_info+="姓名:&nbsp&nbsp"+arr[t]+"\n电话:  "+ph[t]+"\n----------------------------\n";
					dataWrite_info+=arr[t]+","+ph[t]+","+cred[t]+";";
				}
				//alert(dataWrite);
			}
			var cell_2 = $('<div class="struct_cell"> \
	                <div class="struct_line">|</div>   \
	                <div class="struct_cell_text"><div class="data"> <!--数据--></div></div>    \
	                <div class="struct_line">|</div>   \
	                </div>');
			//$(".struct_cell_text", cell_2).html('<d title="'+dataWrite_info+'" href="#">'+dataWrite+'</d>');  //二行数据
			$(".data", cell_2).html('<d>'+dataWrite+'</d><div class="show"><div class="showw"><table width="97%" border="1" cellspacing="0" style="margin:10px auto;"><tbody></tbody></table></div></div>');  //二行数据
			$("tbody", cell_2).html('<tr><td>姓名</td><td>电话</td><td>证书</td></tr>');  //二行数据
			var dist=dataWrite_info.split(';');
	        var le=dist.length;
	        for(var t=0;t<le-1;t++){
	        	var ss =dist[t].split(',');
	        	$("tbody",cell_2).append('<tr><td>'+ss[0]+'</td><td>'+ss[1]+'</td><td>'+ss[2]+'</td></tr>');  //二行数据
	        }
            $(".struct_row_2").append(cell_2);          
		}
		
		for (var m = 0; m < data_3.length; m++) {
			//第3行
            var cell_3 = $('<div class="struct_cell"> \
                <div class="struct_line">|</div>   \
                <div class="struct_cell_text"><!--数据--></div>    \
                </div>');
            $(".struct_cell_text", cell_3).html(data_3[m]);  //三行数据
            $(".struct_row_3").append(cell_3)
		}
		
		common.prototype.page.dc.drowLine(obj.length);
	});
}
/**
 * 画线
 */
common.prototype.page.dc.drowLine=function(len){
	var clear = $('<div class="clear"></div>');
    $(".struct_row_2").append(clear.clone());
    $(".struct_row_3").append(clear.clone());
    $(".struct_cell").css({
        "width": 100 / len + "%"
    });
    //调整横线长度
    var mar = $(".struct_row_2 .struct_line").eq(0).width()/2;  // 一二行之间的横线
    var marL = mar - 2;
    var marR = mar + 2;
    $(".struct_line_1").css({
        "margin-left": marL +"px",
        "margin-right": marR +"px"
    });
    mar = $(".struct_row_3 .struct_line").eq(0).width()/2;  //二三行之间的横线
    marL = mar - 2;
    marR = mar + 2;
    $(".struct_line_2").css({
        "margin-left": marL +"px",
        "margin-right": marR +"px"
    });
    //添加直线
    $(".struct_line").html('<svg style="width: 5px; height: 30px;">   \
        <line x1="0" y1="0" x2="0" y2="30" style="stroke:rgb(0,0,0);stroke-width:3"/>   \
    </svg>');
    //使同一行所有格子高度相等
    var cells = $(".struct_row_2 .struct_cell_text");
    var h = 0;
    cells.each(function(i) {
        var _h = this.offsetHeight + this.style.paddingTop + this.style.paddingTop;
        h = Math.max(_h * 1, h);
    });
    cells.css({
        "height": h + "px"
    });
    cells = $(".struct_row_3 .struct_cell_text");
    h = 0;
    cells.each(function(i) {
        var _h = this.offsetHeight + this.style.paddingTop + this.style.paddingTop;
        h = Math.max( _h * 1, h);
    });
    cells.css({
        "height": h + "px"
    });
}