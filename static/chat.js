// Vars
var socket = io();
var key = document.getElementById("passkey"); // Passkey input
var user = document.getElementById("user"); // User input
var keyPage = document.getElementById("keyPage"); // Div holding the key elements
var m = document.getElementById("m"); // Message input
var messages = document.getElementById("messages"); // Messages
var sendMsgBtn = document.getElementById("sendMsg");
var passwd = 'ocelot';
var room = getUrlVars()['room'];

var uName = '';

// Functions
function getUrlVars() {
    var vars = {};
    var parts = window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function connect() {
    if (room !== undefined) {
        socket.emit('switch', room);
    }
    else {
        room = 'lobby'; // Set the default room to 'lobby'
        socket.emit('switch', room);
    }
    console.log('connection established - '+uName);
}

function sendMsg() {
    if (room !== undefined) {
        socket.emit('message', {'room':room, 'data':m.value});
        m.value=''; // Reset chat bar
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(function () {
    $('form').submit(function(){
        sendMsg();
        return false;
    });
});

// On load
var ckey=getCookie("key");
if (ckey == passwd) {
    //alert("Welcome back");
    key.value = '';
    key.disabled = true;
    keyPage.style.visibility = 'hidden';
    //connect();
}
var cuser=getCookie("user");
if (cuser !== '') {
    //alert("Welcome back");
    //key.value = '';
    //key.disabled = true;
    //keyPage.style.visibility = 'hidden';
    uName = cuser;
    connect();
}

// Callbacks
key.oninput = function(event) {
    if (key.value == passwd) {
        uName = user.value;
        document.cookie='key='+passwd;
        document.cookie='user='+uName;
        key.value = '';
        key.disabled = true;
        user.value = '';
        user.disabled = true;
        keyPage.style.visibility = 'hidden';
        connect();
    }
}

socket.on('message', function(data){
    var message = document.createElement('li');
    message.innerHTML = data;
    messages.appendChild(message);
    $("ul").scrollTop($("ul").children().height());
});

// Rest of the JS
console.log("Room: "+room);
