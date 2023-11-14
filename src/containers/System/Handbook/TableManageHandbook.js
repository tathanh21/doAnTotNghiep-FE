import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}
class TableManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Handbooks: [],
    };
  }
 componentDidMount() {
    this.props.fetchHanbookRedux();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.listHandbook !== this.props.listHandbook) {
      this.setState({
        Handbooks: this.props.listHandbook,
      });
    }
  }
  handleDeleteHandbook = (handbook) => {
    this.props.deleteHandbooledux(handbook.id);
  };
  handleEditHandbook = (user) => {
    this.props.handleEditHandbookFromParentKey(user);
  };
  render() {
    let arrHandbook = this.state.Handbooks;
    // return
    return (
      <>
        <table className="container mt-5" id="customers">
          <tbody>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Action</th>
            </tr>
            {arrHandbook &&
              arrHandbook.length > 0 &&
              arrHandbook.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                  
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditHandbook(item)}
                      >
                        <i className="fas fa-user-edit"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteHandbook(item)}
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
    listHandbook: state.admin.allHandbooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHanbookRedux: () => dispatch(actions.fetchAllHandbookSuccess()),
    deleteHandbooledux: (id) => dispatch(actions.deleteHandbook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandbook);
