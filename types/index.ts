export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MoviesParams {
    year: number;
    normalizedGenres: string;
    searchQuery: string;
}
