import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { DatabaseSvg } from '../../../assets/Svg/Account/Account'
import { Button } from '../../../components/ui/Button'
import { useRouter } from 'next/navigation'
import OrgList from './OrgList'

function AccountIndex() {

    const [hasOrg, setHasOrg] = useState(false)
    const [data, setData] = useState(null)
    const router = useRouter()

    // useEffect(() => {
    //     fetch('https://api.trustauthx.com/org/all', {
    //         method: 'GET',
    //         headers: {
    //             'accept': 'application/json',
    //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaHlhbWNoNzI4QGdtYWlsLmNvbSIsImFsdCI6IjY3MGQ0ZTgzZDEwYjQzMzc4ZTRmMmVjZmVjODEwYzhjLTJlYTAyMTkwOTAyNjVlMDZiZjZlOWQ1MmUwYzU0MmNiIiwicG9vbCI6dHJ1ZSwic2NvcGUiOjEsImV4cCI6MTY4Nzg0MTk0MH0.q0S8wAeTx3GyWwyQ8R8wtGjNI6fCDz6rUkGXFPBVaW0'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data[0].name) {
    //                 console.log(data);
    //                 setData(data)
    //                 setHasOrg(true)
    //             } else {
    //                 setHasOrg(false)
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setData(null)
    //         });
    // }, [])


    const handleNavigation = () => {
        router.push("/dashboard/add-organization")
    }

    // useEffect(() => {
    //     if (data[0]?.name)
    //         if (data[0].name !== "") {
    //             setHasOrg(true)
    //         }
    // }, [data, router])
    return (
        <section className='oveflow-x-auto'>
            {!hasOrg &&
                <div style={{ height: 'calc(100vh - 100px)' }} className='max-w-xl m-auto text-center flex items-center justify-center flex-col'   >
                    <div>
                        <div className='grid grid-cols-2 max-w-[280px] m-auto ' >
                            <DatabaseSvg />
                            <DatabaseSvg />
                            <DatabaseSvg />
                            <DatabaseSvg />
                        </div>
                        <p className='text-center my-5' >Represent the teams, business customers, and partner companies that access your applications as organizations in Auth0.</p>
                        <div className='hover:text-white' >
                            <Button onClick={handleNavigation} className="bg-accent" variant="primary" > <Plus />
                                Create New Organization
                            </Button>
                        </div>
                    </div>
                </div>
            }

            {/* {hasOrg && <OrgList data={data} />} */}

        </section>
    )
}

export default AccountIndex