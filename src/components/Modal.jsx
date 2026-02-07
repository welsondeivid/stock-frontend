import '../styles/modal.css';

export default function Modal({ id, isOpen, setIsOpen, children }) {
    if (!isOpen) return null;
    
    const closeModal = () => {
        if (setIsOpen)
            setIsOpen(false);
    }

    const handleModalClick = (event) => {
        event.stopPropagation();
    }
    
    return (
        <div onClick={closeModal} className='background'>

            <section id={id} onClick={handleModalClick} className='modal'>

                <div className="modal-header">
                    <button 
                        className='closeBtn'
                        onClick={closeModal}> 
                        × 
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </section>
        </div>
    );
}