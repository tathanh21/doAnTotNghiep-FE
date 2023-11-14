import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Specialties: [],
    };
  }
 componentDidMount() {
    this.props.fetchSpeciatyRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.listSpecialties !== this.props.listSpecialties) {
      this.setState({
        Specialties: this.props.listSpecialties,
      });
    }
  }
  handleDeleteSpecialty = (specialty) => {
    this.props.deleteSpecialtyRedux(specialty.id);
  };
  handleEditSpecialty = (specialty) => {
    this.props.handleEditSpecialtyFromParentKey(specialty);
  };
  render() {
    let arrSpecialty = this.state.Specialties;
    // return
    return (
      <>
        <table className="container mt-5" id="customers">
          <tbody>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Action</th>
            </tr>
            {arrSpecialty &&
              arrSpecialty.length > 0 &&
              arrSpecialty.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                  
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditSpecialty(item)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteSpecialty(item)}
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
    listSpecialties: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeciatyRedux: () => dispatch(actions.fetchAllSpecialtySuccess()),
    deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialty(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
