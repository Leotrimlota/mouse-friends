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



socket.on('createCursor',(id)=>{
    createCursor(id);
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
    var mousePointer = document.createElement("i");
    mousePointer.id = id;
    mousePointer.className = "fas fa-mouse-pointer";
    mousePointer.style.color = uniqolor(id).color;
    document.body.appendChild(mousePointer);
    }
}

socket.on('disconnected',(id)=>{
    let cursor = document.getElementById(id);
    if(cursor){
        cursor.remove();
    }
})
