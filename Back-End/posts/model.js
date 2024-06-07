import admin from 'firebase-admin'
import { PostRepository } from './repository.js';
export class Post{
    commentsCount;
    context;
    likesCount;
    postDateTime;
    postId;
    userId;

    #repository

    constructor(){
        this.#repository = new PostRepository();
    }

    findPostById(){  
        if(!this.userId){
            return Promise.reject({
                code: 500,
                message: 'Usuário não informado!'
            })
        }
        console.log(this.userId)
        try{
            return this.#repository.findMyPosts(this.userId)
        }
        catch(error){
                console.error('Error fetching posts:', error);
                throw error;
            }
    }
    
    
}