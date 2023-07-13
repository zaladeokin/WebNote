import { useEffect, useRef, useState } from "react";
import { useCategoryContext } from "../NoteContext";

export function Edit({ isNew, note, changes }) {
    const title = useRef();
    const content = useRef();
    const category = useCategoryContext().get;
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        let id = null;

        if (categoryId === null) {
            changes.modify.theme = isNew ? 0 : note.theme;
            changes.modify.category = isNew ? 0 : note.category;
            changes.modify.pinned = isNew ? false : note.pinned;
            console.log(changes.modify)
            console.log(note)
            setCategoryId(isNew ? changes.modify.category : note.category);
        } else {
            id = setInterval(() => {
                if (categoryId !== changes.modify.category) setCategoryId(changes.modify.category);
            }, 50);
        }

        return () => {
            if (id !== null) clearInterval(id);
        }
    }, [categoryId, isNew, note, changes.modify]);

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
            <div className='title' role="textbox" ref={title} onClick={(event) => event.stopPropagation()} contentEditable="true" suppressContentEditableWarning={true}>
                {isNew ? "" : note.title}
            </div>
            <div className="content" role="textbox" ref={content} onClick={(event) => event.stopPropagation()} contentEditable="true" suppressContentEditableWarning={true}>
                {isNew ? "" : note.content}
            </div>
            <strong className={(categoryId !== 0) ? '' : 'uncategorized'}>
                {category[categoryId]}
            </strong>
        </div >
    );
}