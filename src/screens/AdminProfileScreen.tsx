import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

export default function AdminProfileScreen() {
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
                    <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Administrador</Text>
                </View>

                {/* Info Card */}
                <View style={styles.studentInfoCard}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#002259', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 }}>
                        Dados do Administrador
                    </Text>

                    <Text style={styles.infoLabel}>Nome Completo</Text>
                    <Text style={styles.infoValue}>Junior</Text>

                    <Text style={styles.infoLabel}>Função</Text>
                    <Text style={styles.infoValue}>Administrador Geral</Text>

                    <Text style={styles.infoLabel}>Instituição</Text>
                    <Text style={styles.infoValue}>Fundação Cultural Maestro J. Ratinho</Text>
                </View>



            </ScrollView>
        </View>
    );
}
