import React, { useState, useEffect } from "react";

// This is the About page component.
export default function About() {
  // State to hold the description text for the about section
  const [description, setDescription] = useState("");

  // useEffect hook to simulate fetching data on component mount
  useEffect(() => {
    // Simulating a fetch call to get the description
    setTimeout(() => {
      setDescription(
        "This is an about section where we describe the purpose of the app."
      );
    }, 2000);
  }, []);

  // A simple function to handle the change of description text
  const handleTextChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="about-container">
      <h2>About Our Application</h2>
      <textarea
        value={description}
        onChange={handleTextChange}
        rows="5"
        cols="50"
        placeholder="Type about text here"
      />
      <div className="about-description">
        <h3>Description</h3>
        <p>{description}</p>
      </div>

      {/* Adding a simple button to toggle more info */}
      <button onClick={() => alert("More information about the app")}>
        Show More Info
      </button>

      <style jsx>{`
        .about-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 60%;
          margin: 0 auto;
        }
        .about-container h2 {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        .about-description {
          margin-top: 20px;
        }
        .about-description h3 {
          font-size: 18px;
          color: #555;
        }
        .about-description p {
          font-size: 16px;
          color: #444;
        }
        button {
          margin-top: 20px;
          padding: 10px 15px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
