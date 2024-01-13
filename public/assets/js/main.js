var pointerX = -1;
var pointerY = -1;
document.onmousemove = function (event) {
    pointerX = event.pageX;
    pointerY = event.pageY;
}
setInterval(pointerMove, 5);

function pointerMove(){
    socket.emit('mouseMoving',pointerY ,pointerX)
}

socket.on('createCursor',(id)=>{
    createCursor(id);
})

socket.on('ballMoved', (newX, newY) => {
    let ball = document.getElementById('ball');
    if (ball) {
        ball.style.left = newX;
        ball.style.top = newY;
    }
});
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

function createBall() {
    var ball = document.createElement("div");
    ball.id = "ball";
    ball.style.position = "absolute";
    ball.style.width = "50px"; // Example size
    ball.style.height = "50px";
    ball.style.backgroundColor = "red"; // Example color
    ball.style.borderRadius = "50%";
    ball.style.top = "100px"; // Initial position
    ball.style.left = "100px";
    ball.style.transform = "translate(-50%, -50%)"; // Center the ball on the cursor

    document.body.appendChild(ball);
    ball.addEventListener('mousedown', startDrag);

    function startDrag(e) {
        e.preventDefault();
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }

    function drag(e) {
        ball.style.left = e.pageX + 'px';
        ball.style.top = e.pageY + 'px';
        socket.emit('moveBall', ball.style.left, ball.style.top);
    }

    function stopDrag(e) {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }
}

createBall();

