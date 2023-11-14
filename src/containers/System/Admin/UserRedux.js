import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import userService from "../../../services/userService";
import { LANGUAGES, CRUD_ACTION, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }
  async componentDidMount() {
    try {
      this.props.getGenderStart();
      this.props.getPositionStart();
      this.props.getRoleStart();
      //   let res = await userService.getAllCodeService("gender");
      //   if (res && res.errCode === 0) {
      //     this.setState({
      //       genderArr: res.data,
      //     });
      //   }
    } catch (error) {}
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let genderArrRedux = this.props.genderRedux;
      this.setState({
        genderArr: genderArrRedux,
        gender:
          genderArrRedux && genderArrRedux.length > 0
            ? genderArrRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let positionArrRedux = this.props.positionRedux;
      this.setState({
        positionArr: positionArrRedux,
        position:
          positionArrRedux && positionArrRedux.length > 0
            ? positionArrRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let roleArrRedux = this.props.roleRedux;
      // console.log(roleArrRedux);
      this.setState({
        roleArr: roleArrRedux,
        role:
          roleArrRedux && roleArrRedux.length > 0 ? roleArrRedux[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let genderArrRedux = this.props.genderRedux;
      let positionArrRedux = this.props.positionRedux;
      let roleArrRedux = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender:
          genderArrRedux && genderArrRedux.length > 0
            ? genderArrRedux[0].keyMap
            : "",
        role:
          roleArrRedux && roleArrRedux.length > 0 ? roleArrRedux[0].keyMap : "",
        position:
          positionArrRedux && positionArrRedux.length > 0
            ? positionArrRedux[0].keyMap
            : "",
        avatar: "",
        action: CRUD_ACTION.CREATE,
      });
    }
  }
  handleOnChangImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.toBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({ isOpen: true });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    // console.log(action);

    //fire redux create user
    if (action === CRUD_ACTION.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTION.EDIT) {
      // fire redux edit user
      // console.log(this.state.role);
      this.props.editUserRedux({
        id: this.state.userEditId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        roleId: this.state.role,
        positionId: this.state.position,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        avatar: this.state.avatar,
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert(`This input is required ${arrCheck[i]}`);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "123",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      role: user.roleId,
      position: user.positionId,
      avatar: "",
      previewImgUrl: imageBase64,
      action: CRUD_ACTION.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    let {
      genderArr,
      positionArr,
      roleArr,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      position,
      gender,
      role,
      avatar,
    } = this.state;
    let { language, isLoadingRedux } = this.props;
    // console.log("check props", this.props);
    return (
      <div className="user-redux-container">
        <div className="title">User</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isLoadingRedux === true ? "Loading Gender" : ""}
              </div>
              <div className="col-12 mb-3">
                <FormattedMessage id="manage-user.add" />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(event) => this.onChangeInput(event, "email")}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ? true : false
                  }
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                  disabled={
                    this.state.action === CRUD_ACTION.EDIT ? true : false
                  }
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                ></input>
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                ></input>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                  value={gender}
                >
                  {genderArr &&
                    genderArr.length > 0 &&
                    genderArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.roleId" />
                </label>

                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "position")}
                  value={position}
                >
                  {positionArr &&
                    positionArr.length > 0 &&
                    positionArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "role")}
                  value={role}
                >
                  {roleArr &&
                    roleArr.length > 0 &&
                    roleArr.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>

                <div className="preview-img-container">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangImage(event)}
                  />
                  <label htmlFor="previewImg" className="label-upload">
                    Tải Ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_ACTION.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTION.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <TableManageUser
          handleEditUserFromParentKey={this.handleEditUserFromParent}
          action={this.state.action}
        />
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingRedux: state.admin.isLoading,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),

    //     processLogout: () => dispatch(actions.processLogout()),
    //     changeLanguageAppRedux: (language) =>
    //       dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
