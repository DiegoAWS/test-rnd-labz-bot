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

// READ: Get user by telegram ID
export const getUserById = async (telegram_id: number) => {
    try {
        const user = await User.findByPk(telegram_id);
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

// UPDATE: Update user details by telegram ID
export const updateUser = async (telegram_id: number, updatedData: Partial<UserAttributes>) => {
    try {
         await User.update(updatedData, {
            where: {
                telegram_id
            }
        });

        return getUserById(telegram_id);
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// DELETE: Remove a user by telegram ID
export const deleteUser = async (telegram_id: number) => {
    try {
        const result = await User.destroy({
            where: {
                telegram_id
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
