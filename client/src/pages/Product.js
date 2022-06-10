import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Masonry from "react-masonry-css";
import { Container, Row, Col } from "react-bootstrap";

import { UserContext } from "../context/userContext";
import { Fade } from "react-reveal";
import Navbar from "../components/Navbar";
import ProductCard from "../components/card/ProductCard";

import imgEmpty from "../assets/empty.svg";
import { FaSearch } from "react-icons/fa";

// Import useQuery
import { useQuery } from "react-query";

// API config
import { API } from "../config/api";

export default function Product() {
  let api = API();
  const [datas, setDatas] = useState([]);
  // Fetching product data from database
  let { data: products, refetch } = useQuery("productsCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/products", config);
    console.log(response);
    let fetchfilter = response.data;
    return setDatas(fetchfilter);
    // return response.data;
  });

  //search fitur
  const [search, setSearch] = useState("");
  let filterProduct = datas.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <Container className="mt-5">
        <Row>
          <Col>
            <div
              className="text-header-product"
              style={{ paddingLeft: "20px" }}
            >
              Product
            </div>
          </Col>
        </Row>
        <div className="wrap" style={{ paddingLeft: "20px" }}>
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="searchButton">
              <FaSearch style={{ paddingLeft: "2px", marginTop: "-5px" }} />
            </button>
          </div>
        </div>
        <Row className="my-4 mx-4">
          {products?.length != 0 ? (
            <Fade left effect="fadeInUp">
              <div className="cards-product card-position card-responsive agung">
                {filterProduct?.map((item, index) => (
                  <ProductCard item={item} index={index} />
                ))}
              </div>
            </Fade>
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: "40%" }}
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
