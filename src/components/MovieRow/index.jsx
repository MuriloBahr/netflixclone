import React, { useState } from "react";
import './index.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({title, items}) =>{
    const [scrollX, setScrollX] = useState(0)

    const hadleLeftArrow = () =>{
        let x = scrollX + Math.round(window.innerWidth / 2)
        if(x > 0){
            x = 0
        }
        setScrollX(x)
    }
    const hadleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = items.results.length * 150
        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }
    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow-left" onClick={hadleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow-right" onClick={hadleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}}/>
            </div>
            <div className="movieRow-listarea">
                <div className="movieRow-list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key}className="movieRow-item">
                             <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt='imagens'/>
                        </div>
                   ))}
                </div>
                
                
            </div>
        </div>
    )
}