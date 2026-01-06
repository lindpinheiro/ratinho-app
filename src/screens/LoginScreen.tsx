import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { CustomInput } from '../components/CustomInput';
import { LogoIllustration } from '../components/LogoIllustration';

export default function LoginScreen() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    return (
        <LinearGradient
            colors={['#002259', '#003380', '#004aad']}
            style={styles.gradientBackground}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>

                        <LogoIllustration />

                        <View style={styles.formArea}>

                            <CustomInput
                                label="usuário"
                                value={user}
                                onChangeText={setUser}
                                iconName="person"
                                placeholder="Pedro"
                            />

                            <View style={styles.spacer} />

                            <CustomInput
                                label="senha"
                                value={password}
                                onChangeText={setPassword}
                                iconName="lock"
                                isPassword
                                keyboardType="numeric"
                                placeholder="***********"
                            />

                            <TouchableOpacity style={styles.forgotPasswordButton}>
                                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={styles.adminButton}>
                            <Text style={styles.adminText}>Entrar como Administrador</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}
