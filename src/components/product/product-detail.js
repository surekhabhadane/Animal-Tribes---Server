import React, { Fragment,useState,useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = (props) => {

    const [nav2,setNav2] = useState(null)
    const [slider1,setSlider1]=useState(null)
    const [slider2,setSlider2]=useState(null)
    const [singleItem,setSingleItem] = useState(props.singleItem);

    useEffect(()=>{
        setNav2(slider2)
    },[slider1,slider2])

    return(
        <Fragment>
        {singleItem && 
        <div className="container-fluid">
            <div className="card">
                <div className="row product-page-main">
                    <div className="col-xl-4">
                        <Slider asNavFor={nav2} ref={slider =>{setSlider1(slider)}}
                            className="product-slider">
                           
                                <img src={ singleItem && "http://"+singleItem.image} alt="" className="img-fluid" />
                        </Slider>
                    </div>
                    <div className="col-xl-8">
                        <div className="product-page-details">
                            <h5>{singleItem && singleItem.name}</h5>
                        </div>
                        <hr />
                        <div>
                            <table className="product-page-width">
                                    <tbody>
                                        <tr>
                                            <td>SKU </td>
                                            <td>:</td>
                                            <td>{singleItem.sku}</td>
                                        </tr>
                                        <tr>
                                            <td>quantity </td>
                                            <td>:</td>
                                            <td>{singleItem.quantity}</td>
                                        </tr>
                                        <tr>
                                            <td>Category </td>
                                            <td>:</td>
                                            <td >{singleItem.categoryInfo.parent === null ? singleItem.categoryInfo.title : singleItem.categoryInfo.parent.title }</td>
                                        </tr>
                                        <tr>
                                            <td>Sub Category </td>
                                            <td>:</td>
                                            <td >{singleItem.categoryInfo.parent !== null ? singleItem.categoryInfo.title : ''}</td>
                                        </tr>
                                    </tbody>
                            </table>
                        </div>
                        <hr/>
                        <div className="pt-4 d-flex justify-content-end">
                        <div>
                        <img src={ singleItem && "http://"+singleItem.qrCode} alt="" className="img-fluid" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </Fragment>
    )
}


// const mapStateToProps = (state) => ({
//     products: state.data.productItems,
//     // singleItem: state.data.singleItem,
//     symbol: state.data.symbol
// })

// export default connect(
//     mapStateToProps,
//     { 
//     getSingleItem, 
//     addToCart,
//     addToCartProduct
//  }
// )(ProductDetail)
export default ProductDetail