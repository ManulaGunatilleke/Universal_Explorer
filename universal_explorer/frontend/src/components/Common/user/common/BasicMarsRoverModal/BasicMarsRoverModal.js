import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommonButton from '../commonButton/commonButton';
import { modalStyles } from './styles';

const BasicMarsRoverModal = ({ open, onClose, title, rover, date, camera, onSubmit }) => {
    return (
        <Modal open={open} onClose={onClose} >
            <Box sx={modalStyles.wrapper}>
                <Typography
                    variant="h6"
                    component="h2"
                >
                    {title}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Rover: {rover}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Date: {date}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Camera: {camera}
                </Typography>
                <Box sx={modalStyles.buttons}>
                    <CommonButton
                        variant="contained"
                        onClick={onSubmit}
                    >
                        Submit
                    </CommonButton>
                    <CommonButton onClick={onClose}>Cancel</CommonButton>
                </Box>
            </Box>
        </Modal>
    );
}

export default BasicMarsRoverModal;
