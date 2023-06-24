export function Footer() {
    return (
        <footer>
            {/** pin note */}
            {/** Delete */}

            {/** Category */}
            {/** Trash */}
            {/** Add note */}
            <div className='iconContainer'>
                <div className='icon'><i className='fa fa-search'></i></div>
                <div className='icon'><i className='fa fa-search'></i></div>
                <div className='icon addNote'><div className='addNoteLabel'><i className='fa fa-search'>&nbsp;&nbsp;</i>Add note</div></div>
            </div>
        </footer>
    );
}