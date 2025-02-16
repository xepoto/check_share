import React, {useEffect, useState, ChangeEvent} from 'react';
import {useParams} from 'react-router-dom';
import "./ChecklistComp.scss";

interface ChecklistItem {
    label: string;
}

interface Checklist {
    id: string;
    title: string;
    items: ChecklistItem[];
}

interface ChecklistProps {
    checkBoxChange: (checked: boolean) => void;
}

const ChecklistComp: React.FC<ChecklistProps> = ({ checkBoxChange }) => {
    const {id} = useParams<{ id: string }>(); // Pega o ID da URL
    const [checklist, setChecklist] = useState<Checklist | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        checkBoxChange(event.target.checked);
    };

    useEffect(() => {
        // Busca a checklist do backend
        const fetchChecklist = async () => {
            try {
                const response = await fetch(`/api/checklists/${id}`);
                if (!response.ok) {
                    throw new Error('Checklist não encontrada');
                }
                const data = await response.json();
                setChecklist(data);
            } catch (error) {
                console.error('Erro ao buscar checklist:', error);
            }
        };

        fetchChecklist();
    }, [id]);

    if (!checklist) {
        return <div>Carregando...</div>;
    }

    //const totalChecks = checklist.items.length;

    return (
        <div className={'checklistContainer'}>
            <h1>{checklist.title}</h1>
            {checklist.items.map((item, index) => (
                <div key={index}>

                    <label>
                        <input
                            type="checkbox"
                            id={item.label + index}
                            onChange={handleChange}
                            readOnly
                        />
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ChecklistComp;