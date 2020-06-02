var canvas = document.querySelector('canvas'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c =canvas.getContext('2d');


var mouse = { 
	x: undefined,
	y: undefined
}

var maxRadius = 40;


var colorArray =[ //below are elements of colorArray which we need to put in fill() of circle
	'green',
	'blue',
	'yellow',
	'red',
	'pink',
];
//below event listener for setting mouse position relative to window
window.addEventListener('mousemove',function(event){
			mouse.x = event.x;
			mouse.y = event.y;
		})

//below event listener is to set canvas to size of window i.e., developing Responsive Page
window.addEventListener('resize',function(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			init();
		});
function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)]
	//draw function is responsible for creating circle
	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle = this.color; 
	    c.fill(); 	
	}

	//update function is responsible for setting bounching boundaries for the circle 
	this.update = function(){
		if(this.x+this.radius>window.innerWidth || this.x-this.radius<0){
			this.dx = -this.dx;
		}
		if(this.y+this.radius>window.innerHeight || this.y-this.radius<0){
			this.dy = -this.dy;
		}

		this.x +=this.dx;
		this.y +=this.dy;

		//interactivity of circles with mouse movement on the window
		if(mouse.x - this.x < 50 && mouse.x - this.x >-50 && mouse.y - this.y <50 && mouse.y - this.y >-50){
			if(this.radius < maxRadius){
				this.radius +=1;
			}
		}else if(this.radius > this.minRadius){
			this.radius -=1;
		}

		this.draw();
	}

}


var circleArray = []; 

//init function is responsible for making the circles being generated in the extra spaces when window is resized without refreshing
function init(){

	circleArray = [];

	for(var i=0; i<200; i++){
		var radius = Math.random()*3+1; 
		var x = Math.random()*(innerWidth-radius*2)+radius; 
		var y = Math.random()*(innerHeight-radius*2)+radius;
		var dx = (Math.random()-0.5);
		var dy = (Math.random()-0.5)*3;
			
		circleArray.push(new Circle(x,y,dx,dy,radius))
	}

}


function animate(){
	requestAnimationFrame(animate); 
	c.clearRect(0,0,innerWidth,innerHeight)

	for(var i=0; i<circleArray.length; i++){
		circleArray[i].update();
	}
	
}

init();
animate();