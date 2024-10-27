'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
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

function Header() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getCategoryList();
    }, [])

    const getCategoryList = async () => {
        try {
            const resp = await GlobalApi.getCategory();
            console.log(resp.data.data); // Debugging
            setCategoryList(resp.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            // Optionally: set error state and display a message to the user
        }
    }

    return (
        <div className='p-5 shadow-sm flex justify-between'>
            <div className='flex items-center gap-8'>
                <Image src='/logo.png' alt='logo' width={150} height={100} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                            <LayoutGrid className='h-5 w-5' /> Category
                        </h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categoryList.map((category) => (
                            <Link href={'/products-category/'+category.name}>
                            <DropdownMenuItem className='flex gap-2 items-center' key={category.id}>
                                {category.icon && category.icon.length > 0 && (
                                    <Image
                                        src={
                                            // Gunakan BASE_URL untuk mengakses gambar
                                            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                                            category.icon[0].url
                                        }
                                        alt={category.icon[0].name || 'icon'} // Ambil nama ikon sebagai alt
                                        width={30}
                                        height={30}
                                    />
                                )}
                                <h2 className='text-lg'>{category.name}</h2>
                            </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                    <Search />
                    <input type="text" placeholder='Search' className='outline-none' />
                </div>
            </div>
            <div className='flex gap-5 items-center'>
                <h2 className='flex gap-2 items-center'> <ShoppingBag />0</h2>
                <Button>Login</Button>
            </div>
        </div>
    )
}

export default Header;
