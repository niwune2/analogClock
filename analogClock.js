function drawClock() {
    const canvas = document.getElementById('analogClock');
    const ctx = canvas.getContext('2d');
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock circle
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.arc(canvas.width / 2, canvas.height / 2, (canvas.width / 2) - 5, 0, 2 * Math.PI);
    ctx.stroke();

    // Center
    const radius = (canvas.width / 2) - 10;
    const centerX = (canvas.width / 2);
    const centerY = (canvas.height / 2);

    // Draw numbers in a circle
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 12;
        const x = centerX + (radius - 30) * Math.cos(angle);
        const y = centerY + (radius - 30) * Math.sin(angle);
        ctx.font = "30px serif";
        ctx.fillStyle = 'gray'
        ctx.textAlign = 'center';
        ctx.fillText(i.toString(), x, y + 9);
    }

    // Draw marks
    const minuteMarkLength = 5;
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
        ctx.stroke();
    }

    const hourMarkLength = 10;
    for (let i = 0; i < 12; i++) {
        const angle = i * (Math.PI * 2) / 12;
        const x1 = centerX + (radius - hourMarkLength) * Math.cos(angle);
        const y1 = centerY + (radius - hourMarkLength) * Math.sin(angle);
        const x2 = centerX + (radius + 4) * Math.cos(angle);
        const y2 = centerY + (radius + 4) * Math.sin(angle);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Draw hour hand
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((hours % 12 + minutes / 60) * (2 * Math.PI / 12));
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'yellowgreen';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height / 4);
    ctx.stroke();
    ctx.restore();

    // Draw minute hand
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((minutes + seconds / 60) * (2 * Math.PI / 60));
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height / 3);
    ctx.stroke();
    ctx.restore();

    // Draw second hand
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(seconds * (2 * Math.PI / 60));
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height / 2.2);
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 9, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

function guide() {
    const canvas = document.getElementById('analogClock');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.moveTo(-canvas.width, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(canvas.width / 2, -canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

// Update the clock every second
setInterval(drawClock, 1000);
// setInterval(guide, 1000);

// Initial draw
drawClock();
// guide();
