import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from './common/loader';
import {  withRouter } from 'react-router-dom';
import ThemeCustomizer from './common/theme-customizer';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import RightSidebar from './common/right-sidebar';
import Footer from './common/footer';
import 'react-toastify/dist/ReactToastify.css';
import { MENUITEMS } from '../constant/menu';

const AppLayout = (props) => {
    const {
        children
    } = props;
   
    return (
        <>
        <Loader />
        <div className="page-wrapper">
            <div className="page-body-wrapper">
                <Fragment>
                    <Header/>
                    <Sidebar MENUITEMS={MENUITEMS} />
                    <RightSidebar />

                    <div className="page-body">
                        {children}
                    </div>
                    <Footer />
                    <ThemeCustomizer /> </Fragment>
            </div>
        </div>
        <ToastContainer />
        </ >
    );
}

export default (withRouter(AppLayout))