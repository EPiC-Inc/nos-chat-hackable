// Vars
var socket = io();
var key = document.getElementById("passkey"); // Passkey input
var keyPage = document.getElementById("keyPage"); // Div holding the key elements
var m = document.getElementById("m"); // Message input
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
    }
}

function sendMsg() {
    socket.emit('message', {'room':room, 'data':m.value});
}

// Callbacks
key.oninput = function(event) {
    if (key.value == passwd) {
        key.value = '';
        key.disabled = true;
        keyPage.style.visibility = 'hidden';
        connect();
    }
}

// Rest of the JS
console.log(room);
