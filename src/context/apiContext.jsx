'use client';
import { createContext, useState, useEffect } from 'react';

// Create the context
export const SectorDataContext = createContext(undefined);

// Provider component
export const SectorDataProvider = ({ children }) => {
    const [pagesDataApi, setPagesDataApi] = useState([]);           // Data from Pages API
    const [testimonialsApi, setTestimonialsApi] = useState(null);   // Data from Testimonials API
    const [postDataApi, setPostDataApi] = useState(null);           // Data from Posts API
    const [headerDataApi, setHeaderDataApi] = useState(null);       // Data from Header API
    const [footerDataApi, setFooterDataApi] = useState(null);       // Data from Footer API

    const [loading, setLoading] = useState({
        pages: true,
        testimonials: true,
        posts: true,
        header: true,
        footer: true,
    });

    const [errors, setErrors] = useState({
        pages: null,
        testimonials: null,
        posts: null,
        header: null,
        footer: null,
    });

    // Consolidate API calls into one useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pagesResponse, testimonialsResponse, postsResponse, headerResponse, footerResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/pages?&fields=acf&acf_format=standard`),            //Pages API
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/testimonial?&fields=acf&acf_format=standard`),      //Testimonial API
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/posts?_embed&fields=acf&acf_format=standard`),      //Post API
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/header?&fields=acf&acf_format=standard`),           // Header API
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/footer?&fields=acf&acf_format=standard`),           // Footer API
                ]);

                // Check if responses are ok
                if (!pagesResponse.ok) throw new Error('Failed to fetch pages data');
                if (!testimonialsResponse.ok) throw new Error('Failed to fetch testimonials data');
                if (!postsResponse.ok) throw new Error('Failed to fetch posts data');
                if (!headerResponse.ok) throw new Error('Failed to fetch header data');
                if (!footerResponse.ok) throw new Error('Failed to fetch footer data');

                // Parse JSON data
                const [pagesData, testimonialsData, postsData, headerData, footerData] = await Promise.all([
                    pagesResponse.json(),
                    testimonialsResponse.json(),
                    postsResponse.json(),
                    headerResponse.json(),
                    footerResponse.json(),
                ]);

                // Set state with fetched data
                setPagesDataApi(pagesData);
                setTestimonialsApi(testimonialsData);
                setPostDataApi(postsData);
                setHeaderDataApi(headerData);
                setFooterDataApi(footerData);

                // Update loading state
                setLoading({ pages: false, testimonials: false, posts: false, header: false, footer: false });
            } catch (err) {
                // Handle errors
                setErrors({
                    pages: err.message.includes('pages') ? err.message : null,
                    testimonials: err.message.includes('testimonials') ? err.message : null,
                    posts: err.message.includes('posts') ? err.message : null,
                    header: err.message.includes('header') ? err.message : null,
                    footer: err.message.includes('footer') ? err.message : null,
                });

                // Update loading state
                setLoading({ pages: false, testimonials: false, posts: false, header: false, footer: false });
            }
        };

        fetchData();
    }, []);

    return (
        <SectorDataContext.Provider
            value={{
                pagesDataApi,
                testimonialsApi,
                postDataApi,
                headerDataApi,
                footerDataApi,
                loading,
                errors,
            }}
        >
            {children}
        </SectorDataContext.Provider>
    );
};
