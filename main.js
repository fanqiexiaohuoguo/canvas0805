var div = document.getElementById("canvas");
var painting = false;

div.onmousedown = function(event) {
  var x = event.clientX
  var y = event.clientY
  painting = true;
  var divA = document.createElement("div")
  divA.style = "width: 4px;height: 4px;" + "background: black;" +
    "border-radius: 4px;" + "position: absolute;" + "top: " + (y - 2) + "px;" + "left: " + (x - 2) + "px;";
  div.appendChild(divA);

}
div.onmouseover = function(event) {
  if (painting) {
    var x = event.clientX
    var y = event.clientY
    var divA = document.createElement("div")
    divA.style = "width: 4px;height: 4px;" + "background: black;" +
      "border-radius: 4px;" + "position: absolute;" + "top: " + (y - 2) + "px;" + "left: " + (x - 2) + "px;";
    div.appendChild(divA);
  }else{
    
  }

}
div.onmouseup = function(event) {
  painting = false;
}