'use client';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IExperience {
  title: string;
  company: string;
  description: string;
  startDate: Date;
  endDate: Date;
  technologies: string[];
  location: string;
}
const Experience = () => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IExperience>();
  const onSubmit: SubmitHandler<IExperience> = async (values) => {
    console.log(values);

    try {
      const response = await fetch('http://localhost:5000/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Experience added successfully!');
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 600,
          mt: '20px',
        }}
      >
        Add New Experience
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: '30px' }}>
          <Grid item xs={6}>
            <TextField
              required
              label="Job Title"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('title', { required: true })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label="Compnay"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('company', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('description', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              variant="outlined"
              fullWidth
              type="date"
              margin="normal"
              {...register('startDate', { required: true })}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              required
              variant="outlined"
              fullWidth
              type="date"
              margin="normal"
              {...register('endDate', { required: true })}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              label="Technologies"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('technologies.0', { required: true })}
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              required
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('location', { required: true })}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          sx={{ mt: '20px' }}
        >
          Add Experience
        </Button>
      </form>
    </Box>
  );
};

export default Experience;
