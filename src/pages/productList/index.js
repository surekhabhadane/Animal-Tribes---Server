import React from 'react'
import { ProductList as ProductListComponent } from "../../components";
import Breadcrumb from '../../components/common/breadcrumb';

export default function ProductList() {
    return (
        <>
            <Breadcrumb title="Product List" />
            <ProductListComponent/>
        </>
    )
}
