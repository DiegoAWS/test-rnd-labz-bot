import { User, UserAttributes } from "../db/models/User";


// CREATE: Add a new user
export const createUser = async (userData: UserAttributes) => {
    try {
        const user = await User.create(userData);
        return user.toJSON();
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// READ: Get user by ID
export const getUserById = async (id: number) => {
    try {
        const user = await User.findByPk(id);
        return user?.toJSON();
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

// READ: Get all users
export const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users.map((user) => user.toJSON());
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
};

// UPDATE: Update user details by ID
export const updateUser = async (id: number, updatedData: Partial<UserAttributes>) => {
    try {
         await User.update(updatedData, {
            where: {
                id: id
            }
        });

        return getUserById(id);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// DELETE: Remove a user by ID
export const deleteUser = async (id: number) => {
    try {
        const result = await User.destroy({
            where: {
                id: id
            }
        });
        return result;  // This will return the number of rows deleted
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

// getUserByUsername function
export const getUserByUsername = async (username: string) => {
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        return user?.toJSON();
    } catch (error) {
        console.error("Error fetching user by username:", error);
        throw error;
    }
};
