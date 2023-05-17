import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './UnauthenticatedScreen.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// image
import image from '../images/person-throwing-bread.png'

export default function UnauthenticatedScreen() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <div className="unauth-screen page">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="landing-page-left-column">
            <Typography variant="h3" gutterBottom>
              Why dough?
            </Typography>
            <Typography variant="body1" gutterBottom>
              To get one step closer towards financial freedom! Dough or No Dough makes it easier than ever to track your expenses. While this may seem like a non-significant habit to get into, it will set you on the right track to live the life you want to live.
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button id="button" onClick={() => navigate('/signup')} variant="contained" color="primary">Sign up</Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={image} alt="hand-horns" style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        </Grid>
      </Grid>
    </div>
  );
}