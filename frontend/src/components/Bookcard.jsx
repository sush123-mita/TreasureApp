import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const BookCard = ({ book }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {book.thumbnail && (
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: 'contain', pt: 2 }}
          image={book.thumbnail}
          alt={book.title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.authors?.join(', ')}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {book.description?.substring(0, 100)}...
        </Typography>
      </CardContent>
      <Button 
        size="small" 
        href={book.infoLink} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Learn More
      </Button>
    </Card>
  );
};

export default BookCard;