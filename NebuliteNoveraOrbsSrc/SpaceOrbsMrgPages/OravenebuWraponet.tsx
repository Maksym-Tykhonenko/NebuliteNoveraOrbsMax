import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View as SenViewack,
    Dimensions as TubesDimens,
    Image as MultextnseImg,
    SafeAreaView as FadeGuardShell,
} from 'react-native';

import React, {
    useEffect,
    useState as useSnackLatch,
} from 'react';

type MerkarSnackNode =
    | 'Selecting Background Skins For Game Page'
    | 'Amazing Game of Splitting Orbs'
    | 'Novela Ulita Orbits Mainipg'
    | 'Cosmic Facts of the Universe'
    | 'Exditi Crocy Shoping Page';

import ChooseCisualStyleForTheGame from './ChooseCisualStyleForTheGame';
import JoiningBallsGameite from './JoiningBallsGameite';
import CosmicFacts from './CosmicFacts';
import ShiowngMaindition from './ShiowngMaindition';

import stylesforgame from '../Ulivedata/stylesforgame';


const snackMetrics = TubesDimens.get('window');
const SNACK_H = snackMetrics.height;
const SNACK_W = snackMetrics.width;

const OravenebuWraponet: React.FC = () => {
    const [focusSnack, setFocusSnack] =
        useSnackLatch<MerkarSnackNode>('Novela Ulita Orbits Mainipg');

    const [activeId, setActiveId] = useSnackLatch<number | null>(null);

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

    const merkarContentRouter = (node: MerkarSnackNode) => {
        switch (node) {
            case 'Novela Ulita Orbits Mainipg':
                return (
                    <ShiowngMaindition setFocusNode={setFocusSnack} />
                );
            case 'Cosmic Facts of the Universe':
                return <CosmicFacts setFocusNode={setFocusSnack} />;
            case 'Selecting Background Skins For Game Page':
                return <ChooseCisualStyleForTheGame setFocusNode={setFocusSnack} activeId={activeId} setActiveId={setActiveId} />
            case 'Amazing Game of Splitting Orbs':
                return <JoiningBallsGameite setFocusNode={setFocusSnack} />
            default:
                return null;
        }
    };

    return (
        <SenViewack style={{
            height: SNACK_H,
            backgroundColor: '#3B398F',
            flex: 1,
            width: SNACK_W,
        }}>
            {focusSnack !== 'Selecting Background Skins For Game Page' && (
                <MultextnseImg
                    style={{
                        height: SNACK_H,
                        resizeMode: 'cover',
                        width: SNACK_W,
                        position: 'absolute',
                    }}
                    source={focusSnack === 'Amazing Game of Splitting Orbs' && activeId !== null
                        ? stylesforgame.find(s => s.id === activeId)?.thisStyle
                        : activeId === null ? stylesforgame[0].thisStyle
                            : require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/gengrnd.png')
                    }
                />
            )}
            <FadeGuardShell />

            {merkarContentRouter(focusSnack)}

        </SenViewack>
    );
};

export default OravenebuWraponet;