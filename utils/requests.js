const API_KEY = process.env.API_KEY

export default {
    fetchTrending: {
        title: 'Trending',
        url: `/trending/all/week?api_key=${API_KEY}&language=en-US`
    },
    fetchGenre: {
        url: `/discover/movie/?api_key=${process.env.API_KEY}&with_genres=`
    },
    baseUrl: `https://api.themoviedb.org/3`


}