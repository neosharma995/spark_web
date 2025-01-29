'use client';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const MainBlogs = () => {
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.postDataApi;
  console.log('Data', mainData);

  return (

    <div className='container'>
    <div className='blogs'>
      <div className='page-heading'>
        <h1>Spark Web Solution Blogs</h1>
        <p>Access our extensive knowledge base to quench your thirst. Learn more about IT transformation and stay up to date. Our expert blogs are for you.</p>
      </div>
      <div className='blogs-inner'>
        {mainData?.map((blogs, index) => (
          <div key={index} className='blog'>
            <div className='blog-content'>

              <div className='blog-top-bar'>
                {/* Display categories */}
                <div className='categories'>
                  {blogs._embedded['wp:term'][0].map((category, catIndex) => (
                    <div className='category' key={catIndex}>{category.name}</div>
                  ))}

                </div>

                <Link href={`/blog/${blogs.slug}`}>Read More</Link>
              </div>

              <div className='blog-title'>
                <h2>{blogs.title.rendered}</h2>
              </div>
            </div>


            <div className='image-section'>

              {blogs._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <Image
                  className='post-featured-image'
                  src={blogs._embedded['wp:featuredmedia'][0].source_url}
                  alt={blogs.title.rendered}
                  layout="responsive"
                  width={100}
                  height={100}
                />
              )}
              <div className='overlay'></div>
            </div>

          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MainBlogs;
