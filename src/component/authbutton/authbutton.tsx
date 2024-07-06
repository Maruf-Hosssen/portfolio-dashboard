import { getUserInfo, removeUser } from '@/service/auth.service';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogOut = () => {
    removeUser();
    router.refresh();
    router.push('/login');
  };
  return (
    <>
      {userInfo?.email ? (
        <Button
          onClick={handleLogOut}
          variant="contained"
          color="error"
          sx={{}}
        >
          Logout
        </Button>
      ) : (
        <Button href="/login" variant="contained" color="primary">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
