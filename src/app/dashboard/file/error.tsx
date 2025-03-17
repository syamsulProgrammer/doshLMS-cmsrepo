'use client' // Error components must be Client Components
 
import Header from '@/components/header'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

    const router = useRouter()
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='h-full flex flex-col'>
        <Header pageTitle="File Management" />
        <div className='p-3 grow'>
            <div className='h-full bg-white rounded-lg p-3 flex items-center justify-center'>
                <div className='flex flex-col'>
                    <h2>Something went wrong!</h2>
                    <button
                        onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => router.back()
                        }
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}