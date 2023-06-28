import { useState } from 'react';
import { NoteState, useSelectedNoteContext } from './NoteContext';
import { Header } from './Component/Header';
import { HomePage } from './Component/Homepage';
import { Login } from './Component/Login';
import { Catalog } from './Component/Catalog';
import { Note } from './Component/Note';
import { Footer } from './Component/Footer';
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
        ) : (<Book />)}
      </main>
      {login && <Footer />}
    </NoteState>
  );
}

function Book() {
  const noteId = useSelectedNoteContext().id;

  return (
    <>
      {noteId !== null ? <Note /> : <Catalog />}
    </>
  )
}

export default App;
