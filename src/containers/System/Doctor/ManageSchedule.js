import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTION, LANGUAGES,dateFormat } from "../../../utils";
import DatePicker from '../../../components/Input/DatePicker'
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import userService from "../../../services/userService";
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        // const currentDate = new Date();
        // currentDate.setHours(0,0,0,0)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangTime:[]
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
     componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dateSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
          listDoctors: dateSelect,
      });
         }
         if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
             let data = this.props.allScheduleTime;
             if (data && data.length > 0) {
                 data = data.map(item => ({...item,isSelected:false}))
             }
             
             this.setState({
                 rangTime:data
             })
         }
         
    // if (prevProps.language !== this.props.language) {
    //   let dateSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dateSelect,
    //   });
    // }
    }
     buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props.language;
    if (
      inputData &&
      inputData.length > 0 &&
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      })
    )
      return result;
    };
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor:selectedOption });
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate:date
        })
    }
    handleClickBtnTime = (time)=>{
        let { rangTime } = this.state;
        if (rangTime && rangTime.length > 0) {
            rangTime = rangTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                 return item;
            })
            this.setState({
                rangTime:rangTime
            })
        }
    }
    handleSaveSchedule = async() => {
        let result = [];
        let { rangTime, selectedDoctor, currentDate } = this.state;
        if (!currentDate) {
            toast.error('Invalid date!');
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid selected doctor!');
            return
        }
        // let formatedDate = moment(currentDate[0]).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(currentDate[0]).unix();
      let  formatedDate = new Date(currentDate[0]).getTime();

        // console.log('check date', formatedDate)
        if (rangTime && rangTime.length > 0) {
            let selectedTime = rangTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((time) => {
                let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = time.keyMap;
                    result.push(object)
                })
            } else {
                toast.error('Invalid selected time!');
                return;
            }
            // console.log('check time',result)
        }
        let response = await userService.saveBulkScheduleDoctor(
            {
                arrSchedule: result,
                doctorId: selectedDoctor.value,
                date: formatedDate
            });
        if (response && response.errCode===0) {
            toast.success('Thêm lịch hẹn bác sĩ thành công!')
        } else {
            toast.error("Error save")
        }
        
    }
    render() {
        let { rangTime } = this.state;
        let { language } = this.props;
    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">
                <FormattedMessage id="manage-schedule.title"/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <label><FormattedMessage id="manage-schedule.chooseDoctor"/></label>
                         <Select
                         value={this.state.selectedDoctor}
                         onChange={this.handleChangeSelect}
                         options={this.state.listDoctors}
                         />
                    </div>
                     <div className="col-6">
                        <label><FormattedMessage id="manage-schedule.chooseDate"/></label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                            minDate={new Date().setHours(0,0,0,0)}
                        />
                    </div>
                    <div className="col-12 pick-hour-container">
                        {rangTime && rangTime.length > 0 &&
                            rangTime.map((item, index) => {
                                return (
                                    <button className={ item.isSelected === true ?"btn btn-schedule active":"btn btn-schedule"} key={index}
                                    onClick={()=>this.handleClickBtnTime(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.valueVi:item.valueEn}
                                    </button>
                            )
                        })
                        }
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary btn-save-schedule"
                        onClick={()=>this.handleSaveSchedule()}
                        ><FormattedMessage id="manage-schedule.save" /></button>
                    </div>
                </div>
            </div>
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     allDoctors: state.admin.allDoctors,
      language: state.app.language,
    allScheduleTime:state.admin.allScheduleTime
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
         fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
