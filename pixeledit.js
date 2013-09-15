var canvas;
var ctx;
var img;
var msdwn = false;
var msmvd = false;

var currentColor;
var currentTool;
var snapshots = [];
var snapshotsIndex = 0;
var snapshot;

//Tools sprites (made in PixelEdit!!)
var pencil = {
    colors: ["pink", "yellow", "#FFCF91", "black"],
    pxmap: [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 1, 1, 1, 1, 1, 1, -1],
        [-1, 2, 2, 2, 2, 2, 2, -1],
        [-1, -1, 2, 2, 2, 2, -1, -1],
        [-1, -1, -1, 3, 3, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1]
    ]
};
var eraser = {
    colors: ["#FF94E4", "black"],
    pxmap: [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, 1, 1, 0, 1, 1, -1, -1, -1],
        [-1, -1, -1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 1, -1, -1],
        [-1, -1, -1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1],
        [-1, -1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, -1],
        [-1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, -1, -1, -1],
        [-1, 1, 0, 0, 0, 0, 0, 0, 0, 1, -1, -1, -1, -1, -1],
        [-1, -1, 1, 0, 0, 0, 0, 1, 1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, 1, 0, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]
};
var arrow = {
    colors: ["red"],
    pxmap: [
        [-1, -1, 0, -1, -1],
        [-1, 0, 0, 0, -1],
        [0, 0, 0, 0, 0]
    ]
};
var undobtn = {
	colors: ["#003399"],
	pxmap: [
		[-1, -1, 0, 0, 0, 0, 0, 0],
		[-1, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[-1, 0, 0, 0, 0, 0, 0, 0],
		[-1, -1, 0, 0, 0, 0, 0, 0]
]};
var redobtn = {
	colors: ["#003399", "#009933"],
	pxmap: [
		[1, 1, 1, 1, 1, 1, -1, -1],
		[1, 1, 1, 1, 1, 1, 1, -1],
		[1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, -1],
		[1, 1, 1, 1, 1, 1, -1, -1]
]};
var exportbtn = {
	colors: ["#3D3D3D", "#009933"],
	pxmap: [
		[-1, -1, -1, 1, -1, -1, -1],
		[-1, -1, 1, 1, 1, -1, -1],
		[-1, 1, 1, 1, 1, 1, -1],
		[-1, -1, -1, 1, -1, -1, -1],
		[0, -1, -1, 1, -1, -1, 0],
		[0, -1, -1, 1, -1, -1, 0],
		[0, -1, -1, -1, -1, -1, 0],
		[0, 0, 0, 0, 0, 0, 0]
	]};
var importbtn = {
	colors: ["#3D3D3D", "#009933", "#CC00CC"],
	pxmap: [
		[-1, -1, -1, 2, -1, -1, -1],
		[-1, -1, -1, 2, -1, -1, -1],
		[-1, -1, -1, 2, -1, -1, -1],
		[-1, 2, 2, 2, 2, 2, -1],
		[-1, -1, 2, 2, 2, -1, -1],
		[0, -1, -1, 2, -1, -1, 0],
		[0, -1, -1, -1, -1, -1, 0],
		[0, -1, -1, -1, -1, -1, 0],
		[0, 0, 0, 0, 0, 0, 0]
]};
var newbtn = {
	colors: ["#3D3D3D", "#FF6600"],
	pxmap: [
		[-1, -1, -1, -1, -1, 1, -1],
		[0, 0, 0, 0, 1, 1, 1],
		[0, -1, -1, -1, -1, 1, -1],
		[0, -1, -1, -1, -1, 0, -1],
		[0, -1, -1, -1, -1, 0, -1],
		[0, -1, -1, -1, -1, 0, -1],
		[0, -1, -1, -1, -1, 0, -1],
		[0, -1, -1, -1, -1, 0, -1],
		[0, 0, 0, 0, 0, 0, -1]
]};
var colorspick = {
    colors: ["#FF6666", "#FF0000", "#990000", "#CC0000", "#66FF33", "#FFCC00", "#FF9933", "#FF6600", "#CC6600", "#CC9900", "#FFFF00", "#003300", "#009933", "#33CC33", "#FFFFFF", "#000000", "#000099", "#0000FF", "#66CCFF", "#000066", "#003399", "#0066CC", "#660066", "#993399", "#CC00CC", "#999999", "#3D3D3D", "#B1B1B1", "#D0D0D0", "#E8E8E8", "#800000", "#663300", "#855C33", "#C2AE99", "#FFFF99"],
    pxmap: [
        [27, 14, 0, 5, 34, 13, 18, 21, 24, 33],
        [26, 29, 1, 7, 10, 12, 17, 20, 23, 32],
        [15, 28, 30, 8, 9, 11, 16, 19, 22, 31]
    ]
};
//Begin pixeledit
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
start();
function pxImg(w, h){
	this.colors = [];
	this.pxmap = [];
	for(var y=0; y<h; y++){
		this.pxmap.push([]);
		for(var x=0; x<w; x++){
			this.pxmap[y].push(-1);
		}
	}
}

function renderAll(pxmaptarget){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawui();
	drawPxMap(pxmaptarget);
	drawImgFrame();
}
function start(){
	document.getElementById("exports").style.visibility =  "hidden";
	currentColor = "#009933";
	currentTool = 0;
	img = new pxImg(25, 25);
	
	snapshots.push(JSON.parse(JSON.stringify(img)));
	renderAll(img);
}
function undo(){
		if(snapshotsIndex > 0){
			snapshotsIndex--;
			img = snapshots[snapshotsIndex];
		}
	renderAll(img);
}
function redo(){
		if(snapshotsIndex < snapshots.length-1){
			snapshotsIndex++;
			img = snapshots[snapshotsIndex];		
		}
	renderAll(img);
}
function drawui(){
	
	ctx.fillStyle = "#ebebeb";	//bottom toolbar
	ctx.fillRect(80, canvas.height-80, canvas.width-80, 80);
		
	ctx.fillStyle = "#ebebeb";	// !Left toolbar
	ctx.fillRect(0, 0, 80, canvas.height-80);
		drawSpr(pencil, 25, 20, 3);			//and its tools
		drawSpr(eraser, 15, 110, 3);
		switch (currentTool){	//arrow selector indication
			case 0:
				drawSpr(arrow, 32, 83, 2);
			break;
			case 1:
				drawSpr(arrow, 32, 145, 2);
			break;
		}
	drawSpr(undobtn, 20, 170, 4);
	drawSpr(redobtn, 25, 210, 4);
	
	ctx.fillStyle = currentColor;	//bottom corner
	ctx.fillRect(0, canvas.height-80, 80, 80);
	drawSpr(colorspick, 80, canvas.height-80, 27);	//color picker
	
	ctx.fillStyle = "#ebebeb";	// !Right toolbar
	ctx.fillRect(canvas.width-80, 0, 80, canvas.height-80);
	
	drawSpr(newbtn, canvas.width-53, 23, 4);	//draw new btn
	drawSpr(exportbtn, canvas.width-54, 75, 4);	//draw export btn
	drawSpr(importbtn, canvas.width-54, 120, 4);//draw import btn
	
	ctx.fillStyle = "#000000";	//draw preview 2x
	ctx.font = "bold 10px sans-serif";
	ctx.fillText("2x", canvas.width-48, canvas.height-235);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(canvas.width-67, canvas.height-230, 50, 50);
	drawSpr(img, canvas.width-67, canvas.height-230, 2);	
	
	ctx.fillStyle = "#000000";	//draw preview 3x
	ctx.font = "bold 10px sans-serif";
	ctx.fillText("3x", canvas.width-48, canvas.height-165);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(canvas.width-77, canvas.height-160, 75, 75);
	drawSpr(img, canvas.width-77, canvas.height-160, 3);
	
	ctx.fillStyle = "#666666";	//draw logo
	ctx.font = "bold 15px 'Press Start 2P',sans-serif";
	ctx.fillText("Pixel", canvas.width-80, canvas.height-25);
	ctx.fillText("Edit", canvas.width-65, canvas.height-5);
}
function drawSpr(sprt, x, y, sz){	//draws pixeledit sprites
	for(var ly=0; ly<sprt.pxmap.length; ly++){
		for(var lx=0; lx<sprt.pxmap[0].length; lx++){
			if(sprt.pxmap[ly][lx] != -1){
				ctx.fillStyle = sprt.colors[sprt.pxmap[ly][lx]];
				ctx.fillRect(x + (lx*sz), y + (ly*sz), sz, sz);
			}
		}
	}
}
function addPx(x, y){	//if user wants to modify a pixel
	//get square mouse is on
	var gridMouseX = x-80;
	var gridMouseY = y;
	var gridLength = img.pxmap[0].length * 15;
	var gridHeight = img.pxmap.length * 15;
	
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
	    	
			renderAll(img);
	    break;
	    case 1:	//Eraser?
	    	img.pxmap[gridY][gridX] = -1;
	    	renderAll(img);
	    break;
	}
}
function switchColor(x, y){		//if user selects color from color picker
	var gridMouseX = x-80;
	var gridMouseY = y - (canvas.height-80);
	var gridLength = colorspick.pxmap[0].length * 27;
	var gridHeight = colorspick.pxmap.length * 27;
	
	gridX = Math.floor(gridMouseX/27);
	gridY = Math.floor(gridMouseY/27);
	currentTool = 0; //sets back to pencil because intention is to draw more
	currentColor = colorspick.colors[colorspick.pxmap[gridY][gridX]];
	renderAll(img);
}
function drawImgFrame(){
	//Make the frame
	ctx.beginPath();
	ctx.rect(80, 0, img.pxmap[0].length*15, img.pxmap.length*15);
	ctx.lineWidth = .5;
	ctx.strokeStyle = "#000000";
	ctx.stroke();
	//Make the vertical pixel borders
	for(var x=0; x<img.pxmap[0].length; x++){
		ctx.beginPath();
		ctx.moveTo((x*15)+80, 0);
		ctx.lineTo((x*15)+80, img.pxmap.length*15);
		ctx.stroke();
	}
	//Make the horizontal pixel borders
	for(var y=0; y<img.pxmap.length; y++){
		ctx.beginPath();
		ctx.moveTo(80, (y*15));
		ctx.lineTo((img.pxmap[0].length*15)+80, (y*15));
		ctx.stroke();
	}
}

