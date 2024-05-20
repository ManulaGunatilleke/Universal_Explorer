import React from "react";
import '../Index/index.css';
import indexpic2 from '../../assets/images/Index_img/indexpic2.jpg';
import logo from '../../assets/images/Index_img/logo.jpg';

export default function Index() {
    return (
        <div className="index_bg">
            <div className="name">
                <h1>Universal Explorer</h1>
            </div>
            <br/>
            <div className="IndexSecondDiv">
                <div className="IndexPicDiv">
                    <img src={indexpic2} className="indexpic" alt="index-pic" />
                </div>
                <div className="IndexPicPara">
                    <img src={logo} className="logoIndex" alt="logo" />
                    <div className="he1">
                        <p>Nasa API Services</p>
                    </div>
                    <div className="he2">
                        <p>"You can explore the Universe with one Click"</p>
                    </div>
                    <div className="he3">
                        <p onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/`;
                        }}>www.UniversalExplorer.lk</p>
                    </div>
                </div>
            </div>
            <br /><br />
            <button className="IndexBtn" onClick={(e) => {
                e.preventDefault();
                window.location.href = `/login`;
            }}>LOGIN</button> 
            <br /><br/>
            <p className='FNFooterBottom' style={{ color: "black" }}>
                © 2024 Universal Explorer All Rights Reserved.
            </p>
        </div>
    )
}
