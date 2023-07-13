import { useEffect, useRef, useState } from "react";
import { useCategoryContext, useFilterContext, useNotesContext, useSelectedNoteContext, useShowBarContext, useThemeContext } from "../NoteContext";

export function ToggleMenu() {
    const notes = useNotesContext();
    const selectedNote = useSelectedNoteContext();
    const themeList = useThemeContext();
    const categoryList = useCategoryContext().get;
    const categoryDispatch = useCategoryContext().dispatch;
    const catFilter = useFilterContext().catFilter;
    const showBar = useShowBarContext().value;
    const setShowBar = useShowBarContext().setValue;
    const toggle = useRef(null);
    const inputNode = useRef(null);
    const uniqueKey = useRef(null);
    const [keyword, setKeyword] = useState('');

    const category = showBar.type === 'category' ? true : false;
    const note = notes[selectedNote.id] === undefined ? selectedNote.modify : notes[selectedNote.id];

    useEffect(() => {
        let toggleNode = toggle.current;
        let id = setTimeout(() => {
            toggleNode.setAttribute('tabindex', '0');
            toggleNode.focus();
        }, 500);

        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        uniqueKey.current = Math.random().toString(16).slice(2);
    }, []);

    function handleCat(cat) {
        let ind = categoryList.indexOf(cat);

        if (selectedNote.id === null) {
            catFilter.setCategory(ind);
        } else {
            selectedNote.modify.category = ind
        }
        setShowBar({ value: false, type: null });
    }

    function handleTheme(ind) {
        selectedNote.modify.theme = ind
        setShowBar({ value: false, type: null });
    }

    function handleInput() {
        setKeyword(inputNode.current.value);
    }

    function filterCondition(cat, ind) {
        let reg = new RegExp(keyword, "gi");
        if (cat.search(reg) !== -1 && ind !== 0) return true;
        else return false;
    }

    function handleAddCategory() {
        categoryDispatch({
            type: 'add',
            new: keyword
        });
    }

    let toggleItem;

    if (!category) {
        toggleItem = themeList.map((color, ind) => (<div className={ind === note.theme ? "theme selected" : "theme"} key={color} style={{ backgroundColor: color }} onClick={() => handleTheme(ind)}>{ind === 0 && 'None'}</div>));
    } else {
        let strictReg = new RegExp('^' + keyword + '$', 'gi');
        let filteredCategoryList = keyword !== '' ? categoryList.filter(filterCondition) : categoryList;//Help to filter categories that consist of keyword
        let strictFilteredCategoryList = categoryList.filter((cat) => cat.search(strictReg) !== -1);//Help to prompt add button if keyword never exist
        let addBtn = (<div className="add" key={uniqueKey.current} onClick={handleAddCategory}><i className='fa- fa-plus'>&nbsp;&nbsp;</i>add</div>);

        toggleItem = filteredCategoryList.map((cat, ind) => {

            let condition = () => {
                if (selectedNote.id !== null) return ind === note.category;
                else return catFilter.category === ind;
            }

            let noCat = '';

            if (ind === 0 && selectedNote.id === null && keyword === '') noCat = (
                <div className={catFilter.category === null ? "toggle-item selected" : "toggle-item"} key='All Category' onClick={() => handleCat(null)}>All Category</div>
            )

            return (
                <>
                    {noCat}
                    <div className={condition() ? "toggle-item selected" : "toggle-item"} key={cat} onClick={() => handleCat(cat)}>{cat}</div>
                </>
            );
        });
        if (strictFilteredCategoryList.length === 0 && keyword !== '' && keyword.toLowerCase() !== 'all category') toggleItem.unshift(addBtn);
    }

    return (
        <div className="toggle" ref={toggle} onClick={(event) => event.stopPropagation()}>
            <h4>{category ? 'category' : 'theme'}</h4>
            {category && (<div className='searchBar'><input type="search" placeholder=' enter category...' ref={inputNode} value={keyword} onChange={handleInput} /></div>)}
            {toggleItem}
        </div>
    );
}