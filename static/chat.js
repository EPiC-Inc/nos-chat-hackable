function getUrlVars() {
    var vars = {};
    var parts = window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

room = getUrlVars()['room']
console.log(rooms);

if (room !== undefined) {
    var socket = io.of('/'+room);
    console.log('connected');
}
