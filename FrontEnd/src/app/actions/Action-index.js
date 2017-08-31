export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const REQUEST_SUBJECTS = 'REQUEST_SUBJECTS' //action type
export const FETCHING_SUBJECTS = 'FETCHING_SUBJECTS'
export const FETCHING_SUBJECTS_SUCCESS = 'FETCHING_SUBJECTS_SUCCESS'
export const FETCHING_SUBJECTS_FAILURE = 'FETCHING_SUBJECTS_FAILURE'
export const FETCHING_ARTICLES_SUCCESS = 'FETCHING_ARTICLES_SUCCESS'
export const FETCHING_ARTICLES_FAILURE = 'FETCHING_ARTICLES_FAILURE'
export const FILTER_SUBJECTS = 'FILTER_SUBJECTS' //action type
const SUBJECTS_API='/api/v1/subjects.json'
const ARTICLES_API='/api/v1/articles'
const DELAY = 3000 //Artificial delay for API request

export function loadSubjects(term=null) //action creator
{
    return{
        type: REQUEST_SUBJECTS,
    }
}

export function loadSubjectsSuccess(data)
{
    return{
        type: FETCHING_SUBJECTS_SUCCESS,
        payload: data
    }
}

export function loadSubjectsFailure(data)
{
    return{
        type: FETCHING_SUBJECTS_FAILURE,
    }
}

export function fetchSubjects()
{
    return(dispatch) => 
    {
      dispatch(loadSubjects())
      fetch(`${SUBJECTS_API}`).then( (response) => { return response.json()}).then( (json) => { dispatch(loadSubjectsSuccess(json)) }).catch( (err) => console.log(err))
    }
}

export function changeSubject(term=null) //action creator
{
    return(dispatch)=>
    {
        dispatch(changingSubject())
        new Promise((resolve, reject) =>
        {
            setTimeout(() =>
            {
                resolve(fetch(`${ARTICLES_API}?subject=${term}`).then( (response) => { return response.json()}).then( (json) => { return dispatch(loadArticlesSuccess(json.results)) }).catch( (err) => console.log(err)))
            }, DELAY)
        })
    }
}

export function changingSubject(term=null) //action creator
{
    return{
        type: FILTER_SUBJECTS
    }
}

export function loadArticles(term=null)
{
    return{
        type: REQUEST_ARTICLES
    }
}
export function loadArticlesSuccess(data)
{
    return{
        type: FETCHING_ARTICLES_SUCCESS,
        payload: data
    }
}

export function loadArticlesFailure()
{
    return{
        type: FETCHING_ARTICLES_FAILURE
    }
}

export function fetchArticles(term=null) //action creator
{
    return(dispatch)=>
    {
        dispatch(loadArticles)
        new Promise((resolve, reject) =>
        {
            setTimeout(() =>
            {
                resolve(fetch(`${ARTICLES_API}`).then( (response) => { return response.json()}).then( (json) => { return dispatch(loadArticlesSuccess(json.results)) }).catch( (err) => console.log(err)))
            }, DELAY)
        })
    }
}