import { NextResponse } from "next/server";

const API_KEY = process.env.NEWS_API_KEY
const API_URL = `https://newsapi.org/v2/everything`

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || 'finance'

  try {
    const res = await fetch(`${API_URL}?q=${query}&apiKey=${API_KEY}`)
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch news')
    }

    return NextResponse.json(data.articles)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}