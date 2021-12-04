import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../../assets/images/logo.png';
import logo_compact from '../../../assets/images/logo/compact-logo.png';

import UserPanel from './userPanel';
import { Link } from 'react-router-dom';
import { translate } from 'react-switch-lang';
import configDB from '../../../data/customizer/config';

const Sidebar = (props) => {
    const { MENUITEMS } = props;
    const [margin, setMargin] = useState(0);
    const [width, setWidth] = useState(0);
    const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true);
    const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
    const [hideRightArrow, setHideRightArrow] = useState(true);
    const [hideLeftArrow, setHideLeftArrow] = useState(true);
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const layout = useSelector(content => content.Customizer.layout);

    const wrapper = configDB.data.settings.sidebar.wrapper;
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize();

        var currentUrl = window.location.pathname;

        if(!mainmenu==null) {
            // eslint-disable-next-line
            mainmenu.filter(items => {
                if (items.path === currentUrl)
                    setNavActive(items)
                if (!items.children) return false
                // eslint-disable-next-line
                items.children.filter(subItems => {
                    if (subItems.path === currentUrl)
                        setNavActive(subItems)
                    if (!subItems.children) return false
                    // eslint-disable-next-line
                    subItems.children.filter(subSubItems => {
                        if (subSubItems.path === currentUrl)
                            setNavActive(subSubItems)
                    })
                })
            })

        }

        setTimeout(() => {
            const elmnt = document.getElementById("myDIV");
            const menuWidth = elmnt.offsetWidth;
            // setMenuWidth(menuWidth)
            if (menuWidth > window.innerWidth) {
                setHideRightArrow(false);
                setHideLeftArrowRTL(false);
            } else {
                setHideRightArrow(true);
                setHideLeftArrowRTL(true);
            }
        }, 500)


        return () => {
            // eslint-disable-next-line
            window.addEventListener('resize', handleResize)
        }
        // eslint-disable-next-line
    }, [mainmenu]);

    const handleResize = () => {
        setWidth(window.innerWidth - 310);
    }

    const setNavActive = (item) => {
        // eslint-disable-next-line
        MENUITEMS.filter(menuItem => {
            // eslint-disable-next-line
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                // eslint-disable-next-line
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                    }
                })
            }
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })

    }

    // Click Toggle menu
    const toggletNavActive = (item) => {
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    const scrollToRight = () => {
        const elmnt = document.getElementById("myDIV");
        const menuWidth = elmnt.offsetWidth;
        const temp = menuWidth + margin;
        if (temp < menuWidth) {
            setMargin(-temp);
            setHideRightArrow(true);
        }
        else {
            setMargin(margin => margin += (-width));
            setHideLeftArrow(false);
        }
    }

    const scrollToLeft = () => {
        // If Margin is reach between screen resolution
        if (margin >= -width) {
            setMargin(0)
            setHideLeftArrow(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrow(false);
        }
    }


    const scrollToLeftRTL = () => {
        if (margin <= -width) {
            setMargin(margin => margin += -width);
            setHideLeftArrowRTL(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideRightArrowRTL(false);
        }
    }

    const scrollToRightRTL = () => {
        const temp = width + margin
        // Checking condition for remaing margin
        if (temp === 0) {
            setMargin(temp);
            setHideRightArrowRTL(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrowRTL(false);
            setHideLeftArrowRTL(false);
        }
    }

    const createList = (item) => {
        return item.map((menuItem, i) => {
            return <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                <Link
                    to={`${process.env.PUBLIC_URL}${menuItem.webUrl}`}
                    className={`sidebar-header ${(menuItem.isEnable) ? 'active' : 'disabled'}`} >

                    <span>{menuItem.name}</span>
                    {menuItem.children.length > 0 && <i className="fa fa-angle-right pull-right" />}
                </Link>
                {menuItem.children.length > 0 &&
                    <ul
                        className={`sidebar-submenu ${menuItem.active && 'menu-open'}`}
                        style={menuItem.active && { opacity: 1, transition: 'opacity 500ms ease-in' }} >
                        {createList(menuItem.children)}
                    </ul>}
            </li>
        })
    }


    return (
        <Fragment>
        <div className="page-sidebar">
            <div className="main-header-left d-none d-lg-block">
                <div className="logo-wrapper compactLogo">
                    <Link to="/">
                        <img className="blur-up lazyloaded" src={logo_compact} alt="" />
                        <img className="blur-up lazyloaded" src={logo} alt="" />
                    </Link>
                </div>
            </div>
            <div className="sidebar custom-scrollbar">
                <UserPanel />
                <ul
                    className="sidebar-menu"
                    id="myDIV"
                    style={wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                        { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                >

                    {createList(MENUITEMS)}

                    <li className={`left-arrow ${layout === 'rtl' ? hideLeftArrowRTL ? 'd-none' : '' : hideLeftArrow ? 'd-none' : ''}`}
                        onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToLeftRTL : scrollToLeft}><i className="fa fa-angle-left"></i></li>

                    <li className={`right-arrow ${layout === 'rtl' ? hideRightArrowRTL ? 'd-none' : '' : hideRightArrow ? 'd-none' : ''}`}
                        onClick={(wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToRightRTL : scrollToRight}><i className="fa fa-angle-right"></i></li>
                </ul>
            </div>
        </div>
    </Fragment >
    );
};

export default translate(Sidebar);

