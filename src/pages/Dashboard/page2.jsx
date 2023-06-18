import React,{useState} from 'react';
import card1url from "./images/card1.svg";
import card2url from "./images/card2.svg";
import card3url from "./images/card3.svg";
import card4url from "./images/card4.svg";
import angularimg from "./images/angularimg.svg";
import jsimg from "./images/javascriptimg.svg";
import reactimg from "./images/reactimg.svg";
import sightimg from "./images/vuejsimg.svg";
import dotnetimg from "./images/dotnetimg.svg";
import pyimage from "./images/pythonimg.svg";
import goimg from "./images/golangimg.svg";
import javaimg from "./images/javaimg.svg";
import springimg from "./images/springimg.svg";
import laravelimg from "./images/laravelimg.svg";
import nextjsimg from "./images/nextjsimg.svg";
import phpimg from "./images/phpimg.svg";
import railsimg from "./images/railsimg.svg";
import androidimg from "./images/androidimg.svg";
import expoimg from "./images/expoimg.svg";
import flutterimg from "./images/flutterimg.svg";
import iconicimg from "./images/ionicimg.svg";
import appleimg from "./images/appleimg.svg"; 
import windowsimg from "./images/windowsimg.svg";
import xamarinig from "./images/xamarinimg.svg";
import tickimg from "./images/tickicon.svg";
import Navbar from "./navbar";

