import { Hono } from 'hono'  
import { serve } from 'bun'  

import { IndexController } from './controllers/indexController'  
import { ConfigController } from './controllers/configController'  

const app = new Hono()  

app.route('/', IndexController)  
app.route('/config', ConfigController)  

serve(app.fetch)  