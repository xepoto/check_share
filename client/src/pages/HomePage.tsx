import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import Snackbar from '../components/Snackbar';

interface ChecklistItem {
    label: string;
}

const HomePage: React.FC = () => {
    const [checkboxes, setCheckboxes] = useState<ChecklistItem[]>([]);
    const [title, setTitle] = useState('');
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

    const addCheckbox = () => {
        setCheckboxes([...checkboxes, { label: '' }]);
    };

    const updateLabel = (index: number, newLabel: string) => {
        const updatedCheckboxes = checkboxes.map((checkbox, idx) =>
            idx === index ? { ...checkbox, label: newLabel } : checkbox
        );
        setCheckboxes(updatedCheckboxes);
    };

    const removeCheckbox = (index: number) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes.splice(index, 1);
        setCheckboxes(newCheckboxes);

        setSnackbar({
            show: true,
            message: 'Item removido',
            type: 'info'
        });
    };

    const saveChecklist = async () => {
        if (checkboxes.length === 0) {
            setSnackbar({
                show: true,
                message: 'Adicione pelo menos um item à checklist',
                type: 'error'
            });
            return;
        }

        const checklist = {
            title,
            items: checkboxes,
        };

        try {
            const response = await fetch('/api/checklists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checklist),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar checklist');
            }

            const data = await response.json();
            setSnackbar({
                show: true,
                message: 'Checklist salva com sucesso!',
                type: 'success'
            });

            // Navega após um breve delay para que o usuário veja a mensagem
            setTimeout(() => {
                navigate(`/${data.id}`);
            }, 1500);
        } catch (error) {
            console.error('Erro:', error);
            setSnackbar({
                show: true,
                message: 'Erro ao salvar checklist',
                type: 'error'
            });
        }
    };

    return (
        <div className="checklist-container">
            <h1 className="checklist-title">Criar Checklist</h1>
            <form className="checklist-form" onSubmit={(e) => {
                e.preventDefault();
                saveChecklist();
            }}>
                <input
                    type="text"
                    className="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Título da Checklist"
                    required
                />
                <button type="submit" className="save-button">Salvar Checklist</button>
            </form>
            <button className="add-item-button" onClick={addCheckbox}>
                Adicionar Item
            </button>
            <div className="checklist-items">
                {checkboxes.map((checkbox, index) => (
                    <div key={index} className="checklist-item">
                        <label>
                            <input type="checkbox" disabled />
                            <input
                                type="text"
                                className="item-text-input"
                                value={checkbox.label}
                                onChange={(e) => updateLabel(index, e.target.value)}
                                placeholder="Digite o texto do item"
                            />
                        </label>
                        <button
                            type="button"
                            className="remove-item-button"
                            onClick={() => removeCheckbox(index)}
                            aria-label="Remover item"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {snackbar.show && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({...snackbar, show: false})}
                />
            )}
        </div>
    );
};

export default HomePage;