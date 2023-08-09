import { useQuery } from "@tanstack/react-query";
import User from "../entities/User";
import APIClientUser from "../services/api-client-user";

const apiClientUser = new APIClientUser<User>('/api/users');

const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: apiClientUser.getAll,
})

export default useUsers;


