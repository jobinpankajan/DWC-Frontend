import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import calendar from "../../assets/images/calender.png"
import totalUsers from "../../assets/images/total-users.png"
import graph from "../../assets/images/graph.png"
import useAuthInterceptor from "../../../utils/apis";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
// import '../../assets/css/dashboard.css'
import '../../assets/scss/dashboard.scss';
import { useTranslation } from "react-i18next";
const Dashboard = () => {
    const apis = useAuthInterceptor();
    const accessToken = localStorage.getItem("supplier_accessToken");
    const { t, i18n } = useTranslation();
    const [data, topList] = useState([]);
    const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          permission: "dashboard-view",
        },
      };
    const navigate = useNavigate()
    useEffect(() => {
        if(!accessToken){
            navigate("/", {
                state: {
                  url : "/dashboard"
                }
              })
        }
      //  else{
        //    console.log("Call dashboard data API")
     //   }

     apis
     .get("supplier/topRetailerList", config)
     .then((res) => {
       console.log(res);
       topList(res.data.data);
     })
     .catch((err) => {
       // if(error.message !== "revoke"){
       console.log(err);
       // toast.error(err.response.data.message, {
       //     autoClose: 3000,
       //     position: toast.POSITION.TOP_CENTER,
       // });
       // }
     });
     // ends new method
    }, [])
    return(
        <div class="container-fluid page-wrap dashboard">
        <div class="row height-inherit">

            <Sidebar userType={"supplier"}/>

            <div class="col main p-0">
                <Header  title={t("supplier.sidebar.Dashboard1")}/>
                
                <div class="container-fluid page-content-box px-3 px-sm-4">
                    <div class="row">
                        <div class="col">
                            <div class="tab-link-row position-relative">

                                <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                      <button class="nav-link active" id="value-tab" data-bs-toggle="tab" data-bs-target="#value-tab-pane" type="button" role="tab" aria-controls="value-tab-pane" aria-selected="true">{t("supplier.sidebar.value")}</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                      <button class="nav-link" id="order-tab" data-bs-toggle="tab" data-bs-target="#order-tab-pane" type="button" role="tab" aria-controls="order-tab-pane" aria-selected="false">{t("supplier.sidebar.order1")}</button>
                                    </li>
                                  </ul>

                                  <div class="filter-box position-abs">

                                    <div class="dropdown date-selector">
                                        <button class="btn btn-outline-black btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                           <img src={calendar} alt=""/> {t("supplier.sidebar.Select_Date")}
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a class="dropdown-item" href="#">Date</a></li>
                                          <li><a class="dropdown-item" href="#">Date</a></li>
                                        </ul>
                                      </div>

                                      <div class="dropdown date-selector">
                                        <button class="btn btn-outline-black btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {t("supplier.sidebar.supplier")} 
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a class="dropdown-item" href="#">Supplier 1</a></li>
                                          <li><a class="dropdown-item" href="#">Supplier 2</a></li>
                                        </ul>
                                      </div>
                                  </div>

                            </div>

                              <div class="tab-content" id="myTabContent">

                                <div class="tab-pane fade show active" id="value-tab-pane" role="tabpanel" aria-labelledby="value-tab" tabindex="0">
                                    <div class="row mb-3">

                                        <div class="col-sm-5 mb-3 mb-sm-0">
                                            <div class="card user-card height-100">
                                                <div class="card-body">
                                                  <h6 class="card-title mb-3">{t("supplier.sidebar.users")}</h6>
                                                  <div class="row">
                                                    <div class="col">
                                                        <ul class="amount-status">
                                                            <li class="pending">
                                                                <div class="value">CA$79.53 (3.19%)</div>
                                                                <div class="status">{t("supplier.sidebar.pending")}</div>
                                                            </li>
                                                            <li class="approved">
                                                                <div class="value">CA$79.53 (3.19%)</div>
                                                                <div class="status">{t("supplier.sidebar.approved")}</div>
                                                            </li>
                                                            <li class="paid">
                                                                <div class="value">CA$79.53 (3.19%)</div>
                                                                <div class="status">{t("supplier.sidebar.paid")}</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="col">
                                                        <div class="amount-progress">
                                                            <img src={totalUsers} class="img-fluid" alt=""/>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  <hr/>
                                                  <div class="row">
                                                    <div class="col">
                                                        <div class="badge text-bg-light w-100 sales-data p-3 text-start">
                                                            <label>{t("supplier.sidebar.sales")}</label>
                                                            <div class="amount">
                                                                CA$2,491.82
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="badge text-bg-light w-100 sales-data p-3 text-start">
                                                            <label>{t("supplier.sidebar.Per_Order_Average")}</label>
                                                            <div class="amount">
                                                                CA$2,491.82
                                                            </div>
                                                        </div>
                                                    </div>
                                                  </div>
                                                  
                                                </div>
                                              </div>
                                        </div>

                                        <div class="col-sm-7">
                                            <div class="card graph-card height-100">
                                                <div class="card-body">
                                                    <div class="row mb-3">
                                                        <div class="col">
                                                            <h6 class="card-title">{t("supplier.sidebar.heading")}</h6>
                                                        </div>
                                                        <div class="col text-end">
                                                            <select name="" id="" class="btn btn-outline-black btn-sm text-start">
                                                                <option value="" selected>{t("supplier.sidebar.yearly")}</option>
                                                                <option value="">{t("supplier.sidebar.monthly")}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                  
                                                    <img src={graph} class="img-fluid" alt=""/>
                                                </div>
                                              </div>
                                        </div>

                                    </div>
                                    <div class="row">

                                        <div class="col mb-3 mb-sm-0">
                                            <div class="card height-100">
                                                <div class="card-body">
                                                  <div class="row mb-3">
                                                    <div class="col">
                                                        <h6 class="card-title">{t("supplier.sidebar.top_products")}</h6>
                                                    </div>
                                                    <div class="col text-end">
                                                        <select name="" id="" class="btn btn-outline-black btn-sm text-start">
                                                            <option value="" selected>30 {t("supplier.sidebar.days")}</option>
                                                            <option value="">60 {t("supplier.sidebar.days")}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                  <table class="table">
                                                    <thead>
                                                      <tr>
                                                        <th scope="col">{t("supplier.sidebar.product_name")}</th>
                                                        <th scope="col"></th>
                                                        <th scope="col" class="">{t("supplier.sidebar.product_value")}</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td colspan="2">
                                                            <div class="topProd">
                                                                <div class="name">
                                                                    Product-1
                                                                </div>
                                                                <div class="desc">
                                                                    Lorem Ipsum is simply dummy text 
                                                                </div>
                                                            </div> 
                                                        </td>
                                                        <td class="prodPrice">CA $555.00</td>
                                                      </tr>
                                                      <tr>
                                                        <td colspan="2">
                                                            <div class="topProd">
                                                                <div class="name">
                                                                    Product-1
                                                                </div>
                                                                <div class="desc">
                                                                    Lorem Ipsum is simply dummy text 
                                                                </div>
                                                            </div> 
                                                        </td>
                                                        <td class="prodPrice">CA $555.00</td>
                                                      </tr>
                                                      <tr>
                                                        <td colspan="2">
                                                            <div class="topProd">
                                                                <div class="name">
                                                                    Product-1
                                                                </div>
                                                                <div class="desc">
                                                                    Lorem Ipsum is simply dummy text 
                                                                </div>
                                                            </div> 
                                                        </td>
                                                        <td class="prodPrice">CA $555.00</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col mb-3 mb-sm-0">
                                            <div class="card height-100">
                                                <div class="card-body">
                                                  <div class="row mb-3">
                                                    <div class="col">
                                                        <h6 class="card-title">{t("supplier.sidebar.top_retailers")}</h6>
                                                    </div>
                                                    <div class="col text-end">
                                                        <select name="" id="" class="btn btn-outline-black btn-sm text-start">
                                                            <option value="" selected>30 {t("supplier.sidebar.days")}</option>
                                                            <option value="">60 {t("supplier.sidebar.days")}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                  <table class="table">
                                                    <thead>
                                                      <tr>
                                                        <th scope="col">{t("supplier.sidebar.product_name")}</th>
                                                        <th scope="col"></th>
                                                        <th scope="col" class="">{t("supplier.sidebar.product_value")}</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr>
                                                        <td colspan="2">
                                                            <div class="topProd">
                                                                <div class="name">
                                                                    Product-1
                                                                </div>
                                                                <div class="desc">
                                                                    Lorem Ipsum is simply dummy text 
                                                                </div>
                                                            </div> 
                                                        </td>
                                                        <td class="prodPrice">CA $555.00</td>
                                                      </tr>
                                                      <tr>
                                                        <td colspan="2">
                                                            <div class="topProd">
                                                                <div class="name">
                                                                    Product-1
                                                                </div>
                                                                <div class="desc">
                                                                    Lorem Ipsum is simply dummy text 
                                                                </div>
                                                            </div> 
                                                        </td>
                                                        <td class="prodPrice">CA $555.00</td>
                                                      </tr>
                                                      <tr>
                                                        <td colspan="2">
                                                            <div class="topProd">
                                                                <div class="name">
                                                                    Product-1
                                                                </div>
                                                                <div class="desc">
                                                                    Lorem Ipsum is simply dummy text 
                                                                </div>
                                                            </div> 
                                                        </td>
                                                        <td class="prodPrice">CA $555.00</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>



                                <div class="tab-pane fade" id="order-tab-pane" role="tabpanel" aria-labelledby="order-tab" tabindex="0">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem esse hic harum, maxime adipisci aliquam, quos aliquid labore sit, accusamus quisquam quidem ducimus sequi ab id sed mollitia voluptatum doloremque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem esse hic harum, maxime adipisci aliquam, quos aliquid labore sit, accusamus quisquam quidem ducimus sequi ab id sed mollitia voluptatum doloremque!
                                </div>

                              </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    )
}

export default Dashboard;