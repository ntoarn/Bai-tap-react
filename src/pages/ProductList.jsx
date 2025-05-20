import React, {useEffect, useState} from 'react';
import UseQueryParams from "../hooks/useQueryParams.js";
import useFetchListWithParams from "../hooks/useFetchListWithParams.js";
import useDebouce from "../hooks/useDebouce.js";

const ProductList = () => {
    const [params, updateParams, resetParams] = UseQueryParams({
        search: "",
        skip: 0,
        limit: 12,
        sortBy: "",
        order: ""
    });

    const [products, loading, error] = useFetchListWithParams("products", params);

    const currentPage = Math.floor(params.skip / params.limit) + 1;

    const handlePage = (newPage) => {
        if (newPage < 1) return;
        updateParams({
            ...params,
            skip: (newPage - 1) * params.limit
        });
    };

    const handleLimit = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        if (!isNaN(newLimit)) {
            updateParams({
                ...params,
                limit: newLimit,
                skip: 0,
            });
        }
    };
    const[search, setSearch] = useState(params.search)
    const debounceSearch = useDebouce(search)
    useEffect(() => {
        updateParams({
            ...params,
            search: debounceSearch,
            skip: 0,
        })
    }, [debounceSearch]);
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleSortPrice = (e) => {
        const sortPrice = e.target.value.toLowerCase();
        if (!sortPrice){
            console.log(sortPrice)
            updateParams({
                ...params,
                order: "",
                sortBy: "",
                skip: 0,
            });
        }else {
            updateParams({
                ...params,
                order: sortPrice,
                sortBy: "price",
                skip: 0,
            });
        }
    }

    const handleSortTitle = (e) => {
        const sortPrice = e.target.value;
        if (!sortPrice){
            console.log(sortPrice)
            updateParams({
                ...params,
                order: "",
                sortBy: "",
                skip: 0,
            });
        }else {
            updateParams({
                ...params,
                order: sortPrice,
                sortBy: "title",
                skip: 0,
            });
        }
    }


    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-3">
                    <input value={search} onChange={handleSearch}  type="text" id="form1"
                           className="form-control mt-3" placeholder={"Tìm kiếm"}/>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className="col-md-4">
                  <select onChange={handleSortPrice} className="form-select mb-3 mt-3"
                          aria-label="Default select example">
                    <option value="">Sắp xếp theo giá</option>
                    <option value="desc">Cao → Thấp</option>
                    <option value="asc">Thấp → Cao</option>
                  </select>
                </div>

                <div className="col-md-4">
                    <select onChange={handleSortTitle} className="form-select mb-3 mt-3"
                            aria-label="Default select example">
                        <option value="">Sắp xếp theo tên</option>
                        <option value="desc">Từ z → a</option>
                        <option value="asc">Từ a → z</option>
                    </select>
                </div>

                <div className="row">
                    { loading ? "Loading..." : (
                    products.map((item) => (
                        <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                            <div className="card">
                                <img src={item.thumbnail} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.price}</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    ))
                    )}

                    <div className="row align-items-center justify-content-between mt-4">
                        <div className="col-auto">
                            <nav aria-label="Pagination">
                                <ul className="pagination mb-0">
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => handlePage(currentPage - 1)}
                                            aria-label="Previous"
                                        >
                                            &laquo;
                                        </button>
                                    </li>

                                    <li className="page-item active">
                                        <span className="page-link">{currentPage}</span>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => handlePage(currentPage + 1)}
                                            aria-label="Next"
                                        >
                                            &raquo;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="col-auto">
                            <select
                                className="form-select form-select-sm"
                                onChange={handleLimit}
                                value={params.limit}
                            >
                                <option disabled>Chọn số sản phẩm/trang</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="36">36</option>
                                <option value="48">48</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
