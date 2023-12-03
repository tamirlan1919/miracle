import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const favoritesData = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
  // Add more items as needed
];

const Favorites = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Favorites
      </Typography>
      <Grid container spacing={3}>
        {favoritesData.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, pb: 1 }}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon color="primary" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
