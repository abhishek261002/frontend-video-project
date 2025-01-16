import React, { useEffect, useState } from "react";
import Comments from "../components/comment/Comments.jsx";
import commentservice from "../services/comment.service";
import { useParams } from "react-router-dom";
import { Button, Input } from "../components/index.js";
import { useForm } from "react-hook-form";

function AllComments() {
  const { videoId } = useParams();
  const [comments, setComments] = useState([]);
  const { register, handleSubmit } = useForm();
  let len = comments.length;
  const createComment = async(data)=>{
    const content = await data.content
    const create = await commentservice.createComment(videoId, content)
    if(create){

        ++len
    }
  }


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await commentservice.getCommentsOnVideo(videoId);
        if (comments.data) {
          setComments(comments.data);
        }
      } catch (error) {
        console.log("ERROR IN FETCHING COMMENTS :: ", error?.message);
        throw error;
      }
    };

    fetchComments();
  }, [len]);

  return (
    <div className="w-3/4 bg-red-500 mx-auto">
        <h6>{len} Comments</h6>
      <div className="flex flex-col">
        <div>
          <form onSubmit={handleSubmit(createComment)}>
            <Input
              type="text"
              label="Create comment..."
              placeholder="enter new comment"
              {...register("content",{
                required: true
              })}
            />
            <Button type="submit" className="w-full">
                          Comment
            </Button>
          </form>
        </div>

        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="bg-green-500 p-4">
              <Comments {...comment} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllComments;
//deafault export hai to Comments nam se import hai VideoPlayer.jsx mai
