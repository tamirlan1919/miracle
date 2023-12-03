import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const cartItems = [
  { id: 1, name: 'Product 1', price: 20.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 15.49, quantity: 1 },
  { id: 3, name: 'Product 3', price: 25.00, quantity: 3 },
  // Add more items as needed
];

const Cart = () => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item key={item.id} xs={12} md={6} lg={4} xl={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price.toFixed(2)} each
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pb: 1 }}>
                <IconButton aria-label="delete">
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h6" color="text.secondary">
          Total: ${calculateTotal()}
        </Typography>
      </Box>
    </Container>
  );
};

export default Cart;
