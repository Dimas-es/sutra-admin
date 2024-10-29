const { default: axios } = require("axios");

// Sesuaikan dengan URL backend kamu
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
});

// Ambil kategori
const getCategory = () => axiosClient.get('/categories?populate=*');

// Ambil slider
const getSliders = () =>
    axiosClient.get('/sliders?populate=*').then(resp => {
        console.log("Sliders Response:", resp.data); // Log respons slider
        return resp.data.data;
    });

// Ambil daftar kategori
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => {
    return resp.data.data;
});

// Ambil semua produk
const getAllProducts = () =>
    axiosClient.get('/products?populate=*').then(resp => {
        console.log("Products Response:", resp.data); // Log respons produk
        return resp.data.data;
    });

const getProductByCategory=(category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+"&populate=*").then(resp=>{
    return resp.data.data;
})

// Ekspor fungsi API
export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductByCategory
};
