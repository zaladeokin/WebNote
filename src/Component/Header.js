import { useEffect, useState } from 'react';
import { useColorAnimation } from '../hooks/useColorAnimation';
import { useEmailContext } from '../NoteContext';

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
    const profilePic = "http://localhost/MyPortfolio/images/myPhoto.jpg";
    return (
        <>
            <div className='searchIcon'><i className="fa fa-search"></i></div>
            <div className='searchBar'><input type='text' placeholder='search notes...' /></div>
            <div className='imageWidget'><img src={profilePic} alt={email} /></div >
        </>
    );
}