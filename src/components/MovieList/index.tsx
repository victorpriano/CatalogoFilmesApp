import { useEffect, useState } from 'react';
import axios from 'axios';

import './style.scss';

type Filme = {
    title: string;
    overview: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
}

export default function MovieList() {

    const [movies, setMovies] = useState<Filme[]>([])
    const filmesPorPagina = 20;
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const primeiraPagina = paginaAtual === 1;
    const ultimaPagina = paginaAtual === totalPaginas;


    const getFilmes = () => {
        axios.get(import.meta.env.VITE_Api_Url, {
            params: {
                api_key: import.meta.env.VITE_Api_Key,
                language: 'pt-BR',
                page: paginaAtual
            }
        }).then((response) => {
            setMovies(response.data.results)
            setTotalPaginas(Math.ceil(response.data.total_pages / filmesPorPagina))
        })
    }

    useEffect(() => {
        getFilmes()
    }, [paginaAtual])

    function formatarData(dataAtual: string) {
        const [ano, mes, dia] = dataAtual.split('-')

        const dataFormatada = `${dia}/${mes}/${ano}`

        return dataFormatada
    }

    return (
        <>
            <div className='movie-list'>
                <div className='movie-grid'>
                    {
                        movies.map((movie) => 
                            <div className='movie-card'>
                                <img className='image-card' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={`${movie.title}`} />
                                <p className='descricao-titulo'>
                                    {movie.title}
                                </p>
                                <p className='descricao-lancamento'>
                                    {formatarData(movie.release_date)}
                                </p>
                            </div>
                        )
                    }
                </div>
                      {/* Controles de Paginação */}
                <div className='paginacao'>
                    <button 
                        disabled={primeiraPagina}
                        className={primeiraPagina ? 'not-allowed' : 'botao-paginacao'}
                        onClick={() => setPaginaAtual(prev => prev - 1)}
                    >
                    Anterior
                    </button>

                    <span className='texto-pagina'>
                    Página {paginaAtual} de {totalPaginas}
                    </span>

                    <button 
                        disabled={ultimaPagina}
                        className={ultimaPagina ? 'not-allowed' : 'botao-paginacao'}
                        onClick={() => setPaginaAtual(prev => prev + 1)}
                    >
                    Próxima
                    </button>
                </div> 
            </div>
        </>
    )
}