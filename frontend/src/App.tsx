// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { SignUpPg } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Blogs } from './blogs/blogs';
import { SpotlightPreview } from './pages/LandingPage';
import { Form } from './blogs/createBlogs';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Add a route for the root path that redirects to /signin */}
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<SpotlightPreview />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPg />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/createBlogs" element={<Form/>} />


      </Routes>
    </Router>
  );
};

export default App;
