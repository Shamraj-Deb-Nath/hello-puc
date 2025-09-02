// Clock Numbers
const clock = document.getElementById("clock");
for (let n = 1; n <= 12; n++) {
    const num = document.createElement("div");
    num.className = "number";
    const angle = (n * 30 - 90) * Math.PI / 180;
    const r = 85;
    num.style.left = 100 + r * Math.cos(angle) - 7 + "px";
    num.style.top = 100 + r * Math.sin(angle) - 7 + "px";
    num.innerText = n;
    clock.appendChild(num);
}

// Update Clock (Analog + Digital)
function updateClock() {
    const now = new Date();
    const h = now.getHours() % 12,
        m = now.getMinutes(),
        s = now.getSeconds();
    document.getElementById('hour').style.transform = `rotate(${h * 30 + m * 0.5}deg)`;
    document.getElementById('minute').style.transform = `rotate(${m * 6}deg)`;
    document.getElementById('second').style.transform = `rotate(${s * 6}deg)`;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    document.getElementById('calendar').innerText = `${days[now.getDay()]}\n${months[now.getMonth()]} ${now.getDate()}`;

    // ✅ Digital Clock (12-hour format with AM/PM)
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("digitalClock").innerText = `${hours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// ✅ Routine Data (আগের মতোই রেখেছি)
const routine = {
    "Saturday": [
        { time: "2:30 PM-3:45 PM", sub: "PME", room: "612" },
        { time: "3:45 PM-5:00 PM", sub: "CCS", room: "403" }
    ],
    "Sunday": [
        { time: "12:15 PM-1:30 PM", sub: "SE", room: "403" },
        { time: "1:30 PM-2:30 PM", sub: "SEL", room: "604" },
        { time: "2:30 PM-3:45 PM", sub: "DMNT", room: "903" }
    ],
    "Monday": [
        { time: "11:00 AM-12:15 PM", sub: "SE", room: "410" },
        { time: "2:30 PM-3:45 PM", sub: "CN", room: "612" },
        { time: "3:45 PM-5:00 PM", sub: "DC", room: "613" }
    ],
    "Tuesday": [
        { time: "8:30 AM-9:45 AM", sub: "CCS", room: "510" },
        { time: "9:45 AM-11:00 AM", sub: "CN", room: "510" },
        { time: "11:00 AM-1:30 PM", sub: "SD", room: "604" },
        { time: "2:30 PM-3:45 PM", sub: "PM", room: "611" },
        { time: "3:45 PM-5:00 PM", sub: "DC", room: "611" }
    ],
    "Wednesday": [
        { time: "10:10 AM-11:00 AM", sub: "SD", room: "609" },
        { time: "11:00 AM-1:30 PM", sub: "CN", room: "601" }
    ]
};

// Convert time string to minutes
function timeToMins(t) {
    t = t.trim();
    let [time, period] = t.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h * 60 + m;
}

// Populate Routine Table
function populateTable() {
    const table = document.getElementById("routine");
    table.innerHTML = "";
    const maxCols = Math.max(...Object.values(routine).map(d => d.length));
    let header = "<tr><th>Day</th>";
    for (let i = 1; i <= maxCols; i++) header += `<th>Class ${i}</th>`;
    header += "</tr>";
    table.innerHTML += header;

    const nowMins = new Date().getHours() * 60 + new Date().getMinutes();

    for (let day in routine) {
        let row = `<tr><td>${day}</td>`;
        for (let i = 0; i < maxCols; i++) {
            const cls = routine[day][i];
            if (cls) {
                const [startTime, endTime] = cls.time.split('-');
                const start = timeToMins(startTime);
                const end = timeToMins(endTime);
                const highlight = nowMins >= start && nowMins <= end ? "current" : "";
                row += `<td><div class="class-box ${highlight}">${cls.time}<br>${cls.sub}<br>Room: ${cls.room}</div></td>`;
            } else row += "<td></td>";
        }
        row += "</tr>";
        table.innerHTML += row;
    }
}
populateTable();
setInterval(populateTable, 60000);