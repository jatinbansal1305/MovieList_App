import React, { memo, useState } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { COLORS, LAYOUT } from '../constants/constants';

interface MoviePosterProps {
    posterPath: string | null;
    title: string;
}

const MoviePoster = memo(({ posterPath, title }: MoviePosterProps) => {
    const [imageError, setImageError] = useState(false);

    if (!posterPath || imageError) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>{title[0]}</Text>
            </View>
        );
    }

    return (
        <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
            style={styles.image}
            onError={() => setImageError(true)}
        />
    );
});

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: LAYOUT.BORDER_RADIUS,
    },
    fallbackContainer: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: COLORS.POSTER_FALLBACK,
        borderRadius: LAYOUT.BORDER_RADIUS,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 40,
        color: COLORS.POSTER_FALLBACK_TEXT,
        fontWeight: 'bold',
    },
});


export default MoviePoster;
