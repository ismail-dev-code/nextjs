import Link from "next/link";
import style from './post.module.css';
// Fetch posts from JSONPlaceholder API
export const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
};
export const metadata = {
  title: "All Post",
  description: "Loading JSONPlaceholder post using server Component",
};

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-lg shadow-md border hover:shadow-lg transition duration-300"
          >
            <h2 className={`text-lg font-semibold mb-2 ${style['post-title']}`}>{post.title}</h2>
            <p className="text-gray-700 mb-4 line-clamp-3">{post.body}</p>
            <Link
              href={`/posts/${post.id}`}
              className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
