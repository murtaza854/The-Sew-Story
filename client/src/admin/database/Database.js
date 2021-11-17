import React from 'react';
import { UserTable } from './user';
import { CategoryForm, CategoryTable } from './category';
import { ProductForm, ProductTable } from './product';
import {
    Switch,
    Route,
} from "react-router-dom";

function Database(props) {
    return (
        <Switch>
            <Route exact path="/admin/category/add">
                <CategoryForm />
            </Route>
            <Route exact path="/admin/user">
                <UserTable />
            </Route>
            <Route exact path="/admin/category">
                <CategoryTable />
            </Route>
            <Route exact path="/admin/product">
                <ProductTable />
            </Route>
        </Switch>
    );
}

export default Database;