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
			colValue = colValue.replace(/\s/g,"&#13;")
			break;	


		default:
			break;
	}
		    
    return colValue;
}
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