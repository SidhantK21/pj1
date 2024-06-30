import { z } from "zod";

export const signUpInput=z.object({
    name:z.string().optional(),
    email:z.string().email(),
    password:z.string().min(6)
  
  })

// type inference in zod 

export const SignInInp=z.object({
    email:z.string().email(),
    password:z.string()
})

export const createBlogInp=z.object({
    title:z.string(),
    content:z.string()
})

export const updtInp=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})


export type createBlg=z.infer<typeof createBlogInp>
export type SignIInp=z.infer<typeof SignInInp>
export type SignUpInp=z.infer<typeof signUpInput>
export type updBlogInp=z.infer<typeof updtInp>
