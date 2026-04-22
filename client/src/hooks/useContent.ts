import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getContent,
  getAdminContent,
  createContent,
  updateContent,
  deleteContent,
} from '../api/content.api'

export const CONTENT_QUERY_KEY = ['content'] as const
export const ADMIN_CONTENT_QUERY_KEY = ['admin-content'] as const

export const usePublicContent = () =>
  useQuery({
    queryKey: CONTENT_QUERY_KEY,
    queryFn: async () => (await getContent()).data.data,
  })

export const useAdminContent = () =>
  useQuery({
    queryKey: ADMIN_CONTENT_QUERY_KEY,
    queryFn: async () => (await getAdminContent()).data.data,
  })

const useInvalidateContent = () => {
  const qc = useQueryClient()
  return () => {
    qc.invalidateQueries({ queryKey: CONTENT_QUERY_KEY })
    qc.invalidateQueries({ queryKey: ADMIN_CONTENT_QUERY_KEY })
  }
}

export const useCreateContent = () => {
  const invalidate = useInvalidateContent()
  return useMutation({
    mutationFn: (data: FormData) => createContent(data),
    onSuccess: () => { toast.success('Content created'); invalidate() },
    onError: () => toast.error('Failed to create content'),
  })
}

export const useUpdateContent = () => {
  const invalidate = useInvalidateContent()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateContent(id, data),
    onSuccess: () => { toast.success('Content updated'); invalidate() },
    onError: () => toast.error('Failed to update content'),
  })
}

export const useDeleteContent = () => {
  const invalidate = useInvalidateContent()
  return useMutation({
    mutationFn: (id: string) => deleteContent(id),
    onSuccess: () => { toast.success('Content deactivated'); invalidate() },
    onError: () => toast.error('Failed to deactivate content'),
  })
}
