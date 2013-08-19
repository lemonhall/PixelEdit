var canvas;
var ctx;
var imgs = [];
var cur;

var currentcolor = "#FF9933";

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	start();
}


function pxImg(w, h){
	this.colors = [];
	this.pxmap = [];
	this.width = w;
	this.height = h;
	for(var y=0; y<this.height; y++){
		this.pxmap.push([]);
		for(var x=0; x<this.width; x++){
			this.pxmap[y].push("a");
		}
	}
}

function start(){
	imgs.push(new pxImg(25, 25));
	cur = imgs.length-1;
	drawui();
	drawImgFrame();
}

function drawui(){
	ctx.clearRect(0, 0, 80, canvas.height);	//Clear left
	ctx.clearRect(80, canvas.height-80, canvas.width-80, 80);	//Clear bot
	
	ctx.fillStyle = "#ebebeb";	//bottom toolbar
	ctx.fillRect(80, canvas.height-80, canvas.width-80, 80);
	
	ctx.fillStyle = "#ebebeb";	//Left toolbar
	ctx.fillRect(0, 0, 80, canvas.height-80);
	
	ctx.fillStyle = currentcolor;	//bottom corner
	ctx.fillRect(0, canvas.height-80, 80, 80);
}

function drawImgFrame(){
	//Make the frame
	ctx.beginPath();
	ctx.rect(80, 0, imgs[cur].width*15, imgs[cur].height*15);
	ctx.lineWidth = .5;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	//Make the vertical pixel borders
	for(var x=0; x<imgs[cur].width; x++){
		ctx.beginPath();
		ctx.moveTo((x*15)+80, 0);
		ctx.lineTo((x*15)+80, imgs[cur].height*15);
		ctx.stroke();
	}
	//Make the horizontal pixel borders
	for(var y=0; y<imgs[cur].height; y++){
		ctx.beginPath();
		ctx.moveTo(80, (y*15));
		ctx.lineTo((imgs[cur].width*15)+80, (y*15));
		ctx.stroke();
	}
}

function drawPxMap(){
	for(var y=0; y<imgs[cur].pxmap.length; y++){
		for(var x=0; x<imgs[cur].pxmap[y].length; x++){
			if(imgs[cur].pxmap[y][x] != "a"){
				ctx.fillStyle = imgs[cur].colors[imgs[cur].pxmap[y][x]];
				ctx.fillRect((x*15)+80,y*15,15, 15);
			}
		}
	}
}

function detectClickIntent(x, y){
	if(x<80 && y<320){	//Left toolbar
		alert("left");
	}
	else if(x<80 && y>320){	//Left Bottom Corner
	
		currentcolor = prompt("Color?");
		if(currentcolor != ""){
			drawui();
		}
		else {
			alert("no color defined");
		}
	}
	else {
		//get square mouse is on
		var gridMouseX = x-80;
		var gridMouseY = y;
		var gridLength = imgs[cur].width * 15;
		var gridHeight = imgs[cur].height * 15;
		
		gridX = Math.floor(gridMouseX/15);
		gridY = Math.floor(gridMouseY/15);
		//Add to colors list and pxmap
		var exist  = false;
		for(var f=0; f<imgs[cur].colors.length; f++){
			if(imgs[cur].colors[f] == currentcolor){
				exist = true;
				imgs[cur].pxmap[gridY][gridX] = f;
			}
		}
		if(exist == false){
			imgs[cur].colors.push(currentcolor);
			imgs[cur].pxmap[gridY][gridX] = imgs[cur].colors.length-1;
		}
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawPxMap();
		drawImgFrame();
		drawui();
	}
}

function Clicked(){
	    var event = event || window.event,
	    x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
        detectClickIntent(x, y);
}