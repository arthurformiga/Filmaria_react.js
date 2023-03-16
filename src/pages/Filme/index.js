import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './filme.css'
import api from "../../services/api"

function Filme(){
      const{id}=useParams() 
      const navigate=useNavigate()
      const[filme,setFilme]=useState([])
      const[loading,setLoading]=useState(true)

      useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {params:{
                api_key: '1e02209c9df2d2b1a0b8865ec6a58909',
                language:'pt-BR',
            }})

            .then((response)=>{
               setFilme(response.data)
               setLoading(false)
            })

            .catch(()=>{
                navigate("/",{ replace : true} )
            })

        }

        loadFilme()

        return()=>{
            console.log('Componente desmotado')
        }
        },[])

        function salvarFilme(){
            const minhaLista=localStorage.getItem("@primeflix")

            let filmesSalvos=JSON.parse(minhaLista) || []

            const hasFilme=filmesSalvos.some((filmeSalvo)=> filmeSalvo.id===filme.id)

            if(hasFilme){
                alert('Este filme já está na lista!')
                return
            }

            filmesSalvos.push(filme)
            localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
            alert('Filme salvo com sucesso!')

        }

        if(loading){
            return(
                <div>
                    <h1>Carregado detalhes...</h1>
                </div>
            )
        }

      
    
    return(
        <div className="filmeInfo">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div>
                <button className="area_button" onClick={salvarFilme}>Salvar</button>
                <button className="area_button">
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}


export default Filme
