import { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardMedia, CardContent , Button} from '@mui/material';
import api from '../utils/api';

const Space = () => {
  const [spaceData, setSpaceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSpaceData = async () => {
    setLoading(true);
    try {
      const response = await api.getSpaceImage();
      setSpaceData(response.data);
    } catch (error) {
      console.error('Error fetching space data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaceData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Astronomy Picture of the Day
      </Typography>
      
      <Button 
        variant="contained" 
        onClick={fetchSpaceData}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? 'Loading...' : 'Refresh'}
      </Button>

      {spaceData && (
        <Card>
          <CardMedia
            component="img"
            height="500"
            image={spaceData.url}
            alt={spaceData.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {spaceData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {spaceData.date}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {spaceData.explanation}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Space;