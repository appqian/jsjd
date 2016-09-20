 if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }

        var ctx = window.location.origin;


        yxzt();

        function yxzt() {
            var url = ctx + "/jsjd/portal/getJzqtInfo.do";
            $.ajax({
                url: url,
                dataType: "json",
                success: function(data) {
                    var nd = [];
                    var dh = [];
                    var dhhz = [];
                    var ndhz = [];
                    for (var i = 0; i < data.length; i++) {
                        var element = data[i];
                        // console.log(element.dType);
                        switch (element.dType) {
                            case "nd":
                                nd.push(element);
                                break;
                            case "dh":
                                dh.push(element);
                                break;
                            case "ndhz":
                                ndhz.push(element);
                                break;
                            case "dhhz":
                                dhhz.push(element);
                                break;
                            default:
                                break;
                        }
                    }
                    var ndhzhtml = prepare(ndhz, "ndhz")
                    var dhhzhtml = prepare(dhhz, "dhhz")
                    var ndhtml = prepare(nd, 'nd');
                    var dhhtml = prepare(dh, 'dh');
                    var all = dhhzhtml + dhhtml + ndhzhtml + ndhtml
                    $("#test").html(all);
                    $("#dh").find("td:nth-child(1)").click(function() {
                        $('.dh').toggle(400);
                    }).css({
                		textDecoration:"underline",	color:"blue",cursor:'pointer'
                	})
                    $("#nd").find("td:nth-child(1)").click(function() {
                        $('.nd').toggle(400);
                    }).css({
                		textDecoration:"underline",	color:"blue",cursor:'pointer'
                	})

                }
            })
        }

        function prepare(data, diff) {
            var col = ["jizu", 'qidongyongshi', "type", "zongyongshi", "dhzcc", "cczbw", "bwz50fh", "qdhy", "qdhm", "qdhs", "qdhd", "qdpjfl", "zqwd", "zqwdbz", "zqyl", "zqylbz", "zrqw", "zrqwbz", "zrqy", "zrqybz", "zfl", "zflbz", "gsll", "gsllbz", "zqll", "zqllbz"]
            var html_string = [];


            for (var i = 0; i < data.length; i++) {
                var d = data[i];
               
                switch (diff) {
                    case "dh":
                        html_string.push("<tr class='dh'>");
                        break;
                    case "nd":
                        html_string.push("<tr class='nd'>");
                        break;
                    case "dhhz":
                        html_string.push("<tr id='dh'>");
                        break;
                    case "ndhz":
                        html_string.push("<tr id='nd'>");
                        break;

                }
                var colValue = "";
                for (var j = 0; j < col.length; j++) {
                    colValue = getColValue(col[j], d[col[j]]);
                    if (!d[col[j]]) {
                        d[col[j]] = "";
                    }
                    if(j==0){
                        html_string.push("<td style='max-width:39px;'>" + colValue + "</td>")    
                    }else{
                        html_string.push("<td>" + colValue + "</td>")
                    }
                }
                html_string.push("</tr>");
            }
            return html_string.join("");
        }

        function getColValue(col, value) {
            if (col === "jizu") {
                var mid = value.substr(0, 1);
                if (isNaN(mid)) {
                    if (value == "nd") {
                        value = "宁东发电"
                    }
                    if (value == "dh") {
                        value = "岱海发电"
                    }

                } else {
                    value = "#" + mid;
                }

            }
            if (col == "zongyongshi") {
                value = value.replace(/天/g, "天")
                value = value.replace(/小时|时|h|分钟|分|m/g, ":")
                    //value = value.replace(/分钟|分/g,":")
                value = value.replace(/秒/g, "")
            }
            if (!value) {
                value = "";
            }
            return value;
        }