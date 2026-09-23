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

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: '2dd8947c5a49b1a2c14b328de043b358',
                language: 'pt-BR'
            }
        }).then((response) => setMovies(response.data.results))
    }, [])

    console.log(movies)

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

                
            </div>
        </>
    )
}