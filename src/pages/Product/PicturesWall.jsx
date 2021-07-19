import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqRemovePicture} from "../../api/index"
import {BASE_IMG_URL} from "../../utils/constance"

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  constructor(props){
    super(props)
    let fileList = []
    // 当为修改页面时，AddUpdate父页面会传递初始值，因此组件会收到props，当value值存在且不为空时表示有图片信息
    if(props.value && props.value.length > 0 && props.value[0] !== ""){
      fileList = props.value.map((img,index)=>{
        return {
          uid:-index,
          name:img,
          status:"done",
          url:BASE_IMG_URL + img
        }
      })
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList
    }
  }


  getPicturesName = ()=> this.state.fileList.map(file=>file.name)
      
  

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ fileList,file }) => {
    if(file.status === "done" && file.response.status===0){
      message.success("上传成功")
      const {name,url} = file.response.data
      file = {...fileList[fileList.length-1],name,url}
      fileList[fileList.length-1] = file
      console.log(fileList)
    }else if (file.status === "removed"){
      reqRemovePicture(file.name)
    }
    const value = this.getPicturesName()
    this.props.onChange(value)
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          name="image"
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}