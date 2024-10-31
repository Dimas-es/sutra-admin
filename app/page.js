import { Button } from "@/components/ui/button";
import Image from "next/image";
import Sliders from "./_components/Sliders";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
    const sliderList = await GlobalApi.getSliders();
    // const categoryList = await GlobalApi.getCategoryList();
    const productList = await GlobalApi.getAllProducts();

    return (
        <div className="p-8 md:p-12">
            {/* Sliders */}
            <Sliders sliderList={sliderList} />
            {/* Category */}
            {/* <CategoryList categoryList={categoryList}/> */}
            {/* Product */}
            <ProductList productList={productList}/>
            {/* Banner */}
            <Image src='/banner.png' width={1000} height={300} alt="banner" className="w-full h-[400px] object-contain mt-10"/>
            {/* footer */}
            <Footer/>
        </div>
    );
}
