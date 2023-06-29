import React from "react"
import AccountNav from "./(pages)/Nav"
import { Sidebar } from "./(pages)/Sidebar"

interface AccountLayoutType {
    children: React.ReactNode
}
function AccountLayout({ children }: AccountLayoutType) {
    return (
        <div className="flex" >
            <div className="min-h-screen bg-black" >
                <Sidebar />
            </div>
            <div className="w-full px-2 sm:px-4 py-3 max-w-full overflow-x-auto" >
                <AccountNav />
                <div className="mt-16" >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AccountLayout