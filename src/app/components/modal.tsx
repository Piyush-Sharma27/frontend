'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  student: { _id: string; name: string; rollnumber: number } | null;
  onUpdate: (id: string, name: string, rollnumber: number) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalPopup({ open, handleClose, student, onUpdate }: ModalProps) {
  const [name, setName] = React.useState('');
  const [roll, setRoll] = React.useState<number | string>('');

  React.useEffect(() => {
    if (student) {
      setName(student.name);
      setRoll(student.rollnumber);
    }
  }, [student]);

  const handleSave = () => {
    if (student) {
      onUpdate(student._id, name, Number(roll));
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Update Student
        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Roll Number"
          type="number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          margin="normal"
        />

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
}
