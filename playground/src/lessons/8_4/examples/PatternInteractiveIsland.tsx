// @ts-nocheck
// Server Component: Most of the page
async function ArticlePage({ slug }) {
  const article = await getArticle(slug);
  const author = await getAuthor(article.authorId);

  return (
    <article>
      {/* All server-rendered, zero JS */}
      <h1>{article.title}</h1>
      <ArticleContent content={article.content} />
      <AuthorBio author={author} />

      {/* Interactive islands - only these add JS */}
      <LikeButton articleId={article.id} />
      <CommentForm articleId={article.id} />
    </article>
  );
}

// Client Component: Small, focused
('use client');
function LikeButton({ articleId }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setCount((c) => (liked ? c - 1 : c + 1));
      }}
    >
      {liked ? '❤️' : '🤍'} {count}
    </button>
  );
}
