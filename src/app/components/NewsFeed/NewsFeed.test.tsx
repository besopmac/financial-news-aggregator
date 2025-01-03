import { render, screen, waitFor } from '@testing-library/react'
import NewsFeed from '@/app/components/NewsFeed'

// Mock the fetch function
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('NewsFeed', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockFetch.mockClear();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders the news feed correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        { id: 1, title: 'Test News 1', description: 'Description 1', source: { name: 'Source 1' }, url: 'https://test1.com' },
        { id: 2, title: 'Test News 2', description: 'Description 2', source: { name: 'Source 2' }, url: 'https://test2.com' },
      ]),
    })

    render(<NewsFeed />)

    expect(screen.getByText('Loading news...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Test News 1')).toBeInTheDocument()
      expect(screen.getByText('Test News 2')).toBeInTheDocument()
    })

    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
    expect(screen.getByText((content, element) => content.includes('Source 1'))).toBeInTheDocument()
    expect(screen.getByText((content, element) => content.includes('Source 2'))).toBeInTheDocument()
  })

  it('handles fetch error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API error'))

    render(<NewsFeed />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load news. Please try again later.')).toBeInTheDocument()
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching news:', expect.any(Error))
  })
})

