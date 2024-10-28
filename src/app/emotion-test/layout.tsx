import Script from 'next/script';
import React from 'react';

const EmotionTestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="lazyOnload" />
      <div>{children}</div>
    </>
  );
};

export default EmotionTestLayout;
