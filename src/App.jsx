import React, { useEffect, useState } from "react";
import './App.css'
import Tmdb from "./Tmdb.";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/Featured";
import Header from "./components/Header";
// eslint-disable-next-line import/no-anonymous-default-export
export default () =>{

  
  const [movieList, setmovelist] = useState([])
  const [featuredDate, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() =>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  useEffect(()=>{
    const loadAll = async () =>{
      let list = await Tmdb.getHomeList()
      setmovelist(list)

      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
      
    }
    loadAll()
  }, [])
  return(
    <div className="page">
      <Header black={blackHeader}/>

      {featuredDate && <FeaturedMovie item={featuredDate}/>}

      <section className="lists">
        {movieList.map((item, key) =>(
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://rchandru.com/images/portfolio/modals/m-loading.gif" alt="Carregando" />
      </div>
    }
    </div>
  )
}