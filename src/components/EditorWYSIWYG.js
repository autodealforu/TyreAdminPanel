import React, { Component } from "react";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { UPLOAD_CONST } from "../domain/constant";

export class EditorWYSIWYG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: "",
    };
  }
  componentDidMount() {
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(this.props.value ? this.props.value : "")
        )
      ),
    });
  }

  uploadImageCallBack = async (file) => {
    console.log(file);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", UPLOAD_CONST);

      const data = new FormData();
      data.append("files", file, file.name);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        // console.log(xhr.responseText);
        resolve({ data: { link: xhr.responseText } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.changeValue(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        stripPastedStyles={true}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],

          image: {
            uploadCallback: this.uploadImageCallBack,
          },
        }}
      />
    );
  }
}

export default EditorWYSIWYG;
