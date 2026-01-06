import React, { useState, useRef } from 'react';
import { View, Text, TextInput as RNTextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

interface CustomInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    iconName: keyof typeof MaterialIcons.glyphMap;
    isPassword?: boolean;
    keyboardType?: KeyboardTypeOptions;
    placeholder?: string;
}

export function CustomInput({ label, value, onChangeText, iconName, isPassword, keyboardType, placeholder }: CustomInputProps) {
    const [hidden, setHidden] = useState(!!isPassword);
    const inputRef = useRef<RNTextInput | null>(null);

    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconArea}>
                <MaterialIcons name={iconName} size={24} color="#49454F" />
            </View>
            <View style={styles.textArea}>
                <Text
                    style={styles.inputLabel}
                    onPress={() => inputRef.current?.focus()}
                >
                    {label}
                </Text>
                <RNTextInput
                    ref={inputRef}
                    style={styles.inputField}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword ? hidden : false}
                    placeholder={placeholder}
                    placeholderTextColor="#1d1b20"
                    keyboardType={keyboardType}
                />
            </View>
            {isPassword ? (
                <TouchableOpacity style={styles.rightIcon} onPress={() => setHidden(!hidden)}>
                    <MaterialIcons name={hidden ? 'visibility-off' : 'visibility'} size={22} color="#49454F" />
                </TouchableOpacity>
            ) : (
                <View style={styles.rightIcon} />
            )}
            <View style={styles.activeIndicator} />
        </View>
    );
}
