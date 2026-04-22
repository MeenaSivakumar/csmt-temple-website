import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../constants/routes'

const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof schema>

export default function Register() {
  const { register: signup, loading } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = ({ name, email, password }: RegisterFormData) =>
    signup({ name, email, password })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-2xl font-devotional text-maroon text-center">Create Account</h2>
      <Input label="Full Name" placeholder="Your name" error={errors.name?.message} {...register('name')} />
      <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
      <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
      <Input label="Confirm Password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
      <Button type="submit" loading={loading} className="w-full mt-1">Create Account</Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-saffron hover:underline font-medium">Sign in</Link>
      </p>
    </form>
  )
}
