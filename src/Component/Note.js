import { useNoteContext, useSelectedNoteContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";

export function Note() {
    const ref = useFocusMain();
    const selectedNote = useSelectedNoteContext();
    const note = useNoteContext()[selectedNote.id];

    return (
        <section className="note" ref={ref}>
            <h1 className="title"><button onClick={() => selectedNote.setId(null)}><i className="fa fa-arrow-left"></i></button>{note.title}</h1>
            <div className="content">
                {note.content}
            </div>
            <strong className={(note.category !== "") ? '' : 'uncategorized'}>{note.category}</strong>
        </section>
    );
}