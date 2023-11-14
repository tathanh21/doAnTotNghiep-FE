import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageHandbook.scss"
import userService from "../../../services/userService";
import { LANGUAGES,CommonUtils, CRUD_ACTION } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import TableManageHandbook from "./TableManageHandbook";
import actionTypes from "../../../store/actions/actionTypes";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
    constructor(props){
    super(props)
      this.state = {
        id:'',
        name: '',
        image: '',
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
  handleSaveNewHandbook = async () => {
    let res = await userService.createNewHandbook(this.state);
    // console.log('check res', this.state)
    // return
    if (res && res.errCode === 0) {
      toast.success('Add new handbook success!')
      this.setState({
        name: '',
        image: '',
        descriptionHTML: '',
        descriptionMarkdown:''
      })
    } else {
      toast.error('Add new handbook error')
    }
    // console.log(this.state)
  }
  handleEditHandbookFromParentKey=(item)=> {
    this.setState({
      id:item.id,
      name: item.name,
      image: item.image,
      descriptionHTML: item.descriptionHTML,
      descriptionMarkdown: item.descriptionMarkdown,
      action:CRUD_ACTION.EDIT
    })
      
  }
  handleUpdateHandbook=async(data)=>{
    try {
       console.log('check id',data)
      let res = await userService.editHandbookService(data)
      if (res && res.errCode === 0) {
          toast.success('update thành công!')
      } else {
       toast.error('update thất bại!')
      }
  } catch (error) {
      console.log(error)
  } 
}
  // fillDataEdit(item) {
  //   this.setState({
  //     name: item.name,
  //     image: item.image,
  //     descriptionHTML: item.descriptionHTML,
  //     descriptionMarkdown:item.descriptionMarkdown
  //   })
  // }
  render() {
    let { action } = this.state;
      return (
          <div className="manage-handbook-container">
              <div className="ms-title">Quản lý Cẩm nang</div>
          <div className="btn-add-new-handbook row">
             <input className="form-control" type="hidden" value={this.state.id}/>

                  <div className="col-6 form-group">
                      <label>Tên cẩm nang</label>
                      <input className="form-control" type="text" value={this.state.name} onChange={(event)=>this.handleOnChangeInput(event,'name')}/>
                  </div>
                    <div className="col-6 form-group">
                      <label>Ảnh cẩm nang</label> 
                      <input className="form-control-file" type="file" onChange={(event)=>this.handleOnChangImage(event)}/>
                  </div>
                   
              </div>
              <div className="all-handbook">
             <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
                  />
                  <div className="col-12">
              <button className={action === "CREATE" ? "btn-save-handbook" : "btn-edit-handbook"} onClick={action ==="CREATE" ?() => this.handleSaveNewHandbook():() => this.handleUpdateHandbook(this.state)}>{action === "CREATE" ? "CREATE":"UPDATE" }</button>
                  </div>
              </div>
          <TableManageHandbook handleEditHandbookFromParentKey={this.handleEditHandbookFromParentKey} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
