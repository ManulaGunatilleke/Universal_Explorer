import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CommonButton from '../../../user/common/commonButton/commonButton';

const MarsRoverModal = ({ open, onClose, onSubmit }) => {
    const [roverName, setRoverName] = useState('');
    const [earthDate, setEarthDate] = useState('');
    const [camera, setCamera] = useState('');
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === 'roverName') {
        setRoverName(value);
      } else if (name === 'earthDate') {
        setEarthDate(value);
      } else if (name === 'camera') {
        setCamera(value);
      }
    };
  
    const handleSubmit = () => {
      onSubmit(roverName, earthDate, camera);
      onClose();
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: '8px', // Add border radius for a rounded appearance
          }}
        >
          <Typography variant="h6" gutterBottom>
            Mars Rover Details
          </Typography>
          <div style={{ marginBottom: '16px' }}> {/* Add margin to space out input fields */}
            <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>Rover Name:</Typography> {/* Add margin bottom to the title */}
            <select
              name="roverName"
              value={roverName}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // Apply styles to the select element
            >
              <option value="Curiosity">Curiosity</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Spirit">Spirit</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>Earth Date:</Typography>
            <input
              type="date"
              name="earthDate"
              value={earthDate}
              onChange={handleInputChange}
              style={{ width: 'calc(100% - 22px)', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // Apply styles to the input element with fixed width
            />
          </div>
          <div>
            <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>Camera:</Typography>
            <select
              name="camera"
              value={camera}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} // Apply styles to the select element
            >
              <option value="FHAZ">Front Hazard Avoidance Camera</option>
              <option value="RHAZ">Rear Hazard Avoidance Camera</option>
              <option value="MAST">Mast Camera</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <Box sx={{ mt: 2 }}>
            <CommonButton variant="contained" onClick={handleSubmit}>
              Submit
            </CommonButton>
            <CommonButton onClick={onClose} sx={{ ml: 1 }}>
              Cancel
            </CommonButton>
          </Box>
        </Box>
      </Modal>
    );
  };
  
  export default MarsRoverModal;
