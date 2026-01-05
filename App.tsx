// App.tsx
import React, { useState, useRef } from 'react';
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
import { TextInput as RNTextInput, KeyboardTypeOptions } from 'react-native';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

function CustomInput({ label, value, onChangeText, iconName, isPassword, keyboardType }: CustomInputProps) {
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
                keyboardType="phone-pad"
              />

              <View style={styles.spacer} />

              <CustomInput 
                label="senha"
                value={password}
                onChangeText={setPassword}
                iconName="lock"
                isPassword
                keyboardType="phone-pad"
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