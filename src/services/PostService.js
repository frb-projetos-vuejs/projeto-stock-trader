import axios from 'axios'

class PostService {

    constructor() {
        this.baseUrl = 'https://curso-vue-stock-trader.firebaseio.com/'
        this.id = 'saved-state.json'
        this.fullUrl = this.baseUrl + this.id
    }

    Get(cb, cbError) {
        axios.get(this.fullUrl)
        .then(resp => {
            cb(resp)
        })
        .catch(resp => {
            cbError(resp)
        })
    }

    Post(data, cb, cbError) {
        axios.patch(this.fullUrl, data)
        .then(resp => {
            cb(resp)
        })
        .catch(resp => {
            cbError(resp)
        })
    }
}

export default PostService