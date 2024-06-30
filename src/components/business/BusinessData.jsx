
import { forwardRef, useEffect, useState } from "react"
import { observer } from "mobx-react";

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Modal as BaseModal } from '@mui/base/Modal';
import { styled, css } from '@mui/material/styles';

import AppStore from "../../store/AppStore"

const BusinessData = (observer(() => {

    const [businessDetails, setBusinessDetails] = useState({
        name: "",
        image: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        AppStore.getBussinessData();
    }, [])
    const handleChange = (event => {
        const { name, value } = event.target
        setBusinessDetails({ ...businessDetails, [name]: value })
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        handleClose();
        AppStore.updateBussinessData(businessDetails)
        //עדכון נתונים בסטור
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    return (
        <>
            {!open && <div>
                <div>
                    <img src={AppStore.BussinessData.image} alt="Business Logo" />
                    <p>{AppStore.BussinessData.name} | {AppStore.BussinessData.email} | {AppStore.BussinessData.phone}</p>
<hr />
                </ div>
                <br />
                {AppStore.isLogin && (<TriggerButton type="button" onClick={handleOpen}>
                    Edit toggle
                </TriggerButton>)}</div>
            }


            <div>
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
                                id="bussinesName"
                                label="Bussiness name"
                                name="name"
                                autoComplete="name"
                                onChange={handleChange}
                                value={businessDetails.name}
                                autoFocus
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                type="text"
                                id="email"
                                onChange={handleChange}
                                value={businessDetails.email}
                                autoFocus
                                autoComplete="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                type="text"
                                id="phone"
                                onChange={handleChange}
                                value={businessDetails.phone}
                                autoFocus
                                autoComplete="phone"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="image"
                                label="Logo path"
                                type="text"
                                id="logo"
                                onChange={handleChange}
                                value={businessDetails.image}
                                autoFocus
                                autoComplete="logo"
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
            </div>
        </>
    )
    
}))

export default BusinessData

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
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

const TriggerButton = styled('button')(
    ({ theme }) => css`
     font-family: 'IBM Plex Sans', sans-serif;
     font-weight: 600;
     font-size: 0.875rem;
     line-height: 1.5;
     padding: 8px 16px;
     border-radius: 8px;
     transition: all 150ms ease;
     cursor: pointer;
     background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
     border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
     color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
     box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
 
     &:hover {
       background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
       border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
     }
 
     &:active {
       background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
     }
 
     &:focus-visible {
       box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
       outline: none;
     }
   `,);