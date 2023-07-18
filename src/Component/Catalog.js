import { useEffect, useMemo } from "react";
import { useCategoryContext, useNotesContext, useFilterContext, useSelectedNoteContext, useThemeContext, useShowBarContext } from "../NoteContext";
import { useFocusMain } from "../hooks/useFocusMain";

export function Catalog() {
    const ref = useFocusMain();
    const notes = useNotesContext().get;
    const theme = useThemeContext();
    const category = useCategoryContext().get;
    const selectNoteId = useSelectedNoteContext().setId;
    const searchKey = useFilterContext().search.keyword;
    const catFilter = useFilterContext().catFilter.category;
    const setShowBar = useShowBarContext().setValue;

    useEffect(() => {
        let node = ref.current;

        function handleShowBarOnFocus() {
            setShowBar({ value: false, type: null });
        }

        node.addEventListener('click', handleShowBarOnFocus);

        return () => node.removeEventListener('click', handleShowBarOnFocus);
    });

    function createCards(obj) {
        let cards = obj.map((note) => {
            return (
                <article className='card' key={note.id} onClick={() => selectNoteId(note.id)} style={{ backgroundColor: theme[note.theme] }}>
                    <h4>{note.title}</h4>
                    <p>{note.content}</p>
                    <strong className={(note.category !== 0) ? '' : 'uncategorized'}>{category[note.category]}</strong>
                </article>
            )
        });

        return cards;
    }

    let filterednotes;

    //Categorized
    filterednotes = useMemo(() => {
        if (catFilter !== null) {
            return notes.filter((note) => note.category === catFilter);
        } else {
            return notes;
        }
    }, [catFilter, notes]);

    //Search
    if (searchKey !== '') {
        let reg = new RegExp(searchKey, "gi");
        filterednotes = filterednotes.filter((note) => note.title.search(reg) !== -1);
    }

    //Sort pinned and unpinned note
    let pinnedCardId = [];
    let otherCardId = [];

    for (let i = 0; i < filterednotes.length; i++) {
        let note = filterednotes[i];
        if (note.pinned) pinnedCardId.push(note);
        else otherCardId.push(note);
    }

    let pinnedCard = createCards(pinnedCardId);
    let otherCard = createCards(otherCardId);

    pinnedCard.reverse();
    otherCard.reverse();

    return (
        <section className='catalog' ref={ref}>
            <h2>{catFilter === null ? 'General' : category[catFilter]}</h2>
            {pinnedCard.length > 0 && (<><div className="divider"></div><h3>pinned</h3></>)}
            {pinnedCard.length > 0 && pinnedCard}
            {otherCard.length > 0 && (<div className="divider"></div>)}
            {otherCard.length > 0 && otherCard}
            {(pinnedCard.length <= 0 && otherCard.length <= 0) && (<><div className="divider"></div><h3 style={{ textAlign: 'center' }}>No notes&nbsp;{catFilter !== null && 'in this catgory'}&nbsp;yet.</h3></>)}
        </section>
    );
}