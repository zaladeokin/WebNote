import { useState } from "react";

export function HomePage({ children }) {
    const [login, setLogin] = useState(false);
    return (
        <section className="homepage">
            <div className="container">
                {login ? children : (<LandingSection loginPage={setLogin} />)}
            </div>
        </section>
    );
}

function LandingSection({ loginPage }) {
    return (
        <section className="about">
            A versatile and intuitive digital tool to create, organize, and manage your notes efficiently.
            <button onClick={
                () => {
                    loginPage(true);
                }
            }> Continue &#62;&#62;&#62; </button>
        </section>
    );
}