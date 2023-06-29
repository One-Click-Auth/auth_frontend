"use client"
import React from "react"
import { usePathname } from "next/navigation"
import Settings from "./(pages)/settings/page"
import Support from "./(pages)/support/page"
import AccountIndex from "./(pages)/Index"
import AddOrganization from "./(pages)/add-organization/page"

function Account() {

    const location = usePathname()

    return (
        <>
            {
                location === "/dashboard/settings" ?
                    <Settings /> : location === "/dashboard" ?
                        <AccountIndex /> : location === "/dashboard/support" ?
                            <Support /> : 
                            location === "/dashboard/add-organization" ?
                                <AddOrganization /> :
                                 "Not Found"
            }
        </>

    )
}

export default Account