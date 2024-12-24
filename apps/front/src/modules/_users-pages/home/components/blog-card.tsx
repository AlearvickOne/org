import { observer } from 'mobx-react';

export const BlogCard = observer(() => {
  return (
    <div className="border-1 border-blue-500 p-5 rounded-[15px] flex gap-x-10 items-center">
      <div className="">Фотка</div>
      <div>
        <div className="font-medium text-h6">Заголовок</div>
        <div className="">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut
          beatae blanditiis deleniti dolore ducimus, esse, id ipsam iusto labore
          maiores quae quam quis quisquam reprehenderit tempora temporibus unde
          vel! Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          aperiam culpa dolorum fugit laborum maxime modi provident quia tempora
          voluptatem. Cumque dolorum, eos expedita libero odio provident rem
          repellat similique. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Ad animi beatae blanditiis delectus dolorem eius eos
          ex laborum, libero, natus nihil non perspiciatis, porro quia quibusdam
          quisquam saepe veniam veritatis.
        </div>
      </div>
    </div>
  );
});
