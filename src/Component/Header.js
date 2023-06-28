import { useEffect, useState } from 'react';
import { useColorAnimation } from '../hooks/useColorAnimation';
import { useEmailContext, useSelectedNoteContext } from '../NoteContext';

export function Header() {
    const brandColor = ['#aa421f', '#ffffff'];
    const web = useColorAnimation(brandColor[0], brandColor);
    const note = useColorAnimation(brandColor[1], brandColor);
    const email = useEmailContext();
    const [className, setClassName] = useState('');//set style settings for header widget

    useEffect(() => {
        //set style settings for header widget
        if (email.value !== '') setClassName('setWidget');
        return () => setClassName('');
    }, [email]);

    return (
        <header className={className}>
            <h1 ref={note}><span ref={web}>Web</span>Note</h1>
            {className !== '' && <Widget email={email.value} />}
        </header>
    );
}

function Widget({ email }) {
    const selectedNote = useSelectedNoteContext().id;
    const profilePic = "http://localhost/MyPortfolio/images/myPhoto.jpg";

    let selected = selectedNote !== null;
    let icon = selected ? '' : (<i className="fa fa-search"></i>);
    let inputBox = selected ? '' : (<input type='text' placeholder='search notes...' onClick={(event) => event.stopPropagation()} />);
    return (
        <>
            <div className='searchIcon'>{icon}</div>
            <div className='searchBar'>{inputBox}</div>
            <div className='imageWidget'><img src={profilePic} alt={email} /></div >
        </>
    );
}