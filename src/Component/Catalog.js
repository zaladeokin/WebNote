import { useNoteContext, useSelectedNoteContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";

export function Catalog() {
    const ref = useFocusMain();
    const notes = useNoteContext();
    const selectNoteId = useSelectedNoteContext().setId;

    const noteCard = notes.map((note, index) => {
        return (
            <article className='card' key={note.id} onClick={() => selectNoteId(index)}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <strong className={(note.category !== "") ? '' : 'uncategorized'}>{note.category}</strong>
            </article>
        );
    });

    return (
        <section className='catalog' ref={ref}>
            {noteCard}
        </section>
    );
}