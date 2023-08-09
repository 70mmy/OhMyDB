import axios from "axios"

const fetchData=(api_link)=>axios.get(api_link);
const postData=(api_link, data)=>axios.post(api_link, data);
const putData=(api_link, data)=>axios.put(api_link, data);

export {fetchData, postData, putData}
