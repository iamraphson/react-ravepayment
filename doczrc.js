export default {
  title: 'React RavePay Payment Library',
  files: '**/*.{md,mdx}',
  src: 'docs',
  dest: 'site',
  ignore: ['LICENSE.md'],
  typescript: true,
  htmlContext: {
    favicon: '/public/ram.png',
  },
  themeConfig: {
    mode: 'light',
  },
  menu: [
    {name: 'Introduction'},
    {name: 'Usage', menu: ['Hooks', 'Functional Component', 'Context', 'Class Component']},
    {name: 'API Reference'},
  ],
};
