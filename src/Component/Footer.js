import { useState } from "react";
import { useNotesContext, useSelectedNoteContext, useWritingModeContext } from "../NoteContext";
import { ToggleMenu } from "./ToggleMenu";

const initShowBar = { value: false, type: null }

export function Footer() {
    const selectedNote = useSelectedNoteContext();
    const writingMode = useWritingModeContext();
    const allNotes = useNotesContext();
    const [showBar, setShowBar] = useState(initShowBar);

    const note = allNotes.get;
    const noteId = selectedNote.id;

    function handleAddEdit() {
        writingMode.setMode(true);
        if (noteId === null) selectedNote.setId(note.length + 1);
    }

    function handleDelete() {
        allNotes.dispatch({
            type: 'delete',
            id: noteId
        });
        selectedNote.setId(null);
    }

    function handleSave() {
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

        writingMode.setMode(false);
    }

    function handleCancel() {
        if (noteId <= note.length) {
            selectedNote.setId(noteId);
            selectedNote.modify.theme = note[noteId - 1].theme;
            selectedNote.modify.category = note[noteId - 1].category;
        } else {
            selectedNote.setId(null);
            selectedNote.modify.theme = 0;
            selectedNote.modify.category = 0;
        }
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
            {showBar.value && < ToggleMenu type={showBar.type} onBlur={() => setShowBar(initShowBar)} />}
        </footer>
    );
}