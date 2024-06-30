import { useState } from "react";
import { CustomCardDemo } from "./blogcard"; // Assuming CustomCardDemo is the customized blog card component
import { NavbarDemo } from "../ui/navBaract";
import { BlogsData } from "../hooks";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi"; // Using FiEdit from react-icons for edit icon

interface Blog {
  content: string;
  title: string;
  id: string;
  publishedDate?: any;
  author: {
    name: string;
  };
}

// Skeleton component to mimic the blog card structure
const BlogCardSkeleton = () => (
  <div className="flex-grow w-full max-w-2xl bg-white text-black rounded-lg shadow-lg overflow-hidden mx-auto lg:ml-0 lg:mr-auto animate-pulse">
    {/* Customize your skeleton structure */}
    <div className="w-full h-40 bg-gray-200 rounded-t-lg"></div>
    <div className="p-4">
      <div className="w-20 h-4 bg-gray-200 mb-2 rounded"></div>
      <div className="w-full h-3 bg-gray-200 mb-4 rounded"></div>
      <div className="flex justify-between items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export const Blogs = () => {
  const { loading, blogsContent } = BlogsData();
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function pageIncreaser() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function pageDecreaser() {
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : 1
    );
  }

  function navigation() {
    navigate("/createBlogs");
  }

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim() === "") {
      setError("Please enter your email address.");
    } else {
      // Your subscription logic goes here
      console.log("Subscribing with email:", email);
      // Clearing input and error after successful submission (dummy example)
      setEmail("");
      setError("");
    }
  }

  if (loading) {
    // Show skeleton loading state when loading is true
    return (
      <div className="min-h-screen bg-gray-100">
        <NavbarDemo />
        <main className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 grid grid-cols-1 gap-6 mt-48">
          {/* Render multiple skeleton components */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex-grow w-full max-w-2xl  bg-white text-black rounded-lg shadow-lg overflow-hidden mx-auto lg:ml-0 lg:mr-auto"
            >
              <BlogCardSkeleton />
            </div>
          ))}
        </main>
        <div className="join flex justify-center mt-10">
          <button onClick={pageDecreaser} className="join-item btn">
            «
          </button>
          <button className="join-item btn">{pageNumber}</button>
          <button onClick={pageIncreaser} className="join-item btn">
            »
          </button>
        </div>
        <footer className="footer bg-base-200 text-base-content p-10 mt-16">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          <form onSubmit={handleSubscribe}>
            <h6 className="footer-title">Newsletter</h6>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="join">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered join-item"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary join-item">
                  Subscribe
                </button>
              </div>
              {error && <p className="text-red-500 mt-1">{error}</p>}
            </fieldset>
          </form>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDemo />
      <div className="absolute top-16 right-4 md:right-8">
        <div
          className="flex items-center justify-center bg-slate-950 px-4 py-2 text-white rounded-md shadow-md cursor-pointer relative z-10 group"
          onClick={navigation}
        >
          <FiEdit className="mr-2" />
          <span className="opacity-0 group-hover:opacity-100 absolute bg-gray-800 text-white text-xs rounded-md px-2 py-1 -left-10 top-4 transform scale-0 group-hover:scale-100 transition-opacity ease-in-out duration-300">
            Publish Your Blog
          </span>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 mt-48">
        {blogsContent.map((blog: Blog, index) => (
          <div
            key={index}
            className="flex-grow w-full max-w-2xl bg-white text-black rounded-lg shadow-lg overflow-hidden mx-auto lg:ml-0 lg:mr-auto mb-8"
          >
            <CustomCardDemo
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
              id={blog.id} // Pass the id of the blog
            />
          </div>
        ))}
      </main>
      <div className="join flex justify-center mt-10">
        <button onClick={pageDecreaser} className="join-item btn">
          «
        </button>
        <button className="join-item btn">{pageNumber}</button>
        <button onClick={pageIncreaser} className="join-item btn">
          »
        </button>
      </div>
      <footer className="footer bg-base-200 text-base-content p-10 mt-16">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Web Development</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">UX/UI Designer</a>
          <a className="link link-hover">Vedio Editing</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form onSubmit={handleSubscribe}>
          <h6 className="footer-title">Subscribe for personalized help!</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary join-item">
                Subscribe
              </button>
            </div>
            {error && <p className="text-red-500 mt-1">{error}</p>}
          </fieldset>
        </form>
      </footer>
    </div>
  );
};
