import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProductItemDetails from './ProductItemDetails';


const ProductItem = ({ product }) => {
    // Cek apakah gambar tersedia
    const imageUrl = product.images && product.images.length > 0
        ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`
        : null;

    return (
        <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border border-primary rounded-lg hover:scale-105 cursor-pointer hover:shadow-md transition-all ease-in-out">
            {imageUrl ? ( // Cek apakah URL gambar ada
                <Image
                    src={imageUrl}
                    width={500}
                    height={200}
                    alt={product.images[0].name || 'Product Image'} // Gunakan nama gambar sebagai alt
                    className="h-[200px] w-[200px] object-contain"
                />
            ) : (
                <div className='w-full h-[200px] bg-gray-300 flex justify-center items-center'>
                    <p className='text-gray-600'>No Image Available</p>
                </div>
            )}
            {/* Menambahkan nama produk */}
            <h2 className='font-bold text-lg'>{product.name}</h2>
            <div className='flex gap-3'>
                {product.sellingPrice && (
                    <h2 className='font-bold text-lg'>${product.sellingPrice}</h2>
                )}
                <h3 className={`font-bold text-lg ${product.sellingPrice ? 'line-through text-gray-500' : ''}`}>
                    ${product.mrp}
                </h3>
            </div>

            
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='text-primary hover:text-white hover:bg-primary' variant='outline'>
                Add to Cart
            </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                           <ProductItemDetails product={product}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default ProductItem;
