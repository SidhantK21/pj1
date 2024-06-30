import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface BlogContent {
  authorName: string;
  title: string;
  content: string;
  id: string;
  publishedDate: string;
}

export function CustomCardDemo({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogContent) {
  const [fullContent, setFullContent] = useState<string | null>(null);
  const [fullTitle, setFullTitle] = useState<string | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleReadMore = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      const blogDetails = response.data.post;
      console.log("Blog details:", blogDetails);

      setFullContent(blogDetails.content);
      setFullTitle(blogDetails.title);
      setShowFullContent(true);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      // Handle error, such as displaying a message to the user
    }
  };

  const handleCloseFullContent = () => {
    setShowFullContent(false);
    setFullContent(null);
    setFullTitle(null);
  };

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="relative overflow-hidden w-full h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100 p-6">
      <div className="flex items-center space-x-4">
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
          <span className="font-semibold text-white">{authorName[0]}</span>
        </div>
        <p className="font-semibold text-zinc-700">{authorName}</p>
      </div>
      <div className="p-4">
        <h2 className="font-bold my-4 text-2xl text-transparent bg-clip-text bg-black shadow-lg transition-transform transform hover:scale-105">
          {title}
        </h2>
        <p className="font-normal my-4 text-sm text-zinc-500">
          {truncateContent(content, 100)}
        </p>
        {!fullContent && (
          <div className="flex flex-row justify-between items-center mt-4">
            <span className="text-sm text-gray-500">{publishedDate}</span>
            <button
              onClick={handleReadMore}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              Read More
            </button>
          </div>
        )}
      </div>

      {showFullContent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <button
              onClick={handleCloseFullContent}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <h2 className="font-bold my-4 text-2xl text-black">
              {fullTitle}
            </h2>
            <p className="font-normal my-4 text-sm text-zinc-500">
              {fullContent}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
