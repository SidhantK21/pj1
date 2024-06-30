import { useLocation } from "react-router-dom";

export function BlogDetails() {
  const location = useLocation();
  const { blogDetails } = location.state ;

  if (!blogDetails) {
    return <div>No blog details available.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl my-4">{blogDetails.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{blogDetails.publishedDate}</p>
      <p className="text-lg text-zinc-700">{blogDetails.content}</p>
      <p className="text-sm text-gray-500 mt-4">By {blogDetails.authorName}</p>
    </div>
  );
}
