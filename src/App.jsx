import React, { useState } from 'react';
import './App.css'; // Import the CSS file

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const shortenUrl = async () => {
    if (url.trim() === '') {
      alert('Please enter a URL to shorten.');
      return;
    }

    try {
      const response = await fetch('https://api.tinyurl.com/create', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer jnanYucUbFeC0pkLwOy6MEp7iEhPYWLzbRLSz4O30lx3ulA5BGxNFl51i7Po', // Replace {your_api_key} with your actual TinyURL API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          domain: 'tiny.one' // You can change the domain if you have a custom one configured
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0].message);
      }

      setShortenedUrl(data.data.tiny_url);

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
        placeholder="Shortened URL here"
        readOnly
      />
      <button className="cpybtn" onClick={copyToClipboard}>Copy to clipboard</button>
<p class="pro">Challenge By <a href= "https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G" target='blank' class="lin1">Frontendmentor</a></p>
<p class="pro1">completed By <a href = "https://github.com/SupreetOP?tab=repositories" target="blank" class="lin2">SupreetOP</a></p>  
    </div>
    
   
  );
};

export default UrlShortener;
