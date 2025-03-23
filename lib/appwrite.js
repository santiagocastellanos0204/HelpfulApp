import {
  Account,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.helpful.helpful",
  projectId: "673562340020d63cd018",
  databaseId: "67356364003969c158a1",
  userCollectionId: "67356382002a2c30f2e5",
  journalCollectionId: "673563cc002a02207100",
  storageId: "675b6e0c000017f04601",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  journalCollectionId,
  storageId,
} = config;

//Init your react-native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

// Method to create a new user in the database
export const createUser = async (email, password, name) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) throw Error;

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Method to sign in an existing user
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Method to get the current user in the session
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

// Method to get all entries from appwrite database and display them
export const getAllEntries = async () => {
  try {
    const entries = await databases.listDocuments(
      databaseId,
      journalCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return entries.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Method to create a mood entry
export const createEntry = async (form) => {
  try {
    const newEntry = await databases.createDocument(
      databaseId,
      journalCollectionId,
      ID.unique(),
      {
        mood: form.mood,
        title: form.title,
        entry: form.entry,
        date: form.date,
        creator: form.userId,
      }
    );

    return newEntry;
  } catch (error) {
    throw new Error(error);
  }
};

// Method to update an existing mood entry
export const updateEntry = async (entryId, data) => {
  try {
    const response = await databases.updateDocument(
      databaseId,
      journalCollectionId,
      entryId,
      data
    );
    return response;
  } catch (error) {
    throw new Error("Failed to update entry");
  }
};

// Method to get a specific mood entry to view (read)
export const getEntryById = async (entryId) => {
  try {
    const response = await databases.getDocument(
      databaseId,
      journalCollectionId,
      entryId
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch entry");
  }
};

// Method to delete a mood entry
export const deleteEntry = async (entryId) => {
  try {
    const response = await databases.deleteDocument(
      databaseId,
      journalCollectionId,
      entryId
    );
    return response;
  } catch (error) {
    throw new Error("Failed to delete entry");
  }
};

// Method to sign out a user
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};
