import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

export interface PostMeta {
  link: string;
  category: string;
  matter: {
    [key: string]: any;
  };
}

function getPosts(lang: string | null = null): PostMeta[] {
  // if null, get the default lang's posts
  let postsDir = path.join(process.cwd(), 'docs');
  if (lang != null) {
    postsDir = path.join(postsDir, lang, 'posts');
  } else {
    postsDir = path.join(postsDir, 'posts');
  }
  let files = fs.readdirSync(postsDir);
  let posts = files.filter((file) => {
    return fs.statSync(path.join(postsDir, file)).isFile();
  })
  //NOTE: dir is category
  let dirs = files.filter((file) => {
    return fs.statSync(path.join(postsDir, file)).isDirectory();
  })
  let res = posts.map((post) => {
    return {
      category: 'root',
      link: post.replace(/\.md$/, ''),
      matter: matter(fs.readFileSync(path.join(postsDir, post), 'utf8')).data,
    }
  });
  for (const dir of dirs) {
    let dirPath = path.join(postsDir, dir);
    let posts = fs.readdirSync(dirPath);
    res = res.concat(posts.map((post) => {
      return {
        category: dir,
        link: dir + '/' + post.replace(/\.md$/, ''),
        matter: matter(fs.readFileSync(path.join(dirPath, post), 'utf8')).data,
      }
    }));
  }
  return res;
}

type PostsData = {
  postmeta: { [key: string]: PostMeta[] };
  tags: { [key: string]: [string, number][] };
  categories: { [key: string]: [string, number][] };
}

export function getAllPosts(
  langs: string[],
  defaultLang: string
): PostsData {
  const posts: { [key: string]: PostMeta[] } = {};
  for (const lang of langs) {
    posts[lang] = getPosts(lang);
  }
  posts[defaultLang] = getPosts();

  let tags: { [key: string]: [string, number][] } = {};
  let categories: { [key: string]: [string, number][] } = {};

  for (const lang of langs) {
    tags[lang] = [];
    categories[lang] = [];
  }

  tags[defaultLang] = [];
  categories[defaultLang] = [];

  for (const lang of langs) {
    for (const post of posts[lang]) {
      if (post.matter.tags) {
        for (const tag of post.matter.tags) {
          let flag = false;
          for (const t of tags[lang]) {
            if (t[0] === tag) {
              t[1] += 1;
              flag = true;
              break;
            }
          }
          if (!flag) {
            tags[lang].push([tag, 1]);
          }
        }
      }
    }
    for (const post of posts[lang]) {
      let flag = false;
      for (const t of categories[lang]) {
        if (t[0] === post.category) {
          t[1] += 1;
          flag = true;
          break;
        }
      }
      if (!flag) {
        categories[lang].push([post.category, 1]);
      }
    }
  }
  for (const post of posts[defaultLang]) {
    if (post.matter.tags) {
      for (const tag of post.matter.tags) {
        let flag = false;
        for (const t of tags[defaultLang]) {
          if (t[0] === tag) {
            t[1] += 1;
            flag = true;
            break;
          }
        }
        if (!flag) {
          tags[defaultLang].push([tag, 1]);
        }
      }
    }

    let flag = false;
    for (const t of categories[defaultLang]) {
      if (t[0] === post.category) {
        t[1] += 1;
        flag = true;
        break;
      }
    }
    if (!flag) {
      categories[defaultLang].push([post.category, 1]);
    }
  }

  return {
    postmeta: posts,
    tags: tags,
    categories: categories,
  };
}
