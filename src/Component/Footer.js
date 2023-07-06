import { useState, useEffect, useRef } from "react";
import { useCategoryContext, useNotesContext, useSelectedNoteContext, useThemeContext, useWritingModeContext } from "../NoteContext";

const initShowBar = { value: false, type: null }

export function Footer() {
    const selectedNote = useSelectedNoteContext();
    const writingMode = useWritingModeContext();
    const allNotes = useNotesContext();
    const [showBar, setShowBar] = useState(initShowBar)

    const note = allNotes.get;
    const noteId = selectedNote.id;

    function handleAddEdit() {
        writingMode.setMode(true);
        if (noteId === null) selectedNote.setId(note.length + 1)
    }

    function handleSave() {
        let newValue, isNew;

        if (selectedNote.modify.title.replace(/\s/g, '').length <= 0 && selectedNote.modify.content.replace(/\s/g, '').length <= 0) {
            handleCancel();
            return;
        }

        if (noteId <= note.length) {
            isNew = false;
            newValue = { ...selectedNote.modify, id: noteId };
        }
        else {
            isNew = true;
            newValue = { ...selectedNote.modify, id: noteId };
        }

        selectedNote.setId(noteId);

        allNotes.dispatch({
            type: 'add',
            note: newValue,
            isNew: isNew
        });

        writingMode.setMode(false);
    }

    function handleCancel() {
        if (noteId <= note.length) selectedNote.setId(noteId);
        else selectedNote.setId(null);
        writingMode.setMode(false);
    }

    function handlePin() {
        let isNew = noteId <= note.length ? false : true;

        if (!isNew) allNotes.dispatch({
            type: 'pin',
            id: noteId
        });
        else {
            selectedNote.modify.pinned = !selectedNote.modify.pinned
        }
    }

    function toggleBar(x) {
        let obj = { ...showBar }
        obj.value = true;
        obj.type = x;
        setShowBar(obj);
    }

    function iconMenu(Editingmode) {
        if (Editingmode) {
            return (
                <>
                    <div className='icon' onClick={handleCancel}><i className='fa fa-times'></i></div>
                    <div className='icon' onClick={handleSave}><i className='fas fa-save'></i></div>
                    <div className='icon' onClick={handlePin}><i className='fa fa-map-pin'></i></div>
                    <div className='icon' onClick={() => toggleBar('category')}><i className='fa fa-layer-group'></i></div>
                    <div className='icon addNote' onClick={() => toggleBar('theme')}><div className='addNoteLabel'><i className='fa-brands fa-affiliatetheme'>&nbsp;&nbsp;</i>Theme</div></div>
                </>
            );
        } else {
            return (
                <>
                    {noteId !== null ? (<div className='icon' onClick={handlePin}><i className='fa fa-map-pin'></i></div>) : (<div className='icon' onClick={() => toggleBar('category')}><i className='fa fa-layer-group'></i></div>)}
                    <div className='icon'><i className='fa fa-trash-can'></i></div>
                    <div className='icon addNote' onClick={handleAddEdit}>{noteId !== null ? (<div className='addNoteLabel'><i className='fas fa-edit'>&nbsp;&nbsp;</i>Edit</div>) : (<div className='addNoteLabel'><i className='fa-solid fa-plus'>&nbsp;&nbsp;</i>Add note</div>)}</div>
                </>
            );
        }
    }

    return (
        <footer>
            <div className='iconContainer'>
                {iconMenu(writingMode.value)}
            </div>
            {showBar.value && < ToggleMenu type={showBar.type} onBlur={() => setShowBar(initShowBar)} />}
        </footer>
    );
}

function ToggleMenu({ type, onBlur }) {
    const notes = useNotesContext();
    const selectedNote = useSelectedNoteContext();
    const themeList = useThemeContext();
    const categoryList = useCategoryContext().get;
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

    function handleSetTheme(ind) {
        // let modify= {...selectedNote.modify, theme}
        // modify.theme= ind;
        selectedNote.modify.theme = ind;
        console.log(selectedNote)
    }

    let toggleItem;

    if (!category) {
        toggleItem = themeList.map((color, ind) => (<div className={ind === note.theme ? "theme selected" : "theme"} key={color} style={{ backgroundColor: color }} onClick={() => handleSetTheme(ind)}>{ind === 0 && 'None'}</div>));
    } else {
        toggleItem = categoryList.map((cat) => (<div className="toggle-item" key={cat}>{cat}</div>));
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