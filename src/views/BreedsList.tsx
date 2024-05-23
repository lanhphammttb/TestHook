// src/components/BreedsList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreeds } from '../breedsSlice';
import { RootState, AppDispatch } from '../store';
import {
  CircularProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert
} from '@mui/material';

const BreedsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { breeds, status, error } = useSelector(
    (state: RootState) => state.breeds
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBreeds());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <CircularProgress />;
  } else if (status === 'succeeded') {
    content = (
      <Grid container spacing={3}>
        {Array.isArray(breeds) &&
          breeds.map((breed: any) => (
            <Grid item xs={12} sm={6} md={4} key={breed.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{breed.attributes.name}</Typography>
                  <Typography variant="body2">
                    {breed.attributes.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  } else if (status === 'failed') {
    content = <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Dog Breeds
      </Typography>
      {content}
    </Container>
  );
};

export default BreedsList;
