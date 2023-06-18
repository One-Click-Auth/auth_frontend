import React,{useState} from 'react';
import iconi from "./images/iconi.svg";
import mandrillimg from "./images/mandrill-avatar.svg";
import amazonavt from "./images/aws-avatar.svg";
import sendgridavt from "./images/sendgrid-avatar.svg";
import sparkpostavt from "./images/sparkpost-avatar.svg";
import mailgunavt from "./images/mailgun-avatar.svg";
import emailavt from "./images/emailicon.svg";
import Navbar from "./navbar";
const Page7 = () => {

    
  const [selectedCard, setSelectedCard] = useState('');
  const handleCardSelection = (event) => {
    setSelectedCard(event.target.value);
  };

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };


    return (
        <div className='row'>
            <div className='col-2'><Navbar/></div>
            <div className='col-10'>
        <div className='page-wrap'>
            <div className='container page7contain'>
                <div className='row'>
                    <div className='col-12 p7-para1'>
                        <h1>Custom Email Provider</h1>
                        <p>Standard welcome, password reset, and account verification email-based workflows, built right into Auth0.
                            <a className='learn-more'> Learn More →</a>
                        </p>
                    </div>
                    
                </div>

                <div className='p7-g1'>
                    <div className='p7-g1'>
                        <div className='p7-g2'>
                            <div className='p7-g1'>
                                <div className='p7-inner1'>
                                    <div className='new-icon'>
                                    <img className='i-icon' src={iconi} alt='i-icon_img'/>

                                    </div>
                                    <div className='p7-inner1-txt'>
                                     <span className='p7darktext'> Heads up! </span> If you are trying to access a service behind a firewall, make sure to open the right ports and allow inbound connections from these IP addresses: <span className='p7smalltext'> 54.245.16.146, 35.82.131.220, 54.200.12.78, 3.21.254.195, 18.218.26.94, 18.117.64.128</span>
                                    </div>

                                </div>
                                <div className='p7-inner2'>
                                    <div className='p7-inner2-1'>
                                        <div className='p7-inner2flex1'>
                                            <div className='p7f1-left'>
                                                <label>Use my own email provider</label>
                                                <p>
                                                Route all emails that are part of Auth0's authentication workflows through a high-volume email service.
                                                </p>
                                            </div>

                                        </div>
                                        <div className='p7-inner2flex1'>
                                        <div className='max-width d-flex align-centre'>
                                        <input className='mw-input' type="checkbox" id="switch-mw"  checked={isCheckboxChecked} onChange={handleCheckboxChange} /><label className='mw-label' for="switch-mw"></label>

                                        </div>

                                        </div>

                                    </div>


                                </div>


                            </div>
                            <fieldset className='p7-in2' disabled={!isCheckboxChecked}>
                                <div className='p7-fs1'>
                                    <form>
                                        <div className='p7-formgrid'>
                                            <fieldset className='p7-formgrid1'>
                                                <div className='formgrid-left'>
                                                    <legend className='legend-email'>Email Provider</legend>
                                                </div>
                                                <div className='formgrid-right'>
                                                    <fieldset className='fg-rightone'>
                                                        <legend>Choose a Provider</legend>
                                                        <div className='fg-right1-grd'>
                                                            <label  className={`label-fg-frg ${(selectedCard === 'mandrill') ? 'selected' : ''}`}>
                                                                <input type='radio' name='chooseprovider' value="mandrill" onChange={handleCardSelection}/>

                                                                <div className='child-lff'>
                                                                    <div className='label-fg-flex'>
                                                                        <div className='lff-img-wrap'>
                                                                            <div className='lff-img'>
                                                                                <img src={mandrillimg} />


                                                                            </div>


                                                                        </div>
                                                                        <div className='lff-text-wrap'>
                                                                            <h2>Mandrill</h2>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </label>

                                                            <label  className={`label-fg-frg ${(selectedCard === 'amazon') ? 'selected' : ''}`}>
                                                            <input type='radio' name='chooseprovider' value="amazon" onChange={handleCardSelection}/>

                                                                <div>
                                                                    <div className='label-fg-flex'>
                                                                        <div className='lff-img-wrap'>
                                                                            <div className='lff-img'>
                                                                                <img src={amazonavt} />


                                                                            </div>


                                                                        </div>
                                                                        <div className='lff-text-wrap'>
                                                                            <h2>Amazon SES</h2>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </label>

                                                            <label  className={`label-fg-frg ${(selectedCard === 'sendgrid') ? 'selected' : ''}`}>
                                                            <input type='radio' name='chooseprovider' value="sendgrid" onChange={handleCardSelection}/>

                                                                <div>
                                                                    <div className='label-fg-flex'>
                                                                        <div className='lff-img-wrap'>
                                                                            <div className='lff-img'>
                                                                                <img src={sendgridavt} />


                                                                            </div>


                                                                        </div>
                                                                        <div className='lff-text-wrap'>
                                                                            <h2>Sendgrid</h2>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </label>

                                                            <label  className={`label-fg-frg ${(selectedCard === 'spark') ? 'selected' : ''}`}>
                                                            <input type='radio' name='chooseprovider' value="spark" onChange={handleCardSelection}/>

                                                                <div>
                                                                    <div className='label-fg-flex'>
                                                                        <div className='lff-img-wrap'>
                                                                            <div className='lff-img'>
                                                                                <img src={sparkpostavt} />


                                                                            </div>


                                                                        </div>
                                                                        <div className='lff-text-wrap'>
                                                                            <h2>SparkPost</h2>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </label>

                                                            <label  className={`label-fg-frg ${(selectedCard === 'mailgun') ? 'selected' : ''}`}>
                                                            <input type='radio' name='chooseprovider' value="mailgun" onChange={handleCardSelection}/>

                                                                <div>
                                                                    <div className='label-fg-flex'>
                                                                        <div className='lff-img-wrap'>
                                                                            <div className='lff-img'>
                                                                                <img src={mailgunavt} />


                                                                            </div>


                                                                        </div>
                                                                        <div className='lff-text-wrap'>
                                                                            <h2>Mailgun</h2>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </label>

                                                            <label  className={`label-fg-frg ${(selectedCard === 'smtpprovider') ? 'selected' : ''}`}>
                                                            <input type='radio' name='chooseprovider' value="smtpprovider" onChange={handleCardSelection}/>

                                                                <div>
                                                                    <div className='label-fg-flex'>
                                                                        <div className='lff-img-wrap'>
                                                                            <div className='lff-img smtp-imgwrap'>
                                                                                <img src={emailavt} />


                                                                            </div>


                                                                        </div>
                                                                        <div className='lff-text-wrap '>
                                                                            <h2>SMTP Provider</h2>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </label>

                                                        </div>

                                                    </fieldset>

                                                </div>

                                            </fieldset>

                                            {/* FOR MANDRILL */}

                                            <div className={`mandrill-box option2 ${(selectedCard === 'mandrill') ? 'visible' : ''}`}>
                                         <hr className='h-ruler'></hr>
                                <fieldset className='mb-fs'>
                                    <div className='mbfs-in1'>
                                        <legend>
                                        Mandrill Settings
                                        </legend>
                                        <p>
                                        Your credentials will always be encrypted in our database. Sign up for a <a className='learn-more' href='#'> Mandrill </a> account and create a new API key <a className='learn-more' href='#'> in the dashboard</a>.
                                        <br></br><br></br>
                                        Need help? Check <a className='learn-more' href='#'> our instructions</a>.

                                        </p>

                                    </div>
                                    <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>From <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Your App <support@yourapp.com>"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Default from address for emails</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                        <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>API Key <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Mandrill API Key"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Your Mandrill API Key</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                    </div>

                                    </div>
                                    

                                </fieldset>
                                <div className='mandril-downpara1 mt-4'>
                                    <div className='mandril-downpara2'>
                                        <button className='btn viewbtn'>Save</button>
                                        <button className='btn newbtn'>Send Test Email</button>

                                    </div>
                                </div>
                            </div>

                            {/* FOR AWS */}
                            <div className={`aws ${(selectedCard === 'amazon') ? 'visible' : ''}`}>
                                <hr className='h-ruler'></hr>
                                <fieldset className='mb-fs'>
                                    <div className='mbfs-in1'>
                                        <legend>
                                        Amazon SES Settings
                                        </legend>
                                        <p>
                                        Your credentials will always be encrypted in our database. Sign up for a <a className='learn-more' href='#'> Amazon </a> account and <a className='learn-more' href='#'> configure Amazon SES </a> by validating your domain and requesting production access.
                                        <br></br><br></br>
                                        Need help? Check our instructions for <a className='learn-more' href='#'> API credentials</a> and <a className='learn-more' href='#'> SMTP credentials</a>.

                                        </p>

                                    </div>
                                    <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>From <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Your App <support@yourapp.com>"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Default from address for emails</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                        <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Access Key Id <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="AWS Access Key Id"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            {/* <p>Your Mandrill API Key</p> */}

                                         </div>
                                         <div className='mbfs-inner2'>
                                              
                                        </div>

                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Secret Access Key <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="AWS Secret Key"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            {/* <p>Your Mandrill API Key</p> */}

                                         </div>
                                         <div className='mbfs-inner2'>
                                              
                                        </div>

                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Region <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="us-west-2"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Your AWS default region</p>

                                         </div>
                                         <div className='mbfs-inner2'>
                                              
                                        </div>

                                    </div>

                                    </div>
                                    

                                </fieldset>
                                <div className='mandril-downpara1 mt-4'>
                                    <div className='mandril-downpara2'>
                                        <button className='btn viewbtn'>Save</button>
                                        <button className='btn newbtn'>Send Test Email</button>

                                    </div>
                                </div>
                            </div>
                            {/* FOR NEXT */}
                             {/* FOR SENDGRID */}

                             <div className={`sendgrid  ${(selectedCard === 'sendgrid') ? 'visible' : ''}`}>
                                         <hr className='h-ruler'></hr>
                                <fieldset className='mb-fs'>
                                    <div className='mbfs-in1'>
                                        <legend>
                                        Sendgrid Settings
                                        </legend>
                                        <p>
                                        Your <a className='learn-more' href='#'> SendGrid API Key</a> will always be encrypted in our database. Sign up for a <a className='learn-more' href='#'>SendGrid</a> account, or if you have a Microsoft Azure subscription you can get a free account in the Azure Marketplace.
                                        <br></br><br></br>
                                        Need help? Check <a className='learn-more' href='#'> our instructions</a>.

                                        </p>

                                    </div>
                                    <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>From <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Your App <support@yourapp.com>"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Default from address for emails</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                        <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>API Key <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Sendgrid API Key"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Your Sendgrid API Key</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                    </div>

                                    </div>
                                    

                                </fieldset>
                                <div className='mandril-downpara1 mt-4'>
                                    <div className='mandril-downpara2'>
                                        <button className='btn viewbtn'>Save</button>
                                        <button className='btn newbtn'>Send Test Email</button>

                                    </div>
                                </div>
                            </div>

                            {/* FOR SPARKPOST */}

                            <div className={`sparkpost ${(selectedCard === 'spark') ? 'visible' : ''}`}>
                                         <hr className='h-ruler'></hr>
                                <fieldset className='mb-fs'>
                                    <div className='mbfs-in1'>
                                        <legend>
                                        SparkPost Settings
                                        </legend>
                                        <p>
                                        Your <a className='learn-more' href='#'>SparkPost Credentials</a> will always be encrypted in our database. Sign up for a <a className='learn-more' href='#'> SparkPost</a> account.
                                        <br></br><br></br>
                                        Need help? Check <a className='learn-more' href='#'> our instructions</a>.

                                        </p>

                                    </div>
                                    <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>From <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Your App <support@yourapp.com>"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Default from address for emails</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                        <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>API Key <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="SparkPost API Key"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Your SparkPost API Key</p>

                                        </div>
                                        
                                        <div className='mbfs-inner2'>
                                            
                                        </div>
                                        <div className='radio-section'>
                                        <label for="sp-inp" className='label-sp'>Region</label>
                                        <div className='d-flex sp-input'>
                                        <input type='radio' name='sp-inp' />SparkPost US 
                                        <input type='radio' name='sp-inp' />SparkPost EU 
                                        </div>
                                        </div>

                                        

                                    </div>


                                    </div>
                                    

                                </fieldset>
                                <div className='mandril-downpara1 mt-2'>
                                    <div className='mandril-downpara2'>
                                        <button className='btn viewbtn'>Save</button>
                                        <button className='btn newbtn'>Send Test Email</button>

                                    </div>
                                </div>
                            </div>

                            {/* FOR NEXT */}

                            {/* FOR Mailgun */}

                            <div className={`mailgun ${(selectedCard === 'mailgun') ? 'visible' : ''}`}>
                                         <hr className='h-ruler'></hr>
                                <fieldset className='mb-fs'>
                                    <div className='mbfs-in1'>
                                        <legend>
                                        Mailgun Settings
                                        </legend>
                                        <p>
                                        Your <a className='learn-more' href='#'>Mailgun API</a> Key will always be encrypted in our database. Sign up for a <a className='learn-more' href='#'>Mailgun</a> account.
                                        <br></br><br></br>
                                        Need help? Check <a className='learn-more' href='#'> our instructions</a>.

                                        </p>

                                    </div>
                                    <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>From <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Your App <support@yourapp.com>"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Default from address for emails</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                        <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>API Key <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Mailgun API Key"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Your Mailgun API Key</p>

                                        </div>
                                        
                                        <div className='mbfs-inner2'>
                                            
                                        </div>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Domain <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Domain"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Your Domain registered with Mailgun</p>

                                        </div>
                                        
                                        <div className='mbfs-inner2'>
                                            
                                        </div>
                                        <div className='radio-section'>
                                        <label for="sp-inp" className='label-sp'>Region</label>
                                        <div className='d-flex sp-input'>
                                        <input type='radio' name='sp-inp' />Mailgun US 
                                        <input type='radio' name='sp-inp' />Mailgun EU 
                                        </div>
                                        </div>

                                        

                                    </div>


                                    </div>
                                    

                                </fieldset>
                                <div className='mandril-downpara1 mt-2'>
                                    <div className='mandril-downpara2'>
                                        <button className='btn viewbtn'>Save</button>
                                        <button className='btn newbtn'>Send Test Email</button>

                                    </div>
                                </div>
                            </div>

                            {/* FOR NEXT */}

                             {/* FOR SMTP */}

                             <div className={`smtp ${(selectedCard === 'smtpprovider') ? 'visible' : ''}`}>
                                         <hr className='h-ruler'></hr>
                                <fieldset className='mb-fs'>
                                    <div className='mbfs-in1'>
                                        <legend>
                                        SMTP Provider Settings
                                        </legend>
                                        <p>
                                        Your SMTP Credentials will always be encrypted in our database. A few important expectations about your server:
                                        <br></br> <br></br>
                                        <ul>
                                            <li>It must support LOGIN authentication</li>
                                            <li>It must support TLS 1.0 or higher</li>
                                        </ul>

                                        <br></br>
                                        Please save your settings and use the "send test email" button to test the connection.
                                        <br></br><br></br>
                                        Need help? Check <a className='learn-more' href='#'> our instructions</a>.

                                        </p>

                                    </div>
                                    <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>From <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="Your App <support@yourapp.com>"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Default from address for emails</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                        <div className='mbfs-in2'>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Host <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="your.smtp.host.com"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Hostname or IP address of your SMTP server.</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Port <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="587"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            <p>Port used by your SMTP server. Common ports include 25, 465, and 587. Please avoid using port 25 if you can, since many providers have limitations on this port.</p>

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Username <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="SMTP Username"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            {/* <p>Hostname or IP address of your SMTP server.</p> */}

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>
                                        <div className='mbfs-inner1'>
                                            <label className='inner1-label'>Password <span>*</span></label>
                                            <div className='inner1-div'>
                                            <input placeholder="SMTP Password"  type="text"  />
                                            <fieldset></fieldset>
                                            </div>
                                            {/* <p>Hostname or IP address of your SMTP server.</p> */}

                                        </div>
                                        <div className='mbfs-inner2'>
                                            
                                        </div>

                                    </div>

                                    </div>
                                    

                                </fieldset>
                                <div className='mandril-downpara1 mt-4'>
                                    <div className='mandril-downpara2'>
                                        <button className='btn viewbtn'>Save</button>
                                        <button className='btn newbtn'>Send Test Email</button>

                                    </div>
                                </div>
                            </div>

                            {/* END */}


                                        </div>
                                    </form>

                                </div>


                            </fieldset>
                           

                        </div>
                    </div>
                </div>

            </div>

        </div></div></div>
        )
    }
    
    export default Page7