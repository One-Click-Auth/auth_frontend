"use client"
import React, { useState } from 'react'
import { Input } from '../../../../components/ui/Input'
import { Button } from '../../../../components/ui/Button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

function AddOrganization() {
    const router = useRouter()
    const [orgName, setOrgName] = useState("")

    const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setOrgName(e.target.value)
    }


    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        fetch('https://api.trustauthx.com/org', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaHlhbWNoNzI4QGdtYWlsLmNvbSIsImFsdCI6IjY3MGQ0ZTgzZDEwYjQzMzc4ZTRmMmVjZmVjODEwYzhjLTJlYTAyMTkwOTAyNjVlMDZiZjZlOWQ1MmUwYzU0MmNiIiwicG9vbCI6dHJ1ZSwic2NvcGUiOjEsImV4cCI6MTY4Nzg0MTk0MH0.q0S8wAeTx3GyWwyQ8R8wtGjNI6fCDz6rUkGXFPBVaW0',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": orgName
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                router.push("/dashboard")
            })
            .catch(error => {
                console.error(error);
            });


    }
    return (
        <div 
            // style={{ height: 'calc(100vh - 100px)' }} 
            className='max-w-4xl h-[calc(100vh-100px)] m-auto text-start flex items-center justify flex-col'   >

            <div className='max-w-6xl m-auto border border-slate-300 p-6 sm:p-12 rounded-md' >
                <h3 className='text-xl sm:text-3xl font-bold sm:mb-4 text-[#0f172a]' >Create A New Organization</h3>
                <p className='mb-4 max-w-2xl text-slate-700 text-sm sm:text-base' ><span className='font-semibold text-[#0f172a]' >*Name: </span> This is the name that will be displayed to end-users for this orgnaization in any intractioin with them.  </p>
                <label htmlFor="orgName font-semibold mb-2" className='font-semibold mb-1 text-[#0f172a]'  >*Name your orgnaization</label>
                <form className='flex flex-col lg:flex-row gap-1' onSubmit={handleSubmit} >
                    <Input type='text' className='border border-slate-300' placeholder='Your Organization Name' value={orgName} onChange={handleChange} required />
                    <div className='hover:text-white' >
                        <Button
                            onSubmit={handleSubmit}
                            className='bg-accent'
                            variant="primary"  >
                            <Plus />
                            <span className='pl-1' >
                                Create New Organization
                            </span>
                        </Button>
                    </div>

                </form>
            </div >
        </div >)
}

export default AddOrganization