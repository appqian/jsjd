/**
 * Created by lei on 2015/7/25 0026.
 */

 if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
var ctx = window.location.origin;
var org_id;
//
if(!org_id){
    $.ajax({
		url:ctx+"/jsjd/portal/getUserOrgId.do",
		type:"POST",
        async: false,
		success:function(data){
			org_id=data;
		}
	})
}
window.onload = function () {
   var org_id = localStorage.getItem("orgid");
    //console.log(org_id)
    var stree = $(".st_tree");
    stree.SimpleTree({
        click:function(a) {
           
            if ($(a).attr("hasChild") == "false") {
                var url = $(a).attr('href')+"&id=displaycatalog&catalogid=I8a8a8aa0308027e30152339cf073025a&showbanner=false&user=liulan&password=liulan";
                window.open(url);

            }
        }
    });
    stree.find("a").each(function () {
        var _value = $(this).html();
        $(this).attr("title",_value);
    });
    $('#tianbao').click(function () {
        if(this.href==""){
            alert("请点击要填报的报表！")
        }
    });
   
    $(".st_tree span").each(function(){      
        

         var _resid       ="",
             general_type ='',
             org_name     ='',
             mix          = this.id.split(",");
        if(mix.length==2){
            _resid=mix[0];    
           general_type=mix[1]
        }else{
             _resid=mix[0]; 
        }
        
        if(org_id == 'a61365e2-969d-4352-b3f8-805027ab9f1d'|| org_id == "c21834b4-1cb0-490f-a2a8-deeaf7f7e065"){
            org_id   = "c21834b4-1cb0-490f-a2a8-deeaf7f7e065";
            org_name = encodeURI("岱海发电");
        }else if(org_id == "472212af-1977-462b-a74a-a1f36ed6562d"){
            org_name = encodeURI("宁东发电")
        }
        var _this_url = ctx+"/spreadsheet/vision/openresource.jsp?paramsInfo=[{'name':'org_id','value':'"+org_id+"','displayValue':'"+org_name+"'},{'name':'general_type','value':'"+general_type+"'}]&resid="+_resid +"&id=displaycatalog&catalogid=I8a8a8aa0308027e30152339cf073025a&showbanner=false&user=liulan&password=liulan";
         

        $(this).click(function(){
            
             window.open(_this_url, "_blank");
            
        })
    });


};


//左侧树跳转默认显示当前人员所在电厂；

