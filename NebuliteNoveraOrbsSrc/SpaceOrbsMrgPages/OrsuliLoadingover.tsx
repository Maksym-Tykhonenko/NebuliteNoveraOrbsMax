import AsyncStorage from '@react-native-async-storage/async-storage';
const NEBULITE_BOOT_SIGIL = 'official_nebulite_novera_orbs_boot_signal_v1';
import React, {
    useRef as NovaMutableLock,
    useEffect as OrbitalCycle,
} from 'react';
import { SafeAreaView as OrbSafeCradle } from 'react-native-safe-area-context';
import { useNavigation as NebuNavFlux } from '@react-navigation/native';
import {
    Image as LiteRasterGlyph,
    Animated as NebuMotionThread,
    Easing as OrbEaseFlow,
    Dimensions as NovaMeasureGrid,
} from 'react-native';
import NorobsLoadim from '../OrbitsComntenotsUtice/NorobsLoadim';

const NebuNovaOrbLoader: React.FC = () => {
    const navNebula = NebuNavFlux();
    const { width: orbSpanW, height: orbSpanH } = NovaMeasureGrid.get('window');
    const wrapFade = NovaMutableLock(new NebuMotionThread.Value(0)).current;
    const textFade = NovaMutableLock(new NebuMotionThread.Value(0)).current;
    // swing + blink channels
    const novaSwing = NovaMutableLock(new NebuMotionThread.Value(0)).current;
    const novaBlink = NovaMutableLock(new NebuMotionThread.Value(1)).current;
    // swing rotation loop
    OrbitalCycle(() => {
        let drift = 1;
        let stillAlive = true;

        const spinNova = () => {
            if (!stillAlive) return;
            NebuMotionThread.timing(novaSwing, {
                toValue: drift,
                duration: 1800,
                easing: OrbEaseFlow.inOut(OrbEaseFlow.ease),
                useNativeDriver: true,
            }).start(() => {
                drift *= -1;
                spinNova();
            });
        };

        spinNova();

        return () => {
            stillAlive = false;
        };
    }, []);

    // blink opacity loop
    OrbitalCycle(() => {
        NebuMotionThread.loop(
            NebuMotionThread.sequence([
                NebuMotionThread.timing(novaBlink, {
                    toValue: 0.6,
                    duration: 1200,
                    easing: OrbEaseFlow.inOut(OrbEaseFlow.ease),
                    useNativeDriver: true,
                }),
                NebuMotionThread.timing(novaBlink, {
                    toValue: 1,
                    duration: 1200,
                    easing: OrbEaseFlow.inOut(OrbEaseFlow.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // boot + routing logic
    OrbitalCycle(() => {
        let nebulaAlive = true;
        const chaosTick = Math.floor(Math.random() * 900);

        const igniteNebula = async () => {
            try {
                const storedMark = await AsyncStorage.getItem(NEBULITE_BOOT_SIGIL);
                if (!storedMark) {
                    await AsyncStorage.setItem(NEBULITE_BOOT_SIGIL, 'seen');
                }

                setTimeout(() => {
                    if (!nebulaAlive) return;

                    NebuMotionThread.timing(wrapFade, {
                        toValue: 1,
                        duration: 420,
                        useNativeDriver: true,
                    }).start(() => {
                        NebuMotionThread.timing(textFade, {
                            toValue: 1,
                            duration: 420,
                            useNativeDriver: true,
                        }).start();
                    });

                    setTimeout(() => {
                        if (!nebulaAlive) return;
                        navNebula.replace(
                            storedMark
                                ? 'OravenebuWraponet'
                                : 'NovebsuliOnboardingite'
                        );
                    }, 1000 + chaosTick);
                }, 5200);
            } catch (nebulaErr) {
                if (__DEV__) console.warn('NebuliteOrb::bootFault', nebulaErr);
            }
        };

        igniteNebula();

        return () => {
            nebulaAlive = false;
        };
    }, [navNebula, orbSpanW]);

    return (
        <OrbSafeCradle
            style={{
                flex: 1,
                width: orbSpanW,
                height: orbSpanH,
                backgroundColor: '#0F3D66',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* nebula background */}
            <LiteRasterGlyph
                source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/gengrnd.png')}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    width: orbSpanW,
                    height: orbSpanH,
                }}
            />

            {/* floating orb image */}
            <NebuMotionThread.View
                style={{
                    width: orbSpanW * 0.7,
                    height: orbSpanW * 0.7,
                    marginTop: orbSpanH * 0.07,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: novaBlink,
                    transform: [
                        {
                            rotate: novaSwing.interpolate({
                                inputRange: [-1, 0, 1],
                                outputRange: ['-8deg', '0deg', '8deg'],
                            }),
                        },
                    ],
                }}
            >
                <LiteRasterGlyph
                    source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/cosmisOrbsMerge.png')}
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </NebuMotionThread.View>

            <NorobsLoadim />
        </OrbSafeCradle>
    );
};

export default NebuNovaOrbLoader;