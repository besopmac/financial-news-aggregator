"use client"

import { useEffect, useState } from "react";
import NewsItem from "../NewsItem";

interface Articles {
  url: string;
  title: string;
  description: string;
  source: {
    name: string;
  };
}

export default function NewsFeed() {
  const [articles, setArticles] = useState<Articles[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/news?q=bitcoin')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('Error fetching news:', error)
        setError('Failed to load news. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (isLoading) {
    return <div className="text-center py-4">Loading news...</div>
  }

  if (error) {
    return <div className="text-center py-4">Failed to load news. Please try again later.</div>
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <NewsItem
          key={index}
          title={article.title}
          description={article.description}
          source={article.source.name}
          url={article.url}
        />
      ))}
    </div>
  )
}