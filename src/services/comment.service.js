import axios from "axios";
import { BASE_URL} from "../conf/conf.js";

export class CommentService{

    async createComment(videoId, content){
        try {
            const createdcomment = await axios.post(`${BASE_URL}/comment/${videoId}`,
                    {content},
                    {withCredentials :true }
            )
    
            if(!createdcomment){
                return null;
            }
            return createdcomment;
        } 
        catch (error) {
            console.log("ERROR IN CREATING COMMENT :: ",error?.message);

        }
    }

    async deleteComment({videoId, commentId}){
        try {
            const deletedcomment = await axios.delete(`${BASE_URL}/comment/c/:${videoId}`,
                {
                    withCredentials: true,
                    data: {
                        commentId
                    }
                })

            if(!deletedcomment){
                return null
            }
            return deletedcomment
        } 
        catch (error) {
            console.log("ERROR IN DELETING COMMENT :: ",error?.message);
            throw error;
        }
    }

    async editComment({videoId, commentId, newContent}){
        try {
            const editedComment = await axios.put(`${BASE_URL}/comment/c/:${videoId}`,
                {commentId , newContent},
                {withCredentials: true}
            )

            if(!editedComment){
                return null
            }
            return editedComment
        } 
        catch (error) {
            console.log("ERROR IN EDIT COMMENT :: ",error?.message);
            throw error;
        }
    }

    async getCommentsOnVideo(videoId){
        try {
            const comments = await axios.get(`${BASE_URL}/comment/${videoId}`
            )
    
            if(!comments){
                return null
            }
            return comments.data
        } 
        catch (error) {
            console.log("ERROR IN FETCHING COMMENTS OF VIDEO :: ",error?.message);
        }
    }
}

const commentservice = new CommentService();

export default commentservice;