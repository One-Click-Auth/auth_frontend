"use client"
import React, { useState } from 'react';
import Page1 from './page1/page';
import Page2 from './page2/page';
import Page3 from './page3/page';
import Page4 from './page4/page';
import Page5 from './page5/page';
import Page6 from './page6/page';
import Page7 from './page7/page';
import "./dashboard.css";

const Dashboard = () => {

    const [page, setPage] = useState("page1");

    return (
            <div className="col-9">
                {
                    page === "page1" ?
                        <>
                            <Page1 />
                        </> : <></>
                }
                {
                    page === "page2" ?
                        <>
                            <Page2 />
                        </> : <></>
                }
                {
                    page === "page3" ?
                        <>
                            <Page3 />
                        </> : <></>
                }
                {
                    page === "page4" ?
                        <>
                            <Page4 />
                        </> : <></>
                }
                {
                    page === "page5" ?
                        <>
                            <Page5 />
                        </> : <></>
                }
                {
                    page === "page6" ?
                        <>
                            <Page6 />
                        </> : <></>
                }
                {
                    page === "page7" ?
                        <>
                            <Page7 />
                        </> : <></>
                }
                <button onClick={() => setPage("page2")}>Go to step 2</button>
            </div>
    )
}

export default Dashboard
