import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../constants/constants';

export default function BodyContainer({ children, isGrayBackground = false }) {
    return (
        <ScrollView
            contentContainerStyle={[
                styles.bodyContainer,
                isGrayBackground && styles.grayBackground,
            ]}
        >
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        width: '80%',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    grayBackground: {
        backgroundColor: COLORS.gray,
    },
});
