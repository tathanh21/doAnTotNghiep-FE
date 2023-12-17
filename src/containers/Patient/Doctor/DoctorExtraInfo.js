import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss"
import HomeHeader from "../../HomePage/HomeHeader";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from "react-intl";
class DoctorExtraInfo extends Component {
    constructor(props){
    super(props)
    this.state={
      isShowDetailInfo: false,
      extraInfo:{}
    }
    }
   async componentDidMount(){
        let res = await userService.getExtraInfoById(this.props.doctorIdFromParent)
    //  console.log('abc',res)
     if (res && res.errCode === 0) {
       this.setState({
         extraInfo: res.data
       })
     }
    }
 async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) { }
   if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) { 
     let res = await userService.getExtraInfoById(this.props.doctorIdFromParent)
    //  console.log('abc',res)
     if (res && res.errCode === 0) {
       this.setState({
         extraInfo: res.data
       })
     }
      }
    }
    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo:status
        })
    }
  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;
    return (
      <div className="doctor-extra-info-container">
            <div className="content-up">
                <div className="text-address"><FormattedMessage id="patient.extra-info-doctor.text-address"/></div>
          <div className="name-clinic">{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic:"" }</div>
                <div className="detail-address">{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic:"" }</div>
            </div>
            <div className="content-down">
                {isShowDetailInfo === false ?
                    <div className="short-info">
                        <span onClick={()=>this.showHideDetailInfo(true)}><FormattedMessage id="patient.extra-info-doctor.detail"/></span>
                    </div>
                    :
                    <>
                        <div className="detail-info">
                            <div className="price">
                                <span className="left"><FormattedMessage id="patient.extra-info-doctor.price"/></span>
                  <span className="right">{extraInfo && extraInfo.priceData && language === LANGUAGES.VI ?
                             <NumericFormat
                                    className='currency'
                                    value={extraInfo.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                />
                    :  <NumericFormat
                                    className='currency'
                                    value={extraInfo.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' $'}
                                />}</span>
                            </div>
                        </div>
              <div className="note">
                {extraInfo && extraInfo.note?extraInfo.note:""}
                        </div>
                        <div className="payment">
                <FormattedMessage id="patient.extra-info-doctor.payment" />
                {extraInfo && extraInfo.paymentData && language=== LANGUAGES.VI ? extraInfo.paymentData.valueVi:extraInfo.paymentData.valueEn }
                        </div>
                        <div className="hide-price">
                            <span onClick={() => this.showHideDetailInfo(false)}><FormattedMessage id="patient.extra-info-doctor.hide-price"/></span>
                        </div>
                    </>
                  
                }
            </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
