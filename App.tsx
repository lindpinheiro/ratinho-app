// App.tsx
import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Image,
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

// Importamos o arquivo que criamos acima
import { styles } from './styles'; 

// --- Componente de Input Reutilizável ---
interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  isPassword?: boolean;
}

function CustomInput({ label, value, onChangeText, iconName, isPassword }: CustomInputProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconArea}>
        <MaterialIcons name={iconName} size={24} color="#49454F" />
      </View>
      <View style={styles.textArea}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          placeholderTextColor="#1d1b20"
        />
      </View>
      <View style={styles.activeIndicator} />
    </View>
  );
}

// --- Componente da Logo ---
function LogoIllustration() {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('./assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
}

// --- Tela Principal ---
export default function LoginScreen() {
  const [user, setUser] = useState('Pedro');
  const [password, setPassword] = useState('***********');

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
              />

              <View style={styles.spacer} />

              <CustomInput 
                label="senha"
                value={password}
                onChangeText={setPassword}
                iconName="lock"
                isPassword
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