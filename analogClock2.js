const canvas = document.getElementById('analogClock');
const ctx = canvas.getContext('2d');

// Center
const radius = (canvas.width / 2) - 10;
const centerX = (canvas.width / 2);
const centerY = (canvas.height / 2);

function drawCap() {
    // Draw Cap nut
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 9, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(50,50,50)";
    ctx.fill();
}

function drawText() {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.font = "20px serif";
    ctx.textAlign = 'center';
    ctx.fillText(`JavaScript`, canvas.width / 2, canvas.height / 3);
    ctx.fillText(`Analog Clock`, canvas.width / 2, (canvas.height / 3) + 30);

    ctx.font = "10px serif";
    ctx.textAlign = 'center';
    ctx.fillText(`WATER RESIST`, canvas.width / 2, (canvas.height) - 120);
}

function drawCircle() {
    // Draw clock circle
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, (canvas.width/2)-5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width / 2) - 5, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawNumbers(ctx, centerX, centerY, radius) {
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 12;
        const x = centerX + (radius - 30) * Math.cos(angle);
        const y = centerY + (radius - 30) * Math.sin(angle);
        ctx.font = "30px serif";
        ctx.fillStyle = 'rgba(0,0,0,0.7)'
        ctx.textAlign = 'center';
        ctx.fillText(i.toString(), x, y + 9);
    }
}

function drawMarks(ctx, centerX, centerY, radius) {
    const minuteMarkLength = 5;
    const hourMarkLength = 10;

    for (let i = 0; i < 60; i++) {
        const angle = i * (Math.PI * 2) / 60;
        const x1 = centerX + (radius - minuteMarkLength) * Math.cos(angle);
        const y1 = centerY + (radius - minuteMarkLength) * Math.sin(angle);
        const x2 = centerX + (radius + 4) * Math.cos(angle);
        const y2 = centerY + (radius + 4) * Math.sin(angle);
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        // ctx.shadowColor = "white";
        // ctx.shadowBlur = 10;
        ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
        const angle = i * (Math.PI * 2) / 12;
        const x1 = centerX + (radius - hourMarkLength) * Math.cos(angle);
        const y1 = centerY + (radius - hourMarkLength) * Math.sin(angle);
        const x2 = centerX + (radius + 4) * Math.cos(angle);
        const y2 = centerY + (radius + 4) * Math.sin(angle);
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(200,0,150,1)';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function drawHourHand(ctx, hours, minutes) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((hours % 12 + minutes / 60) * (2 * Math.PI / 12));
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgb(50,150,50)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height / 4);
    ctx.stroke();
    ctx.restore();
}

function drawMinuteHand(ctx, minutes, seconds) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((minutes + seconds / 60) * (2 * Math.PI / 60));
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgb(0,100,200)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height / 3);
    ctx.stroke();
    ctx.restore();
}

function drawSecondHand(ctx, seconds) {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(seconds * (2 * Math.PI / 60));
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(200,0,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height / 2.2);
    ctx.stroke();
    ctx.restore();
}

function drawClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle();
    drawText();
    drawNumbers(ctx, centerX, centerY, radius);
    drawMarks(ctx, centerX, centerY, radius);
    drawHourHand(ctx, hours, minutes);
    drawMinuteHand(ctx, minutes, seconds);
    drawSecondHand(ctx, seconds);
    drawCap();
}

// Update the clock every second
setInterval(drawClock, 1000);

// Initial draw
drawClock();