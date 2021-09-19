
var pointerX = -1;
var pointerY = -1;
document.onmousemove = function (event) {
    pointerX = event.pageX;
    pointerY = event.pageY;
}
setInterval(pointerMove, 50);

function pointerMove(){
    let img = document.getElementById('1234');
    img.style.top = pointerY + 'px';
    img.style.left = pointerX - 2  + 'px';
}
  

function createImage(){
    var img = document.createElement("img");
    img.src = "assets/img/cursor.png";
    img.style.position = 'absolute';
    img.id = "1234";
    img.className = "mouse"
    img.style.height = "10px";
    document.body.appendChild(img);
}

createImage()