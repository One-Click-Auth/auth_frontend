import React from 'react'
import {FaAngleRight, FaApple, FaGoogle, FaMicrosoft} from "react-icons/fa";
import { Button } from '../../components/ui/Button';


const Signup = () => {
  

  return (
    <div>
      <div className="login-2-page">
        <div className="container">
          <div className="row login-row">

          <div class="col-xs-12 col-sm-12 col-lg-6">
                <div>
                  <div className="main-text-signup">
                    <div>
                      <h4 class="r-top-title">
                        <span class="a-t-s">Lend. Borrow. Earn</span>&nbsp; with Flitchcoin</h4>
                        </div>
                        <h3 class="r-main-title">Create Personal Account</h3>
                        </div>

                        <div class="d-grid pt-4">
                          <button class="btn btn-signup block btn-spl-primary" href="/register">
                            <a className='signup-a' href='/register'>
                          <span className="signup-txt"> Signup with Email
                          
                          </span><span className="forward-arr"> <FaAngleRight/></span>
                          </a>
                            </button>
                          </div>
                          </div>

                          <div className="relative mt-4">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                              </span>
                            </div>
                          </div>
                          <div className='buttons-row pt-4'>
                            <Button variant="outline" className='new_btns button1'>
                              <span className='icon1'> <FaGoogle/> </span> Google
                              </Button>
                            <Button variant="outline" className='new_btns button2'><span className='icon2'> <FaApple /> </span>Apple</Button>
                            <Button variant="outline" className='new_btns button3'><span className='icon3'> <FaMicrosoft/> </span>Microsoft</Button>
                          </div>
                            <p className="flex justify-center text-lg leading-7 [&:not(:first-child)]:mt-6">
                            I don’t have Flitchcoin account <a className='highlighted-text' href='#'>advance to Signup </a>  <span className="move-arr"> <FaAngleRight/> </span>
                            </p>
                        
                    
            </div>


            <div class="col-xs-12 col-sm-12 col-lg-6 login-a-center">

            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Signup