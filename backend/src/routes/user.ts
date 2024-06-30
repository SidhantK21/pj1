import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { SignInInp, signUpInput } from "@proje1/blogwe-common";
import { Hono } from "hono";
import { sign } from 'hono/jwt';



export const userRouter=new Hono<{
        Bindings:{
            DATABASE_URL:string,
            JWT_SECRET:string,
            header:string
        }
}>();



userRouter.post('/signUp', async (c) => {

    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      
      const body = await c.req.json();

      // this was causing the error so removing it was and approach 

      const {success}=signUpInput.safeParse(body)
      if(!success)
      {
        c.status(400);
        // console.log(success);
        return c.json({message:"Incorrect inputs !"});
      }

      try {
          const user = await prisma.user.create({
              data: {
                  name:body.name,
                  email: body.email,
                  password: body.password
              }
          });
          const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt });
      } catch(e) {
          c.status(500);
          console.log(e);
          return c.json({ error: "error while signing up" });
      }finally{
        await prisma.$disconnect();
      }
  
  });
  
userRouter.post('/signIn',async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL	,
      }).$extends(withAccelerate());
    
    const body=await c.req.json();
    const {success}=SignInInp.safeParse(body);

    if(!success){
      return c.json({message:"Incorrect Creds !"})
    }
    try{
    const user=await prisma.user.findUnique({
      where:{
        email:body.email,
        password:body.password
      }
    });
    if(!user)
      {
        c.status(500);
        return c.json({message:"User not found or Invalid creds !"});
      }
  
    const jwt=await sign ({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt});
    }
    catch(e){
      console.log(e);
      c.status(403);
      return c.text("Invalid")
    }finally{
      await prisma.$disconnect();
    }
  
      
  });
  