import { layout } from './layout';
import { Event } from '../db';


export const renderHome = (events: Event[], today: string) => {
    const content = `
        <div class="max-w-md mx-auto min-h-screen p-4">
            <!-- 날짜 표시 -->
            <div class="text-center mb-6">
                <h1 class="text-xl text-gray-600">${today}</h1>
            </div>

            <!-- 상태 표시 카드 -->
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div class="text-center">
                    <h2 class="text-gray-500 mb-2">현재 상태</h2>
                    <div id="status-container" class="relative">
                        <div id="status" 
                             class="text-2xl font-bold text-white py-3 px-6 rounded-lg inline-block min-w-[150px]">
                            로딩중...
                        </div>
                    </div>
                </div>
            </div>

            <!-- 일정 목록 카드 -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2 class="text-lg font-bold text-gray-700 mb-4">오늘의 일정</h2>
                <div id="events" class="space-y-4">
                    ${events.length === 0 ? 
                        '<div class="text-center text-gray-500 py-4">예정된 일정이 없습니다</div>' :
                        events.map(event => `
                            <div class="border-l-4 border-blue-500 pl-4 py-2">
                                <div class="font-medium text-gray-800">${event.subject}</div>
                                <div class="text-sm text-gray-500 mt-1">
                                    ${new Date(event.startTime).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })} - 
                                    ${new Date(event.endTime).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>

            <!-- 마지막 업데이트 시간 -->
            <div class="text-center text-sm text-gray-400 mt-6">
                마지막 업데이트: <span id="last-update"></span>
            </div>
        </div>

        <script>
            async function updateStatus() {
                try {
                    const response = await fetch('/api/status');
                    const data = await response.json();
                    const statusElement = document.getElementById('status');
                    
                    // 상태에 따른 배경색 설정
                    const colors = {
                        '근무중': 'bg-green-500',
                        '재택근무': 'bg-blue-500',
                        '휴일': 'bg-gray-500'
                    };
                    
                    // 모든 색상 클래스 제거
                    statusElement.classList.remove('bg-green-500', 'bg-blue-500', 'bg-gray-500');
                    // 새로운 색상 클래스 추가
                    statusElement.classList.add(colors[data.status]);
                    
                    statusElement.textContent = data.status;
                    
                    // 마지막 업데이트 시간 갱신
                    document.getElementById('last-update').textContent = 
                        new Date().toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        });
                } catch (error) {
                    console.error('Status update failed:', error);
                }
            }
            
            // 초기 업데이트
            updateStatus();
            
            // 1분마다 업데이트
            setInterval(updateStatus, 60000);
        </script>
    `;

    return layout(content);
};