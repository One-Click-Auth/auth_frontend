import React,{useState} from 'react';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Navbar from "./navbar";
import "./dashboard.css";
import Page6 from './page6';
import Page7 from './page7';

const Dashboard = () => {

    const [page,setPage] = useState("page1");

  return (
    <div className="row">
        <div className="col-3">
            <Navbar/>
        </div>
        <div className="col-9">
            {
                page === "page1" ?
                <>
                <Page1/>
                </>:<></>
            }
            {
                page === "page2" ?
                <>
                <Page2/>
                </>:<></>
            }
            {
                page === "page3" ?
                <>
                <Page3/>
                </>:<></>
            }
             {
                page === "page4" ?
                <>
                <Page4/>
                </>:<></>
            }
            {
                page === "page5" ?
                <>
                <Page5/>
                </>:<></>
            }
            {
                page === "page6" ?
                <>
                <Page6/>
                </>:<></>
            }
            {
                page === "page7" ?
                <>
                <Page7/>
                </>:<></>
            }
            <button onClick={() => setPage("page2") }>Go to step 2</button>
        </div>
    </div>
  )
}

export default Dashboard