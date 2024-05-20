import React, { useState } from 'react';
import BasicCard from '../../../components/Common/user/common/BasicCard/BasicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from '../../../components/Common/user/common/SearchBar/SearchBar';
import IconButton from '@mui/material/IconButton';
import CommonButton from '../../../components/Common/user/common/commonButton/commonButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridWrapper from '../../../components/Common/user/common/GridWrapper/GridWrapper';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { cardHeaderStyles } from './styles';

const DayExplorer = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [nasaData, setNasaData] = useState(null);

    const getHeader = () => {
        const handleChange = async (value) => {
            setSelectedDate(value);
            // Call NASA API here with the selected date
            await fetchNASAData(value);
        };

        const addUser = () => {
            console.log('click')
        };

        return (
            <Box sx={cardHeaderStyles.wrapper}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={['DatePicker']}
                    >
                        <DemoItem>
                            <DatePicker value={selectedDate} onChange={handleChange} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>

                <Box>
                    <CommonButton
                        variant="contained"
                        onClick={addUser}
                        size="large"
                        sx={cardHeaderStyles.addUserButton}
                    >
                        Add Day
                    </CommonButton>
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>
        )
    };

    const fetchNASAData = async (date) => {
        try {
            const NASA_KEY = process.env.REACT_APP_NASA_API_KEY;
            const formattedDate = dayjs(date).format('YYYY-MM-DD'); // Format the date
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${formattedDate}`);
            const data = await response.json();
            setNasaData(data);
        } catch (error) {
            console.error('Error fetching NASA data:', error);
        }
    };
    
    const getContent = () => {
        if (nasaData) {
            return (
                <div>
                    <img src={nasaData.url} alt="NASA" style={{ maxWidth: '100%', height: 'auto' }} />
                    <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem', lg: '1.4rem' } }}>{nasaData.explanation}</Typography>
                </div>
            );
        } else {
            return (
                <Typography
                    align="center"
                    sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem' }}
                >
                    No Data for this Request yet
                </Typography>
            );
        }
    };

    return (
        <GridWrapper>
            <BasicCard
                header={getHeader()}
                content={getContent()}
            />
        </GridWrapper>
    )
}

export default DayExplorer;
