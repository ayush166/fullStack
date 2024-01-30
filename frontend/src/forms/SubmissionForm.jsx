import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import '../styles/Dashboard.css'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const SubmissionForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [ngramsData, setNgramsData] = useState(null);
  const [id, setId] = useState('');
  const [friendId, setFriendId] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('friendId', friendId);
    formData.append('password', password);
    formData.append('photo', file);
    
    try {
      const response = await axios.post('http://localhost:4000/api/submit', formData);
      console.log(response.data);
      setSubmissionStatus('Form Submitted Successfully');
      setNgramsData(response.data.ngrams);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('Error submitting form');
    }
  };
  const renderNgramRows = (ngramData) => {
    return Object.entries(ngramData).flatMap(([stringKey, ngramValues]) =>
      Object.entries(ngramValues).map(([ngramKey, items]) => (
        <TableRow key={`${stringKey}-${ngramKey}`}>
          <TableCell component="th" scope="row">
            {stringKey}
          </TableCell>
          <TableCell align="right">{ngramKey}</TableCell>
          <TableCell align="right">{items.join(', ')}</TableCell>
        </TableRow>
      ))
    );
  };

  return (
    <Box className='dashboard' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" component="header" sx={{ mt: 4 }}>
        Submission Dashboard
      </Typography>
      <Typography className={`submission-status ${submissionStatus === 'Form Submitted Successfully' ? 'green-status' : 'error'}`} sx={{ mt: 2 }}>
  {submissionStatus}
</Typography>
      <Box
        component="form"
        className='submission-form'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}
        noValidate
        autoComplete="off"
      >
        <TextField label="ID" variant="outlined" value={id} onChange={(e) => setId(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Friend ID" variant="outlined" value={friendId} onChange={(e) => setFriendId(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <div {...getRootProps()} className="dropzone" sx={{ border: '1px dashed', padding: 2, mb: 2 }}>
          <input {...getInputProps()} />
          <Typography>Drag 'n' drop photo here, or click to select photo</Typography>
        </div>
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
      {ngramsData && (
        <TableContainer component={Paper} sx={{ maxWidth: 650, marginTop: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="ngrams table">
            <TableHead>
              <TableRow>
                <TableCell>String Key</TableCell>
                <TableCell align="right">N-Gram Key</TableCell>
                <TableCell align="right">Values</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderNgramRows(ngramsData)}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SubmissionForm;
