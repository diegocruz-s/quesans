import './Question.css';
import { Link } from 'react-router-dom';

const Question = ({ question }) => {
    return(
        <div className="question">
            <p className="titleQuestion">{question.title}</p>
            <p className="nameUserQuestion">
                por: <span>{question.userName}</span>
            </p>
            <Link to={`/question/${question.id}`} className='btnAnswer'>Responder</Link>
        </div>
    )
}

export default Question;