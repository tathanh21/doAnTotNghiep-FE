import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import userService from '../../../services/userService';
import { withRouter } from 'react-router';
import './Handbook.scss';
class Handbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbook: []
        }
    }
    async componentDidMount() {
        let res = await userService.getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }

    }
    handleViewDetailDoctor = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`)
        }
    }
    render() {
        let { dataHandbook } = this.state;
        console.log('check iamg',dataHandbook)
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={"homepage.specialty"} /></span>
                        <button className='btn-section'><FormattedMessage id={"homepage.more-info"} /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandbook && dataHandbook.length > 0
                                && dataHandbook.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index} onClick={() => { this.handleViewDetailDoctor(item) }}>
                                            <div className='bg-image section-specialty' style={{ background: `url(${item.image})` }} />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
