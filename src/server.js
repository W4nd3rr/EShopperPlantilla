import express from 'express';
import path    from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

const productos = [
    { id: 1,  nombre: 'Colorful Stylish Shirt',  precio: 123.00, precioAntes: 150.00, imagen: 'product-1.jpg' },
    { id: 2,  nombre: 'Casual Slim-Fit Jeans',   precio:  89.00, precioAntes: 110.00, imagen: 'product-2.jpg' },
    { id: 3,  nombre: 'Summer Floral Dress',      precio:  65.00, precioAntes:  80.00, imagen: 'product-3.jpg' },
    { id: 4,  nombre: 'Classic White T-Shirt',    precio:  29.00, precioAntes:  null,  imagen: 'product-4.jpg' },
    { id: 5,  nombre: 'Leather Biker Jacket',     precio: 199.00, precioAntes: 249.00, imagen: 'product-5.jpg' },
    { id: 6,  nombre: 'Sporty Running Shoes',     precio:  95.00, precioAntes: 120.00, imagen: 'product-6.jpg' },
    { id: 7,  nombre: 'Elegant Evening Gown',     precio: 175.00, precioAntes:  null,  imagen: 'product-7.jpg' },
    { id: 8,  nombre: 'Knit Pullover Sweater',    precio:  55.00, precioAntes:  70.00, imagen: 'product-8.jpg' },
];

const categorias = [
    { nombre: "Men's dresses",   imagen: 'cat-1.jpg', cantidad: 15 },
    { nombre: "Women's dresses", imagen: 'cat-2.jpg', cantidad: 15 },
    { nombre: "Baby's dresses",  imagen: 'cat-3.jpg', cantidad: 12 },
    { nombre: 'Accessories',     imagen: 'cat-4.jpg', cantidad: 20 },
    { nombre: 'Bags',            imagen: 'cat-5.jpg', cantidad: 8  },
    { nombre: 'Shoes',           imagen: 'cat-6.jpg', cantidad: 18 },
];

const carritoEjemplo = [
    { ...productos[0], cantidad: 2 },
    { ...productos[2], cantidad: 1 },
];

const infoContacto = [
    { icono: 'fa fa-map-marker-alt', texto: '123 Street, New York, USA' },
    { icono: 'fa fa-phone-alt',      texto: '+012 345 67890'            },
    { icono: 'fa fa-envelope',       texto: 'info@eshopper.com'         },
];

const paises = ['Dominican Republic', 'United States', 'Mexico', 'Colombia', 'Argentina', 'Spain'];

const calcularSubtotal = (carrito) =>
    carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle:   'Home',
        currentPage: 'home',
        productos,
        categorias,
    });
});

app.get('/shop', (req, res) => {
    res.render('shop', {
        pageTitle:   'Our Shop',
        currentPage: 'shop',
        productos,
    });
});

app.get('/cart', (req, res) => {
    const carrito = carritoEjemplo;
    res.render('cart', {
        pageTitle:   'Shopping Cart',
        currentPage: 'cart',
        carrito,
        subtotal: calcularSubtotal(carrito),
    });
});

app.get('/checkout', (req, res) => {
    const carrito = carritoEjemplo;
    res.render('checkout', {
        pageTitle:    'Checkout',
        currentPage:  'checkout',
        resumenOrden: carrito,
        subtotal:     calcularSubtotal(carrito),
        paises,
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        pageTitle:    'Contact Us',
        currentPage:  'contact',
        infoContacto,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅  Servidor corriendo en http://localhost:${PORT}`);
});
