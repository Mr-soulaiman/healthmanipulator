/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BLOG_POSTS } from './config/siteConfig';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderRoute = () => {
    if (currentPath === '/blog' || currentPath === '/blog/') {
      return <BlogPage onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace(/^\/blog\//, '').replace(/\/$/, '');
      const matchedPost = BLOG_POSTS.find((p) => p.slug === slug);
      if (matchedPost) {
        return <ArticleDetailPage post={matchedPost} onNavigate={handleNavigate} />;
      }
      return <BlogPage onNavigate={handleNavigate} />;
    }

    if (currentPath === '/about' || currentPath === '/about/') {
      return <AboutPage />;
    }

    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#F7F3EA] text-[#172033]">
      <Navbar currentPath={currentPath} onNavigate={handleNavigate} />
      <main className="flex-1">{renderRoute()}</main>
      <Footer />
    </div>
  );
}
