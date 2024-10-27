'use client'
import { Button } from '@/components/ui/button';
import { ShoppingBasket } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const ProductItemDetails = ({ product }) => {
    // Cek apakah gambar tersedia
    const imageUrl = product.images && product.images.length > 0
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`
        : null;

    // Debugging: Cek apakah product memiliki itemQuantityType
    console.log(product); // Hapus ini setelah debugging

    const [productTotalPrice, setProductTotalPrice] = useState(
        product.sellingPrice || product.mrp
    );

    const [quantity, setQuantity] = useState(1);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            {imageUrl ? ( // Cek apakah URL gambar ada
                <Image
                    src={imageUrl}
                    width={300}
                    height={300}
                    alt={product.images[0].name || 'Product Image'} // Gunakan nama gambar sebagai alt
                    className="object-contain bg-slate-200 p-5 h-[320px] w-[300px] rounded-lg" // Untuk memastikan gambar tidak terdistorsi
                />
            ) : (
                <div className='w-full h-[200px] bg-gray-300 flex justify-center items-center'>
                    <p className='text-gray-600'>No Image Available</p>
                </div>
            )}
            {/* Menampilkan informasi lain tentang produk */}
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <h2 className='text-sm text-gray-500'>{product.description}</h2>
                <div className='flex gap-3 text-3xl'>
                    {product.sellingPrice && (
                        <h2 className='font-bold text-3xl'>${product.sellingPrice}</h2>
                    )}
                    <h3 className={`font-bold text-3xl ${product.sellingPrice ? 'line-through text-gray-500' : ''}`}>
                        ${product.mrp}
                    </h3>
                </div>
                <h2 className='text-medium font-lg'>Quantity: {product.itemQuantityType}</h2>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3 items-center'>
                        <div className='p-2 border flex gap-10 items-center px-5'>
                            <button disabled={quantity===1} onClick={()=>setQuantity(quantity-1)}>-</button>
                            <button>{quantity}</button>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='text-2xl font-bold'> = ${(quantity*productTotalPrice).toFixed(2)}</h2>
                    </div>
                    <Button className='flex gap-3'>
                        <ShoppingBasket />
                        Add To Cart
                    </Button>
                </div>
                {/* Menampilkan kategori */}
                <h2>
                    <span className='font-bold'>Category:</span>
                    {Array.isArray(product.categories) && product.categories.length > 0
                        ? product.categories.map((category) => category.name).join(', ') // Menampilkan kategori sebagai string
                        : ' No Category' // Jika tidak ada kategori
                    }
                </h2>
            </div>
        </div>
    );
};

export default ProductItemDetails;
