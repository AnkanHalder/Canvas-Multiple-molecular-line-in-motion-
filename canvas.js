var canvas =document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;


var c=canvas.getContext('2d');
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);
 var circlearray=[];
 var close=[];

 var maxRadius=2;
 var distance=170;
 var density=100;

 var mouse={
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

    //Updations of Events
    if(mouse.x-this.x<distance && mouse.x-this.x >-distance &&
       mouse.y-this.y<distance && mouse.y-this.y >-distance){
      // if(this.r<maxRadius){
      //   this.r+=4;
      // }
      if(!close.includes(this))
      close.push(this);
    }
    else {
      //this.r-=1;
        if(close.includes(this)){
          close.splice(close.indexOf(this), 1);
        }
    }
  }
}

function init(){

circlearray=[];
  for(var i=0;i<density;i++){
    var r=.9;
    var x=Math.random()*(innerWidth-2*r)+r;
    var y=Math.random()*(innerHeight-2*r)+r;
    var dy=(Math.random()-.5)*3;
    var dx=(Math.random()-.5)*3;

  circlearray.push(new Circle(x,y,dx,dy,r));
  }


}


function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  if(close.length>1){
    for(var j=0;j<(close.length-1);j++){

      for(var i=0;i<(close.length-1);i++){
            if(i!=j){
            c.beginPath();
            c.moveTo(close[j].x,close[j].y);
            c.lineTo(close[i].x,close[i].y);
            if(i==0){
              c.lineWidth=1.25;
            }
            else {
              c.lineWidth=.2;
            }
            c.strokeStyle="#9400D3";
            c.stroke();
          }

      }

    }

  }
for(var i=0;i<circlearray.length;i++){
  circlearray[i].draw();
  circlearray[i].conditions();
}

}
init();
animate();
