import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AboutImg from '../public/assets/about.jpg';

const About = () => {
  return (
    <div id='about' className='w-full md:h-screen p-2 flex items-center py-16'>
      <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8'>
        <div className='col-span-2'>
          <p className='uppercase text-xl tracking-widest text-[#5651e5]'>
            About
          </p>
          <h2 className='py-4'>Who I Am</h2>
          <p className='py-2 text-gray-600'>
            I&#39;m a full stack developer with a passion for creating innovative solutions. I understand the complexities of developing applications, from the back-end to the front-end. My experience includes working on various technologies, such as JavaScript, Node.js, React.js, Angular, Nextjs, and HTML/CSS. I&#39;m also skilled in docker, server configuration, databases, and problem solving. I strive to always stay up-to-date with the latest trends and technologies. In my free time, I&#39;m passionate about coding projects and tinkering with new programming languages. I believe that being a great developer is not using one
              specific language, but choosing the best tool for the job.
          </p>
          <p className='py-2 text-gray-600'>
            I started web developement in 2019 managing multiple e-commerce
            websites on Angular and React Framework. I have experience working directly with clients and taking
            mock wireframes all the way to deployed applications. Also I have worked with Web3 technologies like metamask, solidity and ipfs system.
          </p>
          <Link href='/#projects'>
            <p className='py-2 text-gray-600 underline cursor-pointer'>
              Check out some of my latest projects.
            </p>
          </Link>
        </div>
        <div className='w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300'>
          <Image src={AboutImg} className='rounded-xl' alt='/' />
        </div>
      </div>
    </div>
  );
};

export default About;
