import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { NewMemoryForm } from '@/components/NewMemoryForm'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 text-sm leading-relaxed text-gray-200 transition-colors hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />
    </div>
  )
}
