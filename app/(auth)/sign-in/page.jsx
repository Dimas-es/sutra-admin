'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"


const SignIn = () => {
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const route = useRouter()
    const [loader, setLoader] = useState();

    const onSignIn = () => {
        setLoader(true)
        GlobalApi.SignIn( email, password).then(resp => {
            sessionStorage.setItem('user', JSON.stringify(resp.data.user))
            sessionStorage.setItem('jwt', resp.data.jwt)
            toast("Sukses")
            route.push('/')
            setLoader(false)

        }, (e) => {
            console.log(e)
            toast(e?.response?.data?.error?.message)
            setLoader(false)
        })
    }
    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logog.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Sign In to Account</h2>
                <h2 className='text-gray-500'>Masukan Email dan Password</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='name@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={onSignIn} disabled={!( email && password)}>
                        {loader?<LoaderIcon className='animate-spin'/>:'Sign In'}
                    </Button>

                    <p>Don't have an account?
                        <Link className='text-blue-500' href={'/create-account'}>Click here to Create new account</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn