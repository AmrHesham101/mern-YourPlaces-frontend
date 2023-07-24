import UserList from "../components/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "MAX Amr",
      image:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress",
      places: 3,
    },
    {
      id: "u2",
      name: "MAX Prime",
      image:
        "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress",
      places: 3,
    },
  ];
  return <UserList items={USERS} />;
};
export default Users;
