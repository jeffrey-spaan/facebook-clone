import Image from 'next/image'

export default function Icon({ width = 500, height = 500 }: { width?: number; height?: number }) {
  return (
      <Image
        src="/icon.png"
        width={width}
        height={height}
        alt="icon"
        priority
      />
    )
}