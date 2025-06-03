export interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  body: string;
  image_url: string;
  created_by: string;
  team: string;
  view_count: number;
  active: boolean;
  created_by_position: string;
  created_by_profile_image: string;
  createdAt: string;
  updatedAt: string;
  blogCategory: BlogCategory;
}

export interface BlogCategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategoriesResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: BlogCategory[];
}

export interface BlogsResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    blogs: Blog[];
    total: number;
    page: number;
    lastPage: number;
  };
}

export interface CreateBlogCategoryData {
  name: string;
  description: string;
}

export interface CreateBlogData {
  title: string;
  summary: string;
  image_url: string;
  created_by: string;
  team: string;
  created_by_position: string;
  created_by_profile_image: string;
  body: string;
  blogCategoryId: number;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: Blog;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createBlog(data: CreateBlogData): Promise<Blog> {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create blog: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBlogs(
  page = 1,
  perPage = 15
): Promise<BlogsResponse> {
  const response = await fetch(
    `${BASE_URL}/blogs?page=${page}&perPage=${perPage}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBlog(id: string): Promise<BlogResponse> {
  const response = await fetch(`${BASE_URL}/blogs/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch blog: ${response.statusText}`);
  }

  return response.json();
}

export async function updateBlog(id: string, data: any): Promise<Blog> {
  const response = await fetch(`${BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update blog: ${response.statusText}`);
  }

  return response.json();
}

export async function createBlogCategory(
  data: CreateBlogCategoryData
): Promise<BlogCategory> {
  const response = await fetch(`${BASE_URL}/blog-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create blog category: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBlogCategories(
  page = 1,
  perPage = 15
): Promise<BlogCategoriesResponse> {
  const response = await fetch(
    `${BASE_URL}/blog-categories?page=${page}&perPage=${perPage}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch blog categories: ${response.statusText}`);
  }

  return response.json();
}

export async function updateBlogCategory(
  id: number,
  data: Partial<Omit<BlogCategory, 'id' | 'created_at'>>
): Promise<BlogCategory> {
  const response = await fetch(`${BASE_URL}/blog-categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update blog category: ${response.statusText}`);
  }

  return response.json();
}
