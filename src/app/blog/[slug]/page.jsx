'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const Page = ({ params }) => {
  const { slug } = params;
  const pagesDataApi = useContext(SectorDataContext);
  const mainData = pagesDataApi?.postDataApi;
  console.log('mainData', mainData)
  const post = mainData?.find((blog) => blog.slug === slug);
  const post_img = post?.acf?.post_image

  return (
    <div className='page-main-outer'>
      <div className='container'>
        <div className='single-post'>
          <div className='single-post-inner'>
            <div className='heading-seaction'>
              <h1>{post?.title?.rendered}</h1>
            </div>
            <div className='blog-img'>
              <Image src={post_img}
                alt='img'
                layout="responsive"
                width={100}
                height={50}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className='blog-content'>
              <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
