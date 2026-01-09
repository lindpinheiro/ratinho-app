import React from 'react';
import { View, Text, StatusBar, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

interface AdminMyScoresScreenProps {
    onLogout?: () => void;
    onEdit?: () => void;
}

export default function AdminMyScoresScreen({ onLogout, onEdit }: AdminMyScoresScreenProps) {

    // Function to handle delete confirmation
    const handleDelete = (title: string) => {
        Alert.alert(
            "Excluir Partitura",
            "Você deseja realmente excluir essa partitura?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => console.log(`Deleted ${title}`),
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="light-content" />

            {/* Header Section */}
            <LinearGradient
                colors={['#002259', '#003380', '#004aad']}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.headerTitle}>Minhas Partituras</Text>
                        <Text style={styles.headerSubtitle}>Adicione, remova e edite o material de estudo</Text>

                        <View style={styles.searchContainer}>
                            <View style={styles.searchBar}>
                                <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
                                <TextInput
                                    placeholder="Buscar partituras..."
                                    placeholderTextColor="rgba(255,255,255,0.5)"
                                    style={styles.searchInput}
                                />
                            </View>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="filter" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Editados Recentemente */}
                <View style={styles.sectionTitle}>
                    <Ionicons name="time-outline" size={20} color="#002259" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#002259', fontSize: 16, fontWeight: 'bold' }}>Editados Recentemente</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
                        {/* Card 1 */}
                        <View style={styles.recentCard}>
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle} numberOfLines={1}>Em Busca da Minha Sorte</Text>
                                <Text style={styles.cardSubtitle}>Hoje</Text>
                            </View>
                            <View style={styles.pillButton}>
                                <Text style={styles.pillText}>Com anotações</Text>
                            </View>
                        </View>

                        {/* Card 2 */}
                        <View style={styles.recentCard}>
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle} numberOfLines={1}>Asa Branca</Text>
                                <Text style={styles.cardSubtitle}>Ontem</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Todas as Partituras */}
                <View style={[styles.sectionTitle, { marginTop: 10 }]}>
                    <View style={{ backgroundColor: '#002259', padding: 6, borderRadius: 20, marginRight: 10 }}>
                        <Ionicons name="musical-notes" size={16} color="white" />
                    </View>
                    <Text style={{ color: '#002259', fontSize: 16, fontWeight: 'bold' }}>Todas as Partituras</Text>
                </View>

                {/* List Item 1 */}
                <View style={styles.listItemCard}>
                    <View style={styles.listIconBox}>
                        <Ionicons name="musical-note" size={24} color="white" />
                    </View>
                    <View style={styles.listContent}>
                        <Text style={styles.cardTitle}>Em Busca da Minha Sorte</Text>
                        <Text style={styles.cardSubtitle}>Por Tradicional</Text>
                        <View style={styles.tagsContainer}>
                            <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={[styles.tagText, { color: '#1976D2' }]}>Violão</Text>
                            </View>
                            <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={[styles.tagText, { color: '#1976D2' }]}>Intermediário</Text>
                            </View>
                            <View style={[styles.tag, { backgroundColor: '#F3E5F5' }]}>
                                <Text style={[styles.tagText, { color: '#7B1FA2' }]}>Anotações</Text>
                            </View>
                        </View>
                        <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> 45min</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={onEdit}>
                            <Ionicons name="pencil" size={16} color="#1976D2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete("Em Busca da Minha Sorte")}>
                            <Ionicons name="trash" size={16} color="#D32F2F" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List Item 2 */}
                <View style={styles.listItemCard}>
                    <View style={styles.listIconBox}>
                        <Ionicons name="musical-note" size={24} color="white" />
                    </View>
                    <View style={styles.listContent}>
                        <Text style={styles.cardTitle}>Asa Branca</Text>
                        <Text style={styles.cardSubtitle}>Por Luiz Gonzaga</Text>
                        <View style={styles.tagsContainer}>
                            <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={[styles.tagText, { color: '#1976D2' }]}>Trompete</Text>
                            </View>
                            <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
                                <Text style={[styles.tagText, { color: '#388E3C' }]}>Básico</Text>
                            </View>
                        </View>
                        <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> 30min</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={onEdit}>
                            <Ionicons name="pencil" size={16} color="#1976D2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete("Asa Branca")}>
                            <Ionicons name="trash" size={16} color="#D32F2F" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List Item 3 */}
                <View style={styles.listItemCard}>
                    <View style={styles.listIconBox}>
                        <Ionicons name="musical-note" size={24} color="white" />
                    </View>
                    <View style={styles.listContent}>
                        <Text style={styles.cardTitle}>Escala Maior Dó</Text>
                        <Text style={styles.cardSubtitle}>Por Método</Text>
                        <View style={styles.tagsContainer}>
                            <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                                <Text style={[styles.tagText, { color: '#1976D2' }]}>Piano</Text>
                            </View>
                            <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
                                <Text style={[styles.tagText, { color: '#388E3C' }]}>Básico</Text>
                            </View>
                            <View style={[styles.tag, { backgroundColor: '#F3E5F5' }]}>
                                <Text style={[styles.tagText, { color: '#7B1FA2' }]}>Anotações</Text>
                            </View>
                        </View>
                        <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> 20min</Text>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={onEdit}>
                            <Ionicons name="pencil" size={16} color="#1976D2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={() => handleDelete("Escala Maior Dó")}>
                            <Ionicons name="trash" size={16} color="#D32F2F" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={[styles.bottomLogoutButton, { marginTop: 20 }]} onPress={onLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#002259" />
                    <Text style={styles.bottomLogoutText}>Sair</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
