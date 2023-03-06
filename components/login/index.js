import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '../../public/yobulk_logo.png';
import { BsGithub } from 'react-icons/bs';

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push('/');
  }

  return (
    <>
      <section className="h-screen w-full flex justify-center items-center bg-[#FAFAFA]">
        <div className='shadow-xl h-[500px] w-[500px]'>
          <div className="flex flex-col justify-center items-center m-10">
            <div className="h-1/2">
              <Image src={Logo} alt="" className="cursor-pointer" />
            </div>
            <div className='mt-40'>
              <button className='w-[400px] h-[50px] rounded-lg px-10 py-4 flex items-center justify-center bg-black text-white font-semibold hover:bg-gray-900'>
                <BsGithub /> <span className='px-4'>Sign in with Github</span>
              </button>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Login;
