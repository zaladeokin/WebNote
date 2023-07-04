import { useNotesContext, useSelectedNoteContext, useWritingModeContext } from "../NoteContext";

export function Footer() {
    const selectedNote = useSelectedNoteContext();
    const writingMode = useWritingModeContext();
    const allNotes = useNotesContext();

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
            console.log(selectedNote.modify);
        }
    }

    function iconMenu(Editingmode) {
        if (Editingmode) {
            return (
                <>
                    <div className='icon' onClick={handleCancel}><i className='fa fa-times'></i></div>
                    <div className='icon' onClick={handleSave}><i className='fas fa-save'></i></div>
                    <div className='icon' onClick={handlePin}><i className='fa fa-map-pin'></i></div>
                    <div className='icon'><i className='fa fa-layer-group'></i></div>
                    <div className='icon addNote'><div className='addNoteLabel'><i className='fa-brands fa-affiliatetheme'>&nbsp;&nbsp;</i>Theme</div></div>
                </>
            );
        } else {
            return (
                <>
                    {noteId !== null ? (<div className='icon' onClick={handlePin}><i className='fa fa-map-pin'></i></div>) : (<div className='icon'><i className='fa fa-layer-group'></i></div>)}
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
        </footer>
    );
}