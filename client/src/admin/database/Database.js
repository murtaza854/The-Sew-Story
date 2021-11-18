import React from 'react';
import { UserTable } from './user';
import { CategoryForm, CategoryTable } from './category';
import { ProductForm, ProductTable } from './product';
import { DescriptionTypeForm, DescriptionTypeTable } from './descriptionType'
import { CreateCategoryData } from './category/categoryTable/CreateCategoryData';
import { CreateProductData } from './product/productTable/CreateProductData';
import { CreateUserData } from './user/userTable/CreateUserData';
import { CreateDescriptionTypeData } from './descriptionType/descriptionTypeTable/CreateDescriptionTypeData';
import {
    Switch,
    Route,
} from "react-router-dom";
import api from '../../api';

function Database(props) {
    const [rows, setRows] = React.useState([]);
    const [filteredRows, setFilteredRows] = React.useState([]);

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
    }

    React.useEffect(() => {
        // const sample = [
        //     CreateData(1, 'Cupcake', 'Donut', 'example@example.com', false),
        //     CreateData(2, 'Cupcake', 'Donut', 'example@example.com', true),
        //     CreateData(3, 'Cupcake', 'Donut', 'example@example.com', false),
        //     CreateData(4, 'Cupcake', 'Donut', 'example@example.com', false),
        // ];
        setRows([]);
        fetch(`${api}/${fetchUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                const rows = data.data.map(obj => {
                    return chosenFunction(obj);
                });
                setRows(rows);
                setFilteredRows(rows);
            });
    }, [fetchUrl]);

    return (
        <Switch>
            <Route exact path="/admin/description-type/edit/:id">
                <DescriptionTypeForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/category/edit/:id">
                <CategoryForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/description-type/add">
                <DescriptionTypeForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/category/add">
                <CategoryForm
                    rows={rows}
                    setRows={setRows}
                    setFilteredRows={setFilteredRows}
                />
            </Route>
            <Route exact path="/admin/product/add">
                <ProductForm />
            </Route>
            <Route exact path="/admin/user">
                <UserTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route exact path="/admin/description-type">
                <DescriptionTypeTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route exact path="/admin/category">
                <CategoryTable
                    rows={rows}
                    filteredRows={filteredRows}
                    setFilteredRows={setFilteredRows}
                    tableOrder="name"
                    searchField="name"
                />
            </Route>
            <Route exact path="/admin/product">
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