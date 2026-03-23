import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
} from 'react-native-reanimated';

export function MorphingChevron({ isExpanded, color = '#333' }: { isExpanded: boolean; color?: string }) {

    const progress = useSharedValue(isExpanded ? 1 : 0);


    useEffect(() => {
        progress.value = withSpring(isExpanded ? 1 : 0, { stiffness: 500, damping: 40 });
    }, [isExpanded]);

    const leftWingStyle = useAnimatedStyle(() => {
        const angle = interpolate(progress.value, [0, 1], [45, -45]);
        return {
            transform: [
                { rotate: `${angle}deg` },
                { translateX: -5 },
            ],
        };
    });

    const rightWingStyle = useAnimatedStyle(() => {
        const angle = interpolate(progress.value, [0, 1], [-45, 45]);
        return {
            transform: [
                { rotate: `${angle}deg` },
                { translateX: 5 },
            ],
        };
    });

    return (
        <View style={styles.chevronContainer}>
            <Animated.View style={[styles.wing, { backgroundColor: color }, leftWingStyle]} />
            <Animated.View style={[styles.wing, { backgroundColor: color }, rightWingStyle]} />
        </View>
    );
}

const styles = StyleSheet.create({
    chevronContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
    },
    wing: {
        position: 'absolute',
        width: 11,
        height: 2,
        borderRadius: 2,
    },
});

