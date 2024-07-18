import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageDisplayProps {
    message: string;
    icon?: string;
}

const MessageDisplay = ({ message, icon }: MessageDisplayProps) => {
    return (
        <View style={styles.container}>
            {icon && <Text style={styles.icon}>{icon}</Text>}
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    icon: {
        fontSize: 48,
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "center",
    },
});

export default MessageDisplay;
