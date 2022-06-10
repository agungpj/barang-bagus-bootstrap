import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import convertRupiah from "rupiah-format";

import Navbar from "../components/Navbar";

import dataProduct from "../fakeData/product";
import { Fade } from "react-reveal";
// Import useQuery and useMutation
import { useQuery, useMutation } from "react-query";

// API config
import { API } from "../config/api";

export default function DetailProduct() {
  let history = useHistory();
  let { id } = useParams();
  let api = API();

  // Fetching product data from database
  let { data: product, refetch } = useQuery("Cache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/product/" + id, config);
    return response.data;
  });

  //membuat element script pada head html
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-r6IVDSVolgnIp2IH";

    //membuat tag a dan atribut src
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute

    //menambah atribut data client key
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    //menambah element anak ke element body ketika did anmount
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag); //setelah willanmount
    };
  }, []);

  const handleBuy = useMutation(async () => {
    //ketika user klik buy akan mengirim data dan menhit endpoint transactions
    try {
      // Get data from product
      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };

      // Data body
      const body = JSON.stringify(data);

      // Configuration
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
          "Content-type": "application/json",
        },
        body,
      };

      // nambah data transaksi
      const response = await api.post("/transaction", config);
      // console.log(response)

      const token = response.payment.token;

      //konfigurasi snap.
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history.push("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          history.push("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Navbar />
      <Fade top effect="fadeInUp">
        <Container className="py-5">
          <Row>
            <Col md="2"></Col>
            <Col md="3">
              <img src={product?.image} className="img-fluid" />
            </Col>
            <Col md="5">
              <div className="text-header-product-detail">{product?.name}</div>
              <div className="text-content-product-detail">
                Stock : {product?.qty}
              </div>
              <p className="text-content-product-detail mt-4">
                {product?.desc}
              </p>
              <div className="text-price-product-detail text-end mt-4">
                {convertRupiah.convert(product?.price)}
              </div>
              <div className="d-grid gap-2 mt-5">
                <button
                  className="btn btn-buy"
                  type="button"
                  onClick={() => handleBuy.mutate()}
                >
                  Buy
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </Fade>
    </div>
  );
}
