import React from 'react';
import {useRive} from '@rive-app/react-canvas';

interface AnimationProps {
    animationDisplay: boolean,
    onClick: () => void,
}

const AnimationOverlay: React.FC<AnimationProps> = ({ animationDisplay, onClick } ) => {

    const {RiveComponent} = useRive({
        src: '/chick.riv', // Caminho para o arquivo Rive
        autoplay: true,
    });

    return (
        <div className={'animation'}
             style={{
                 position: 'fixed',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '100%',
                 display: animationDisplay ? 'flex' : 'none',
                 justifyContent: 'center',
                 alignItems: 'center',
                 backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
                 zIndex: 1000, // Garante que a animação fique acima de tudo
             }}
             onClick={onClick}
        >
            <RiveComponent style={{width: '300px', height: '300px'}}/>
        </div>
    );
};

export default AnimationOverlay;