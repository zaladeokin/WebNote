import { useEffect, useRef, useState } from 'react';
import { useColorAnimation } from '../hooks/useColorAnimation';
import { useEmailContext, useFilterContext, useSelectedNoteContext } from '../NoteContext';

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
    const setSearchKeyword = useFilterContext().search.setKeyword;
    const ref = useRef('');
    const profilePic = "http://localhost/MyPortfolio/images/myPhoto.jpg";

    function handleSearch() {
        setSearchKeyword(ref.current.value);
    }

    let selected = selectedNote !== null;
    let icon = selected ? '' : (<i className="fa fa-search"></i>);
    let inputBox = selected ? '' : (<input type='search' placeholder='search notes...' onClick={(event) => event.stopPropagation()} onChange={handleSearch} ref={ref} />);
    return (
        <>
            <div className='searchIcon'>{icon}</div>
            <div className='searchBar'>{inputBox}</div>
            <div className='imageWidget'><img src={profilePic} alt={email} /></div >
        </>
    );
}