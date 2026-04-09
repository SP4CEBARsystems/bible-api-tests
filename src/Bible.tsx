import { useState } from 'react'
import BibleText from './services/BibleText'
// import DOMPurify from "dompurify";

function Bible() {
    const [text, setText] = useState('')
    const myBible = new BibleText();

    const versions = ['eng_kjv', 'nld_nbg', 'deu_luth', 'fra_lsg'];
    const verses = ['genesis 1:2', 'act 1:1'];

    const promise = Promise.all(versions.map((version)=>
        Promise.all(verses.map((verse) =>
            myBible.getVerse(verse, version)
        ))
    ));

    // const texts = await promise;

    promise.then((newTexts) => setText(newTexts
        .map(text => text.join('\n'))
        .join('\n<hr/>\n')
    ));
    // myBible.getVerse('genesis 1:2').then(
    //     (newText:string) => {setText(newText)}
    // )

    return (
        // <>
        //     {text}
        // </>
        <div
            dangerouslySetInnerHTML={{ 
                __html: 
                text
                // DOMPurify.sanitize(text)
            }}
        />
    );
}

export default Bible
