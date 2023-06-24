import { useState } from 'react';
import { NoteState } from './NoteContext';
import { Header } from './Component/Header';
import { HomePage } from './Component/Homepage';
import { Login } from './Component/Login';
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
        ) : <Catalog />}
      </main>
      {login && <Footer />}
    </NoteState>
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
