import React from 'react';
import { View, Text, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';

export default function RankingScreen() {
    return (
        <View style={[styles.safeArea, styles.myStudiesContainer]}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.rankingHeader}>
                <SafeAreaView style={{ alignItems: 'center', width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal: 20, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.rankingTitle}>Ranking Semanal</Text>
                            <Text style={styles.rankingSubtitle}>Top 10 desta semana</Text>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.headerLogo}
                        resizeMode="contain"
                    />

                    <View style={{ backgroundColor: '#003380', width: '90%', padding: 16, borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ backgroundColor: '#FFC107', padding: 8, borderRadius: 10, marginRight: 16 }}>
                            <Ionicons name="musical-notes" size={24} color="#002259" />
                        </View>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Acompanhamento</Text>
                    </View>

                </SafeAreaView>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* Podium */}
                <View style={styles.podiumContainer}>
                    {/* 2nd Place */}
                    <View style={styles.podiumPlace}>
                        <View style={styles.podiumAvatar}>
                            <Ionicons name="musical-note" size={24} color="#666" />
                            <View style={[styles.starBadge, { backgroundColor: '#C0C0C0' }]}>
                                <Ionicons name="medal" size={12} color="white" />
                            </View>
                        </View>
                        <Text style={styles.rankName}>João Santos</Text>
                        <View style={styles.rankScore}>
                            <Ionicons name="trophy" size={10} color="#666" style={{ marginRight: 2 }} />
                            <Text style={{ fontSize: 10, color: '#666' }}>1180</Text>
                        </View>
                        <LinearGradient colors={['#CFD8DC', '#90A4AE']} style={[styles.podiumBase, { height: 100 }]}>
                            <Text style={styles.rankNumber}>2</Text>
                        </LinearGradient>
                    </View>

                    {/* 1st Place */}
                    <View style={styles.podiumPlace}>
                        <View style={[styles.podiumAvatar, { width: 70, height: 70, borderRadius: 35, borderColor: '#FFC107', borderWidth: 3 }]}>
                            <Ionicons name="musical-notes" size={30} color="#FFC107" />
                            <View style={styles.starBadge}>
                                <Ionicons name="ribbon" size={12} color="white" />
                            </View>
                        </View>
                        <Text style={[styles.rankName, { fontSize: 14 }]}>Maria Silva</Text>
                        <View style={styles.rankScore}>
                            <Ionicons name="trophy" size={10} color="#FFC107" style={{ marginRight: 2 }} />
                            <Text style={{ fontSize: 12, color: '#FFC107', fontWeight: 'bold' }}>1250</Text>
                        </View>
                        <LinearGradient colors={['#FFECB3', '#FFC107']} style={[styles.podiumBase, { height: 130, width: 90 }]}>
                            <Text style={styles.rankNumber}>1</Text>
                        </LinearGradient>
                    </View>

                    {/* 3rd Place */}
                    <View style={styles.podiumPlace}>
                        <View style={styles.podiumAvatar}>
                            <Ionicons name="git-network-outline" size={24} color="#666" />
                            <View style={[styles.starBadge, { backgroundColor: '#CD7F32' }]}>
                                <Ionicons name="medal" size={12} color="white" />
                            </View>
                        </View>
                        <Text style={styles.rankName}>Ana Costa</Text>
                        <View style={styles.rankScore}>
                            <Ionicons name="trophy" size={10} color="#666" style={{ marginRight: 2 }} />
                            <Text style={{ fontSize: 10, color: '#666' }}>1050</Text>
                        </View>
                        <LinearGradient colors={['#FFCCBC', '#FF9800']} style={[styles.podiumBase, { height: 80 }]}>
                            <Text style={styles.rankNumber}>3</Text>
                        </LinearGradient>
                    </View>
                </View>

                {/* List */}
                <View style={styles.rankingList}>

                    <View style={styles.rankingItem}>
                        <View style={[styles.rankPositionCircle, { backgroundColor: '#FFC107' }]}>
                            <Text style={[styles.rankPositionText, { color: 'white' }]}>1</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="ribbon" size={20} color="#FFC107" />
                        </View>
                        <Text style={[styles.rankName, { marginTop: 0, textAlign: 'left', flex: 1 }]}>Maria Silva</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                            <Ionicons name="trophy-outline" size={14} color="#FFC107" style={{ marginRight: 4 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555' }}>1250</Text>
                        </View>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={[styles.rankPositionCircle, { backgroundColor: '#FFECB3' }]}>
                            <Text style={[styles.rankPositionText, { color: '#FFA000' }]}>2</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="medal" size={20} color="#C0C0C0" />
                        </View>
                        <Text style={[styles.rankName, { marginTop: 0, textAlign: 'left', flex: 1 }]}>João Santos</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                            <Ionicons name="trophy-outline" size={14} color="#FFC107" style={{ marginRight: 4 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555' }}>1180</Text>
                        </View>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={[styles.rankPositionCircle, { backgroundColor: '#FFCCBC' }]}>
                            <Text style={[styles.rankPositionText, { color: '#E64A19' }]}>3</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="medal" size={20} color="#CD7F32" />
                        </View>
                        <Text style={[styles.rankName, { marginTop: 0, textAlign: 'left', flex: 1 }]}>Ana Costa</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                            <Ionicons name="trophy-outline" size={14} color="#FFC107" style={{ marginRight: 4 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555' }}>1050</Text>
                        </View>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={styles.rankPositionCircle}>
                            <Text style={styles.rankPositionText}>4</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="musical-note" size={20} color="#555" />
                        </View>
                        <Text style={[styles.rankName, { marginTop: 0, textAlign: 'left', flex: 1 }]}>Pedro Oliveira</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                            <Ionicons name="trophy-outline" size={14} color="#FFC107" style={{ marginRight: 4 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555' }}>920</Text>
                        </View>
                    </View>

                    <View style={[styles.rankingItem, { backgroundColor: '#E3F2FD' }]}>
                        <View style={[styles.rankPositionCircle, { backgroundColor: 'white' }]}>
                            <Text style={styles.rankPositionText}>5</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="musical-note" size={20} color="#002259" />
                        </View>
                        <Text style={[styles.rankName, { marginTop: 0, textAlign: 'left', flex: 1, color: '#002259' }]}>Pedro Mendes</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                            <Ionicons name="trophy-outline" size={14} color="#FFC107" style={{ marginRight: 4 }} />
                            <Text style={{ fontWeight: 'bold', color: '#002259' }}>850</Text>
                        </View>
                    </View>

                    <View style={styles.rankingItem}>
                        <View style={styles.rankPositionCircle}>
                            <Text style={styles.rankPositionText}>6</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <Ionicons name="musical-note" size={20} color="#555" />
                        </View>
                        <Text style={[styles.rankName, { marginTop: 0, textAlign: 'left', flex: 1 }]}>Carlos Mendes</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                            <Ionicons name="trophy-outline" size={14} color="#FFC107" style={{ marginRight: 4 }} />
                            <Text style={{ fontWeight: 'bold', color: '#555' }}>780</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
