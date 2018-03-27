// Vars
var socket = io();
var key = document.getElementById("passkey");
var keyPage = document.getElementById("keyPage");
var passwd = 'ocelot';
var room = getUrlVars()['room']

// Functions
function getUrlVars() {
    var vars = {};
    var parts = window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function connect() {
    io.sockets.emit('switch', room);
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

if (room !== undefined) {
    console.log('connection established');
}
