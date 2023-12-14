import { describe, expect, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { $fetch, setup } from '@nuxt/test-utils'

const { resolve } = createResolver(import.meta.url)

// would normally not be indexable
process.env.NODE_ENV = 'staging'
await setup({
  rootDir: resolve('./fixtures/basic'),
  nuxtConfig: {
    site: {
      indexable: true,
      url: 'https://nuxt-simple-robots.com',
    },
    robots: {
      sitemap: [
        '/sitemap.xml',
      ],
    },
  },
})

describe('siteConfig', () => {
  it('basic', async () => {
    const robotsTxt = await $fetch('/robots.txt')
    // site.indexable should be honoured
    expect(robotsTxt.includes('(indexable)')).toBe(true)
  })
})
