import { useRef, useEffect, useState } from 'react';

export function useColorAnimation(initColor, colorSet) {
    const node = useRef(null);
    const [color, setColor] = useState(initColor);

    useEffect(() => {
        let id = setTimeout((node, color, setColor) => {
            let toColor = (color === colorSet[0]) ? colorSet[1] : colorSet[0];
            node.style.color = toColor;
            setColor(toColor);
        }, 5000, node.current, color, setColor);
        return () => {
            if (id) clearTimeout(id);
        };
    },
        [color, colorSet]);

    return node;
}