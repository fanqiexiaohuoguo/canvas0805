var mycanvas=document.getElementById("canvas")
var context=canvas.getContext("2d")   
var div=document.getElementById("actions")
var eraserEnabled=false
var lineWidth=3
document.body.ontouchstart=function(event){
    event.preventDefault()
}
autoSetCanvasSize(mycanvas)

if (document.ontouchstart===undefined){
    listenToMouse(mycanvas)
}
else{   
    // 触屏设备
    listenToTouch(mycanvas)
}
listenToMouse(mycanvas)

function changeColor(){

}
var colorsArray=["black","red","green","yellow","blue"]
function getLi(id){
    var li=document.getElementById(id)
    return li
}
function chooseColor(id){
    // let li=document.getElementById(id)
    context.fillStyle=id
    context.strokeStyle=id
    // console.log(id)
    // li.classList.add("active")
}
black.onclick=function(){
    chooseColor("black")
    black.classList.add("active")
    red.classList.remove("active")
    green.classList.remove("active")
    blue.classList.remove("active")
    yellow.classList.remove("active")
}
red.onclick=function(){
    chooseColor("red")
    black.classList.remove("active")
    red.classList.add("active")
    green.classList.remove("active")
    blue.classList.remove("active")
    yellow.classList.remove("active")
}
green.onclick=function(){
    chooseColor("green")
    black.classList.remove("active")
    red.classList.remove("active")
    green.classList.add("active")
    blue.classList.remove("active")
    yellow.classList.remove("active")
}
blue.onclick=function(){
    chooseColor("blue")
    black.classList.remove("active")
    red.classList.remove("active")
    green.classList.remove("active")
    blue.classList.add("active")
    yellow.classList.remove("active")
}
yellow.onclick=function(){
    chooseColor("yellow")
    black.classList.remove("active")
    red.classList.remove("active")
    green.classList.remove("active")
    blue.classList.remove("active")
    yellow.classList.add("active")
}

thin.onclick=function(){
    lineWidth=3
    thin.classList.add("active")
    thick.classList.remove("active")
}
thick.onclick=function(){
    lineWidth=6
    thin.classList.remove("active")
    thick.classList.add("active")
}

clear.onclick=function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}

download.onclick=function(){
    var url=mycanvas.toDataURL("image/png")
    var a=document.createElement("a")
    a.href=url
    a.target="_blank"
    a.download="作品"
    a.click()
}

brushOrEraser(div)


function autoSetCanvasSize(canvas){

    setCanvasSize()
    
    window.onresize=function(){
        setCanvasSize()
    }
    
    function setCanvasSize(){
        canvas.width=document.documentElement.clientWidth
        canvas.height=document.documentElement.clientHeight
    }
}

function listenToMouse(canvas){
    function drawLine(x1,y1,x2,y2){
        context.beginPath()
        context.moveTo(x1,y1)
        context.lineWidth=lineWidth
        context.lineTo(x2,y2)
        context.stroke()
        context.closePath()
    }
    
    function resizePage(){
        canvas.width=document.documentElement.clientWidth
        canvas.height=document.documentElement.clientHeight
    }

    var using=false
    var lastPoint={"x":undefined,"y":undefined}

    canvas.onmousedown=function(event){
        var x=event.clientX
        var y=event.clientY
        using=true
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }
        else{     
            lastPoint={"x":x,"y":y}
        }
    }
    canvas.onmousemove=function(event){
        var x=event.clientX
        var y=event.clientY

        if(using){
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }
            else{
                var x=event.clientX
                var y=event.clientY
                var newPoint={"x":x,"y":y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y )
                lastPoint=newPoint
            }
        }
        else{
            return
        }      
    }
    canvas.onmouseup=function(){
        using=false
    }
}

function listenToTouch(canvas){
    function drawLine(x1,y1,x2,y2){
        context.beginPath()
        context.moveTo(x1,y1)
        context.lineWidth=lineWidth
        context.lineTo(x2,y2)
        context.stroke()
        context.closePath()
    }
    
    function resizePage(){
        canvas.width=document.documentElement.clientWidth
        canvas.height=document.documentElement.clientHeight
    }

    var using=false
    var lastPoint={"x":undefined,"y":undefined}

    canvas.ontouchstart=function(event){
        var x=event.touches[0].clientX
        var y=event.touches[0].clientY
        using=true
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }
        else{     
            lastPoint={"x":x,"y":y}
        }
    }
    canvas.ontouchmove=function(event){
        var x=event.touches[0].clientX
        var y=event.touches[0].clientY
        if(using){
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }
            else{
                var x=event.touches[0].clientX
                var y=event.touches[0].clientY
                var newPoint={"x":x,"y":y}
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint=newPoint
            }
        }
        else{
            return
        }      
    }
    canvas.ontouchend=function(){
        using=false
    }
}

function brushOrEraser(){
    
    eraser.onclick=function(){
        eraserEnabled=true
        eraser.classList.add("active")
        pen.classList.remove("active")
    }
    pen.onclick=function(){
        eraserEnabled=false  
        pen.classList.add("active")
        eraser.classList.remove("active") 
    }
}

function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}//画圆圈没有意义