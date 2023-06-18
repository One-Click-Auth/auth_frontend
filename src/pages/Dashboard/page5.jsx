import React,{useState} from 'react';
import smsicon from "./images/smsicon.svg";
import emailicon from "./images/emailicon.svg";
import Navbar from "./navbar";
const Page5 = () => {

   
  
    
    
  
    return (
        <div className='row'>
            <div className='col-2'><Navbar/></div>
            <div className='col-10'>
        <div className='page4-wrap' >
            <div className='container page4-container'>
                <div className='row p4-up'>
                    <div className='col-12'>
                        <h1>Passwordless Connections</h1>
                    </div>
                    <div className='col-12'>
                        <p>
                        Configure Passwordless Connections like SMS Login, Email Login and others so that you can let your users login without having to choose yet another password.
                        <span className='learn'><a className='learn-more' href='#'>Learn more</a></span>
                        </p>
                    </div>
                </div>
                <div className='p4-grid1 p4-2'>
                    <div className='p4-grid1'>
                        <ul className='p4-grid2'>
                            <li>
                                <div className='element-wrap'>
                                    <div className='ew-flex'>
                                        <div className='max-width'>
                                            <div className='ew-flex2'>
                                                <div>
                                                    <div className='sms-iconwrap'>
                                                        <img src={smsicon} alt='SMS_image'/>

                                                    </div>
                                                </div>
                                                <div className='ew-grid'>
                                                    <p>SMS</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='max-width d-flex align-centre'>
                                        <input className='mw-input' type="checkbox" id="switch-mw" /><label className='mw-label' for="switch-mw"></label>

                                        </div>

                                    </div>

                                </div>
                            </li>
                            <li>
                            <div className='element-wrap'>
                                    <div className='ew-flex'>
                                        <div className='max-width'>
                                            <div className='ew-flex2'>
                                                <div>
                                                    <div className='sms-iconwrap'>
                                                        <img src={emailicon} alt='SMS_image'/>

                                                    </div>
                                                </div>
                                                <div className='ew-grid'>
                                                    <p>Email</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='max-width d-flex align-centre'>
                                        <input className='mw-input' type="checkbox" id="switch-mw1" /><label className='mw-label' for="switch-mw1"></label>

                                        </div>

                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        </div></div>

        )
}

export default Page5