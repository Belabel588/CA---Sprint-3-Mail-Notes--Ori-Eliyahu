const { useState, useEffect } = React;
const { Link } = ReactRouterDOM;

import { NoteImg } from "../dynamicCmp/NoteImg.jsx";
import { NoteTodos } from "../dynamicCmp/NoteTodos.jsx";
import { NoteTxt } from "../dynamicCmp/NoteTxt.jsx";
import { NoteVideo } from "../dynamicCmp/NoteVideo.jsx";

export function NotePreview(props) {
    console.log(props.note.videoId);
    return (
        <div>
            <DynamicCmp {...props} />
        </div>
    );
}

function DynamicCmp(props) {
    switch (props.noteType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />;
        case 'NoteImg':
            return <NoteImg {...props} />;
        case 'NoteTodos':
            return <NoteTodos {...props} />;
        case 'NoteLink':
            return <NoteVideo {...props} />;
        default:
            return null;
    }
}
