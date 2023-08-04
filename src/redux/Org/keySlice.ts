import { OrgKeys } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: OrgKeys = {
  key: 'orgApi',
  secret: 'orgSecret',
  id: 'orgId'
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateKeys: (
      state,
      action: PayloadAction<{ type: keyof OrgKeys; value: string }>
    ) => {
      const { type, value } = action.payload;
      if (type === 'key') {
        state.key = value;
      } else if (type === 'secret') {
        state.secret = value;
      } else if (type === 'id') {
        state.id = value;
      }
    }
  }
});

export const { updateKeys } = counterSlice.actions;
export default counterSlice.reducer;
