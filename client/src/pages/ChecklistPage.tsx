import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import ChecklistComp from "../components/ChecklistComp.tsx";
import AnimationOverlay from "../components/AnimationOverlay.tsx";

import Snackbar from "../components/Snackbar.tsx";
import './ChecklistPage.scss';


const ChecklistPage: React.FC = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info';
    }>({
        show: false,
        message: '',
        type: 'info'
    });

    const [progress, setProgress] = useState<number>(0);

    const [, setIsChecked] = useState(false);

    const [completed, setCompleted] = useState<boolean>(false);

    const countTotal = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let totalCount = 0;
        checkboxes.forEach(() => {
            totalCount++;
        });
        return totalCount;
    }

    const countChecked = () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let checkedCount = 0;
        checkboxes.forEach((checkedCheckbox) => {
            if ((checkedCheckbox as HTMLInputElement).checked) {
                checkedCount++;
            }
        });
        return checkedCount;
    }

    const handleCheckBoxChange = async (checked: boolean) => {
        setIsChecked(checked);
        setProgress(100 / countTotal() * countChecked());
        if (countTotal() == countChecked()) {
            setCompleted(true);
        }
    };

    // Função para voltar à tela de criação de checklists
    const handleGoBack = () => {
        navigate('/');
    };

    // Função para compartilhar a URL do checklist
    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setSnackbar({
                show: true,
                message: 'URL copiada para a área de transferência!',
                type: 'success'
            });
        }).catch(() => {
            setSnackbar({
                show: true,
                message: 'Erro ao copiar URL',
                type: 'error'
            });
        });
    };

    const handleCloseAnimation = () => {
        setCompleted(false);
    };

    return (
        <div className="checklist-page">
            <progress value={progress} max="100" className={'progressBar'}/>
            <ChecklistComp checkBoxChange={handleCheckBoxChange}/>
            <div className="button-container">
                <button className="button-primary" onClick={handleGoBack}>Criar outro</button>
                <button className="button-secondary" onClick={handleShare}>Compartilhar</button>
            </div>
            {snackbar.show && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({...snackbar, show: false})}
                />

            )}
            <AnimationOverlay animationDisplay={completed} onClick={handleCloseAnimation}  />
        </div>
    );
};

export default ChecklistPage;