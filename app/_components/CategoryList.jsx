import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CategoryList = ({ categoryList }) => {
    return (
        <div>
            <h2 className='text-primary font-bold text-2xl mt-4'>Shop by Category</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 mt-2'>
                {categoryList.map((category, index) => (
                    <Link href={'/products-category/'+category.name} className='flex flex-col items-center bg-green-100 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200' key={index}> {/* Tambahkan key agar React bisa mengidentifikasi elemen */}
                        <Image
                            src={
                                // Gunakan BASE_URL untuk mengakses gambar
                                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                                category.icon[0].url
                            }
                            alt={category.icon[0].name || 'icon'} // Ambil nama ikon sebagai alt
                            width={50}
                            height={50}
                            className='group-hover:scale-125 transition-all ease-in-out'
                        />
                        <h2 className='text-green-800'>{category.name}</h2>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
