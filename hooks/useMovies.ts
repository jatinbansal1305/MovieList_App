import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies, searchMovies } from "../api";
import { INITIAL_YEAR } from "../constants/constants";

export const useMovies = (normalizedGenres: string, searchQuery: string) => {
    const currentYear = new Date().getFullYear();

    return useInfiniteQuery({
        queryKey: ["movies", normalizedGenres, searchQuery],
        queryFn: async ({ pageParam = INITIAL_YEAR }) => {
            const moviesFetcher = searchQuery ? searchMovies : fetchMovies;
            const movies = await moviesFetcher({
                year: pageParam,
                normalizedGenres,
                searchQuery,
            });
            return [{ year: pageParam, movies }];
        },
        getNextPageParam: (lastPage) => {
            const newestYearFetched = lastPage[0].year;
            return newestYearFetched < currentYear
                ? newestYearFetched + 1
                : undefined;
        },
        getPreviousPageParam: (firstPage, allPages) => {
            const oldestYearFetched = allPages[0][0].year;
            return oldestYearFetched > 1900 ? oldestYearFetched - 1 : undefined;
        },
        initialPageParam: INITIAL_YEAR,
    });
};
