import {useState ,useEffect} from 'react';
import {Container , Typography, Button, Box, Card,CardMedia,CardContent}from "@mui/material";
import api from "../utils/api";

const Movies=()=>{
  const [movie,setMovie]=useState(null);
  const[loading,setLoading]=useState(false);

  const fetchRandomMovie=async()=>{
    setLoading(true);
    try{
      const response=await api.getRandomMovie();
      setMovie(response.data);
    }catch(error){
      console.error("Error fetching movie:",error);

    } finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchRandomMovie();
  },[]);
  return(
    <container maxWidth="md" sx={{mt:4}}>
      <Typography variant="h4" gutterBottom>
        Random Movie
        </Typography>
        <Button 
        variant="contained"
        onClick={fetchRandomMovie}
        disabled={loading}
        sx={{mb:3}}
        >
          {loading?'Loading...':"Get another Movie"}

        </Button>
        {movie &&(
          <Card sx={{maxWidth:600}}>
            <CardMedia 
            component="img"
            height="400"
            image={movie.poster}
            alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component="div">
                {movie.title} ({movie.imdbRating}/10)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.genre}
              </Typography>
              <Typography variant="body1" sx={{mt:2}}>
                {movie.overview}
              </Typography>
            </CardContent>
          </Card>
        )}
    </container>
  );
};

export default Movies;