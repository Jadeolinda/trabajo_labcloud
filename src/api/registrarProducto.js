import Base from './base'

const endpoint = '/registrar';

const create = async (request) => await Base.post(endpoint,request);

const update = async(request) => await Base.put(endpoint,request);

const registroApi = { create, findAll, findOne, update }

export default registroApi;