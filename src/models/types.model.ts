export default interface IUser {
    email: string;
    id: { value: string };
    location: {
        city: string;
        country: string;
        street: { number: string; name: string };
    };
    name: { title: string; first: string; last: string };
    picture: { large: string };
}
