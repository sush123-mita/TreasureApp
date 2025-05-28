import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import BookCard from "../components/Bookcard";
import api from "../utils/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const fetchRandomBooks = async () => {
    setLoading(true);
    try {
      const response = await api.getRandomBooks();
      setBooks(response.data);
      setIsSearch(false);
    } catch (error) {
      console.error("error fetching  random books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const searchBooks = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const response = await api.searchBooks(searchQuery);
      setBooks(response.data);
      setIsSearch(true);
    } catch (error) {
      console.error("Error searching boos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isSearch ? "Search Results" : "Random Books"}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchBooks()}
        />
        <Button
          variant="contained"
          onClick={searchBooks}
          disabled={loading || !searchQuery.trim()}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          onClick={fetchRandomBooks}
          disabled={loading}
        >
          Random
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {books.map((book, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Books;
