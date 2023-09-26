import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss"
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
class DetailClinic extends Component {
    constructor(props){
    super(props)
    this.state={
      arrDoctorId: [],
      dataClinic: {},
    }
    }
   async componentDidMount(){
     if (this.props.match && this.props.match.params && this.props.match.params.id) {
       let id = this.props.match.params.id;
       let res = await userService.getAllDetailClinicById(({
         id: id,
       }))
       if (res && res.errCode === 0 ) {
         let data = res.data;
         let arrDoctorId = [];
         if (data && !_.isEmpty(res.data)) {
           let arr = data.doctorClinic;
           if (arr && arr.length >0) {
             arr.map(item => {
                arrDoctorId.push(item.doctorId)
              })
           }
         }
        
         this.setState({
           dataClinic: res.data,
           arrDoctorId: arrDoctorId,
         })
       }
       }
    }
 async componentDidUpdate(prevProps, prevState, snapshot) {
   
  }
 
  render() {
    let { arrDoctorId, dataClinic } = this.state;
    let {language} = this.props;
      return (
          <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            <div className="desription-specialty">
              {dataClinic && !_.isEmpty(dataClinic)
                &&
              <div dangerouslySetInnerHTML={{__html:dataClinic.descriptionHTML}}>

            </div>
              }
          </div>
      
          {arrDoctorId && arrDoctorId.length > 0 && 
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
                      isShowLinkDetail={true}
                      isShowPrice={false}
                    />
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                    <DoctorSchedule
                    doctorIdFromParent={item}  
                      />
                    </div>
                    <div className="doctor-extra-info">
                    <DoctorExtraInfo
                    doctorIdFromParent={item}
                    />
                    </div>
               
            </div>
          </div>
                
            )
          })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
