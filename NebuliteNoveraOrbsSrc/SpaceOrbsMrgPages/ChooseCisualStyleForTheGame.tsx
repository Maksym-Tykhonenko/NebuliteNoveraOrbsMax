import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    Text as Noortxet,
    TouchableOpacity as EtiluPrepacitbs,
    Dimensions as Brosionrzmr,
    Image as Noverimage,
    View as Obsurboxiw,
} from 'react-native';
import stylesforgame from '../Ulivedata/stylesforgame';
import { ScrollView } from 'react-native-gesture-handler';
import { olitubefontsors } from '../olitubefontsors';

export default function ChooseCisualStyleForTheGame({
    setFocusNode,
    activeId,
    setActiveId,
}: {
    setFocusNode: React.Dispatch<React.SetStateAction<string>>;
    activeId: number | null;
    setActiveId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
    const { width: widorbs, height: heitorbs } = Brosionrzmr.get('window');

    const exitW = widorbs * 0.19;
    const exitH = heitorbs * 0.045;
    const exitRad = widorbs * 0.025;
    const exitFont = widorbs * 0.045;

    // Фонові картки
    const cardW = widorbs * 0.32;
    const cardH = heitorbs * 0.19;
    const cardRad = widorbs * 0.045;
    const cardMargin = widorbs * 0.04;
    const borderWidth = widorbs * 0.012;
    const titleFont = widorbs * 0.05;
    const titleMargin = heitorbs * 0.012;


    useEffect(() => {
        (async () => {
            const storedId = await AsyncStorage.getItem('activeVisualStyleId');
            if (storedId) {
                setActiveId(Number(storedId));
            } else {
                setActiveId(1);
                await AsyncStorage.setItem('activeVisualStyleId', '1');
            }
        })();
    }, []);

    const handleSelect = async (id: number) => {
        setActiveId(id);
        await AsyncStorage.setItem('activeVisualStyleId', String(id));
    };

    // Групуємо по два на ряд
    const getRows = () => {
        const rows = [];
        for (let i = 0; i < stylesforgame.length; i += 2) {
            rows.push(stylesforgame.slice(i, i + 2));
        }
        return rows;
    };

    // Відображення фонів у сітці 2x3
    return (
        <Obsurboxiw style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            paddingTop: heitorbs * 0.025,
            flex: 1,
        }}>
            {/* Exit Button */}
            <EtiluPrepacitbs
                onPress={() => setFocusNode('Novela Ulita Orbits Mainipg')}
                style={{
                    height: exitH,
                    borderRadius: exitRad,
                    right: widorbs * 0.045,
                    alignItems: 'center',
                    backgroundColor: '#A393DD',
                    borderWidth: widorbs * 0.004,
                    justifyContent: 'center',
                    top: heitorbs * 0.035,
                    zIndex: 10,
                    borderColor: '#553089',
                    position: 'absolute',
                    width: exitW,
                }}
                activeOpacity={0.7}
            >
                <Noortxet style={{
                    letterSpacing: 1,
                    fontSize: exitFont,
                    fontWeight: 'bold',
                    color: '#120043',
                }}>EXIT</Noortxet>
            </EtiluPrepacitbs>

            <Noortxet style={{
                marginTop: heitorbs * 0.07,
                marginBottom: heitorbs * 0.01,
                fontFamily: olitubefontsors.nebuveNuniExtraBold,
                fontSize: widorbs * 0.059,
                color: '#0F0038',
                textAlign: 'center',
            }}>
                Choose Your Visual Style for {'\n'}the Game
            </Noortxet>

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{
                paddingTop: heitorbs * 0.03,
                paddingBottom: heitorbs * 0.1,
            }}>
                <Obsurboxiw style={{
                    marginTop: heitorbs * 0.01,
                    width: widorbs,
                }}>
                    {getRows().map((row, rowIdx) => (
                        <Obsurboxiw key={rowIdx}
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'center',
                                width: widorbs * 0.79,
                                marginBottom: cardMargin,
                                justifyContent: 'space-between',
                            }}
                        >
                            {row.map((item, idx) => (
                                <Obsurboxiw style={{
                                    width: cardW,
                                    alignItems: 'center',
                                    marginLeft: idx === 1 ? cardMargin : 0,
                                }}
                                    key={item.id}
                                >
                                    <EtiluPrepacitbs
                                        activeOpacity={0.8}
                                        onPress={() => handleSelect(item.id)}
                                        style={{
                                            alignItems: 'center',
                                            borderColor: activeId === item.id ? '#2BBA5B' : '#C52CFE',
                                            width: cardW,
                                            height: cardH,
                                            borderRadius: cardRad,
                                            overflow: 'hidden',
                                            justifyContent: 'center',
                                            backgroundColor: '#2B1A5A',
                                            borderWidth: borderWidth,
                                        }}
                                    >
                                        <Noverimage
                                            resizeMode="cover"
                                            style={{
                                                width: cardW,
                                                height: cardH,
                                                borderRadius: cardRad,
                                            }}
                                            source={item.thisStyle}
                                        />
                                    </EtiluPrepacitbs>
                                    <Noortxet style={{
                                        textAlign: 'center',
                                        marginTop: titleMargin,
                                        fontFamily: olitubefontsors.nebuveNuniBold,
                                        fontSize: titleFont,
                                        color: '#ECC5FF',
                                    }}>
                                        {item.title}
                                    </Noortxet>
                                </Obsurboxiw>
                            ))}
                        </Obsurboxiw>
                    ))}
                </Obsurboxiw>
            </ScrollView >
        </Obsurboxiw >
    );
}