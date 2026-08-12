import { EditWebsiteFrame } from './EditWebsiteFrame'

export default function EditWebsitePage() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Edit Website</h1>
        <p className="text-sm text-neutral-500">
          Click any highlighted text or photo below to edit it. Changes save straight to the live site.
        </p>
      </div>
      <EditWebsiteFrame />
    </div>
  )
}
