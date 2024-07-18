import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLORS, LAYOUT, TYPOGRAPHY } from "../constants/constants";

interface SearchBarProps {
    onSearch: (query: string) => void;
    value: string;
}

const SearchBar = ({ onSearch, value }: SearchBarProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search movies..."
                placeholderTextColor="#888"
                value={value}
                onChangeText={onSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: LAYOUT.PADDING,
    },
    input: {
        height: 40,
        borderColor: "#444",
        borderWidth: 1,
        borderRadius: LAYOUT.BORDER_RADIUS,
        paddingHorizontal: 12,
        color: COLORS.INPUT_TEXT,
        backgroundColor: COLORS.INPUT_BACKGROUND,
        fontSize: TYPOGRAPHY.BODY_FONT_SIZE,
    },
});

export default SearchBar;
