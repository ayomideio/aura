
import { Client,Account,ID, Avatars, Databases, Query, Models } from 'react-native-appwrite';
export const AppwriteConfig={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.ayomideio.aura',
    projectId:'672b9ee3000dbbd20b20',
    databaseId:'672ba09a0032d8221f8e',
    userCollectionId:'672ba0c30021ae56d1b5',
    videoCollectionId:'672ba0ea001c30e4fdc7',
    bucketId:'672ba2ad0028de43a325'
}
const {  endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    bucketId}=AppwriteConfig
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(AppwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(AppwriteConfig.projectId) // Your project ID
    .setPlatform(AppwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const Avatar=new Avatars(client)
const Database=new Databases(client)


export const createUser =async ({email,password,username}:{email:string,password:string,username:string,}) =>{

    try {
   const newAccount=   await  account.create(ID.unique(),email,password ,username,)
   if(!newAccount) throw Error

   const avatarUrl=Avatar.getInitials(username)
   await signin({email,password})

   await Database.createDocument(
    AppwriteConfig.databaseId,
    AppwriteConfig.userCollectionId,
    ID.unique(),
    {
        userId:newAccount.$id,
        email,
        username,
        avatar:avatarUrl

    }


    
   )
        
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
   
}
export const signin=async({email,password}:{email:string,password:string}) =>{
try{
    const session= await account.createEmailPasswordSession(email,password)
    if (!session) throw Error
    return session

}
catch(error){
    console.log(error)
    throw error
}
}
// {"$collectionId": "672ba0c30021ae56d1b5", 
//     "$createdAt": "2024-11-06T18:12:28.947+00:00", 
//     "$databaseId": "672ba09a0032d8221f8e", "$id": "672bb18c0011750b3cb6", 
//     "$permissions": ["read(\"user:672bb18a000d634a87b2\")", "update(\"user:672bb18a000d634a87b2\")", 
//         "delete(\"user:672bb18a000d634a87b2\")"], "$updatedAt": "2024-11-06T18:12:28.947+00:00", 
//         "avatar": "https://cloud.appwrite.io/v1/avatars/initials?name=Test&project=672b9ee3000dbbd20b20", 
//         "email": "gokeayomide.tolu@gmail.com", "userId": "672bb18a000d634a87b2", "username": "Test"}
export interface userDocument{
    $id:string
    $collectionId:string
    $createdAt:string
    $databaseId:string
    $permissions:string []
    $updatedAt:string

    username:string;
    email:string;
    avatar:string;
    userId:string;


}
export const getCurrentUser = async(): Promise<any | null>=>{
    try {
        const currentAccount=await account.get()
        if(!currentAccount) throw Error
        const currentUser =Database.listDocuments(
            AppwriteConfig.databaseId,
            AppwriteConfig.userCollectionId,
            [Query.equal('userId',currentAccount.$id)]
            
        )
        if (!currentUser || (await currentUser).documents.length===0) throw Error
        
         return (await currentUser).documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts=async():Promise<any | null> =>{
try{
    const posts=await Database.listDocuments(
        databaseId,
        videoCollectionId,

    )
    return posts.documents
}catch(error){
    console.log(error)
}
}



export const searchPosts=async(query:string):Promise<any | null> =>{
    try{
        const posts=await Database.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title',query)] 
    
        )
        return posts.documents
    }catch(error){
        console.log(error)
    }
    }

    export const getUserPosts=async(user:any):Promise<any | null> =>{
        try{
            const posts=await Database.listDocuments(
                databaseId,
                videoCollectionId,
                [Query.equal('creator',user.id$)] 
        
            )
            return posts.documents
        }catch(error){
            console.log(error)
        }
        }
    