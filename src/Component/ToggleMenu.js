import { useEffect, useRef } from "react";
import { useCategoryContext, useFilterContext, useNotesContext, useSelectedNoteContext, useThemeContext } from "../NoteContext";

export function ToggleMenu({ type, onBlur }) {
    const notes = useNotesContext();
    const selectedNote = useSelectedNoteContext();
    const themeList = useThemeContext();
    const categoryList = useCategoryContext().get;
    const catFilter = useFilterContext().catFilter;
    const toggle = useRef(null);

    const category = type === 'category' ? true : false;
    const note = notes[selectedNote.id] === undefined ? selectedNote.modify : notes[selectedNote.id];

    useEffect(() => {
        let toggleNode = toggle.current;
        let id = setTimeout(() => {
            toggleNode.setAttribute('tabindex', '0');
            toggleNode.focus();
        }, 500);

        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        let toggleNode = toggle.current;
        toggleNode.addEventListener('blur', onBlur);

        return () => toggleNode.removeEventListener('blur', onBlur);
    }, [onBlur]);

    function handleCat(ind) {
        if (selectedNote.id === null) {
            catFilter.setCategory(ind);
        } else {
            selectedNote.modify.category = ind
        }
        onBlur();
    }

    function handleTheme(ind) {
        selectedNote.modify.theme = ind
        onBlur();
    }


    let toggleItem;

    if (!category) {
        toggleItem = themeList.map((color, ind) => (<div className={ind === note.theme ? "theme selected" : "theme"} key={color} style={{ backgroundColor: color }} onClick={() => handleTheme(ind)}>{ind === 0 && 'None'}</div>));
    } else {
        toggleItem = categoryList.map((cat, ind) => {

            let condition = () => {
                if (selectedNote.id !== null) return ind === note.category;
                else return catFilter.category === ind;
            }

            let noCat = '';

            if (ind === 0 && selectedNote.id === null) noCat = (
                <div className={catFilter.category === null ? "toggle-item selected" : "toggle-item"} key='none' onClick={() => handleCat(null)}>All Category</div>
            )

            return (
                <>
                    {noCat}
                    <div className={condition() ? "toggle-item selected" : "toggle-item"} key={cat} onClick={() => handleCat(ind)}>{cat}</div>
                </>
            );
        });
    }

    return (
        <div className="toggle" ref={toggle} onClick={(event) => event.stopPropagation()}>
            <h4>{category ? 'category' : 'theme'}</h4>
            {category && (
                <>
                    <div className='searchBar'><input type="search" placeholder=' enter category...' onClick={(event) => event.stopPropagation()} /></div>
                    <div className='search'><i className="fa fa-search">&nbsp;&nbsp;</i>search</div>
                    <div className="add"><i className='fa- fa-plus'>&nbsp;&nbsp;</i>add</div>
                </>
            )}
            {toggleItem}
        </div>
    );
}