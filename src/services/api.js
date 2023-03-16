import axios from 'axios'


//BASE DA URL: https://api.themoviedb.org/3/
//URL DA API:https://api.themoviedb.org/3/movie/550?api_key=1e02209c9df2d2b1a0b8865ec6a58909

const api=axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api