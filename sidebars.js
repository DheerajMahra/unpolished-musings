const path = require("path");
const fs = require("fs");

const INCLUDE_FILES = ["md", "mdx"];

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  digitalGardenSidebar: [
    'welcome',
    {
      type: 'category',
      label: 'Software Engineering',
      link: {
        type: 'generated-index',
        title: 'Software Engineering',
        description: 'Learn about the most important Software Engineering concepts!',
        slug: '/category/software-engineering',
        keywords: ['software-engineering']
      },
      items: [
        getItems('software-engineering'),
        {
          type: 'category',
          label: 'JavaScript',
          items: [getItems('software-engineering/javascript')],
        },
      ],
    },
    {
      type: 'category',
      label: 'Science',
      link: {
        type: 'generated-index',
        title: 'Science',
        description: 'Learn about the most important Science concepts!',
        slug: '/category/science',
        keywords: ['science']
      },
      items: [
        getItems('science'),
        {
          type: 'category',
          label: 'Chemistry',
          items: [getItems('science/chemistry')],
        },
      ],
    },
    {
      type: 'category',
      label: 'Astronomy',
      link: {
        type: 'generated-index',
        title: 'Astronomy',
        description: 'Learn about the most important Astronomy concepts!',
        slug: '/category/astronomy',
        keywords: ['astronomy']
      },
      items: [getItems('astronomy')],
    },
  ],
};

function getItems(category) {
  const items = [];
  const categoryPath = `./docs/${category}`;

  fs.readdirSync(categoryPath).forEach(file => {
    const absoluteCategoryPath = path.join(categoryPath, file);

    if (fs.statSync(absoluteCategoryPath).isDirectory()) {
      return getItems(absoluteCategoryPath.replace("docs/", ""));
    }

    if(INCLUDE_FILES.includes(absoluteCategoryPath.split('.').pop())) {
      return items.push(absoluteCategoryPath.replace("docs/", "").split(".")[0]);
    }
  });
  return items;
}

module.exports = sidebars;
