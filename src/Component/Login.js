import { useEffect, useRef, useState } from "react";
import { useEmailContext } from "../NoteContext";

export function Login({ login }) {
    const email = useEmailContext();
    const emailNode = useRef(null);
    const btnNode = useRef(null);
    const [input, setInput] = useState('');
    const [err, setErr] = useState('');
    const [logging, setLogging] = useState(false);

    useEffect(() => {
        if (email.value !== "") login(true);
    })

    useEffect(() => {
        emailNode.current.focus();
    }, []);

    function handleLogin(login) {
        setLogging(true);
        if (input !== '' && input.indexOf("@") > -1 && input.indexOf(".") > -1) {
            setTimeout(() => {
                email.dispatch({
                    type: 'setEmail',
                    email: input
                });
                login(true);
            }, 3000);
        } else {
            setErr('Invalid email address');
            setLogging(false);
            emailNode.current.focus();
        }

    }

    let disable = logging ? true : '';

    return (
        <section>
            <div className="error">{err}</div>
            <input type='email' ref={emailNode} onChange={() => setInput(emailNode.current.value)} value={input} disabled={disable} placeholder="Enter your email" />
            <button ref={btnNode} disabled={disable} onClick={() => handleLogin(login)}>{logging ? '...' : 'Login'}</button>
        </section>
    );
}