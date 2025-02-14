import { useTranslations } from 'next-intl';

function ThankYouPage() {
  const t = useTranslations();
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-4 bg-primary-foreground lg:p-10 rounded-3xl w-fit max-w-[400px] md:max-w-[650px] lg:max-w-[800px] md:p-8 p-6'>
        <h1 className='text-2xl mb-4 max-w-[800px] text-justify'>
          {t('thank-you.title')}
        </h1>
        <p className='text-xl'>{t('thank-you.message')}</p>
      </div>
    </div>
  );
}
export default ThankYouPage;

