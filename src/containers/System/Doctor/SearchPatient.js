import React, { Component } from "react";
import { connect } from "react-redux";
import "./SearchPatient.scss"
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import moment from 'moment';

class SearchPatient extends Component {
    constructor(props){
    super(props)
    this.state={
       message:'',
         email: '',
          patient: [],
    }
    }
   async componentDidMount(){
       
    }
 async componentDidUpdate(prevProps, prevState, snapshot) {
   
    }
handleEmail = (event) => {
        this.setState({
           email:event.target.value
       })
    }
    handle = async () => {
        let data = await userService.searchPatient(this.state.email);
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
    render() {
        let { message, patient } = this.state;
        console.log('check',patient);
      return (
          <div className="container">
              <div className="title">Tìm kiếm bệnh nhân</div>
              <div className="form-search"> </div>
              <div className="errMessage col-12"> {this.state.message }</div>
                  <div className="form-email col-12"><input placeholder="Nhập email của bệnh nhân" type="email" value={this.state.email} onChange={(event) => this.handleEmail(event)} />
              <button className="btn btn-primary" onClick={() => { this.handle() }}>Xác Nhận</button>
            </div>
            <div className="col-12 table-search-patient">
              <table  className="table" style={{width:'100%'}}>
                <tbody>
                  <tr className="">
                  <th>STT</th>
                   <th>Ngày khám bệnh</th>   
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Kết quả khám bệnh</th>
                  </tr>
                  {patient && patient.length > 0 ?
                    patient.map((item, index) => {
                    //   let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                    //   let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                          // Đảm bảo rằng item.patientData.date là timestamp hợp lệ
                     const timestamp = item.patientData.date;

                     // Chuyển đổi timestamp thành đối tượng moment
                   const dateMoment = moment(timestamp);

                      // Định dạng ngày tháng năm
                      const formattedDate = moment.unix(+timestamp / 1000).format('dddd - DD/MM/YYYY')
                      return (
                        <tr key={index}>
                              <td>{index + 1}</td>
                              
                              <td>{formattedDate}</td>
                           <td>{item.patientData.timeTypeDataPatient.valueVi}</td>

                          <td>{item.firstName}</td>
                          <td>{item.patientData.result}</td>
                            {/* <td>{item.statusDataPatient.valueVi}</td>
                           <td>{item.result}</td> */}
                          {/* <td className="btn">
                            <input type="text" value={this.state.result}
                                    onChange={(event) => this.handleOnChangeResult(event)}/>
                            <button className="mp-btn-result" onClick={() => this.handleBtnResult(item)}>Kết quả khám bệnh</button>
                            <br/>
                            <button className="mp-btn-confirm" onClick={() => this.handleBtnConfirm(item)}>Gửi kết quả khám bệnh</button> */}
                            {/* <button className="mp-btn-remedy" onClick={()=>this.handleBtnRemedy()}>Gửi hóa đơn</button> */}
                          {/* </td> */}
                    </tr>
                  )
                    })  
                    :
                    <tr>
                      <td colSpan='8' style={{textAlign:'center', color:'red',fontSize:'18px'}}></td>
                    </tr>
                }
                </tbody>
              </table>                      
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPatient);
