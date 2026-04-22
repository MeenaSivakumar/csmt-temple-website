import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../constants/routes'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof schema>

export default function Login() {
  const { login, loading } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-5">
      <h2 className="text-2xl font-devotional text-maroon text-center">Sign In</h2>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" loading={loading} className="w-full mt-1">
        Sign In
      </Button>
      <p className="text-center text-sm text-gray-500">
        No account?{' '}
        <Link to={ROUTES.REGISTER} className="text-saffron hover:underline font-medium">
          Register
        </Link>
      </p>
    </form>
  )
}
