import { useState } from 'react';
import { useColorAnimation } from './hooks/useColorAnimation';
import { NoteState } from './NoteContext';
import { HomePage } from './Component/Homepage';
import { Login } from './Component/Login';
import './app.css';

function App() {
  const [login, setLogin] = useState(false);
  return (
    <NoteState>
      <Header />
      <main>
        {!login ? (
          <HomePage >
            <Login login={setLogin} />
          </HomePage>
        ) : <Catalog />}
      </main>
    </NoteState>
  );
}

function Header() {
  const brandColor = ['#aa421f', '#ffffff'];
  const web = useColorAnimation(brandColor[0], brandColor);
  const note = useColorAnimation(brandColor[1], brandColor);

  return (
    <header>
      <h1 ref={note}><span ref={web}>Web</span>Note</h1>
    </header>
  );
}


function Catalog() {
  return (
    <section className='catalog'>
      kkk
    </section>
  );
}

export default App;
