import { REQUEST_SUBJECTS, FETCHING_SUBJECTS, FETCHING_SUBJECTS_SUCCESS, FETCHING_SUBJECTS_FAILURE } from '../actions/Action-index.js'

const initialState = 
{
    data: [{name: 'LOADING', color: 'black'}],
    dataFetched: false,
    isFetching: false,
    error: false
}

export default function subjects(state = initialState, action)
{
    switch(action.type)
    {
        case REQUEST_SUBJECTS:
            return{
                ...state, 
                isFetching: true,
                dataFetched: false,
                data: [{name: 'LOADING', color: 'black'}]
            };
        case FETCHING_SUBJECTS_SUCCESS:
            return{
                ...state,
                isFetching:false,
                dataFetched: true,
                error: false,
                data: action.payload
            }
        case FETCHING_SUBJECTS_FAILURE:
            return{
                ...state,
                isFetching:false,
                dataFetched:false,
                error: true,
                data: action.payload
            }
        default:
            return state;
    }
}