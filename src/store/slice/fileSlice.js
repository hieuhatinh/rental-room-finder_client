import { createSlice } from '@reduxjs/toolkit'
import { fetchDeleteFile, fetchUploadFile } from '../actions/fileAction'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null,
    listFileUpload: [],
    allMessage: [],
    allFileInMessage: [],
    currentShowFileIndex: null,
    currentListFile: null,
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setListFileUploadEmpty: (state, action) => {
            state.listFileUpload = []
        },
        setChangeShowFileIndex: (state, action) => {
            state.currentShowFileIndex = action.payload
        },
        setCurrentShowFileIndex: (state, action) => {
            state.currentShowFileIndex = action.payload.indexImgShow
            state.currentListFile = action.payload?.currentListFile
        },
        setAllMessage: (state, action) => {
            state.allMessage = action.payload
            const listFile = []
            action.payload?.forEach((item) =>
                listFile.push(...item?.filesUpload),
            )
            state.allFileInMessage = listFile
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUploadFile.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchUploadFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.listFileUpload = [
                    ...state.listFileUpload,
                    ...action.payload,
                ]
            })
            .addCase(fetchUploadFile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
        builder
            .addCase(fetchDeleteFile.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = null
            })
            .addCase(fetchDeleteFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.listFileUpload = state.listFileUpload.filter(
                    (item) => item.public_id !== action.payload.public_id,
                )
            })
            .addCase(fetchDeleteFile.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {
    setListFileUploadEmpty,
    setCurrentShowFileIndex,
    setChangeShowFileIndex,
    setAllMessage,
} = fileSlice.actions

export default fileSlice.reducer
