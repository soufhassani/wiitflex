import { Movie } from "./Movies";

type User = {
    id: string;
    fullName: string | "";
    username: string | "";
    email: string | "";
    password: string | "";
    watchList: Movie[];
}
// token: string | "";
export default User