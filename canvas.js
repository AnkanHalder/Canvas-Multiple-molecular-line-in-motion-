var canvas =document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
console.log('width '+canvas.width);
console.log('Height '+canvas.height);


var c=canvas.getContext('2d');
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);
 var circlearray=[];
// var close=[];
 var maxRadius=2;
 var distance=100;
 var distance1=99;
 var distance2=80;
 var distance3=60;
 var density=100;
 var force=1;
 var seg=canvas.width/7;
 var region=[seg,2*seg,3*seg,4*seg,5*seg,6*seg,7*seg];

 var mouse={
   x:undefined,
   y:undefined
 }

 var pos={
   x:undefined,
   y:undefined
 }

 // c.beginPath();
 // c.moveTo(x,y);
 // c.lineTo(x,y);
 // c.strokeStyle="#9400D3";
 // c.stroke();

 window.addEventListener('mousemove',function(event){
   mouse.x=event.x;
   mouse.y=event.y;
 });
 window.addEventListener('resize',function(){
   canvas.width=window.innerWidth;
   canvas.height=window.innerHeight;
   init();
 });






function Circle(x,y,dx,dy,r){
  this.x=x;
  this.y=y;
  this.dx=dx;
  this.dy=dy;
  this.r=r;
  this.minRadius=r;
  this.color="white";
  this.chooseColor="#9400D3";

  this.draw=function(){
    c.beginPath();
    c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    c.fillStyle=this.color;
    c.fill();
  }
  this.conditions=function(){
    if((innerWidth<this.x+this.r)||(this.x-this.r<0)){
      this.dx=-this.dx;
    }
    if((innerHeight<this.y+this.r)||(this.y-this.r<0)){
      this.dy=-this.dy;
    }



    this.x+=this.dx;
    this.y+=this.dy;

    if(this.x>region[0] && this.x<region[1]){
      this.chooseColor="#4B0082";
    }else if(this.x>region[1] && this.x<region[2]){
      this.chooseColor="#0000FF";
    }else if(this.x>region[2] && this.x<region[3]){
      this.chooseColor="#00FF00";
    }else if(this.x>region[3] && this.x<region[4]){
      this.chooseColor="#FFFF00";
    }else if(this.x>region[4] && this.x<region[5]){
      this.chooseColor="#FF7F00";
    }else if(this.x>region[5] && this.x<region[6]){
      this.chooseColor="#FF0000";
    }

    pos.x=mouse.x-this.x;
    pos.y=mouse.y-this.y;


    //Move Molecules

    if(mouse.x-this.x<distance && mouse.x-this.x >-distance &&
       mouse.y-this.y<distance && mouse.y-this.y >-distance){

    if(pos.x>0){
      if(this.x>5)
      this.x+=-force;
      else
        this.x+=force;
      console.log('Left');
    }
    if(pos.x<0){
      if(this.x<canvas.width-5)
      this.x+=force;
      else
        this.x+=-force;
      console.log('Right');
    }
    if(pos.y>0){
      if(this.y>5)
      this.y+=-force;
      else
      this.y+=force;
      console.log('Top');
    }
    if(pos.y<0){
      if(this.y<canvas.height-5)
      this.y+=force;
      else
      this.y+=-force;
      console.log('Bottom');
    }

  }

  //If outside range




  }
}



function init(){

circlearray=[];
  for(var i=0;i<density;i++){
    var r=2.5;
    var x=Math.random()*(innerWidth-2*r)+r;
    var y=Math.random()*(innerHeight-2*r)+r;
    var dy=(Math.random()-.5);
    var dx=(Math.random()-.5);

  circlearray.push(new Circle(x,y,dx,dy,r));
  }


}


function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);


for(var i=0;i<circlearray.length;i++){
  circlearray[i].draw();
  circlearray[i].conditions();
}
for(var i=0;i<circlearray.length;i++){
  for(var j=0;j<circlearray.length;j++){
    if(i!=j){
    var x1=circlearray[i].x;
    var x2=circlearray[j].x;
    var y1=circlearray[i].y;
    var y2=circlearray[j].y;



    if(x1-x2<distance1 && x1-x2 >-distance1 &&
    y1-y2<distance1 && y1-y2 >-distance1){
      c.beginPath();
      c.moveTo(x1,y1);
      c.lineTo(x2,y2);
      c.lineWidth=.3;
      c.strokeStyle=circlearray[j].chooseColor;
      c.stroke();
    }
    if(x1-x2<distance2 && x1-x2 >-distance2 &&
    y1-y2<distance2 && y1-y2 >-distance2){
      c.beginPath();
      c.moveTo(x1,y1);
      c.lineTo(x2,y2);
      c.lineWidth=.55;
      c.strokeStyle=circlearray[j].chooseColor;
      c.stroke();
    }
    if(x1-x2<distance3 && x1-x2 >-distance3 &&
    y1-y2<distance3 && y1-y2 >-distance3){
      c.beginPath();
      c.moveTo(x1,y1);
      c.lineTo(x2,y2);
      c.lineWidth=.8;
      c.strokeStyle=circlearray[j].chooseColor;
      c.stroke();
    }


    }

  }
}



}
init();
animate();