function drawPxMap(px){
	for(var y=0; y<px.pxmap.length; y++){
		for(var x=0; x<px.pxmap[y].length; x++){
			if(px.pxmap[y][x] != -1){	//if not transparent
				ctx.fillStyle = px.colors[px.pxmap[y][x]];
				ctx.fillRect((x*15)+80,y*15,15,15);
			}
		}
	}
}

function detectClickIntent(x, y){
	if(msmvd == false){
		if(x<80 && y<320){	//!Left toolbar
			if(y<90){
				currentTool = 0;
			}
			else if(y>40 && y<150){
				currentTool = 1;
			}
			else if(y>170 && y<210){
				undo();
			}
			else if(y>210 && y<240){
				redo();
			}
			renderAll(img);
		}
		else if(x<80 && y>canvas.height-80){	//color picker
			var prevColor = currentColor;
			currentColor = prompt("Color?");
			if(currentColor != ""){
				renderAll(img);
			}
			else {
				alert("no color defined");
				currentColor = prevColor;
			}
		}
		else if (x>80 && x<350 && y>canvas.height-80){	//color index
			renderAll(img);
			switchColor(x, y);
		}
		else if(x>canvas.width-80){	//!right toolbar
			if(y<65){
				start();
			}
			else if(y>70 && y<120){
				var exported = exportImg(img);
				document.getElementById("exports").style.visibility = "visible";
				document.getElementById("exports").innerHTML = exported;
			}
			else if(y>120 && y<156){
				importImg(prompt("Paste valid PixelEdit JSON"));
			}
			
		}
		else if (x>80 && x<canvas.width-80 && y<canvas.height-80){	//grid
			addPx(x, y);
			snapshots.push(JSON.parse(JSON.stringify(img)));
			snapshotsIndex = snapshots.length-1;
		}			
	}
	else {
		if (x>80 && x<canvas.width-80 && y<canvas.height-80){	//grid
			addPx(x, y);
		}
	}
}

