import React,{useState} from 'react';
import viewimg from "./images/viewplan.svg";
import iconi from "./images/iconi.svg";
import bannerimg from "./images/bannerimg.svg";
import learnimg from "./images/learnimg.svg";
import step1img from "./images/step1.svg";
import Navbar from "./navbar";

const Page4 = () => {


    return (

        <div className='row'>
            <div className='col-2'><Navbar/></div>
            <div className='col-10'>
            <main className='page3-wrap'>
                
                    <div className='top-notification'>
                        <div className='tn-wrap'>
                            <div className='tn-flex'>
                                <div className='tn tn-f1'>
                                        <img src={viewimg} alt='viewplan_img'/>
                                </div>
                                <div className='tn tn-f2'>
                                    <p>Thank you for signing up for Auth0! You have 20 days left in your trial to experiment with <a href="#">features that are not in the Free plan</a>. Like what you‘re seeing?<a href="#"> Please enter your billing information here</a>.</p>
                                </div>
                                <div className='tn-f3'>
                                    <button className='btn viewbtn'>View Plans</button>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className='p3-bottom-content container'>
                        <div className='bottom-grid'>

                            <div>
                                 <div className='bg-para1'>
                                    <h1> Getting Started</h1>
                                </div> 
                                </div>

                                <div className='bg-para2'>
                                    <div className='bgp2-grid'>
                                        <div className='new-bg-para'>
                                            <div className='new-icon'>
                                                <img className='i-icon' src={iconi} alt='i-icon_img'/>

                                            </div>
                                            <div className='new-txt'>
                                                <div className='nt1'>New to Auth0?</div>
                                                <div className='nt2'>
                                               Try the 4 step guide to get started.<a href='#'> Start the guide</a>.
                                                </div>
                                            </div>
                                        </div>


                                        <section className='section-integrate'>

                                            <div className='sectioncontent-left'>
                                                <h2>Integrate Auth0 into your application</h2>
                                                <p>Integrate Auth0 into your application or use one of our samples to get started in minutes.</p>
                                                <div className='grp-btns'>
                                                    <div className='btn-wrap'>
                                                        <button className='btn viewbtn'>Create Application</button>
                                                    </div>
                                                    <div className='btn-wrap'>
                                                    <button className='btn viewbtn btn-plain'>Learn More</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='banner-wrap'>
                                                <img className='banner' src={bannerimg} alt="banner_image"/>
                                            </div>

                                        </section>




                                        <h5>Next Steps</h5>

                                        <div className='invite-bg-para'>
                                            {/* BOX1 */}


                                            <div className='invite-box'>
                                                <div className='ib-flex'>
                                                    <div className='ibf-1'>
                                                        <div className='icon-img-wrap'>
                                                            
                                                              <svg width="50" height="51" viewBox="0 0 50 51" fill="none" version="1.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 50.3293C38.8071 50.3293 50 39.092 50 25.2301C50 11.3682 38.8071 0.130859 25 0.130859C11.1929 0.130859 0 11.3682 0 25.2301C0 39.092 11.1929 50.3293 25 50.3293Z" fill="#ECECEC"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33" fill="white"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33H30Z" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.5 24C24.7091 24 26.5 22.2091 26.5 20C26.5 17.7909 24.7091 16 22.5 16C20.2909 16 18.5 17.7909 18.5 20C18.5 22.2091 20.2909 24 22.5 24Z" fill="white" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M36.25 20.25C36.25 19.5596 35.6904 19 35 19C34.3096 19 33.75 19.5596 33.75 20.25V22.75H31.25C30.5596 22.75 30 23.3096 30 24C30 24.6904 30.5596 25.25 31.25 25.25H33.75V27.75C33.75 28.4404 34.3096 29 35 29C35.6904 29 36.25 28.4404 36.25 27.75V25.25H38.75C39.4404 25.25 40 24.6904 40 24C40 23.3096 39.4404 22.75 38.75 22.75H36.25V20.25Z" fill="white"></path><path d="M33.75 22.75V23.25C34.0261 23.25 34.25 23.0261 34.25 22.75H33.75ZM33.75 25.25H34.25C34.25 24.9739 34.0261 24.75 33.75 24.75V25.25ZM36.25 25.25V24.75C35.9739 24.75 35.75 24.9739 35.75 25.25H36.25ZM36.25 22.75H35.75C35.75 23.0261 35.9739 23.25 36.25 23.25V22.75ZM35 19.5C35.4142 19.5 35.75 19.8358 35.75 20.25H36.75C36.75 19.2835 35.9665 18.5 35 18.5V19.5ZM34.25 20.25C34.25 19.8358 34.5858 19.5 35 19.5V18.5C34.0335 18.5 33.25 19.2835 33.25 20.25H34.25ZM34.25 22.75V20.25H33.25V22.75H34.25ZM31.25 23.25H33.75V22.25H31.25V23.25ZM30.5 24C30.5 23.5858 30.8358 23.25 31.25 23.25V22.25C30.2835 22.25 29.5 23.0335 29.5 24H30.5ZM31.25 24.75C30.8358 24.75 30.5 24.4142 30.5 24H29.5C29.5 24.9665 30.2835 25.75 31.25 25.75V24.75ZM33.75 24.75H31.25V25.75H33.75V24.75ZM34.25 27.75V25.25H33.25V27.75H34.25ZM35 28.5C34.5858 28.5 34.25 28.1642 34.25 27.75H33.25C33.25 28.7165 34.0335 29.5 35 29.5V28.5ZM35.75 27.75C35.75 28.1642 35.4142 28.5 35 28.5V29.5C35.9665 29.5 36.75 28.7165 36.75 27.75H35.75ZM35.75 25.25V27.75H36.75V25.25H35.75ZM38.75 24.75H36.25V25.75H38.75V24.75ZM39.5 24C39.5 24.4142 39.1642 24.75 38.75 24.75V25.75C39.7165 25.75 40.5 24.9665 40.5 24H39.5ZM38.75 23.25C39.1642 23.25 39.5 23.5858 39.5 24H40.5C40.5 23.0335 39.7165 22.25 38.75 22.25V23.25ZM36.25 23.25H38.75V22.25H36.25V23.25ZM35.75 20.25V22.75H36.75V20.25H35.75Z" fill="#EB5424"></path></svg>

                                                        </div>

                                                    </div>
                                                    <div className='ibf-2'>
                                                        <h2> Invite your team members</h2>
                                                        <div className='down-ib-content'>
                                                            <div className='max-ib'>
                                                            Add additional admins to help with your integration and act as a backup account in case you lose access.
                                                            <div className='max-ib-down'>
                                                                <div className='max-ib-down-f'>
                                                                    <div className='max-img-wrap mi-2'>
                                                                        <span>
                                                                            <img src={learnimg} alt='learn_about_image'/>
                                                                        </span>

                                                                    </div>
                                                                    <div className='mi-2'>Learn more about</div>
                                                                    <div className='mi-3'>
                                                                    
                                                                    <button className='btn viewbtn btn-plain'>Tenant Administrator permissions</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className='ibf-3'>
                                                    <button className='btn viewbtn btn-plain'>Invite Members </button>
                                                    </div>
                                                </div>

                                            </div>
                                             {/* BOX 2*/}


                                            

                                

                                            <div className='invite-box'>
                                                <div className='ib-flex'>
                                                    <div className='ibf-1'>
                                                        <div className='icon-img-wrap'>
                                                           <svg width="50" height="51" viewBox="0 0 50 51" fill="none" version="1.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 50.3293C38.8071 50.3293 50 39.092 50 25.2301C50 11.3682 38.8071 0.130859 25 0.130859C11.1929 0.130859 0 11.3682 0 25.2301C0 39.092 11.1929 50.3293 25 50.3293Z" fill="#ECECEC"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33" fill="white"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33H30Z" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.5 24C24.7091 24 26.5 22.2091 26.5 20C26.5 17.7909 24.7091 16 22.5 16C20.2909 16 18.5 17.7909 18.5 20C18.5 22.2091 20.2909 24 22.5 24Z" fill="white" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M36.25 20.25C36.25 19.5596 35.6904 19 35 19C34.3096 19 33.75 19.5596 33.75 20.25V22.75H31.25C30.5596 22.75 30 23.3096 30 24C30 24.6904 30.5596 25.25 31.25 25.25H33.75V27.75C33.75 28.4404 34.3096 29 35 29C35.6904 29 36.25 28.4404 36.25 27.75V25.25H38.75C39.4404 25.25 40 24.6904 40 24C40 23.3096 39.4404 22.75 38.75 22.75H36.25V20.25Z" fill="white"></path><path d="M33.75 22.75V23.25C34.0261 23.25 34.25 23.0261 34.25 22.75H33.75ZM33.75 25.25H34.25C34.25 24.9739 34.0261 24.75 33.75 24.75V25.25ZM36.25 25.25V24.75C35.9739 24.75 35.75 24.9739 35.75 25.25H36.25ZM36.25 22.75H35.75C35.75 23.0261 35.9739 23.25 36.25 23.25V22.75ZM35 19.5C35.4142 19.5 35.75 19.8358 35.75 20.25H36.75C36.75 19.2835 35.9665 18.5 35 18.5V19.5ZM34.25 20.25C34.25 19.8358 34.5858 19.5 35 19.5V18.5C34.0335 18.5 33.25 19.2835 33.25 20.25H34.25ZM34.25 22.75V20.25H33.25V22.75H34.25ZM31.25 23.25H33.75V22.25H31.25V23.25ZM30.5 24C30.5 23.5858 30.8358 23.25 31.25 23.25V22.25C30.2835 22.25 29.5 23.0335 29.5 24H30.5ZM31.25 24.75C30.8358 24.75 30.5 24.4142 30.5 24H29.5C29.5 24.9665 30.2835 25.75 31.25 25.75V24.75ZM33.75 24.75H31.25V25.75H33.75V24.75ZM34.25 27.75V25.25H33.25V27.75H34.25ZM35 28.5C34.5858 28.5 34.25 28.1642 34.25 27.75H33.25C33.25 28.7165 34.0335 29.5 35 29.5V28.5ZM35.75 27.75C35.75 28.1642 35.4142 28.5 35 28.5V29.5C35.9665 29.5 36.75 28.7165 36.75 27.75H35.75ZM35.75 25.25V27.75H36.75V25.25H35.75ZM38.75 24.75H36.25V25.75H38.75V24.75ZM39.5 24C39.5 24.4142 39.1642 24.75 38.75 24.75V25.75C39.7165 25.75 40.5 24.9665 40.5 24H39.5ZM38.75 23.25C39.1642 23.25 39.5 23.5858 39.5 24H40.5C40.5 23.0335 39.7165 22.25 38.75 22.25V23.25ZM36.25 23.25H38.75V22.25H36.25V23.25ZM35.75 20.25V22.75H36.75V20.25H35.75Z" fill="#EB5424"></path></svg>

                                                              

                                                        </div>

                                                    </div>
                                                    <div className='ibf-2'>
                                                        <h2> Try your Login box</h2>
                                                        <div className='down-ib-content'>
                                                            <div className='max-ib'>
                                                            With Auth0 your authentication experience is ready to go. Customize it to match your brand identity and try it now to see how it works.
                                                            <div className='max-ib-down'>
                                                                <div className='max-ib-down-f'>
                                                                    <div className='max-img-wrap mi-2'>
                                                                        <span>
                                                                            <img src={learnimg} alt='learn_about_image'/>
                                                                        </span>

                                                                    </div>
                                                                    <div className='mi-2'>Learn more about</div>
                                                                    <div className='mi-3'>
                                                                    
                                                                    <button className='btn viewbtn btn-plain'>Tenant Administrator permissions</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className='ibf-3'>
                                                    <button className='btn viewbtn btn-plain'>Invite Members </button>
                                                    </div>
                                                </div>

                                            </div>

                                             {/* BOX 4 */}


                                             <div className='invite-box'>
                                                <div className='ib-flex'>
                                                    <div className='ibf-1'>
                                                        <div className='icon-img-wrap'>
                                                            <svg width="50" height="51" viewBox="0 0 50 51" fill="none" version="1.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 50.3293C38.8071 50.3293 50 39.092 50 25.2301C50 11.3682 38.8071 0.130859 25 0.130859C11.1929 0.130859 0 11.3682 0 25.2301C0 39.092 11.1929 50.3293 25 50.3293Z" fill="#ECECEC"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33" fill="white"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33H30Z" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.5 24C24.7091 24 26.5 22.2091 26.5 20C26.5 17.7909 24.7091 16 22.5 16C20.2909 16 18.5 17.7909 18.5 20C18.5 22.2091 20.2909 24 22.5 24Z" fill="white" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M36.25 20.25C36.25 19.5596 35.6904 19 35 19C34.3096 19 33.75 19.5596 33.75 20.25V22.75H31.25C30.5596 22.75 30 23.3096 30 24C30 24.6904 30.5596 25.25 31.25 25.25H33.75V27.75C33.75 28.4404 34.3096 29 35 29C35.6904 29 36.25 28.4404 36.25 27.75V25.25H38.75C39.4404 25.25 40 24.6904 40 24C40 23.3096 39.4404 22.75 38.75 22.75H36.25V20.25Z" fill="white"></path><path d="M33.75 22.75V23.25C34.0261 23.25 34.25 23.0261 34.25 22.75H33.75ZM33.75 25.25H34.25C34.25 24.9739 34.0261 24.75 33.75 24.75V25.25ZM36.25 25.25V24.75C35.9739 24.75 35.75 24.9739 35.75 25.25H36.25ZM36.25 22.75H35.75C35.75 23.0261 35.9739 23.25 36.25 23.25V22.75ZM35 19.5C35.4142 19.5 35.75 19.8358 35.75 20.25H36.75C36.75 19.2835 35.9665 18.5 35 18.5V19.5ZM34.25 20.25C34.25 19.8358 34.5858 19.5 35 19.5V18.5C34.0335 18.5 33.25 19.2835 33.25 20.25H34.25ZM34.25 22.75V20.25H33.25V22.75H34.25ZM31.25 23.25H33.75V22.25H31.25V23.25ZM30.5 24C30.5 23.5858 30.8358 23.25 31.25 23.25V22.25C30.2835 22.25 29.5 23.0335 29.5 24H30.5ZM31.25 24.75C30.8358 24.75 30.5 24.4142 30.5 24H29.5C29.5 24.9665 30.2835 25.75 31.25 25.75V24.75ZM33.75 24.75H31.25V25.75H33.75V24.75ZM34.25 27.75V25.25H33.25V27.75H34.25ZM35 28.5C34.5858 28.5 34.25 28.1642 34.25 27.75H33.25C33.25 28.7165 34.0335 29.5 35 29.5V28.5ZM35.75 27.75C35.75 28.1642 35.4142 28.5 35 28.5V29.5C35.9665 29.5 36.75 28.7165 36.75 27.75H35.75ZM35.75 25.25V27.75H36.75V25.25H35.75ZM38.75 24.75H36.25V25.75H38.75V24.75ZM39.5 24C39.5 24.4142 39.1642 24.75 38.75 24.75V25.75C39.7165 25.75 40.5 24.9665 40.5 24H39.5ZM38.75 23.25C39.1642 23.25 39.5 23.5858 39.5 24H40.5C40.5 23.0335 39.7165 22.25 38.75 22.25V23.25ZM36.25 23.25H38.75V22.25H36.25V23.25ZM35.75 20.25V22.75H36.75V20.25H35.75Z" fill="#EB5424"></path></svg>

                                                              

                                                        </div>

                                                    </div>
                                                    <div className='ibf-2'>
                                                        <h2>Add a social login provider</h2>
                                                        <p className='down-ib-content'>
                                                            <div className='max-ib'>
                                                            Give your users the ability to login to your app with the identity provider of their choice in one click.
                                                            <div className='max-ib-down'>
                                                                <div className='max-ib-down-f'>
                                                                    <div className='max-img-wrap mi-2'>
                                                                        <span>
                                                                            <img src={learnimg} alt='learn_about_image'/>
                                                                        </span>

                                                                    </div>
                                                                    <div className='mi-2'>Learn more about</div>
                                                                    <div className='mi-3'>
                                                                    
                                                                    <button className='btn viewbtn btn-plain'>Connections</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>

                                                        </p>
                                                    </div>
                                                    <div className='ibf-3'>
                                                    <button className='btn viewbtn btn-plain'>Add Social Connections </button>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* BOX 4 */}
                                            <div className='invite-box'>
                                                <div className='ib-flex'>
                                                    <div className='ibf-1'>
                                                        <div className='icon-img-wrap'>
                                                            
                                                              <svg width="50" height="51" viewBox="0 0 50 51" fill="none" version="1.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 50.3293C38.8071 50.3293 50 39.092 50 25.2301C50 11.3682 38.8071 0.130859 25 0.130859C11.1929 0.130859 0 11.3682 0 25.2301C0 39.092 11.1929 50.3293 25 50.3293Z" fill="#ECECEC"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33" fill="white"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33H30Z" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.5 24C24.7091 24 26.5 22.2091 26.5 20C26.5 17.7909 24.7091 16 22.5 16C20.2909 16 18.5 17.7909 18.5 20C18.5 22.2091 20.2909 24 22.5 24Z" fill="white" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M36.25 20.25C36.25 19.5596 35.6904 19 35 19C34.3096 19 33.75 19.5596 33.75 20.25V22.75H31.25C30.5596 22.75 30 23.3096 30 24C30 24.6904 30.5596 25.25 31.25 25.25H33.75V27.75C33.75 28.4404 34.3096 29 35 29C35.6904 29 36.25 28.4404 36.25 27.75V25.25H38.75C39.4404 25.25 40 24.6904 40 24C40 23.3096 39.4404 22.75 38.75 22.75H36.25V20.25Z" fill="white"></path><path d="M33.75 22.75V23.25C34.0261 23.25 34.25 23.0261 34.25 22.75H33.75ZM33.75 25.25H34.25C34.25 24.9739 34.0261 24.75 33.75 24.75V25.25ZM36.25 25.25V24.75C35.9739 24.75 35.75 24.9739 35.75 25.25H36.25ZM36.25 22.75H35.75C35.75 23.0261 35.9739 23.25 36.25 23.25V22.75ZM35 19.5C35.4142 19.5 35.75 19.8358 35.75 20.25H36.75C36.75 19.2835 35.9665 18.5 35 18.5V19.5ZM34.25 20.25C34.25 19.8358 34.5858 19.5 35 19.5V18.5C34.0335 18.5 33.25 19.2835 33.25 20.25H34.25ZM34.25 22.75V20.25H33.25V22.75H34.25ZM31.25 23.25H33.75V22.25H31.25V23.25ZM30.5 24C30.5 23.5858 30.8358 23.25 31.25 23.25V22.25C30.2835 22.25 29.5 23.0335 29.5 24H30.5ZM31.25 24.75C30.8358 24.75 30.5 24.4142 30.5 24H29.5C29.5 24.9665 30.2835 25.75 31.25 25.75V24.75ZM33.75 24.75H31.25V25.75H33.75V24.75ZM34.25 27.75V25.25H33.25V27.75H34.25ZM35 28.5C34.5858 28.5 34.25 28.1642 34.25 27.75H33.25C33.25 28.7165 34.0335 29.5 35 29.5V28.5ZM35.75 27.75C35.75 28.1642 35.4142 28.5 35 28.5V29.5C35.9665 29.5 36.75 28.7165 36.75 27.75H35.75ZM35.75 25.25V27.75H36.75V25.25H35.75ZM38.75 24.75H36.25V25.75H38.75V24.75ZM39.5 24C39.5 24.4142 39.1642 24.75 38.75 24.75V25.75C39.7165 25.75 40.5 24.9665 40.5 24H39.5ZM38.75 23.25C39.1642 23.25 39.5 23.5858 39.5 24H40.5C40.5 23.0335 39.7165 22.25 38.75 22.25V23.25ZM36.25 23.25H38.75V22.25H36.25V23.25ZM35.75 20.25V22.75H36.75V20.25H35.75Z" fill="#EB5424"></path></svg>

                                                        </div>

                                                    </div>
                                                    <div className='ibf-2'>
                                                        <h2> Secure your Application</h2>
                                                        <div className='down-ib-content'>
                                                            <div className='max-ib'>
                                                            Add additional admins to help with your integration and act as a backup account in case you lose access.
                                                            <div className='max-ib-down'>
                                                                <div className='max-ib-down-f'>
                                                                    <div className='max-img-wrap mi-2'>
                                                                        <span>
                                                                            <img src={learnimg} alt='learn_about_image'/>
                                                                        </span>

                                                                    </div>
                                                                    <div className='mi-2'>Learn more about</div>
                                                                    <div className='mi-3'>
                                                                    
                                                                    <button className='btn viewbtn btn-plain'>Tenant Administrator permissions</button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className='ibf-3'>
                                                    <button className='btn viewbtn btn-plain'>Invite Members </button>
                                                    </div>
                                                </div>

                                            </div>

                                            
                                            {/* END OF BOXES  */}

                                            <div className='invite-box'>
                                                <div className='ib-flex'>
                                                    <div className='ibf-1'>
                                                        <div className='icon-img-wrap'>
                                                            
                                                              <svg width="50" height="51" viewBox="0 0 50 51" fill="none" version="1.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25 50.3293C38.8071 50.3293 50 39.092 50 25.2301C50 11.3682 38.8071 0.130859 25 0.130859C11.1929 0.130859 0 11.3682 0 25.2301C0 39.092 11.1929 50.3293 25 50.3293Z" fill="#ECECEC"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33" fill="white"></path><path d="M30 33V31C30 29.9391 29.5786 28.9217 28.8284 28.1716C28.0783 27.4214 27.0609 27 26 27H19C17.9391 27 16.9217 27.4214 16.1716 28.1716C15.4214 28.9217 15 29.9391 15 31V33H30Z" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.5 24C24.7091 24 26.5 22.2091 26.5 20C26.5 17.7909 24.7091 16 22.5 16C20.2909 16 18.5 17.7909 18.5 20C18.5 22.2091 20.2909 24 22.5 24Z" fill="white" stroke="#222227" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M36.25 20.25C36.25 19.5596 35.6904 19 35 19C34.3096 19 33.75 19.5596 33.75 20.25V22.75H31.25C30.5596 22.75 30 23.3096 30 24C30 24.6904 30.5596 25.25 31.25 25.25H33.75V27.75C33.75 28.4404 34.3096 29 35 29C35.6904 29 36.25 28.4404 36.25 27.75V25.25H38.75C39.4404 25.25 40 24.6904 40 24C40 23.3096 39.4404 22.75 38.75 22.75H36.25V20.25Z" fill="white"></path><path d="M33.75 22.75V23.25C34.0261 23.25 34.25 23.0261 34.25 22.75H33.75ZM33.75 25.25H34.25C34.25 24.9739 34.0261 24.75 33.75 24.75V25.25ZM36.25 25.25V24.75C35.9739 24.75 35.75 24.9739 35.75 25.25H36.25ZM36.25 22.75H35.75C35.75 23.0261 35.9739 23.25 36.25 23.25V22.75ZM35 19.5C35.4142 19.5 35.75 19.8358 35.75 20.25H36.75C36.75 19.2835 35.9665 18.5 35 18.5V19.5ZM34.25 20.25C34.25 19.8358 34.5858 19.5 35 19.5V18.5C34.0335 18.5 33.25 19.2835 33.25 20.25H34.25ZM34.25 22.75V20.25H33.25V22.75H34.25ZM31.25 23.25H33.75V22.25H31.25V23.25ZM30.5 24C30.5 23.5858 30.8358 23.25 31.25 23.25V22.25C30.2835 22.25 29.5 23.0335 29.5 24H30.5ZM31.25 24.75C30.8358 24.75 30.5 24.4142 30.5 24H29.5C29.5 24.9665 30.2835 25.75 31.25 25.75V24.75ZM33.75 24.75H31.25V25.75H33.75V24.75ZM34.25 27.75V25.25H33.25V27.75H34.25ZM35 28.5C34.5858 28.5 34.25 28.1642 34.25 27.75H33.25C33.25 28.7165 34.0335 29.5 35 29.5V28.5ZM35.75 27.75C35.75 28.1642 35.4142 28.5 35 28.5V29.5C35.9665 29.5 36.75 28.7165 36.75 27.75H35.75ZM35.75 25.25V27.75H36.75V25.25H35.75ZM38.75 24.75H36.25V25.75H38.75V24.75ZM39.5 24C39.5 24.4142 39.1642 24.75 38.75 24.75V25.75C39.7165 25.75 40.5 24.9665 40.5 24H39.5ZM38.75 23.25C39.1642 23.25 39.5 23.5858 39.5 24H40.5C40.5 23.0335 39.7165 22.25 38.75 22.25V23.25ZM36.25 23.25H38.75V22.25H36.25V23.25ZM35.75 20.25V22.75H36.75V20.25H35.75Z" fill="#EB5424"></path></svg>

                                                        </div>

                                                    </div>
                                                    <div className='ibf-2'>
                                                        <h2> Help and Support</h2>
                                                        <div className='down-ib-content'>
                                                            <div className='max-i'>
                                                            Check out Auth0 Flows to explore all our features or post on our Community forums to get expert guidance.
                                                           
                                                            </div>

                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                            </div>




                                        </div>
                                    </div>
                                </div>

                        </div> 



                    </div>
               
            </main>
            </div>
        </div>


        )
    }
    
    export default Page4