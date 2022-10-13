import { BsPencil, BsEyeFill, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './MyQuestion.css';

const MyQuestion = ({ question, onDeleteQuestion }) => {
    return(
        <div className='myquestion'>
            
            <div className="infoQuestions">
                <p className='title'>{question.title}</p>
                <p className='description'>{question.description}</p>
            </div>

            <div className="actionsQuestion">
                <div className="viewQuestion">
                    <Link to={`/question/${question.id}`}>
                        <BsEyeFill className='dashSvg' />
                    </Link>
                </div>
                <div className="editQuestion">
                    <Link to={`/edit/${question.id}`}>
                        <BsPencil className='dashSvg'  />
                    </Link>
                </div>
                <div className="deleteQuestion">
                    <BsFillTrashFill className='dashSvg' onClick={() => onDeleteQuestion(question.id)} />
                </div>
            </div>
            
        </div>
    )
}

export default MyQuestion;
