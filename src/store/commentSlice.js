import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getComment, getStoriesDetail } from "../api/HackerNewsAPI";

export const fetchComment = createAsyncThunk('comment/fetchComment', async(id) => {
    const news = await getStoriesDetail(id)
    const comment = await Promise.all(news.kids.map((commentId) => getComment(commentId)))
    return comment
})


export const fetchCommentTree = createAsyncThunk('comment/fetchCommentTree', async(id) => {
    const comment = await getComment(id)
    const comments = await Promise.all(comment.kids.map((commentId) => getComment(commentId)))
    return comments
})

const commentSlice = createSlice({
    name:"comment", 
    initialState: {
        comment: [],
        commentTree: [],
        loading: true,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.fulfilled, (state, action) => {
                state.comment = action.payload
                state.loading = false
            })
            .addCase(fetchComment.pending, (state) => {
                if (!state.comment) {
                    state.loading = true
                }
            })

        builder
            .addCase(fetchCommentTree.fulfilled, (state, action) => {
                state.commentTree = action.payload
            })
    },
    reducers: {
        removeComment (state) {
            state.comment = []
            state.commentTree = []
            state.loading = true
        }
    }
});

export const { removeComment } = commentSlice.actions

export default commentSlice.reducer;