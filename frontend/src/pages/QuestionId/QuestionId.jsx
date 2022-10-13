import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createAnswer, getQuestionId, loading } from '../../service/service';
import { BsCardList } from 'react-icons/bs';
import './QuestionId.css';
import Message from '../../components/Message/Message';

const QuestionId = ()=>{

    const { id } = useParams();
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState('');
    const [text, setText] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        (async () => {
            const data = await getQuestionId(id);
            setQuestion(data);
            setAnswers(data.Answers);
        })()
    }, [id]);

    const handleSubmit = async (e) => {
        setSuccess(false);
        e.preventDefault();
        const comment = { text }

        const res = await createAnswer(id, comment);
        
        setAnswers((prevAnswers => [...prevAnswers, res.answer]));
        setSuccess(res.success);

        setText('');
    }

    return(
        <div className="questionId">
            {question ? (
                <div className="optionsQuestion">
                    <div className="datasQuestion">
                        <div className="textsQuestion">
                            <p className='titleQuestion'>{question.title}</p>
                            <p className='descQuestion'>{question.description}</p>
                        </div>
                    </div>

                    <div className="divForm createQuestion">
                        <h1>Responder</h1>
                        <form onSubmit={handleSubmit} id="formLogin" className="form">
                            <label className="labelForm labelText">
                                <div className="iconForm iconText">
                                    <BsCardList />
                                </div>
                                <div className="divInput inputText">
                                    <input 
                                        type="text"
                                        placeholder="Comentário"
                                        value={text || ''}
                                        onChange={(e) => setText(e.target.value)}
                                        required
                                    />
                                </div>
                            </label>

                            <div className="divSubmitForm">
                                {loading ? (
                                    <input type="submit" value="Aguarde..." disabled className="submitForm" />
                                ) : (
                                    <input type="submit" value="Responder" className="submitForm" />
                                )}
                            </div>
                        </form>
                    </div>

                    {success && <Message msg={success} type='success' />}

                    <div className="answerQuestion">
                        {answers.length > 0 ? (
                            <>
                                {answers.map((answer) => (
                                    <div className="answer" key={answer.id + Date.now()}>
                                        <p className='nameAnswer'>{answer.userName}</p>
                                        <p className='comment'>
                                            <span className='barComment'>|</span>
                                            <span>{answer.text}</span>
                                        </p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className='noanswer'>Sem respostas...</p>
                        )}
                    </div>
                    
                </div>
            ) : (
                <p>Pergunta não encontrada...</p>
            )}
        </div>
    )
}

export default QuestionId;