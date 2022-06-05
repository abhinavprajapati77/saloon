// import React, { useState } from 'react';
// import { convertToRaw } from 'draft-js';
// import { Editor, EditorState } from 'react-draft-wysiwyg';

import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./ManagePage.css";

export const TextEditor_Manage_page = ({
  setDescription,
  description,
  update,
}) => {
  const [editorState, setEditorState] = useState(
    update
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(description))
        )
      : EditorState.createEmpty()
  );
  // const [state, setState] = useState({
  //   editorState: EditorState.createWithContent(
  //     convertFromRaw(JSON.parse(editorState)),
  //   ),
  // });

  const handleChange = (editorState) => {
    const contentState = stateToHTML(editorState.getCurrentContent());

    console.log("--------contentState", contentState);

    setDescription(contentState);
  };

  return (
    <div className="Page-Editor">
      <Editor
        onEditorStateChange={(editorState) => {
          setEditorState(editorState);
          handleChange(editorState);
        }}
        editorState={editorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // defaultEditorState={stateToHTML(editorState.getCurrentContent())}
      />
      {/* <textarea>{ description }</textarea> */}
    </div>
  );
};
