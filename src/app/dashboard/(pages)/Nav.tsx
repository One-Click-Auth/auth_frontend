import React from "react"
import { Switch } from "@/components/ui/Switch"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { AccountDropdown } from "./Dropdown"

function AccountNav() {
    return (
        <div className="flex items-center justify-end min-w-max sticky top-0" >
            <div className="flex items-center gap-1 mr-10" >
                <Switch />
                <span className="font-semibold text-xs sm:text-sm min-w-max" >
                    IAM mode
                </span>
            </div>
            <div className="flex items-center gap-1" >
                <AccountDropdown />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

        </div>
    )
}

export default AccountNav