import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { blogRouter } from './routes/blog';
import { userRouter } from './routes/user';
import { cors } from 'hono/cors';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
    header:string
	}
}>();
const corsOptions = {
	origin: 'https://pj1-delta.vercel.app/',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	optionsSuccessStatus: 200,
  };
  
  // Use the CORS middleware
  app.use(cors(corsOptions));
  


app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);


export default app;
