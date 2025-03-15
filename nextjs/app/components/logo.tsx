import { Video } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="size-8 rounded-lg border-2 border-gray-900 flex items-center justify-center">
          <Video className="h-4 w-4 text-gray-900" />
        </div>
        <div className="absolute -bottom-1 -right-1 size-4 rounded-full bg-gray-900 flex items-center justify-center text-[8px] font-bold text-white">
          IA
        </div>
      </div>
      <span className="font-bold text-xl tracking-tight text-gray-900">
        Video-IA<span className="text-gray-600">.net</span>
      </span>
    </div>
  )
}

