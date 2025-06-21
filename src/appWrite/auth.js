import { Client } from "appwrite";
import conf from "../conf/config";

export class AuthService {
    client = new Client();
    account;

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
                //call another method 
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login ({email, password}) {
        // try {
            // await this.account.creatEmailSession(email, password);
        // }
    }
}



const authService = new AuthService()

export default authService



/*

FOR ME 

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