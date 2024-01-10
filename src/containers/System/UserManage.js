import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import userService from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser:false,
      isOpenModalEditUser: false,
      userEdit: {}
    };
  }

  async componentDidMount() {
    let reponse = await userService.getAllUser("ALL");
    if (reponse && reponse.errCode === 0) {
      this.setState({
        arrUser: reponse.users,
      });
    }
    console.log(reponse);
  }
handleAddNewUser=()=>{
this.setState({
  isOpenModalUser:true,
})
}
toggerUserModal = () => {
  this.setState({
      isOpenModalUser: !this.state.isOpenModalUser
  })
}
toggerEditUserModal = () => {
  this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser
  })
}
createNewUser=async(data)=>{
  try {
    let response = await userService.createNewUserService(data);
    if (response && response.errCode !== 0) {
        alert(response.errMessage)
    } else {
        await this.gettAllUserFromReact();
        this.setState({
            isOpenModalUser: false
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
    }
} catch (error) {
    console.log(error)
}
}
handleDeleteUser = async (user) => {
  console.log('CLick delete', user)
  try {
      let res = await userService.deleteUserService(user.id);
      if (res && res.errCode === 0) {
          await this.gettAllUserFromReact()
      } else {
          alert(res.message)
      }
  } catch (error) {
      console.log(error)
  }
}
handleEditUser = (user) => {
  console.log('Check edit user', user);
  this.setState({
      isOpenModalEditUser: true,
      userEdit: user
  })
}
doEditUser = async (user) => {
  try {
      let res = await userService.editUserService(user)
      if (res && res.errCode === 0) {
          this.setState({
              isOpenModalEditUser: false
          })
          this.gettAllUserFromReact()
      } else {
          alert(res.errCode)
      }
  } catch (error) {
      console.log(error)
  }
}

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="user-container">
         <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggerFromParent={this.toggerUserModal}
                    createNewUser={this.createNewUser}
                />
                  {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggerFromParent={this.toggerEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
        <div className="title text-center">Quản lý bệnh nhân</div>
        <div className="mx-1">
          <button className="btn btn-primary px-2" onClick={()=>this.handleAddNewUser()}>Thêm mới bệnh nhân</button>
        </div>
        <div className="users-table mt-3 mx-2">
          <table id="customers">
            <tr>
              <th className="text-center">Email</th>
              <th className="text-center">Họ bệnh nhân</th>
              <th className="text-center">Tên bệnh nhân</th>
              <th className="text-center">Địa chỉ</th>
              <th className="text-center">Hành động</th>
            </tr>
            {arrUser &&
              arrUser.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-user-edit"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
