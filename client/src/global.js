//BACKEND_DOMAIN_API
let localHost = false;
if (window.location.href.indexOf("localhost") > -1) {
    localHost = true;
}

const localPort = 8000;

let backendDomain = `https://leaf-messenger-server.vercel.app/api/api`;
if (localHost){
    backendDomain = `http://localhost:${localPort}/api`;
}
export { backendDomain };

/*export const backendDomain = `http://localhost:8000/api`;
*/
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
        console.log("Fetching users...");
        userArray = data.users;
    } catch (error) {
        console.log(`Couldn't fetch users: `, error);
    }
};


fetchUsers();

export { userArray };