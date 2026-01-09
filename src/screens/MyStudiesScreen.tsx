import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StatusBar, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install or use available icons
import { LogoIllustration } from '../components/LogoIllustration'; // Reusing logo if needed, or just icon

interface MyStudiesScreenProps {
    onLogout: () => void;
}

export default function MyStudiesScreen({ onLogout }: MyStudiesScreenProps) {
    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="light-content" />

            {/* Header Section with Gradient */}
            <LinearGradient
                colors={['#002259', '#003380', '#004aad']}
                style={styles.headerGradient}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        {/* Logo */}
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />

                        <Text style={styles.headerTitle}>Meus Estudos</Text>
                        <Text style={styles.headerSubtitle}>Pratique com anotações personalizadas</Text>

                        <View style={styles.searchContainer}>
                            <View style={styles.searchBar}>
                                <Ionicons name="search" size={20} color="rgba(255,255,255,0.7)" />
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Buscar partituras..."
                                    placeholderTextColor="rgba(255,255,255,0.7)"
                                />
                            </View>
                            <TouchableOpacity style={styles.filterButton}>
                                <Ionicons name="filter" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                {/* Section: Estudados Recentemente */}
                <View style={{ backgroundColor: '#004aad' }}>
                    <View style={[styles.sectionTitle, { paddingHorizontal: 24 }]}>
                        <Ionicons name="time-outline" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Estudados Recentemente</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentContainer}>
                        {/* Card 1 */}
                        <TouchableOpacity style={styles.recentCard}>
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle}>Em Busca da Minha Sorte</Text>
                                <Text style={styles.cardSubtitle}>Hoje</Text>
                            </View>
                            <View style={styles.pillButton}>
                                <Text style={styles.pillText}>Com anotações</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Card 2 */}
                        <TouchableOpacity style={styles.recentCard}>
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle}>Asa Branca</Text>
                                <Text style={styles.cardSubtitle}>Ontem</Text>
                            </View>
                        </TouchableOpacity>
                        {/* Card 3 */}
                        <TouchableOpacity style={styles.recentCard}>
                            <View>
                                <View style={styles.iconBox}>
                                    <Ionicons name="musical-note" size={24} color="white" />
                                </View>
                                <Text style={styles.cardTitle}>Parabéns pra Você</Text>
                                <Text style={styles.cardSubtitle}>Há 2 dias</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                    {/* Curved separation (Visual trick using background color of next section if needed, or just let it flow) */}
                </View>

                {/* Section: Todas as Partituras */}
                <View style={styles.listSection}>
                    <View style={styles.sectionHeaderDark}>
                        <Ionicons name="library-outline" size={24} color="#002259" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#002259', fontSize: 18, fontWeight: 'bold' }}>Todas as Partituras</Text>
                    </View>

                    {/* List Item 1 */}
                    <TouchableOpacity style={styles.listItemCard}>
                        <View style={styles.listIconBox}>
                            <Ionicons name="musical-notes" size={24} color="white" />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.cardTitle}>Em Busca da Minha Sorte</Text>
                            <Text style={styles.cardSubtitle}>Por Tradicional</Text>
                            <View style={styles.tagsContainer}>
                                <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                                    <Text style={[styles.tagText, { color: '#1565C0' }]}>Violão</Text>
                                </View>
                                <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
                                    <Text style={[styles.tagText, { color: '#2E7D32' }]}>Intermediário</Text>
                                </View>
                                <View style={[styles.tag, { backgroundColor: '#F3E5F5' }]}>
                                    <Text style={[styles.tagText, { color: '#7B1FA2' }]}>Anotações</Text>
                                </View>
                            </View>
                            <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> 45min</Text>
                        </View>
                    </TouchableOpacity>

                    {/* List Item 2 */}
                    <TouchableOpacity style={styles.listItemCard}>
                        <View style={styles.listIconBox}>
                            <Ionicons name="musical-notes" size={24} color="white" />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.cardTitle}>Asa Branca</Text>
                            <Text style={styles.cardSubtitle}>Por Luiz Gonzaga</Text>
                            <View style={styles.tagsContainer}>
                                <View style={[styles.tag, { backgroundColor: '#E3F2FD' }]}>
                                    <Text style={[styles.tagText, { color: '#1565C0' }]}>Trompete</Text>
                                </View>
                                <View style={[styles.tag, { backgroundColor: '#E8F5E9' }]}>
                                    <Text style={[styles.tagText, { color: '#2E7D32' }]}>Básico</Text>
                                </View>
                            </View>
                            <Text style={styles.timeText}><Ionicons name="time-outline" size={12} /> 30min</Text>
                        </View>
                    </TouchableOpacity>

                    {/* List Item 3 */}
                    <TouchableOpacity style={styles.listItemCard}>
                        <View style={styles.listIconBox}>
                            <Ionicons name="musical-notes" size={24} color="white" />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.cardTitle}>Escala Maior Dó</Text>
                            <Text style={styles.cardSubtitle}>Por Método</Text>
                            <View style={styles.tagsContainer}>
                                <View style={[styles.tag, { backgroundColor: '#FFF3E0' }]}>
                                    <Text style={[styles.tagText, { color: '#E65100' }]}>Teoria</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Exit Button at Bottom */}
                    <TouchableOpacity style={styles.bottomLogoutButton} onPress={onLogout}>
                        <Ionicons name="log-out-outline" size={24} color="#002259" />
                        <Text style={styles.bottomLogoutText}>Sair</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}
