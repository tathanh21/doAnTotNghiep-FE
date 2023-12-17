import React, { Component } from "react";
import { connect } from "react-redux";
import "./Apointment.scss"
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
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
              message:'',
                patient:data.patient
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
   
     }
  cancelBooking = async (patient) => {
    let dataPatient = {
      email:patient.email,
      doctorId:patient.patientData.doctorId,
      patientId:patient.patientData.patientId,
      timeType:patient.patientData.timeType,
    }
    // console.log('abc',dataPatient)
    let data =await userService.handleCancelBookingPatientApi(dataPatient)
         if (data && data.errCode === 0) {
            this.setState({
               message:data.errMessage
           })
         } 
         else  {
             this.setState({
               message:''
           })     
        }
 }
    render() {
      // console.log('abc',this.state.patient)
    let { message,patient } = this.state;
    let {language} = this.props;
      return (
          <div className="">
          <HomeHeader />
              <div className="row">
                  <div className="errMessage col-12"> {this.state.message }</div>
                  <div className="form-email col-12"><input placeholder="Nhập email của bạn" type="email" value={this.state.email} onChange={(event) => this.handleEmail(event)} />
              <button className="btn btn-primary" onClick={() => { this.handle() }}>Xác Nhận</button></div>
            
            <div className="infoPatient col-12 container">
              { patient && patient.id  &&  <div className="content">
                <div className="content-header">
                      Thông tin lịch khám
                </div>
                <div className="content-center">
                  <div className="center-left">
                             <div className="time">
                      <span className="bolda">Ngày khám bệnh: </span>  {patient && patient.patientData && 
                    moment.unix(patient.patientData.date / 1000).format('dddd - DD/MM/YYYY')}
                  <p>  <span className="bolda">Thời gian khám bệnh: </span>  { patient && patient.patientData && patient.patientData.timeTypeDataPatient && patient.patientData.timeTypeDataPatient.valueVi }</p>
                        </div>
                  </div>
                  <div className="center-right">
                     <div className="col-12">
                          <div> <span className="bolda">Tên bệnh nhận: </span>  {patient.firstName }</div>
                <div>  <span className="bolda">Trạng thái khám của bệnh nhân: </span>  {patient && patient.patientData && patient.patientData.statusDataPatient && patient.patientData.statusDataPatient.valueVi }</div>
                <div>  <span className="bolda">Địa chỉ của bệnh nhân: </span>  { patient.address}</div>
                        </div>
                   </div>
                </div>
                {patient && patient.patientData && patient.patientData.statusId !=="S4" &&  <div> 
                  <button onClick={()=>this.cancelBooking(patient)} className="btn btn-danger" style={{margin:'5px 0'}}>Hủy</button>
                </div>}
               
             </div>
              }
            
                     
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
