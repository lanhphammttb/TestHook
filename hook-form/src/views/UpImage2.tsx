import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const UpImage2 = () => {
  const [images, setImages] = useState<Array<any>>([]);

  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Các định dạng hình ảnh hợp lệ

  const [message, setMessage] = useState<any>('');

  const isBase64ImageValid = (base64String: string) => {
    const img = new Image();
    img.src = base64String;

    return img.complete && img.naturalWidth !== 0;
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cardIndex: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Kiểm tra xem tệp có phải là một hình ảnh hợp lệ không
      if (!validImageTypes.includes(file.type)) {
        setMessage('Vui lòng chọn một tệp hình ảnh hợp lệ.');
        return;
      }
      // Kiểm tra kích thước của tệp
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File quá lớn. Vui lòng chọn file dưới 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[cardIndex] = reader.result as string;
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
      setMessage('');
    }
  };

  const handleClearButtonClick = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = undefined;
      return updatedImages;
    });
  };

  const handleDeleteClick = () => {
    setImages([]);
  };

  const handleSendClick = () => {
    if (![...images].every(Boolean)) {
      setMessage('Vui lòng chọn đủ 2 ảnh.');
      return;
    }

    let invalidImageCount = 0;
    let invalidImageNumber = '';

    images.forEach((image, index) => {
      if (!isBase64ImageValid(image)) {
        invalidImageCount++;
        invalidImageNumber += (index === 0 ? 'mặt trước' : 'mặt sau') + ', ';
      }
    });

    if (invalidImageCount > 0) {
      invalidImageNumber = invalidImageNumber.slice(0, -2); // Xóa dấu phẩy cuối cùng và khoảng trắng
      setMessage(
        `Ảnh ${invalidImageNumber} không hợp lệ. Vui lòng chọn một hình ảnh hợp lệ.`
      );
      return;
    }

    console.log('Sending images:', images);
    alert('Cập nhật thành công!');
  };
  return (
    <>
      <div className="flex gap-10 m-20 justify-center">
        {[1, 2].map((index) => (
          <div key={index} className="flex flex-col gap-5 items-center">
            <Card
              key={index}
              sx={{
                width: '20rem',
                height: '12.5rem',
                position: 'relative'
              }}
            >
              {images[index - 1] ? (
                <>
                  <CardMedia
                    className="w-full h-full"
                    component="img"
                    alt={`Image ${index}`}
                    height="140"
                    image={images[index - 1]}
                  />
                  <CardActions className="absolute top-0 right-0">
                    <Button
                      className="w-full h-full"
                      endIcon={
                        <HighlightOffIcon
                          sx={{
                            color: 'white',
                            width: '30px',
                            height: '30px',
                            '&:hover': {
                              color: 'red'
                            }
                          }}
                        />
                      }
                      onClick={() => handleClearButtonClick(index - 1)}
                    />
                  </CardActions>
                </>
              ) : (
                <CardActions className="w-full h-full">
                  <Button
                    className="w-full h-full"
                    component="label"
                    startIcon={
                      <AddIcon
                        sx={{
                          width: '100px',
                          height: '100px',
                          opacity: '0.4',
                          color: 'black'
                        }}
                      />
                    }
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleFileInputChange(e, index - 1)}
                      accept="image/*"
                    />
                  </Button>
                </CardActions>
              )}
            </Card>
            <Typography sx={{ fontSize: 20 }} gutterBottom>
              Ảnh mặt {index === 1 ? 'trước' : 'sau'}
            </Typography>
          </div>
        ))}
      </div>
      <Stack direction="row" spacing={2} className="flex justify-center">
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendClick}
        >
          Send
        </Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={message !== '' ? true : false}
        // autoHideDuration={2000}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpImage2;
