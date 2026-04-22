import { useState } from 'react'
import { Plus, ImageOff } from 'lucide-react'
import Button from '../../atoms/Button'
import Badge from '../../atoms/Badge'
import Spinner from '../../atoms/Spinner'
import ContentFormModal from '../../molecules/ContentFormModal'
import { useConfirm } from '../../hooks/useConfirm'
import { useAdminContent, useCreateContent, useUpdateContent, useDeleteContent } from '../../hooks/useContent'
import type { ContentItem } from '../../types/content.types'

const TYPE_LABELS: Record<ContentItem['type'], string> = {
  event:        'Event',
  deity_image:  'Deity Image',
  announcement: 'Announcement',
}

const TYPE_COLORS: Record<ContentItem['type'], string> = {
  event:        'bg-saffron-50 text-saffron-dark',
  deity_image:  'bg-gold-100 text-gold-dark',
  announcement: 'bg-maroon-50 text-maroon',
}

export default function ContentManagement() {
  const [modalItem, setModalItem] = useState<ContentItem | null | undefined>(undefined)
  const { data: items, isLoading } = useAdminContent()
  const { confirm } = useConfirm()
  const createMut = useCreateContent()
  const updateMut = useUpdateContent()
  const deleteMut = useDeleteContent()

  const openAdd   = () => setModalItem(null)
  const openEdit  = (item: ContentItem) => setModalItem(item)
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
      message: `Deactivate "${item.title}"? It will be hidden from the public site.`,
      onConfirm: () => deleteMut.mutate(item._id),
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="page-fade">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-devotional text-maroon font-semibold">Content Management</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage events, deity images, and announcements</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAdd}>
          <Plus size={15} /> Add Content
        </Button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-gold-100 shadow-temple overflow-hidden">
        {!items?.length ? (
          <div className="py-20 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-parchment flex items-center justify-center">
              <ImageOff size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">No content yet.</p>
            <button onClick={openAdd} className="text-saffron text-sm font-medium hover:underline">
              Add your first item →
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-parchment border-b border-gold-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-maroon/60 uppercase tracking-wider font-devotional">
                  Title
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-maroon/60 uppercase tracking-wider font-devotional">
                  Type
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-maroon/60 uppercase tracking-wider font-devotional">
                  Status
                </th>
                <th className="px-5 py-3.5 w-36" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-100/60">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-saffron-50/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-ink max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[item.type]}`}>
                      {TYPE_LABELS[item.type]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge
                      status={item.isActive ? 'active' : 'inactive'}
                      label={item.isActive ? 'Active' : 'Inactive'}
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                        Edit
                      </Button>
                      {item.isActive && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeactivate(item)}
                          disabled={deleteMut.isPending}
                        >
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
