module.exports = {
  title: 'T-T',
  description: 'fengT-T的Github Page',
  dest: 'docs',
  base: '/Post/',
  themeConfig: {
    displayAllHeaders: true,
    sidebar: 'auto',
    nav: [
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'Other', link: '/Other/' },
      { text: 'CoCoMusic', link: '/CoCoMusic/index.html' },
    ]
  },
  plugins: [
    [ 
      '@vuepress/google-analytics',
      {
        'ga': 'UA-136247470-1'
      }
    ]  
  ],
  evergreen: true
}
