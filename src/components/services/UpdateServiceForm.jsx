import TextField from '@mui/material/TextField';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/material/styles';
import { forwardRef, useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TButton from '../TriggerButton';
import AppStoreService from '../../store/AppStoreService';


function UpdateServiceForm() {



    const [serviceForm, setServiceForm] = useState({
        name: "",
        description: "",
        price: "",
        pathImage:""
     })
  
     const handleChange = (event) => {

        const { name, value } = event.target
        setServiceForm({ ...serviceForm, [name]: value })      
     }
  
     const handleSubmit = (event) => {

        event.preventDefault()
        handleClose()
        AppStoreService.addService(serviceForm); 
        setServiceForm({
            name: "",
            description: "",
            price: "",
            pathImage:""
         })
        
     }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setServiceForm({
            name: "",
            description: "",
            price: "",
            pathImage:""
         })
    };
 
    const Backdrop = forwardRef((props, ref) => {
       const { open, className, ...other } = props;
       return (
          <div
             className={clsx({ 'base-Backdrop-open': open }, className)}
             ref={ref}
             {...other}
          />
       );
    });
 
    Backdrop.propTypes = {
       className: PropTypes.string.isRequired,
       open: PropTypes.bool,
    };
 

 
    const grey = {
       50: '#F3F6F9',
       100: '#E5EAF2',
       200: '#DAE2ED',
       300: '#C7D0DD',
       400: '#B0B8C4',
       500: '#9DA8B7',
       600: '#6B7A90',
       700: '#434D5B',
       800: '#303740',
       900: '#1C2025',
    };
 
    const Modal = styled(BaseModal)`
       position: fixed;
       z-index: 1300;
       inset: 0;
       display: flex;
       align-items: center;
       justify-content: center;
     `;
 

 
    const ModalContent = styled('div')(
       ({ theme }) => css`
         font-family: 'IBM Plex Sans', sans-serif;
         font-weight: 500;
         text-align: start;
         position: relative;
         display: flex;
         flex-direction: column;
         gap: 8px;
         overflow: hidden;
         background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
         border-radius: 8px;
         border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
         box-shadow: 0 4px 12px
           ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
         padding: 24px;
         color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
     
         & .modal-title {
           margin: 0;
           line-height: 1.5rem;
           margin-bottom: 8px;
         }
     
         & .modal-description {
           margin: 0;
           line-height: 1.5rem;
           font-weight: 400;
           color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
           margin-bottom: 4px;
         }
       `,
    );
 
    
    return (
        <>
            <TButton type="button" onClick={handleOpen} query="Add service"/>
 
            
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                className="backdrop"
            >
                <ModalContent sx={{ width: 400 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='text'
                            id="serviceName"
                            label="Service name"
                            name="name"
                            autoComplete="name"
                            onChange={handleChange}
                            value={serviceForm.name}
                            autoFocus


                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            type="text"
                            id="servicePrice"
                            onChange={handleChange}
                            value={serviceForm.price}

                            autoComplete="service-price"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Service description"
                            type="text"
                            id="serviceDescription"
                            onChange={handleChange}
                            value={serviceForm.description}


                            autoComplete="service-description"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="pathImage"
                            label="Path image "
                            type="text"
                            id="pathImage"
                            onChange={handleChange}
                            value={serviceForm.pathImage}

                            autoComplete="service-description"
                        />
                        <div className="btns">
                            <Button className="btn"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save
                            </Button>
                            <Button className="btn"
                                onClick={handleClose}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Close
                            </Button>
                        </div>
                    </form>
                </ModalContent>
            </Modal>
        </>)
} 
export default UpdateServiceForm