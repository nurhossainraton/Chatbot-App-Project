import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Chat = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (query.trim()) {
      try {
        setError('');
        const result = await axios.post('http://localhost:8000/query/', {
          query: query
        });

      
        setResponse(result.data.text);
      } catch (err) {
        setError('Error processing the query. Please try again.');
        console.error(err);
      }

      
      setQuery('');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Ask a question or search for a keyword</Typography>
      <TextField
        fullWidth
        label="Enter your query"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Submit
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {response && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Response</Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
