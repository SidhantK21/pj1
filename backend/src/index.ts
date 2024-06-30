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
app.use('/*',cors())


app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);


export default app;
