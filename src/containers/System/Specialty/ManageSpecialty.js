import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss"
import userService from "../../../services/userService";
import { LANGUAGES,CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props){
    super(props)
    this.state={
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown:''
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
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImgUrl: objectUrl,
        imageBase64: base64,
      });
    }
    };
  handleSaveNewSpecialty = async() => {
    let res =await userService.createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new specialty success!')
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown:''
      })
    } else {
      toast.error('Add new specialty error')
    }
    // console.log(this.state)
    }
  render() {
   
      return (
          <div className="manage-specialty-container">
              <div className="ms-title">Quản lý chuyên khoa</div>
              <div className="btn-add-new-specialty row">
                  <div className="col-6 form-group">
                      <label>Tên chuyên khoa</label>
                      <input className="form-control" type="text" value={this.state.name} onChange={(event)=>this.handleOnChangeInput(event,'name')}/>
                  </div>
                    <div className="col-6 form-group">
                      <label>Ảnh chuyên khoa</label> 
                      <input className="form-control-file" type="file" onChange={(event)=>this.handleOnChangImage(event)}/>
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
                      <button className="btn-save-specialty" onClick={()=>this.handleSaveNewSpecialty()}>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
