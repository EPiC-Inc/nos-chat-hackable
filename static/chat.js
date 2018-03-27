// Vars
var socket = io();
var key = document.getElementById("passkey"); // Passkey input
var keyPage = document.getElementById("keyPage"); // Div holding the key elements
var m = document.getElementById("m"); // Message input
var sendMsgBtn = document.getElementById("sendMsg");
var passwd = 'ocelot';
var room = getUrlVars()['room'];

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
        console.log('connection established');
        sendMsgBtn.disabled = false;
    }
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

var ckey=getCookie("key");
if (ckey == passwd) {
    alert("Welcome back");
}

$(function () {
    $('form').submit(function(){
        sendMsg();
        return false;
    });
});

// Callbacks
key.oninput = function(event) {
    if (key.value == passwd) {
        document.cookie='key='+passwd;
        key.value = '';
        key.disabled = true;
        keyPage.style.visibility = 'hidden';
        connect();
    }
}

// Rest of the JS
console.log(room);
