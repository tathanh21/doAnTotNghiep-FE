import React, { Component } from "react";
import { connect } from "react-redux";
import "./VerifyEmail.scss"
// import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import userService from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
class VerifyEmail extends Component {
    constructor(props){
    super(props)
    this.state={
      statusVerify: false,
      errCode:''
    }
    }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
        const urlParam = new URLSearchParams(this.props.location.search);
       const token = urlParam.get('token');
      const doctorId = urlParam.get('doctorId');
      let res = await userService.postVertifyBookingAppointment({
        token: token,
        doctorId:doctorId
      })
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode:res.errCode
        })
      } else {
         this.setState({
          statusVerify: true,
          errCode:res && res.errCode ? res.errCode:-1
        })
      }
    }
     
    }
 async componentDidUpdate(prevProps, prevState, snapshot) {
   
    }
  render() {
    let { statusVerify,errCode } = this.state;
      return (
        <div>
          <HomeHeader />
            <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            Loading data ...
                        </div> :
                        <div>
                            {+errCode === 0 ?
                                <div className='info-booking'>Xác nhận lịch hẹn thành công!</div> :
                                <div className='info-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                            }
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
