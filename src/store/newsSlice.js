import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNewStoriesId, getStoriesDetail } from "../api/HackerNewsAPI";

export const fetchNews = createAsyncThunk('news/fetchNews', async() => {
    const newsIds = await getNewStoriesId();
    const newsIteams = await Promise.all(newsIds.map((id) => getStoriesDetail(id)))
    return newsIteams
})

const newsSlice = createSlice({
    name: "news", 
    initialState: {
        news: [], 
        loading: true,
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.news = action.payload
                state.loading = false
            })
            .addCase(fetchNews.pending, (state) => {
                if (!state.news) {
                    state.loading = true
                }
                
            })
    },
    reducers: {},
    },
)

export default newsSlice.reducer;