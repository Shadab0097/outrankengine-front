// ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h4>Are you sure?</h4>
                <p>{message}</p>
                <div style={styles.buttonContainer}>
                    <button onClick={onCancel} style={styles.cancelButton}>No, Stay</button>
                    <button onClick={onConfirm} style={styles.confirmButton}>Yes, Leave</button>
                </div>
            </div>
        </div>
    );
};

// Basic styling - you should use CSS classes in a real app
const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center', width: '300px' },
    buttonContainer: { display: 'flex', justifyContent: 'space-around', marginTop: '20px' },
    confirmButton: { backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' },
    cancelButton: { backgroundColor: '#f0f0f0', color: 'black', border: '1px solid #ccc', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' },
};

export default ConfirmationModal;