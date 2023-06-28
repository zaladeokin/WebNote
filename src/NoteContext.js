import { createContext, useContext, useReducer, useState } from "react";

const initNotes = [
    {
        id: 1,
        title: 'My first note is here for you do it',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here. I Love writing a lot, web note help me to archive it welll it is goood to have it here \n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n\n\n\n\n\n\n \n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.',
        category: 'Budget'
    },
    {
        id: 2,
        title: 'My first note',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here. KB\n\n\n\n\n\n\n\n\n\n\n\n\n kfkkfkgfkg',
        category: 'confidential'
    },
    {
        id: 3,
        title: 'My clamp',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here. \n I Love writing a lot, web note help me to archive it welll it is goood to have it here. \n jk',
        category: 'Study'
    },
    {
        id: 4,
        title: 'My first note 1',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here',
        category: 'Meditation'
    },
    {
        id: 5,
        title: 'My first note 2',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here',
        category: 'devotion'
    },
    {
        id: 6,
        title: 'My first note 3',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here',
        category: ''
    }
];

const EmailContext = createContext(null);
const NoteContext = createContext(initNotes);
const SelectedNoteContext = createContext(null);

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
    const [note, setNote] = useState(null);

    return (
        <EmailContext.Provider value={{ value: email, dispatch: emailDispatch }}>
            <SelectedNoteContext.Provider value={{ id: note, setId: setNote }}>
                {children}
            </SelectedNoteContext.Provider>
        </EmailContext.Provider>
    );
}

export function useEmailContext() {
    return useContext(EmailContext);
}

export function useNoteContext() {
    return useContext(NoteContext);
}

export function useSelectedNoteContext() {
    return useContext(SelectedNoteContext);
}