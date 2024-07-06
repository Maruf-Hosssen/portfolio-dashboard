'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import AuthButton from '@/component/authbutton/authbutton';

const Homepage = () => {
  const route = useRouter();

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '40px',
          textAlign: 'center',
          mt: '50px',
        }}
      >
        This Is My Portfolio Dashboard
      </Typography>
      <AuthButton></AuthButton>
    </Box>
  );
};

export default Homepage;
