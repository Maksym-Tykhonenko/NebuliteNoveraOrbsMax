import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Text as Neiletxtors,
    Dimensions as NratenoDmnsn,
    TouchableOpacity as Tachoverbs,
    Image as Neoraimgen,
    View as Broboxtil,
} from 'react-native';
import { olitubefontsors } from '../olitubefontsors';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useState } from 'react';

export default function ShiowngMaindition({
    setFocusNode
}: {
    setFocusNode: React.Dispatch<React.SetStateAction<string>>;
}) {
    const probeBox = NratenoDmnsn.get('window');
    const orbuliH = probeBox.height;
    const orbuliW = probeBox.width;

    // bestScore state
    const [bestScore, setBestScore] = useState<number>(0);

    useEffect(() => {
        const fetchBestScore = async () => {
            try {
                const stored = await AsyncStorage.getItem('bestScore');
                if (stored === null) {
                    await AsyncStorage.setItem('bestScore', '0');
                    setBestScore(0);
                } else {
                    setBestScore(Number(stored));
                }
            } catch (e) {
                setBestScore(0);
            }
        };
        fetchBestScore();
    }, []);

    // Кнопки
    const buttons = [
        { key: 'game', label: 'Game', arobNavinebu: 'Amazing Game of Splitting Orbs' },
        { key: 'facts', label: 'Cosmo Facts', arobNavinebu: 'Cosmic Facts of the Universe' },
        { key: 'skins', label: 'Background Skins', arobNavinebu: 'Selecting Background Skins For Game Page' },
    ];

    return (
        <Broboxtil style={{
            alignItems: 'center', flex: 1, backgroundColor: 'transparent',
            paddingTop: orbuliH * 0.019,
        }}>
            <Neoraimgen
                style={{
                    width: orbuliW * 0.7,
                    height: orbuliW * 0.7,
                    opacity: 0.9,
                }}
                resizeMode="contain"
                source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/cosmisOrbsMerge.png')}
            />

            {/* Best Score */}
            <Neiletxtors style={{
                textAlign: 'center',
                fontSize: orbuliH * 0.03,
                marginTop: orbuliH * 0.05,
                color: '#fff',
                fontWeight: 'bold',
                marginVertical: orbuliH * 0.025,
                fontStyle: 'italic',
            }}>
                Best Score: {bestScore}
            </Neiletxtors>
            {/* Кнопки */}
            <Broboxtil style={{
                alignSelf: 'center',
                width: orbuliW,
                alignItems: 'center',
            }}>
                {buttons.map((btn, idx) => (
                    <Tachoverbs
                        key={btn.key}
                        activeOpacity={0.8}
                        onPress={() => setFocusNode(btn.arobNavinebu)}
                        style={{
                            justifyContent: 'center',
                            height: orbuliH * 0.09,
                            borderRadius: orbuliW * 0.061,
                            width: orbuliW * 0.8,
                            overflow: 'hidden',
                            marginBottom: orbuliH * 0.03,
                            alignItems: 'center',
                        }}
                    >
                        <LinearGradient
                            style={{
                                alignItems: 'center',
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                            }}
                            locations={[0, 0.5, 1]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            colors={['#720194', '#FD6E2D', '#890B60']}
                        />
                        <Broboxtil style={{ position: 'relative' }}>
                            {/* Контур */}
                            {[
                                { left: 2, top: 0 },
                                { left: -2, top: 0 },
                                { left: 0, top: 2 },
                                { left: 0, top: -2 },
                            ].map((offset, i) => (
                                <Neiletxtors
                                    key={i}
                                    style={{
                                        color: '#23008C',
                                        fontFamily: olitubefontsors.nebuveNuniBlack,
                                        position: 'absolute',
                                        fontSize: orbuliH * 0.035,
                                        ...offset,
                                    }}
                                >
                                    {btn.label}
                                </Neiletxtors>
                            ))}
                            {/* Основний текст */}
                            <Neiletxtors style={{
                                fontSize: orbuliH * 0.035,
                                color: '#5ed1ff',
                                fontFamily: olitubefontsors.nebuveNuniBlack,
                            }}>
                                {btn.label}
                            </Neiletxtors>
                        </Broboxtil>
                    </Tachoverbs>
                ))}
            </Broboxtil>
        </Broboxtil>
    );
}