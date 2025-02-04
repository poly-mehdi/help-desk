import { useTranslations } from 'next-intl';

function ThankYouPage() {
  const t = useTranslations();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-5xl mb-4'>{t('thank-you.title')}</h1>
      <p className='text-xl'>{t('thank-you.message')}</p>
    </div>
  );
}
export default ThankYouPage;
