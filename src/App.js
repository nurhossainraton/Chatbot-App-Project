import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Chat from './components/Chat';
import FileUpload from './components/FileUpload';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [chatResponse, setChatResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleFileUpload = (file) => {
    setPdfFile(file);
  
  };

  const handleChatSubmit = async (query) => {
    setChatResponse('Response from the bot');
    
    setAudioUrl('/path/to/audio');
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Factory Document Chatbot
      </Typography>
      <Box sx={{ mt: 4 }}>
        <FileUpload onFileUpload={handleFileUpload} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Chat onSubmit={handleChatSubmit} response={chatResponse} audioUrl={audioUrl} />
      </Box>
    </Container>
  );
}

export default App;
