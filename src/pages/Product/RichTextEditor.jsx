import React, { Component } from 'react'
import { EditorState, convertToRaw,ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import PropTypes from "prop-types"

export default class RichTextEditor extends Component {
  static propTypes = {
    value: PropTypes.string
  }
  
  constructor(props) {
    super(props)
    const { value:detail } = props
    // console.log("detail",detail)
    // 如果是点击修改进入，那么富文本组件会获得表单下发的初始值，保存在props的value属性里
    if (detail) {
      const contentBlock = htmlToDraft(detail)
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.state = {
          editorState,
        }
      }
    }else{
      this.state = {
        editorState: EditorState.createEmpty(),
      }
    }
  }

  onEditorStateChange = (editorState) => {
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.props.onChange(value)
    this.setState({
      editorState,
    })
  }
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/manage/img/upload')
        const data = new FormData()
        data.append('image', file)
        xhr.send(data)
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText)
          const url = response.data.url
          resolve({ data: { link: url } })
        })
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText)
          reject(error)
        })
      }
    )
  }

  render() {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorStyle={{ border: "1px solid black", minHeight: 200 }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } }
          }
          }

        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    )
  }
}