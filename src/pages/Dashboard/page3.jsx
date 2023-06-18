import React,{useState} from 'react';
import tickimg from "./images/tickicon.svg";
import googleavatar from "./images/google-avatar.png";
import btndown from "./images/btndown.svg";
import btnup from "./images/btnup.svg";
import fbavatar from "./images/facebook-avatar.png"
import appleavt from "./images/apple-avatar.png";
import msavt from "./images/microsoft-avatar.png";
import githubavt from "./images/github-avatar.png";
import twitteravt from "./images/twitter-avatar.png";
import Navbar from "./navbar";

const Page3 = () => {

  const [selectedCard, setSelectedCard] = useState('');
  var ff=document.querySelectorAll(".ip1");
  const handleCardSelection = (event) => {
    setSelectedCard(event.target.value);
  };


  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');

  const handleColorChange1 = (event) => {
    const color = event.target.value;
    setColor1(color);
  };

  const handleColorChange2 = (event) => {
    const color = event.target.value;
    setColor2(color);
  };



    const [selectedCards, setSelectedCards] = useState([]);

    const handleCardSelection1 = (event) => {
      const selectedValue = event.target.value;
      if (event.target.checked) {
        setSelectedCards([...selectedCards, selectedValue]);
      } else {
        setSelectedCards(selectedCards.filter((card) => card !== selectedValue));
      }
    };
  
    const isChecked = (value) => {
      return selectedCards.includes(value);
    };


    return (
        <div ><Navbar/>
            <div className='step2-wrap'>
                <div className='container step2content'>
                    <div className='step2-top'>
                        <h6>
                        Step 2
                        </h6>
                        <h3>
                        Configure your Login Box
                        </h3>
                        <p>Make your login box sing with customizations that match your brand</p>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6 m-down'>
                            <div className='step2-down1'>
                                <div className='d-flex'>
                                    <span className='tick-wrap'> <img src={tickimg}/> </span>
                                    <span className='d-column'>
                                        <span className='sd1'><h5>Logo</h5></span>
                                        <span className='sd2'>Your company logo.</span>
                                    </span>
                                </div>

                                <div className='r-btns'>
                                    <div>
                                        <div className='d-flex'>
                                            <div>
                                                <div className='grid-d'>
                                                    <div className='g-d'>
                                                        <label className='gd-l1'>
                                                            <span>
                                                            <input class="r-btn" name="logo" type="radio" value="default" checked="true"/>
                                                            </span>
                                                            <span className='ms-2'>Default (Auth0)</span>
                                                        </label>
                                                        <label className='gd-l1'>
                                                            <span>
                                                            <input class="r-btn" name="logo" type="radio" value="default" checked="true"/>
                                                            </span>
                                                            <span className='ms-2'>Custom</span>
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='gap1'>
                                <span className='gap2'></span>
                            </div>

                            <div className='step2-down2'>
                                <div className='d-flex'>
                                    <span className='tick-wrap'> <img src={tickimg}/> </span>
                                    <span className='d-column'>
                                        <span className='sd1'><h5>Social Connections</h5></span>
                                        <span className='sd2'>Choose social connection users can use to login.</span>
                                    </span>
                                </div>
                                <div className='connection-box'>
                                    <div>
                                        <div className='d-flex w-full'>
                                            <div className='w-full'>
                                                <div className='cb-f1'>
                                                    <div className='max-width'>
                                                        <div className='cb-gridbox'>
                                                            <label className={`cb-box ${isChecked('Card 1') ? 'selected' : ''}`}>
                                                            <input class="cb-input" type="checkbox" value="Card 1"
                                                                    checked={isChecked('Card 1')}
                                                                    onChange={handleCardSelection1}
                                                                    />
                                                            <div className='cb-box-content'>
                                                                <div className='cbc-1'>
                                                                    <div className='cbc1-flx'>
                                                                        <div className='cbc-flx1'>
                                                                            <img className='googleicon1' src={googleavatar} alt='google'/>
                                                                        </div>
                                                                    </div>

                                                                    <div className='cbc-2'>
                                                                        <h2>Google / Gmail</h2>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            </label>
                                                            <label className={`cb-box ${isChecked('Card 2') ? 'selected' : ''}`}>
                                                            <input class="cb-input" type="checkbox" value="Card 2"
                                                                    checked={isChecked('Card 2')}
                                                                    onChange={handleCardSelection1}
                                                                   />
                                                            <div className='cb-box-content'>
                                                                <div className='cbc-1'>
                                                                    <div className='cbc1-flx'>
                                                                        <div className='cbc-flx1'>
                                                                            <img className='googleicon1' src={fbavatar} alt='google'/>
                                                                        </div>
                                                                    </div>

                                                                    <div className='cbc-2'>
                                                                        <h2>Facebook</h2>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            </label>
                                                            <label className={`cb-box ${isChecked('Card 3') ? 'selected' : ''}`}>
                                                            <input class="cb-input" type="checkbox" value="Card 3"
                                                                    checked={isChecked('Card 3')}
                                                                    onChange={handleCardSelection1}
                                                                    />
                                                            <div className='cb-box-content'>
                                                                <div className='cbc-1'>
                                                                    <div className='cbc1-flx'>
                                                                        <div className='cbc-flx1'>
                                                                            <img className='googleicon1' src={appleavt} alt='google'/>
                                                                        </div>
                                                                    </div>

                                                                    <div className='cbc-2'>
                                                                        <h2>Apple</h2>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            </label>
                                                            <label className={`cb-box ${isChecked('Card 4') ? 'selected' : ''}`}>
                                                            <input class="cb-input" type="checkbox" value="Card 4"
                                                                    checked={isChecked('Card 4')}
                                                                    onChange={handleCardSelection1}
                                                                    />
                                                            <div className='cb-box-content'>
                                                                <div className='cbc-1'>
                                                                    <div className='cbc1-flx'>
                                                                        <div className='cbc-flx1'>
                                                                            <img className='googleicon1' src={msavt} alt='google'/>
                                                                        </div>
                                                                    </div>

                                                                    <div className='cbc-2'>
                                                                        <h2>Microsoft</h2>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            </label>
                                                            <label className={`cb-box ${isChecked('Card 5') ? 'selected' : ''}`}>
                                                            <input class="cb-input" type="checkbox" value="Card 5"
                                                                    checked={isChecked('Card 5')}
                                                                    onChange={handleCardSelection1}
                                                                    />
                                                            <div className='cb-box-content'>
                                                                <div className='cbc-1'>
                                                                    <div className='cbc1-flx'>
                                                                        <div className='cbc-flx1'>
                                                                            <img className='googleicon1' src={githubavt} alt='google'/>
                                                                        </div>
                                                                    </div>

                                                                    <div className='cbc-2'>
                                                                        <h2>Github</h2>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            </label>
                                                            <label className={`cb-box ${isChecked('Card 6') ? 'selected' : ''}`}>
                                                            <input class="cb-input" type="checkbox" value="Card 6"
                                                                    checked={isChecked('Card 6')}
                                                                    onChange={handleCardSelection1}
                                                                    />
                                                            <div className='cb-box-content'>
                                                                <div className='cbc-1'>
                                                                    <div className='cbc1-flx'>
                                                                        <div className='cbc-flx1'>
                                                                            <img className='googleicon1' src={twitteravt} alt='google'/>
                                                                        </div>
                                                                    </div>

                                                                    <div className='cbc-2'>
                                                                        <h2>Twitter</h2>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            </label>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='gap1'>
                                <span className='gap2'></span>
                            </div>


                            <div className='step2-down3'>
                            <div className='d-flex'>
                                    <span className='tick-wrap'> <img src={tickimg}/> </span>
                                    <span className='d-column'>
                                        <span className='sd1'><h5>Social connections button layout</h5></span>
                                        <span className='sd2'>Choose if social connections should appear at the top or bottom.</span>
                                    </span>
                                </div>

                                <div className='sd3'>
                                   <div className='r-btns'>
                                    <div>
                                        <div className='d-flex'>
                                            <div>
                                                <div className='grid-d'>
                                                    <div className='g-d'>
                                                        <label className={`gd-l1 border ${selectedCard === 'default1' ? 'border-s' : ''}`}>
                                                            <span>
                                                            <input class="r-btn" name="social" type="radio" value="default1"  onChange={handleCardSelection}/ >
                                                            </span>
                                                            <span className='ms-2'> <img src={btndown} /> </span>
                                                        </label>
                                                        <label className={`gd-l1 border ${selectedCard === 'default2' ? 'border-s' : ''}`}>
                                                            <span>
                                                            <input class="r-btn" name="social" type="radio" value="default2"  onChange={handleCardSelection}/>
                                                            </span>
                                                            <span className='ms-2'> <img src={btnup} /> </span>
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                </div>

                            </div>

                            <div className='gap1'>
                                <span className='gap2'></span>
                            </div>



                            <div className='step2-down4'>
                            <div className='d-flex'>
                                    <span className='tick-wrap'> <img src={tickimg}/> </span>
                                    <span className='d-column'>
                                        <span className='sd1'><h5>User ID and Password</h5></span>
                                        <span className='sd2'>Choose if users can authenticate using ID and Password.</span>
                                    </span>
                                </div>

                                <div className='sd4'>
                                    <div>

                                        <div className='d-flex w-full'>
                                            <div className='w-full'>
                                                <div className='sd4grid'>
                                                    <label>
                                                        <span className='d-flex'> <input type='checkbox' className='cb-ip'/> </span>
                                                        <span className='d-column ms-3'>
                                                            <span>Enable</span>
                                                            <span>Check to enable users to enter a user ID and Password to login</span>
                                                        </span>
                                                    </label>
                                                    <hr></hr>
                                                    <h6>Create sample user <i>(optional)</i></h6>
                                                    <form>
                                                        <div className='form-grid'>
                                                            <div className='form2-grid'>

                                                                <div className='inline-form '>
                                                                    <label for="email" >
                                                                        Email
                                                                    </label>
                                                                    <input className='email-box' name="email" placeholder="email@example.com" type="text"/>
                                                                </div>

                                                                <div className='inline-form'>
                                                                    <label for="email" >
                                                                        Password
                                                                    </label>
                                                                    <input className='email-box' name="email" placeholder="*************" type="password"/>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                </div>



                                <div className='gap1'>
                                <span className='gap2'></span>
                            </div>


                            <div className='step2-down5'>
                                <div className='d-flex'>
                                    <span className='tick-wrap'> <img src={tickimg}/> </span>
                                    <span className='d-column'>
                                        <span className='sd1'><h5>Colors</h5></span>
                                        <span className='sd2'>Modify the color of the button and background.</span>
                                    </span>
                                </div>

                                <div className='sd4 noborder'>
                                    <div>

                                        <div className='d-flex w-full'>
                                            <div className='w-full'>
                                                <div className='sd4grid'>
                                                    {/* <label>
                                                        <span className='d-flex'> <input type='checkbox' className='cb-ip'/> </span>
                                                        <span className='d-column ms-3'>
                                                            <span>Enable</span>
                                                            <span>Check to enable users to enter a user ID and Password to login</span>
                                                        </span>
                                                    </label>
                                                    <hr></hr>
                                                    <h6>Create sample user <i>(optional)</i></h6> */}
                                                    <form>
                                                        <div className='form-grid'>
                                                            <div className='form2-grid'>

                                                                <div className='inline-form '>
                                                                    <label for="email" >
                                                                        Button Color
                                                                    </label>
                                                                    <span className='d-flex align-centre'>
                                                                    <input className='color-ip' id='getcolor' name="email" placeholder="" type="color" onChange={handleColorChange1} />
                                                                   
                                                                    <input className='email-box' id='putcolor' name="email" placeholder="" type="text" value={color1}/>
                                                                    </span>
                                                                </div>

                                                                <div className='inline-form'>
                                                                    <label for="email" >
                                                                        Background Color
                                                                    </label>
                                                                    <span className='d-flex align-centre'>
                                                                    <input className='color-ip'  name="email" placeholder="" type="color" onChange={handleColorChange2} />
                                                                   
                                                                    <input className='email-box'  name="email" placeholder="" type="text" value={color2}/>
                                                                    </span>
                                                                    
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </form>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>










                        </div>
                        <div className='col-lg-6'></div>
                    </div>
                </div>
            </div>
        </div>


        )
    }
    
    export default Page3