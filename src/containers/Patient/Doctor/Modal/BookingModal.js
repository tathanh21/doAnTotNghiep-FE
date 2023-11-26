import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss"
import { FormattedMessage } from "react-intl";
import {  Modal } from 'reactstrap';
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import { LANGUAGES, dateFormat } from "../../../../utils";
import Select from "react-select";
import userService from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment"

class BookingModal extends Component {
    constructor(props){
    super(props)
    this.state={
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthday: '',
      genders: '',
      doctorId:'',
      selectedGender: '',
      timeType:''
    }
    }
   async componentDidMount(){
       this.props.getGender()
  }
  buidDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map(item => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap
        result.push(object);
      })
    }
    return result;
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
       this.setState({
       genders:this.buidDataGender(this.props.genders)
     })
   }
   if (this.props.genders !== prevProps.genders) {
     this.setState({
       genders:this.buidDataGender(this.props.genders)
     })
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
       console.log(this.props.dataTime)
       let doctorId = this.props.dataTime.doctorId;
        this.setState({
          doctorId: doctorId,
          timeType:this.props.dataTime.timeType
        })
      }
    }
  }
  handleOnChangeInput=(event, id)=>{
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy
    })
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday:date[0]
    })
  }
   handleChangeSelect = (selectedOption) => {
      this.setState({selectedGender:selectedOption})
  }
  handleConfirmBooking = async () => {
    // console.log('check...',this.state)
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildDataBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let res = await userService.postPatientBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday:date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName:doctorName
    })
    if (res && res.errCode === 0) {

      toast.success('Booking a new appointment success!');
      this.props.closeBookingModal()
    } else {
      toast.error('Booking a new appointment error!')
    }
  }
    buildDataBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      let date = language === LANGUAGES.VI ?
        moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
        moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
      
       return (`${time} - ${date}`)   
    }
   return ""
  }
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGES.VI ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` :`${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
       return name
    }
   return ""
  }
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId=dataTime.doctorId
    }
    return (
          <div>
              <Modal isOpen={isOpenModal} toggle={""} className={'booking-modal-container'} size="lg" centered backdrop={true}>
                  <div className="booking-modalcontent">
                  <div className="booking-modal-header">
                          <span className="left"><FormattedMessage id="patient.booking-modal.title"/></span>
                <span className="right"
                onClick={closeBookingModal}
                ><i className="fas fa-times"></i></span>
                  </div>
                  <div className="booking-modal-body">
                {/* {JSON.stringify(dataTime)} */}
                <div className="doctor-info">
                  <ProfileDoctor
                    doctorId={doctorId}
                    isShowDescriptionDoctor={false}
                  dataTime={dataTime}
                   isShowLinkDetail={false}
                isShowPrice={true}
                /> 
               
                </div>
                <div className="price">

                </div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label><FormattedMessage id="patient.booking-modal.fullName"/></label>
                  <input className="form-control"
                  value={this.state.fullName}
                  onChange={(event)=>this.handleOnChangeInput(event,'fullName')}
                  ></input>
                  </div>
                   <div className="col-6 form-group">
                    <label><FormattedMessage id="patient.booking-modal.phoneNumber"/></label>
                  <input className="form-control"
                  value={this.state.phoneNumber}
                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                  ></input>
                  </div>
                   <div className="col-6 form-group">
                    <label><FormattedMessage id="patient.booking-modal.email"/></label>
                  <input className="form-control"
                    value={this.state.email}
                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                  ></input>
                  </div>
                   <div className="col-6 form-group">
                    <label><FormattedMessage id="patient.booking-modal.address"/></label>
                  <input className="form-control"
                    value={this.state.address}
                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                  ></input>
                  </div>
                   <div className="col-12 form-group">
                    <label><FormattedMessage id="patient.booking-modal.reason"/></label>
                  <input className="form-control"
                   value={this.state.reason}
                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                  ></input>
                </div>
                   <div className="col-6 form-group">
                    <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
                       <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                            // minDate={new Date().setHours(0,0,0,0)}
                        />
                  </div>
                   <div className="col-6 form-group">
                    <label><FormattedMessage id="patient.booking-modal.gender"/></label>
                  <Select
                    value={ this.setState.selectedGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                  </div>
                </div>
                  </div>
                  <div className="booking-modal-footer">
                          <button className="btn-booking-confirm" onClick={()=>this.handleConfirmBooking()}><FormattedMessage id="patient.booking-modal.btnConfirm"/></button>
                          <button className="btn-booking-cancel"  onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.cancel"/></button>
                      </div>
                      </div>
              </Modal>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders:state.admin.genders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender:()=>dispatch(actions.fetchGenderStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
