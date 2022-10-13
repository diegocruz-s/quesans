import './Home.css';
import { useState } from "react";
import { useEffect } from "react";
import { getAllQuestions } from "../../service/service";
import Question from "./Question";

const Home = ()=>{

    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        (async () => {
            const datas = await getAllQuestions();

            setQuestions(datas);
        })();

    }, [])

    return(
        <div className="home">
            <h1>Perguntas</h1>
            {(questions && questions.length > 0) ? (
                <div className="allQuestions">
                    {questions.map((question) => <Question key={question.id} question={question} />)}
                </div>
            ) : (
                <p className='noquestions'>Sem perguntas...</p>
            )}
            
        </div>
    )
}

export default Home;