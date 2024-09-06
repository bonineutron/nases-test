import { Input, CardPage, Button, ETypeAlertDialog, Modal } from '@/components';
import { openAlert } from '@/redux/features/alert-dialog/alert-dialog.slice';
import { inputChange, inputError } from '@/utilities/global.utility';
import { savePost, uploadFile } from '@/firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { IFormPost } from './FormPost.interface';
import { IoMdCloudUpload } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { RootState } from '@/redux/store';

export function FormPost(): JSX.Element {
   // Configuration
   const fileInputRef = useRef<HTMLInputElement | null>(null);

   const videoRef = useRef<HTMLVideoElement | null>(null);

   const canvasRef = useRef<HTMLCanvasElement | null>(null);

   const dispatch = useDispatch();

   const navigate = useNavigate();

   // Redux states
   const { email } = useSelector((state: RootState) => state.user);

   // States
   const [formPost, setFormPost] = useState<IFormPost>({
      title: { value: '' },
      urlImage: ''
   });

   const [image, setImage] = useState<File | null>(null);

   const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

   const [openModal, setOpenModal] = useState<boolean>(false);

   // Methods
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         setImage(file);

         const imageUrl = URL.createObjectURL(file);

         setFormPost({
            ...formPost,
            urlImage: imageUrl
         });
      }
   };

   const handleSubmit = async (event: React.FormEvent): Promise<void> => {
      event.preventDefault();

      if (formDataFailed()) {
         return;
      }

      setLoadingSubmit(true);

      if (image) {
         const responseUploadImage = await uploadFile(image);

         if (!responseUploadImage) {
            dispatch(
               openAlert({
                  type: ETypeAlertDialog.Error,
                  description: 'Error al subir la imagen'
               })
            );

            setLoadingSubmit(false);

            return;
         }

         if (responseUploadImage) {
            setFormPost({
               ...formPost,
               urlImage: responseUploadImage
            });

            savePost({
               title: formPost.title.value,
               urlImage: responseUploadImage,
               email: email
            });

            dispatch(
               openAlert({
                  type: ETypeAlertDialog.Success,
                  description: 'Publicación hecha'
               })
            );

            navigate('/');
         }
      }

      setLoadingSubmit(false);
   };

   const formDataFailed = (): boolean => {
      let failed: boolean = false;

      if (!formPost.title.value) {
         inputError<IFormPost>(setFormPost, 'title');

         failed = true;
      }

      if (!formPost.urlImage) {
         dispatch(
            openAlert({
               type: ETypeAlertDialog.Error,
               description: 'Agrega una imagen'
            })
         );

         failed = true;
      }

      return failed;
   };

   const handleButtonClick = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleButtonCamera = () => {
      startCamera();

      setOpenModal(true);
   };

   const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
         videoRef.current.srcObject = stream;
         videoRef.current.play();
      }
   };

   const captureImage = () => {
      if (canvasRef.current && videoRef.current) {
         const context = canvasRef.current.getContext('2d');

         if (context) {
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            const imageDataUrl = canvasRef.current.toDataURL('image/png');

            setFormPost({ ...formPost, urlImage: imageDataUrl });

            setOpenModal(false);

            setImage(dataURLtoFile(imageDataUrl, 'captured-image.png'));
         }
      }
   };

   const dataURLtoFile = (dataurl: string, filename: string) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
         u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
   };

   return (
      <CardPage className='max-w-[360px] mx-auto'>
         <form onSubmit={handleSubmit} className='h-fit w-full'>
            <img
               src={formPost.urlImage || '/global/image-loading.svg'}
               alt='image-viewer'
               className='h-[250px] w-full object-cover rounded-md mx-auto mb-3'
            />

            <div className='flex justify-between flex-wrap mb-6'>
               <Button onClick={handleButtonCamera} icon={<FaCamera />}>
                  Tomar foto
               </Button>

               <Button onClick={handleButtonClick} icon={<IoMdCloudUpload />}>
                  Subir imagen
               </Button>
            </div>

            <input
               type='file'
               accept='.jpg, .jpeg, .png, .gif'
               onChange={handleImageChange}
               ref={fileInputRef}
               style={{ display: 'none' }}
            />

            <Input
               id='title-post'
               name='title-post'
               type='text'
               label='Titulo'
               value={formPost.title.value}
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  inputChange<IFormPost, string>(setFormPost, 'title', event.target.value);
               }}
               error={formPost.title.error}
               errorMessage={formPost.title.errorMessage}
               fullWidth
            />

            <div className='flex justify-end'>
               <Button loading={loadingSubmit} submit fullWidth secondary>
                  Publicar
               </Button>
            </div>
         </form>

         {openModal && (
            <Modal open={openModal} setOpen={setOpenModal}>
               <div className='w-[300px]'>
                  <video ref={videoRef} width='300' height='300' playsInline muted autoPlay />
                  <canvas ref={canvasRef} width='300' height='300' style={{ display: 'none' }} />
               </div>

               <div className='flex justify-center mt-3'>
                  <Button onClick={captureImage} icon={<FaCamera />}>
                     Capturar
                  </Button>
               </div>
            </Modal>
         )}
      </CardPage>
   );
}
