import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../atoms/Button'
import Badge from '../../atoms/Badge'
import Spinner from '../../atoms/Spinner'
import ContentFormModal from '../../molecules/ContentFormModal'
import { useConfirm } from '../../hooks/useConfirm'
import { useAdminContent, useCreateContent, useUpdateContent, useDeleteContent } from '../../hooks/useContent'
import type { ContentItem } from '../../types/content.types'

const TYPE_LABELS: Record<ContentItem['type'], string> = {
  event: 'Event',
  deity_image: 'Deity Image',
  announcement: 'Announcement',
}

export default function ContentManagement() {
  const [modalItem, setModalItem] = useState<ContentItem | null | undefined>(undefined)
  const { data: items, isLoading } = useAdminContent()
  const { confirm } = useConfirm()
  const createMut = useCreateContent()
  const updateMut = useUpdateContent()
  const deleteMut = useDeleteContent()

  const openAdd = () => setModalItem(null)
  const openEdit = (item: ContentItem) => setModalItem(item)
  const closeModal = () => setModalItem(undefined)

  const handleSubmit = (fd: FormData) => {
    if (modalItem) {
      updateMut.mutate({ id: modalItem._id, data: fd }, { onSuccess: closeModal })
    } else {
      createMut.mutate(fd, { onSuccess: closeModal })
    }
  }

  const handleDeactivate = (item: ContentItem) => {
    confirm({
      title: 'Deactivate Content',
      message: `Are you sure you want to deactivate "${item.title}"? It will be hidden from the public.`,
      onConfirm: () => deleteMut.mutate(item._id),
    })
  }

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-devotional text-maroon">Content Management</h1>
        <Button variant="primary" size="sm" onClick={openAdd}>
          <Plus size={16} /> Add Content
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {!items?.length ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            No content yet. Click "Add Content" to create your first item.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-cream border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-cream/40 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-800">{item.title}</td>
                  <td className="px-5 py-3 text-gray-500">{TYPE_LABELS[item.type]}</td>
                  <td className="px-5 py-3">
                    <Badge
                      status={item.isActive ? 'active' : 'inactive'}
                      label={item.isActive ? 'Active' : 'Inactive'}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>Edit</Button>
                      {item.isActive && (
                        <Button variant="danger" size="sm" onClick={() => handleDeactivate(item)}>
                          Deactivate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalItem !== undefined && (
        <ContentFormModal
          item={modalItem}
          onClose={closeModal}
          onSubmit={handleSubmit}
          loading={createMut.isPending || updateMut.isPending}
        />
      )}
    </div>
  )
}
