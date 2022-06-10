import React from "react";
import { Link } from "react-router-dom";

import convertRupiah from "rupiah-format";

export default function ProductCard({ item, index }) {
  return (
    <Link
      to={`/product/` + item.id}
      className="col text-decoration-none"
      key={index}
    >
      <div className="col-lg-2 col-md col-sm-5 col mb-2 px-30" key={item.id}>
        <div className="card bg-dark text-light">
          <img className="rounded-top" src={item.image} alt={item.name} />

          <div className="card-body p-0 mt-1 ms-2 d-flex-coloum justify-content-center">
            <h5 className="card-title text-danger m-0 ">
              <p
                className="text-danger text-center m-0 title-card-responsive title-card"
                to={`/detail-product/${item.id}`}
              >
                {item.name}
              </p>
            </h5>
            <p className="card-text m-0 fw-light p-0 text-center">
              {convertRupiah.convert(item.price)}
            </p>
            <p className="card-text m-0 text-center">Stock: {item.qty}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
