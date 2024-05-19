import axios from "axios";


export default axios.create({
    baseURL: 'https://quiz-71bb5-default-rtdb.firebaseio.com/'
})
