import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { BsEnvelopeFill, BsEyeFill, BsLockFill, BsEyeSlashFill } from 'react-icons/bs'
import { useState } from "react";
import { Link } from 'react-router-dom';
import Message from '../../components/Message/Message';

const Login = ()=>{

    const [changePass, setChangePass] = useState(false);
    const { login, loadingContext, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const userLogged = {
            email, password
        }

        login(userLogged);
    }

    const handleChangePass = () => {
        if(changePass){
            setChangePass(false)
        }else{
            setChangePass(true)
        }
    }

    return(
        <div className="login">
            <div id="divFormLogin" className="divForm">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} id="formLogin" className="form">
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

                    <div className="divSubmitForm">
                        <Link to='/register'>Registrar-se</Link>
                        {loadingContext ? (
                            <input type="submit" value="Aguarde..." disabled className="submitForm" />
                        ) : (
                            <input type="submit" value="Entrar" className="submitForm" />
                        )}
                    </div>
                </form>
                {error && <Message msg={error} type='error' />}
            </div>  
        </div>

    )
}

export default Login;