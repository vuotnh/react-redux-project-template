import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import axiosInstance from '../../utils/axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Grid,
  Typography,
  FormHelperText,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

function AddEditModal(props) {
  const { isOpenModal, setIsOpenModal, dataEdit, setDataEdit, onGetListUser, onShowLoading } =
    props;
  const imagePreviewRef = useRef();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
  });
  const handleCloseModal = () => {
    setDataEdit(null);
    reset();
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('phone', '');
    setValue('email', '');
    setValue('avatarFile', null);
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (dataEdit) {
      setValue('firstName', dataEdit.firstName || '');
      setValue('lastName', dataEdit.lastName || '');
      setValue('phone', dataEdit.phone || '');
      setValue('email', dataEdit.email || '');
    }
  }, [dataEdit]);

  const onChangePreviewFile = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      imagePreviewRef.current.src = e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    onShowLoading(true);
    try {
      const dataUpdate = {
        firstName: data?.firstName || '',
        lastName: data?.lastName || '',
        phone: data?.phone || '',
        email: data?.email || '',
      };
      if (data.avatarFile.length) {
        const newAvatarFile = data.avatarFile[0];
        const formData = new FormData();
        formData.append('file', newAvatarFile);

        const uploadedAvatar = await axiosInstance({
          method: 'POST',
          url: `${import.meta.env.VITE_API_URL}/file/upload`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (uploadedAvatar.status === 200) {
          dataUpdate['avatar_id'] = uploadedAvatar.data?.file?.id;
        }
      }

      const updateUser = await axiosInstance({
        method: 'PATCH',
        url: `${import.meta.env.VITE_API_URL}/user/updateInfo/${dataEdit.id}`,
        data: dataUpdate,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (updateUser.status === 200) {
        enqueueSnackbar('Thao tác thành công', { variant: 'success' });
        imagePreviewRef.current.src = '';
        await onGetListUser();
        handleCloseModal();
      }
    } catch (err) {
      enqueueSnackbar(err?.message || 'Thao tác thất bại', { variant: 'error' });
    }
    onShowLoading(false);
  };
  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography>{dataEdit ? 'Edit user' : 'Add User'}</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="firstName"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Firstname"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.firstName?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="lastName"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Lastname"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.lastName?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="phone"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Phone"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.phone?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <Controller
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: 'Không được để trống',
                  },
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    label="Email address"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: '80%',
                    }}
                  />
                )}
              />
              <FormHelperText error>{errors?.email?.message}</FormHelperText>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <div className="main-img-preview">
                <img
                  className="thumbnail img-preview"
                  ref={imagePreviewRef}
                  src={
                    dataEdit && dataEdit.avatar.length > 0
                      ? `${import.meta.env.VITE_API_URL}/storage/images/${
                          dataEdit?.avatar[0]?.name
                        }`
                      : ''
                  }
                  title="Preview Avatar"
                  style={{
                    maxWidth: '400px',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div
                className="input-group"
                style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <div className="input-group-btn">
                  <div className="fileUpload btn btn-danger fake-shadow">
                    <input
                      id="avatar"
                      name="avatar"
                      type="file"
                      {...register('avatarFile')}
                      className="attachment_upload"
                      onChange={onChangePreviewFile}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              sx={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}>
              <button
                className="btn btn-secondary btn-lg"
                type="button"
                onClick={() => {
                  handleCloseModal();
                }}>
                Huỷ
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ marginLeft: '30px' }}>
                Lưu lại
              </button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddEditModal.propTypes = {
  isOpenModal: PropTypes.bool,
  setIsOpenModal: PropTypes.func,
  dataEdit: PropTypes.object,
  setDataEdit: PropTypes.func,
  onGetListUser: PropTypes.func,
  onShowLoading: PropTypes.func,
};

export default AddEditModal;
