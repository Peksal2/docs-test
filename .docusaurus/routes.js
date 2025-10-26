import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/lt/blog',
    component: ComponentCreator('/lt/blog', '805'),
    exact: true
  },
  {
    path: '/lt/blog/archive',
    component: ComponentCreator('/lt/blog/archive', '906'),
    exact: true
  },
  {
    path: '/lt/blog/authors',
    component: ComponentCreator('/lt/blog/authors', 'a9c'),
    exact: true
  },
  {
    path: '/lt/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/lt/blog/authors/all-sebastien-lorber-articles', 'cda'),
    exact: true
  },
  {
    path: '/lt/blog/authors/yangshun',
    component: ComponentCreator('/lt/blog/authors/yangshun', 'c08'),
    exact: true
  },
  {
    path: '/lt/blog/first-blog-post',
    component: ComponentCreator('/lt/blog/first-blog-post', 'e79'),
    exact: true
  },
  {
    path: '/lt/blog/long-blog-post',
    component: ComponentCreator('/lt/blog/long-blog-post', 'dac'),
    exact: true
  },
  {
    path: '/lt/blog/mdx-blog-post',
    component: ComponentCreator('/lt/blog/mdx-blog-post', 'aa5'),
    exact: true
  },
  {
    path: '/lt/blog/tags',
    component: ComponentCreator('/lt/blog/tags', 'fae'),
    exact: true
  },
  {
    path: '/lt/blog/tags/docusaurus',
    component: ComponentCreator('/lt/blog/tags/docusaurus', '2c8'),
    exact: true
  },
  {
    path: '/lt/blog/tags/facebook',
    component: ComponentCreator('/lt/blog/tags/facebook', 'ee6'),
    exact: true
  },
  {
    path: '/lt/blog/tags/hello',
    component: ComponentCreator('/lt/blog/tags/hello', '092'),
    exact: true
  },
  {
    path: '/lt/blog/tags/hola',
    component: ComponentCreator('/lt/blog/tags/hola', '3b5'),
    exact: true
  },
  {
    path: '/lt/blog/welcome',
    component: ComponentCreator('/lt/blog/welcome', 'd9e'),
    exact: true
  },
  {
    path: '/lt/markdown-page',
    component: ComponentCreator('/lt/markdown-page', '800'),
    exact: true
  },
  {
    path: '/lt/docs',
    component: ComponentCreator('/lt/docs', '5b3'),
    routes: [
      {
        path: '/lt/docs',
        component: ComponentCreator('/lt/docs', '7f9'),
        routes: [
          {
            path: '/lt/docs',
            component: ComponentCreator('/lt/docs', 'a28'),
            routes: [
              {
                path: '/lt/docs/3pl/scales-not-working',
                component: ComponentCreator('/lt/docs/3pl/scales-not-working', '517'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/category/tutorial---basics',
                component: ComponentCreator('/lt/docs/category/tutorial---basics', '46f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/category/tutorial---extras',
                component: ComponentCreator('/lt/docs/category/tutorial---extras', 'ce4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/intro',
                component: ComponentCreator('/lt/docs/intro', 'cae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/lt/docs/tutorial-basics/congratulations', 'a08'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/lt/docs/tutorial-basics/create-a-blog-post', '4d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/lt/docs/tutorial-basics/create-a-document', 'b06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/lt/docs/tutorial-basics/create-a-page', '945'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/lt/docs/tutorial-basics/deploy-your-site', 'cae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/lt/docs/tutorial-basics/markdown-features', '72c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/lt/docs/tutorial-extras/manage-docs-versions', '937'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/lt/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/lt/docs/tutorial-extras/translate-your-site', '204'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/lt/',
    component: ComponentCreator('/lt/', '480'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
