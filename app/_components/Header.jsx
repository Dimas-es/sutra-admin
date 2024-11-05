'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CircleUserRound, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Header() {
    const [categoryList, setCategoryList] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null); // Tambahkan state untuk user
    const [totalCartItem, setTotalCartItem] = useState(0);
    const route = useRouter();

    useEffect(() => {
        getCategoryList();

        // Cek sessionStorage hanya di klien
        if (typeof window !== "undefined") {
            const storedUser = sessionStorage.getItem('user');
            setUser(storedUser ? JSON.parse(storedUser) : null);
            setIsLogin(!!sessionStorage.getItem('jwt'));
        }
    }, []);

    const getCategoryList = async () => {
        try {
            const resp = await GlobalApi.getCategory();
            console.log(resp.data.data); // Debugging
            setCategoryList(resp.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getCartItems = async () => {
        if (user) {
            const cartItemList = await GlobalApi.getCartItem(user);
            setTotalCartItem(cartItemList.length); // Contoh, tergantung respons API
        }
    }

    const onSignOut = () => {
        if (typeof window !== "undefined") {
            sessionStorage.clear();
            route.push('/sign-in');
        }
    };

    return (
        <div className='p-5 shadow-md flex justify-between'>
            <div className='flex items-center gap-8'>
                <Image src='/logog.png' alt='logo' width={100} height={50} />
                <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                    <Search />
                    <input type="text" placeholder='Search' className='outline-none' />
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <h2 className='flex gap-2 items-center'> <ShoppingBasket className='h-7 w-7' />
                    <span className='bg-primary text-white px-2 rounded-full'>{totalCartItem}</span>
                </h2>
                {!isLogin ? (
                    <Link href={'/sign-in'}>
                        <Button>Login</Button>
                    </Link>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <CircleUserRound className='h-7 w-7 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>My Order</DropdownMenuItem>
                            <DropdownMenuItem onClick={onSignOut}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );
}

export default Header;
