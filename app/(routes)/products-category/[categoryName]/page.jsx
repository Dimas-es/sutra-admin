import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

async function fetchData(categoryName) {
  let productList = [];
  let categoryList = [];

  try {
    productList = await GlobalApi.getProductByCategory(categoryName) || [];
    categoryList = await GlobalApi.getCategoryList() || [];
  } catch (error) {
    console.error("Error fetching data in ProductCategory:", error);
  }

  return { productList, categoryList };
}

const ProductCategory = async ({ params }) => {
  const categoryName = params.categoryName;

  if (!categoryName) {
    console.error("categoryName tidak ditemukan.");
    return <p>Category tidak tersedia</p>;
  }

  const { productList, categoryList } = await fetchData(categoryName);

  return (
    <div>
      <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center'>
        {categoryName}
      </h2>
      <TopCategoryList categoryList={categoryList} selectedCategory={categoryName} />
      <div className='p-5 md:p-10'>
        <ProductList productList={productList} />
      </div>
    </div>
  );
};

export default ProductCategory;
