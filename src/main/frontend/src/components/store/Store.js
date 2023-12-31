import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import Reviews from "./Reviews";
import Menus from "./Menus";
import TabBar from "./TabBar";
import MoreInfo from "./MoreInfo";
import store_dummy from '../dummyData/store.json'
import game01 from '../dummyImg/game01.jpg'


function Store() {
    let {storeId} = useParams();
    // useEffect(() => {
    //     axios.get(`/api/Store/${storeId}`)
    //         .then(response => {
    //             setData(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, []);

    const [store, setData] = useState(store_dummy);

    const content =
        [
            {idx: 0, name: '메뉴', content: <Menus store={storeId}/>},
            {idx: 1, name: '리뷰', content: <Reviews store={storeId}/>},
        ];

    const useTabs = (initialTabs, allTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        return {
            contentItem: allTabs[contentIndex], contentChange: setContentIndex
        };
    };
    const {contentItem, contentChange} = useTabs(0, content);

    return (
        <div>
            <h2 className="d-flex justify-content-center align-items-center text-white" style={{
                // backgroundImage: `url("/image/${storeId}")`,
                backgroundImage: `url(${game01})`,
                height: "180px",
                backgroundSize: "cover",
                backgroundPositionY: "center"
            }}>{store[0].store_name}</h2>
            {/*<h5 className="">{store.store_name}</h5>*/}
            <TabBar store_name={store[0].store_name} onClickHandler={contentChange} contentItem={contentItem}/>
            <div className="row m-5">
                <div className="col-lg-auto mb-5">
                    <MoreInfo info={store}/>
                </div>
                <div className="col">
                    {contentItem.content}
                </div>
            </div>
        </div>

    );
}

export default Store;