import { useEffect, useState } from "react"
import api from '../../services/api'
import { Link } from "react-router-dom"
import './home.css'
//URL DA API:https://api.themoviedb.org/3/movie/550?api_key=1e02209c9df2d2b1a0b8865ec6a58909
function Home(){

  const[filmes,setFilmes]=useState([])
  const[loading,setLoading]=useState(true)

    useEffect(()=>{
        async function loadFilmes(){
        const response=await api.get("movie/now_playing",{
            params:{
                api_key: '1e02209c9df2d2b1a0b8865ec6a58909',
                language:'pt-BR',
                page:1
            }
        }) 
        setFilmes(response.data.results.slice(0,10))
        setLoading(false)
        }
        loadFilmes()
    },[])

    if(loading){
        return(
            <div>
              <h2>Carregando...</h2>  
            </div>
        )
    }

    return(
        <div className="container">
           <div className="listaFilmes">
            {filmes.map((filme)=>{
                return(
                    <article key={filme.id}>
                    <strong>{filme.title}</strong>
                    <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                    <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                )
            })}
           </div>
        </div>
    )
}


export default Home
