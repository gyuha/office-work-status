async function updateStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();
    const statusElement = document.getElementById("status");

    // 상태에 따른 배경색 설정
    const colors = {
      근무중: "bg-green-500",
      재택근무: "bg-blue-500",
      휴일: "bg-gray-500",
    };

    // 모든 색상 클래스 제거
    statusElement.classList.remove(
      "bg-green-500",
      "bg-blue-500",
      "bg-gray-500"
    );
    // 새로운 색상 클래스 추가
    statusElement.classList.add(colors[data.status]);

    statusElement.textContent = data.status;

    // 마지막 업데이트 시간 갱신
    document.getElementById("last-update").textContent =
      new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
  } catch (error) {
    console.error("Status update failed:", error);
  }
}

// 초기 업데이트
updateStatus();

// 1분마다 업데이트
setInterval(updateStatus, 60000);
