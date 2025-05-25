const axios=require("axios");
const astros=async(req,res)=>{
  try{
    const response=await axios.get('https://api.nasa.gov/planetary/apod',{
      params:{
        api_key:process.env.NASA_API_KEY,
      }
    });
    res.json(response.data);
  }catch(error){
    console.error("Error fetching data from Nasa Api: ",error);
    res.status(500).json({message:"Failed to fetch the data"})

  }
}
module.exports={astros};