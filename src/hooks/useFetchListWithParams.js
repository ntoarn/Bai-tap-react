import {useEffect, useState} from "react";
import instance from "../api/index.js";
import useDebouce from "./useDebouce.js";

const useFetchListWithParams = (path,  params) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetchList = async () => {
         try {
             setLoading(true)
             let paramsString = new URLSearchParams(params).toString();
             paramsString = paramsString.replace("search", "search?q")
             console.log(paramsString)
             const { data } = await instance.get(`${path}/${paramsString}`)
             setList(data[path])
             setLoading(false)
         } catch (error) {
             setLoading(false)
             setError(error.message || "Failed")
             console.error(error);
         }

    }
    useEffect(() => {
        fetchList()
    }, [params.limit , params.skip, params.search, params.sortBy, params.order]);
    return [list,  loading, error]
 }
 export default useFetchListWithParams;