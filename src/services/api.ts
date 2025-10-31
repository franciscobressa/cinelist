import axios, { type AxiosError } from "axios";

export type ApiError = AxiosError & {
  status?: number;
  isNetworkError: boolean;
  friendlyMessage: string;
};

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  params: {
    language: "pt-BR",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const serverMessage =
      (error.response?.data as { message?: string })?.message ?? undefined;

    const fallbackMessage =
      status && status >= 500
        ? "Erro no servidor. Tente novamente mais tarde."
        : "Não foi possível completar a requisição. Verifique sua conexão e tente novamente.";

    const friendlyMessage = serverMessage || error.message || fallbackMessage;

    // Atualiza mensagem do erro para os consumidores
    error.message = friendlyMessage;

    const normalizedError: ApiError = Object.assign(error, {
      status,
      isNetworkError: !error.response,
      friendlyMessage,
    });

    return Promise.reject(normalizedError);
  }
);

export default api;
