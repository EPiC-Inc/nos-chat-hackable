var room = document.getElementById("roomName"); // Room ID / Name

function join() {window.location.href = "/static/coms.html?room="room.value;}

// Jquery
$(function () {
    $('form').submit(function(){
        sendMsg();
        return false;
    });
});
