import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import './favorito.css'

/************************Adicionar filme à lista de favoritos*************************/

function Favoritos() {
    const[filmes,setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])
    },[])

/************************Excluir filmes da lista de favoritos*************************/
    function handle(id){
        let filtroFilmes=filmes.filter((item)=>{
            return(item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes))
        alert('Filme removido com sucesso!')

    }


    return(
        <div className='meusFilmes'>
            <h1>Meus Filmes</h1>

            {filmes.length===0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                              <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                              <button className='btn_ex' onClick={()=>handle(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos