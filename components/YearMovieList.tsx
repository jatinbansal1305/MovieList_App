import React, { useCallback, useRef, useMemo, memo } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import MovieGrid from "./MovieGrid";
import { useMovies } from "../hooks/useMovies";
import { ITEM_HEIGHT, COLORS, TYPOGRAPHY, LAYOUT } from "../constants/constants";
import MessageDisplay from "./MessageDisplay";
import { Movie } from "../types";

interface YearMovieListProps {
    selectedGenres: number[];
    searchQuery: string;
}

interface YearData {
    year: number;
    movies: Movie[];
}

const YearMovieList = memo(({ selectedGenres, searchQuery }: YearMovieListProps) => {
    const flatListRef = useRef<FlatList<YearData>>(null);
    const lastOffsetY = useRef<number>(0);

    const normalizedGenres = useMemo(() => selectedGenres.sort().join("|"), [selectedGenres]);

    const {
        data,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useMovies(normalizedGenres, searchQuery);

    const loadMoreData = useCallback((direction: "up" | "down") => {
        if (direction === "up" && hasPreviousPage && !isFetchingPreviousPage) {
            fetchPreviousPage();
        } else if (direction === "down" && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage]);

    const handleScroll = useCallback((event: any) => {
        const currentOffsetY = event.nativeEvent.contentOffset.y;
        if (currentOffsetY < lastOffsetY.current && currentOffsetY < 200) {
            loadMoreData("up");
        }
        lastOffsetY.current = currentOffsetY;
    }, [loadMoreData]);

    const renderItem = useCallback(({ item }: { item: YearData }) => {
        return item.movies.length ? (
            <View style={styles.yearContainer}>
                <Text style={styles.yearText}>{item.year}</Text>
                <MovieGrid movies={item.movies} />
            </View>
        ) : null;
    }, []);

    const keyExtractor = useCallback((item: YearData) => item.year.toString(), []);

    const getItemLayout = useCallback((_: any, index: number) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    const onScrollToIndexFailed = useCallback((info: { index: number }) => {
        setTimeout(() => {
            flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: false,
            });
        }, 500);
    }, []);

    const ListHeaderComponent = useMemo(() => 
        isFetchingPreviousPage ? (
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : null
    , [isFetchingPreviousPage]);

    const ListFooterComponent = useMemo(() => 
        isFetchingNextPage ? (
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        ) : null
    , [isFetchingNextPage]);

    const allYears = data ? data.pages.flat().sort((a, b) => a.year - b.year) : [];

    if (allYears.length === 0 || allYears.every((year) => year.movies.length === 0)) {
        return (
            <View style={styles.messageContainer}>
                <MessageDisplay
                    message="No movies found. Try adjusting your search or filters."
                    icon="🎬"
                />
            </View>
        );
    }

    return (
        <FlatList<YearData>
            ref={flatListRef}
            data={allYears}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={() => loadMoreData("down")}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            getItemLayout={getItemLayout}
            initialScrollIndex={0}
            onScrollToIndexFailed={onScrollToIndexFailed}
        />
    );
});

const styles = StyleSheet.create({
    yearContainer: {
        marginBottom: LAYOUT.PADDING * 1.25,
    },
    yearText: {
        fontSize: TYPOGRAPHY.TITLE_FONT_SIZE,
        fontWeight: "bold",
        color: COLORS.TEXT,
        marginLeft: LAYOUT.PADDING,
        marginBottom: LAYOUT.PADDING / 1.6,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: LAYOUT.PADDING,
    },
});

export default YearMovieList;