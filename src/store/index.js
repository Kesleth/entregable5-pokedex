import { configureStore } from "@reduxjs/toolkit";
import nameTrainerSlice from "./name.Trainer,slice";


export default configureStore({
    reducer:{
        nameTrainerSlice
    }
})