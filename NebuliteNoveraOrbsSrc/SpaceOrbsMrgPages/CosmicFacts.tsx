import cosmicfctsall from '../Ulivedata/cosmicfctsall';
import { olitubefontsors } from '../olitubefontsors';
import React, { useState } from 'react';
import {
    Image as Noveimagelite,
    Share,
    View as OrberaBoxaor,
    Text as Ulitext,
    Dimensions as Arevension,
    TouchableOpacity as Orfactschablecity,
} from 'react-native';

export default function CosmicFacts({
    setFocusNode
}: {
    setFocusNode: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { width: W, height: H } = Arevension.get('window');
    const [factIdx, setFactIdx] = useState(0);

    const cardW = W * 0.88;
    const cardH = H * 0.26;
    const cardPad = W * 0.06;
    const cardRad = W * 0.06;
    const starSize = W * 0.11;
    const btnSize = W * 0.13;
    const btnRad = btnSize / 2;
    const btnPad = W * 0.04;
    const exitW = W * 0.19;
    const exitH = H * 0.045;
    const exitRad = W * 0.025;
    const exitFont = W * 0.045;
    const nextFont = W * 0.055;
    const titleFont = W * 0.055;
    const factFont = W * 0.042;

    const onPrev = () => setFactIdx(i => (i === 0 ? cosmicfctsall.length - 1 : i - 1));
    const onNext = () => setFactIdx(i => (i === cosmicfctsall.length - 1 ? 0 : i + 1));

    return (
        <OrberaBoxaor style={{
            paddingTop: H * 0.025,
            backgroundColor: 'transparent',
            flex: 1,
            alignItems: 'center',
        }}>
            {/* Exit Button */}
            <Orfactschablecity
                onPress={() => setFocusNode('Novela Ulita Orbits Mainipg')}
                style={{
                    borderRadius: exitRad,
                    width: exitW,
                    right: W * 0.045,
                    position: 'absolute',
                    top: H * 0.035,
                    height: exitH,
                    borderWidth: W * 0.004,
                    alignItems: 'center',
                    backgroundColor: '#A393DD',
                    zIndex: 10,
                    borderColor: '#553089',
                    justifyContent: 'center',
                }}
                activeOpacity={0.7}
            >
                <Ulitext style={{
                    letterSpacing: 1,
                    color: '#120043',
                    fontSize: exitFont,
                    fontWeight: 'bold',
                }}>EXIT</Ulitext>
            </Orfactschablecity>

            {/* Cosmic Facts Image */}
            <Noveimagelite
                style={{
                    marginBottom: H * 0.03,
                    height: W * 0.57,
                    marginTop: H * 0.1,
                    width: W * 0.57,
                }}
                resizeMode="contain"
                source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/cosmcOrbs.png')}
            />

            {/* Fact Card */}
            <OrberaBoxaor style={{
                shadowColor: '#000',
                minHeight: cardH,
                width: cardW,
                backgroundColor: '#220189',
                borderRadius: cardRad,
                shadowOffset: { width: 0, height: 4 },
                borderColor: '#C52CFE',
                padding: cardPad,
                alignItems: 'center',
                shadowOpacity: 0.18,
                elevation: 8,
                shadowRadius: 8,
                borderWidth: W * 0.007,
            }}>
                {/* Star Icon */}
                <Noveimagelite
                    source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/bluzirka.png')}
                    style={{
                        width: starSize,
                        height: starSize,
                        marginBottom: H * 0.012,
                    }}
                    resizeMode="contain"
                />
                {/* Title */}
                <Ulitext style={{
                    textAlign: 'center',
                    color: '#FFBFFE',
                    marginBottom: H * 0.012,
                    fontSize: titleFont,
                    fontFamily: olitubefontsors.nebuveNuniBold,
                }}>
                    {cosmicfctsall[factIdx].title}
                </Ulitext>
                {/* Fact */}
                <Ulitext style={{
                    lineHeight: factFont * 1.32,
                    fontFamily: olitubefontsors.nebuveNuniBold,
                    textAlign: 'center',
                    fontSize: factFont,
                    color: '#E1D8FF',
                }}>
                    {cosmicfctsall[factIdx].fact}
                </Ulitext>
            </OrberaBoxaor>

            {/* Navigation Buttons */}
            <OrberaBoxaor style={{
                marginTop: H * 0.03,
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                {/* Prev */}
                <Orfactschablecity
                    onPress={onPrev}
                    style={{
                        borderRadius: btnRad,
                        height: btnSize,
                        marginRight: btnPad,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: btnSize,
                    }}
                    activeOpacity={0.7}
                >
                    <Noveimagelite
                        style={{
                            width: btnSize,
                            height: btnSize,
                        }}
                        source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/arrow-left-btn.png')}
                        resizeMode="contain"
                    />
                </Orfactschablecity>
                {/* Next Button */}
                <Orfactschablecity
                    onPress={onNext}
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#5147DD',
                        paddingHorizontal: W * 0.13,
                        shadowOffset: { width: 0, height: 2 },
                        height: btnSize * 0.93,
                        alignItems: 'center',
                        marginHorizontal: btnPad,
                        shadowColor: '#000',
                        shadowOpacity: 0.18,
                        elevation: 4,
                        shadowRadius: 4,
                        borderRadius: W * 0.043,
                    }}
                    activeOpacity={0.8}
                >
                    <Ulitext style={{
                        color: '#fff',
                        fontSize: nextFont,
                        fontStyle: 'italic',
                        fontFamily: olitubefontsors.nebuveNuniBlack,
                        letterSpacing: 1,
                    }}>Next</Ulitext>
                </Orfactschablecity>
                {/* Share */}
                <Orfactschablecity
                    style={{
                        marginLeft: btnPad,
                        width: btnSize,
                        alignItems: 'center',
                        borderRadius: btnRad,
                        height: btnSize,
                        justifyContent: 'center',
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                        Share.share({
                            message: `${cosmicfctsall[factIdx].title}\n\n${cosmicfctsall[factIdx].fact}\n\nShared via Cosmic Orbs Merge App!`,
                        });
                    }}
                >
                    <Noveimagelite source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/share-btn.png')} style={{
                            height: btnSize,
                            width: btnSize,
                        }} resizeMode="contain"
                    />
                </Orfactschablecity>
            </OrberaBoxaor>
        </OrberaBoxaor>
    );
}