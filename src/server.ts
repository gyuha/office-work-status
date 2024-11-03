import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';
import { authController } from './controllers/authController';
import { scheduleController } from './controllers/scheduleController';
import { configController } from './controllers/configController';

const app = new Hono();

app.use('/public/*', serveStatic({ root: './public' }));

app.route('/api/auth', authController);
app.route('/api/schedule', scheduleController);
app.route('/config', configController);

app.get('/', (c) => c.html('<!DOCTYPE html><html><head><title>My Schedule App</title></head><body><div id="root"></div><script src="/public/js/index.js"></script></body></html>'));

app.fire();