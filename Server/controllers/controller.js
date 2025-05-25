const axios = require("axios");

const getMovieTheme = async (req, res) => {
  try {
    const omdbApiKey = process.env.OMDb_API_KEY;

    const movieTitles = [
      "Inception",
      "Interstellar",
      "Avengers",
      "Titanic",
      "The Dark Knight",
    ];
    const randomTitle =
      movieTitles[Math.floor(Math.random() * movieTitles.length)];

    const omdbUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(
      randomTitle
    )}&apikey=${omdbApiKey}`;

    const response = await axios.get(omdbUrl);
    const movie = response.data;
    if (movie.Response === "False") {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({
      title: movie.Title,
      overview: movie.Plot,
      poster: movie.Poster,
      genre: movie.Genre,
      imdbRating: movie.imdbRating,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie data", error: error.message });
  }
};

module.exports = { getMovieTheme };