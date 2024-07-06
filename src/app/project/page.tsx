'use client';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IProject {
  title: string;
  description: string;
  technologies: string[];
  img: string;

  link: string;
  githubClient: string;
  githubServer: string;
  features: string;
}

const Project = () => {
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IProject>();
  const onSubmit: SubmitHandler<IProject> = async (values) => {
    console.log(values);

    try {
      const response = await fetch(
        'https://portfoliodashboard-kohl.vercel.app/project',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Project added successfully!');
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
        Add New Project
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: '30px' }}>
          <Grid item xs={4}>
            <TextField
              required
              label="Project Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('title', { required: true })}
            />
          </Grid>

          <Grid item xs={8}>
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
              label="Live link"
              margin="normal"
              {...register('link', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              variant="outlined"
              fullWidth
              label="Github Client"
              margin="normal"
              {...register('githubClient', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              variant="outlined"
              fullWidth
              label="Github Server"
              margin="normal"
              {...register('githubServer', { required: true })}
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
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="Features"
              multiline
              rows={4}
              defaultValue="Default Value"
              fullWidth
              {...register('features', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Image"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('img', { required: true })}
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
          Add Project
        </Button>
      </form>
    </Box>
  );
};

export default Project;