const Page2 = () => {

  const [selectedCard, setSelectedCard] = useState('');

  var ff=document.querySelectorAll(".ip1");

  const handleCardSelection = (event) => {
    setSelectedCard(event.target.value);
  };
  

  return (
   
    <div className='row'>
      <div className='col-2'>
 <Navbar/>
 </div>
 <div className='col-10'>
      <main className='page2-wrap'>
        <div className='container page2-container'>
          <div className='top-content'>
            <h6>Step 1</h6>
            <h3>Create a Sample App</h3>
            <p>Your Auth0 tenant can have multiple applications. Let's create one. You can delete this later.</p>
          </div>
          <div className='bottom-content'>
            <div className='para1'>
              <span className='para1-span'>
                <span className='tick-wrap mt-0'>
                <img src={tickimg}/>
                </span>
                <span className='para1-span-text'><h5> Select a platform for your app </h5></span>

              </span>
              <div className='para1-div'>
                <div className='inner-box'>

                  <label className={`appbox appbox-1 ${(selectedCard === 'appbox1'||selectedCard==='a1'||selectedCard==='a2'||selectedCard==='a3'||selectedCard==='a4') ? 'selected' : ''}`}>
                    <input type='radio' name='select-platform' value="appbox1" onChange={handleCardSelection}/>
                    <div className='app-inner'>
                      <div className='app-img'>
                        <div className='app-img-wrap'>
                          <div className='app-img-wrap1'><img src={card1url} alt='card1_img'/> </div>
                        </div>
                      </div>
                      <div className='app-txt'>
                        <h6>Single-Page App</h6>
                        <p>Javascript web app that runs in the browser</p>
                      </div>
                    </div>
                  </label>
                  <label className={`appbox appbox-2 ${(selectedCard === 'appbox2'||selectedCard==='b1'||selectedCard==='b2'||selectedCard==='b3'||selectedCard==='b4'||selectedCard==='b5'||selectedCard==='b6'||selectedCard==='b7'||selectedCard==='b8'||selectedCard==='b9'||selectedCard==='b10'||selectedCard==='b11'||selectedCard==='b12'||selectedCard==='b13'||selectedCard==='b14') ? 'selected' : ''}`}>
                  <input type='radio' name='select-platform' value="appbox2" onChange={handleCardSelection}/>
                  <div className='app-inner'>
                      <div className='app-img'>
                        <div className='app-img-wrap'>
                          <div className='app-img-wrap1'><img src={card2url} alt='card2_img'/> </div>
                        </div>
                      </div>
                      <div className='app-txt'>
                        <h6>Regular Web App</h6>
                        <p>Traditional web app that runs on the server</p>
                      </div>
                    </div>
                  </label>
                  <label  className={`appbox appbox-3 ${(selectedCard === 'appbox3' ||selectedCard==='c1'||selectedCard==='c2'||selectedCard==='c3'||selectedCard==='c4'||selectedCard==='c5'||selectedCard==='c6'||selectedCard==='c7'||selectedCard==='c8'||selectedCard==='c9'||selectedCard==='c10'||selectedCard==='c11'||selectedCard==='c12' ) ? 'selected' : ''}`}>
                  <input type='radio' name='select-platform' value="appbox3" onChange={handleCardSelection}/>
                    <div className='app-inner'>
                      <div className='app-img'>
                        <div className='app-img-wrap'>
                          <div className='app-img-wrap1'><img src={card3url} alt='card3_img'/> </div>
                        </div>
                      </div>
                      <div className='app-txt'>
                        <h6>Native/Mobile App</h6>
                        <p>Mobile or desktop app that runs natively on a device</p>
                      </div>
                    </div></label>
                  <label className={`appbox appbox-4 ${(selectedCard === 'appbox4'|| selectedCard === 'd1' || selectedCard === 'd2') ? 'selected' : ''}`}>
                  <input type='radio' name='select-platform' value="appbox4" onChange={handleCardSelection}/>
                    <div className='app-inner'>
                      <div className='app-img'>
                        <div className='app-img-wrap'>
                          <div className='app-img-wrap1'><img src={card4url} alt='card4_img'/> </div>
                        </div>
                      </div>
                      <div className='app-txt'>
                        <h6>Other</h6>
                        <p>Looking for a different platform or don't know</p>
                      </div>
                    </div></label>
                </div>

              </div>
            </div>
            <div className='spacebetween'> <span className='space1'></span> </div>
            <div className='para2'>
              <span className='para2-span d-flex'>

              <span className='tick-wrap mt-0 align-centre'>
                <img src={tickimg}/>
                </span>


              
                <span className='para1-span-text'><h5> Select the Technology </h5></span>
              </span>
              <div className='para2-div'>
                
                <div className={`techbox-wrap option1 ${(selectedCard === 'appbox1'||selectedCard==='a1'||selectedCard==='a2'||selectedCard==='a3'||selectedCard==='a4') ? 'visible' : ''}`}>
                  <div className='techbox-wrap1'>
                    <div className='techbox1'>

                      <label className={`techbox ta ${selectedCard === 'a1' ? 'selected' : ''}`} >
                          <input type='radio' name='op1' value="a1" onChange={handleCardSelection} className='ip1'/>
                          <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={angularimg} alt='Angular_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Angular</h2>
                              </div>
                            </div>
                          </div>
                      </label>

                      <label className={`techbox ta ${(selectedCard === 'a2') ? 'selected' : ''}`}>
                      <input type='radio' name='op1' value="a2" onChange={handleCardSelection} className='ip1'/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={jsimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>JavaScript</h2>
                              </div>
                            </div>
                          </div></label>

                      <label className={`techbox ta ${selectedCard === 'a3' ? 'selected' : ''}`}>
                      <input type='radio' name='op1' value="a3" onChange={handleCardSelection} className='ip1'/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={reactimg} alt='React_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>React</h2>
                              </div>
                            </div>
                          </div></label>

                      <label className={`techbox ta ${selectedCard === 'a4' ? 'selected' : ''}`}>
                      <input type='radio' name='op1' value="a4" onChange={handleCardSelection} className='ip1'/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={sightimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Sight</h2>
                              </div>
                            </div>
                          </div></label>

                    </div>
                  </div>
                </div>

                <div className={`techbox-wrap option2 ${(selectedCard === 'appbox2'||selectedCard==='b1'||selectedCard==='b2'||selectedCard==='b3'||selectedCard==='b4'||selectedCard==='b5'||selectedCard==='b6'||selectedCard==='b7'||selectedCard==='b8'||selectedCard==='b9'||selectedCard==='b10'||selectedCard==='b11'||selectedCard==='b12'||selectedCard==='b13'||selectedCard==='b14') ? 'visible' : ''}`}>
                <div className='techbox-wrap1'>
                    <div className='techbox1'>
                      <label className={`techbox ${selectedCard === 'b1' ? 'selected' : ''}`}>
                        
                          {/* <div className='tb1'>
                            <div className='tb11'>
                              <div className='tb11-img'></div>
                              <div className='tb11-text'>
                                <h2>Angular</h2>
                              </div>
                            </div>
                          </div> */}
                          <input type='radio' name='op2' value="b1" onChange={handleCardSelection}/>
                          <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={dotnetimg} alt='Angular_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>ASP.NET (OWIN)</h2>
                              </div>
                            </div>
                          </div>
                      </label>

                      <label className={`techbox ${selectedCard === 'b2' ? 'selected' : ''}`}>
                      <input type='radio' name='op2' value="b2" onChange={handleCardSelection}/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={dotnetimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>ASP.NET Core MVC</h2>
                              </div>
                            </div>
                          </div></label>

                      <label className={`techbox ${selectedCard === 'b3' ? 'selected' : ''}`}>
                      <input type='radio' name='op2' value="b3" onChange={handleCardSelection}/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={dotnetimg} alt='React_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>ASP.NET Core v2.1</h2>
                              </div>
                            </div>
                          </div></label>

                      <label className={`techbox ${selectedCard === 'b4' ? 'selected' : ''}`}>
                      <input type='radio' name='op2' value="b4" onChange={handleCardSelection}/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={pyimage} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Django</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b5' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b5" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={jsimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Express</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b6' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b6" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={goimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Go</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b7' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b7" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={javaimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Java</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b8' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b8" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={javaimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Java EE</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b9' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b9" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={springimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Java Spring Boot</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b10' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b10" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={laravelimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Laravel</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b11' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b11" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={nextjsimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Next.js</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b12' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b12" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={phpimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>PHP</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b13' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b13" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={pyimage} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Python</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'b14' ? 'selected' : ''}`}>
                          <input type='radio' name='op2' value="b14" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={railsimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Ruby On Rails</h2>
                              </div>
                            </div>
                          </div></label>
                          
                    </div>
                  </div>
                </div>
              </div>

              
              <div className={`techbox-wrap option3 ${(selectedCard === 'appbox3'||selectedCard==='c1'||selectedCard==='c2'||selectedCard==='c3'||selectedCard==='c4'||selectedCard==='c5'||selectedCard==='c6'||selectedCard==='c7'||selectedCard==='c8'||selectedCard==='c9'||selectedCard==='c10'||selectedCard==='c11'||selectedCard==='c12' )? 'visible' : ''}`} >
                  <div className='techbox-wrap1'>
                    <div className='techbox1'>
                      <label className={`techbox ${selectedCard === 'c1' ? 'selected' : ''}`}>
                          {/* <div className='tb1'>
                            <div className='tb11'>
                              <div className='tb11-img'></div>
                              <div className='tb11-text'>
                                <h2>Angular</h2>
                              </div>
                            </div>
                          </div> */}
                          <input type='radio' name='op3' value="c1" onChange={handleCardSelection}/>
                          <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={androidimg} alt='Angular_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Android</h2>
                              </div>
                            </div>
                          </div>
                      </label>

                      <label className={`techbox ${selectedCard === 'c2' ? 'selected' : ''}`}>
                      <input type='radio' name='op3' value="c2" onChange={handleCardSelection}/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={androidimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Android - Facebook Login</h2>
                              </div>
                            </div>
                          </div></label>

                      <label className={`techbox ${selectedCard === 'c3' ? 'selected' : ''}`}>
                      <input type='radio' name='op3' value="c3" onChange={handleCardSelection}/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={expoimg} alt='React_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Expo</h2>
                              </div>
                            </div>
                          </div></label>

                      <label className={`techbox ${selectedCard === 'c4' ? 'selected' : ''}`}>
                      <input type='radio' name='op3' value="c4" onChange={handleCardSelection}/>
                        <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={flutterimg} alt='Sight_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Flutter</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c5' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c5" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={iconicimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Ionic & Capacitor (Angular)</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c6' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c6" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={iconicimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Ionic & Capacitor (React)</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c7' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c7" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={iconicimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Ionic & Capacitor (Vue)</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c8' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c8" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={appleimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>iOS / macOS </h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c9' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c9" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={reactimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>React Native</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c10' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c10" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={windowsimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>UWP</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c11' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c11" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={windowsimg} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>WPF / Winforms</h2>
                              </div>
                            </div>
                          </div></label>

                          <label className={`techbox ${selectedCard === 'c12' ? 'selected' : ''}`}>
                          <input type='radio' name='op3' value="c12" onChange={handleCardSelection}/>
                            <div className='d-grids'>
                            <div className='d-grids1'>
                              <div className='d-gridsimg'>
                                <div className='dg1'>
                                  <img src={xamarinig} alt='JavaScript_icon'/>
                                </div>
                              </div>
                              <div className='d-gridstxt'>
                                <h2>Xamarin</h2>
                              </div>
                            </div>
                          </div></label>
                    </div>
                  </div>
                </div>


                {/* gap */}

                <div className='other1'>
                  <div  className={`other2 option4 ${(selectedCard === 'appbox4' || selectedCard === 'd1' || selectedCard === 'd2') ? 'visible' : ''}`}>
                    <div className='other3'>
                      <div className='other4'>
                        <div className='other5'>

                          <label  className={`other6 ${selectedCard === 'd1' ? 'selected' : ''}`}>
                            <input type='radio' name='op4' value="d1" onChange={handleCardSelection}/>
                            <div className='other7'>
                              <div className='other8'>
                                <h5>Machine to Machine(M2M)</h5>
                                <p>CLIs, daemons or services running on your backend.</p>
                              </div>
                              <div className='other9'>
                                <p>Ex Shell script</p>
                              </div>
                            </div>
                          </label>

                          {/* other */}

                          <label className={`other6 ${selectedCard === 'd2' ? 'selected' : ''}`}>
                          <input type='radio' name='op4' value="d2" onChange={handleCardSelection}/>
                            <div className='other7'>
                              <div className='other8'>
                                <h5>Not sure</h5>
                                <p>I am not sure or</p>
                              </div>
                              <div className='other9'>
                                <p>I don't know just yet.</p>
                              </div>
                            </div>
                          </label>{/* other */}



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

export default Page2