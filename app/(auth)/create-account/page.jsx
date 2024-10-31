'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"

const CreateAccount = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const route = useRouter();
    const [loader, setLoader] = useState();


    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            route.push('/');
        }
    }, [route]);

    const onCreateAccount = () => {
        setLoader(true)
        GlobalApi.registerUser(username, email, password)
            .then(resp => {
                sessionStorage.setItem('user', JSON.stringify(resp.data.user));
                sessionStorage.setItem('jwt', resp.data.jwt);
                toast("Sukses");
                route.push('/');
                setLoader(false)
            })
            .catch(e => {
                toast(e?.response?.data?.error?.message)
                setLoader(false)
            });
    };

    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200'>
                <Image src='/logog.png' width={200} height={200} alt='logo' />
                <h2 className='font-bold text-3xl'>Create an Account</h2>
                <h2 className='text-gray-500'>Masukkan Email dan Password</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input placeholder='name@example.com'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input type='password' placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={onCreateAccount} disabled={!(username && email && password)}>

                        {loader ? <LoaderIcon className='animate-spin' /> : 'Create an Account'}

                    </Button>
                    <p>Already have an account?
                        <Link className='text-blue-500' href='/sign-in'> Click here to Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
