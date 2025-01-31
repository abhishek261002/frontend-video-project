import React, { useEffect, useState } from "react";
import Comments from "../components/comment/Comments.jsx";
import commentservice from "../services/comment.service";
import { useParams , useNavigate } from "react-router-dom";
import { Button, Input } from "../components/index.js";
import { useForm } from "react-hook-form";

function AllComments() {
  const { videoId } = useParams();
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  let len = comments.length;

  const createComment = async(data)=>{
    try {
      const content = await data.content
      const create = await commentservice.createComment(videoId, content)
      if(create){
          ++len
      }
      reset();
      setRefresh(!refresh)
    } catch (error) {
      
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
  }, [refresh]);

  return (
    <div className="w-3/4 bg-gray-300 rounded-3xl mt-4 mx-auto">
        <h6 className="w-full p-3 font-bold text-2xl font-jaro tracking-wider">{len} Comments :</h6>
      <div className="flex flex-col p-4">
        {/* create comment */}
        <div>
          <form onSubmit={handleSubmit(createComment)}>
            <div className="w-full flex px-4 gap-2" >
            <Input
            className="rounded-2xl "
              bgColor="bg-gray-200"
              type="text"
              placeholder="Add a comment...."
              {...register("content",{
                required: true
              })}
            />
            <Button type="submit" bgColor="bg-black" className="font-medium font-jaro">Comment</Button>
            </div>
          </form>
        </div>
        {/* display comments */}
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className=" p-4">
              <Comments {...comment} setRefresh={setRefresh} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllComments;
//deafault export hai to Comments nam se import hai VideoPlayer.jsx mai
