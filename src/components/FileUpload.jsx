import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/upload-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      if (response.data.audio_url) {
        setAudioUrl('http://localhost:8000' + response.data.audio_url);
      }
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button 
      variant="contained" 
      color="primary" 
      onClick={handleUpload}
      sx={{ mt: 2 }}  >
      Upload
      </Button>

      {audioUrl && (
        <div>
          <p>Audio Response:</p>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
