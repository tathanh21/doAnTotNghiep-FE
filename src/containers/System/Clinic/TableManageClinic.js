import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";


class TableManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clinics: [],
    };
  }
 componentDidMount() {
    this.props.fetchClinicRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.listClinics !== this.props.listClinics) {
      this.setState({
        Clinics: this.props.listClinics,
      });
    }
  }
  handleDeleteClinic = (clinic) => {
    this.props.deleteClinicRedux(clinic.id);
  };
  handleEditClinic = (clinic) => {
    this.props.handleEditClinicFromParentKey(clinic);
  };
  render() {
    let Clinics = this.state.Clinics;
    // return
    return (
      <>
        <table className="container mt-5" id="customers">
          <tbody>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Action</th>
            </tr>
            {Clinics &&
              Clinics.length > 0 &&
              Clinics.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                  
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditClinic(item)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteClinic(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listClinics: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinicSuccess()),
    deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
