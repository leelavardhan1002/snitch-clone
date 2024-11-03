import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../context/Search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3">
            {values?.results.map((p) => (
              <div key={p._id} className="col">
                <div className="card h-100 border-3 shadow-lg bg-gradient">
                  <img
                    src={`/api/v1/product/product-image/${p._id}`}
                    className="card-img-top h-75"
                    alt={p.name}
                  />
                  <hr />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}
                    </p>
                    <p className="card-text">$ {p.price}</p>
                    <div className="d-grid gap-md-1 d-md-flex justify-content-md-between">
                      <button
                        className="btn btn-outline-dark mb-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        MORE DETAILS
                      </button>

                      <button
                        className="btn text-white btn-purple"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Product Added to Cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
