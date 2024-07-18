import React, { memo, useCallback, useMemo } from "react";
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../api";
import { Genre } from "../types";
import { COLORS, LAYOUT, TYPOGRAPHY } from '../constants/constants';

interface GenreFilterProps {
    onGenreChange: (genreId: number | "all") => void;
    selectedGenres: number[];
    disabled: boolean;
}

const GenreFilter = memo(({
    onGenreChange,
    selectedGenres,
    disabled,
    
}: GenreFilterProps) => {
    const { data: genres } = useQuery<Genre[], Error>({
        queryKey: ['genres'],
        queryFn: fetchGenres,
    });

    const handleGenrePress = useCallback((genreId: number | "all") => {
        onGenreChange(genreId);
    }, [onGenreChange]);

    const containerStyle = useMemo(() => [
        styles.container,
        disabled && styles.disabledContainer
    ], [disabled]);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={containerStyle}
        >
            <TouchableOpacity
                style={[
                    styles.genreButton,
                    selectedGenres.length === 0 && styles.selectedGenre
                ]}
                onPress={() => handleGenrePress("all")}
                disabled={disabled}
            >
                <Text style={styles.genreText}>All</Text>
            </TouchableOpacity>
            {genres?.map(({ id, name }) => (
                <TouchableOpacity
                    key={id}
                    style={[
                        styles.genreButton,
                        selectedGenres.includes(id) && styles.selectedGenre
                    ]}
                    onPress={() => handleGenrePress(id)}
                    disabled={disabled}
                >
                    <Text style={styles.genreText}>{name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
});
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: LAYOUT.PADDING,
        marginBottom: LAYOUT.PADDING,
        maxHeight: 64,
        paddingVertical : 8
    },
    disabledContainer: {
        opacity: 0.5,
    },
    contentContainer: {
        alignItems: "center",
        paddingRight: LAYOUT.PADDING,
    },
    genreButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: LAYOUT.BORDER_RADIUS / 2,
        backgroundColor: COLORS.BUTTON,
        marginRight: 8,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedGenre: {
        backgroundColor: COLORS.BUTTON_SELECTED,
    },
    genreText: {
        color: COLORS.TEXT,
        fontSize: TYPOGRAPHY.BODY_FONT_SIZE,
    },
});

export default GenreFilter;
