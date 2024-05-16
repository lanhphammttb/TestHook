import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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

const Home = () => {
  const [images, setImages] = useState<Array<any>>([]);

  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Các định dạng hình ảnh hợp lệ

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cardIndex: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Kiểm tra xem tệp có phải là một hình ảnh hợp lệ không
      if (!validImageTypes.includes(file.type)) {
        alert('Vui lòng chọn một tệp hình ảnh hợp lệ.');
        return;
      }
      // Kiểm tra kích thước của tệp
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file dưới 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[cardIndex] = reader.result;
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearButtonClick = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = undefined;
      return updatedImages;
    });
  };

  return (
    <div className="flex gap-10 m-32 justify-center">
      {[1, 2].map((index) => (
        <Card
          key={index}
          sx={{
            width: '20rem',
            height: '12.5rem',
            position: 'relative'
          }}
        >
          {images[index - 1] && (
            <CardMedia
              className="w-full h-full"
              component="img"
              alt={`Image ${index}`}
              height="140"
              image={images[index - 1]}
            />
          )}
          {images[index - 1] ? (
            <CardActions className="absolute top-0 right-0">
              <Button
                className="w-full h-full"
                startIcon={
                  <HighlightOffIcon
                    sx={{ color: 'red', width: '30px', height: '30px' }}
                  />
                }
                onClick={() => handleClearButtonClick(index - 1)}
              />
            </CardActions>
          ) : (
            <CardActions className="w-full h-full">
              <Button
                className="w-full h-full"
                component="label"
                startIcon={<AddIcon sx={{ width: '100px', height: '100px' }} />}
              >
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => handleFileInputChange(e, index - 1)}
                />
              </Button>
            </CardActions>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Home;
