import { BarangWithPerusahaan, Response } from "@/types/models";
import {api} from "."


interface listBarangQuery {
    q?: string;
    perusahaan?: string;
}

type ListBarangData = BarangWithPerusahaan[]

const listBarangAPI = async (query: listBarangQuery) => {
    const response = await api.get<Response<ListBarangData>>("/barang", {
        params: query
    })
    return response.data
} 

export default listBarangAPI;