import React, { useState } from "react";
import  Layout  from "./layout/Layout";
import { Link } from "react-router-dom";
import { Search, Calendar, User } from "lucide-react";
import { cn } from "../lib/utils";

const blogCategories = ["All", "Our blog", "News", "Success Stories"];

const blogPosts = [
    {
        id: 1,
        title: "The Art of Sustainable Fashion",
        excerpt:
            "Discover how we're making fashion more sustainable without compromising on style or quality.",
        image:
            "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop",
        category: "Our blog",
        author: "Vulps Team",
        date: "Dec 10, 2025",
    },
    {
        id: 2,
        title: "Winter Collection 2025: What's New",
        excerpt:
            "Explore our latest winter collection featuring cozy hoodies and stylish oversized tees.",
        image:
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=400&fit=crop",
        category: "News",
        author: "Priya Sharma",
        date: "Dec 5, 2025",
    },
    {
        id: 3,
        title: "From Idea to Product: Custom Design Journey",
        excerpt:
            "Learn how our customers turn their creative ideas into beautiful custom apparel.",
        image:
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=400&fit=crop",
        category: "Success Stories",
        author: "Vinod Kumar",
        date: "Nov 28, 2025",
    },
];

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter((post) => {
        if (selectedCategory !== "All" && post.category !== selectedCategory) {
            return false;
        }
        if (
            searchQuery &&
            !post.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }
        return true;
    });

    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-16 md:py-24 text-center">
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fade-up">
                        Our Latest Posts
                    </h1>
                </div>
            </section>

            {/* Filters */}
            <section className="pb-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                        {/* Categories */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-muted-foreground mr-2">Blogs:</span>
                            {blogCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-3 py-1.5 text-sm transition-colors",
                                        selectedCategory === category
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full px-4 py-2.5 pr-10 rounded-full border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="pb-16 md:pb-24">
                <div className="container mx-auto">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="group animate-fade-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <Link to={`/blog/${post.id}`} className="block">
                                        <div className="aspect-[3/2] rounded-2xl overflow-hidden mb-4">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium">
                                                {post.category}
                                            </span>

                                            <h2 className="text-xl font-semibold group-hover:text-muted-foreground transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="text-muted-foreground line-clamp-2">
                                                {post.excerpt}
                                            </p>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {post.author}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {post.date}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold mb-4">
                                No blog post yet.
                            </h2>
                            <p className="text-muted-foreground">
                                Check back soon for new content!
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Blog;
