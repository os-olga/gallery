import { AxiosPromise } from "axios";

import { axiosInstance } from "./axios";
import { IImage } from "../App.interface";

export const ImageService = {
  saveImage(data: FormData): AxiosPromise<IImage> {
    return axiosInstance.post("/images", data);
  },
  getImages(): AxiosPromise<IImage[]> {
    return axiosInstance.get("/images");
  },
  deleteImage(id: number): AxiosPromise<number> {
    return axiosInstance.delete(`/images/${id}`);
  },
};
