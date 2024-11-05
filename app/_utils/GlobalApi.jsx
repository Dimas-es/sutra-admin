const { default: axios } = require("axios");

// Sesuaikan dengan URL backend
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api'
});

// Fungsi untuk menambah produk ke keranjang
const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
});

// Fungsi API lainnya
const getCategory = () => axiosClient.get('/categories?populate=*');
const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => resp.data.data);
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => resp.data.data);
const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => resp.data.data);
const getProductByCategory = (category) => axiosClient.get('/products?filters[categories][name][$in]=' + category + "&populate=*").then(resp => resp.data.data);
const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', { username, email, password });
const SignIn = (email, password) => axiosClient.post('/auth/local', { identifier: email, password });
const getCartItem = (userid, jwt) => axiosClient.get('/user-carts?filters[userid][$eq]='+userid+'8&populate=*',
    {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    }
).then(resp=>{
    return resp.data.data
})


// Ekspor semua fungsi API
export default {
    getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductByCategory,
    registerUser,
    SignIn,
    addToCart,
    getCartItem
};
