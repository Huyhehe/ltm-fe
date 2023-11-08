import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { UserSubmissionType } from "../utils/type";
import { API_ENDPOINT } from "../utils/constants";

const initialState: InitialStateType = {
  currentCode: "",
  currentLang: "",
  codeLoading: false,
  codeOutput: "",
  jobId: "",
  userSubmission: [],
  loading: false,
};

export const asyncProgrammemRun = createAsyncThunk(
  "code/runProgramme",
  async ({
    currentCode,
    currentLang,
    userInput,
  }: {
    currentCode: string;
    currentLang: string;
    userInput: string;
  }) => {
    const res = await fetch(`${API_ENDPOINT}/code/run`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: currentCode,
        language: currentLang,
        userInput,
      }),
    });
    const data = await res.json();

    if (res.ok) return data.jobId;
    else {
      toast.error(data);
    }
  }
);

export const asyncProgrammemSubmit = createAsyncThunk(
  "code/submitProgramme",
  async ({
    currentCode,
    currentLang,
    userInput,
    problemId,
    userId,
  }: {
    currentCode: string;
    currentLang: string;
    userInput: string;
    problemId: string;
    userId: string;
  }) => {
    const res = await fetch(`${API_ENDPOINT}/code/submit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: currentCode,
        language: currentLang,
        userInput,
        problemId,
        userId,
      }),
    });
    const data = await res.json();

    if (res.ok) return data.jobId;
    else {
      toast.error(data);
    }
  }
);

export const asyncSubmissionGet = createAsyncThunk(
  "code/getSubmission",
  async ({ problemId, userId }: { problemId: string; userId: string }) => {
    console.log("first");
    try {
      const res = await fetch(
        `${API_ENDPOINT}/code/submission/${problemId}/${userId}`
      );
      const data = await res.json();
      if (res.ok) return data;
      else toast.error(data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const asyncSubmissionDownload = createAsyncThunk(
  "code/downloadSubmission",
  async (jobId: string) => {
    window.open(`${API_ENDPOINT}/code/download/${jobId}`);
  }
);

export const CodeSlice = createSlice({
  name: "Code",
  initialState,
  reducers: {
    setCurrentCode: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.currentCode = action.payload;
    },
    setCurrentLang: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.currentLang = action.payload;
    },
  },
  extraReducers: {
    [asyncProgrammemRun.pending.type]: (state) => {
      state.codeLoading = true;
    },
    [asyncProgrammemRun.fulfilled.type]: (state, action) => {
      state.codeLoading = false;
      state.jobId = action.payload;
    },
    [asyncProgrammemSubmit.pending.type]: (state) => {
      state.codeLoading = true;
    },
    [asyncProgrammemSubmit.fulfilled.type]: (state, action) => {
      state.codeLoading = false;
      state.jobId = action.payload;
    },
    [asyncSubmissionGet.pending.type]: (state, action) => {
      state.loading = true;
    },
    [asyncSubmissionGet.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.userSubmission = action.payload;
    },
    [asyncSubmissionGet.rejected.type]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setCurrentCode, setCurrentLang } = CodeSlice.actions;

export default CodeSlice.reducer;

interface InitialStateType {
  currentCode: string;
  currentLang: string;
  codeLoading: boolean;
  codeOutput: string;
  jobId: string;
  userSubmission: UserSubmissionType[];
  loading: boolean;
}
