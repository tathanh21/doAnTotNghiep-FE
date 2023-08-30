import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss"
import HomeHeader from "../../HomePage/HomeHeader";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import Localization from "moment/locale/vi";
import { times } from "lodash";
class DoctorSchedule extends Component {
    constructor(props){
    super(props)
    this.state={
        allDays: [],
        allAvailableTime:[]
    }
    }
   async componentDidMount(){
       let { language } = this.props;
       console.log('moment vie:', moment(new Date()).format('dddd - DD/MM'));
       console.log('moment en:', moment(new Date()).locale('en').format("ddd - DD/MM"));

       let arrDate = [];
       for (let i = 0; i < 7; i++){
           let object = {};
           if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
           } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
           }
           object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
           arrDate.push(object)
       }
       let res= userService.getScheduleByDate()
       this.setState({
           allDays:arrDate
       })
    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if (this.props.language !== prevProps.language) {
            let arrDate = [];
       for (let i = 0; i < 7; i++){
           let object = {};
           if (this.props.language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
           } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
           }
           object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
           arrDate.push(object)
       }
       this.setState({
           allDays:arrDate
       })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent  !== -1 ) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await userService.getScheduleByDate(doctorId, date);
            console.log(res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime:res.data?res.data:[]
                })
            }
        }
   }
  render() {
      let { allDays, allAvailableTime } = this.state;
      let { language } = this.props;
    return (
      <div className="doctor-schedule-container">
            <div className="all-schedule">
                <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                    {allDays && allDays.length > 0 &&
                        allDays.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>{item.label}</option>
                        )
                    })}
               </select>
            </div>
            <div className="all-available-time">
                <div className="text-calendar">
                    <i className="fas fa-calendar-alt"><span>Lịch Khám</span></i>
                </div>
                <div className="time-content">
                    {allAvailableTime && allAvailableTime.length > 0 ?
                        allAvailableTime.map((item, index) => {
                            let timeDispplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn; 
                            return (
                                <button key={index}>{timeDispplay}</button>
                        )
                        })
                        :
                        <div>Bác sĩ không có lịch hẹn trong thời gian này, vui lòng lựa chọn thời gian khác</div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
