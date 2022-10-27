import User from "./User";

interface UserData {
  username: string;
  email: string;
  password: string;
}

const DEFAULT_PROJECTION = {
  password: 0,
  __v: 0,
};

async function exists(username: string, email: string) {
  return (
    (await User.exists({
      $or: [{ username: username }, { email: email }],
    })) !== null
  );
}

async function addUser(user: UserData) {
  try {
    const createdUser = await User.create(user);
    const { __v, password, ...output } = createdUser.toObject();
    return output;
  } catch (error) {
    throw error;
  }
}

function getUsers() {
  return User.find({}, DEFAULT_PROJECTION);
}

function getUserById(id: string, projected = true) {
  return User.findById(id, projected ? DEFAULT_PROJECTION : {});
}

function getUserByEmail(email: string, projected = true) {
  return User.findOne({ email: email }, projected ? DEFAULT_PROJECTION : {});
}

function updateUser(id: string, updateData: UserData) {
  return User.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    projection: DEFAULT_PROJECTION,
  });
}

function deleteUser(id: string) {
  return User.findByIdAndDelete(id, {
    projection: DEFAULT_PROJECTION,
  });
}

const userModel = {
  exists,
  addUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};

export default userModel;
