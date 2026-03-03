export type BlogComment = {
  id: string;
  slug: string;
  authorName: string;
  company: string;
  message: string;
  createdAt: string;
};

type CommentBySlug = Map<string, BlogComment[]>;

declare global {
  // eslint-disable-next-line no-var
  var __FMEA_COMMENTS_STORE: CommentBySlug | undefined;
}

const commentsStore = globalThis.__FMEA_COMMENTS_STORE ?? new Map<string, BlogComment[]>();

if (!globalThis.__FMEA_COMMENTS_STORE) {
  globalThis.__FMEA_COMMENTS_STORE = commentsStore;
}

const MAX_COMMENTS_PER_POST = 300;

function createCommentId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getCommentsBySlug(slug: string): BlogComment[] {
  return [...(commentsStore.get(slug) ?? [])].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function addCommentToSlug(slug: string, data: Omit<BlogComment, "id" | "slug" | "createdAt">): BlogComment {
  const comment: BlogComment = {
    id: createCommentId(),
    slug,
    createdAt: new Date().toISOString(),
    ...data
  };

  const existingComments = commentsStore.get(slug) ?? [];
  const nextComments = [comment, ...existingComments].slice(0, MAX_COMMENTS_PER_POST);
  commentsStore.set(slug, nextComments);

  return comment;
}
