import { useEffect } from 'react';
import { useState } from 'react';
import { BsCardText, BsFilter } from 'react-icons/bs';
import { createQuestion, loading, error, getQuentionsUser, deleteQuestion, successUpdate } from '../../service/service';
import './Dashboard.css';
import MyQuestion from './MyQuestion';
import Message from '../../components/Message/Message';

const Dashboard = () => {

    const [questions, setQuestions] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        (async () => {
            const data = await getQuentionsUser();
            setQuestions(data);
        })()
    }, []);

    const handleSubmit = async (e) => {
        setSuccess(false);

        e.preventDefault();
        
        const newQuestion = {
            title, description
        };

        const data = await createQuestion(newQuestion);

        if(data.error){
            return
        }

        setSuccess(data.success);

        setQuestions(prevState => [ ...prevState, data.question ]);

        setTitle('');
        setDescription('');
        
    }

    const handleDelete = async (id) => {
        setSuccess(false);
        const data = await deleteQuestion(id);

        setQuestions(prevState => prevState.filter(question => question.id !== id));

        setSuccess(data.data.success);
    }

    return(
        <div className="dashboard">
            
            <h1>Dashboard</h1>

            <div className="createQuestion">
                <div id="divFormLogin" className="divForm">
                    <h1>Criar pergunta</h1>
                    <form onSubmit={handleSubmit} id="formCreate" className="form">
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
                                <input type="submit" value="Aguarde..." disabled className="submitForm" />
                            ) : (
                                <input type="submit" value="Criar" className="submitForm" />
                            )}

                        </div>
                    </form> 
                    {error && <Message msg={error} type='error' />}
                </div>  
            </div>
            {success && <Message msg={success} type='success' />}
            {successUpdate && <Message msg={successUpdate} type='success' />}

            <div className="allMyQuestions">
                {(questions && questions.length > 0) ? (
                    <div className="myquestions">
                        {questions.map(question => <MyQuestion question={question} onDeleteQuestion={handleDelete} key={question.id} />)}
                    </div>
                ) : (
                    <p className='noquestions'>Você não fez nenhuma pergunta...</p>
                )}
            </div>

        </div>
    )
}

export default Dashboard;