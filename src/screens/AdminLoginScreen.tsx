import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { CustomInput } from '../components/CustomInput';
import { LogoIllustration } from '../components/LogoIllustration';

interface AdminLoginScreenProps {
    onLogin: () => void;
    onBack: () => void;
}

export default function AdminLoginScreen({ onLogin, onBack }: AdminLoginScreenProps) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (user === 'Junior' && password === '123456') {
            onLogin();
        } else {
            Alert.alert('Erro de Acesso', 'Usuário ou senha de administrador incorretos.');
        }
    };

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

                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 20 }}>
                            Acesso Administrativo
                        </Text>

                        <View style={styles.formArea}>

                            <CustomInput
                                label="usuário admin"
                                value={user}
                                onChangeText={setUser}
                                iconName="person"
                                placeholder="Seu nome"
                            />

                            <View style={styles.spacer} />

                            <CustomInput
                                label="senha"
                                value={password}
                                onChangeText={setPassword}
                                iconName="lock"
                                isPassword
                                keyboardType="numeric"
                                placeholder="******"
                            />

                            <TouchableOpacity style={styles.forgotPasswordButton}>
                                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>Entrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center' }} onPress={onBack}>
                                <Text style={{ color: 'white', textDecorationLine: 'underline' }}>Voltar para Login de Aluno</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}
