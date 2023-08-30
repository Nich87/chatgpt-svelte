import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { markdown } from 'svelte-preprocess-markdown';

import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNetlify from '@sveltejs/adapter-netlify';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true
    }),
    markdown()
  ],
  kit: {
    adapter: getAdapter({
      runtime: 'nodejs18.x'
    }),
    csp: { mode: 'auto' }
  }
};

function getAdapter() {
  if (Object.keys(process.env).some((key) => key.includes('VERCEL'))) {
    return adapterVercel();
  } else if (Object.keys(process.env).some((key) => key.includes('NETLIFY'))) {
    return adapterNetlify();
  } else if (Object.keys(process.env).some((key) => key.includes('CF_PAGES'))) {
    return adapterCloudflare();
  } else {
    return process.env.ADAPTER === 'node'
      ? adapterNode({ out: 'build' })
      : adapterStatic({
          pages: 'build',
          assets: 'build',
          fallback: null
        });
  }
}

export default config;
