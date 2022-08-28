/*
1. /api/v1/posts
    1. Crear posts
    2. Ver los posts de todos los usuarios
2. /api/v1/posts/:id 
    1. Ver un post en especifico
3. /api/v1/users/me/posts
    1. Ver unicamente los posts del usuario loggeado
4. /api/v1/users/me/posts/:id
    1. Ver un post en especifico pero solo los del usuario loggeado
    2. Editar un post
    3. Eliminar un post

{
	"id": "uuid",
	"title": "string",
	"content":"string",
	"header_image": "url_to_img",
	"user_id": "uuid",//Aqui hara referencia al usuario de tu userDB
	"published": true
}
*/
const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");
const postsDB=[]

const createPost =(data)=>{
    let res
    if(data.title&&data.content&&data.header_image&&data.user_id){
        res={
            id: uuid.v4(),
	        title: data.title,
	        content:data.content,
	        header_image: data.header_image,
	        user_id: data.user_id,
	        published: true
        }
        console.log(res)
        postsDB.push(res)
    }
    return res
}

//console.log(createPost({
//    title: "data.title",
//    content:"data.content",
//    header_image: "data.header_image",
//    user_id: "data.user_id,"
//}))
const allPosts=()=>{
    return postsDB
}
const getPostByID=(id)=>{//falta comprobar la encriptacion del id 
    const res = postsDB.filter((post) => post.id === id);
    return res.length ? res[0] : false 
}
const getPostsByUser=(user_id)=>{ //encriptacion verificar usuario
    const res = postsDB.filter((post) => post.user_id === user_id);
    return res
}
const getMyPostByID=(user_id,id)=>{ //usuario ya logueado haga una peticion con n user diferent
    const aux = getPostsByUser(user_id);
    let res= aux?aux.filter((post) => post.id === id):undefined
    return res? res[0] : res
}
const editPost=(user_id, data,id)=>{//encriptacion
    let res
    console.log(user_id, )
    const userposts=getPostsByUser(user_id)
    const post=userposts.filter((post) => post.id ===id)
    const index=postsDB.findIndex((post) => post.id ===id)
    if(index>=0&&post.length>=1){
        res=postsDB[index]={
            id: data.id,
	        title: data.title,
	        content:data.content,
	        header_image: data.header_image,
	        user_id: data.user_id,
	        published: true
        }
    }
    return res
}
const deleteByID=(user_id, id)=>{
    let res=false
    const userposts=getPostsByUser(user_id)
    const post=userposts.filter((post) => post.id === id)
    const index=postsDB.findIndex((post) => post.id === id)
    if(index>=0&&post.length>=1){
        res=true;
        postsDB.splice(index,1)
    }
    return res
}

module.exports={
    createPost,
    allPosts,
    getPostByID,
    getPostsByUser,
    getMyPostByID,
    editPost,
    deleteByID
}