var pointerX = -1;
var pointerY = -1;
document.onmousemove = function (event) {
    pointerX = event.pageX;
    pointerY = event.pageY;
}
setInterval(pointerMove, 50);

function pointerMove(){
    socket.emit('mouseMoving',pointerY ,pointerX)
}


socket.on('createMouse',()=>{
    var img = document.createElement("img");
    img.src = "assets/img/cursor.png";
    img.id = socket.id;
    img.className = "mouse";
    document.body.appendChild(img);
})

socket.on('createCursor',(id)=>{
    var img = document.createElement("img");
    img.src = "assets/img/cursor.png";
    img.id = id;
    img.className = "mouse";
    document.body.appendChild(img);
})

socket.emit('join')

socket.on('mouseMoved',(id,y,x)=>{
    let img = document.getElementById(id);
    if(img){
        img.style.top = y + 'px';
        img.style.left = x - 2  + 'px';
    }else{
        createCursor(id)
    }
})

function createCursor(id){
    if(!document.getElementById(id)){
    var img = document.createElement("img");
    img.src = "assets/img/cursor.png";
    img.id = id;
    img.className = "mouse";
    document.body.appendChild(img);
    }
}

socket.on('disconnected',(id)=>{
    let cursor = document.getElementById(id);
    if(cursor){
        cursor.remove();
    }
})
