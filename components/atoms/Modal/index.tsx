import React from 'react';
import { Modal as NativeModal, ModalBaseProps } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';

type ModalProps = {
    onClose: () => void;
    children: any;
} & ModalBaseProps;

export const Modal = ({ onClose, children, ...rest }: ModalProps) => {
    return (
        <NativeModal
            animationType='none'
            transparent
            onRequestClose={onClose}
            {...rest}
        >
            <TouchableOpacity
                style={styles.wrapper}
                activeOpacity={1}
                onPress={() => {
                    onClose();
                }}
            >
                <TouchableOpacity activeOpacity={1} style={styles.innerWrapper}>
                    {children}
                </TouchableOpacity>
            </TouchableOpacity>
        </NativeModal>
    );
};
