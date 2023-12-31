import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ProblemType, PropblemDetailType, TestcaseType } from "../utils/type";
import { API_ENDPOINT } from "../utils/constants";

const initialState: InitialStateType = {
  testcase: [],
  loading: false,
  problems: [],
  singleProblem: undefined,
};

export const asyncProblemAdd = createAsyncThunk(
  "problem/addProblem",
  async ({
    detail,
    testcase,
    userId,
    callback,
  }: {
    detail: PropblemDetailType;
    testcase: TestcaseType[];
    userId: string;
    callback: () => void;
  }) => {
    const res = await fetch(`${API_ENDPOINT}/problem/add`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ detail, testcase, userId }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Problem added successfully...");
      callback();
      return data;
    } else toast.error(JSON.stringify(data));
  }
);

export const asyncProblemEdit = createAsyncThunk(
  "problem/editProblem",
  async ({
    detail,
    testcase,
    id,
    userId,
    callback,
  }: {
    detail: PropblemDetailType;
    testcase: TestcaseType[];
    id: string;
    userId: string;
    callback: () => void;
  }) => {
    const res = await fetch(`${API_ENDPOINT}/problem/edit/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ detail, testcase, userId }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Problem Updated Successfully...");
      callback();
      return data;
    } else toast.error(JSON.stringify(data));
  }
);

export const asyncProblemDelete = createAsyncThunk(
  "problem/deleteProblem",
  async ({ id, callback }: { id: string; callback: () => void }) => {
    const res = await fetch(`${API_ENDPOINT}/problem/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Problem Deleted Successfully...");
      callback();
      return data;
    } else toast.error(JSON.stringify(data));
  }
);

export const asyncProblemGet = createAsyncThunk(
  "problem/getProblem",
  async () => {
    const res = await fetch(`${API_ENDPOINT}/problem/`, {
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else toast.error(JSON.stringify(data));
  }
);

export const asyncSingleProblemGet = createAsyncThunk(
  "problem/getSingleProblem",
  async (id: string) => {
    const res = await fetch(`${API_ENDPOINT}/problem/` + id);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else toast.error(JSON.stringify(data));
  }
);

export const ProblemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    addTestcase: (
      state: typeof initialState,
      action: PayloadAction<TestcaseType>
    ) => {
      state.testcase.push(action.payload);
      console.log(state.testcase);
    },
    removeTestcase: (
      state: typeof initialState,
      action: PayloadAction<number>
    ) => {
      state.testcase = state.testcase.filter(
        (item, index) => index !== action.payload
      );
    },
    setTestcase: (
      state: typeof initialState,
      action: PayloadAction<TestcaseType[]>
    ) => {
      state.testcase = action.payload;
    },
  },
  extraReducers: {
    [asyncProblemAdd.pending.type]: (state) => {
      state.loading = true;
    },
    [asyncProblemAdd.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [asyncProblemAdd.rejected.type]: (state) => {
      state.loading = false;
    },
    [asyncProblemGet.pending.type]: (state, { payload }) => {
      state.loading = true;
    },
    [asyncProblemGet.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.problems = payload;
    },
    [asyncProblemGet.rejected.type]: (state, { payload }) => {
      state.loading = false;
    },
    [asyncSingleProblemGet.pending.type]: (state, { payload }) => {
      state.loading = true;
    },
    [asyncSingleProblemGet.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.singleProblem = payload;
    },
    [asyncSingleProblemGet.rejected.type]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { addTestcase, removeTestcase, setTestcase } =
  ProblemSlice.actions;

export default ProblemSlice.reducer;

interface InitialStateType {
  testcase: TestcaseType[];
  loading: boolean;
  problems: ProblemType[];
  singleProblem: ProblemType | undefined;
}
