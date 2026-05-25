import { Heart, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import http, { API_ORIGIN, getErrorMessage } from "../api/http.js";
import { notify } from "../store/toastSlice.js";

export default function BlogDetail() {
  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  async function loadBlog() {
    setLoading(true);
    try {
      const { data } = await http.get(`/blogs/${slug}`);
      setBlog(data.blog);
    } catch (error) {
      dispatch(notify(getErrorMessage(error), "error"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBlog();
  }, [slug]);

  async function likePost() {
    if (!user) {
      dispatch(notify("Login to like posts", "error"));
      return;
    }
    const { data } = await http.post(`/blogs/${blog._id}/like`);
    setBlog({
      ...blog,
      likes: Array.from({ length: data.likes }, (_, index) => blog.likes[index] || `like-${index}`)
    });
  }

  async function addComment(event) {
    event.preventDefault();
    if (!user) {
      dispatch(notify("Login to comment", "error"));
      return;
    }
    try {
      const { data } = await http.post(`/blogs/${blog._id}/comments`, { body: comment });
      setBlog({ ...blog, comments: data.comments });
      setComment("");
      dispatch(notify("Comment added"));
    } catch (error) {
      dispatch(notify(getErrorMessage(error), "error"));
    }
  }

  async function removeComment(commentId) {
    const { data } = await http.delete(`/blogs/${blog._id}/comments/${commentId}`);
    setBlog({ ...blog, comments: data.comments });
  }

  if (loading) return <div className="py-16 text-center"><div className="inline-flex items-center gap-2 text-slate-600"><div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div><span>Loading post...</span></div></div>;
  if (!blog) return <div className="py-16 text-center text-slate-600 font-medium">Post not found.</div>;

  const image = blog.coverImage
    ? `${API_ORIGIN}${blog.coverImage}`
    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";
  const canEdit = user?.id === blog.author?._id;

  return (
    <article className="mx-auto max-w-4xl space-y-10">
      <img src={image} alt="" className="h-[min(56vw,420px)] w-full rounded-2xl object-cover shadow-lg" />
      <header className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">{tag}</span>
          ))}
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">{blog.title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-blue-100 text-sm text-slate-600">
          <span className="font-semibold text-slate-700">By {blog.author?.name}</span>
          {canEdit && <Link className="font-semibold text-blue-600 hover:text-blue-700 transition-colors" to={`/editor/${blog._id}`}>✎ Edit post</Link>}
        </div>
      </header>
      <div className="prose-lite whitespace-pre-line rounded-xl border border-blue-100 bg-white p-8 text-lg leading-8 text-slate-700 shadow-md">
        {blog.content}
      </div>
      <section className="rounded-xl border border-blue-100 bg-white p-8 shadow-md">
        <div className="flex items-center justify-between pb-6 border-b border-blue-100">
          <h2 className="text-2xl font-black text-slate-900">Discussion</h2>
          <button onClick={likePost} className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 hover:border-red-300 transition-all duration-200">
            <Heart className="h-4 w-4" />
            {blog.likes?.length || 0}
          </button>
        </div>
        <form onSubmit={addComment} className="mt-6 flex gap-2">
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={user ? "Share your thoughts..." : "Login to comment"}
            disabled={!user}
            className="min-w-0 flex-1 rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-blue-50 transition-all"
          />
          <button className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md" title="Send">
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-6 space-y-0 divide-y divide-blue-50">
          {blog.comments?.map((item) => (
            <div key={item._id} className="flex items-start justify-between gap-4 py-5 hover:bg-blue-50 transition-colors duration-200 px-3 rounded-lg">
              <div className="flex-1">
                <p className="font-bold text-slate-900">{item.author?.name || "Reader"}</p>
                <p className="mt-2 text-slate-600 leading-6">{item.body}</p>
              </div>
              {(user?.id === item.author?._id || user?.id === blog.author?._id) && (
                <button onClick={() => removeComment(item._id)} className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0" title="Delete comment">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          {blog.comments?.length === 0 && <p className="py-8 text-center text-slate-500 font-medium">No comments yet. Be the first to share your thoughts!</p>}
        </div>
      </section>
    </article>
  );
}
