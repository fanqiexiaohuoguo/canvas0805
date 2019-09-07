var mycanvas=document.getElementById("canvas")
var context=canvas.getContext("2d")   
var div=document.getElementById("actions")
var eraserEnabled=false
//无论浏览器视窗多大，都可以无bug绘画
//监听鼠标的动作
//判断是在使用橡皮擦还是画笔

autoSetCanvasSize(mycanvas)

listenToMouse(mycanvas,context)

brushOrEraser(div)

function listenToMouse(canvas,context){
    function drawLine(x1,y1,x2,y2,lineWidth){
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
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y,3 )
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

function brushOrEraser(div){
    eraser=document.getElementById("eraser")
    
    eraser.onclick=function(){
        eraserEnabled=true
        div.className="action active"
    }
    brush.onclick=function(){
        eraserEnabled=false
        div.className="action"
    }
}

function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}//画圆圈没有意义