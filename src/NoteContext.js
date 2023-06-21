import { createContext, useContext, useReducer } from "react";

const EmailContext = createContext(null);

function emailReducer(email, action) {
    switch (action.type) {
        case 'setEmail': {
            return action.email;
        } case 'logout': {
            return '';
        } default: {
            if (process.env.NODE_ENV === 'development') console.log('Invalid email action.type');
            return email;
        }
    }
}

export function NoteState({ children }) {
    const [email, emailDispatch] = useReducer(emailReducer, '');

    return (
        <EmailContext.Provider value={{ value: email, dispatch: emailDispatch }}>
            {children}
        </EmailContext.Provider>
    );
}

export function useEmailContext() {
    return useContext(EmailContext);
}