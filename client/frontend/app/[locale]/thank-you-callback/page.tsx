import { useTranslations } from 'next-intl';

function ThankYouPage() {
  const t = useTranslations();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl mb-4 max-w-[800px] text-justify'>
        {t('thank-you-recall.title')}
      </h1>
      <p className='text-xl'>{t('thank-you.message')}</p>
    </div>
  );
}
export default ThankYouPage;

