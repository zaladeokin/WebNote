import { useEffect, useRef, useState } from "react";
import { useCategoryContext, useNotesContext, useSelectedNoteContext, useThemeContext, useWritingModeContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";

export function Note() {
    const ref = useFocusMain();
    const selectedNote = useSelectedNoteContext();
    const allNote = useNotesContext().get;
    const theme = useThemeContext();
    const writingMode = useWritingModeContext();
    const note = allNote.filter((note) => note.id === selectedNote.id)[0];
    const isNew = note === undefined ? true : false;
    const [themeId, setThemeId] = useState(null);
    let initVal = isNew ? selectedNote.modify.theme : note.theme;

    useEffect(() => {
        let id = null;

        if (themeId === null) {
            selectedNote.modify.theme = initVal;
            setThemeId(initVal);
        } else if (!writingMode.value) {
            setThemeId(initVal);
        } else {
            id = setInterval(() => {
                if (themeId !== selectedNote.modify.theme) setThemeId(selectedNote.modify.theme);
            }, 50);
        }

        return () => {
            if (id !== null) clearInterval(id);
        }
    }, [themeId, selectedNote.modify, initVal, writingMode.value]);


    return (
        <section className="note" style={{ backgroundColor: theme[themeId] }} ref={ref}>
            {writingMode.value ? (<Edit isNew={isNew} note={note} changes={selectedNote} />) : (<View note={note} selectedNote={selectedNote} />)}
        </section>
    );
}

function View({ note, selectedNote }) {
    const category = useCategoryContext().get;

    function handleBack() {
        selectedNote.setId(null);
        selectedNote.modify.theme = 0;
        selectedNote.modify.category = 0;
    }
    return (
        <>
            <h1 className="title"><button onClick={handleBack}><i className="fa fa-arrow-left"></i></button>{note.title}</h1>
            <div className="content">
                {note.content}
            </div>
            <strong className={(note.category !== 0) ? '' : 'uncategorized'}>{category[note.category]}</strong>
        </>
    );
}

function Edit({ isNew, note, changes }) {
    const title = useRef();
    const content = useRef();
    const category = useCategoryContext().get;
    const [categoryId, setCategoryId] = useState(null);

    let initVal = isNew ? changes.modify.category : note.category;

    useEffect(() => {
        let id = null;

        if (categoryId === null) {
            changes.modify.category = initVal;
            setCategoryId(initVal);
        } else {
            id = setInterval(() => {
                if (categoryId !== changes.modify.category) setCategoryId(changes.modify.category);
            }, 50);
        }

        return () => {
            if (id !== null) clearInterval(id);
        }
    }, [categoryId, initVal, changes.modify]);

    useEffect(() => {
        let id = setTimeout(() => {
            title.current.focus()
        }, 500);

        return () => clearTimeout(id);
    });

    useEffect(() => {
        let titleNode = title.current;
        let contentNode = content.current;

        function handleChanges() {
            changes.modify.title = titleNode.innerText;
            changes.modify.content = contentNode.innerText;
        }

        window.addEventListener('click', handleChanges);
        titleNode.addEventListener('blur', handleChanges);
        contentNode.addEventListener('blur', handleChanges);

        return () => {
            window.removeEventListener('click', handleChanges);
            titleNode.removeEventListener('blur', handleChanges);
            contentNode.removeEventListener('blur', handleChanges);
        }
    }, [changes]);

    function handleFocusNoteTextarea(event) {
        event.stopPropagation();
        content.current.focus();
    }

    return (
        <div className="edit-wrapper" onClick={(event) => handleFocusNoteTextarea(event)}>
            <div className='title' role="textbox" ref={title} onClick={(event) => event.stopPropagation()} contentEditable="true">{isNew ? "" : note.title}</div>
            <div className="content" role="textbox" ref={content} onClick={(event) => event.stopPropagation()} contentEditable="true">{isNew ? "" : note.content}</div>
            <strong className={(categoryId !== 0) ? '' : 'uncategorized'}>{category[categoryId]}</strong>
        </div >
    );
}