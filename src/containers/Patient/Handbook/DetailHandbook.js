import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandbook.scss"
import userService from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash";
class DetailSpecialty extends Component {
    constructor(props){
    super(props)
    this.state={
     
      dataDetailHandbook: {}
    }
    }
   async componentDidMount(){
     if (this.props.match && this.props.match.params && this.props.match.params.id) {
       let id = this.props.match.params.id;
       let res = await userService.getAllDetailHandbookById(({
         id: id,
       }))
       if (res && res.errCode === 0) {
         this.setState({
           dataDetailHandbook: res.data,
         })
       }
       }
    }
 async componentDidUpdate(prevProps, prevState, snapshot) {
   
  }
 
  render() {
    let { dataDetailHandbook } = this.state;
    // let img= dataDetailHandbook.image
    // console.log('chekc img',dataDetailHandbook.image)
    let {language} = this.props;
      return (
          <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            <div className="img-header">
              <img src={dataDetailHandbook.image}></img>
            </div>
            <div className="desription-specialty">
              {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                &&
              <div dangerouslySetInnerHTML={{__html:dataDetailHandbook.descriptionHTML}}>

            </div>
              }
          </div>
          </div>
        
        <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
