const users = require('./data');

function getUsers() {
    return users;
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

function createUser(name, email, type, password) {
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return { error: "Email already exists" };
    }

    const id = users.length + 1;
    const newUser = { id, name, email, type, password };
    users.push(newUser);
    return newUser;
}

function updateUser(id, name, email, type, password) {
    const user = getUserById(parseInt(id));

    if (!user) {
        return { error: "User not found" };
    }

    if (email && email !== user.email && users.find(u => u.email === email)) {
        return { error: "Email already exists" };
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.type = type || user.type;
    user.password = password || user.password;

    return user;
}

function deleteUser(id) {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return { error: "User not found" };
    }

    users.splice(userIndex, 1);
    return { message: "User deleted successfully" };
}

module.exports = { getUsers, createUser, updateUser, deleteUser };
