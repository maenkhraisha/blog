import { Link } from "react-router-dom";

import Image from "../componenets/Image";
import PostMenuActions from "../componenets/PostMenuActions";
import Search from "../componenets/Search";
import Comments from "../componenets/Comments";

const SinglePost = () => {
    return (
        <div className='flex flex-col gap-8'>
            {/* details */}
            <div className='flex gap-8'>
                <div className='lg:w-3/5 flex flex-col gap-8'>
                    <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold'>
                        Mastering System Design: 30 Core Concepts Every
                        Developer Should Know Harsh Gupta Harsh Gupta
                    </h1>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <span>Written by</span>
                        <Link className='text-blue-800'>John Doe</Link>
                        <span>on</span>
                        <Link className='text-blue-800'>Web Design</Link>
                        <span>2 days ago</span>
                    </div>
                    <p className='text-gray-500 font-medium'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Odio natus, architecto illum distinctio tempore
                        dolorum quam perferendis laboriosam soluta odit cumque
                        ipsa eius minima ad eum deleniti blanditiis quis dolore!
                    </p>
                </div>
                <div className='hidden lg:block w-2/5'>
                    <Image src='postImg.jpeg' w={600} className='rounded-2xl' />
                </div>
            </div>
            {/* content */}
            <div className='flex flex-col md:flex-row gap-12'>
                {/* text */}
                <div className='lg:text-lg flex flex-col gap-6 text-justify'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt voluptas error nihil, voluptatibus sed
                        deleniti maxime ipsam eaque amet alias cum quas ducimus
                        qui dolorem beatae vero labore provident explicabo
                        architecto soluta? Dignissimos sit, quasi quia quas at
                        numquam sed mollitia. Quae deserunt a reiciendis, ab
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eos eligendi explicabo esse dignissimos id nobis
                        optio, possimus laudantium perferendis consequatur at
                        nihil blanditiis deserunt adipisci asperiores mollitia
                        rerum natus soluta? Beatae velit distinctio, quasi
                        recusandae dolorem aliquid dolor porro animi veritatis,
                        atque nisi! Inventore dolore consectetur ea aspernatur.
                        Ut at incidunt a veritatis reprehenderit ratione maiores
                        iste, voluptates saepe! Voluptas explicabo aspernatur,
                        eaque aliquid, natus non mollitia quidem quisquam
                        reiciendis tempore labore id optio tempora repellendus
                        perferendis voluptates, ut temporibus fugiat earum nemo
                        dolores? Commodi fuga quasi tenetur? Cumque optio nam
                        illo ipsum accusantium tenetur illum rem, voluptatem,
                        aperiam sequi, numquam dicta. Atque commodi veritatis
                        nemo odit labore nisi omnis modi exercitationem. Ipsam,
                        soluta minus error repellat veritatis eveniet cumque
                        nisi autem nobis odio ipsum facere ipsa voluptatibus!
                        Asperiores distinctio sapiente atque eaque. Magnam dolor
                        rerum ea eveniet, labore autem reiciendis repellendus
                        consectetur nobis deleniti, quos sed recusandae alias?
                        Quaerat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt voluptas error nihil, voluptatibus sed
                        deleniti maxime ipsam eaque amet alias cum quas ducimus
                        qui dolorem beatae vero labore provident explicabo
                        architecto soluta? Dignissimos sit, quasi quia quas at
                        numquam sed mollitia. Quae deserunt a reiciendis, ab
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eos eligendi explicabo esse dignissimos id nobis
                        optio, possimus laudantium perferendis consequatur at
                        nihil blanditiis deserunt adipisci asperiores mollitia
                        rerum natus soluta? Beatae velit distinctio, quasi
                        recusandae dolorem aliquid dolor porro animi veritatis,
                        atque nisi! Inventore dolore consectetur ea aspernatur.
                        Ut at incidunt a veritatis reprehenderit ratione maiores
                        iste, voluptates saepe! Voluptas explicabo aspernatur,
                        eaque aliquid, natus non mollitia quidem quisquam
                        reiciendis tempore labore id optio tempora repellendus
                        perferendis voluptates, ut temporibus fugiat earum nemo
                        dolores? Commodi fuga quasi tenetur? Cumque optio nam
                        illo ipsum accusantium tenetur illum rem, voluptatem,
                        aperiam sequi, numquam dicta. Atque commodi veritatis
                        nemo odit labore nisi omnis modi exercitationem. Ipsam,
                        soluta minus error repellat veritatis eveniet cumque
                        nisi autem nobis odio ipsum facere ipsa voluptatibus!
                        Asperiores distinctio sapiente atque eaque. Magnam dolor
                        rerum ea eveniet, labore autem reiciendis repellendus
                        consectetur nobis deleniti, quos sed recusandae alias?
                        Quaerat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt voluptas error nihil, voluptatibus sed
                        deleniti maxime ipsam eaque amet alias cum quas ducimus
                        qui dolorem beatae vero labore provident explicabo
                        architecto soluta? Dignissimos sit, quasi quia quas at
                        numquam sed mollitia. Quae deserunt a reiciendis, ab
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eos eligendi explicabo esse dignissimos id nobis
                        optio, possimus laudantium perferendis consequatur at
                        nihil blanditiis deserunt adipisci asperiores mollitia
                        rerum natus soluta? Beatae velit distinctio, quasi
                        recusandae dolorem aliquid dolor porro animi veritatis,
                        atque nisi! Inventore dolore consectetur ea aspernatur.
                        Ut at incidunt a veritatis reprehenderit ratione maiores
                        iste, voluptates saepe! Voluptas explicabo aspernatur,
                        eaque aliquid, natus non mollitia quidem quisquam
                        reiciendis tempore labore id optio tempora repellendus
                        perferendis voluptates, ut temporibus fugiat earum nemo
                        dolores? Commodi fuga quasi tenetur? Cumque optio nam
                        illo ipsum accusantium tenetur illum rem, voluptatem,
                        aperiam sequi, numquam dicta. Atque commodi veritatis
                        nemo odit labore nisi omnis modi exercitationem. Ipsam,
                        soluta minus error repellat veritatis eveniet cumque
                        nisi autem nobis odio ipsum facere ipsa voluptatibus!
                        Asperiores distinctio sapiente atque eaque. Magnam dolor
                        rerum ea eveniet, labore autem reiciendis repellendus
                        consectetur nobis deleniti, quos sed recusandae alias?
                        Quaerat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt voluptas error nihil, voluptatibus sed
                        deleniti maxime ipsam eaque amet alias cum quas ducimus
                        qui dolorem beatae vero labore provident explicabo
                        architecto soluta? Dignissimos sit, quasi quia quas at
                        numquam sed mollitia. Quae deserunt a reiciendis, ab
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eos eligendi explicabo esse dignissimos id nobis
                        optio, possimus laudantium perferendis consequatur at
                        nihil blanditiis deserunt adipisci asperiores mollitia
                        rerum natus soluta? Beatae velit distinctio, quasi
                        recusandae dolorem aliquid dolor porro animi veritatis,
                        atque nisi! Inventore dolore consectetur ea aspernatur.
                        Ut at incidunt a veritatis reprehenderit ratione maiores
                        iste, voluptates saepe! Voluptas explicabo aspernatur,
                        eaque aliquid, natus non mollitia quidem quisquam
                        reiciendis tempore labore id optio tempora repellendus
                        perferendis voluptates, ut temporibus fugiat earum nemo
                        dolores? Commodi fuga quasi tenetur? Cumque optio nam
                        illo ipsum accusantium tenetur illum rem, voluptatem,
                        aperiam sequi, numquam dicta. Atque commodi veritatis
                        nemo odit labore nisi omnis modi exercitationem. Ipsam,
                        soluta minus error repellat veritatis eveniet cumque
                        nisi autem nobis odio ipsum facere ipsa voluptatibus!
                        Asperiores distinctio sapiente atque eaque. Magnam dolor
                        rerum ea eveniet, labore autem reiciendis repellendus
                        consectetur nobis deleniti, quos sed recusandae alias?
                        Quaerat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt voluptas error nihil, voluptatibus sed
                        deleniti maxime ipsam eaque amet alias cum quas ducimus
                        qui dolorem beatae vero labore provident explicabo
                        architecto soluta? Dignissimos sit, quasi quia quas at
                        numquam sed mollitia. Quae deserunt a reiciendis, ab
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Eos eligendi explicabo esse dignissimos id nobis
                        optio, possimus laudantium perferendis consequatur at
                        nihil blanditiis deserunt adipisci asperiores mollitia
                        rerum natus soluta? Beatae velit distinctio, quasi
                        recusandae dolorem aliquid dolor porro animi veritatis,
                        atque nisi! Inventore dolore consectetur ea aspernatur.
                        Ut at incidunt a veritatis reprehenderit ratione maiores
                        iste, voluptates saepe! Voluptas explicabo aspernatur,
                        eaque aliquid, natus non mollitia quidem quisquam
                        reiciendis tempore labore id optio tempora repellendus
                        perferendis voluptates, ut temporibus fugiat earum nemo
                        dolores? Commodi fuga quasi tenetur? Cumque optio nam
                        illo ipsum accusantium tenetur illum rem, voluptatem,
                        aperiam sequi, numquam dicta. Atque commodi veritatis
                        nemo odit labore nisi omnis modi exercitationem. Ipsam,
                        soluta minus error repellat veritatis eveniet cumque
                        nisi autem nobis odio ipsum facere ipsa voluptatibus!
                        Asperiores distinctio sapiente atque eaque. Magnam dolor
                        rerum ea eveniet, labore autem reiciendis repellendus
                        consectetur nobis deleniti, quos sed recusandae alias?
                        Quaerat.
                    </p>
                </div>
                {/* menu */}
                <div className='px-4 h-max sticky top-8'>
                    <h2 className=' mb-4 text-sm font-medium'>Author</h2>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-8'>
                            <Image
                                src='userImg.jpeg'
                                className='w-12 h-12 rounded-full object-cover'
                                w={48}
                                h={48}
                            />
                            <Link className='text-blue-800'>John Doe</Link>
                        </div>
                        <p className='text-sm text-gray-500'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Pariatur.
                        </p>
                        <div className='flex gap-2'>
                            <Link>
                                <Image src='facebook.svg' />
                            </Link>
                            <Link>
                                <Image src='instagram.svg' />
                            </Link>
                        </div>
                    </div>
                    <PostMenuActions />
                    <h2 className='mt-8 mb-4 text-sm font-medium'>
                        Categories
                    </h2>
                    <div className='flex flex-col gap-2 text-sm'>
                        <Link className='underline' to='/test'>
                            All
                        </Link>
                        <Link className='underline' to='/test'>
                            Web Design
                        </Link>
                        <Link className='underline' to='/test'>
                            Development
                        </Link>
                        <Link className='underline' to='/test'>
                            Databases
                        </Link>
                        <Link className='underline' to='/test'>
                            Search Engines
                        </Link>
                        <Link className='underline' to='/test'>
                            Markiting
                        </Link>
                    </div>
                    <h2 className='mt-8 mb-4 text-sm font-medium'>Search</h2>
                    <Search />
                </div>
            </div>
            <Comments />
        </div>
    );
};

export default SinglePost;
