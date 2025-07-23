import Link from "next/link";

export const getSinglePost = async (postId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

export default async function SinglePost({ params }) {
  const { id } = params;
  const post = await getSinglePost(id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <article className="bg-white p-6 rounded-lg shadow-md border">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed">{post.body}</p>
      <Link href="/posts" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
  ← Back to Posts
</Link>
      </article>

    </div>
  );
}
