// 캔버스 크기 설정
function initialize(){
	graph1.width=document.getElementById('gr1').offsetWidth;
	graph1.height=document.getElementById('gr1').offsetHeight;
	graph2.width=document.getElementById('gr2').offsetWidth;
	graph2.height=document.getElementById('gr2').offsetHeight;
}
initialize();

// 그래프 1 데이터
var graphInfo1 = {
	title: "주요 도시 연평균 미세먼지 농도",
	max: 35,
	data: [
		{city: "서울", range: 23, color: "#fe802c"},
		{city: "부산", range: 26, color: "#ffd100"},
		{city: "대구", range: 26, color: "#81d733"},
		{city: "인천", range: 29, color: "#666666"},
		{city: "광주", range: 26, color: "#43cbff"},
		{city: "대전", range: 28, color: "#3183c2"},
		{city: "울산", range: 25, color: "#d4155b"}
	]
}
var graphInfo2 = [
	{title: "North", range: 64, color: "#43cbff"},
	{title: "South", range: 39, color: "#81d733"}
]

// 그래프1 그리기
function drawGraph1(){
	var ctx = graph1.getContext("2d");
	var data = graphInfo1;

	// 초기 설정
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, graph1.width, graph1.height);

	// 타이틀
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "alphabetic";
	ctx.fillText(data.title, graph1.width / 2, 35);

	// 눈금선 
	ctx.font = "12px Arial";
	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
	for(var i = 0; i <= data.max; i += 5){
		var y = 65 + i * 4.5;
		ctx.moveTo(50, y);
		ctx.lineTo(graph1.width - 20, y);
		ctx.fillText(data.max - i, 40, y);
	}
	ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
	ctx.stroke();

	// 그래프
	var y = 65 + data.max * 4.5;
	for(var i = 0; i < data.data.length; i++){
		var x = 110 + i * 30;
		ctx.fillStyle = data.data[i].color;
		ctx.fillRect(x, y - data.data[i].range * 4.5, 25, data.data[i].range * 4.5);
	}

	// 범례
	ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
	ctx.fillRect(50, y + 10, graph1.width - 70, 30);

	for(var i = 0; i < data.data.length; i++){
		var x = 65 + i * 45;
		ctx.fillStyle = data.data[i].color;
		ctx.fillRect(x, y + 20, 10, 10);

		ctx.font = "11px Arial";
		ctx.textAlign = "left";
		ctx.fillStyle = "black";
		ctx.fillText(data.data[i].city, x + 14, y + 25);
	}
}
drawGraph1();

// 그래프2 그리기
function drawGraph2(){
	var ctx = graph2.getContext("2d");
	var data = graphInfo2;

	ctx.beginPath();
	ctx.lineWidth = 20;
	for(var i = 0; i < graphInfo2.length; i++){
		var x = (graph2.width / 2) * i + 100;
		var y = 140;
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "alphabetic";
		ctx.fillText(graphInfo2[i].title, x, y - 95);

		ctx.font = "24px Arial";
		ctx.textBaseline = "middle";
		ctx.fillText(graphInfo2[i].range + "%", x, y);
		ctx.moveTo(x + 60, y);

		ctx.beginPath();
		ctx.arc(x, y, 60, 0, 2 * Math.PI);
		ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(x, y, 60, -0.5 * Math.PI, (graphInfo2[i].range / 100) * Math.PI);
		ctx.strokeStyle = graphInfo2[i].color;
		ctx.stroke();
		ctx.closePath();
	}
}
drawGraph2();