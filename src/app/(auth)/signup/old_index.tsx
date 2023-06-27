import React from "react";
import { FaAngleRight, FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

const Signup = () => {
  return (
    <div>
      <div className="login-2-page">
        <div className="container">
          <div className="row login-row">
            <div className="col-xs-12 col-sm-12 col-lg-6">
              <div>
                <div className="main-text-signup">
                  <div>
                    <h4 className="r-top-title">
                      <span className="a-t-s">Lend. Borrow. Earn</span>&nbsp;
                      with Flitchcoin
                    </h4>
                  </div>
                  <h3 className="r-main-title">Create Personal Account</h3>
                </div>

                <div className="d-grid pt-4">
                  <button className="btn btn-signup block btn-spl-primary">
                    <Link className="signup-a flex items-center justify-center" href="/register">
                      <span className="signup-txt">Next</span>
                      <span className="forward-arr text-2xl mt-[2px]">
                        {" "}
                        <FaAngleRight />
                      </span>
                    </Link>
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
              <div className="buttons-row pt-4">
                <Button variant="outline" className="new_btns button1">
                  <span className="icon1">
                    {" "}
                    <FaGoogle />{" "}
                  </span>{" "}
                  Google
                </Button>
                <Button variant="outline" className="new_btns button2">
                  <span className="icon2">
                    {" "}
                    <FaApple />{" "}
                  </span>
                  Apple
                </Button>
                <Button variant="outline" className="new_btns button3">
                  <span className="icon3">
                    {" "}
                    <FaMicrosoft />{" "}
                  </span>
                  Microsoft
                </Button>
              </div>
              <div className="ats-content pt-4">
                <p className="mb-0 text-center">I already have an AuthX account      &nbsp;
                  <Link className="a-t-s a-link" href="/">advance to Login </Link>
                  <span className="forward-arr arr-black"> <FaAngleRight className='pt-2' /></span>
                </p></div>
            </div>

            <div className="col-xs-12 col-sm-12 col-lg-6 login-a-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
