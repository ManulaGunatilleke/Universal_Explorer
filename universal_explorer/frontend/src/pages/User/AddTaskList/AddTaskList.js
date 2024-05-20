import React, { useState } from 'react';
import BasicCard from '../../../components/Common/systemAdmin/common/BasicCard/BasicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from '../../../components/Common/systemAdmin/common/SearchBar/SearchBar';
import IconButton from '@mui/material/IconButton';
import CommonButton from '../../../components/Common/systemAdmin/common/commonButton/commonButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridWrapper from '../../../components/Common/systemAdmin/common/GridWrapper/GridWrapper';
import { cardHeaderStyles } from './styles';
import TaskModal from '../../../components/Common/user/Modals/TaskModal/TaskModal';

const AddTaskList = () => {
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
            {
                tasks.length ?
                    tasks.map((task, index) => (
                        <Box key={index} sx={{ marginBottom: '20px' }}>
                            <Typography>Task ID: {task.taskId}</Typography>
                            {/* <Typography>Date: {task.date}</Typography> */}
                            <Typography>Priority: {task.priority}</Typography>
                            <Typography>Description: {task.description}</Typography>
                        </Box>
                    )) :
                    <Typography
                        align="center"
                        sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem' }}
                    >
                        No tasks for this project yet
                    </Typography>
            }
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

export default AddTaskList;
