import { Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import http, { getErrorMessage } from "../api/http.js";
import { fetchMine } from "../store/blogSlice.js";
import { notify } from "../store/toastSlice.js";

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  tags: "",
  status: "draft",
  coverImage: null
};

export default function Editor() {
  const { id } = useParams();
  const editing = Boolean(id);
  const { mine } = useSelector((state) => state.blogs);
  const existing = useMemo(() => mine.find((blog) => blog._id === id), [mine, id]);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (editing && mine.length === 0) dispatch(fetchMine());
  }, [dispatch, editing, mine.length]);

  useEffect(() => {
    if (existing) {
      setForm({
        title: existing.title,
        excerpt: existing.excerpt,
        content: existing.content,
        tags: existing.tags?.join(", ") || "",
        status: existing.status,
        coverImage: null
      });
    }
  }, [existing]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    const body = new FormData();
    body.append("title", form.title);
    body.append("excerpt", form.excerpt);
    body.append("content", form.content);
    body.append("tags", form.tags);
    body.append("status", form.status);
    if (form.coverImage) body.append("coverImage", form.coverImage);

    try {
      const { data } = editing ? await http.patch(`/blogs/${id}`, body) : await http.post("/blogs", body);
      dispatch(notify(editing ? "Post updated" : "Post created"));
      dispatch(fetchMine());
      navigate(data.blog.status === "published" ? `/blogs/${data.blog.slug}` : "/dashboard");
    } catch (error) {
      dispatch(notify(getErrorMessage(error), "error"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <section className="space-y-4 rounded-xl border border-blue-100 bg-white p-6 shadow-md">
        <input
          required
          minLength={3}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Post title"
          className="w-full rounded-lg border border-blue-200 px-4 py-3 text-3xl font-black outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        <textarea
          required
          minLength={10}
          maxLength={240}
          value={form.excerpt}
          onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
          placeholder="Brief summary of your post..."
          className="h-28 w-full resize-none rounded-lg border border-blue-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        <textarea
          required
          minLength={40}
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
          placeholder="Write your amazing post here..."
          className="h-[420px] w-full resize-y rounded-lg border border-blue-200 px-4 py-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
      </section>
      <aside className="h-fit space-y-4 rounded-xl border border-blue-100 bg-white p-6 shadow-md">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Tags
          </label>
          <input
            value={form.tags}
            onChange={(event) => setForm({ ...form, tags: event.target.value })}
            placeholder="react, api, design"
            className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">Comma separated</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Status
          </label>
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
            className="w-full rounded-lg border border-blue-200 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Cover image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setForm({ ...form, coverImage: event.target.files?.[0] || null })}
            className="w-full text-sm file:rounded-lg file:border-0 file:bg-blue-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
        <button
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition-all duration-200 shadow-md"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save post"}
        </button>
      </aside>
    </form>
  );
}
