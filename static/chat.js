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
    if (room !== undefined) {
        io.sockets.emit('switch', room);
        console.log('connection established');
    }
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
