import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTION, LANGUAGES } from "../../../utils";
import userService from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      action: '',
      //save to info doctor
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: '',
      selectedProvince: '',
      selectedPayment: '',
      nameClinic: '',
      addressClinic: '',
      note:''
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getAllRequiredDoctorInfo();
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (
      inputData &&
      inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        })
      }
      if (type === 'PRICE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        })
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        })
      }
      return result;
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dateSelect = this.buildDataInputSelect(this.props.allDoctors,"USERS");
      this.setState({
        listDoctors: dateSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dateSelect = this.buildDataInputSelect(this.props.allDoctors,"USERS");
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
      let dataSelectedPrice = this.buildDataInputSelect(resPrice,'PRICE');
      let dataSelectedPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
      let dataSelectedProvince = this.buildDataInputSelect(resProvince,'PROVINCE');  
      this.setState({
          listDoctors:dateSelect,
      listPrice: dataSelectedPrice,
      listPayment: dataSelectedPayment,
      listProvince:dataSelectedProvince
    })
    
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let dateSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
      let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      this.setState({
        listDoctors: dateSelect,
        listPrice: dataSelectedPrice,
        listPayment: dataSelectedPayment,
        listProvince: dataSelectedProvince
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment:this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note:this.state.note

    });
  };
  handleChangeSelect = async(selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listProvince, listPrice } = this.state;
    let res = await userService.getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '',
        selectedPayment = '', selectedPrice = "", selectedProvince = '';
      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;
        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        selectedPayment = listPayment.find(item => {
          return item && item.value === paymentId
        })
         selectedPrice = listPrice.find(item => {
          return item && item.value === priceId
        })
         selectedProvince = listProvince.find(item => {
          return item && item.value === provinceId
        })

      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince:selectedProvince
      })
    }else {
         this.setState({
          contentHTML: "",
          contentMarkdown:"",
          description: "",
          hasOldData: false,
          addressClinic: "",
          nameClinic: "",
          note:""
      })
      }
  };
  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state }
    stateCopy[stateName] = selectedOption
    this.setState({
      ...stateCopy
    })
    console.log('selected onchange',selectedOption,name)
  }
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state }
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy
    });
  };
  render() {
    let { hasOldData } = this.state;
    console.log('check state',this.state)
    return (
      <div className="manage-doctor-container container">
        <div className="manage-doctor-title"><FormattedMessage id="admin.manage-doctor"/></div>
        <div className="more-info">
          <div className="content-left form-group">
            <label><FormattedMessage id="admin.select-doctor"/></label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder="chọn bác sĩ"
            />
          </div>
          <div className="content-right">
            <label><FormattedMessage id="admin.intro"/></label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event,'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.price"/></label>
             <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPrice}
              placeholder="Chọn giá khám"
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.payment"/></label>
           <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPayment}
              placeholder="Chọn phương thức thanh toán"
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.province"/></label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              placeholder="Chọn tỉnh thành"
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.nameClinic"/></label>
            <input className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
              name="nameClinic"
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.addressClinic"/></label>
            <input className="form-control"
             onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
              name="addressClinic"
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.note"/></label>
            <input className="form-control"
            onChange={(event) => this.handleOnChangeText(event, 'note')}
              name="note"
              value={this.state.note}
            />
          </div>
        </div>

        <div className="manage-doctor-edittor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={ hasOldData === true ?"save-content-doctor":"create-content-doctor"}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true?<FormattedMessage id="admin.save"/>:<FormattedMessage id="admin.add"/>}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfo:state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
