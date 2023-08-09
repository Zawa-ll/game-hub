import { useQuery } from '@tanstack/react-query';
import LikedGame from "../entities/LikedGame";
import APIClientUser, { FetchResponse } from "../services/api-client-user";

const apiClientUser = new APIClientUser<LikedGame>('/games');

const useLikes = () => useQuery({
    queryKey: ['likeGames'],
    queryFn: apiClientUser.getAll,
})

export default useLikes;