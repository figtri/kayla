import type { CollectionConfig } from 'payload'

const LandingPage: CollectionConfig = {
  slug: 'landing-sections',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'Featured Interviews', value: 'featured' },
        { label: 'About Section', value: 'about' },
        { label: 'Call to Action', value: 'cta' },
        { label: 'Testimonials Section', value: 'testimonials' },
        { label: 'Articles Section', value: 'articles' },
        { label: 'Spotify Section', value: 'spotify' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        condition: (data) => !
          ['testimonials', 'featured', 'articles', 'spotify'].includes(data.type),
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => ['hero', 'cta', 'about'].includes(data.type),
      }
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Order of appearance on the landing page',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      admin: {
        condition: (data) => data.type === 'testimonials',
      },
      labels: {
        singular: 'Testimonial',
        plural: 'Testimonials',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The testimonial text',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'The name of the person giving the testimonial',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'The title or position of the person',
          },
        },
        {
          name: 'initials',
          type: 'text',
          required: true,
          maxLength: 3,
          admin: {
            description: 'Initials to display if no image is available (2-3 characters)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Profile image for the testimonial (optional)',
          },
        },
      ],
    },
    {
      name: 'featuredPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: (data) => data.type === 'featured',
        description: 'Select posts to feature in this section',
      },
    },
    {
      name: 'articles',
      type: 'array',
      admin: {
        condition: (data) => data.type === 'articles',
      },
      labels: {
        singular: 'Article',
        plural: 'Articles',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'imageUrl',
          type: 'text',
          admin: {
            description: 'URL to the article image',
          },
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            description: 'URL slug for the article',
          },
        },
        {
          name: 'category',
          type: 'text',
        },
      ],
    },
    {
      name: 'spotifyUrls',
      type: 'array',
      admin: {
        condition: (data) => data.type === 'spotify',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Spotify URL (will be converted to embed format)',
          },
        },
      ],
    },
  ],
}

export default LandingPage
