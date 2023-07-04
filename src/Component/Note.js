import { useEffect, useRef } from "react";
import { useNotesContext, useSelectedNoteContext, useWritingModeContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";

export function Note() {
    const ref = useFocusMain();
    const selectedNote = useSelectedNoteContext();
    const allNote = useNotesContext().get;
    const writingMode = useWritingModeContext();

    const note = allNote.filter((note) => note.id === selectedNote.id)[0];
    const isNew = note === undefined ? true : false;

    return (
        <section className="note" ref={ref}>
            {writingMode.value ? (<Edit isNew={isNew} note={note} changes={selectedNote} />) : (<View note={note} selectedNote={selectedNote} />)}
        </section>
    );
}

function View({ note, selectedNote }) {
    return (
        <>
            <h1 className="title"><button onClick={() => selectedNote.setId(null)}><i className="fa fa-arrow-left"></i></button>{note.title}</h1>
            <div className="content">
                {note.content}
            </div>
            <strong className={(note.category !== "") ? '' : 'uncategorized'}>{note.category}</strong>
        </>
    );
}

function Edit({ isNew, note, changes }) {
    const title = useRef();
    const content = useRef();

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
            changes.modify.category = 'testing';
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
        </div >
    );
}