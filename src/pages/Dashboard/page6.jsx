import React,{useState} from 'react';
import featurebanner from "./images/feature-banner.svg";
import colorful from "./images/colorful.svg";
import createorg from "./images/createorg.svg";
import Navbar from "./navbar";

const Page6 = () => {

    return (
        <div className='row'>
            <div className='col-2'>
            <Navbar/>
            </div>
            <div className='col-10'>
        <div className='p5-wrap'>
            <div className='container p5-container'>
                <div className='p5-grid'>
                    <section className='p5-main1'>
                        <div className='p5-sub1'>
                            <h2>Auth0 Organizations</h2>
                            <p>Manage the organizations you do business with, and customize the experience their users have when accessing your applications.</p>
                            <div className='third-row'>
                                <div>
                                    <button className='button-learn'>Learn More</button>

                                </div>
                                <div></div>
                            </div>

                        </div>
                        <div className='p5-sub2'>
                            <img src={featurebanner} alt='features_banner_image'/>

                        </div>
                    </section>
                    <div className='p5-main2'></div>
                    <div className='p5-main3'>
                        <div className='p5m3-1'>
                            <div className='p5m3-2'>
                                <div className='p5m3-up'>
                                    <div className='p5m3-up1'>
                                        <h1>Organizations</h1>
                                    </div>
                                    <p className='up-text'>
                                        <div className='up-text-flx'>
                                            <div className='max-width'>
                                            Represent the teams, business customers, and partner companies that access your applications as organizations in Auth0.
                                            </div>
                                            <div className='max-width'>
                                                <div className='mw-down1'>
                                                    <div className='mwd1-img'>
                                                        <img src={colorful} alt='image'/>
                                                    </div>
                                                    <div className='mwd-2 max-width'>
                                                        <p>Want to use this feature in production? <a className='learn-more' href='#'>Upgrade Plan →</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </p>

                                </div>
                                <div className='p5m3-down' >
                                    <div className='p5m3-down-image'>
                                        <img src={createorg} alt='create_organization_image'/>
                                    </div>
                                    <div className='p5m3-down2'>
                                        <p>Represent the teams, business customers, and partner companies that access your applications as organizations in Auth0.</p>
                                        <div className='p5m3-down2-in'>
                                            <button className='viewbtn btn'> + Create Organization </button>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div></div></div>
        )
    }
    
    export default Page6