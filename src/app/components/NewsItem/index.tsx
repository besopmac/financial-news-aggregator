interface NewsItemProps {
  title: string
  description: string
  source: string
  url: string
}

export default function NewsItem({ title, description, source, url }: NewsItemProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-500 text-sm">Source: {source}</p>
    </a>
  )
}