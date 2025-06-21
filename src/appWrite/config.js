import conf from "../conf.js";
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service {
    client = new Client()  
    databases; 
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

/*

for reference::

this.databases = {
  createDocument(databaseId, collectionId, documentId, data),
  listDocuments(databaseId, collectionId, queries),
  getDocument(databaseId, collectionId, documentId),
  updateDocument(databaseId, collectionId, documentId, data),
  deleteDocument(databaseId, collectionId, documentId),

  // (Bonus) Advanced:
  listCollections(databaseId),
  createCollection(databaseId, collectionId, name, permissions, documentSecurity),
  updateCollection(databaseId, collectionId, name),
  deleteCollection(databaseId, collectionId),
  // and more...
}

this.bucket = {
  createFile(bucketId, fileId, file),               // Upload a file
  listFiles(bucketId, queries),                     // List all files
  getFile(bucketId, fileId),                        // Get file metadata
  getFilePreview(bucketId, fileId),                 // Get image/file preview
  getFileDownload(bucketId, fileId),                // Download file
  deleteFile(bucketId, fileId),                     // Delete file
  updateFile(bucketId, fileId, file),               // Replace file
  // etc.
}

*/

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage, 
                    status,
                    userId
                }

            ) 
        } catch (error) {
            console.log("Appwrite Server :: CreatePost :: error", error);
        }
    }
    
    async updatePost({title, slug, content, featuredImage, status}) {
        try {
            return await this.data.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }


            )
        } catch (error) {
            console.log("Appwrite Server :: updatePost :: error", error);
        }
    }

    async deletePost({slug}) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;

        } catch (error) {
            console.log("Appwrite Server :: deletePost :: error", error);
            return false
        }
    }

    async getPost({slug}) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Server :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite Server :: getPosts :: error", error);
            return false
        }
    }

    //file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("Appwrite Server :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Server :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

};


const service = new Service()

export default service


//will change naming later !! 