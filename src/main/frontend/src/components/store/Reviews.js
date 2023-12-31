import {Rating} from "@mui/material";
import React, {useEffect, useState} from "react";
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import {createFuzzyMatcher} from "../../util/util";
import SmallReply from "./SmallReply";
import axios from "axios";
import PaginationBox from "../../util/PaginationBox";
import review_dummy from '../dummyData/review.json'

function Reviews(props) {

    const [review, setReview] = useState(review_dummy);
    // useEffect(() => {
    //     axios.get(`/api/Review/${props.store}`)
    //         .then(response => {
    //             setReview(response.data);
    //             console.log("Review: ", response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }, []);

    const [searchBox, setSearchBox] = useState('');
    const updateSearchBox = e => setSearchBox(e.target.value);
    useEffect(() => {
        setData(review.filter(v => createFuzzyMatcher(searchBox).test(v.comment.toLowerCase())));
    }, [searchBox, review])
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(5);
    const [data, setData] = useState(review);

    useEffect(() => {
        setTotalCount(data.length);
        setPage(1);
    }, [data])
    const [totalCount, setTotalCount] = useState(data.length - 1);
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="d-flex flex-column m-4 w-100">
            <div className="d-flex mb-3">
                <input type="email" className="form-control w-75" id="searchArea" value={searchBox}
                       onChange={updateSearchBox}
                       placeholder="검색할 내용을 입력하세요."/>
                <button className="btn btn-outline-secondary" type="submit" onClick={() => setSearchBox('')}>초기화
                </button>
            </div>
            <table className="table text-center align-middle" style={{minWidth:"350px"}}>
                <thead>
                <tr className="table-light">
                    <th style={{width:"50px"}}>번호</th>
                    <th>내용</th>
                    <th style={{width:"50px"}}>별점</th>
                    <th style={{width:"80px"}}>작성자</th>
                    <th style={{width:"130px"}}>날짜</th>
                </tr>
                </thead>
                <tbody>
                {data && totalCount === 0 ?
                    <tr>
                        <td colSpan={5}> 검색된 데이터가 없습니다.</td>
                    </tr>
                    : data.slice(items * (page - 1), items * (page - 1) + items)
                        .map(v => <tr key={v.idx}>
                            <td>{v.idx}</td>
                            <td style={{height:"70px"}}>
                                <StyledComments>
                                    {/*<p>{v.comment}</p>*/}
                                    {v.comment}
                                </StyledComments>
                            </td>
                            <td><Rating readOnly precision={0.5} value={v.stars} size={"small"}/></td>
                            <td>{v.nickname}</td>
                            <td>{v.date}</td>
                        </tr>,)}
                </tbody>
            </table>
            <div>
                <PaginationBox>
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={items}
                        totalItemsCount={totalCount}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}>
                    </Pagination>
                </PaginationBox>
                <SmallReply store={props.store} setReview={setReview}/>
            </div>
        </div>
    );
}

export default Reviews;

const StyledComments = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`