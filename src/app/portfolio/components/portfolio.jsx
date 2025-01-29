'use client'
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectorDataContext } from '@/context/apiContext';

const Portfolio = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi.pagesDataApi?.find(page => page.slug === 'portfolio')?.acf;

    return (
        <div className='container'>
            <div className='portfolio'>
                <div className='portfolio-inner'>
                    <div className='page-title'>
                        <h1>{mainData?.page_heading}</h1>
                    </div>
                    <div className='cards'>
                        {mainData && (
                            mainData.portfolio?.map((card, index) => (
                                <div key={index} className="portfolio-card">
                                    <Link href={card.link} target='blank'>
                                        <div className='project-image'>
                                            <Image src={card.image}
                                                alt={card.project_name}
                                                className=''
                                                layout="responsive"
                                                width={100}
                                                height={100}
                                            />
                                            <div className='overlay'>
                                                <p>{card.description}</p>
                                            </div>
                                        </div>
                                        <div className='card-small-headings'>
                                            <h3 className='project-title'>{card.project_name} ({card.year})</h3>
                                            {card.technology && card.technology.length > 0 && (
                                                <h3 className='technologys'>
                                                    {card.technology.map((technology, techIndex) => (
                                                        <span key={techIndex}>
                                                            {technology.name}{techIndex < card.technology.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}
                                                </h3>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Portfolio;
