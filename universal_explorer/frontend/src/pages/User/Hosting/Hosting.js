import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import BasicCard from '../../../components/Common/systemAdmin/common/BasicCard/BasicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from '../../../components/Common/systemAdmin/common/SearchBar/SearchBar';
import IconButton from '@mui/material/IconButton';
import CommonButton from '../../../components/Common/systemAdmin/common/commonButton/commonButton';
import Box from '@mui/material/Box';
import GridWrapper from '../../../components/Common/systemAdmin/common/GridWrapper/GridWrapper';
import { cardHeaderStyles } from './styles';
import TaskModal from '../../../components/Common/user/Modals/TaskModal/TaskModal';
import Image from '../../../assets/images/Index_img/indexpic2.jpg';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Hosting = () => {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [searchResults, setSearchResults] = useState(tasks);

    const getHeader = () => {
        const handleSearch = (value) => {
            filterData(value);
        };

        const filterData = (value) => {
            const lowercasedValue = value.toLowerCase().trim();
            if (lowercasedValue === '') setTasks(searchResults);
            else {
                const filteredData = searchResults.filter((item) => {
                    return Object.keys(item).some((key) =>
                        item[key].toString().toLowerCase().includes(lowercasedValue)
                    );
                });
                setTasks(filteredData);
            }
        };

        const addTask = () => {
            setOpen(true);
        };

        return (
            <Box sx={cardHeaderStyles.wrapper}>
                <SearchBar
                    placeholder="Search by task ID, date, priority, or description"
                    onChange={(event) => handleSearch(event.target.value)}
                    searchBarWidth='720px'
                />
                <Box>
                    <CommonButton
                        variant="contained"
                        onClick={addTask}
                        size="large"
                        sx={cardHeaderStyles.addUserButton}
                    >
                        Add Task
                    </CommonButton>
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>
        )
    };

    const addNewTask = (data) => {
        tasks.push({ ...data });
        setOpen(false);
    };

    const getContent = () => (
        <>
            <Card sx={{ maxWidth: 345, flex: '1 0 300px' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={Image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345, flex: '1 0 300px' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={Image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>
            
        </>
    );

    return (
        <GridWrapper>
            <BasicCard
                header={getHeader()}
                content={getContent()}
            />
            <TaskModal open={open} onClose={() => setOpen(false)} addNewTask={addNewTask} />
        </GridWrapper>
    )
}

// const handleShare = () => {
//     // Implement share functionality
//     alert('Share functionality coming soon!');
// }

export default Hosting;
