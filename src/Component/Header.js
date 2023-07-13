import { useEffect, useRef, useState } from 'react';
import { useColorAnimation } from '../hooks/useColorAnimation';
import { useEmailContext, useFilterContext, useSelectedNoteContext, useShowBarContext } from '../NoteContext';
import avartar from '../img/webnoteAvatar.png'

export function Header() {
    const brandColor = ['#aa421f', '#ffffff'];
    const web = useColorAnimation(brandColor[0], brandColor);
    const note = useColorAnimation(brandColor[1], brandColor);
    const email = useEmailContext();
    const setShowBar = useShowBarContext().setValue;
    const [className, setClassName] = useState('');//set style settings for header widget
    const ref = useRef(null);

    useEffect(() => {
        let node = ref.current;

        function handleShowBarOnFocus() {
            setShowBar({ value: false, type: null });
        }

        node.addEventListener('click', handleShowBarOnFocus);

        return () => node.removeEventListener('click', handleShowBarOnFocus);
    });

    useEffect(() => {
        //set style settings for header widget
        if (email.value !== '') setClassName('setWidget');
        return () => setClassName('');
    }, [email]);

    return (
        <header className={className} ref={ref}>
            <h1 ref={note}><span ref={web}>Web</span>Note</h1>
            {className !== '' && <Widget email={email.value} />}
        </header>
    );
}

function Widget({ email }) {
    const selectedNote = useSelectedNoteContext().id;
    const setSearchKeyword = useFilterContext().search.setKeyword;
    const ref = useRef('');

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
            <div className='imageWidget'><img src={avartar} alt={email} /></div >
        </>
    );
}