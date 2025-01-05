import { observer } from 'mobx-react';
import { BlogCard } from './blog-card';

export const Blog = observer(() => {
  return (
    <div>
      <BlogCard />
    </div>
  );
});
