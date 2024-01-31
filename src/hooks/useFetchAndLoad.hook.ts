import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { AxiosCall } from "../models/common/axiosCall.model";
import { enqueueSnackbar } from "notistack";


const useFetchAndLoad = () => {
    const [loading, setLoading] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall<any>) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        setLoading(true);
        let result = {} as AxiosResponse<any>;
        try {
            result = (await axiosCall.call);
        } catch (err: any) {
            setLoading(false);
            let msg = err.response.data.message;
            enqueueSnackbar(msg ?? err);
            throw err;
        }
        setLoading(false);
        return result.data;
    };

    const cancelEndpoint = () => {
        setLoading(false);
        controller && controller.abort();
    };

    useEffect(() => {
        return () => {
            cancelEndpoint();
        };
    }, []);

    return { loading, callEndpoint };
};

export default useFetchAndLoad;