import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './newsSlice'
import commentReducer from './commentSlice'

export default configureStore({
    reducer: {
        news: newsReducer,
        comment: commentReducer,
    }
})