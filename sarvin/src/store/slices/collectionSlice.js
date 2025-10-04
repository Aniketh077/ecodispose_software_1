import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collectionAPI } from '../../api/collectionAPI';

export const fetchCollections = createAsyncThunk(
  'collections/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      return await collectionAPI.getCollections(params);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch collections' });
    }
  }
);

export const fetchCollectionsGrouped = createAsyncThunk(
  'collections/fetchGrouped',
  async (_, { rejectWithValue }) => {
    try {
      return await collectionAPI.getCollectionsGrouped();
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch grouped collections' });
    }
  }
);

export const fetchCollectionById = createAsyncThunk(
  'collections/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await collectionAPI.getCollectionById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch collection' });
    }
  }
);

export const createCollection = createAsyncThunk(
  'collections/create',
  async (collectionData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      return await collectionAPI.createCollection(collectionData, auth.user.token);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create collection' });
    }
  }
);

export const updateCollection = createAsyncThunk(
  'collections/update',
  async ({ id, collectionData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      return await collectionAPI.updateCollection(id, collectionData, auth.user.token);
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update collection' });
    }
  }
);

export const deleteCollection = createAsyncThunk(
  'collections/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await collectionAPI.deleteCollection(id, auth.user.token);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete collection' });
    }
  }
);

export const reorderCollections = createAsyncThunk(
  'collections/reorder',
  async (collections, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await collectionAPI.reorderCollections(collections, auth.user.token);
      return collections;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to reorder collections' });
    }
  }
);

const collectionSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [],
    groupedCollections: {},
    currentCollection: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCollection: (state) => {
      state.currentCollection = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch collections';
      })
      .addCase(fetchCollectionsGrouped.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionsGrouped.fulfilled, (state, action) => {
        state.loading = false;
        state.groupedCollections = action.payload;
      })
      .addCase(fetchCollectionsGrouped.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch grouped collections';
      })
      .addCase(fetchCollectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCollection = action.payload;
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch collection';
      })
      .addCase(createCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections.push(action.payload);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create collection';
      })
      .addCase(updateCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.collections.findIndex(c => c.id === action.payload.id || c._id === action.payload.id);
        if (index !== -1) {
          state.collections[index] = action.payload;
        }
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update collection';
      })
      .addCase(deleteCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = state.collections.filter(c => c.id !== action.payload && c._id !== action.payload);
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete collection';
      })
      .addCase(reorderCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
      });
  }
});

export const { clearError, clearCurrentCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
