import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Transaction({ id, name, amount }) {

  const navigate = useNavigate()

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          ${amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/transactions/${id}/edit`)}
          size="small"
        >
          Edit
        </Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}