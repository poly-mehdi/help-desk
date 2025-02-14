import { useTranslations } from 'next-intl';

function NotFoundPage() {
  const t = useTranslations();
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex items-center gap-4'>
        <span className='text-2xl'>404</span>
        <div className='h-12 bg-zinc-800 w-[1px]'></div>
        <h1 className='text-sm'>{t('not-found.message')}</h1>
      </div>
    </div>
  );
}
export default NotFoundPage;

