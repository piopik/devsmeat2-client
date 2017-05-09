/**
 * Created by Piotrek Polus <piotrek@kroppa.pl> on 22.04.2017.
 */

import io from 'socket.io-client';

let socket = io.connect("http://localhost:3000/");

let printer = (data) => {
    let p = document.createElement("p");
    p.innerText=JSON.stringify(data);
    document.body.appendChild(p);
};

window.onload = () => {

};

socket.on("joined",function(data) {
    printer(data);
});

socket.on("question",function(data) {
    printer(data);

    setTimeout(()=>{
        printer('answer');
        socket.emit('answer', {
            'answer' : [2]
        });
    },500);
});

socket.on("questionResult",function(data) {
    printer(data);
});

socket.on("questionFinish",function(data) {
    printer(data);
});

socket.on("leaderboard",function(data) {
    printer(data);
});

socket.on("leaderboardFinish",function(data) {
    printer(data);
});

socket.on("gameFinish",function(data) {
    printer(data);
});

socket.on("message",function(data) {
    printer(data);
});




