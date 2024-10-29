import { Hono } from 'hono';
import { serveStatic } from 'hono/bun'
import { CalendarService } from './calendar';
import { getTodayEvents, insertEvent } from './db';
import { renderHome } from './views/home';
import config from './config';

const app = new Hono();

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }));

// API endpoints
app.get('/api/status', async (c) => {
    const events = getTodayEvents();
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return c.json({ status: '휴일' });
    }
    
    const hasWFHEvent = events.some((event: { subject: string }) => 
        event.subject.toLowerCase().includes('재택')
    );
    
    return c.json({ status: hasWFHEvent ? '재택근무' : '근무중' });
});

// HTML 렌더링
app.get('/', async (c) => {
    const events = getTodayEvents();
    const today = new Date().toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    });

    return c.html(renderHome(events, today));
});

// 캘린더 동기화 작업
async function syncCalendar() {
    try {
        const calendarService = new CalendarService(config.msAccessToken);
        const events = await calendarService.getCalendarEvents();
        
        for (const event of events) {
            await insertEvent({
                id: event.id,
                subject: event.subject,
                startTime: event.start.dateTime,
                endTime: event.end.dateTime
            });
        }
    } catch (error) {
        console.error('Calendar sync failed:', error);
    }
}

// 15분마다 캘린더 동기화
setInterval(syncCalendar, 15 * 60 * 1000);

export default app;