import { getPosts, updatePost } from '@/firebase/config';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { IPost } from './Home.interface';

export function Home(): JSX.Element {
   // Configuration
   const navigate = useNavigate();

   // Redux states
   const { email } = useSelector((state: RootState) => state.user);

   // States
   const [posts, setPosts] = useState<IPost[]>([]);

   const [loading, setLoading] = useState<boolean>(true);

   // Effects
   useEffect(() => {
      getAllPosts();
   }, []);

   useEffect(() => {
      if (!email) {
         navigate('/login');
      }
   }, [email]);

   // Methods
   const getAllPosts = async (): Promise<void> => {
      const querySnapshot = await getPosts();

      const postsData = querySnapshot.docs.map((doc) => ({
         ...(doc.data() as IPost),
         id: doc.id,
         autor: doc.data().email
      }));

      setPosts(postsData);

      setLoading(false);
   };

   const favoriteValidation = async (post: IPost): Promise<void> => {
      const validateLikedAutor = post.likes.filter((like) => like === email);

      const index = posts.findIndex((item) => item.id === post.id);

      if (validateLikedAutor.length === 0) {
         if (index !== -1) {
            const updatedPosts = [...posts];

            updatedPosts[index] = { ...updatedPosts[index], likes: [...post.likes, email] };

            setPosts(updatedPosts);

            await updatePost(post.id, {
               title: post.title,
               urlImage: post.urlImage,
               email: post.autor,
               likes: [...post.likes, email]
            });
         }
      }

      if (validateLikedAutor.length > 0) {
         if (index !== -1) {
            const updatedPosts = [...posts];

            // Eliminar el email del arreglo de likes
            updatedPosts[index] = {
               ...updatedPosts[index],
               likes: post.likes.filter((like) => like !== email)
            };

            setPosts(updatedPosts);

            await updatePost(post.id, {
               title: post.title,
               urlImage: post.urlImage,
               email: post.autor,
               likes: post.likes.filter((like) => like !== email)
            });
         }
      }
   };

   const favoriteIcon = (post: IPost): JSX.Element => {
      const validateLikedAutor = post.likes.filter((like) => like === email);

      if (validateLikedAutor.length > 0) {
         return <GoHeartFill />;
      }

      return <GoHeart />;
   };

   return (
      <div className='flex flex-wrap gap-[2%] !gap-y-4'>
         {!loading &&
            posts.length > 0 &&
            posts.map((post) => (
               <div key={post.id} className='h-fit w-full md:w-[32%] p-3 bg-white shadow-md rounded-md'>
                  <img src={post.urlImage} alt={post.id} className='w-full h-auto min-h-[280px]' />

                  <p className='text-[14px] mt-1 italic'>{post.autor}</p>

                  <p className='text-[18px] mt-1'>{post.title}</p>

                  <div className='flex items-center gap-3 justify-between mt-3'>
                     <p className='text-[14px]'>Total me gusta: {post.likes.length}</p>

                     <button onClick={() => favoriteValidation(post)} className='text-[28px]'>
                        {favoriteIcon(post)}
                     </button>
                  </div>
               </div>
            ))}

         {loading && (
            <>
               <div className='h-[400px] w-full md:w-[32%] p-3 bg-gray-400 shadow-md rounded-md animate-pulse' />
               <div className='h-[400px] w-full md:w-[32%] p-3 bg-gray-400 shadow-md rounded-md animate-pulse' />
               <div className='h-[400px] w-full md:w-[32%] p-3 bg-gray-400 shadow-md rounded-md animate-pulse' />
               <div className='h-[400px] w-full md:w-[32%] p-3 bg-gray-400 shadow-md rounded-md animate-pulse' />
               <div className='h-[400px] w-full md:w-[32%] p-3 bg-gray-400 shadow-md rounded-md animate-pulse' />
               <div className='h-[400px] w-full md:w-[32%] p-3 bg-gray-400 shadow-md rounded-md animate-pulse' />
            </>
         )}
      </div>
   );
}
