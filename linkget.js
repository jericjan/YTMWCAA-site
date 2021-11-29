// this file isn't in use
function LinkGet(val){
	var array1 = val.value.split("\n")[0]
	if (array1.startswith('https://youtu.be/'){
		var idd = array1.split('?')[0].split('/')[array1.split('?')[0].split('/').length-1]
	}else if (array1.startswith('https://www.youtube.com/'){
		var idd = array1.split('&')[0].split('=')[1]
	}else{
		alert("Not a YouTube URL");
	}
	
	const http = new XMLHttpRequest()
	http.open("GET", "https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+idd+"&key=")
	http.send()
	console.log(http.responseText)
}
// this file isn't in use