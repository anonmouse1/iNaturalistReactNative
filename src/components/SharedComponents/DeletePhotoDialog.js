// @flow

import type { Node } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog, Paragraph, Portal
} from "react-native-paper";
import Realm from "realm";

import realmConfig from "../../models/index";
import Photo from "../../models/Photo";
import Button from "./Buttons/Button";

type Props = {
  deleteDialogVisible: boolean,
  photoUriToDelete: ?string,
  photoUris: Array<string>,
  setPhotoUris: Function,
  hideDialog: Function
}

const DeletePhotoDialog = ( {
  deleteDialogVisible,
  photoUriToDelete,
  photoUris,
  setPhotoUris,
  hideDialog
}: Props ): Node => {
  const { t } = useTranslation( );

  const deletePhoto = async ( ) => {
    if ( !photoUriToDelete ) { return; }
    const updatedPhotos = photoUris;
    const photoIndex = photoUris.findIndex( p => p === photoUriToDelete );
    updatedPhotos.splice( photoIndex, 1 );

    // spreading the array forces DeletePhotoDialog to rerender on each photo deletion
    setPhotoUris( [...updatedPhotos] );

    const realm = await Realm.open( realmConfig );
    await Photo.deletePhoto( realm, photoUriToDelete );

    hideDialog( );
  };

  return (
    <Portal>
      <Dialog visible={deleteDialogVisible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Paragraph>{t( "Are-you-sure" )}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} text={t( "Cancel" )} level="neutral" />
          <Button onPress={deletePhoto} text={t( "Yes-delete-photo" )} level="primary" />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DeletePhotoDialog;
