import { useNavigate } from "react-router-dom";

interface BlogContent {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string; // Add an ID to navigate to the specific blog post
}

export function CustomCardDemo({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogContent) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${id}`);
  };

  // Function to truncate the content
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
          {truncateContent(content, 100)} {/* Truncate the content to 100 characters */}
        </p>
        <div className="flex flex-row justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{publishedDate}</span>
          <button
            onClick={handleReadMore}
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
