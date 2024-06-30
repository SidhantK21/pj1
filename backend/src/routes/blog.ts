import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify} from 'hono/jwt';
import { createBlogInp, updtInp } from "@proje1/blogwe-common";


export  const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }

}>();

blogRouter.use('/*',async (c,next)=>{
    const authHeader =c.req.header('Authorization')||""; 

    try{
    const user=await verify(authHeader,c.env.JWT_SECRET);

    if(user){
        c.set("userId", user.id as string);
        await next();
    }else{
        c.status(403);
        return c.json({message:"You are not logged in !!"})
    }
    }catch(e){
        console.log(e);
        c.status(403);
        return c.json({message:"Error making request"})
    }  


})

blogRouter.post('/createBlog', async(c)=>{
    const body = await c.req.json();
    const authorId=c.get("userId");

    const {success}=createBlogInp.safeParse(body);
   if(!success)
    {
        c.status(403);
        return c.json({message:"Inputs not valid !"})
    }
        const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
    })
    return c.json({
        id:post.id,
        message:"Blog created"
    });
    }
    catch(e)
    {
        console.log(e);
        c.status(403);
        return c.json({message:"Error occured !!"})
    }
})

blogRouter.put('/updateBlog',async (c)=>{
    const body=await c.req.json();
    const {success}=updtInp.safeParse(body);
    if(!success)
        {
            c.status(411);
            return c.json({message:"Can't upadate with invalid creds !"})
        }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
    const post=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    if(!post)
    {
        return c.json({message:"Error updating blog"})
    }
    return c.json({message:"Blog upadated"})

    }
    catch(e){
        console.log(e);
        c.status(403);
        c.json({message:"Error"})
    }
});

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post =await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            published:true,
            publishedDate:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        post
    })

})

blogRouter.get('/:id',async (c)=>{
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
    const post=await prisma.post.findFirst({
        where:{
            id:id
        }
    })

    console.log(post);
    return c.json({
        post
    });

    }catch(e){
        c.status(403);
        return c.json({message:"Error fetching blog post!"})        
    }

})

