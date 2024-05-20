import React, { useState } from 'react';
import BasicCard from '../../../components/Common/user/common/BasicCard/BasicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import CommonButton from '../../../components/Common/user/common/commonButton/commonButton';
import Box from '@mui/material/Box';
import GridWrapper from '../../../components/Common/user/common/GridWrapper/GridWrapper';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { cardHeaderStyles } from './styles';
import MarsRoverModal from '../../../components/Common/user/Modals/MarsRoverModal/MarsRoverModal';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';

const MarsRoverExplorer = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [marsRoverData, setMarsRoverData] = useState(null); // State to store Mars Rover data
    const [modalOpen, setModalOpen] = useState(false); // State to control the modal open/close

    const getHeader = () => {
        const handleChange = async (value) => {
            setSelectedDate(value);
            console.log(value);
        };

        const addMarsRover = () => {
            setModalOpen(true); // Open the modal when the button is clicked
        };

        return (
            <Box sx={cardHeaderStyles.wrapper}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DemoItem>
                            <DatePicker value={selectedDate} onChange={handleChange} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>

                <Box>
                    <CommonButton
                        variant="contained"
                        onClick={addMarsRover}
                        size="large"
                        sx={cardHeaderStyles.addUserButton}
                    >
                        Add Mars Rover
                    </CommonButton>
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>
        )
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const fetchMarsRoverData = async (roverName, earthDate, camera) => {
        try {
            const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
            const formattedDate = dayjs(earthDate).format('YYYY-MM-DD');
            console.log(roverName, earthDate, camera);
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${formattedDate}&camera=${camera}&api_key=${NASA_KEY}`);
            const data = await response.json();
            setMarsRoverData(data);
        } catch (error) {
            console.error('Error fetching Mars Rover data:', error);
        }
    };

    const getContent = () => {
        if (marsRoverData && marsRoverData.photos && marsRoverData.photos.length > 0) {
            console.log(marsRoverData.photos.length);
            console.log(marsRoverData);
            return (
                <Grid container spacing={2}>
                    {marsRoverData.photos.map((photo, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                            <Card sx={{ maxWidth: '100%' }}>
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image={photo.img_src}
                                    title="Mars Rover"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Photo {index + 1}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Earth Date:</strong> {photo.earth_date}<br />
                                        <strong>Sol:</strong> {photo.sol}<br />
                                        <strong>Camera Name:</strong> {photo.camera.full_name}<br />
                                        <strong>Rover Name:</strong> {photo.rover.name}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            return (
                <Typography
                    align="center"
                    sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem' }}
                >
                    No Mars Rover data available
                </Typography>
            );
        }
    };
    
    

    return (
        <GridWrapper>
            <BasicCard header={getHeader()} content={getContent()} />
            {/* Render MarsRoverModal if modalOpen is true */}
            {modalOpen && (
                <MarsRoverModal
                    open={modalOpen}
                    onClose={closeModal}
                    onSubmit={(roverName, earthDate, camera) => fetchMarsRoverData(roverName, earthDate, camera)}
                />
            )}
        </GridWrapper>
    )
}

export default MarsRoverExplorer;
