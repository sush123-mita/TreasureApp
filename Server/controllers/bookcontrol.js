const axios=require("axios");
const getbook=async(req,res)=>{
  try{
    const genre=['fiction','fantasy','mystery','science','romance'];
    const randomGenre=genre[Math.floor(Math.random()*genre.length)];

    const url=`https://www.googleapis.com/books/v1/volumes?q=subject:${randomGenre}&maxResults=10`;
    const response=await axios.get(url);
    const books=response.data.items || [];

    const bookData=books
    .filter(book=> book.volumeInfo)
    .map(book=>({
      
      title:book.volumeInfo.title || "No Title",
      authors:book.volumeInfo.authors || ["Unknown Author"],
      description:book.volumeInfo.description || "No Description Available",
      thumbnail:book.volumeInfo.imageLinks?.thumbnail,
      infoLink:book.volumeInfo.infoLink,
    }));
    res.json(bookData);
  }catch(error){
    res.status(500).json({message:"Error fetching random books", error:error.message});
  }
};
const searchBooks=async(req,res)=>{
  try{
    const query=req.query.q;
    if(!query)return res.status(400).json({message:"Query is required"});

    const url= `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`;
    const response=await axios.get(url);
    const books=response.data.items;
    const bookData=books.map(book=>({
      title:book.volumeInfo.title,
      authors:book.volumeInfo.authors,
      description:book.volumeInfo.description,
      thumbnail:book.volumeInfo.imageLinks?.thumbnail,
      infoLink:book.volumeInfo.infoLink
    }));
    res.json(bookData);



  }catch(error){
    res.status(500).json({message:"error searching books",error:error.message})
  }
};

module.exports={
  getbook,
  searchBooks
}