import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Dimensions, StatusBar, PanResponder, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Score, Annotation, useScores } from '../context/ScoreContext';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';

interface ScoreViewScreenProps {
    score: Score;
    onBack: () => void;
}

const { width } = Dimensions.get('window');

export default function ScoreViewScreen({ score, onBack }: ScoreViewScreenProps) {
    const { saveAnnotations } = useScores();
    const [scale, setScale] = useState(1);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [annotations, setAnnotations] = useState<Annotation[]>(score.annotations || []);

    // Tools State
    // 'none' = Hand/Pan default when tools closed or no tool active
    const [currentTool, setCurrentTool] = useState<'none' | 'hand' | 'select' | 'pen' | 'highlight' | 'circle' | 'text' | 'eraser'>('none');
    const [currentColor, setCurrentColor] = useState('#EF5350');

    // Drawing/ Interaction State
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [currentShapeStart, setCurrentShapeStart] = useState<{ x: number, y: number } | null>(null);
    const [currentShapeEnd, setCurrentShapeEnd] = useState<{ x: number, y: number } | null>(null);

    // Moving State
    const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);

    // Text Input State
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [textPosition, setTextPosition] = useState<{ x: number, y: number } | null>(null);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

    const handleSave = () => {
        saveAnnotations(score.id, annotations);
        onBack();
    };

    const handleCloseTools = () => {
        setIsToolsOpen(false);
        setCurrentTool('none'); // Reset to default pan mode
        setSelectedAnnotationId(null);
    };

    // Helper: Hit Detection
    const getAnnotationAtPoint = (x: number, y: number): string | null => {
        for (let i = annotations.length - 1; i >= 0; i--) {
            const ann = annotations[i];
            if (ann.type === 'circle') {
                const dist = Math.sqrt(Math.pow(x - (ann.x || 0), 2) + Math.pow(y - (ann.y || 0), 2));
                if (dist <= (ann.radius || 0) + 10) return ann.id;
            } else if (ann.type === 'text') {
                const w = (ann.text?.length || 0) * 12;
                const h = 25;
                if (x >= (ann.x || 0) && x <= (ann.x || 0) + w && y >= (ann.y || 0) - h && y <= (ann.y || 0)) {
                    return ann.id;
                }
            } else if (ann.type === 'path' || ann.type === 'highlight') {
                if (ann.points) {
                    for (const p of ann.points) {
                        const [px, py] = p.split(',').map(Number);
                        const dist = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));
                        if (dist < 20) return ann.id;
                    }
                }
            }
        }
        return null;
    };

    const panResponder = useRef(
        PanResponder.create({
            // Allow pan (scroll) if tool is 'hand' or 'none'. Block scroll if drawing or moving.
            onStartShouldSetPanResponder: () => currentTool !== 'none' && currentTool !== 'hand',
            onMoveShouldSetPanResponder: () => currentTool !== 'none' && currentTool !== 'hand',

            onPanResponderGrant: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                const x = locationX / scale;
                const y = locationY / scale;

                if (currentTool === 'select') {
                    const hitId = getAnnotationAtPoint(x, y);
                    if (hitId) {
                        setSelectedAnnotationId(hitId);
                        setDragStart({ x, y });
                    } else {
                        setSelectedAnnotationId(null);
                    }
                } else if (currentTool === 'eraser') {
                    const hitId = getAnnotationAtPoint(x, y);
                    if (hitId) {
                        setAnnotations(prev => prev.filter(a => a.id !== hitId));
                    }
                } else if (currentTool === 'pen' || currentTool === 'highlight') {
                    setCurrentPath([`${x},${y}`]);
                } else if (currentTool === 'circle') {
                    setCurrentShapeStart({ x, y });
                    setCurrentShapeEnd({ x, y });
                }
            },
            onPanResponderMove: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                const x = locationX / scale;
                const y = locationY / scale;

                if (currentTool === 'select' && selectedAnnotationId && dragStart) {
                    const dx = x - dragStart.x;
                    const dy = y - dragStart.y;

                    setAnnotations(prev => prev.map(ann => {
                        if (ann.id !== selectedAnnotationId) return ann;

                        // We update position directly. For paths, shift all points.
                        if (ann.type === 'circle' || ann.type === 'text') {
                            return { ...ann, x: (ann.x || 0) + dx, y: (ann.y || 0) + dy };
                        } else if ((ann.type === 'path' || ann.type === 'highlight') && ann.points) {
                            const newPoints = ann.points.map(p => {
                                const [px, py] = p.split(',').map(Number);
                                return `${px + dx},${py + dy}`;
                            });
                            return { ...ann, points: newPoints };
                        }
                        return ann;
                    }));
                    setDragStart({ x, y });
                } else if (currentTool === 'pen' || currentTool === 'highlight') {
                    setCurrentPath(prev => [...prev, `${x},${y}`]);
                } else if (currentTool === 'circle') {
                    setCurrentShapeEnd({ x, y });
                }
            },
            onPanResponderRelease: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                const x = locationX / scale;
                const y = locationY / scale;

                if (currentTool === 'pen' || currentTool === 'highlight') {
                    const newPath: Annotation = {
                        id: Date.now().toString(),
                        type: currentTool === 'highlight' ? 'highlight' : 'path',
                        points: currentPath,
                        color: currentTool === 'highlight' ? currentColor + '80' : currentColor,
                        strokeWidth: currentTool === 'highlight' ? 20 : 3,
                    };
                    setAnnotations(prev => [...prev, newPath]);
                    setCurrentPath([]);
                } else if (currentTool === 'circle' && currentShapeStart && currentShapeEnd) {
                    const radius = Math.sqrt(Math.pow(currentShapeEnd.x - currentShapeStart.x, 2) + Math.pow(currentShapeEnd.y - currentShapeStart.y, 2));
                    if (radius > 5) {
                        const newCircle: Annotation = {
                            id: Date.now().toString(),
                            type: 'circle',
                            x: currentShapeStart.x,
                            y: currentShapeStart.y,
                            radius: radius,
                            color: currentColor,
                            strokeWidth: 3
                        };
                        setAnnotations(prev => [...prev, newCircle]);
                    }
                    setCurrentShapeStart(null);
                    setCurrentShapeEnd(null);
                } else if (currentTool === 'text') {
                    setTextPosition({ x, y });
                    setIsInputVisible(true);
                    // Note: Text tool doesn't use standard pan responder drag, but tap detection is handled via release or tap
                }

                if (currentTool === 'select') {
                    setDragStart(null);
                }
            }
        })
    ).current;

    const confirmText = () => {
        if (textPosition && inputText) {
            const newText: Annotation = {
                id: Date.now().toString(),
                type: 'text',
                x: textPosition.x,
                y: textPosition.y,
                text: inputText,
                color: currentColor,
                strokeWidth: 1
            };
            setAnnotations(prev => [...prev, newText]);
            setInputText('');
            setIsInputVisible(false);
            setTextPosition(null);
            // Stay in text tool or switch? Stay in text.
        } else {
            setIsInputVisible(false);
        }
    };

    const imageWidth = width * 0.95;
    const imageHeight = imageWidth * 1.414;

    const renderAnnotations = () => {
        return (
            <>
                {annotations.map((ann) => {
                    const isSelected = selectedAnnotationId === ann.id;
                    const opacity = isSelected ? 0.6 : 1;

                    if (ann.type === 'path' || ann.type === 'highlight') {
                        const d = ann.points ? `M ${ann.points.join(' L ')}` : '';
                        return (
                            <Path
                                key={ann.id}
                                d={d}
                                stroke={ann.color}
                                strokeWidth={ann.strokeWidth + (isSelected ? 2 : 0)}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeOpacity={ann.type === 'highlight' ? 0.5 : 1}
                                opacity={opacity}
                            />
                        );
                    }
                    if (ann.type === 'circle') {
                        return (
                            <Circle
                                key={ann.id}
                                cx={ann.x}
                                cy={ann.y}
                                r={ann.radius}
                                stroke={ann.color}
                                strokeWidth={ann.strokeWidth + (isSelected ? 2 : 0)}
                                fill="none"
                                opacity={opacity}
                            />
                        );
                    }
                    if (ann.type === 'text') {
                        return (
                            <SvgText
                                key={ann.id}
                                x={ann.x}
                                y={ann.y}
                                fill={ann.color}
                                stroke={isSelected ? '#ccc' : 'none'}
                                fontSize="20"
                                fontWeight="bold"
                                opacity={opacity}
                            >
                                {ann.text}
                            </SvgText>
                        );
                    }
                    return null;
                })}
                {/* Current Drawing feedback */}
                {(currentTool === 'pen' || currentTool === 'highlight') && currentPath.length > 0 && (
                    <Path
                        d={`M ${currentPath.join(' L ')}`}
                        stroke={currentTool === 'highlight' ? currentColor + '80' : currentColor}
                        strokeWidth={currentTool === 'highlight' ? 20 : 3}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
                {currentTool === 'circle' && currentShapeStart && currentShapeEnd && (
                    <Circle
                        cx={currentShapeStart.x}
                        cy={currentShapeStart.y}
                        r={Math.sqrt(Math.pow(currentShapeEnd.x - currentShapeStart.x, 2) + Math.pow(currentShapeEnd.y - currentShapeStart.y, 2))}
                        stroke={currentColor}
                        strokeWidth={3}
                        fill="none"
                    />
                )}
            </>
        );
    };

    return (
        <Modal animationType="slide" transparent={false} visible={true} onRequestClose={onBack}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#002259" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle} numberOfLines={1}>{score.title.toUpperCase()}</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Ionicons name="save-outline" size={20} color="#002259" style={{ marginRight: 4 }} />
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>

                {/* Controls Bar */}
                <View style={styles.controlsBar}>
                    <View style={styles.zoomControls}>
                        <TouchableOpacity onPress={handleZoomOut} style={styles.controlButton}>
                            <Ionicons name="remove" size={20} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.zoomText}>{Math.round(scale * 100)}%</Text>
                        <TouchableOpacity onPress={handleZoomIn} style={styles.controlButton}>
                            <Ionicons name="add" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.toolButton}>
                        <Ionicons name="musical-note-outline" size={18} color="#555" style={{ marginRight: 5 }} />
                        <Text style={styles.toolButtonText}>Afinar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.toolButton, isToolsOpen && { backgroundColor: '#003380' }]}
                        onPress={() => setIsToolsOpen(true)}
                    >
                        <Ionicons name="create-outline" size={18} color={isToolsOpen ? "white" : "#555"} style={{ marginRight: 5 }} />
                        <Text style={[styles.toolButtonText, isToolsOpen && { color: 'white' }]}>Ferramentas</Text>
                    </TouchableOpacity>
                </View>

                {/* Tools Overlay - Matches Mockup Style */}
                {isToolsOpen && (
                    <View style={styles.toolsOverlay}>
                        <View style={styles.toolsHeader}>
                            <Text style={styles.toolsTitle}>Ferramentas de Anotação</Text>
                            <TouchableOpacity onPress={handleCloseTools} style={styles.closeToolsButton}>
                                <Ionicons name="close" size={20} color="#555" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.toolsGrid}>
                            {[
                                { id: 'pen', icon: 'pencil', label: 'Caneta' },
                                { id: 'highlight', icon: 'brush', label: 'Destaque' },
                                { id: 'circle', icon: 'ellipse-outline', label: 'Círculo' },
                                { id: 'text', icon: 'text', label: 'Texto' },
                                { id: 'eraser', icon: 'trash-outline', label: 'Borracha' },
                                { id: 'select', icon: 'move', label: 'Mover' },
                            ].map((tool) => (
                                <TouchableOpacity
                                    key={tool.id}
                                    style={[styles.toolPill, currentTool === tool.id && styles.activeToolPill]}
                                    onPress={() => setCurrentTool(tool.id as any)}
                                >
                                    <Ionicons name={tool.icon as any} size={18} color={currentTool === tool.id ? "white" : "#333"} />
                                    <Text style={[styles.toolPillText, currentTool === tool.id && { color: 'white' }]}>{tool.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.colorsRow}>
                            {['#EF5350', '#FFCA28', '#66BB6A', '#42A5F5', '#AB47BC', '#000000'].map(color => (
                                <TouchableOpacity
                                    key={color}
                                    style={[styles.colorCircle, { backgroundColor: color }, currentColor === color && styles.activeColorCircle]}
                                    onPress={() => setCurrentColor(color)}
                                />
                            ))}
                        </View>
                    </View>
                )}

                {/* Score Image Area */}
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    maximumZoomScale={3}
                    minimumZoomScale={0.5}
                    // Enable scroll ONLY if tool is 'hand' or 'none' (default)
                    scrollEnabled={currentTool === 'none' || currentTool === 'hand'}
                >
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ flexGrow: 1 }}
                        scrollEnabled={currentTool === 'none' || currentTool === 'hand'}
                    >
                        <View style={{ alignItems: 'center', padding: 20 }}>
                            <Text style={styles.scoreTitleInPage}>{score.title}</Text>
                            <Text style={styles.scoreSubtitleInPage}>{score.author}</Text>
                            {score.instrument === 'Flauta' && (
                                <Text style={[styles.scoreSubtitleInPage, { fontSize: 12 }]}>Instrumento: Flauta</Text>
                            )}
                            <Text style={styles.scoreSubtitleInPage}>Arr.: Jardilino Maciel</Text>

                            <View style={{ marginTop: 20 }}>
                                {score.imageSource ? (
                                    <View>
                                        <Image
                                            source={score.imageSource}
                                            style={[
                                                styles.scoreImage,
                                                {
                                                    width: imageWidth * scale,
                                                    height: imageHeight * scale
                                                }
                                            ]}
                                            resizeMode="contain"
                                        />
                                        {/* Annotation Layer */}
                                        <View
                                            style={StyleSheet.absoluteFill}
                                            {...panResponder.panHandlers}
                                            pointerEvents={currentTool === 'none' || currentTool === 'hand' ? 'none' : 'auto'}
                                        >
                                            <Svg height={imageHeight * scale} width={imageWidth * scale} viewBox={`0 0 ${imageWidth} ${imageHeight}`}>
                                                {renderAnnotations()}
                                            </Svg>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={[styles.placeholderImage, { width: imageWidth, height: 400 }]}>
                                        <Ionicons name="musical-notes" size={64} color="#ccc" />
                                        <Text style={{ color: '#999', marginTop: 10 }}>Imagem da partitura não disponível</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </ScrollView>

                {/* Text Entry Modal/Overlay */}
                {isInputVisible && (
                    <View style={styles.textInputOverlay}>
                        <View style={styles.textInputBox}>
                            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Adicionar Texto</Text>
                            <TextInput
                                style={styles.textInput}
                                value={inputText}
                                onChangeText={setInputText}
                                placeholder="Digite sua anotação..."
                                autoFocus
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => setIsInputVisible(false)} style={{ marginRight: 15 }}><Text>Cancelar</Text></TouchableOpacity>
                                <TouchableOpacity onPress={confirmText}><Text style={{ color: '#003380', fontWeight: 'bold' }}>Adicionar</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    header: {
        height: 60,
        backgroundColor: '#003380',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        elevation: 4,
        zIndex: 10,
    },
    backButton: {
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    saveButton: {
        backgroundColor: '#FFCA28',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    saveButtonText: {
        color: '#002259',
        fontWeight: 'bold',
        fontSize: 14,
    },
    controlsBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 2,
        zIndex: 5,
    },
    zoomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 2,
    },
    controlButton: {
        padding: 8,
    },
    zoomText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginHorizontal: 5,
        minWidth: 40,
        textAlign: 'center',
    },
    toolButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    toolButtonText: {
        color: '#555',
        fontSize: 14,
        fontWeight: '500',
    },
    toolsOverlay: {
        position: 'absolute',
        top: 130, // Positioned below the controls bar
        left: 20,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 20,
    },
    toolsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    toolsTitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
    closeToolsButton: {
        padding: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
    },
    toolsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
        justifyContent: 'flex-start',
    },
    toolPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    activeToolPill: {
        backgroundColor: '#003380',
    },
    toolPillText: {
        marginLeft: 6,
        fontSize: 13,
        color: '#333',
        fontWeight: '500'
    },
    colorsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#eee'
    },
    activeColorCircle: {
        borderWidth: 2,
        borderColor: '#333',
        transform: [{ scale: 1.1 }]
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    scoreTitleInPage: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        textAlign: 'center',
    },
    scoreSubtitleInPage: {
        fontSize: 14,
        color: '#555',
        textAlign: 'right',
        width: '100%',
        marginBottom: 2,
    },
    scoreImage: {
        // Dimensions handled inline
    },
    placeholderImage: {
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8,
    },
    textInputOverlay: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    textInputBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        minHeight: 40
    }
});
