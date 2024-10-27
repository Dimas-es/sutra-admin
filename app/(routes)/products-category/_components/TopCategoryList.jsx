import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  if (!Array.isArray(categoryList) || categoryList.length === 0) return null; // Pastikan categoryList adalah array dan tidak kosong

  return (
    <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center'>
      {categoryList.map((category, index) => {
        const isSelected = selectedCategory === category.name; // Cek kategori yang dipilih
        return (
          <Link
            href={`/products-category/${category.name}`}
            className={`flex flex-col items-center bg-green-100 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px] ${isSelected ? 'bg-green-600 text-white' : ''}`}
            key={index}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.icon[0].url}`}
              alt={category.icon[0].name || 'icon'}
              width={50}
              height={50}
              className='group-hover:scale-125 transition-all ease-in-out'
            />
            <h2 className={`text-green-800 group-hover:text-white ${isSelected ? 'text-white' : ''}`}>
              {category.name}
            </h2>
          </Link>
        );
      })}
    </div>
  );
};

export default TopCategoryList;
