import React from "react";
import './index.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({item}) =>{
    let firstDate = new Date(item.first_air_date)
    let genres = []
    for(let i in item.genres){
        genres.push(item.genres[i].name)
    }
    let description = item.overview
    if(description.length > 200){
        description = description.substring(0, 300)+'...'
    }
    return(
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured-vertical">
                <div className="featured-horizontal">
                    <div className="featured-name">{item.name}</div>
                    <div className="featured-info">
                        <div className="featured-points">{parseFloat(item.vote_average).toFixed(1)} Relevância</div>
                        <div className="featured-year">{firstDate.getFullYear()}</div>
                        <div className="featured-seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured-description">{description}</div>
                    <div className="featured-btn">
                        <a href={`/watch/${item.id}`} className='featured-watchbtn'>► Assistir</a>
                        <a href={`/list/add/${item.id}`} className='featured-mylistbtn'>+ Minha Lista</a>
                    </div>
                    <div className="featured-genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
                </div>

            </div>
        </section>
    )
}