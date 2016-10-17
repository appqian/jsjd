if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    
    var ctx = window.location.origin;
   
    //sessionStore();
    function SessionStore(){
        var code =sessionStorage.getItem("code");
        $("#wrap").html(prepare(code));
        this.btn = $("#wrap div");
        this.btn.each(function(){
            $(this).click(function () {
            	var nowPos =  sessionStorage.getItem("nowPos")?sessionStorage.getItem("nowPos"):0;
                var x = $(this).index();
               if(x!=nowPos){
                	window.open("stock"+x+".html",'',"height=672, width=900, top=110, left=200,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no");
                }else{
                    qushi1(this.id);
                }
            })
        });
    }
    
    var scl = new SessionStore();
    
    

   
 

    function qushi1(data){
        var array     = data.split(";");

        var codes     = array[0];
        var names 	   = array[1].split(',');
        var startTime = array[2];
        var endTime   = array[3];
        var pfixeds     = array[4].split(',');
        //转换成毫秒
        var start = (new Date(startTime).getTime())/1000;//转换成utc时间 并提前半小时
        
        var end = (new Date(endTime).getTime())/1000;//转换utc时间  延后半小时
        
        code = codes.replace(/,/g,"|");
       // console.log(code)
        //code=code.slice(0,code.lastIndexOf("|"))
        
        //url =  "http://172.168.100.101:8080/HistoryTrend.aspx?Tag="+code+"&StartTime="+start+"&EndTime="+end
        url =  "http://172.168.100.101:8080/HistoryTrend.aspx?Tag="+code
        $("#stock").attr("src",url);       
    }


    function prepare(data){
        var htmlArray = [];
        var array = data.split(";");

        var codes = parse(array[0]);//codes
        var names = parse(array[1]);//names
        var startTime = array[2];//
        var endTime = array[3];
        var parameter = parse(array[4]);

        for (var i = 0; i < codes.length; i++) {
            var x = i+1;
            htmlArray.push("<div id='"+codes[i].KCODE+";"+names[i].KNAME+";"+startTime+";"+endTime+";"+parameter[i].PMEAS+"'>第"+x+"组</div>");
        }
        return htmlArray.join('');
    }
    function parse(item){
        return eval(item);
    }