import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss"
// import { Redirect, Route, Switch } from "react-router-dom";
// import UserManage from "../containers/DetailDoctor/UserManage";
// // import UserRedux from '../containers/DetailDoctor/UserRedux';
// import UserRedux from "../containers/DetailDoctor/Admin/UserRedux";
// // import RegisterPackageGroupOrAcc from '../containers/DetailDoctor/RegisterPackageGroupOrAcc';
// import Header from "../containers/Header/Header";
// import ManageDoctor from "../containers/DetailDoctor/Admin/ManageDoctor";
import HomeHeader from "../../HomePage/HomeHeader";
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
class DetailDoctor extends Component {
    constructor(props){
    super(props)
    this.state={
       detailDoctor:{}
    }
    }
   async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
                let id=this.props.match.params.id;
                let res= await userService.getDetailInfoDoctor(id);
                if(res && res.errCode ===0){
                    this.setState({
                        detailDoctor:res.data
                    })
                }

        }
    }
    componentDidUpdate(prevProps,prevState,snapshot){

    }
  render() {
    let {detailDoctor}=this.state;
    let {language}=this.props;
    let nameEn='',nameVi='';
    if(detailDoctor && detailDoctor.positionData){
       nameVi=`${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
       nameVi=`${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <div>
        <HomeHeader isShowBanner={false}/>
        <div className="doctor-detail-container">
            <div className="intro-doctor">
                <div className="content-left"
                style={{backgroundImage:`url(${detailDoctor.image?detailDoctor.image:''})`}}>

                </div>
                <div className="content-right">
                    <div className="up">
                      {language === LANGUAGES.VI ? nameVi:nameEn}
                    </div>
                    <div className="down">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                        && <span>
                            {detailDoctor.Markdown.description}
                            </span>}
                    </div>
                </div>
            </div>
            <div className="schedule-doctor">

            </div>
            <div className="detail-infor-doctor">
                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                <div dangerouslySetInnerHTML={{__html:detailDoctor.Markdown.contentHTML}}>

                    </div>
                }
            </div>
            <div className="comment-doctor">

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
