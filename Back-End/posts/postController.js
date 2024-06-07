import { Post } from './model.js';

export class PostController{
    findPostsById = (request,response) =>{
        console.log('chamou api')
        
        console.log('GET');
        const post = new Post();
        
        post.userId = request.user.uid;

        post.findPostById().then(posts =>{
            response.json(posts)
        }).catch(error => {
            console.log('erro');
            response.status(error.code).json(error);
        })
        
    }
}