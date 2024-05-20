import React, { useState, useEffect } from 'react';
import BasicModal from '../../common/BasicModal/BasicModal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const defaultInputValues = {
    taskId: '',
    // date: '',
    priority: '',
    description: ''
};

const TaskModal = ({ open, onClose, addNewTask }) => {
    const [values, setValues] = useState(defaultInputValues);

    const modalStyles = {
        inputFields: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        },
    };

    const validationSchema = Yup.object().shape({
        taskId: Yup.string()
            .required('Task ID is required')
            .min(6, 'Task ID must be at least 6 characters'),
        // date: Yup.date()
        //     .required('Date is required'),
        priority: Yup.string()
            .required('Priority is required'),
        description: Yup.string()
            .required('Description is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const addTask = (data) => {
        addNewTask(data);
    };

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open]);

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="Task ID"
                name="taskId"
                label="Task ID"
                required
                {...register('taskId')}
                error={errors.taskId ? true : false}
                helperText={errors.taskId?.message}
                value={values.taskId}
                onChange={(event) => handleChange('taskId', event.target.value)}
                sx={{ marginBottom: '20px' }} // Apply styles to TextField
            />

            {/* <TextField
                placeholder="Date"
                name="date"
                label="Date"
                type="date"
                required
                {...register('date')}
                error={errors.date ? true : false}
                helperText={errors.date?.message}
                value={values.date}
                onChange={(event) => handleChange('date', event.target.value)}
                sx={{ marginBottom: '20px' }} // Apply styles to TextField
            /> */}

            <TextField
                placeholder="Priority"
                name="priority"
                label="Priority"
                required
                {...register('priority')}
                error={errors.priority ? true : false}
                helperText={errors.priority?.message}
                value={values.priority}
                onChange={(event) => handleChange('priority', event.target.value)}
                sx={{ marginBottom: '20px' }} // Apply styles to TextField
            />

            <TextField
                placeholder="Description"
                name="description"
                label="Description"
                required
                {...register('description')}
                error={errors.description ? true : false}
                helperText={errors.description?.message}
                value={values.description}
                onChange={(event) => handleChange('description', event.target.value)}
                sx={{ marginBottom: '20px' }} // Apply styles to TextField
            />


        </Box>
    );

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="New user"
            subTitle="Fill out inputs and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(addTask)}
        />
    );
}

export default TaskModal;
