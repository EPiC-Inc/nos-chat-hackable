// Vars
var socket = io();
var key = document.getElementById("passkey");
var keyPage = document.getElementById("keyPage");
var passwd = 'ocelot';

// Functions
function getUrlVars() {
    var vars = {};
    var parts = window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

// Callbacks
key.oninput = function(event) {
    if (key.value == passwd) {
        key.value = '';
        key.disabled = true;
        keyPage.style.visibility = 'hidden';
    }
}

room = getUrlVars()['room']
console.log(room);

if (room !== undefined) {
    console.log('connected');
}
