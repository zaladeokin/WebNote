import { useEffect, useRef, useState } from "react";
import { useCategoryContext } from "../NoteContext";

export function Edit({ isNew, note, changes }) {
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