canvas.onmousedown = function(){
		msdwn = true;
	    var event = event || window.event,
	    x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
        msmvd = false;
        detectClickIntent(x, y);
}
canvas.onmouseup = function(){
	msdwn = false;
	if(msmvd == true){
		snapshots.push(JSON.parse(JSON.stringify(img)));
	}
}
canvas.onmousemove = function(){
	if(msdwn == true){
	    var event = event || window.event,
	    x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
        msmvd = true;
        detectClickIntent(x, y);
      }
}

/*function cleanUpImg(cimg){	//clean up unused colors
	for(var y=0; y<cimg.pxmap.length; y++){
		for(var x=0; x<cimg.pxmap[0].length; y++){
			if(cimg.pxmap[y][x] != -1) cimg.pxmap[y][x] = cimg.colors[cimg.pxmap[y][x]];
		}
	}
	cimg.colors = [];
	for(var y=0; y<cimg.pxmap.length; y++){
		for(var x=0; x<cimg.pxmap[0].length; y++){
			var foundcolor = false;
			for(var i=0; i<cimg.colors.length; i++){
				if (cimg.colors[i] == cimg.pxmap[y][x]){
					foundcolor = true;
					cimg.pxmap[y][x] = i;
				}
			}
			if (foundcolor == false){
				cimg.colors.push(cimg.pxmap[y][x]);
				cimg.pxmap[y][x] = cimg.colors.length-1;
			}
		}
	}
	return cimg;
}*/

function exportImg(eimg){	//Export to a js string object
	var exported = "{<br>";
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
	exported = exported + '"colors": ' + ecolors + ",<br> ";
	var epxmap = "[<br>";
	for(var y=0; y<eimg.pxmap.length; y++){	//pxmap arr
		epxmap = epxmap + "[";
		for(var x=0; x<eimg.pxmap[0].length; x++){
			if(x != eimg.pxmap[0].length-1){
				epxmap = epxmap + eimg.pxmap[y][x] + ", ";	//if not finished add comma
			}
			else {
				epxmap = epxmap  + eimg.pxmap[y][x]+ "]";		//if finished close pxmap[y]
			}			
		}
		if(y != eimg.pxmap.length-1){	//if not finished
			epxmap = epxmap + ",<br> ";
		}
		else {
			epxmap = epxmap + "<br>]";	//if finished close pxmap
		}
	}
	exported = exported + '"pxmap": ' + epxmap + "<br>}"
	return exported;
}
function importImg(eimg){
	img = JSON.parse(eimg);
	renderAll(img);
}