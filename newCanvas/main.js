var canvas=document.getElementById("canvas")
var context=canvas.getContext("2d")

function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}

function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth=2
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

var painting=false
var lastPoint={"x":undefined,"y":undefined}

canvas.onmousedown=function(event){
    painting=true
    var x=event.clientX
    var y=event.clientY
    lastPoint={"x":x,"y":y}
    drawCircle(x,y,1)
}
canvas.onmousemove=function(event){
    if(painting){
        var x=event.clientX
        var y=event.clientY
        var newPoint={"x":x,"y":y}
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        drawCircle(x,y,1)
        lastPoint=newPoint
    }
}
canvas.onmouseup=function(event){
    painting=false
}