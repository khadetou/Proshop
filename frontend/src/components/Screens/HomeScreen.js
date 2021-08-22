import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Paginate from "../Paginate";
import Message from "../Message";
import Loader from "../Loader";
import ProductCarousel from "../ProductCarousel";
import Meta from "../Meta";

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { products, loading, error, page, pages } = product;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword && !localStorage.getItem("keyw") && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products !== null &&
              products.map((product, idx) => (
                <Col key={idx} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
