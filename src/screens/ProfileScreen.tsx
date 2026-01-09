import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
    onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* Header Avatar */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person" size={50} color="white" />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#002259' }}>Tela de Perfil</Text>
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Aluno da Fundação</Text>
                </View>

                {/* Info Card */}
                <View style={styles.studentInfoCard}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#002259', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 }}>
                        Dados do Aluno
                    </Text>

                    <Text style={styles.infoLabel}>Nome Completo</Text>
                    <Text style={styles.infoValue}>Pedro Henrique Mendes Viana</Text>

                    <Text style={styles.infoLabel}>Endereço</Text>
                    <Text style={styles.infoValue}>Rua Arirtides Rabelo 626, bairro Alto Guaramiranga</Text>

                    <Text style={styles.infoLabel}>Telefone</Text>
                    <Text style={styles.infoValue}>(85) 99999-9999</Text>

                    <Text style={styles.infoLabel}>Instituição</Text>
                    <Text style={styles.infoValue}>Fundação Cultural Maestro J. Ratinho</Text>

                    <Text style={styles.infoLabel}>Turno</Text>
                    <Text style={styles.infoValue}>Manhã</Text>
                </View>



            </ScrollView>
        </View>
    );
}
