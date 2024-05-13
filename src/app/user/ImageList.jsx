import Link from 'next/link'

export default function ImageList({ images }) {
    return (
      <ul>
        {images.map((image) => (
          <li key={post.id}>
            <Link href={`/user/${image.slug}`}>{image.title}</Link>
          </li>
        ))}
      </ul>
    )
  }