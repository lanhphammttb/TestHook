import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
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

const UpImage1 = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [images, setImages] = useState<Array<any>>([]);
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Các định dạng hình ảnh hợp lệ
  const steps = [
    {
      label: 'Chụp ảnh mặt trước',
      description: (
        <>
          <Card
            sx={{
              width: '20rem',
              height: '12.5rem',
              position: 'relative'
            }}
          >
            {images[0] ? (
              <>
                <CardMedia
                  className="w-full h-full"
                  component="img"
                  alt={`Image ${0}`}
                  height="140"
                  image={images[0]}
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
                    onClick={() => handleClearButtonClick(0)}
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
                    onChange={(e) => handleFileInputChange(e, 0)}
                    accept="image/*"
                  />
                </Button>
              </CardActions>
            )}
          </Card>
        </>
      )
    },
    {
      label: 'Chụp ảnh mặt sau',
      description: (
        <>
          <Card
            sx={{
              width: '20rem',
              height: '12.5rem',
              position: 'relative'
            }}
          >
            {images[1] ? (
              <>
                <CardMedia
                  className="w-full h-full"
                  component="img"
                  alt={`Image ${1}`}
                  height="140"
                  image={images[1]}
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
                    onClick={() => handleClearButtonClick(1)}
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
                    onChange={(e) => handleFileInputChange(e, 1)}
                  />
                </Button>
              </CardActions>
            )}
          </Card>
        </>
      )
    }
  ];
  const [message, setMessage] = useState<any>('');
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
      if (file.size >= 5 * 1024 * 1024) {
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

  const isBase64ImageValid = (base64String: string) => {
    const img = new Image();
    img.src = base64String;

    return img.complete && img.naturalWidth !== 0;
  };

  const handleSendClick = () => {
    if ((!images[0] && activeStep === 0) || (!images[1] && activeStep === 1)) {
      setMessage('Vui lòng chọn ảnh');
      return false;
    }

    if (
      (activeStep === 0 && !isBase64ImageValid(images[0])) ||
      (activeStep === 1 && !isBase64ImageValid(images[1]))
    ) {
      setMessage(
        `Ảnh ${activeStep === 0 ? 'mặt trước' : 'mặt sau'} không hợp lệ. Vui lòng chọn một hình ảnh hợp lệ.`
      );
      return false;
    }

    console.log('Sending images:', images);
    activeStep === 1 && alert('Cập nhật thành công!');
    return true;
  };

  const handleNext = () => {
    if (!handleSendClick()) return;
    setMessage('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box margin={20}>
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 1 ? (
                  <Typography variant="caption">Xong</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Submit' : 'Tiếp tục'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Quay lại
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Bạn đã cập nhật CCCD thành công</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
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
    </Box>
  );
};
export default UpImage1;
