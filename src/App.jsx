import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const shortenUrl = async () => {
    if (url.trim() === '') {
      alert('Please enter a URL to shorten.');
      return;
    }

    
    try {
      const response = await fetch('https://cleanuri.com/api/v1/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "url": url })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setShortenedUrl(data.result_url);

    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };
  const copyToClipboard = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl)
        .then(() => alert('Shortened URL copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };
  

  return (
    <div className="container">
    <h1>URL Shortener</h1>
    <input
      type="text"
      id="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter URL"
    />
    <button id="btn" onClick={shortenUrl}>Shorten URL</button>

    <input
      type="text"
      className="shrturl"
      value={shortenedUrl}
      placeholder="shortened url here"
      readOnly
    />
    <button className="cpybtn" onClick={copyToClipboard}>Copy to clipboard</button>
  </div>
    
  )
}

export default App
