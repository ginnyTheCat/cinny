import React from 'react';

import ReadReceipts from '../read-receipts/ReadReceipts';
import ProfileViewer from '../profile-viewer/ProfileViewer';
import Search from '../search/Search';
import ViewSource from '../view-source/ViewSource';

function Dialogs() {
  return (
    <>
      <ReadReceipts />
      <ViewSource />
      <ProfileViewer />
      <Search />
    </>
  );
}

export default Dialogs;
