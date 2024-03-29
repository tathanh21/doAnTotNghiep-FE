import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss"
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props){
    super(props)
    this.state={
      currentDate: moment(new Date()).add(0, 'days').startOf('day').valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
      result: "",
       resultByRow: [],
    }
  }
  
  async componentDidMount() {
   
     this.getDataPatient()  
  }
  getDataPatient = async () => {
      let { user } = this.props;
     let { currentDate } = this.state;
     let formatedDate = new Date(currentDate).getTime();
     let res = await userService.getAllPatientForDoctor({
       doctorId: user.id,
       date:formatedDate, 
     })
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient:res.data
      })
    }
  }
  
  
 async componentDidUpdate(prevProps, prevState, snapshot) {
   
  }
     handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate:date[0]
        }, async() => {
         await this.getDataPatient()
        })
  }
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName:item.patientData.firstName
    }
    this.setState({
      isOpenRemedyModal: true,
      dataModal:data
    })
  }
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal:{}
    })
  }
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true
    })
    let res = await userService.postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName:dataModal.patientName
    })
    if (res && res.errCode === 0) {
       this.setState({
      isShowLoading: false
    })
      toast.success('Send Remedy Success!')
      this.closeRemedyModal()
      await this.getDataPatient();
    } else {
       this.setState({
      isShowLoading: false
    })
      toast.error('Something wrong!');
      console.log('err',res)
    }
  }
   handleOnChangeResult = (event,index) => {
       // Tạo một bản sao của mảng resultByRow để tránh biến đổi trạng thái trực tiếp
  const resultByRowCopy = [...this.state.resultByRow];
  // Cập nhật kết quả cho chỉ số hàng cụ thể
  resultByRowCopy[index] = event.target.value;

  this.setState({
    resultByRow: resultByRowCopy,
  });
    }
  handleBtnResult = async (dataResult) => {
    console.log('abc', this.state.resultByRow[0]);
   let dataResultService={
       doctorId: dataResult.doctorId,
       patientId: dataResult.patientId, 
       timeType: dataResult.timeType,
       date: dataResult.date,
       result:this.state.resultByRow[0]
    }
    console.log("check data",dataResultService);
     let res = await userService.postResult(dataResultService)
    console.log('check res',res);
  }
  render() {
    let { dataPatient,isOpenRemedyModal,dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
           <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text='Loading....'
      >
           <div className="manage-patient-container">
              <div className="m-p-title font-weight-bold mt-3" style={{ fontSize: '20px' }}>Quản lý bệnh nhân khám bệnh</div>
              <div className="manage-patient-body row">
                  <div className="col-2 form-group">
                      <label>Chọn ngày khám</label>
                       <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                  </div>
                  <div className="col-12 table-manage-patient">
              <table  className="table" style={{width:'100%'}}>
                <tbody>
                  <tr className="">
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                      <th>Giới tính</th>
                       <th>Trạng thái</th>
                      <th>Kết quả khám bệnh</th>
                      <th>Hành Động</th>
                    {/* <th>Action</th> */}
                  </tr>
                  {dataPatient && dataPatient.length > 0 ?
                    dataPatient.map((item, index) => {
                      let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                      let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;

                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{time}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.address}</td>
                          <td>{gender}</td>
                            <td>{item.statusDataPatient.valueVi}</td>
                           <td>{item.result}</td>
                          <td className="btn">
                            <input type="text" value={this.state.resultByRow[index] || ''} onChange={(event) => this.handleOnChangeResult(event,index)}/>
                            <button className="mp-btn-result" onClick={() => this.handleBtnResult(item)}>Kết quả khám bệnh</button>
                            <br/>
                            <button className="mp-btn-confirm" onClick={() => this.handleBtnConfirm(item)}>Gửi kết quả khám bệnh cho bệnh nhân</button>
                            {/* <button className="mp-btn-remedy" onClick={()=>this.handleBtnRemedy()}>Gửi hóa đơn</button> */}
                          </td>
                    </tr>
                  )
                    })  
                    :
                    <tr>
                      <td colSpan='8' style={{textAlign:'center', color:'red',fontSize:'18px'}}>Chưa có dữ liệu của bệnh nhân, vui lòng kiểm tra lại!</td>
                    </tr>
                }
                </tbody>
              </table>                      
                  </div>
              </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
        />
     </LoadingOverlay>

        </>
       
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
