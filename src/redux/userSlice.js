import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://randomuser.me/api?results=6'; 

const initialState = {
    users: [],
    isLoading: false,
    error: undefined,
}

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {        
        const res = await axios.get(url);
        return res.data.results;
    } catch (error) {
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'users', 
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;            
            // console.log(state.users.data.results);
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export { fetchUsers };
export default userSlice.reducer;