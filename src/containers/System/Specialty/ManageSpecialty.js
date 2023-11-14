import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss"
import userService from "../../../services/userService";
import { LANGUAGES,CommonUtils, CRUD_ACTION } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import TableManageSpecialty from "./TableManageSpecialty";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props){
    super(props)
    this.state={
        name: '',
        imageBase64: '',
        descriptionHTML: '',
      descriptionMarkdown: '',
        action:CRUD_ACTION.CREATE
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
        image: base64,
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
   handleEditSpecialtyFromParentKey=(item)=> {
    this.setState({
      id:item.id,
      name: item.name,
      image: item.image,
      descriptionHTML: item.descriptionHTML,
      descriptionMarkdown: item.descriptionMarkdown,
      action:CRUD_ACTION.EDIT
    })
      
  }
    handleUpdateSpecialty=async(data)=>{
    try {
       console.log('check id',data)
      let res = await userService.editSpecialtyService(data)
      if (res && res.errCode === 0) {
          toast.success('update thành công!')
      } else {
       toast.error('update thất bại!')
      }
  } catch (error) {
      console.log(error)
  } 
}
  render() {
       let { action } = this.state;

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
              <button className={action === "CREATE" ? "btn-save-specialty" : "btn-edit-specialty"} onClick={action ==="CREATE" ?() => this.handleSaveNewSpecialty():() => this.handleUpdateSpecialty(this.state)}>{action === "CREATE" ? "CREATE":"UPDATE" }</button>
                  </div>
              </div>
       <TableManageSpecialty handleEditSpecialtyFromParentKey={this.handleEditSpecialtyFromParentKey} />

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
