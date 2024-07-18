import React, { useState, useCallback, useEffect, memo } from "react";
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { debounce } from 'lodash';
import GenreFilter from "../components/GenreFilter";
import SearchBar from "../components/SearchBar";
import YearMovieList from "../components/YearMovieList";
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants/constants';
import MoviefixLogo from "../components/MovieFixLogo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGenres } from "../api";
import { Genre } from "../types";
import { useMovies } from "../hooks/useMovies";
import MessageDisplay from "../components/MessageDisplay";

const HomeScreen = memo(() => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
    const queryClient = useQueryClient()

    const { data: genres, isLoading: isLoadingGenres, error: genresError } = useQuery<Genre[], Error>({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });
    const normalizedGenres = selectedGenres.sort().join('|');

    const {
        data: movies,
        isLoading: isLoadingMovies,
        error: moviesError,
    } = useMovies(normalizedGenres, searchQuery);

    const isLoading = isLoadingGenres || isLoadingMovies;
    const error = genresError || moviesError;

    const handleRefresh = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['genres'] });
        queryClient.invalidateQueries({ queryKey: ['movies', normalizedGenres, searchQuery] });
    }, [queryClient, normalizedGenres, searchQuery]);


    const debouncedSetSearch = useCallback(
        debounce((query: string) => {
            setDebouncedSearchQuery(query);
            if (query) {
                setSelectedGenres([]);
            }
        }, 300),
        []
    );


    const handleGenreChange = (genreId: number | "all") => {
        setSelectedGenres((prevGenres) => {
            if (genreId === "all") {
                return [];
            }
            const newGenres = prevGenres.includes(genreId as number)
                ? prevGenres.filter((id) => id !== genreId)
                : [...prevGenres, genreId as number];

            if (newGenres.length > 0) {
                setSearchQuery("");
                setDebouncedSearchQuery("");
            }
            return newGenres;
        });
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        debouncedSetSearch(query);
    };
    useEffect(() => {
        if (searchQuery) {
            setSelectedGenres([]);
        }
    }, [searchQuery]);

    if (isLoading) {
        return (
            <View style={styles.messageContainer}>
                <ActivityIndicator size="large" color={COLORS.PRIMARY} />
                <Text style={styles.messageText}>Loading movies and genres...</Text>
            </View>
        );
    }

    if ( error || !genres || genres?.length === 0) {
        return (
            <View style={styles.messageContainer}>
                <MessageDisplay
                    message={`Oops! Something went wrong.`}
                    icon="❌"
                />
                <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <MoviefixLogo />
            </View>
            <SearchBar
                onSearch={handleSearch}
                value={searchQuery} />
            <GenreFilter
                onGenreChange={handleGenreChange}
                selectedGenres={selectedGenres}
                disabled={!!searchQuery}
            />
            <YearMovieList
                selectedGenres={selectedGenres}
                searchQuery={debouncedSearchQuery}
            />
        </View>
    );
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    titleContainer: {
        marginLeft: LAYOUT.PADDING
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: LAYOUT.PADDING,
        backgroundColor: COLORS.BACKGROUND,
    },
    messageText: {
        marginTop: LAYOUT.PADDING / 2,
        color: COLORS.TEXT,
        fontSize: TYPOGRAPHY.BODY_FONT_SIZE,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: LAYOUT.PADDING,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: COLORS.PRIMARY,
        borderRadius: LAYOUT.BORDER_RADIUS,
    },
    retryButtonText: {
        color: COLORS.TEXT,
        fontSize: TYPOGRAPHY.BODY_FONT_SIZE,
        fontWeight: 'bold',
    },
    refreshButton: {
        alignSelf: 'flex-end',
        marginRight: LAYOUT.PADDING,
        marginTop: LAYOUT.PADDING,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: COLORS.TEXT,
        borderRadius: LAYOUT.BORDER_RADIUS,
    },
    refreshButtonText: {
        color: COLORS.TEXT,
        fontSize: TYPOGRAPHY.BODY_FONT_SIZE,
    },
});

export default HomeScreen;
