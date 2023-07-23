import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { api } from '@/lib/api'

interface MemoryProps {
  params: {
    id: string
  }
}

interface IMemory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default async function Memory({ params: { id } }: MemoryProps) {
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory: IMemory = response.data

  return (
    <div className="flex flex-col gap-10 p-16">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 text-sm leading-relaxed text-gray-200 transition-colors hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <div className="space-y-4">
        <time className="-ml-16 flex items-center gap-2 text-sm leading-relaxed before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
        </time>

        <Image
          src={memory.coverUrl}
          alt=""
          width={592}
          height={280}
          className="h-[280px] w-[592px] rounded-lg object-cover"
        />

        <p className="text-lg leading-relaxed">{memory.content}</p>
      </div>
    </div>
  )
}
