import React, { Component } from "react";
import { connect } from "react-redux";
import "./Apointment.scss"
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import moment from "moment";
class Apointment extends Component {
    constructor(props){
    super(props)
        this.state = {
        message:'',
         email: '',
          patient: {},
      
    }
    }
   async componentDidMount(){
    //  if (this.props.match && this.props.match.params && this.props.match.params.id) {
    //    let id = this.props.match.params.id;
    //    let res = await userService.getAllDetailClinicById(({
    //      id: id,
    //    }))
    //    if (res && res.errCode === 0 ) {
    //      let data = res.data;
    //      let arrDoctorId = [];
    //      if (data && !_.isEmpty(res.data)) {
    //        let arr = data.doctorClinic;
    //        if (arr && arr.length >0) {
    //          arr.map(item => {
    //             arrDoctorId.push(item.doctorId)
    //           })
    //        }
    //      }
    //      this.setState({
    //        dataClinic: res.data,
    //        arrDoctorId: arrDoctorId,
    //        time: 
    //      })
    //    }
    //    }
    // if (dataTime && !_.isEmpty(dataTime)) {
    //   let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
    //   let date = language === LANGUAGES.VI ?
    //     moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
    //     moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
      
    //    return (`${time} - ${date}`)   
    // }
    }
    handleEmail=(event)=>{
        this.setState({
           email:event.target.value
       })
    }
    handle = async() => {
        let data = await userService.handleEmailPatientApi(this.state.email);
        if (data && data.errCode !== 0) {
            this.setState({
               message:data.errMessage
           })
        }
        if (data && data.errCode === 0) {
            this.setState({
                patient:data.patient
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
   
     }
 
    render() {
      console.log('abc',this.state.patient)
    let { message,patient } = this.state;
    let {language} = this.props;
      return (
          <div className="">
          <HomeHeader />
              <div className="row">
                  <div className="errMessage col-12">{this.state.message }</div>
                  <div className="form-email col-12"><input type="email" value={this.state.email} onChange={(event) => this.handleEmail(event)} />
                      <button onClick={()=>{this.handle()}}>Xác Nhận</button></div>
            <div className="infoPatient row container">
              <div className="col-12 titleIn">Thông tin lịch khám</div>
                      <div className="col-3">
                          <div className="avatar"></div>
                       <div className="time">
                       Ngày: {patient && patient.patientData && 
                    moment.unix(patient.patientData.date / 1000).format('dddd - DD/MM/YYYY')}
                  <p>Thời gian: { patient && patient.patientData && patient.patientData.timeTypeDataPatient && patient.patientData.timeTypeDataPatient.valueVi }</p>
                        </div>
                      </div>
                      <div className="col-4">
                          <div>Bệnh nhận: {patient.firstName }</div>
                <div>Trạng thái: {patient && patient.patientData && patient.patientData.statusDataPatient && patient.patientData.statusDataPatient.valueVi }</div>
                <div>Địa chỉ: { patient.address}</div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Apointment);
