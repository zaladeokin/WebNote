import { createContext, useContext, useReducer, useState } from "react";

const initNotes = [
    {
        id: 1,
        title: 'My first note is here for you do it',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here. I Love writing a lot, web note help me to archive it welll it is goood to have it here \n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n\n\n\n\n\n\n \n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here.',
        category: 'Budget',
        pinned: true
    },
    {
        id: 2,
        title: 'My first note',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here. KB\n\n\n\n\n\n\n\n\n\n\n\n\n kfkkfkgfkg',
        category: 'confidential',
        pinned: false
    },
    {
        id: 3,
        title: 'My clamp',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here.\n I Love writing a lot, web note help me to archive it welll it is goood to have it here. \n I Love writing a lot, web note help me to archive it welll it is goood to have it here. \n jk',
        category: 'Study',
        pinned: false
    },
    {
        id: 4,
        title: 'My first note 1',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here',
        category: 'Meditation',
        pinned: true
    },
    {
        id: 5,
        title: 'My first note 2',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here',
        category: 'devotion',
        pinned: false
    },
    {
        id: 6,
        title: 'My first note 3',
        content: 'I Love writing a lot, web note help me to archive it welll it is goood to have it here',
        category: '',
        pinned: false
    }
];

const EmailContext = createContext(null);
const NotesContext = createContext(null);
const SelectedNoteContext = createContext(null);
const WritingModeContext = createContext(null);

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

function noteReducer(notes, action) {
    let update = [...notes];
    switch (action.type) {
        case 'add': {
            if (action.isNew) return [...notes, action.note];
            else {
                update[action.note.id - 1] = action.note
                return update;
            }
        } case 'pin': {
            return update.map((obj) => {
                let tmpObj = { ...obj }
                if (tmpObj.id === action.id) {
                    tmpObj.pinned = !tmpObj.pinned
                    return tmpObj;
                } else {
                    return obj;
                }
            });
        } case 'delete': {
            return '';
        } default: {
            if (process.env.NODE_ENV === 'development') console.log('Invalid note action.type');
            return notes;
        }
    }
}

export function NoteState({ children }) {
    const [email, emailDispatch] = useReducer(emailReducer, '');
    const [allNotes, noteDispatch] = useReducer(noteReducer, initNotes);
    const [id, setId] = useState(null);
    const [writingMode, setWritingMode] = useState(false);

    return (
        <EmailContext.Provider value={{ value: email, dispatch: emailDispatch }}>
            <NotesContext.Provider value={{ get: allNotes, dispatch: noteDispatch }}>
                <SelectedNoteContext.Provider value={{ id: id, setId: setId, modify: { title: '', content: '', category: '', pinned: false } }}>
                    <WritingModeContext.Provider value={{ value: writingMode, setMode: setWritingMode }}>
                        {children}
                    </WritingModeContext.Provider>
                </SelectedNoteContext.Provider>
            </NotesContext.Provider>
        </EmailContext.Provider>
    );
}

export function useEmailContext() {
    return useContext(EmailContext);
}

export function useNotesContext() {
    return useContext(NotesContext);
}

export function useSelectedNoteContext() {
    return useContext(SelectedNoteContext);
}

export function useWritingModeContext() {
    return useContext(WritingModeContext);
}