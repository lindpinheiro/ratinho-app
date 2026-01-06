import React from 'react';
import { View, Image } from 'react-native';
import { styles } from '../styles/styles';

export function LogoIllustration() {
    return (
        <View style={styles.logoContainer}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
            />
        </View>
    );
}
