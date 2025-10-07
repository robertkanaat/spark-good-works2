import { useState, useEffect } from 'react';

interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  author: number;
  categories: number[];
  tags: number[];
  featured_media: number;
  link: string;
  slug: string;
  _embedded?: {
    author?: Array<{
      name: string;
      avatar_urls: { [key: string]: string };
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details: {
        sizes: {
          [key: string]: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

interface TransformedPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  slug: string;
  link: string;
}

interface UseWordPressPostsReturn {
  posts: TransformedPost[];
  loading: boolean;
  error: string | null;
  featuredPost: TransformedPost | null;
  categories: string[];
  totalPages: number;
  currentPage: number;
  fetchPage: (page: number) => Promise<void>;
  totalPostsCount: number;
}

const WORDPRESS_API_URL = 'https://geniusrecovery.wpenginepowered.com/wp-json/wp/v2/posts';

// Function to strip HTML tags and get plain text
const stripHtml = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

// Function to estimate read time
const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = stripHtml(content).split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to get category name
const getCategoryName = (post: WordPressPost): string => {
  if (post._embedded?.['wp:term']?.[0]) {
    // Get the first category that isn't "Uncategorized"
    const categories = post._embedded['wp:term'][0];
    for (const category of categories) {
      if (category.taxonomy === 'category' && category.name !== 'Uncategorized') {
        return category.name;
      }
    }
  }
  return 'Blog';
};

// Function to get author name
const getAuthorName = (post: WordPressPost): string => {
  if (post._embedded?.author?.[0]) {
    return post._embedded.author[0].name;
  }
  return 'Genius Recovery';
};

// Function to get featured image
const getFeaturedImage = (post: WordPressPost): string => {
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    const media = post._embedded['wp:featuredmedia'][0];
    // Try to get a medium-large size, fall back to full size
    const sizes = media.media_details?.sizes;
    if (sizes?.medium_large) {
      return sizes.medium_large.source_url;
    }
    if (sizes?.large) {
      return sizes.large.source_url;
    }
    return media.source_url;
  }
  // Fallback image
  return 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&auto=format';
};

export const useWordPressPosts = (): UseWordPressPostsReturn => {
  const [posts, setPosts] = useState<TransformedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<TransformedPost[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Function to fetch posts from all categories to ensure we have representative content
  const fetchPostsFromAllCategories = async () => {
    try {
      // Fetch a larger sample from multiple pages to get posts from different categories
      const promises = [];
      for (let page = 1; page <= 3; page++) {
        promises.push(
          fetch(`${WORDPRESS_API_URL}?_embed&per_page=20&page=${page}&orderby=date&order=desc`, {
            headers: { 'Accept': 'application/json' },
          })
        );
      }

      const responses = await Promise.all(promises);
      const allWordPressPosts: WordPressPost[] = [];

      for (const response of responses) {
        if (response.ok) {
          const posts = await response.json();
          allWordPressPosts.push(...posts);
        }
      }

      const transformedPosts: TransformedPost[] = allWordPressPosts.map((post) => ({
        id: post.id,
        title: stripHtml(post.title.rendered),
        excerpt: stripHtml(post.excerpt.rendered).replace(/READ IT TO ME:.*?Click play to listen to this post\./gi, '').trim(),
        content: post.content.rendered,
        category: getCategoryName(post),
        author: getAuthorName(post),
        date: formatDate(post.date),
        readTime: calculateReadTime(post.content.rendered),
        image: getFeaturedImage(post),
        featured: false,
        slug: post.slug,
        link: post.link,
      }));

      setAllPosts(transformedPosts);
    } catch (err) {
      console.error('Error fetching posts from all categories:', err);
    }
  };


  const fetchPage = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch posts with embedded data for authors, featured media, and categories
      const response = await fetch(
        `${WORDPRESS_API_URL}?_embed&per_page=9&page=${page}&orderby=date&order=desc`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const wordpressPosts: WordPressPost[] = await response.json();
      
      // Get total pages from response headers
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      if (totalPagesHeader) {
        setTotalPages(parseInt(totalPagesHeader));
      }

      // Transform WordPress posts to match our interface
      const transformedPosts: TransformedPost[] = wordpressPosts.map((post, index) => ({
        id: post.id,
        title: stripHtml(post.title.rendered),
        excerpt: stripHtml(post.excerpt.rendered).replace(/READ IT TO ME:.*?Click play to listen to this post\./gi, '').trim(),
        content: post.content.rendered,
        category: getCategoryName(post),
        author: getAuthorName(post),
        date: formatDate(post.date),
        readTime: calculateReadTime(post.content.rendered),
        image: getFeaturedImage(post),
        featured: page === 1 && index === 0, // Make the first post of first page featured
        slug: post.slug,
        link: post.link,
      }));

      setPosts(transformedPosts);
      setCurrentPage(page);
      
      // Keep track of all posts for categories
      if (page === 1) {
        setAllPosts(transformedPosts);
      } else {
        setAllPosts(prev => [...prev, ...transformedPosts]);
      }
    } catch (err) {
      console.error('Error fetching WordPress posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsFromAllCategories(); // Fetch posts from multiple pages/categories
    fetchPage(1);
  }, []);

  // Use categories extracted from all fetched posts
  const categories = ['All', ...Array.from(new Set(allPosts.map(post => post.category))).filter(category => category !== 'General' && category !== 'Uncategorized')];
  
  // Get featured post
  const featuredPost = posts.find(post => post.featured) || null;

  return {
    posts,
    loading,
    error,
    featuredPost,
    categories,
    totalPages,
    currentPage,
    fetchPage,
    totalPostsCount: allPosts.length,
  };
};