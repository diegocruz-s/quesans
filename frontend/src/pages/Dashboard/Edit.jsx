import { useState } from 'react';
import { useEffect } from 'react';
import { BsCardText, BsFilter } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { editQuestion, getQuestionId, loading } from '../../service/service';
import './Edit.css';

const EditQuestion = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        (async () => {
            const questionId = await getQuestionId(id);
            setQuestion(questionId);
        })()
    }, [])

    useEffect(()=>{
        setTitle(question.title);
        setDescription(question.description);
    }, [question])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newQuestion = {
            title, description
        }

        const data = await editQuestion(id, newQuestion);

        navigate('/dashboard');
    }
    return (
        <div className="myquestion">
            <div className="divForm editForm">
                <h1>Alterar pergunta</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label className="labelForm labelTitle">
                        <div className="iconForm iconTitle">
                            <BsCardText />
                        </div>
                        <div className="divInput inputTitle">
                            <input 
                                type="text"
                                placeholder="Título"
                                value={title || ''}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="labelForm labelDescription">
                        <div className="iconForm iconDescription">
                            <BsFilter />
                        </div>
                        <div className="divInput inputDescription">
                            <input 
                                type="text"
                                placeholder="Descrição"
                                value={description || ''}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <div className="divSubmitForm">
                        {loading ? (
                            <input type="submit" value="Aguarde..." disabled className="submitUpdateForm" />
                        ) : (
                            <input type="submit" value="Atualizar" className="submitUpdateForm" />
                        )}

                    </div>
                </form>
            </div>
        </div>
         
    )

}

export default EditQuestion;