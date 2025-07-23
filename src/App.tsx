

import React, { useState } from 'react';
import { logEvent } from './service/urlservice';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async () => {
    setError('');
    logEvent('info', 'component', 'Shorten button clicked', { url });

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL.');
      logEvent('warn', 'component', 'Invalid URL entered', { url });
      return;
    }

    // Simulate URL shortening
    const fakeShort = 'https://short.ly/' + Math.random().toString(36).substring(7);
    setShortUrl(fakeShort);

    logEvent('info', 'api', 'URL shortened', {
      original: url,
      short: fakeShort
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    logEvent('info', 'component', 'Short URL copied to clipboard', { shortUrl });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>React URL Shortener</h2>

      <input
        type="text"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <button
        onClick={handleShorten}
        disabled={!url.trim()}
        style={{ width: '100%', padding: '0.5rem' }}
      >
        Shorten URL
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
      )}

      {shortUrl && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Short URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <button onClick={copyToClipboard} style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
