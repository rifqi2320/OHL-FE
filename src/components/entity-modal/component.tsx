import { useAPI } from "@/contexts";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface EntityModalProps {
  isOpen: boolean;
  entity: Record<string, string | number>;
  entityType: "barang" | "perusahaan";
  isCreate: boolean;
  onClose: () => void;
}

const EntityModal = ({ isOpen, entity, entityType, isCreate, onClose }: EntityModalProps) => {
  // const { api } = useAPI();
  const [editableEntity, setEditableEntity] = useState<Record<string, string | number>>(entity || {});

  const handleSave = () => {
    if (entityType === "barang") {
      console.log(entity);
    } else {
      console.log(entity);
    }
    onClose();
  };

  useEffect(() => {
    if (isCreate) {
      // copy keys into new object
      const newEntity: Record<string, string | number> = {};
      Object.keys(entity).forEach((key) => {
        if (key.includes("id")) return;
        newEntity[key] = "";
      });
      setEditableEntity(newEntity);
    } else {
      setEditableEntity(entity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreate, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Edit ${entityType}`}</ModalHeader>
        <ModalBody>
          {Object.entries(editableEntity).map(([key, value]) => {
            if (key.includes("id")) return;
            return (
              <>
                <Text mt={2}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Input
                  value={value}
                  onChange={(e) => setEditableEntity({ ...editableEntity, [key]: e.target.value })}
                />
              </>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button mx={2} colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EntityModal;
