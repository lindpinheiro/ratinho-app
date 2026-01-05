// styles.ts
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  
  // Estilos da Logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  
  },
  logoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  logoImage: {
    width: 400,
    height: 400,
    alignSelf: 'center',
    marginBottom: 8,
  },

  // Estilos do Input
  inputContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  iconArea: {
    width: 48,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    justifyContent: 'center',
    height: 56,
    paddingRight: 16,
  },
  rightIcon: {
    width: 48,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 12,
    color: '#49454f',
    letterSpacing: 0.4,
  },
  inputField: {
    fontSize: 16,
    color: '#1d1b20',
    padding: 0,
    marginTop: 2,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#49454F',
  },

  // Layout do Formulário
  formArea: {
    width: '100%',
  },
  spacer: {
    height: 16,
  },
  
  // Link Esqueceu a Senha
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.1,
  },

  // Botão Entrar
  loginButton: {
    backgroundColor: '#002259',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 3.84px rgba(0,0,0,0.25)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }),
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.15,
  },

  // Rodapé (Admin)
  adminButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  adminText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});