import api from "../api/Api"
import { useQuery } from "react-query";


const { data: responseList = [], isLoading, error } = useQuery("question", async () => {
    const response = await api.get('question', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  },)