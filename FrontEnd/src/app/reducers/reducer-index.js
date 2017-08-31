import { combineReducers } from 'redux'
import articlesReducer from './article-reducer'
import subjectsReducer from './subject-reducer'
const rootReducer = combineReducers(
    {
        articles: articlesReducer,
        subjects: subjectsReducer
    }
)

export default rootReducer