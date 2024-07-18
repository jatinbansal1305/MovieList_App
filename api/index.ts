import axios from 'axios';
import { Movie, MoviesParams } from '../types';
import { API_KEY, BASE_URL } from '../constants/constants';


const fetchMoviesBase = async (endpoint: string, params: Record<string, any>): Promise<Movie[]> => {
    try {
        const response = await axios.get<{ results: Movie[] }>(`${BASE_URL}${endpoint}`, { params });
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};

export const fetchMovies = async ({ year, normalizedGenres, searchQuery }: MoviesParams): Promise<Movie[]> => {
    const params: Record<string, any> = {
        api_key: API_KEY,
        sort_by: 'popularity.desc',
        primary_release_year: year,
        page: 1,
        'vote_count.gte': 100,
        with_genres: normalizedGenres,
    };

    return fetchMoviesBase('/discover/movie', params);
};

export const searchMovies = async ({ year, normalizedGenres, searchQuery }: MoviesParams): Promise<Movie[]> => {
    const params: Record<string, any> = {
        api_key: API_KEY,
        sort_by: 'popularity.desc',
        primary_release_year: year,
        page: 1,
        'vote_count.gte': 100,
        query: searchQuery,
    };

    return fetchMoviesBase('/search/movie', params);
};

export const fetchGenres = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: { api_key: API_KEY },
        });
        return response.data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};