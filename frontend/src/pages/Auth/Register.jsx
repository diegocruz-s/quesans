import { useContext, useState } from 'react';
import { BsEnvelopeFill, BsLockFill, BsPersonFill, BsCheckCircle, BsCheckCircleFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';
import { AuthContext } from '../../context/authContext';

const Register = ()=>{
    const [changePass, setChangePass] = useState(false);
    const { register, loadingContext, error } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name, email, password, confirmPassword
        }

        register(newUser);
    }

    const handleChangePass = () => {
        if(changePass){
            setChangePass(false)
        }else{
            setChangePass(true)
        }
    }
    
    return(
        <div className="register">
            <div id="divFormRegister" className="divForm">
                <h1>Cadastrar</h1>
                <form onSubmit={handleSubmit} id="formRegister" className="form">
                    <label className="labelForm labelName">
                        <div className="iconForm iconName">
                            <BsPersonFill />
                        </div>
                        <div className="divInput inputName">
                            <input 
                                type="text"
                                placeholder="Nome"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="labelForm labelEmail">
                        <div className="iconForm iconEmail">
                            <BsEnvelopeFill />
                        </div>
                        <div className="divInput inputEmail">
                            <input 
                                type="email"
                                placeholder="Email"
                                value={email || ''}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="labelForm labelPassword">
                        <div className="iconForm iconPassword">
                            <BsLockFill />
                        </div>
                        <div className="divInput inputPassword">
                            <input 
                                type={`${changePass ? 'text' : 'password'}`}
                                placeholder="Senha"
                                value={password || ''}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className='btnChangePass' type='button' onClick={handleChangePass}>
                                {!changePass ? (
                                    <BsEyeFill className='svgChangePass' style={{color: "#000"}} />
                                ) : (
                                    <BsEyeSlashFill className='svgChangePass' style={{color: "#000"}} />
                                )}                            
                            </button>
                        </div>
                    </label>
                    <label className="labelForm labelPassword">
                        <div className="iconForm iconPassword">
                            {(password !== '' && password === confirmPassword) ? (
                                <BsCheckCircleFill />
                            ) : (
                                <BsCheckCircle />
                            )}
                        </div>
                        <div className="divInput inputPassword">
                            <input 
                                type={`${changePass ? 'text' : 'password'}`}
                                placeholder="Confirmar Senha"
                                value={confirmPassword || ''}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </label>

                    <div className="divSubmitForm">
                        <Link to='/login'>Entrar</Link>
                        <input type="submit" value="Cadastrar" className="submitForm" />
                    </div>
                </form>
                {error && <Message msg={error} type='error' />}
            </div>            
        </div>
    )
}

export default Register;