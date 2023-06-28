import { useEffect, useRef } from "react";

export function useFocusMain() {

    const ref = useRef();

    useEffect(() => {
        let node = ref.current

        function autoFocus() {
            node.setAttribute('tabindex', '0')
            node.focus();
        }

        autoFocus();
        window.addEventListener('click', autoFocus);

        return () => window.removeEventListener('click', autoFocus);
    }, []);

    return ref;
}