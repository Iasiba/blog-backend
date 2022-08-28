const { response } = require('express')
const { getById } = require('../users/users.http')
const postsController=require('./posts.controller.js')
const createPost=(req,res)=>{
    let response
    const data=req.body
    if(data.title&&data.content&&data.header_image&&data.user_id){
        const post=postsController.createPost(data)
        response=res.status(201).json({
            message: `Post created succesfully`,
            post: post
        })
    }else{
        response=res.status(400).json({
            message:"All fields must be completed",
            example:{
                title: "string",
                content:"string",
                header_image: "url_to_img",
                user_id: "uuid"
            }
        })
    }
    return response
}
const getAllPosts=(req,res)=>{
    const allPosts=postsController.allPosts()
    return res.status(200).json({
        items:allPosts.length,
        posts:allPosts
    })
}
const getPostByID=(req,res)=>{
    let response
    const id = req.params.id;
    const data = postsController.getPostByID(id)
    if (data&&data!=-1) {
      response=res.status(200).json(data);
    } else {
      response=res.status(404).json({ message: `post whit id: ${id} not found` });
    } 
    return response
}
const getMyPosts=(req,res)=>{ //verificar usuario
    let response
    const user_id=req.body.user_id
    if(user_id&&user_id!=-1){
        const posts=postsController.getPostsByUser(user_id)
        response=   res.status(200).json({
            items:posts.length,
            posts:posts
        })
    }else{
        response= res.status(400).json({
            items:"invalid user"
        })    
    }
    return response
}
const getMyPostByID=(req,res)=>{
    let response
    const data=req.body
    const id= req.params.id
    if(data&&data.user_id&&data.user_id!=-1&&id&&id!=-1){
        const post=postsController.getMyPostByID(data.user_id,id)
        response=res.status(200).json({
            post:post
        })
    }else{
        response=res.status(400).json({ 
            message: `invalid`,
            example:{user_id:"string",id:"uuid"}
    
    });
 
    } 
    return response
}
const editMyPost =(req, res)=>{
    let response
    const data=req.body
    const id = req.params.id
    if(data&&id&&data.user_id&&data.title&&data.content&&data.header_image){
        const data_edit=postsController.editPost(data.user_id,data,id)
        response=data_edit?res.status(200).json({
            data_edit:data_edit
        }):res.status(400).json({
            message:"invalid date"
        })
    }else{
        response=res.status(400).json({
            message:"All fields must be completed",
            example:{
                title: "string",
                content:"string",
                header_image: "url_to_img",
                user_id: "uuid"
            }
        }) 
    }
    return response
}
const deleteMyPost=(req,res)=>{
    let response
    const data=req.body
    const id=req.params.id
    if(data&&id&&data.user_id&&id!=-1&&data.user_id!=-1){
        const data_edit=postsController.deleteByID(data.user_id,id)
        response=data_edit?res.status(200).json({
            message:"deleted"
        }):res.status(400).json({
            message:"post not found"
        })
    }else{
        response=res.status(400).json({
            message:"All fields must be completed",
            example:{
                id:"uuid",
                user_id: "uuid"
            }
        }) 
    }
    return response
}
module.exports=
    {createPost,
    getAllPosts,
    getMyPosts,
    getMyPostByID,
    getPostByID,
    getById,
    deleteMyPost,
    editMyPost
}
