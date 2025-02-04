'use client';
import BaseLayout from '@/components/BaseLayout';
import NotFoundPage from '@/components/NotFoundPage';
import { routing } from '@/i18n/routing';

const GlobalNotFound = () => (
  <BaseLayout locale={routing.defaultLocale}>
    <NotFoundPage />
  </BaseLayout>
);

export default GlobalNotFound;

