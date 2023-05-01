import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useCurrentUser, useEditModal, useUser } from '@/hooks';
import { ImageUpload, Input, Modal } from '@/components';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [bio, setBio] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    setBio(currentUser?.bio);
    setCoverImage(currentUser?.coverImage);
    setName(currentUser?.name);
    setProfileImage(currentUser?.profileImage);
    setUsername(currentUser?.username);
  }, [
    currentUser?.bio,
    currentUser?.coverImage,
    currentUser?.name,
    currentUser?.profileImage,
    currentUser?.username
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback( async () => {
    try {
      setIsLoading(true);
      
      await axios.patch('/api/edit', {
        bio,
        coverImage,
        name,
        profileImage,
        username
      });

      mutateFetchedUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [bio, coverImage, editModal, name, profileImage, username, mutateFetchedUser,]);

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder='Name'
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder='Bio'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title='Edit your profile'
      actionLabel='Save'
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal