import React from 'react';
import { UserTable } from './user';
import { StateForm, StateTable } from './state';
import { CityForm, CityTable } from './city';
import { CategoryForm, CategoryTable } from './category';
import { ProductForm, ProductTable } from './product';
import { DescriptionTypeForm, DescriptionTypeTable } from './descriptionType'
import { CouponForm, CouponTable } from './coupon';
import { PromotionCodeForm, PromotionCodeTable } from './promotionCode';
import { ShippingRateForm, ShippingRateTable } from './shippingRate';
import { GalleryForm, GalleryTable } from './gallery';
import { CreateCategoryData } from './category/categoryTable/CreateCategoryData';
import { CreateProductData } from './product/productTable/CreateProductData';
import { CreateUserData } from './user/userTable/CreateUserData';
import { CreateDescriptionTypeData } from './descriptionType/descriptionTypeTable/CreateDescriptionTypeData';
import { CreateStateData } from './state/stateTable/CreateStateData';
import { CreateCityData } from './city/cityTable/CreateCityData';
import { CreateCouponData } from './coupon/couponTable/CreateCouponData';
import { CreatePromotionCodeData } from './promotionCode/promotionCodeTable/CreatePromotionCodeData';
import { CreateShippingRateData } from './shippingRate/shippingRateTable/CreateShippingRateData';
import { CreateGalleryData } from './gallery/galleryTable/CreateGalleryData';
import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import api from '../../api';

function Database(props) {
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);
    const [historyChanged, setHistoryChanged] = React.useState(false);

    let history = useHistory();

    const {
        setLinkDisableObject
    } = props;

    const urlPath = window.location.pathname;
    let fetchUrl = '';
    let chosenFunction = function (params) { };
    if (urlPath === '/admin/user' || urlPath === '/admin/user/add') {
        fetchUrl = 'user/getAllUsers';
        chosenFunction = CreateUserData;
    } else if (urlPath === '/admin/category' || urlPath === '/admin/category/add' || urlPath.includes('/admin/category/edit')) {
        fetchUrl = 'category/getAllCategories';
        chosenFunction = CreateCategoryData;
    } else if (urlPath === '/admin/product' || urlPath === '/admin/product/add' || urlPath.includes('/admin/product/edit')) {
        fetchUrl = 'product/getAllProducts';
        chosenFunction = CreateProductData;
    } else if (urlPath === '/admin/description-type' || urlPath === '/admin/description-type/add' || urlPath.includes('/admin/description-type/edit')) {
        fetchUrl = 'type/getAllTypes';
        chosenFunction = CreateDescriptionTypeData;
    } else if (urlPath === '/admin/state' || urlPath === '/admin/state/add' || urlPath.includes('/admin/state/edit')) {
        fetchUrl = 'state/getAllStates';
        chosenFunction = CreateStateData;
    } else if (urlPath === '/admin/city' || urlPath === '/admin/city/add' || urlPath.includes('/admin/city/edit')) {
        fetchUrl = 'city/getAllCities';
        chosenFunction = CreateCityData;
    } else if (urlPath === '/admin/coupon' || urlPath === '/admin/coupon/add' || urlPath.includes('/admin/coupon/edit')) {
        fetchUrl = 'coupon/getAllCoupons';
        chosenFunction = CreateCouponData;
    } else if (urlPath === '/admin/promotion-code' || urlPath === '/admin/promotion-code/add') {
        fetchUrl = 'promotionCode/getAllPromotionCodes';
        chosenFunction = CreatePromotionCodeData;
    } else if (urlPath === '/admin/shipping-rate' || urlPath === '/admin/shipping-rate/add') {
        fetchUrl = 'shippingRate/getAllShippingRates';
        chosenFunction = CreateShippingRateData;
    } else if (urlPath === '/admin/order') {
        fetchUrl = 'order/getAllOrders';
    } else if (urlPath === '/admin/gallery') {
        fetchUrl = 'gallery/getAllImages';
        chosenFunction = CreateGalleryData;
    }

    history.listen((location, action) => {
        setRows([]);
        setFilteredRows([]);
        setHistoryChanged(!historyChanged);
        // if (historyChange) setHistoryChange(true);
        // else setHistoryChange(false);
    })

    // useEffect(() => {
    //     setRows([]);
    //     setFilteredRows([]);
    // }, [])


    React.useEffect(() => {
        // const sample = [
        //     CreateData(1, 'Cupcake', 'Donut', 'example@example.com', false),
        //     CreateData(2, 'Cupcake', 'Donut', 'example@example.com', true),
        //     CreateData(3, 'Cupcake', 'Donut', 'example@example.com', false),
        //     CreateData(4, 'Cupcake', 'Donut', 'example@example.com', false),
        // ];
        if (urlPath === '/admin/user') {
            setLinkDisableObject({
                'dashboard': false,
                'user': true,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/category') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': true,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/product') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': true,
                'category': false,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/description-type') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': false,
                'description-type': true,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/state') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': true,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/city') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': true,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/coupon') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': true,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/promotion-code') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': true,
                'shippingRate': false,
                'gallery': false
            });
        } else if (urlPath === '/admin/gallery') {
            setLinkDisableObject({
                'dashboard': false,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': true
            });
        } else {
            setLinkDisableObject({
                'dashboard': true,
                'user': false,
                'order': false,
                'product': false,
                'category': false,
                'state': false,
                'city': false,
                'description-type': false,
                'coupon': false,
                'promotionCode': false,
                'shippingRate': false,
                'gallery': false
            });
        }
        if (fetchUrl !== '') {
            fetch(`${api}/${fetchUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    const rows = data.data.map(obj => {
                        return chosenFunction(obj);
                    });
                    setRows(rows);
                    setFilteredRows(rows);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUrl, urlPath, historyChanged]);

    return (
        <Switch>
            <Route exact path="/admin/coupon/edit/:id">
                <CouponForm rows={rows} setRows={setRows} />
            </Route>
            <Route path="/admin/state/edit/:id">
                <StateForm rows={rows} setRows={setRows} />
            </Route>
            <Route path="/admin/city/edit/:id">
                <CityForm rows={rows} setRows={setRows} />
            </Route>
            <Route path="/admin/product/edit/:id">
                <ProductForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route path="/admin/description-type/edit/:id">
                <DescriptionTypeForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route path="/admin/category/edit/:id">
                <CategoryForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route path="/admin/gallery/add">
                <GalleryForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/shipping-rate/add">
                <ShippingRateForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/promotion-code/add">
                <PromotionCodeForm rows={rows} setRows={setRows} />
            </Route>
            <Route exact path="/admin/coupon/add">
                <CouponForm rows={rows} setRows={setRows} />
            </Route>
            <Route path="/admin/state/add">
                <StateForm rows={rows} setRows={setRows} />
            </Route>
            <Route path="/admin/city/add">
                <CityForm rows={rows} setRows={setRows} />
            </Route>
            <Route path="/admin/description-type/add">
                <DescriptionTypeForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route path="/admin/category/add">
                <CategoryForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route path="/admin/product/add">
                <ProductForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/gallery">
                <GalleryTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="image"
                    searchField="image"
                />
            </Route>
            <Route exact path="/admin/shipping-rate">
                <ShippingRateTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/promotion-code">
                <PromotionCodeTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="code"
                    searchField="code"
                />
            </Route>
            <Route exact path="/admin/coupon">
                <CouponTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/state">
                <StateTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/city">
                <CityTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/user">
                <UserTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/description-type">
                <DescriptionTypeTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/category">
                <CategoryTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route path="/admin/product">
                <ProductTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
        </Switch>
    );
}

export default Database;