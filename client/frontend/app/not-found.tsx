'use client';

import Error from 'next/error';

const NotFound = () => (
  <html lang='en'>
    <body>
      <Error statusCode={404} />
    </body>
  </html>
);

export default NotFound;
