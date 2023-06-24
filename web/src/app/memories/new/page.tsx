import { ChevronLeft, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

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

      <form className="flex flex-1 flex-col gap-1 text-gray-200">
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm leading-relaxed transition-colors hover:text-gray-100"
          >
            <ImageIcon className="h-4 w-4" />
            Anexar mídia
            <input type="file" id="media" className="sr-only" />
          </label>

          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm leading-relaxed transition-colors hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value="true"
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>

        <textarea
          name="content"
          spellCheck={false}
          className="flex-1 resize-none border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        ></textarea>
      </form>
    </div>
  )
}
