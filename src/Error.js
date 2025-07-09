import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Error() {
  const history = useHistory();

  // useEffect to trigger some action when the Error component mounts
  useEffect(() => {
    // Automatically redirect after 5 seconds to the home page
    const timer = setTimeout(() => {
      history.push("/");
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="error-container">
      <h1>Error 404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <p>Redirecting you to the home page in 5 seconds...</p>

      {/* Button for users to manually navigate to the homepage */}
      <button onClick={() => history.push("/")}>Go to Home</button>

      <style jsx>{`
        .error-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f8d7da;
          color: #721c24;
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 40px;
          font-weight: bold;
        }
        p {
          font-size: 18px;
          text-align: center;
          max-width: 600px;
          margin-bottom: 20px;
        }
        button {
          background-color: #f44336;
          color: white;
          padding: 12px 24px;
          font-size: 18px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
}
