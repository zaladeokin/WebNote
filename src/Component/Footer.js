import { useSelectedNoteContext } from "../NoteContext";

export function Footer() {
    const selectedNote = useSelectedNoteContext().id;
    return (
        <footer>
            <div className='iconContainer'>
                <div className='icon'>{selectedNote !== null ? (<i className='fa fa-map-pin'></i>) : (<i className='fa fa-layer-group'></i>)}</div>
                <div className='icon'><i className='fa fa-trash-can'></i></div>
                <div className='icon addNote'>{selectedNote !== null ? (<div className='addNoteLabel'><i className='fas fa-edit'>&nbsp;&nbsp;</i>Edit</div>) : (<div className='addNoteLabel'><i className='fa-solid fa-plus'>&nbsp;&nbsp;</i>Add note</div>)}</div>
            </div>
        </footer>
    );
}