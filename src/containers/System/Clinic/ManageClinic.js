import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss"
import userService from "../../../services/userService";
import { LANGUAGES,CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props){
    super(props)
    this.state={
        name: '',
        imageBase64: '',
        descriptionHTML: '',
      descriptionMarkdown: '',
        address:''
    }
    }
   async componentDidMount(){
       
    }
 async componentDidUpdate(prevProps, prevState, snapshot) {
   
    }
    handleOnChangeInput = (event,id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
             ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
    this.setState({
        descriptionHTML: html,
        descriptionMarkdown:text
    });
    };
    handleOnChangImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      // let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImgUrl: objectUrl,
        imageBase64: base64,
      });
    }
    };
  handleSaveNewClinic = async() => {
    let res =await userService.createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new clinic success!')
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        address:''
      })
    } else {
      toast.error('Add new clinic error')
    }
    // console.log(this.state)
    }
  render() {
   
      return (
          <div className="manage-specialty-container">
              <div className="ms-title">Quản lý Phòng khám</div>
              <div className="btn-add-new-specialty row">
                  <div className="col-6 form-group">
                      <label>Tên phòng khám</label>
                      <input className="form-control" type="text" value={this.state.name} onChange={(event)=>this.handleOnChangeInput(event,'name')}/>
                  </div>
                    <div className="col-6 form-group">
                      <label>Ảnh phòng khám</label> 
                      <input className="form-control-file" type="file" onChange={(event)=>this.handleOnChangImage(event)}/>
                  </div>
            <div className="col-6 form-group">
              <label>Địa chỉ phòng khám</label>
              <input className="form-control" type="text" value={this.state.address} onChange={(event)=>this.handleOnChangeInput(event,'address')}/>

                   </div>
              </div>
              <div className="all-specialty">
             <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
                  />
                  <div className="col-12">
                      <button className="btn-save-specialty" onClick={()=>this.handleSaveNewClinic()}>Save</button>
                  </div>
              </div>
           
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
