import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import logo from '../../assets/logo.svg'
import './HomeFooter.scss'
class HomeFooter extends Component {
    render() {

        return (
            <div className='home-footer'>
                <div className='footer-top'>
                    <div className='row mt-6'>
                        <div className='col-6 footer-left'>
                            <div>
                                <img src={logo} width={'150px'} />
                            </div>
                            <p>Công ty cổ phần công nghệ Booking Care</p>
                            <p><i class="fas fa-map-marker"></i> Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                            <p><i class="fas fa-check"></i> ĐKKD số. 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
                            <p>Văn phòn ở Hồ Chí Minh</p>
                            <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
                            <p>Hỗ trợ khách hàng</p>
                            <p>support@bookingcare.vn (7h - 18h)</p>
                            <p>Hotline: <span className='phone-footer'>024-7301-2468</span>(7h - 18h)</p>
                        </div>
                        <div className='col-3 footer-center'>
                            <ul>
                                <li>Liên kết hợp tác</li>
                                <li>Danh bạ y tế</li>
                                <li>Sức khỏe doanh nghiệp</li>
                                <li>Gói chuyển đổi số doanh nghiệp</li>
                                <li>Tuyển dụng</li>
                                <li>Câu hởi thường gặp</li>
                                <li>Điều khoản sử dụng</li>
                                <li>Chính sách bảo mật</li>
                                <li>Quy trình hỗ trợ giải quyết khiếu nại</li>
                                <li>Quy chế hoạt động</li>
                          </ul>
                        </div>
                        <div className='col-3 footer-right'>
                            <h4>Đối tác bảo trợ nội dung</h4>
                            <h5>Hello Doctor</h5>
                            <p>Bảo trợ chuyên mục nội dung</p>
                            <span>"Sức khỏe tinh thần"</span>
                            <br />
                            <h5>Hệ thống y khoa chuyên sâu</h5>
                            <p>Bảo trợ chuyên mục nội dung</p>
                            <span>"Y khoa chuyên sâu"</span>

                        </div>

                    </div>
                </div>
                <div className='footer-bottom'>
                <h4>Công ty Cổ phần Công nghệ BookingCare</h4>
                    <span><i class="fas fa-map-marker-alt"></i></span> 54 P. Triều Khúc, Thanh Xuân Nam, Thanh Xuân, Hà Nội
                    <p>&copy; 2023 Nguyen Tat Thanh. <a href='#'>More Infomation, </a></p>
                </div>
                    {/* <a><img src='https://bookingcare.vn/assets/icon/bookingcare-2020.svg'></img></a> */}
                   
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
