import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Heading, ProductsRow } from '../../components';
import CartCountContext from '../../contexts/cartCountContext';
import { ProductCard } from './components';
import api from '../../api';
import './ProductPage.scss';

function ProductPage(props) {
    const [product, setProduct] = useState(null);
    const { categorySlug, productSlug } = useParams();
    const [products, setProducts] = useState([]);
    const cartCountFromContext = useContext(CartCountContext);
    const [disable, setDisable] = useState(false);
    const [buttonText, setButtonText] = useState('Add to cart');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${api}/product/getAll-client?categorySlug=${categorySlug}&limit=3`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                const coupons = json.coupons;
                let coupon = null;
                for (let i = 0; i < coupons.length; i++) {
                    const couponFromArray = coupons[i];
                    if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                        coupon = couponFromArray;
                        break;
                    }
                }
                if (!coupon && coupons.length > 0) coupon = coupons[0];
                let productCouponSlugs = [];
                if (coupon && coupon.productCoupons.length > 0) productCouponSlugs = coupon.productCoupons.map((productCoupon) => productCoupon.product.slug);
                const data = [].map.call(json.data, (product) => {
                    let discountedPrice = null;
                    let value = null;
                    if (coupon) {
                        let flag = true;
                        if (coupon.redeemBy && new Date(coupon.redeemBy) < new Date()) flag = false;
                        if (coupon.maxRedemptions <= coupon.timesRedeeemed) flag = false;
                        if (flag && !coupon.hasPromotionCodes) {
                            if (coupon.appliedToProducts && productCouponSlugs.includes(product.slug)) {
                                if (coupon.type === 'Fixed Amount Discount') {
                                    discountedPrice = (product.prices[0].amount - coupon.amountOff);
                                    value = `$${coupon.amountOff}`;
                                } else {
                                    discountedPrice = (product.prices[0].amount - (product.prices[0].amount * (coupon.percentOff / 100))).toFixed(2);
                                    value = `${coupon.percentOff}%`;
                                }
                            }
                        }
                    }
                    return {
                        name: product.name,
                        slug: product.slug,
                        shortDescription: product.shortDescription,
                        price: `$ ${product.prices[0].amount}`,
                        discountedPrice: discountedPrice ? `$ ${discountedPrice}` : null,
                        value: value,
                        quantity: product.quantity,
                        image: product.images[0].path,
                        category: {
                            slug: categorySlug,
                        },
                    };
                })
                setProducts(data);
            } catch (error) {
            }
            // setProducts([
            //     {
            //         id: 1,
            //         name: 'Product 1',
            //         slug: 'product-1',
            //         price: '$100',
            //         image: '/Products/Product 2.jpeg',
            //         category: {
            //             id: 1,
            //             name: 'Kitchen Towels',
            //             slug: 'category-1',
            //         },
            //     },
            //     {
            //         id: 2,
            //         name: 'Product 2',
            //         slug: 'product-2',
            //         price: '$200',
            //         image: '/Products/Product 1.jpeg',
            //         category: {
            //             id: 1,
            //             name: 'Kitchen Towels',
            //             slug: 'category-1',
            //         },
            //     },
            //     {
            //         id: 3,
            //         name: 'Product 3',
            //         slug: 'product-3',
            //         price: '$300',
            //         image: '/Products/Product 3.jpeg',
            //         category: {
            //             id: 1,
            //             name: 'Kitchen Towels',
            //             slug: 'category-1',
            //         },
            //     },
            // ]);
            // }
        };
        fetchProducts();
    }, [categorySlug])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${api}/product/getProduct-client?slug=${productSlug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
            const json = await response.json();
            const product = json.data;
            const types = json.types;
            const coupons = json.coupons;
            let coupon = null;
            for (let i = 0; i < coupons.length; i++) {
                const couponFromArray = coupons[i];
                if (couponFromArray.redeemBy && new Date(couponFromArray.redeemBy) >= new Date()) {
                    coupon = couponFromArray;
                    break;
                }
            }
            if (!coupon && coupons.length > 0) coupon = coupons[0];
            let productCouponSlugs = [];
            if (coupon && coupon.productCoupons.length > 0) productCouponSlugs = coupon.productCoupons.map((productCoupon) => productCoupon.product.slug);
            const detailObject = {};
            types.forEach(type => {
                detailObject[type.name] = [];
            });
            product.details.forEach(detail => {
                detailObject[detail.type.name].push({
                    label: detail.label,
                    text: detail.text,
                    order: detail.order
                });
            });
            document.title = `${product.name} | The Sew Story`;
            let discountedPrice = null;
            let value = null;
            if (coupon) {
                let flag = true;
                if (coupon.redeemBy && new Date(coupon.redeemBy) < new Date()) flag = false;
                if (coupon.maxRedemptions <= coupon.timesRedeeemed) flag = false;
                if (flag && !coupon.hasPromotionCodes) {
                    if (coupon.appliedToProducts && productCouponSlugs.includes(product.slug)) {
                        if (coupon.type === 'Fixed Amount Discount') {
                            discountedPrice = (product.prices[0].amount - coupon.amountOff);
                            value = `$${coupon.amountOff}`;
                        } else {
                            discountedPrice = (product.prices[0].amount - (product.prices[0].amount * (coupon.percentOff / 100))).toFixed(2);
                            value = `${coupon.percentOff}%`;
                        }
                    }
                }
            }
            setProduct({
                productCode: product.productCode,
                name: product.name,
                slug: product.slug,
                price: `$ ${product.prices[0].amount}`,
                discountedPrice: discountedPrice ? `$ ${discountedPrice}` : null,
                value: value,
                quantity: product.quantity,
                images: product.images,
                details: detailObject,
                types: types,
                story: product.story,
                storyWrittenBy: product.storyWrittenBy,
                storyImagePath: product.storyImagePath,
            });
            // try {
            //     setProduct({
            //         id: 1,
            //         productCode: 'KZSS010',
            //         name: 'Kaneez',
            //         slug: 'product-1',
            //         price: '24.99',
            //         image: '/Products/Product 7.jpeg',
            //         description1: 'Pack of 2 Kitchen Towels',
            //         description2: 'White, Turquoise Blue, Sea Green',
            //         description3: 'Made with 100% cotton',
            //         description4: '4.00 lbs/Dozen',
            //         description5: '20 x 30 inches',
            //         description6: 'Made in Pakistan',
            //         location: 'Interior Sindh',
            //         story: 'Kaneez belongs to a small village in interior Sindh. She moved to Karachi with her husband and four kids five years ago in search of better work opportunities and life style. She currently resides in a rented small one-bedroom house. Her husband works as an electrician and welder with a construction team and is paid Rs.350 (approximately $2 USD) per day which is just enough to manage to get food on the table each day. Kaneez manages to contribute to the household expenses sometimes if she is able to get sewing or embroidery work from her neighborhood and society women. Her kids aged 4,5,7 and 9 all used to go to school but earlier this year due to insufficient funds, the two older kids were withdrawn from school and were asked to help work along their parents to contribute to the household income.Kaneez met The Sew Story tea, in August 2021 and has been an integral member of our team since then. She has been able to enroll all her kids back in school and The Sew Story team has taken up the responsibility to pay their education expenses',
            //     });
            // } catch (error) {
            //     console.log(error);
            // }
        };
        fetchProduct();
    }, [productSlug, categorySlug])

    const addToCart = (product) => {
        const slug = product.slug;
        const stock = product.quantity;
        var cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
        if (cartProducts) {
            const productExists = cartProducts.find(item => item.slug === slug);
            if (productExists) {
                if (productExists.quantity + quantity <= stock) {
                    productExists.quantity += quantity;
                    setDisable(true);
                    setButtonText('Added');
                    setTimeout(() => {
                        setDisable(false);
                        setButtonText('Add to cart');
                    }, 2500);
                } else {
                    setDisable(true);
                    setButtonText('Not enough stock');
                }
            } else {
                cartProducts.push({ slug, quantity: quantity });
                cartCountFromContext.setCartCount(cartCountFromContext.cartCount + 1);
                setDisable(true);
                setButtonText('Added');
                setTimeout(() => {
                    setDisable(false);
                    setButtonText('Add to cart');
                }, 2500);
            }
        } else {
            if (quantity <= stock) {
                cartProducts = [{ slug, quantity: quantity }];
                cartCountFromContext.setCartCount(cartCountFromContext.cartCount + 1);
                setDisable(true);
                setButtonText('Added');
                setTimeout(() => {
                    setDisable(false);
                    setButtonText('Add to cart');
                }, 2500);
            } else {
                setDisable(true);
                setButtonText('Not enough stock');
            }
        }
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }


    return (
        <div className="product-page">
            <div className="product-back margin-global-top-5">
                <ProductCard addToCart={addToCart} buttonText={buttonText} quantity={quantity} setQuantity={setQuantity} product={product} disable={disable} />
            </div>
            <Heading
                text="More Products"
                className="text-center margin-global-top-3"
            />
            <div className="white-background our-products-back">
                <ProductsRow
                    products={products}
                    categories={null}
                    className="white-background"
                />
                <div className="center-relative-horizontal-fit-content">
                    <Link className="collection-link" to={`/${categorySlug}`}>View Collection</Link>
                </div>
                <Container>
                    <div className="bottom-line center-relative-horizontal" />
                </Container>
            </div>
        </div>
    );
}

export default ProductPage;