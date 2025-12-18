import Layout from "./layout/Layout";
import { testimonials } from "../data/product";
import { Star } from "lucide-react";

const SuccessStories = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="py-16 bg-muted/30 text-center">
                <h1 className="text-5xl font-bold">Success Stories</h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                    Real experiences and transformative journeys from our valued customers.
                </p>
            </section>

            {/* Stories Grid */}
            <section className="container mx-auto py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((story) => (
                    <div
                        key={story.id}
                        className="bg-white border rounded-2xl p-6 shadow-md"
                    >
                        {/* Rating */}
                        <div className="flex gap-1 mb-4 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < story.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="text-md text-gray-700 leading-relaxed mb-6">
                            “{story.content}”
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <img
                                src={story.image}
                                alt={story.author}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">{story.author}</h3>
                                <p className="text-sm text-muted-foreground">{story.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-primary text-center text-white">
                <h2 className="text-3xl font-semibold mb-4">Share Your Story</h2>
                <p className="mb-6 text-lg">
                    Have you had an amazing experience with our brand? Tell us your story!
                </p>
                <button className="btn btn-accent px-6 py-2 rounded-full">
                    Share Your Story
                </button>
            </section>
        </Layout>
    );
};

export default SuccessStories;
