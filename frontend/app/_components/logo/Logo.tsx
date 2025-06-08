import Image from 'next/image'

export default function Logo({ width = 500, height = 500 }: { width?: number; height?: number }) {
  return (
    <Image
      src="/logo.png"
      width={width}
      height={height}
      alt="logo"
      priority
    />
  )
}