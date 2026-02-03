import AsyncStorage from '@react-native-async-storage/async-storage';
const ORB_LITE_PASSKEY = 'nera-orbs-ulite-orbits';

import React, { useState as OrbStepLatch } from 'react';
import {
    useWindowDimensions as NebuGaugeSense,
    Image as OrbitalRaster,
    View as NovelaShellPane,
    TouchableOpacity as PulseTapNode,
    Text as GlyphNovaText,
} from 'react-native';

import { useNavigation as OrbitNavInjector } from '@react-navigation/native';
import { olitubefontsors } from '../olitubefontsors';
import Oreovgradnt from '../OrbitsComntenotsUtice/Oreovgradnt';

const NebuNovOrbOnboardingFlux: React.FC = () => {
    const [orbPhase, setOrbPhase] = OrbStepLatch(0);
    const navStream = OrbitNavInjector();

    const orbSlideMatrix = [
        require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/textesforonb/chooseyourdrop.png'),
        require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/textesforonb/MergeGrow.png'),
        require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/textesforonb/AvoidTheLine.png'),
    ];

    const nebulaProbe = NebuGaugeSense();
    const spanNovaW = nebulaProbe.width;
    const spanNovaH = nebulaProbe.height;

    const advanceOrbPhase = async () => {
        if (orbPhase < orbSlideMatrix.length - 1) {
            setOrbPhase(v => v + 1);
        } else {
            try {
                await AsyncStorage.setItem(ORB_LITE_PASSKEY, 'complete');
            } catch (orbCacheSlip) {
                if (__DEV__) console.warn('NebuliteOrb::onboardWriteFail', orbCacheSlip);
            }
            navStream.replace?.('OravenebuWraponet');
        }
    };

    const activeOrbFrame = orbSlideMatrix[orbPhase];

    const resolveOrbButtonLabel = () => {
        switch (orbPhase) {
            case 0:
                return 'Continue';
            case 1:
                return 'Next';
            case 2:
                return 'Start Playing';
            default:
                return 'Continue';
        }
    };

    return (
        <NovelaShellPane style={{
            width: spanNovaW,
            alignItems: 'center',
            height: spanNovaH,
            justifyContent: 'flex-end',
            flex: 1,
        }}
        >
            <OrbitalRaster
                resizeMode="cover"
                source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/gengrnd.png')}
                style={{
                    width: spanNovaW,
                    left: 0,
                    position: 'absolute',
                    height: spanNovaH,
                    top: 0,
                }}
            />

            <OrbitalRaster
                resizeMode="contain"
                source={activeOrbFrame}
                style={{
                    height: spanNovaH * 0.7,
                    top: spanNovaH * 0.04,
                    alignSelf: 'center',
                    width: spanNovaW * 0.91,
                    position: 'absolute',
                }}
            />

            <PulseTapNode
                onPress={advanceOrbPhase}
                style={{
                    justifyContent: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    bottom: spanNovaH * 0.070534,
                    height: spanNovaH * 0.07,
                    borderRadius: spanNovaW * 0.061,
                    overflow: 'hidden',
                    width: spanNovaW * 0.5,
                }}
                activeOpacity={0.8}
            >
                <Oreovgradnt />
                <GlyphNovaText style={{
                    fontSize: spanNovaH * 0.025,
                    fontStyle: 'italic',
                    color: '#FFFFFF',
                    fontFamily: olitubefontsors.nebuveNuniBlack,
                }}>
                    {resolveOrbButtonLabel()}
                </GlyphNovaText>
            </PulseTapNode>
        </NovelaShellPane>
    );
};

export default NebuNovOrbOnboardingFlux;