import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Oreovgradnt: React.FC = () => (
    <LinearGradient
        colors={['#00F2FE', '#0076FE']}
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
    />
);

export default Oreovgradnt;
