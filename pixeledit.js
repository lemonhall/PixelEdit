var canvas;
var ctx;
var img;

var currentColor;
var currentTool;

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
			this.pxmap[y].push(-1);
		}
	}
}

function start(){
	currentColor = "#FF9100";
	currentTool = 0;
	img = new pxImg(25, 25);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawui();
	drawPxMap(img);
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
function addPx(x, y){
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
	    	drawPxMap(img);
	    	drawImgFrame();
	    	drawui();
	    break;
	    case 1:	//Eraser?
	    	img.pxmap[gridY][gridX] = -1;
	    	ctx.clearRect(0, 0, canvas.width, canvas.height);
	    	drawPxMap(img);
	    	drawImgFrame();
	    	drawui();
	    break;
	}
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

function drawPxMap(px){
	for(var y=0; y<px.pxmap.length; y++){
		for(var x=0; x<px.pxmap[y].length; x++){
			if(px.pxmap[y][x] != -1){	//if not transparent
				ctx.fillStyle = px.colors[px.pxmap[y][x]];
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
		addPx(x, y);
	}
}

function Clicked(){
	    var event = event || window.event,
	    x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
        detectClickIntent(x, y);
}
function exportImg(eimg){	//Export to a js object
	var exported = "";	
	exported = "var img = { width:" + eimg.width + ", height: " + eimg.height + ", ";	//initial properties
	var ecolors = "[";	//add colors
	for(var x=0; x<eimg.colors.length; x++){
		ecolors = ecolors + '"';
		if(x != eimg.colors.length-1){
			ecolors = ecolors + eimg.colors[x] + '", ';
		}
		else {
			ecolors = ecolors + eimg.colors[x] + '"]';
		}
	}
	exported = exported + "colors: " + ecolors + ", ";
	var epxmap = "[";
	for(var y=0; y<eimg.height; y++){	//pxmap arr
		epxmap = epxmap + "[";
		for(var x=0; x<eimg.width; x++){
			if(x != eimg.width-1){
				epxmap = epxmap + eimg.pxmap[y][x] + ", ";	//if not finished add comma
			}
			else {
				epxmap = epxmap  + eimg.pxmap[y][x]+ "]";		//if finished close pxmap[y]
			}			
		}
		if(y != eimg.height-1){	//if not finished
			epxmap = epxmap + ", ";
		}
		else {
			epxmap = epxmap + "]";	//if finished close pxmap
		}
	}
	exported = exported + "pxmap: " + epxmap + "};"
	console.log(exported);
}