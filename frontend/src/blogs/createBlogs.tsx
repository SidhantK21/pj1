"use client";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Input } from "../components/signUpform";
import { cn } from "../utils/cn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { createBlg } from "@proje1/blogwe-common"; // Ensure this import path is correct

export function Form() {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState<createBlg>({
    title: "",
    content: "",
  });
  const [successCard, setCard] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendCreateReq();
  };

  async function sendCreateReq() {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/blog/createBlog`,
        postContent,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setCard(true);
      setPostContent({ title: "", content: "" });

      setTimeout(() => {
        navigate("/blogs");
      }, 3000);
    } catch (e) {
      console.error(e);
      console.log("Error creating the blog");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full mx-auto rounded-md p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create a New Post
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Share your thoughts with the world
        </p>

        {successCard && (
          <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Your blog post has been created successfully!
          </div>
        )}

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title here"
              type="text"
              required
              value={postContent.title}
              onChange={(e) =>
                setPostContent({
                  ...postContent,
                  title: e.target.value,
                })
              }
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="content">Content</Label>
            <Input
              id="content"
              placeholder="Write your content here"
              type="text"
              required
              value={postContent.content}
              onChange={(e) =>
                setPostContent({
                  ...postContent,
                  content: e.target.value,
                })
              }
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit Post &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
