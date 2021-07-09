import faunadb, {query as q} from 'faunadb'
import dotenv from 'dotenv'

dotenv.config()
const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNA_KEY})

export const getUser = async (userId) => {
  try {
    const user = await client.query(
      q.Get(
        q.Ref(q.Collection('users'), userId)
      )
    )
    return user.data
  } catch {
    return
  }
}

export const createPost = async (title, body, authorId, tags) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let author = await getUser(authorId)
  const date = new Date()
  let data = await client.query(
    q.Create(
      q.Collection('blogs'),
      {
        data: {
          title, 
          body, 
          upvote: 0,
          downvote: 0,
          created__at: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
          author: {
            name:author.name, 
            email: author.email, 
            id:author.id, 
            username: author.username
          },
          tags
        }
      }
    )
  )
  data.data.id = data.ref.value.id
  return data.data
}

export const getPosts = async () => {
  let allBlogs = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("blogs"))),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  )
  return allBlogs.data
}

export const getPost = async id => {
  try {
    let blog = await client.query(
      q.Get(q.Ref(q.Collection('blogs'), id))
    )
    blog.data.id = blog.ref.value.id
    return blog.data
  } catch (error) {
    return
  }
}

export const upvotePost = async (upvote, id) => {
  try {
    let blog = await client.query(
      q.Update(
        q.Ref(q.Collection('blogs'), id),
        {data: {upvote}}
      )
    )
    blog.data.id = blog.ref.value.id
    return blog.data
  } catch  {
    return
  }
}

export const downvotePost = async (downvote, id) => {
  try {
    let blog = await client.query(
      q.Update(
        q.Ref(q.Collection('blogs'), id),
        {data: {downvote}}
      )
    )
    blog.data.id = blog.ref.value.id
    return blog.data
  } catch (error) {
    return
  }
}