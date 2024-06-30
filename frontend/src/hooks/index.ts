import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const BlogsData = () => {
  const [loading, setLoading] = useState(true);
  const [blogsContent, setBlogsContent] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = () => {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setBlogsContent(response.data.post);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching blog data:", error);
        });
    };

    if (token) {
      // Fetch data after 10 seconds
      const timeout = setTimeout(fetchData, 1000);

      return () => clearTimeout(timeout); // Cleanup to prevent multiple requests
    } else {
      console.log("Token not found in localStorage.");
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return { loading, blogsContent };
};
