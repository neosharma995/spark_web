"use client";

import React, { useContext } from "react";
import { SectorDataContext } from "@/context/apiContext";
import './homeServices.css';

const HomeOurService = () => {
    const { pagesDataApi } = useContext(SectorDataContext);
    const main_data = pagesDataApi?.find(page => page.slug === "home")?.acf?.our_service;
    const cards_one = main_data?.cards || [];
    const cards_two = main_data?.cards_second || [];

    return (
        <div className="container" id="h_p_service">
             

             <div className="proj_heading">
                <h2>Our Services</h2>
            </div>

            <div className="p_r_main">
                <div className="p_r_inner">
                    {cards_one.map((ele, index) => {
                        const isLast = index === cards_one.length - 1;
                        const lastClass = isLast ? (index % 2 === 0 ? "odd" : "even") : "";

                        return (
                            <div className={`p_c_wrapper ${lastClass}`} key={index}>
                                <div className="p_img">
                                    <img src={ele.card_icon || "/default.png"} alt={ele.card_heading} />
                                </div>
                                <div className="p_inner_content">
                                    <h2>{ele.card_heading}</h2>
                                    <p>{ele.card_description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="p_r_main">
                <div className="p_r_inner">
                    {cards_two.map((ele, index) => {

                        const isLast = index === cards_two.length - 1;
                        const lastClass = isLast ? (index % 2 === 0 ? "odd" : "even") : "";

                        return (
                            <div className={`p_c_wrapper ${lastClass}`} key={index}>
                                <div className="p_img">
                                    <img src={ele.card_icon || "/default.png"} alt={ele.card_heading} />
                                </div>
                                <div className="p_inner_content">
                                    <h2>{ele.card_heading}</h2>
                                    <p>{ele.card_description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomeOurService;
