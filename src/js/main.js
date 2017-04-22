/**
 * Created by Piotrek Polus <piotrek@kroppa.pl> on 22.04.2017.
 */

var socket = io.connect("http://localhost:3000/",{query:"device=screen"});

window.onload = () => {
    let p = document.createElement("p");
    p.innerText="Window load";
    document.body.appendChild(p);
};

socket.on("question",function(data) {
    let p = document.createElement("p");
    p.innerText=JSON.stringify(data);
    document.body.appendChild(p);
});

socket.on("joined",function(data) {
    let p = document.createElement("p");
    p.innerText=JSON.stringify(data);
    document.body.appendChild(p);
});

socket.on("message",function(data) {
    let p = document.createElement("p");
    p.innerText=JSON.stringify(data.text);
    document.body.appendChild(p);
});


