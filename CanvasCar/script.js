"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");
var x = 400,
    y = 350,
    larg = 50,
    alt = 50,
    ang = 0,
    angRoda = 0,
    vel = 0,
    maxVel = 8,
    ace = 0.05,
    escala = 1;
var aX, aY;
var teclas = [];

for (var i = 0; i < 256; i++) {
    teclas[i] = false;
}

function desenhar() {
    processaAngulo()
    processaAnguloRoda();
    processaTeclas();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(70, 0, 200)";
    ctx.strokeStyle = "rgb(255, 0, 50)";
    ctx.lineWidth = larg;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.scale(escala, escala);
    ctx.fillRect(-larg / 2, -alt / 2, larg, alt);
    //rodas da frente
    ctx.save();
    ctx.rotate(angRoda);
    ctx.fillStyle = "rgb(10, 0, 220)";
    ctx.fillRect(-larg + 14, -alt / 8, 10, 20);
    ctx.fillStyle = "rgb(10, 0, 220)";
    ctx.fillRect(larg - 24, -alt / 8, 10, 20);
    ctx.restore();
    //rodas de tras
    ctx.fillStyle = "rgb(10, 0, 220)";
    ctx.fillRect(-larg + 14, alt - 2, 10, 20);
    ctx.fillStyle = "rgb(10, 0, 220)";
    ctx.fillRect(larg - 24, alt - 2, 10, 20);

    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.restore();

    requestAnimationFrame(desenhar);
}

function processaAngulo() {
    aY = vel * Math.cos(ang);
    aX = vel * Math.sin(ang);
}

function processaAnguloRoda() {
    if (teclas[37]) { //seta esquerda
        if (angRoda > -35 * Math.PI / 180)
            angRoda -= 0.03;
    }
    if (teclas[39]) { //seta direita
        if (angRoda < 35 * Math.PI / 180)
            angRoda += 0.03;
    }
}

function processaTeclas() {
    if (teclas[38]) { //seta cima
        y -= aY;
        x += aX;
        acelerar();
    }
    if (teclas[40]) { //seta baixo
        y += aY;
        x -= aX;
        acelerar();
    }
    if (!teclas[38] && !teclas[40]) {
        frear();
    }

    if (teclas[37] && teclas[38]) { //seta esquerda
        ang -= 0.03;

    } else if (teclas[37] && teclas[40]) {
        ang += 0.03;
    }

    if (teclas[39] && teclas[38]) { //seta direita
        ang += 0.03;

    } else if (teclas[39] && teclas[40]) {
        ang -= 0.03;
    }
    
    if (teclas[65]) { //Aumenta escala: a
        if (Math.round(escala) < 3)
            escala += 0.05;
    }
    if (teclas[83]) { //Diminui escala: s
        if (Math.round(escala) > 0 && Math.round(escala) <= 3)
            escala -= 0.05;
    }
}

function acelerar() {
    if (Math.round(vel) < maxVel)
        vel += ace;
}

function frear() {
    if (Math.round(vel) > 0 && Math.round(vel) <= maxVel)
        vel -= ace * 5;
}

document.onkeyup = function (evt) {
    teclas[evt.keyCode] = false;
}

document.onkeydown = function (evt) {
    teclas[evt.keyCode] = true;
}

requestAnimationFrame(desenhar);
