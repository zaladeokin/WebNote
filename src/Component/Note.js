import { useEffect, useState } from "react";
import { useCategoryContext, useNotesContext, useSelectedNoteContext, useThemeContext, useWritingModeContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";
import { Edit } from "./Edit";

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
        selectedNote.modify.title = '';
        selectedNote.modify.content = '';
        selectedNote.modify.pinned = false;
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