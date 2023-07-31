import { createContext, useContext, useReducer, useRef, useState } from "react";

const initNotes = [
    {
        id: 1,
        title: 'Introductory note.',
        content: "Welcome to our cutting-edge WebNote Application – A versatile and intuitive digital tool to create, organize, and manage your notes efficiently.\nUltimate digital companion for seamless note-taking and organization. Whether you're a student, professional, or just someone who loves to jot down thoughts on the go, our user- friendly platform empowers you to capture ideas, create to -do lists, and collaborate effortlessly with others.\nWith intuitive features  and awesome interface, staying organized and productive has never been this easy.Say goodbye to traditional notepads and embrace the future of note - taking with our innovative WebNote Application!\nThis application offers a wide range of features designed to enhance productivity and convenience.Users can create multiple notebooks, each containing multiple notes, facilitating easy categorization and organization.The ability to customize notebooks with different colors and title to adds a personal touch and aids in quick identification.\nThe notepad application comes equipped with a robust search functionality, allowing users to quickly locate specific notes based on keywords or phrases.This saves time and ensures that important information is readily accessible whenever needed./ nOverall, the notepad application is a powerful and feature - rich digital companion that simplifies the note - taking process and helps users stay organized and productive.Whether for personal use, academic purposes, or professional tasks, it serves as a reliable and indispensable tool for capturing and managing information effectively.\n\n© Webnesis product.",
        category: 0,
        pinned: true,
        theme: 13
    },
    {
        id: 2,
        title: 'About us',
        content: "Dear Valued Users,\n\nWe are thrilled to welcome you to the world of web note-taking with our dedicated developer team at Webnesis! We understand the importance of effective and efficient note-taking in today's fast-paced digital world, and that's why we have crafted a cutting-edge web note-taking application to cater to all your needs.\n\nOur team is comprised of passionate developers who have poured their expertise into creating a seamless and intuitive platform that will enhance your productivity and organization. With an eye for detail and a commitment to excellence, we strive to deliver a top-notch user experience that goes beyond your expectations.\n\nWhether you're a student looking to stay on top of your coursework, a professional aiming to optimize your work processes, or simply someone who loves jotting down thoughts and ideas, our web note application has been designed with you in mind.\n\nWe pride ourselves on being responsive to user feedback, constantly working on improvements and new features to stay ahead of the curve. We value your input and are eager to hear your thoughts and suggestions as we continue to refine and expand our service.\n\nFeel free to reach out to us if you encounter any issues, have questions, or want to share your experiences. Our team is here to assist you every step of the way, ensuring that your web note-taking journey is nothing short of exceptional.\n\nThank you for choosing our web note application. Together, let's unlock the power of organized thinking and take note-taking to new heights!\n\nBest regards,\n\nZacchaeus.\nDeveloper\n\n\nPhone: +2348135994222\nemail: zaladeokin@gmail.com\nwebsite: https://zack.com.ng",
        category: 1,
        pinned: false,
        theme: 10
    }
];

const theme = ['#ffffff', '#aa421f', '#808080', '#314686', '#8a2be2', '#deb887', '#5f9ea0', '#7fff00', '#d2691e', '#6495ed', '#ee82ee', '#dc143c', '#ff69b4', '#ff00ff'];
const initCategory = ['Uncategorized', 'confidenfial']

const EmailContext = createContext(null);
const NotesContext = createContext(null);
const ThemeContext = createContext(theme);
const CategoryContext = createContext(null);
const SelectedNoteContext = createContext(null);
const WritingModeContext = createContext(null);
const FilterContext = createContext(null);
const ShowBarContext = createContext(null);

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
            return notes.filter((note) => note.id !== action.id);
        } default: {
            if (process.env.NODE_ENV === 'development') console.log('Invalid note action.type');
            return notes;
        }
    }
}

function categoryReducer(category, action) {
    let update = [...category];
    switch (action.type) {
        case 'add': {
            return [...category, action.new];
        } case 'delete': {
            return update.filter((cat, ind) => ind !== action.id);
        } default: {
            if (process.env.NODE_ENV === 'development') console.log('Invalid note action.type');
            return category;
        }
    }
}

export function NoteState({ children }) {
    const [email, emailDispatch] = useReducer(emailReducer, '');
    const [allNotes, noteDispatch] = useReducer(noteReducer, initNotes);
    const trackChanges = useRef({ title: '', content: '', category: 0, pinned: false, theme: 0 });
    const [category, categoryDispatch] = useReducer(categoryReducer, initCategory);
    const [id, setId] = useState(null);
    const [writingMode, setWritingMode] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [filterByCat, setFilterByCat] = useState(null);
    const [showBar, setShowBar] = useState({ value: false, type: null });

    return (
        <EmailContext.Provider value={{ value: email, dispatch: emailDispatch }}>
            <NotesContext.Provider value={{ get: allNotes, dispatch: noteDispatch }}>
                <CategoryContext.Provider value={{ get: category, dispatch: categoryDispatch }}>
                    <SelectedNoteContext.Provider value={{ id: id, setId: setId, modify: trackChanges.current }}>
                        <WritingModeContext.Provider value={{ value: writingMode, setMode: setWritingMode }}>
                            <FilterContext.Provider value={{ search: { keyword: searchKey, setKeyword: setSearchKey }, catFilter: { category: filterByCat, setCategory: setFilterByCat } }}>
                                <ShowBarContext.Provider value={{ value: showBar, setValue: setShowBar }}>
                                    {children}
                                </ShowBarContext.Provider>
                            </FilterContext.Provider>
                        </WritingModeContext.Provider>
                    </SelectedNoteContext.Provider>
                </CategoryContext.Provider>
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

export function useThemeContext() {
    return useContext(ThemeContext);
}

export function useCategoryContext() {
    return useContext(CategoryContext);
}

export function useSelectedNoteContext() {
    return useContext(SelectedNoteContext);
}

export function useWritingModeContext() {
    return useContext(WritingModeContext);
}

export function useFilterContext() {
    return useContext(FilterContext);
}

export function useShowBarContext() {
    return useContext(ShowBarContext);
}