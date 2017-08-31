import { FILTER_SUBJECTS, REQUEST_ARTICLES, FETCHING_ARTICLES_SUCCESS, FETCHING_ARTICLES_FAILURE } from '../actions/Action-index.js'

const initialState = 
{
    data: [{id:-1, title: "LOADING", slug: "#", author: { name: "LOADING", picture: "#"}, subject: { name: "LOADING", color: "grey" }, hero_image: "#", publish_date: "0/0/0000", text: "LOADING"}],
    isFetching: false,
    dataFetched: false,
    error: false
}

export default function articles(state = initialState, action)
{
    switch(action.type)
    {
        case REQUEST_ARTICLES:
            return {
                 data: [{id:-1, title: "LOADING", slug: "#", author: { name: "LOADING", picture: "#"}, subject: { name: "LOADING", color: "grey" }, hero_image: "#", publish_date: "0/0/0000", text: "LOADING"}],
                 isFetching: true,
                 dataFetched: false,
                 error: false,
            };
        case FILTER_SUBJECTS:
            return{
                 data: [{id:-1, title: "LOADING", slug: "#", author: { name: "LOADING", picture: "#"}, subject: { name: "LOADING", color: "grey" }, hero_image: "#", publish_date: "0/0/0000", text: "LOADING"}],
                 isFetching: true,
                 dataFetched: false,
                 error: false,
            };
        case FETCHING_ARTICLES_SUCCESS:
            return {
                isFetching: false,
                dataFetched: true,
                error: false,
                data: action.payload
            }
        case FETCHING_ARTICLES_FAILURE:
            return {
                ...state,
                isFetching: false,
                dataFetched: false,
                error: true
            }
        default:
            return state;
    }
}