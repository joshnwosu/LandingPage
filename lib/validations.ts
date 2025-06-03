import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  body: z.string().min(1, 'Body is required'),
  blogCategoryId: z.number().min(1, 'Blog category is required'),
  created_by: z.string().min(1, 'Created by is required'),
  created_by_position: z.string().min(1, 'Position is required'),
  created_by_profile_image: z.string().url('Must be a valid URL'),
  team: z.string().min(1, 'Team is required'),
  image_url: z.string().url('Must be a valid URL'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type BlogFormData = z.infer<typeof blogSchema>;
