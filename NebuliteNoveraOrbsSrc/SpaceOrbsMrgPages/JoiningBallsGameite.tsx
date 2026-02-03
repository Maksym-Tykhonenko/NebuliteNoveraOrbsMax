import AsyncStorage from '@react-native-async-storage/async-storage';
interface Ball {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    level: number; // 1-4
    radius: number;
}
import {
    Dimensions as Verbsions,
    Text,
    Image as Overbsimage,
    View as Nebubox,
    TouchableOpacity as BallgameTach,
    Share,
} from 'react-native';

import React, { useState, useEffect, useRef } from 'react';
import { olitubefontsors } from '../olitubefontsors';
const BALL_IMAGES = [
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls/verySmall.png'), // level 1
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls/goldall.png'), // level 1
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls/blackballs.png'), // level 1
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls/pirpsmall.png'), // level 1
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls//yellbigger.png'), // level 2
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls//greenMiddle.png'), // level 3
    require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/balls//pinkTheBiggest.png'), // level 4
];

const GRAVITY = 0.5;
const BOUNCE = 0.4;
const FRICTION = 0.98;

export default function JoiningBallsGameite({
    setFocusNode
}: {
    setFocusNode: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { width: widorbs, height: heitorbs } = Verbsions.get('window');

    const exitW = widorbs * 0.19;
    const exitH = heitorbs * 0.045;
    const exitRad = widorbs * 0.025;
    const exitFont = widorbs * 0.045;

    const gameAreaTop = heitorbs * 0.15;
    const gameAreaBottom = heitorbs * 0.88;
    const platformHeight = heitorbs * 0.06;
    const gameAreaHeight = gameAreaBottom - gameAreaTop - platformHeight;
    const boundaryY = gameAreaTop + gameAreaHeight * 0.08;

    const [balls, setBalls] = useState<Ball[]>([]);
    const [currentBall, setCurrentBall] = useState<{ level: number; x: number } | null>(null);
    const [currentX, setCurrentX] = useState(widorbs / 2);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
    const ballIdCounter = useRef(0);
    const animationFrame = useRef<number>();
    const gameAreaRef = useRef<Nebubox>(null);
    const [gameAreaLayout, setGameAreaLayout] = useState({ x: 0, y: 0 });

    useEffect(() => {
        loadBestScore();
        generateNewBall();
    }, []);

    // Timer countdown effect
    useEffect(() => {
        if (!gameOver && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setGameOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [gameOver, timeRemaining]);

    useEffect(() => {
        if (!gameOver) {
            animationFrame.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [balls, gameOver]);

    const loadBestScore = async () => {
        try {
            const stored = await AsyncStorage.getItem('bestScore');
            if (stored) setBestScore(parseInt(stored, 10));
        } catch (e) { }
    };

    const saveBestScore = async (newScore: number) => {
        try {
            await AsyncStorage.setItem('bestScore', newScore.toString());
        } catch (e) { }
    };

    const getBallRadius = (level: number) => {
        const baseRadius = widorbs * 0.035;
        return baseRadius * (1 + (level - 1) * 0.35);
    };

    const generateNewBall = () => {
        const level = Math.floor(Math.random() * 3) + 1;
        setCurrentBall({ level, x: widorbs / 2 });
        setCurrentX(widorbs / 2);
    };

    const dropBall = () => {
        if (!currentBall || gameOver) return;

        const newBall: Ball = {
            id: ballIdCounter.current++,
            x: currentX,
            y: gameAreaTop + getBallRadius(currentBall.level) + gameAreaHeight * 0.1, // Start below boundary
            vx: 0,
            vy: 0,
            level: currentBall.level,
            radius: getBallRadius(currentBall.level),
        };

        setBalls(prev => [...prev, newBall]);
        setCurrentBall(null);
        setTimeout(() => {
            if (!gameOver) generateNewBall();
        }, 800);
    };

    const gameLoop = () => {
        setBalls(prevBalls => {
            let newBalls = [...prevBalls];

            // Physics update
            newBalls = newBalls.map(ball => {
                let { x, y, vx, vy } = ball;

                vy += GRAVITY;
                x += vx;
                y += vy;

                // Floor collision (platform)
                const floorY = gameAreaBottom - platformHeight;
                if (y + ball.radius > floorY) {
                    y = floorY - ball.radius;
                    vy = -vy * BOUNCE;
                    vx *= FRICTION;

                    // Stop if velocity is too small
                    if (Math.abs(vy) < 0.5) {
                        vy = 0;
                    }
                    if (Math.abs(vx) < 0.3) {
                        vx = 0;
                    }
                }

                // Wall collisions
                if (x - ball.radius < 0) {
                    x = ball.radius;
                    vx = -vx * BOUNCE;
                }
                if (x + ball.radius > widorbs) {
                    x = widorbs - ball.radius;
                    vx = -vx * BOUNCE;
                }

                return { ...ball, x, y, vx, vy };
            });

            // Ball-to-ball collisions
            const merged: Set<number> = new Set();
            const toAdd: Ball[] = [];

            for (let i = 0; i < newBalls.length; i++) {
                if (merged.has(newBalls[i].id)) continue;

                for (let j = i + 1; j < newBalls.length; j++) {
                    if (merged.has(newBalls[j].id)) continue;

                    const ball1 = newBalls[i];
                    const ball2 = newBalls[j];
                    const dx = ball2.x - ball1.x;
                    const dy = ball2.y - ball1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = ball1.radius + ball2.radius;

                    if (distance < minDist) {
                        // Collision detected
                        if (ball1.level === ball2.level) {
                            // Same level - merge or destroy
                            if (ball1.level < 7) {
                                // Merge to next level
                                const newLevel = ball1.level + 1;
                                const newBall: Ball = {
                                    id: ballIdCounter.current++,
                                    x: (ball1.x + ball2.x) / 2,
                                    y: (ball1.y + ball2.y) / 2,
                                    vx: (ball1.vx + ball2.vx) / 2,
                                    vy: (ball1.vy + ball2.vy) / 2 * 0.5,
                                    level: newLevel,
                                    radius: getBallRadius(newLevel),
                                };
                                toAdd.push(newBall);
                                setScore(s => s + newLevel * 10);
                            } else {
                                // Level 4 - destroy both
                                setScore(s => s + ball1.level * 20);
                            }
                            merged.add(ball1.id);
                            merged.add(ball2.id);
                        } else {
                            // Different levels - elastic collision
                            const angle = Math.atan2(dy, dx);
                            const targetX = ball1.x + Math.cos(angle) * minDist;
                            const targetY = ball1.y + Math.sin(angle) * minDist;

                            const ax = (targetX - ball2.x) * 0.5;
                            const ay = (targetY - ball2.y) * 0.5;

                            const vx1 = ball1.vx - ax;
                            const vy1 = ball1.vy - ay;
                            const vx2 = ball2.vx + ax;
                            const vy2 = ball2.vy + ay;

                            newBalls[i] = { ...ball1, vx: vx1, vy: vy1 };
                            newBalls[j] = { ...ball2, vx: vx2, vy: vy2 };
                        }
                    }
                }
            }

            // Remove merged balls and add new ones
            newBalls = [...newBalls.filter(b => !merged.has(b.id)), ...toAdd];

            // Check game over
            for (const ball of newBalls) {
                if (ball.y - ball.radius < boundaryY) {
                    setGameOver(true);
                    break;
                }
            }

            return newBalls;
        });

        if (!gameOver) {
            animationFrame.current = requestAnimationFrame(gameLoop);
        }
    };

    useEffect(() => {
        if (gameOver && score > bestScore) {
            setBestScore(score);
            saveBestScore(score);
        }
    }, [gameOver]);

    const handleTouchStart = (evt: any) => {
        if (!currentBall || gameOver) return;
        setIsDragging(true);
        const touchX = evt.nativeEvent.locationX; // Use locationX instead of pageX
        const radius = getBallRadius(currentBall.level);
        const newX = Math.max(radius, Math.min(widorbs - radius, touchX));
        setCurrentX(newX);
    };

    const handleTouchMove = (evt: any) => {
        if (!currentBall || gameOver || !isDragging) return;
        const touchX = evt.nativeEvent.locationX; // Use locationX instead of pageX
        const radius = getBallRadius(currentBall.level);
        const newX = Math.max(radius, Math.min(widorbs - radius, touchX));
        setCurrentX(newX);
    };

    const handleTouchEnd = () => {
        if (!currentBall || gameOver) return;
        setIsDragging(false);
        dropBall();
    };

    const resetGame = () => {
        setBalls([]);
        setScore(0);
        setGameOver(false);
        setTimeRemaining(120); // Reset timer to 2 minutes
        ballIdCounter.current = 0;
        setCurrentBall(null);
        generateNewBall();
    };

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Nebubox style={{
            backgroundColor: 'transparent',
            paddingTop: heitorbs * 0.025,
            flex: 1,
            alignItems: 'center',
        }}>
            {/* Score Display */}
            <Nebubox style={{
                backgroundColor: '#A393DD',
                paddingVertical: heitorbs * 0.01,
                alignSelf: 'center',
                flexDirection: 'row',
                position: 'absolute',
                top: heitorbs * 0.035,
                alignItems: 'center',
                paddingHorizontal: widorbs * 0.04,
                zIndex: 10,
                borderWidth: widorbs * 0.004,
                borderRadius: exitRad,
                borderColor: '#553089',
                width: widorbs * 0.3,
                justifyContent: 'center',
            }}>
                <Overbsimage
                    source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/solar_cup-bold.png')}
                    style={{
                        width: widorbs * 0.05,
                        height: widorbs * 0.05,
                        marginRight: widorbs * 0.025,
                    }}
                    resizeMode="stretch"
                />
                <Text style={{
                    fontWeight: 'bold',
                    color: '#120043',
                    fontSize: exitFont,
                }}>{score}</Text>
            </Nebubox>

            {/* Timer Display */}
            <Nebubox style={{
                backgroundColor: timeRemaining <= 10 ? '#FF6B35' : '#A393DD',
                paddingVertical: heitorbs * 0.01,
                alignSelf: 'center',
                flexDirection: 'row',
                position: 'absolute',
                top: heitorbs * 0.035,
                alignItems: 'center',
                paddingHorizontal: widorbs * 0.04,
                zIndex: 10,
                borderWidth: widorbs * 0.004,
                borderRadius: exitRad,
                borderColor: '#553089',
                left: widorbs * 0.045,
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#120043',
                    fontSize: exitFont,
                }}>{formatTime(timeRemaining)}</Text>
            </Nebubox>

            {/* Exit Button */}
            <BallgameTach
                onPress={() => setFocusNode('Novela Ulita Orbits Mainipg')}
                style={{
                    position: 'absolute',
                    height: exitH,
                    top: heitorbs * 0.035,
                    width: exitW,
                    borderRadius: exitRad,
                    backgroundColor: '#A393DD',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: widorbs * 0.004,
                    zIndex: 10,
                    borderColor: '#553089',
                    right: widorbs * 0.045,
                }}
                activeOpacity={0.7}
            >
                <Text style={{
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    fontSize: exitFont,
                    color: '#120043',
                }}>EXIT</Text>
            </BallgameTach>

            {/* Game Area */}
            <Nebubox
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    setGameAreaLayout({ x: layout.x, y: layout.y });
                }}
                onResponderMove={handleTouchMove}
                ref={gameAreaRef}
                onResponderGrant={handleTouchStart}
                onMoveShouldSetResponder={() => !gameOver && !!currentBall}
                onStartShouldSetResponder={() => !gameOver && !!currentBall}
                onResponderRelease={handleTouchEnd}
                style={{
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: gameAreaTop,
                    height: gameAreaHeight + platformHeight,
                    zIndex: 1
                }}
            >
                {/* Boundary Line */}
                <Nebubox pointerEvents="none" style={{
                    backgroundColor: '#FF6B35',
                    left: 0,
                    right: 0,
                    height: widorbs * 0.006,
                    top: boundaryY - gameAreaTop,
                    opacity: 0.8,
                    position: 'absolute',
                }} />

                {/* Trajectory Line */}
                {currentBall && !gameOver && (
                    <Nebubox
                        pointerEvents="none"
                        style={{
                            height: gameAreaHeight,
                            width: widorbs * 0.003,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            position: 'absolute',
                            top: getBallRadius(currentBall.level) * 2 + gameAreaHeight * 0.1,
                            left: currentX - widorbs * 0.0015,
                        }}
                    />
                )}

                {/* Current Ball */}
                {currentBall && !gameOver && (
                    <Overbsimage pointerEvents="none"
                        style={{
                            top: gameAreaHeight * 0.1,
                            position: 'absolute',
                            height: getBallRadius(currentBall.level) * 2,
                            width: getBallRadius(currentBall.level) * 2,
                            left: currentX - getBallRadius(currentBall.level),
                        }}
                        source={BALL_IMAGES[currentBall.level - 1]}
                        resizeMode="contain"
                    />
                )}

                {/* Dropped Balls */}
                {balls.map(ball => (
                    <Overbsimage
                        key={ball.id}
                        pointerEvents="none"
                        source={BALL_IMAGES[ball.level - 1]}
                        style={{
                            position: 'absolute',
                            width: ball.radius * 2,
                            height: ball.radius * 2,
                            left: ball.x - ball.radius,
                            top: ball.y - gameAreaTop - ball.radius,
                            zIndex: 1,
                        }}
                        resizeMode="contain"
                    />
                ))}
                {/* Platform - strictly по фізичній платформі */}
                <Overbsimage
                    source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/platform.png')}
                    style={{
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        height: platformHeight,
                        bottom: 0,
                        zIndex: 2,
                    }}
                    resizeMode="stretch"
                />
            </Nebubox>

            {/* Game Over Overlay */}
            {gameOver && (
                <Nebubox style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100,
                }}>
                    {/* Game Over Background */}
                    <Overbsimage
                        source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/gengrnd.png')}
                        style={{
                            width: widorbs,
                            height: heitorbs,
                            position: 'absolute',
                        }}
                        resizeMode="cover"
                    />
                    <Overbsimage
                        source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/points.png')}
                        style={{
                            width: widorbs * 0.65,
                            height: heitorbs * 0.25,
                        }}
                        resizeMode="contain"
                    />

                    <Nebubox style={{
                        width: widorbs * 0.85,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: heitorbs * 0.04,
                        backgroundColor: '#220189',
                        borderRadius: widorbs * 0.05,
                        borderWidth: widorbs * 0.01,
                        borderColor: '#C52CFE',

                    }}>
                        {/* Game Over Title Image */}
                        <Overbsimage
                            source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/gameover.png')}
                            style={{
                                width: widorbs * 0.65,
                                height: heitorbs * 0.08,
                            }}
                            resizeMode="contain"
                        />

                        {/* Score Container with Image Background */}
                        <Nebubox style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: heitorbs * 0.02,
                        }}>
                            <Nebubox style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: heitorbs * 0.01,
                                backgroundColor: '#AA96EA',
                                borderRadius: widorbs * 0.03,
                                borderWidth: widorbs * 0.004,
                                borderColor: '#553089',
                                padding: widorbs * 0.04,
                                width: widorbs * 0.4,
                            }}>
                                <Text style={{
                                    fontSize: widorbs * 0.05,
                                    color: '#000000',
                                    textAlign: 'center',
                                    fontFamily: olitubefontsors.nebuveNuniBold,
                                    marginBottom: heitorbs * 0.005,
                                }}>Your result: {'\n'}{score}</Text>
                                <Overbsimage
                                    source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/bluzirka.png')}
                                    style={{
                                        width: widorbs * 0.08,
                                        height: widorbs * 0.08,
                                    }}
                                    resizeMode="contain"
                                />
                            </Nebubox>
                        </Nebubox>

                        {/* Description Text */}
                        <Text style={{
                            fontSize: widorbs * 0.059,
                            color: '#FFBFFE',
                            fontFamily: olitubefontsors.nebuveNuniBold,
                            textAlign: 'center',
                            marginBottom: heitorbs * 0.01,
                        }}>The stack crossed the limit.</Text>
                    </Nebubox>
                    {/* Buttons Container */}
                    <Nebubox style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: widorbs * 0.04,
                        marginTop: heitorbs * 0.021,
                    }}>
                        {/* Home Button */}
                        <BallgameTach
                            onPress={() => setFocusNode('Novela Ulita Orbits Mainipg')}
                            activeOpacity={0.8}
                        >
                            <Overbsimage
                                source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/back-to-back-btn.png')}
                                style={{
                                    width: widorbs * 0.14,
                                    height: widorbs * 0.14,
                                }}
                                resizeMode="contain"
                            />
                        </BallgameTach>

                        {/* Retry Button */}
                        <BallgameTach
                            onPress={resetGame}
                            style={{
                                elevation: 4,
                                backgroundColor: '#5147DD',
                                alignItems: 'center',
                                borderRadius: widorbs * 0.043,
                                height: heitorbs * 0.05,
                                justifyContent: 'center',
                                shadowRadius: 4,
                                paddingHorizontal: widorbs * 0.13,
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                color: '#fff',
                                fontFamily: olitubefontsors.nebuveNuniBlack,
                                fontSize: widorbs * 0.05,
                                fontStyle: 'italic',
                                letterSpacing: 1,
                            }}>Retry</Text>
                        </BallgameTach>

                        {/* Share Button */}
                        <BallgameTach
                            onPress={() => {
                                Share.share({
                                    message: `I scored ${score} points in the Joining Balls Game! Can you beat my score? Download the Cosmic Orbs Merge App now!`,
                                })
                            }}
                            activeOpacity={0.8}
                        >
                            <Overbsimage
                                source={require('../NebuliteNoveraOrbsAssets/OvenulSpceImgaagesr/share-btn.png')}
                                style={{
                                    width: widorbs * 0.14,
                                    height: widorbs * 0.14,
                                }}
                                resizeMode="contain"
                            />
                        </BallgameTach>
                    </Nebubox>
                </Nebubox>
            )}
        </Nebubox>
    );
}