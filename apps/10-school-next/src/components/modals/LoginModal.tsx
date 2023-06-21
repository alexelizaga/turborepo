'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getErrorMessage, signIn, signInWithGoogle } from "@/firebase/auth";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useLoginModal, useRegisterModal } from '@/hooks'
import { Button, Heading, Input, Modal } from '@/components';

const LoginModal: FC = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
}, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const { result, error } = await signIn(data.email, data.password);
    setIsLoading(false);

    if (result) {
      toast.success('Logged in!');
      router.refresh();
      loginModal.onClose();
    }

    if (error) toast.error(getErrorMessage(error));
  }

  const onSignInWithGoogle = async () => {
    setIsLoading(true);
    const { result, error } = await signInWithGoogle();
    setIsLoading(false);

    if (result) {
      toast.success('Logged in!');
      router.refresh();
      loginModal.onClose();
    }

    if (error) toast.error(getErrorMessage(error));
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='Login to your account!'
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type='password'
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={onSignInWithGoogle}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => ({})}
      />
      <div
        className='
          text-neutral-500
          text-center
          mt-4
          font-light
        '
      >
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            First time using Airbnb?
          </div>
          <div
            onClick={toggle}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
            '
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal