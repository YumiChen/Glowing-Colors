window.onload =(function run(){
    var canvas = document.createElement('canvas'),
    ctx=canvas.getContext('2d'),
    width=window.innerWidth,
    height=window.innerHeight,
    colors=['pink','purple','blue','skyBlue','green','yellow','orange','red'],
    len=colors.length,
    len2=len-1,
    size=width/200,speed=i=15,stars=[],sizeChange=2;
    //document.body.height=height;
    canvas.width=width;
    canvas.height=height;
    //canvas.style.filter='blur(3px)';
    ctx.fillStyle ='black';
    ctx.fillRect(0,0,width,height);
    document.body.append(canvas);
   
   size=12;
    function Star(x,s){
        this.x=x;
        this.y=0;
        this.speed=s;
    }
    function Star2(x,s){
        Star.call(this,x,s);
    }
    
    Star.prototype.move=function(){
        this.x+=this.speed;
        this.y+=this.speed;
    };
    Star.prototype.check=function(){
        if(this.x>=width) this.x=0;
        if(this.y>=height) this.y=0;
    };
    
    Star2.prototype.move=function(){
        this.x-=this.speed;
        this.y+=this.speed;
    };
    Star2.prototype.check=function(){
        if(this.x<=0) this.x=width;
        if(this.y>=height) this.y=0;
    };
    
    for(i;i>3;i--){
       var newStar=new Star(0,i);
       stars.push(newStar);
       
       newStar= new Star2(width,i);
       newStar.speed=i;
       stars.push(newStar);
    }
    
    
    function draw(){
        stars.forEach(function(star){
            star.check();
        })
        if(size>height/25||size<=2){sizeChange*=-1;}
        if(len2<=0){len2=len-1;}
        
        ctx.fillStyle ='rgba(0,0,0,.1)';
        ctx.fillRect(0,0,width,height);
        ctx.fillStyle=colors[len2];
        stars.forEach(function(star){
         ctx.fillRect(star.x,star.y,size,size);
         star.move();
        });
        size+=sizeChange;
        len2--;
        requestAnimationFrame(draw);
    }
    
    requestAnimationFrame(draw);
    
    function resize(){
        width=window.innerWidth;
        height=window.innerHeight;
        canvas.width=width;
        canvas.height=height;
        ctx.fillStyle ='black';
        ctx.fillRect(0,0,width,height);
        size=width/13;
    }

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
    var context = this, args = arguments;
    var later = function() {timeout = null;if (!immediate) func.apply(context, args);};
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    };
  };
  var debounceResize = debounce(resize,1000, false);
  window.addEventListener("resize",resize);
  
})();