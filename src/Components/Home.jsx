import React, { useEffect, useState } from "react";
import {Link} from  'react-router-dom';
import "./Home.scss";
import {BiPlay} from 'react-icons/bi'
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
const apiKey = "25e71a10e4e6cce92673bd56dd5ffc70";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const popular = "popular";
const nowPlaying = "now_playing";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div className="flexCard">
      {arr.map((item, index) => (
        <Card img={`${imgUrl}/${item.poster_path}`} key={index} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [genre , setGenre] = useState([]);
  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/upcoming?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };
    fetchUpcoming();

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    fetchPopular();

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };
    fetchNowPlaying();

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };
    fetchTopRated();

    const getAllGenre = async()=>{
      const {data:{genres},}= await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
    }
getAllGenre();

  }, []);
  return (
    <section className="Home">
      <div className="banner" style={{backgroundImage:popularMovies[0]?`url(${`${imgUrl}/${popularMovies[1].poster_path}`})`:"rgb(16,16,16)"}}>
      {popularMovies[0]&&<h1>{popularMovies[1].original_title}</h1>}
      {popularMovies[0]&&<p>{popularMovies[1].overview}</p>}
<div>

      <button> <BiPlay/>Play</button>
      <button>My List <AiOutlinePlus/></button>
</div>
      </div>


  
      <Row title={"UpComing movies on Netflix"} arr={upcomingMovies} />
      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"Movies"} arr={topRatedMovies}/>
      <Row title={"Recently Viewed"} arr={nowPlayingMovies}/>
<div className="genreBox">
  {genre.map((item)=>(
    <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
  ))}
</div>
    </section>
  );
};

export default Home;
