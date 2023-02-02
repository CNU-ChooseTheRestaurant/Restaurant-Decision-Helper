/*global kakao*/
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Form, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import styles from "./RankingPage.module.css"
import RankingTable from "./worldcup/RankingTable";

function RankingPage() {
    const [store, setStore] = useState([]);

    const [category, setCategory] = useState([]);
    let { categoryId } = useParams();

    useEffect(() => {

            axios.get(`/AllCategory/${categoryId}`)
                .then(response => {
                    setCategory(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        []);

    return (
        <div className="wrapper">
            <div className="main">
                <h1><p>{category && category.category_name} 월드컵 순위</p></h1>
                <div style={{display:"flex"}}>
                    <div className={styles.top3}>
                        {/*<div style={{float:"left"}}>*/}
                        {/*    <p>Top2!</p>*/}
                        {/*    {store[1] && <img src={`/image/${store[1].store_id}`}/>}*/}
                        {/*</div>*/}
                        {/*<div style={{float:"left"}}>*/}
                        {/*    <p>Top1!</p>*/}
                        {/*    {store[0] && <img src={`/image/${store[0].store_id}`}/>}*/}
                        {/*</div>*/}
                        {/*<div style={{float:"left"}}>*/}
                        {/*    <p>Top3!</p>*/}
                        {/*    {store[2] && <img src={`/image/${store[2].store_id}`}/>}*/}
                        {/*</div>*/}
                        {store[1] && <img src={`/image/${store[1].store_id}`}/>}
                        {store[0] && <img src={`/image/${store[0].store_id}`}/>}
                        {store[2] && <img src={`/image/${store[2].store_id}`}/>}
                    </div>
                        <RankingTable category={categoryId} setStore={setStore}/>
                    </div>
            </div>



        </div>

    );
}

export default RankingPage;

