import img1 from "../../../public/images/product-1.jpg";
import img2 from "../../../public/images/product-2.jpg";
import img3 from "../../../public/images/product-3.jpg";
import img4 from "../../../public/images/product-4.jpg";

/* assuming flat fee for most kits is $3-5 + yarn($) + detailed instructions($) */
const products = [
 {
    key: 1,
    img: img1.src, 
    title: "Aria Bralette Top",
    category: "Tops",
    price: 10.99,
    pcode: "SS101",
    desc: "This Simple Summer Crochet Kit includes everything you need to create your own comfortable and stylish Aria Bralette Top.",
 },
 {
    key: 2,
    img: img2.src,
    title: "Totoro",
    category: "Amigurumi",
    price: 12.99,
    pcode: "AA101",
    desc: "This Adorable Amigurumi Crochet Kit includes everything you need to create your own adorable and squishy Totoro Amigurumi toy.",
 },
 {
    key: 3,
    img: img3.src,
    title: "Leila Mesh Pullover",
    category: "Tops",
    price: 12.99,
    pcode: "SS102",
    desc: "This Simple Summer Crochet Kit includes everything you need to create your own comfortable and stylish Leila Mesh Pullover.",
 },
 {
    key: 4,
    img: img4.src,
    title: "Elena Book Bag",
    category: "Bags",
    price: 14.99,
    pcode: "PS101",
    desc: "This Practically Soft Crochet Kit includes everything you need to create your own lightweight and stylish Elena Book Bag.",
 },
]

export default products;