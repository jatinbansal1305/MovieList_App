import React from "react";
import {
    FlatList,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Movie } from "../types";
import MoviePoster from "./MoviePoster";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemWidth = (width - 48) / numColumns;

interface MovieGridProps {
    movies: Movie[];
}

const MovieGrid = ({ movies }: MovieGridProps) => {
    const renderItem = ({ item }: { item: Movie }) => (
        <View style={styles.movieItem}>
            <MoviePoster posterPath={item.poster_path} title={item.title} />
            <Text style={styles.movieTitle} numberOfLines={2}>
                {item.title}
            </Text>
            <Text style={styles.movieRating}>Rating: {item.vote_average}</Text>
        </View>
    );

    return (
        <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.gridContainer}
        />
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        padding: 16,
    },
    movieItem: {
        width: itemWidth,
        marginBottom: 16,
        marginLeft: 12,
        marginRight: 12,
    },
    movieImage: {
        width: "100%",
        height: itemWidth * 1.5,
        backgroundColor: "#333333",
        borderRadius: 8,
    },
    movieTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 8,
    },
    movieRating: {
        color: "#AAAAAA",
        fontSize: 12,
        marginTop: 4,
    },
});

export default MovieGrid;
