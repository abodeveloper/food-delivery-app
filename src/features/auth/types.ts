import { z } from 'zod';

export const signInSchema = z.object({
  //email: z.string().email('Yaroqli email kiriting'),
  username: z.string(),
  password: z.string().min(6, 'Parol kamida 6 belgidan iborat bo‘lishi kerak'),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(2, 'Ism kamida 2 belgidan iborat bo‘lishi kerak'),
    email: z.string().email('Yaroqli email kiriting'),
    password: z
      .string()
      .min(6, 'Parol kamida 6 belgidan iborat bo‘lishi kerak'),
    confirmPassword: z.string().min(6, 'Parol tasdiqlash kerak'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Parollar mos emas',
    path: ['confirmPassword'],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

export interface User {
  id: string;
  email: string;
  name?: string;
  fullName?: string;
}
