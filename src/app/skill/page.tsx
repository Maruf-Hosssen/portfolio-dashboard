'use client';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISkill {
  name: string;
  logo: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}
const Skill = () => {
  const { register, handleSubmit, reset } = useForm<ISkill>();
  const onSubmit: SubmitHandler<ISkill> = async (values) => {
    console.log(values);

    try {
      const response = await fetch(
        'https://portfoliodashboard-kohl.vercel.app/skill',
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
      alert('Skill added successfully!');
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
        Add New Skill
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: '30px' }}>
          <Grid item xs={4}>
            <TextField
              required
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('name', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Logo"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register('logo', { required: true })}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="level-select-label">Level</InputLabel>
              <Select
                labelId="level-select-label"
                id="level-select"
                {...register('level', { required: true })} // Register with useForm
                label="Level"
                required
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
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

export default Skill;
