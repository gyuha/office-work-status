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

        <script src="/js/update-status.js"></script>
    `;

    return layout(content);
};