import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useDisableScroll = ({ condition }) => {
  const router = useRouter();
  useEffect(() => {
    const body = document.querySelector('body');
    if (condition) {
      document.documentElement.classList.add('disable-overflow');
      body.classList.add('disable-overflow');
    } else {
      document.documentElement.classList.remove('disable-overflow');
      body.classList.remove('disable-overflow');
    }
  }, [condition]);

  useEffect(() => {
    const body = document.querySelector('body');
    return () => {
      document.documentElement.classList.remove('disable-overflow');
      body.classList.remove('disable-overflow');
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    document.documentElement.classList.remove('disable-overflow');
    body.classList.remove('disable-overflow');
  }, [router]);
};

export default useDisableScroll;
