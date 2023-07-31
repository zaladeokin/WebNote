import { useFilterContext, useNotesContext, useSelectedNoteContext, useShowBarContext, useWritingModeContext } from "../NoteContext";
import { ToggleMenu } from "./ToggleMenu";

export function Footer() {
    const selectedNote = useSelectedNoteContext();
    const writingMode = useWritingModeContext();
    const allNotes = useNotesContext();
    const showBar = useShowBarContext().value;
    const setShowBar = useShowBarContext().setValue;
    const catFilter = useFilterContext().catFilter;

    const note = allNotes.get;
    const noteId = selectedNote.id;

    function handleShowBarOnFocus() {
        setShowBar({ value: false, type: null });
    }

    function handleAddEdit() {
        handleShowBarOnFocus();
        writingMode.setMode(true);
        if (noteId === null) {
            let lastNoteId = allNotes.get[allNotes.get.length - 1].id;
            selectedNote.setId(lastNoteId + 1);
        }
    }

    function handleDelete() {
        handleShowBarOnFocus();
        selectedNote.modify.title = '';
        selectedNote.modify.content = '';
        selectedNote.modify.pinned = false;
        selectedNote.modify.theme = 0;
        selectedNote.modify.category = 0;
        allNotes.dispatch({
            type: 'delete',
            id: noteId
        });
        selectedNote.setId(null);
    }

    function handleSave() {
        handleShowBarOnFocus();
        let newValue, isNew;

        if (selectedNote.modify.title.replace(/\s/g, '').length <= 0 && selectedNote.modify.content.replace(/\s/g, '').length <= 0) {
            handleCancel();
            return;
        }

        if (noteId <= note.length) {
            isNew = false;
            newValue = { ...selectedNote.modify, id: noteId, pinned: note[noteId - 1].pinned }
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

        if (catFilter.category !== newValue.category && catFilter.category !== null) catFilter.setCategory(null);
        writingMode.setMode(false);
    }

    function handleCancel() {
        handleShowBarOnFocus();
        if (noteId <= note.length) {
            selectedNote.setId(noteId);
            selectedNote.modify.theme = note[noteId - 1].theme;
            selectedNote.modify.category = note[noteId - 1].category;
        } else {
            selectedNote.setId(null);
            selectedNote.modify.title = '';
            selectedNote.modify.content = '';
            selectedNote.modify.pinned = false;
            selectedNote.modify.theme = 0;
            selectedNote.modify.category = 0;
        }
        writingMode.setMode(false);
    }

    function handlePin() {
        handleShowBarOnFocus();
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
        obj.value = !obj.value;
        obj.type = x;
        setShowBar(obj);
    }

    function iconMenu(Editingmode) {
        let isPinned = note[noteId - 1] !== undefined ? note[noteId - 1].pinned : false;
        let pinnedIcon = isPinned === true ? (<i className="fa fa-map-pin fa-flip-vertical"></i>) : (<i className='fa fa-map-pin'></i>);
        if (Editingmode) {
            return (
                <>
                    <div className='icon' onClick={handleCancel}><i className='fa fa-times'></i></div>
                    <div className='icon' onClick={handleSave}><i className='fas fa-save'></i></div>
                    <div className='icon' onClick={handlePin}>{pinnedIcon}</div>
                    <div className='icon' onClick={() => toggleBar('category')}><i className='fa fa-layer-group'></i></div>
                    <div className='icon addNote' onClick={() => toggleBar('theme')}><div className='addNoteLabel'><i className='fa-brands fa-affiliatetheme'>&nbsp;&nbsp;</i>Theme</div></div>
                </>
            );
        } else {
            return (
                <>
                    {noteId !== null ? (<div className='icon' onClick={handlePin}>{pinnedIcon}</div>) : (<div className='icon' onClick={() => toggleBar('category')}><i className='fa fa-layer-group'></i></div>)}
                    {noteId !== null && (<div className='icon' onClick={handleDelete}><i className='fa fa-trash-can'></i></div>)}
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
            {showBar.value && <ToggleMenu />}
        </footer>
    );
}