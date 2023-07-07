import { useCategoryContext, useNotesContext, useSearchContext, useSelectedNoteContext, useThemeContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";

export function Catalog() {
    const ref = useFocusMain();
    const notes = useNotesContext().get;
    const theme = useThemeContext();
    const category = useCategoryContext().get;
    const selectNoteId = useSelectedNoteContext().setId;
    const searchKey = useSearchContext().keyword;

    function createCards(obj) {
        let cards = obj.map((note) => {
            return (
                <article className='card' key={note.id} onClick={() => selectNoteId(note.id)} style={{ backgroundColor: theme[note.theme] }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <strong className={(note.category !== 0) ? '' : 'uncategorized'}>{category[note.category]}</strong>
                </article>
            )
        });

        return cards;
    }

    let Filterednotes;
    if (searchKey !== '') {
        let reg = new RegExp(searchKey, "gi");
        Filterednotes = notes.filter((note) => note.title.search(reg) !== -1);
    } else Filterednotes = notes;

    let pinnedCardId = Filterednotes.filter((note) => note.pinned);
    let otherCardId = Filterednotes.filter((note) => !note.pinned);

    let pinnedCard = createCards(pinnedCardId);
    let otherCard = createCards(otherCardId);

    pinnedCard.reverse();
    otherCard.reverse();

    return (
        <section className='catalog' ref={ref}>
            {pinnedCard.length > 0 && (<h2>pinned</h2>)}
            {pinnedCard.length > 0 && pinnedCard}
            {otherCard.length > 0 && (<h2>others</h2>)}
            {otherCard.length > 0 && otherCard}
        </section>
    );
}