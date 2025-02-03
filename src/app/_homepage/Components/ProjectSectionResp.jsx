'use client';
import { useContext, useState } from 'react';
import { SectorDataContext } from '@/context/apiContext';
import './project.css';

const ProjectSectionResp = () => {
    const pagesDataApi = useContext(SectorDataContext);
    const mainData = pagesDataApi?.pagesDataApi?.find(page => page.slug === 'home')?.acf?.projects_section;


    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='container' id='resp_proj_container'>
            <div className="proj_heading">
                <h2>{mainData?.heading}</h2>
            </div>

            <div className="resp_proj_view">
                <div className="proj_left_section resp_view_proj">
                    {mainData?.projects.map((project, index) => (
                        <div
                            key={index}
                            className={`proj_images ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={project.image} alt={project.name} />
                        </div>
                    ))}
                </div>

                <div className="proj_right_section resp_view_proj">
                    <div className='proj_section'>
                        {mainData?.projects?.length > 0 && (
                            <div className="prog_content active">
                                <div className="r_l_section">

                                    <h4>{mainData.projects[activeIndex]?.name}</h4>
                                     
                                    <p>{mainData.projects[activeIndex]?.description}</p>
                                </div>
                              
                                <div className="r_r_section">
                                <img src={mainData.projects[activeIndex]?.image} alt='image'/> 
                                </div>
                            </div>


                        )}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default ProjectSectionResp;

