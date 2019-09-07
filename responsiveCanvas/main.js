// 全局变量
var canvas=document.getElementById("canvas")
var context=canvas.getContext("2d")   
var div=document.getElementById("actions")
var eraserEnabled=false
var lineWidth=3

// 阻止滑动带来的默认事件
document.body.ontouchstart=function(event){
    event.preventDefault()
}
// 1.调整画板大小
autoSetCanvasSize(canvas)

// 2.兼容触屏设备
if (document.ontouchstart===undefined){
    listenToMouse(canvas)
}
else{   
    // 触屏设备
    listenToTouch(canvas)
}
listenToMouse(canvas)

// 3.批量设置颜色
var colorsArray=["black","red","green","yellow","blue"]
var flagArray=[false,false,false,false,false]

for (let k=0;k<colorsArray.length;k++){
    BatchSettingColor(colorsArray[k])
}

//5.设置画笔粗细
setBrush()

// 6.设置清屏
clear.onclick=function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}

// 7.设置下载
download.onclick=function(){
    var url=canvas.toDataURL("image/png")
    var a=document.createElement("a")
    a.href=url
    a.target="_blank"
    a.download="作品"
    a.click()
}

// 8.设置橡皮擦
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

function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth=lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}

function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
}

function BatchSettingColor(colorName){
    var color=document.getElementById(colorName)
    color.onclick=function(){
        chooseColor(colorName)
        addOrRemove(colorName)
    }
}

function chooseColor(id){
    context.fillStyle=id
    context.strokeStyle=id
}

function addOrRemove(id){
    for(let i=0;i<colorsArray.length;i++){
        let curId=colorsArray[i]
        if(id===curId){
           flagArray[i]=true
        }
        else{
            flagArray[i]=false
        }
    }
    for(let i=0;i<flagArray.length;i++){
        var liColor=document.getElementById(colorsArray[i])
        if(flagArray[i]){
            liColor.classList.add("active")
        }
        else{
            liColor.classList.remove("active")
        }
    }
}

function setBrush(){
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


