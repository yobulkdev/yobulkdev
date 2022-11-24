import MainModel from '../MainModel';

export default function handleEdit({
  isOpen,
  setIsOpen,
  closeModal,
  setTemplateData,
}) {
  setIsOpen(true);
  return (
    <MainModel
      isOpen={isOpen}
      closeModal={closeModal}
      setTemplateData={setTemplateData}
    />
  );
}
