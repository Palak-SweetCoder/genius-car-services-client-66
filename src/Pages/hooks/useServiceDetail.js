import { useEffect, useState } from "react";

const useServiceDetail = serviceId => {
    const [service, setService] = useState({});

    // Load service details for book from server side 
    useEffect(() => {
        const url = `http://localhost:5000/service/${serviceId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data))
    }, [serviceId]);
    return [service]
}

export default useServiceDetail;