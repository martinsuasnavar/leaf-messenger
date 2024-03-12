export const backendDomain = `http://localhost:8000/api`;
export var loggedUsername = {
    value: `tobedefined`
};
export var loggedId = {
    value: null
};

// Define userArray globally
var userArray = [];

// Fetch users function
const fetchUsers = async () => {
    const response = await fetch(`${backendDomain}/users`);
    const data = await response.json();
    try {
        userArray = data.users;
    } catch (error) {
        console.log(`Couldn't fetch users: `, error);
    }
};


fetchUsers();

export { userArray };