import Base from './base'

const endpoint = '/reporte';

const findAll = async() => await Base.get(endpoint);

const findOne = async(id) => {
    const newEndpoint = endpoint.concat('/',id); 

    return await Base.get(newEndpoint);
}

const update = async(request) => await Base.put(endpoint,request);


const reporteApi = {findAll, findOne, update}

export default reporteApi;