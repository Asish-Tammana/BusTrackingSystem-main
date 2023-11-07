import * as React from 'react';
import { Button} from 'react-native';
import { Modal, Portal, Text, PaperProvider } from 'react-native-paper';

const DriverDetailsPopUp = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 0};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default DriverDetailsPopUp;