import { Client } from "appwrite";
import conf from "../conf/config";

export class AuthService {
    client = new Client();
    account;

/*

NOTE: ACCOUNT OBJECT JO BANAYA UPPAR USMEI USER KA DATA NHI HAI INSTEAD SARE METHODS HAI FOR EG .create, .get etc 

account = {
  create: async function (id, email, password, name) { ... },
  createEmailSession: async function (email, password) { ... },
  get: async function () { ... },
  updateEmail: async function (email, password) { ... },
  updateName: async function (name) { ... },
  updatePassword: async function (password, oldPassword) { ... },
  getSessions: async function () { ... },
  deleteSessions: async function () { ... },
  // ...aur bhi methods from Appwrite Account SDK
}

*/

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password});
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login ({email, password}) {
        try {
            return await this.account.creatEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch(error) {
            console.log("Appwrite Server :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Server :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService



/*

FOR ME :-)

:-)

             🔽
  ✅ Create new AuthService Object
      const authService = new AuthService()

             🔽
          constructor()
             │
             ├─ this.client = new Client()
             │
             ├─ this.client.setEndpoint(conf.appwriteUrl)
             │
             ├─ this.client.setProject(conf.appwriteProjectId)
             │
             └─ this.account = new Account(this.client)

             🔽
      createAccount({email, password, name})
             │
             ├─ this.account.create(ID.unique(), email, password, name)
             │   ↳ Appwrite pe naya user create hota hai
             │
             └─ return userAccount (optional)

             🔽
          login({email, password})
             │
             ├─ this.account.createEmailSession(email, password)
             │   ↳ Appwrite pe login session ban jata hai
             │
             └─ return session info (optional)

             🔽
      ✅ User is now signed up and logged in



AuthService Flow Summary:

1. const authService = new AuthService()
   - constructor runs, sets up Appwrite client and account

2. createAccount({email, password, name})
   - Creates a new user on Appwrite backend

3. login({email, password})
   - Logs in the user and creates a session

Now user is signed up and logged in!


*/

/*
🔁 ========== AuthService Flowchart (Appwrite Integration) ==========

[1] Create a client & account instance
--------------------------------------------------
client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

account = new Account(client)

[2] Create an instance of AuthService
--------------------------------------------------
const authService = new AuthService()

// Now authService can be used to call all methods like:
// authService.createAccount(...)
// authService.login(...)

[3] Methods Available:
--------------------------------------------------

✅ createAccount({ email, password, name })
   ├─ Creates new user via account.create(...)
   ├─ If successful, calls login(...) to log user in
   └─ Returns session info

✅ login({ email, password })
   ├─ Calls account.createEmailSession(...)
   └─ Returns login session data

✅ getCurrentUser()
   ├─ Calls account.get()
   └─ Returns current logged-in user (or null if error)

✅ logout()
   ├─ Calls account.deleteSessions()
   └─ Logs user out from all sessions

[4] Exported:
--------------------------------------------------
export default authService
→ So you can directly import it and use in any file:
   import authService from "../appwrite/auth";

====================================================
🧠 Think of this like a reusable login/signup service
used across your whole app — powered by Appwrite 🚀
*/