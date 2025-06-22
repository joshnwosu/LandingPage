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

// Waitlist interfaces
export interface WaitlistSubmissionData {
  name: string;
  email: string;
  phone_number?: string;
  country: string;
  company_name?: string;
  reg_channel?: string;
}

export interface WaitlistPayload {
  name: string;
  email: string;
  phone_number: string;
  country: string;
  country_code: string;
  company_name: string;
  reg_channel: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Blog API functions
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

export async function fetchBlogBySlug(slug: string): Promise<BlogResponse> {
  const response = await fetch(`${BASE_URL}/blogs/${slug}`);

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

// Waitlist API functions
export async function joinWaitlist(
  data: WaitlistSubmissionData,
  countryCode: string = 'NG'
): Promise<WaitlistResponse> {
  // Prepare payload with defaults
  const payload: WaitlistPayload = {
    name: data.name,
    email: data.email,
    phone_number: data.phone_number || '',
    country: data.country,
    country_code: countryCode,
    company_name: data.company_name || '',
    reg_channel: data.reg_channel || 'linkedin',
  };

  const response = await fetch(
    'https://api-production.billpass.app/api/join_talent_place_waitinglist',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to Join for Free. Please try again.');
  }

  return response.json();
}
