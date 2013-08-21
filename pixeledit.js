var canvas;
var ctx;
var img;

var currentColor = "#FF9933";
var currentTool = 0;

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
	img = new pxImg(25, 25);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawui();
	drawPxMap();
	drawImgFrame();
}

function drawui(){
	ctx.clearRect(0, 0, 80, canvas.height);	//Clear left
	ctx.clearRect(80, canvas.height-80, canvas.width-80, 80);	//Clear bot
	
	ctx.fillStyle = "#ebebeb";	//bottom toolbar
	ctx.fillRect(80, canvas.height-80, canvas.width-80, 80);
	
	ctx.fillStyle = "#ebebeb";	//Left toolbar
	ctx.fillRect(0, 0, 80, canvas.height-80);
	
	ctx.fillStyle = currentColor;	//bottom corner
	ctx.fillRect(0, canvas.height-80, 80, 80);
}

function drawImgFrame(){
	//Make the frame
	ctx.beginPath();
	ctx.rect(80, 0, img.width*15, img.height*15);
	ctx.lineWidth = .5;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	//Make the vertical pixel borders
	for(var x=0; x<img.width; x++){
		ctx.beginPath();
		ctx.moveTo((x*15)+80, 0);
		ctx.lineTo((x*15)+80, img.height*15);
		ctx.stroke();
	}
	//Make the horizontal pixel borders
	for(var y=0; y<img.height; y++){
		ctx.beginPath();
		ctx.moveTo(80, (y*15));
		ctx.lineTo((img.width*15)+80, (y*15));
		ctx.stroke();
	}
}

function drawPxMap(){
	for(var y=0; y<img.pxmap.length; y++){
		for(var x=0; x<img.pxmap[y].length; x++){
			if(img.pxmap[y][x] != "a"){	//if not transparent
				ctx.fillStyle = img.colors[img.pxmap[y][x]];
				ctx.fillRect((x*15)+80,y*15,15, 15);
			}
		}
	}
}

function detectClickIntent(x, y){
	if(x<80 && y<320){	//Left toolbar
		currentTool = +prompt("tool? 0=pencil, 1=eraser");
	}
	else if(x<80 && y>320){	//color picker
	
		currentColor = prompt("Color?");
		if(currentColor != ""){
			drawui();
		}
		else {
			alert("no color defined");
		}
	}
	else if (x>80 && y<canvas.height-80){	//grid
		//get square mouse is on
		var gridMouseX = x-80;
		var gridMouseY = y;
		var gridLength = img.width * 15;
		var gridHeight = img.height * 15;
		
		gridX = Math.floor(gridMouseX/15);
		gridY = Math.floor(gridMouseY/15);
		
		switch (currentTool){	//what do they want to do with the grid
			case 0:	//Pencil?
				var exist  = false;
				for(var f=0; f<img.colors.length; f++){
					if(img.colors[f] == currentColor){
						exist = true;
						img.pxmap[gridY][gridX] = f;
					}
				}
				if(exist == false){
					img.colors.push(currentColor);
					img.pxmap[gridY][gridX] = img.colors.length-1;
				}
				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawPxMap();
				drawImgFrame();
				drawui();
			break;
			case 1:	//Eraser?
				img.pxmap[gridY][gridX] = "a";
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				drawPxMap();
				drawImgFrame();
				drawui();
			break;
		}	
	}
}

function Clicked(){
	    var event = event || window.event,
	    x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
        detectClickIntent(x, y);
}