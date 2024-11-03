document.addEventListener("DOMContentLoaded", () => {
    const fetchSchedule = async () => {
        const response = await fetch("/api/schedule");
        const data = await response.json();
        const scheduleDiv = document.getElementById("schedule");
        scheduleDiv.innerHTML = `<p>${data.status}</p><p>${data.datetime}</p>`;
    };

    fetchSchedule();
    setInterval(fetchSchedule, 600000); // 10분마다 갱신
});
